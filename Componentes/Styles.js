import { StyleSheet } from "react-native";

export default Styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "96%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	containerKey: {
		width: "100%",
		paddingLeft: 20,
		paddingRight: 20
	},
	containerKeyScroll: {
		width: "100%",
		minHeight: "100%",
		paddingTop: 0,
	},
	separateForm: {
		width: "100%",
		padding: 10
	},
	content_view: {
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "auto",
		paddingBottom: 10
	},
	content_viewFlex: {
		width: "100%",
		display: "flex",
		alignItems: "strech",
		justifyContent: "space-between",
		height: "auto",
		flexDirection: "row"
	},
	content_form: {
		width: "100%",
		height: "auto",
		paddingTop: 30,
		paddingBottom: 20
	},
	container_fluid: {
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
		paddingLeft: 20,
		paddingRight: 20,
	},
	text: {
		color: "#7D7574",
		fontSize: 16,
		paddingRight: 10,
		textAlign: "center"
	},
	textCampo: {
		color: "#fff",
		fontSize: 16,
		textAlign: "left"
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
	},
	input: {
		width: "100%",
		height: 40,
		color: "#171717",
		overflow: "hidden",
		backgroundColor: "#f0f0f0",
		borderRadius: 5,
		fontSize: 16,
		paddingLeft: 10,
		borderWidth: 1,
		borderColor: "#b4b5b9"
	},
	inputFlex: {
		width: "49%",
		height: 40,
		color: "#171717",
		overflow: "hidden",
		backgroundColor: "#f0f0f0",
		borderRadius: 5,
		fontSize: 16,
		paddingLeft: 10,
		borderWidth: 1,
		borderColor: "#b4b5b9"
	},
	contentBuscarCurso: {
		padding: 10,
	}, cursosTable: {
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingTop: 10,
		borderColor: "#fff",
		borderWidth: 1,
		borderRadius: 5
	},
	contentTitles1: {
		width: "100%",
		backgroundColor: "#b4b5b9",
		height: 40,
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	contentTitles2: {
		width: "100%",
		backgroundColor: "#b4b5b9",
		height: 40,
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	textTitleRegistros: {
		color: "#fff",
		fontSize: 16
	},
	inputCurso: {
		width: "100%",
		height: 40,
		color: "#171717",
		overflow: "hidden",
		backgroundColor: "#f0f0f0",
		borderRadius: 5,
		fontSize: 16,
		paddingLeft: 10,
		borderWidth: 1,
		borderColor: "#b4b5b9",
	},
	cursoView: {
		width: "100%",
		height: 60,
		marginTop: 10,
		borderRadius: 5,
		backgroundColor: "#f0f0f0",
	},
	cursoViewNoEncontrado: {
		width: "100%",
		display: "flex",
		justifyContent: "center",
		height: 60,
		marginTop: 10,
		borderRadius: 5,
		backgroundColor: "#f0f0f0",
		borderWidth: 1,
		borderColor: "#b4b5b9",
	},
	cursoText1: {
		color: "#171717",
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderTopWidth: 1,
		borderColor: "#b4b5b9",
		borderTopLeftRadius: 5,
		padding: 3,
		fontSize: 14,
		height: "50%"
	},
	cursoText10: {
		color: "#171717",
		borderWidth: 1,
		borderColor: "#b4b5b9",
		borderBottomLeftRadius: 5,
		padding: 3,
		fontSize: 14,
		height: "50%"
	},
	cursoText2: {
		color: "#171717",
		borderTopWidth: 1,
		borderRightWidth: 1,
		borderTopRightRadius: 5,
		borderColor: "#b4b5b9",
		padding: 3,
		fontSize: 14,
		height: "50%"
	},
	cursoText20: {
		color: "#171717",
		borderTopWidth: 1,
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderBottomRightRadius: 5,
		borderColor: "#b4b5b9",
		padding: 3,
		fontSize: 14,
		height: "50%"
	},
	columnDate: {
		width: "20%",
		height: 60
	},
	columnDate2: {
		width: "80%",
		height: 60
	},
	cursoTextNoEncontrado: {
		paddingLeft: 5,
		color: "#171717"
	},
	image: {
		width: 200,
		height: 200,
		overflow: "hidden",
	},
	button: {
		width: "60%",
		height: 30,
		overflow: "hidden",
		borderRadius: 10,
		backgroundColor: "#ff5348",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10
	},
    modalContainer: {
        flex: 1,
        width: "100%",
        minHeight: 660,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0D0D0D80",
    },
    modalContent:{
        width: "80%",
        height: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 30
    },
    modalText: {
        color: "#171717",
        fontSize: 16,
        paddingBottom: 30,
		textAlign: "center"
    },
    modalCloseButton: {
        width: "50%",
		height: 30,
		overflow: "hidden",
		borderRadius: 10,
		backgroundColor: "#f0f0f0",
		borderColor: "#ff5348",
		borderWidth: 2,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
    modalCloseButtonText: {
        color: "#171717",
        fontSize: 16
    },
	contentMensajePassword: {
		width: "100%",
		height: "auto"
	},
	contentTextOblig: {
		width: "100%",
		display: "flex",
		paddingTop: 2
	},
	contentTextOblig10: {
		width: "100%",
		display: "flex",
		paddingTop: 2,
		paddingBottom: 10
	},
	textObligatorio: {
		fontSize: 10,
		color: "#ff554d",
	},
	textObligatorio20: {
		fontSize: 10,
		color: "#ff554d",
		paddingBottom: 0
	},
	contentInputs: {
		width: "100%",
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 10,
		borderRadius: 10
	},
	modalContainerFac: {
        flex: 1,
        width: "100%",
        minHeight: 660,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
    },
    modalContentFac:{
        width: "90%",
        height: "90%",
		justifyContent: "space-between",
        backgroundColor: "#fff",
		borderWidth: 1,
        borderRadius: 5,
		borderColor: "#b4b5b9",
    },
	contentTitleFac: {
		width: "100%",
		height: 40,
		backgroundColor: "#b4b5b9",
		alignItems: "center",
        justifyContent: "center",
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
	},
	titleFac: {
		color: "#171717",
		fontWeight: "bold",
		fontSize: 16
	},
	modalText1Fac: {
		width: "30%",
		height: 30,
        color: "#171717",
        fontSize: 15,
		textAlign: "left",
		backgroundColor: "#f0f0f0",
		padding: 5,
		borderBottomWidth: 1,
		borderRightWidth: 1,
		borderColor: "#b4b5b9",
		fontWeight: "bold"
    },
	modalText2Fac: {
		width: "70%",
		height: 30,
        color: "#171717",
        fontSize: 15,
		textAlign: "left",
		padding: 5,
		borderBottomWidth: 1,
		borderColor: "#b4b5b9",
    },
	cursoViewFac: {
		width: "100%",
		height: 60,
		backgroundColor: "#f0f0f0"
	},
	cursoViewNoEncontrado: {
		width: "100%",
		display: "flex",
		justifyContent: "center",
		height: 60,
		marginTop: 10,
		borderRadius: 5,
		backgroundColor: "#f0f0f0",
		borderWidth: 1,
		borderColor: "#b4b5b9",
	},
	cursoTextFac1: {
		color: "#171717",
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderColor: "#b4b5b9",
		padding: 5,
		fontSize: 14,
		height: 30,
		fontWeight: "bold",
		backgroundColor: "#f0f0f0"
	},
	cursoTextFac10: {
		color: "#171717",
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderColor: "#b4b5b9",
		padding: 5,
		fontSize: 14,
		height: 30
	},
	cursoTextFac2: {
		color: "#171717",
		borderBottomWidth: 1,
		borderColor: "#b4b5b9",
		padding: 5,
		fontSize: 14,
		height: 30,
		fontWeight: "bold",
		backgroundColor: "#f0f0f0"
	},
	cursoTextFac20: {
		color: "#171717",
		borderBottomWidth: 1,
		borderColor: "#b4b5b9",
		padding: 5,
		fontSize: 14,
		height: 30
	},
	columnDateFac: {
		width: "30%",
		height: 60,
	},
	columnDate2Fac: {
		width: "70%",
		height: 60
	},
	cursoViewNoEncontradoFac: {
		width: "100%",
		display: "flex",
		justifyContent: "center",
		height: 40,
		backgroundColor: "#f0f0f0",
		borderBottomWidth: 1,
		borderColor: "#b4b5b9",
	},
});