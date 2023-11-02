import React from "react";
import { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import image from "../src/logo.png";
import { ButtonContext } from "../Componentes/ButtonContext.js";
import { ViewVisibleContext } from "../Componentes/ViewVisibleContext.js";

function WelcomeApp() {
    const { setCrearCuentaButton } = useContext(ButtonContext);
    const { setIniciarSesionButton } = useContext(ButtonContext);
    const { mostrarWelcome, setMostrarWelcome } = useContext(ViewVisibleContext);

    const handleButton1Click = () => { //Boton para mostrar la ventana de singUp
        setIniciarSesionButton(false);
        setCrearCuentaButton(true);
        setTimeout(() => {
            setMostrarWelcome(false);
        }, 10);
	};

    const handleButton2Click = () => { //Boton para mostrar la ventana de singUp  
        setCrearCuentaButton(false);
        setIniciarSesionButton(true);
        setTimeout(() => {
            setMostrarWelcome(false);
        }, 10);
	};

    return (
        <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
            {mostrarWelcome && (
                <View style={styles.container}>
                    <View style={styles.contTitle}>
                        <Text style={styles.textTitle}>𝙱𝚒𝚎𝚗𝚟𝚎𝚗𝚒𝚍𝚘𝚜 𝚊 𝙲𝚞𝚛𝚜𝙰𝚙𝚙</Text>
                    </View>
                    <View style={styles.container_fluid}>
                        <View>
                            <ImageBackground source={image} style={styles.image}></ImageBackground>
                        </View>
                        <View>
                            <Text style={styles.text}>Gracias por visitarnos, antes de proceder, crea una cuenta</Text>
                        </View>
                        <View style={styles.constButton}>
                            <TouchableOpacity style={styles.button} onPress={handleButton1Click}>
                                <Text style={styles.buttonText}>Crear cuenta</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleButton2Click}>
                                <Text style={styles.buttonText}>Iniciar sesión</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </KeyboardAvoidingView>
    );
}

export default WelcomeApp;

const styles = StyleSheet.create({
    screen: {
        padding: 0,
        width: "100%",
    },
    container: {
        width: "100%",
        minHeight: "96%",
    },
    container_fluid: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        flex: 1,
        marginTop: -80
    },
    image: {
        width: 200,
        height: 200
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
    text: {
        fontSize: 16,
        paddingTop: 30,
        paddingBottom: 30,
        color: "#7D7574",
        textAlign: "center",
        paddingLeft: 40,
        paddingRight: 40,
    },
    textLink: {
        fontSize: 16,
        color: "#00d396",
    }, 
    button: {
        width: "100%",
        height: 30,
        backgroundColor: "#ff5348",
        borderRadius: 10,
        marginTop: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
		color: "#fff",
		fontSize: 16,
	},
    constButton: {
        width: 180
    }
});