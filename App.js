import { StatusBar, StyleSheet, View } from "react-native";
import Header from "./Componentes/Header.js";
import WelcomeApp from "./Componentes/WelcomeApp.js";
import SingUpScreen from "./Componentes/SingUpScreen.js";
import LoginInScreen from "./Componentes/LoginInScreen.js";
import RegistrosUser from "./Componentes/RegistrosUser.js";
import { ButtonProvider } from './Componentes/ButtonContext.js';
import { ViewVisibleProvider } from './Componentes/ViewVisibleContext.js';

export default function App() {
	return (
		<ButtonProvider>
            <ViewVisibleProvider>
				<View style={styles.container}>
					<Header />
					<WelcomeApp />
					<SingUpScreen />
					<LoginInScreen />
					<RegistrosUser />
					<StatusBar />
				</View>
			</ViewVisibleProvider>
        </ButtonProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
	},
});
