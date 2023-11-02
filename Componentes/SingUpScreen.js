import React from "react";
import { useState, useContext, useEffect } from "react";
import { TouchableOpacity, ImageBackground, View, Text, TextInput, KeyboardAvoidingView, Platform, Modal, StyleSheet, ScrollView } from "react-native";
import image from "../src/logo.png";
import { ButtonContext } from './ButtonContext.js';
import Styles from "./Styles.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

function SingUpScreen() {
	const [ inputId, setinputId ] = useState("");
	const [ inputEmail, setinputEmail ] = useState("");
	const [ inputPassword, setinputPassword ] = useState("");
	const { crearCuentaButton } = useContext(ButtonContext);
	const [ modalVisible, setModalVisible ] = useState(false);
  	const [ modalMessage, setModalMessage ] = useState("");

	const handleInputChange1 = (text) => {
		setinputId(text);
	};
	const handleInputChange2 = (text) => {
		setinputEmail(text);
	};
	const handleInputChange3 = (text) => {
		setinputPassword(text);
	};
	const showSuccessModal = (message) => {
		setModalMessage(message);
		setModalVisible(true);
	};
	
	const saveUserDataToStorage = async (email, password, id, courses) => {
		try {
		  	const userData = { email, password, id, courses };
		  	const existingData = await AsyncStorage.getItem('usersData');
		  	let dataArray = existingData ? JSON.parse(existingData) : [];
			const idExiste = dataArray.some((user) => user.id === id);
		  	const emailExiste = dataArray.some((user) => user.email === email);
	  
		  	if (emailExiste && idExiste) {
				showSuccessModal("Ya hay una cuenta registrada con este Email y con este ID, intente ingresar con un Email y un ID diferente");
		  	} else {
				dataArray.push(userData);
				await AsyncStorage.setItem('usersData', JSON.stringify(dataArray));
		  	}
		} catch (error) { }
	};
	
	const handleSignUp = () => {
		const email = inputEmail;
		const password = inputPassword;
		const id = inputId;
		const courses = [];

		if (!passwordValid(password)) {
		  	showSuccessModal("Contraseña no valida: Una contraseña valida debe de tener minimo 6 caracteres, una letra en mayuscula y algun caracter como: [!@#$%^&*(),.?:{}|<>]");
		  	return;
		}
		if(!emailValid(email)) {
			showSuccessModal("Email no valido, no correspode a un email com terminacion en: @gmail.com o @hotmail.com")
		}
		if (passwordValid(password) && emailValid(email)) {
			try {
				saveUserDataToStorage(email, password, id, courses);
				showSuccessModal("Cuenta creada correctamente");
			} catch (error) {
				showSuccessModal("Ya hay una cuenta registrada con este Email y con este ID, intente ingresar con un Email y un ID diferente");
			}
		}
	};
	  
	const passwordValid = (password) => {
		if (password.length < 6) {
		  return false;
		}
		if (!/\d/.test(password)) {
		  return false;
		}
		if (!/[!@#$%^&*(),.?:{}|<>]/.test(password)) {
		  return false;
		}
		return true;
	};

	const emailValid = (email) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailPattern.test(email);
    };

	return (
		<KeyboardAvoidingView style={{padding: 0, width: "100%"}} behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
			{crearCuentaButton ?
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
										value={inputId}
										style={Styles.input}
										onChangeText={handleInputChange1}
										placeholder="ID"
										placeholderTextColor="#171717">
									</TextInput>
								</View>
								<View style={Styles.content_view}>
									<TextInput
										value={inputEmail}
										style={Styles.input}
										onChangeText={handleInputChange2}
										placeholder="Email"
										placeholderTextColor="#171717">
									</TextInput>
								</View>
								<View style={Styles.content_view}>
									<TextInput
										value={inputPassword}
										style={Styles.input}
										onChangeText={handleInputChange3}
										placeholder="Contraseña"
										placeholderTextColor="#171717"
										secureTextEntry={true}>
									</TextInput>
								</View>
							</View>
							<TouchableOpacity
								style={Styles.button}
								onPress={handleSignUp}>
								<Text style={Styles.buttonText}>Registrarme</Text>
							</TouchableOpacity>
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
					</View>
				</ScrollView> : ""
			}
		</KeyboardAvoidingView>
	);
}

export default SingUpScreen;

const styles = StyleSheet.create({
	containerScroll: {
		width: "100%",
		minHeight: "96%",
		paddingTop: 50,
		paddingBottom: 80,
	},
	container_fluid: {
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
		paddingLeft: 40,
		paddingRight: 40
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