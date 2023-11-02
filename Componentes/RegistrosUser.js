import React, { useContext, useState, useEffect } from "react";
import { View, TextInput, KeyboardAvoidingView, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from "react-native";
import Styles from "./Styles";
import cursosConCodigo from "./ArregloCursos/Cursos";
import { ButtonContext } from "./ButtonContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

function RegistrosUser() {
    const [ inputID, setInputID ] = useState("");
    const [ inputNombre, setInputNombre ] = useState("");
    const [ inputCedula, setInputCedula ] = useState("");
    const [ inputPApellido, setInputPApellido ] = useState("");
    const [ inputSApellido, setInputSApellido ] = useState("");
    const [ inputFechaN, setInputFechaN ] = useState("");
    const [ inputEmail, setInputEmail ] = useState("");
    const [ inputPassword, setInputPassword ] = useState("");
    const [ inputTelefono, setInputTelefono ] = useState("");
    const [ inputCodigoCurso, setInputCodigoCurso ] = useState("");
    const [ inputCodigoReservar, setInputCodigoReservar ] = useState("");
    const [ inputIDDatos, setInputIDDatos ] = useState("");
    const [ cursosReservados, setCursosReservados ] = useState([]);
    const [ resultadosBusqueda, setResultadosBusqueda ] = useState([]);
    const [ coursesLoaded, setCoursesLoaded ] = useState(false);
    const [ usersData, setUsersData ] = useState([]);
    const [ userCourses, setUserCourses ] = useState([]);

    const [ modalVisible, setModalVisible ] = useState(false);
	const [ modalMessage, setModalMessage ] = useState("");

    const [ modalVisibleFactura, setModalVisibleFactura ] = useState(false);
    const [ modalCourses, setModalCourses ] = useState([]);
	const [ modalMessageFactura, setModalMessageFactura ] = useState({
        idFac: "",
        nombreFac: "",
        cedulaFac: "",
        pApellidoFac: "",
        sApellidoFac: "",
        fechaFac: "",
        emailFac: "",
        passwordFac: "",
        telefonoFac: "",
    });
 
    const { registrosUsuarioButton } = useContext(ButtonContext);

    const handleInputChange0 = (text) => {
        setInputID(text)
    };
    const handleInputChange1 = (text) => {
        setInputNombre(text)
    };
    const handleInputChange2 = (text) => {
        setInputCedula(text)
    };
    const handleInputChange3 = (text) => {
        setInputPApellido(text)
    };
    const handleInputChange4 = (text) => {
        setInputSApellido(text)
    };
    const handleInputChange5 = (text) => {
        setInputFechaN(text)
    };
    const handleInputChange6 = (text) => {
        setInputEmail(text)
    };
    const handleInputChange7 = (text) => {
        setInputPassword(text)
    };
    const handleInputChange8 = (text) => {
        setInputTelefono(text)
    };
    const handleInputChange9 = (text) => {
        setInputIDDatos(text)
    };
    const showSuccessModal = (message) => {
		setModalMessage(message);
		setModalVisible(true);
	};

    const inputEmpty = () => {
        return (
            inputID.trim === "" ||
            inputNombre.trim() === "" ||
            inputCedula.trim() === "" ||
            inputPApellido.trim() === "" ||
            inputSApellido.trim() === "" ||
            inputFechaN.trim() === "" ||
            inputEmail.trim() === "" ||
            inputPassword.trim() === "" ||
            inputTelefono.trim() === ""
        );
    };

    useEffect(() => {
		const loadUsersData = async () => {
		  	try {
				const existingData = await AsyncStorage.getItem('usersData');
				if (existingData) {
			  		setUsersData(JSON.parse(existingData));
				}
		  	} catch (error) { }
		};
		loadUsersData();
	}, []);

    const saveUserData = async (idUser, userData) => {
        try {
          const existingData = await AsyncStorage.getItem('usersData');
          const usersData = existingData ? JSON.parse(existingData) : {};
          usersData[idUser] = userData;
          await AsyncStorage.setItem('usersData', JSON.stringify(usersData));
        } catch (error) { }
    };

    const buscarCursos = (texto) => {
        setInputCodigoCurso(texto);
        if (texto.trim().length === 0) {
            setResultadosBusqueda([]);
        } else {
            const cursosFiltrados = cursosConCodigo.filter((curso) => curso.codigo.startsWith(texto) || curso.nombre.toLowerCase().startsWith(texto.toLowerCase()));
            setResultadosBusqueda(cursosFiltrados);
        }
    };

    const reservarCursos = async (codigoCurso) => {
        const idUser = inputID;
        const cedula = inputCedula;
        const fechaN = inputFechaN;
        const emailUser = inputEmail;
        const passwordUser = inputPassword;
      
        if (emailValid(emailUser) && cedulaValid(cedula) && fechaNacimientoValid(fechaN)) {
            const userID = usersData.find((user) => user.id === idUser);
            const userEmail = usersData.find((user) => user.email === emailUser);
            const userPassword = usersData.find((user) => user.password === passwordUser);

            if (userID && userEmail && userPassword) {
                if (userID && userEmail && userPassword) {
                    const cursosUsuario = userID.courses || [];
                    const cursoReservado = cursosConCodigo.find((curso) => curso.codigo === codigoCurso);
                    
                    if (cursoReservado) {
                        const cursoYaReservado = cursosUsuario.some((curso) => curso.codigo === codigoCurso);
                        
                        if (!cursoYaReservado) {
                            if (cursosUsuario.length < 3) {
                                const newCourses = [...cursosUsuario, cursoReservado]; // Usar cursosUsuario en lugar de userCourses
                                setUserCourses(newCourses);
                                setInputCodigoReservar("");
                
                                const updatedUserData = {
                                    ...userID,
                                    courses: newCourses,
                                };
                
                                await saveUserData(idUser, updatedUserData);
                                showSuccessModal("Curso reservado exitosamente");
                            } else {
                                showSuccessModal("El usuario ya ha reservado el máximo de cursos permitidos (3)");
                            }
                        } else {
                            showSuccessModal("Este curso ya ha sido reservado por el usuario");
                        }
                    } else { }
                } else { }
            } else { }
        } else {
            if (!fechaNacimientoValid(fechaN)) {
                showSuccessModal("La fecha de nacimiento no contienen un formato válido, la fecha se acepta en formato [dd/mm/yyyy]");
            }
            if (!cedulaValid(cedula)) {
                showSuccessModal("El numero de cedula no corresponde a un numero de 9 digitos, inclue los 0s [101230123]");
            }
            if (!emailValid(emailUser)) {
                showSuccessModal("El correo electronico no tiene un formato valido, asegurate que tenga terminación en [@gamil.com] o alguna similar");
            }
        }
    };

    const obtenerCursosReservados = (userID) => {
        if (userID && userID.courses && userID.courses.length > 0) {
            const cursosReservados = cursosConCodigo.filter((curso) =>
                userID.courses.some((cursoReservado) => cursoReservado.codigo === curso.codigo)
            );
            return cursosReservados;
        } else {
            return [];
        }
    };

    const cargarCursos = async () => {
        const idUser = inputID;
        const emailUser = inputEmail;
        const passwordUser = inputPassword;
    
        const userID = usersData.find((user) => user.id === idUser);
        const userEmail = usersData.find((user) => user.email === emailUser);
        const userPassword = usersData.find((user) => user.password === passwordUser);

        getAllDataFromAsyncStorage();
    
        if (userID && userEmail && userPassword) {
            const cursosReservados = obtenerCursosReservados(userID);
            setUserCourses(cursosReservados);
        } else {
            setUserCourses([]);
        }
    
        setCoursesLoaded(true);
    };

    const getAllDataFromAsyncStorage = async () => {
        try {
          const allKeys = await AsyncStorage.getAllKeys();
          const allData = await AsyncStorage.multiGet(allKeys);
          console.log('Todos los datos en AsyncStorage:', allData);
        } catch (error) {
          console.error('Error al obtener datos de AsyncStorage:', error);
        }
      };

    const generarFactura = (inputIDDatos) => {
        const idFac = inputIDDatos;
        const userData = usersData.find((user) => user.id === idFac);

        const nombre = inputNombre;
        const cedula = inputCedula;
        const pApellido = inputPApellido;
        const sApellido = inputSApellido;
        const fechaNacimiento = inputFechaN;
        const email = inputEmail;
        const telefono = inputTelefono;

        if (userData) {
            if (nombre == null || cedula == null || pApellido == null || sApellido == null || fechaNacimiento == null || email == null || telefono == null) {
                showSuccessModal("Por favor, completa todos los datos para poder generar la visualización de los mismos");
            } else {
                setModalMessageFactura({
                    idFac,
                    nombreFac: nombre,
                    cedulaFac: cedula,
                    pApellidoFac: pApellido,
                    sApellidoFac: sApellido,
                    fechaFac: fechaNacimiento,
                    emailFac: email,
                    passwordFac: userData.password,
                    telefonoFac: telefono,
                    courses: userData.courses,
                });
                setModalVisibleFactura(true);
            }
        } else {
            showSuccessModal("No se encontró ningún usuario registrado bajo este número de ID, recuerda que el ID es el mismo que ingresaste al crear la cuenta de usuario.");
        }
    };

    const cedulaValid = (cedula) => {
        return /^\d{9}$/.test(cedula);
    };
      
    const fechaNacimientoValid = (fechaNacimiento) => {
        const dateRegex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[1-2]\d|3[0-1])\/\d{4}$/;
        return dateRegex.test(fechaNacimiento);
    };

    const emailValid = (email) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailPattern.test(email);
    };

    return (
        <KeyboardAvoidingView style={styles.containerRegisterKeyScroll} behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
            {registrosUsuarioButton ?
                <ScrollView style={Styles.scroll}>
                    <View style={styles.containerRegisterScroll}>
                        <View style={Styles.contentTitles1}><Text style={Styles.textTitleRegistros}>𝚁𝚎𝚐𝚒𝚜𝚝𝚛𝚘 𝚍𝚎 𝚍𝚊𝚝𝚘𝚜 𝚍𝚎 𝚞𝚜𝚞𝚊𝚛𝚒𝚘</Text></View>
                        <View style={Styles.separateForm}>
                            <View style={Styles.contentInputs}>
                                <View style={Styles.content_view}>
                                    <TextInput
                                        value={inputID}
                                        style={Styles.input}
                                        onChangeText={handleInputChange0}
                                        placeholder="ID de la cuenta de usuario"
                                        placeholderTextColor="#171717">
                                    </TextInput>
                                    <View style={Styles.contentTextOblig}><Text style={Styles.textObligatorio}>* Campo Obligatorio</Text></View>
                                </View>
                                <View style={Styles.content_view}>
                                    <View style={Styles.content_viewFlex}>
                                        <TextInput
                                            value={inputNombre}
                                            style={Styles.inputFlex}
                                            onChangeText={handleInputChange1}
                                            placeholder="Nombre"
                                            placeholderTextColor="#171717">
                                        </TextInput>
                                        <TextInput
                                            value={inputCedula}
                                            style={Styles.inputFlex}
                                            onChangeText={handleInputChange2}
                                            placeholder="Cédula"
                                            keyboardType="numeric"
                                            placeholderTextColor="#171717">
                                        </TextInput>
                                    </View>
                                    <View style={Styles.contentTextOblig}><Text style={Styles.textObligatorio}>* Campo Obligatorio</Text></View>
                                </View>
                                <View style={Styles.content_view}>
                                    <View style={Styles.content_viewFlex}>
                                        <TextInput
                                            value={inputPApellido}
                                            style={Styles.inputFlex}
                                            onChangeText={handleInputChange3}
                                            placeholder="Primer Apellido"
                                            placeholderTextColor="#171717">
                                        </TextInput>
                                        <TextInput
                                            value={inputSApellido}
                                            style={Styles.inputFlex}
                                            onChangeText={handleInputChange4}
                                            placeholder="Segundo Apellido"
                                            placeholderTextColor="#171717">
                                        </TextInput>
                                    </View>
                                    <View style={Styles.contentTextOblig}><Text style={Styles.textObligatorio}>* Campo Obligatorio</Text></View>
                                </View>
                                <View style={Styles.content_view}>
                                    <TextInput
                                        value={inputFechaN}
                                        style={Styles.input}
                                        onChangeText={handleInputChange5}
                                        placeholder="Fecha de nacimiento: dd/mm/yyyy"
                                        placeholderTextColor="#171717">
                                    </TextInput>
                                    <View style={Styles.contentTextOblig}><Text style={Styles.textObligatorio}>* Campo Obligatorio</Text></View>
                                </View>
                                <View style={Styles.content_view}>
                                    <TextInput
                                        value={inputEmail}
                                        style={Styles.input}
                                        onChangeText={handleInputChange6}
                                        placeholder="Correo Electronico"
                                        placeholderTextColor="#171717">
                                    </TextInput>
                                    <View style={Styles.contentTextOblig}><Text style={Styles.textObligatorio}>* Campo Obligatorio</Text></View>
                                </View>
                                <View style={Styles.content_view}>
                                    <TextInput
                                        value={inputPassword}
                                        style={Styles.input}
                                        onChangeText={handleInputChange7}
                                        placeholder="Contraseña"
                                        secureTextEntry={true}
                                        placeholderTextColor="#171717">
                                    </TextInput>
                                    <View style={Styles.contentTextOblig}><Text style={Styles.textObligatorio}>* Campo Obligatorio</Text></View>
                                </View>
                                <View style={Styles.content_viewFlex}>
                                    <TextInput
                                        value={inputTelefono}
                                        style={styles.inputReservarFlex}
                                        onChangeText={handleInputChange8}
                                        placeholder="Numero de telefono"
                                        placeholderTextColor="#171717">
                                    </TextInput>
                                    <TouchableOpacity
                                        style={[styles.buttonReservar, { opacity: inputEmpty() ? 0.5 : 1 } ]}
                                        onPress={() => {
                                            if (!inputEmpty()) {
                                                cargarCursos();
                                            } else {
                                                showSuccessModal("Complete todos los campos e ingrese un código válido");
                                            }
                                        }}
                                        disabled={inputEmpty()}>
                                        <Text style={Styles.buttonText}>Cargar datos</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={Styles.contentTextOblig10}>
                                    <Text style={Styles.textObligatorio20}>* Campo Obligatorio</Text>
                                </View>
                            </View>
                        </View>
                    <View style={Styles.contentTitles2}><Text style={Styles.textTitleRegistros}>𝙲𝚞𝚛𝚜𝚘𝚜 𝚊𝚌𝚊𝚍𝚎𝚖𝚒𝚌𝚘𝚜 𝚍𝚒𝚜𝚙𝚘𝚗𝚒𝚋𝚕𝚎𝚜</Text></View>
                    <View style={Styles.contentBuscarCurso}>
                        <View style={Styles.cursosTable}>
                            <TextInput
                                value={inputCodigoCurso}
                                style={Styles.inputCurso}
                                onChangeText={buscarCursos}
                                placeholder="Codigo del curso a buscar"
                                placeholderTextColor="#171717">
                            </TextInput>
                            <View style={Styles.contentTextOblig}><Text style={Styles.textObligatorio20}>* Campo Obligatorio</Text></View>
                           
                            {resultadosBusqueda.length > 0 && (
                                resultadosBusqueda.map((curso) => (
                                    <View key={curso.codigo} style={Styles.cursoView}>
                                        <View style={{flexDirection: "row"}}>
                                            <View style={Styles.columnDate}>
                                                <Text style={Styles.cursoText1}>Código</Text>
                                                <Text style={Styles.cursoText10}>{curso.codigo}</Text>
                                            </View>
                                            <View style={Styles.columnDate2}>
                                                <Text style={Styles.cursoText2}>Nombre</Text>
                                                <Text style={Styles.cursoText20}>{curso.nombre}</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))
                            )}
                                
                            {resultadosBusqueda.length === 0 && (
                                <View style={Styles.cursoViewNoEncontrado}>
                                    <Text style={Styles.cursoTextNoEncontrado}>No se encontraron cursos</Text>
                                </View>
                            )}

                        </View>
                    </View>
                    <View style={Styles.contentTitles2}><Text style={Styles.textTitleRegistros}>𝙲𝚞𝚛𝚜𝚘𝚜 𝚊𝚌𝚊𝚍𝚎𝚖𝚒𝚌𝚘𝚜 𝚛𝚎𝚜𝚎𝚛𝚟𝚊𝚍𝚘𝚜</Text></View>
                    <View style={Styles.contentBuscarCurso}>
                        <View style={Styles.cursosTable}>
                            <View style={Styles.content_viewFlex}>
                                <TextInput
                                    value={inputCodigoReservar}
                                    style={styles.inputReservarFlex}
                                    onChangeText={setInputCodigoReservar}
                                    placeholder="Codigo"
                                    placeholderTextColor="#171717">
                                </TextInput>
                                <TouchableOpacity
                                    style={[styles.buttonReservar, { opacity: inputEmpty() ? 0.5 : 1 }]}
                                    onPress={() => {
                                        if (!inputEmpty() && inputCodigoReservar.trim() !== "") {
                                            reservarCursos(inputCodigoReservar);
                                        } else {
                                            showSuccessModal("Complete todos los campos e ingrese el codigo del curso, los cursos los puedes buscar en el apartado anterior de buscar cursos y ver el codigo de este");
                                        }
                                    }}
                                    disabled={inputEmpty()}>
                                    <Text style={Styles.buttonText}>Guardar</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.contentTextOblig}>
                                <Text style={Styles.textObligatorio20}>* Campo Obligatorio</Text>
                            </View>
                            {coursesLoaded && userCourses.length > 0 ? (
                                userCourses.map((curso) => (
                                    <View key={curso.codigo} style={Styles.cursoView}>
                                        <View style={{ flexDirection: "row" }}>
                                            <View style={Styles.columnDate}>
                                                <Text style={Styles.cursoText1}>Código</Text>
                                                <Text style={Styles.cursoText10}>{curso.codigo}</Text>
                                            </View>
                                            <View style={Styles.columnDate2}>
                                                <Text style={Styles.cursoText2}>Nombre</Text>
                                                <Text style={Styles.cursoText20}>{curso.nombre}</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))
                            ) : coursesLoaded && userCourses.length === 0 ? (
                                <View style={Styles.cursoViewNoEncontrado}>
                                    <Text style={Styles.cursoTextNoEncontrado}>No se encontraron cursos</Text>
                                </View>
                            ) : null}
                        </View>
                        <View style={styles.contentEnviar}>
                            <View style={Styles.content_viewFlex}>
                                <TextInput
                                    value={inputIDDatos}
                                    style={styles.inputReservarFlex}
                                    onChangeText={handleInputChange9}
                                    placeholder="ID de usuario"
                                    placeholderTextColor="#171717">
                                </TextInput>
                                <TouchableOpacity
                                    style={[styles.buttonReservar, { opacity: inputEmpty() ? 0.5 : 1 }]}
                                    onPress={() => {
                                        if (!inputEmpty() && inputIDDatos.trim() !== "") {
                                            generarFactura(inputIDDatos)
                                        } else {
                                            showSuccessModal("Complete todos los campos e ingrese un código válido");
                                        }
                                    }}
                                    disabled={inputEmpty()}>
                                    <Text style={Styles.buttonText}>Ver datos</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <Modal
						animationType="fade"
						transparent={true}
						visible={modalVisible}
						onRequestClose={() => setModalVisible(false)}>
						<View style={Styles.modalContainer}>
                            <View style={Styles.modalContent}>
                                <Text style={Styles.modalText}>{modalMessage}</Text>
                                <TouchableOpacity style={Styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                                    <Text style={Styles.modalCloseButtonText}>Cerrar</Text>
                                </TouchableOpacity>
                            </View>
						</View>
					</Modal>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisibleFactura}
                        onRequestClose={() => setModalVisibleFactura(false)}>
                        <View style={Styles.modalContainerFac}>
                            <View style={Styles.modalContentFac}>
                                <View>
                                    <View style={Styles.contentTitleFac}>
                                        <Text style={Styles.titleFac}>COMPROBANTE DE RESERVACIÓN</Text>
                                    </View>
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={Styles.modalText1Fac}>ID:</Text>
                                        <Text style={Styles.modalText2Fac}>{modalMessageFactura.idFac}</Text>
                                    </View>
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={Styles.modalText1Fac}>Nombre:</Text>
                                        <Text style={Styles.modalText2Fac}>{modalMessageFactura.nombreFac}</Text>
                                    </View>
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={Styles.modalText1Fac}>Cédula:</Text>
                                        <Text style={Styles.modalText2Fac}>{modalMessageFactura.cedulaFac}</Text>
                                    </View>
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={Styles.modalText1Fac}>P. Apellido:</Text>
                                        <Text style={Styles.modalText2Fac}>{modalMessageFactura.pApellidoFac}</Text>
                                    </View>
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={Styles.modalText1Fac}>S. Apellido:</Text>
                                        <Text style={Styles.modalText2Fac}>{modalMessageFactura.sApellidoFac}</Text>
                                    </View>
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={Styles.modalText1Fac}>F. Nacimiento:</Text>
                                        <Text style={Styles.modalText2Fac}>{modalMessageFactura.fechaFac}</Text>
                                    </View>
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={Styles.modalText1Fac}>Correo:</Text>
                                        <Text style={Styles.modalText2Fac}>{modalMessageFactura.emailFac}</Text>
                                    </View>
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={Styles.modalText1Fac}>Teléfono:</Text>
                                        <Text style={Styles.modalText2Fac}>{modalMessageFactura.telefonoFac}</Text>
                                    </View>
                                    <View style={Styles.contentTitles2}>
                                        <Text style={Styles.textTitleRegistros}>Cursos Reservados</Text>
                                    </View>
                                    {coursesLoaded && userCourses.length > 0 ? (
                                        userCourses.map((curso) => (
                                            <View key={curso.codigo} style={Styles.cursoViewFac}>
                                                <View style={{ flexDirection: "row" }}>
                                                    <View style={Styles.columnDateFac}>
                                                        <Text style={Styles.cursoTextFac1}>Código</Text>
                                                        <Text style={Styles.cursoTextFac10}>{curso.codigo}</Text>
                                                    </View>
                                                    <View style={Styles.columnDate2Fac}>
                                                        <Text style={Styles.cursoTextFac2}>Nombre</Text>
                                                        <Text style={Styles.cursoTextFac20}>{curso.nombre}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        ))
                                    ) : coursesLoaded && userCourses.length === 0 ? (
                                        <View style={Styles.cursoViewNoEncontradoFac}>
                                            <Text style={Styles.cursoTextNoEncontrado}>No se encontraron cursos registrados</Text>
                                        </View>
                                    ) : null}
                                </View>
                                <View style={styles.cerrarModalFac}>
                                    <TouchableOpacity
                                        style={Styles.modalCloseButton}
                                        onPress={() => setModalVisibleFactura(false)}>
                                        <Text style={Styles.modalCloseButtonText}>Cerrar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView> : ""
            }
        </KeyboardAvoidingView>
    );
}

export default RegistrosUser;

const styles = StyleSheet.create ({
    containerRegisterKeyScroll: {
		width: "100%",
		minHeight: "100%",
		paddingTop: 0,
	},
    containerRegisterScroll: {
		width: "100%",
		minHeight: "96%",
		paddingBottom: 55,
	},
    inputReservarFlex: {
		width: "70%",
		height: 40,
		color: "#171717",
		overflow: "hidden",
		backgroundColor: "#f0f0f0",
		borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
		fontSize: 16,
		paddingLeft: 10,
		borderWidth: 1,
		borderColor: "#b4b5b9",
	},
    buttonReservar: {
		width: "30%",
		height: 40,
		overflow: "hidden",
		borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
		backgroundColor: "#ff5348",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
    contentEnviar: {
        width: "100%",
        height: "auto",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        paddingTop: 10
    },
    buttonGuardarReservacion1: {
		width: "100%",
		height: 40,
		overflow: "hidden",
		borderRadius: 5,
		backgroundColor: "#ff5348",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
    cerrarModalFac: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20
    }
});