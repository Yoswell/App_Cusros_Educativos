import React from "react";
import { useState, useContext, useEffect } from "react";
import { TouchableOpacity, ImageBackground, View, Text, TextInput, KeyboardAvoidingView, Platform, Modal, ScrollView, StyleSheet } from "react-native";
import image from "../src/logo.png";
import { ButtonContext } from './ButtonContext.js';
import Styles from "./Styles.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginInScreen() {
	const [ InputEmail, setInputEmail ] = useState("");
	const [ InputPassword, setInputPassword ] = useState("");
	const { iniciarSesionButton, setIniciarSesionButton } = useContext(ButtonContext);
	const { setRegistrosUsuarioButton } = useContext(ButtonContext);
	const [ usersData, setUsersData ] = useState([]);
	const [ modalVisibleLogin, setModalVisibleLogin ] = useState(false);
	const [ modalMessageLogin, setModalMessageLogin ] = useState("");
	const [ modalVisibleLoginExitoso, setModalVisibleLoginExitoso ] = useState(false);
	const [ modalMessageLoginExitoso, setModalMessageLoginExitoso ] = useState("");

	const handleInputChange1 = (text) => {
		setInputEmail(text);
	};

	const handleInputChange2 = (text) => {
		setInputPassword(text);
	};

	const showSuccessModal = (message) => {
		setModalMessageLogin(message);
		setModalVisibleLogin(true);
	};

	const showSuccessModalLoginExitoso = (message) => {
		setModalMessageLoginExitoso(message);
		setModalVisibleLoginExitoso(true);
	};

	const handleIniciarExitosoClick = () => {
		setModalVisibleLoginExitoso(false);
		setIniciarSesionButton(false);
		setRegistrosUsuarioButton(true);
	}

	useEffect(() => {
		const loadUsersData = async () => {
			try {
				const existingData = await AsyncStorage.getItem("usersData");
				if (existingData) {
			  		setUsersData(JSON.parse(existingData));
				}
		  	} catch (error) {
				showSuccessModal("Error al cargar los datos de los usuarios");
		  	}
		};
		loadUsersData();
	}, [usersData]);

	const handleIniciarSesionButtonClick = () => {
		const email = InputEmail;
		const password = InputPassword;
		const user = usersData.find((user) => user.email === email && user.password === password);
	
		if (user) {
		  	showSuccessModalLoginExitoso("Inicio de sesión exitoso");
		}
	};

	return (
		<KeyboardAvoidingView style={{padding: 0, width: "100%"}}  behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
			{iniciarSesionButton ?
				<ScrollView style={styles.scroll}>
					<View style={styles.contTitle}>
						<Text style={styles.textTitle}>𝙱𝚒𝚎𝚗𝚟𝚎𝚗𝚒𝚍𝚘𝚜 𝚊 𝙲𝚞𝚛𝚜𝙰𝚙𝚙</Text>
                    </View>
					<View style={styles.containerScroll}>
						<View style={styles.container_fluid}>
							<ImageBackground
								source={image}
								style={Styles.image}>
							</ImageBackground>
							<View style={Styles.content_form}>
								<View style={Styles.content_view}>
									<TextInput
										value={InputEmail}
										style={Styles.input}
										onChangeText={handleInputChange1}
										placeholder="Email"
										placeholderTextColor="#171717">
									</TextInput>
								</View>
								<View style={Styles.content_view}>
									<TextInput
										value={InputPassword}
										style={Styles.input}
										onChangeText={handleInputChange2}
										placeholder="Contraseña"
										secureTextEntry={true}
										placeholderTextColor="#171717">
									</TextInput>
								</View>
							</View>
							<TouchableOpacity
								style={Styles.button}
								onPress={handleIniciarSesionButtonClick}>
								<Text style={Styles.buttonText}>Iniciar sesión</Text>
							</TouchableOpacity>
						</View>
						<Modal
							animationType="fade"
							transparent={true}
							visible={modalVisibleLogin}
							onRequestClose={() => setModalVisibleLogin(false)}>
							<View style={Styles.modalContainer}>
								<View style={Styles.modalContent}>
									<Text style={Styles.modalText}>{modalMessageLogin}</Text>
									<TouchableOpacity style={Styles.modalCloseButton} onPress={() => setModalVisibleLogin(false)}>
										<Text style={Styles.modalCloseButtonText}>Cerrar</Text>
									</TouchableOpacity>
								</View>
							</View>
						</Modal>
						<Modal
							animationType="fade"
							transparent={true}
							visible={modalVisibleLoginExitoso}
							onRequestClose={() => setModalVisibleLoginExitoso(false)}>
							<View style={Styles.modalContainer}>
								<View style={Styles.modalContent}>
									<Text style={Styles.modalText}>{modalMessageLoginExitoso}</Text>
									<TouchableOpacity style={Styles.modalCloseButton} onPress={handleIniciarExitosoClick}>
										<Text style={Styles.modalCloseButtonText}>Cerrar</Text>
									</TouchableOpacity>
								</View>
							</View>
						</Modal>
					</View>
				</ScrollView> : ""
			}
		</KeyboardAvoidingView>
	);
}

export default LoginInScreen;

const styles = StyleSheet.create({
	containerScroll: {
		flex: 1,
		width: "100%",
		minHeight: "100%",
		paddingTop: 50,
		paddingBottom: 80,
	},
	container_fluid: {
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
		paddingLeft: 40,
		paddingRight: 40,
	},
	scroll: {
		width: "100%",
	},
	contTitle: {
        width: "100%",
        height: 40,
        backgroundColor: "#f0f0f0",
        alignItems: "center",
        justifyContent: "center",
    },
    textTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#171717",
        textAlign: "center",
    },
}); 