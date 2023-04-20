// This code imports the necessary components from the Amplify, React Native, and React Native Paper libraries, configures Amplify with the awsconfig file, and creates a SignOutButton component and a TabNavigator component. It also creates a MaterialBottomTabNavigator component and renders the App component.
import { Amplify } from 'aws-amplify'
import awsmobile from './src/aws-exports'
Amplify.configure(awsmobile)
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Text, View, Pressable, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { Provider as PaperProvider, ThemeProvider } from 'react-native-paper'

import { NavigationContainer } from '@react-navigation/native'
// import { Button } from 'react-native'

import TabNavigation from './components/TabsNavigator'

function SignOutButton() {
	const { signOut } = useAuthenticator()
	return <Button title='Sign Out' onPress={signOut} />
}


function App() {
	return (
		<Authenticator.Provider>
			<Authenticator loginMechanisms={['email']}>
				<PaperProvider>
					<SafeAreaView>
						<SignOutButton />
						<StatusBar style='auto' />
					</SafeAreaView>
					<NavigationContainer>
						<TabNavigation />
					</NavigationContainer>
				</PaperProvider>
			</Authenticator>
		</Authenticator.Provider>
	)
}

export default App

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'gray',
		alignItems: 'center',
		
		// justifyContent: 'center',
	},
	title: {
		fontSize: 25,
		fontWeight: '500',
		padding: 5,
		textAlign: 'center',
	},
	body: {
		backgroundColor: 'gray',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
