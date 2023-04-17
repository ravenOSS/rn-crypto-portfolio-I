import React, { useState } from 'react'
import AppSyncClient from '../components/AppSyncClient'
import { ApolloProvider, gql, useMutation, useQuery } from '@apollo/client'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { v4 as uuidv4 } from 'uuid'
// import { createAsset } from '../src/graphql/mutations'

// ! Define mutation
// ! Per GTP
const CREATE_ASSET_MUTATION = gql`
	mutation CreateAsset(
		$uniqueID: String!
		$assetName: String!
		$assetSymbol: String!
	) {
		createAsset(
			input: {
				uniqueID: $uniqueID
				assetName: $assetName
				assetSymbol: $assetSymbol
			}
		) {
			id
			uniqueID
			assetName
			assetSymbol
		}
	}
`
// Mutation from src/graphql/mutations.js
export const createAsset = /* GraphQL */ `
  mutation CreateAsset(
    $input: CreateAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    createAsset(input: $input, condition: $condition) {
      id
      uniqueID
      assetName
      assetSymbol
      initialPurchasePrice
      assignedCapital
      lastPrice
      lastRank
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;

const AssetEntryForm = () => {
	const [uniqueId, setUniqueId] = useState('')
	const [assetName, setAssetName] = useState('')
	const [assetSymbol, setAssetSymbol] = useState('')
	const [createAsset, { loading, error }] = useMutation(CREATE_ASSET_MUTATION)

	if (loading) return <Text>'Submitting...'</Text>
	if (error) return <Text>`Submission error! ${error.message}`</Text>

	const handleFormSubmit = () => {
		createAsset({
			variables: {
				uniqueID: uniqueId,
				assetName: assetName,
				assetSymbol: assetSymbol,
			},
		})
	}

	return (
		<View style={styles.container}>
			<Text style={styles.label}>UniqueID:</Text>
			<TextInput
				style={styles.input}
				placeholder='Enter Asset ID'
				onChangeText={(text) => setUniqueId(text)}
				value={uniqueId}
			/>

			<Text style={styles.label}>AssetName:</Text>
			<TextInput
				style={styles.input}
				placeholder='Enter Asset Name'
				onChangeText={(text) => setAssetName(text)}
				value={assetName}
			/>

			<Text style={styles.label}>Symbol:</Text>
			<TextInput
				style={styles.input}
				placeholder='Enter Asset Symbol'
				onChangeText={(text) => setAssetSymbol(text)}
				value={assetSymbol}
			/>

			<Button
				mode='contained'
				onPress={() => {
					Alert.alert('Pressed')
					handleFormSubmit()
				}}
			>
				Submit
			</Button>
		</View>
	)
}

function CreateAsset() {
	return (
		<ApolloProvider client={AppSyncClient}>
			<AssetEntryForm />
		</ApolloProvider>
	)
}

export default CreateAsset

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'gray',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 20,
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
	label: {
		fontSize: 18,
		marginBottom: 10,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 4,
		padding: 10,
		marginBottom: 20,
		fontSize: 18,
		width: 150,
		alignItems: 'center',
		justifyContent: 'center',
	},
	signOut: {
		marginBottom: 30,
		paddingBottom: 20,
	},
})
// const CREATE_ASSET_MUTATION = gql`
// 	mutation CreateAsset(
// 		# Which variables are getting passed in? And What types are they
// 		$uniqueID: String!
// 		$assetName: String!
// 		$assetSymbol: String!
// 	) {
// 		createAsset(
// 			uniqueID: $uniqueID
// 			assetName: $assetName
// 			assetSymbol: $assetSymbol
// 		) {
// 			# data returned after execution of the mutation
// 			id
// 			uniqueID
// 			assetName
// 			assetSymbol
// 		}
// 	}
// `

// ! Original code before GPT
// const AssetEntryForm = () => {
// 	const [uniqueId, setUniqueId] = useState('')
// 	const [assetName, setAssetName] = useState('')
// 	const [assetSymbol, setAssetSymbol] = useState('')

// 	const [createAsset, { loading, error }] = useMutation(CREATE_ASSET_MUTATION)

// 	// ! Per GPT
// 	const handleFormSubmit = () => {
// 		createAsset({
// 			variables: {
// 				input: {
// 					uniqueID,
// 					assetName,
// 					assetSymbol,
// 				},
// 			},
// 		})
// 	}

// const handleFormSubmit = () => {
// 	createAsset({
// 		variables: {
// 			uniqueId,
// 			assetName,
// 			assetSymbol,
// 		},
// 	})
// }



//! useMutation hook returns two items:
//! A mutate function that can be called to execute mutation
//! An object with fields that represent the current status of the mutation's execution
//! Note that we provide the name for the function that is returned from the hook
//! error and loading states can be used in the UI or for code to handle

// const DELETE_ASSET = gql`
// 	mutation deleteAsset($input: DeleteAssetInput!) {
// 		deleteAsset(input: $input) {
// 			id
// 		}
// 	}
// `
// const UPDATE_ASSET = gql`
// 	mutation updateAsset($input: UpdateAssetInput!) {
// 		updateAsset(input: $input) {
// 			id
// 			uniqueID
// 		}
// 	}
// `
// const LIST_ASSETS = gql`
// 	query listAssets {
// 		listAssets {
// 			items {
// 				id
// 				name
// 				description
// 			}
// 		}
// 	}
// `
