import React, { useContext, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { ButtonContext } from "./ButtonContext.js";
import { ViewVisibleContext } from "./ViewVisibleContext.js";

function Header() {
    const { setMostrarWelcome } = useContext(ViewVisibleContext);
    const { setCrearCuentaButton } = useContext(ButtonContext);
    const { setIniciarSesionButton } = useContext(ButtonContext);
    const { setRegistrosUsuarioButton } = useContext(ButtonContext);

    const handleRestablecerButtonClick = () => {
        setTimeout(() => {
            setCrearCuentaButton(false);
            setIniciarSesionButton(false);
            setRegistrosUsuarioButton(false);
            setMostrarWelcome(true);
        }, 50);
    }

    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.button} onPress={handleRestablecerButtonClick}>
                <Text style={styles.text}>INICIO</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create ({
    header: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: 50,
        zIndex: 1,
        backgroundColor: "#343541",
        borderBottomWidth: 1,
        borderBottomColor: "#171717"
    },
    button: {
        display: "flex",
        justifyContent: "center",
        paddingLeft: 20
    },
    text: {
        color: "#f0f0f0",
        fontSize: 15
    }
});