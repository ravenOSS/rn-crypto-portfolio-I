import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { Provider as PaperProvider, ThemeProvider } from 'react-native-paper'
import { useTheme, DataTable } from 'react-native-paper'

import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Button } from 'react-native'

import TabNavigation from './components/TabsNavigator'

Amplify.configure(awsconfig)

function SignOutButton() {
	const { signOut } = useAuthenticator()
	return <Button title='Sign Out' onPress={signOut} />
}

const Tab = createMaterialBottomTabNavigator()

function App() {
	return (
		<Authenticator.Provider>
			<Authenticator loginMechanisms={['email']}>
				<PaperProvider>
					<SafeAreaView style={styles.container}>
						<StatusBar style='auto' />
						<SignOutButton style={styles.signOut} />
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
	signOut: {
		marginBottom: 10,
		paddingBottom: 20,
	},
})
