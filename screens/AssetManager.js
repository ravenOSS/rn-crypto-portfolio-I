import AppSyncClient from '../components/AppSyncClient'
import {
	ApolloProvider,
	ApolloConsumer,
	gql,
	useMutation,
	useQuery,
} from '@apollo/client'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { createAsset } from '../src/graphql/mutations'

export default function AssetManager() {
	const CREATE_ASSET = gql`
		mutation CreateAsset($input: input!) {
			createAsset(input: $input) {
				id
				name
				description
			}
		}
	`

	let input = {
		uniqueID: 'c6b426bd',
		assetName: 'Ethereum',
		assetSymbol: 'ETH',
	}

	return (
		<ApolloProvider client={AppSyncClient}>
			<View style={styles.container}>
				<Text>We have access to the client!'</Text>
				<Button onPress={createAsset({ input })}>Create Test Asset</Button>
			</View>
		</ApolloProvider>
	)
}

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
		backgroundColor: 'orange',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
	},
	signOut: {
		marginBottom: 5,
		paddingBottom: 20,
	},
})

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
