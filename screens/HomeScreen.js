import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Welcome Crypto Enthusiast!</Text>
			<Text>Let's create a tracking portfolio</Text>
		</View>
	)
}

export default Home

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'gray',
		alignItems: 'center',
		justifyContent: 'center',
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
		marginBottom: 50,
		paddingBottom: 20,
	},
})
