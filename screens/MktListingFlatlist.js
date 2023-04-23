// This code is setting up an Apollo Client to make GraphQL requests to the Blocktap API. It is creating an httpLink to the Blocktap API, setting up an authLink to provide the API key, and creating an Apollo Client with the httpLink and authLink. It is also setting up a GraphQL query to get the market caps of assets.
import { ApolloProvider, gql, useQuery } from '@apollo/client'
import BlocktapClient from '../components/BlocktapClient'
import { useEffect, useState } from 'react'

import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native'
import { useTheme } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'

const GET_MARKETCAPS = gql`
	query MarketCapRank {
		assets(
			filter: {
				marketCapRank: {
					_lte: 15 # less than or equal to 15
				}
			}
			sort: { marketCapRank: ASC }
		) {
			id
			assetName
			assetSymbol
			marketCap
		}
	}
`

const renderItem = ({ item }) => (
	<View style={styles.itemContainer}>
		<Text style={styles.name}>{item.assetName}</Text>
		<Text style={styles.symbol}>{item.assetSymbol}</Text>
		<Text style={styles.price}>
			Market Cap: {item.marketCap.toLocaleString()}
		</Text>
	</View>
)

const CryptoListScreen = () => {
	// Fetch cryptocurrency data using Apollo useQuery hook
	const { loading, error, data } = useQuery(GET_MARKETCAPS, {
		fetchPolicy: 'network-only',
	})

	if (loading) {
		// Render loading state
		return (
			<View style={styles.loadingContainer}>
				<Text>Loading...</Text>
			</View>
		)
	}

	if (error) {
		// Render error state
		return (
			<View style={styles.errorContainer}>
				<Text>Error: {error.message}</Text>
			</View>
		)
	}

	console.log(`Data: ${JSON.stringify(data)}`)
	// Render FlatList with cryptocurrency data
	return (
		<View style={styles.container}>
			<FlatList
				data={data.assets} // Replace with the actual data retrieved from GraphQL query
				renderItem={renderItem}
				keyExtractor={(item) => item.id} // Replace with the unique identifier for each item
			/>
		</View>
	)
}

function FlatMarketList() {
	return (
		<ApolloProvider client={BlocktapClient}>
			<View style={styles.container}>
				<Text style={styles.title}>Crypto Market Cap Ranking</Text>
				<Text style={styles.body}>Let's create a tracking portfolio</Text>
				<CryptoListScreen />
			</View>
		</ApolloProvider>
	)
}

export default FlatMarketList

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	itemContainer: {
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		paddingVertical: 8,
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	symbol: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#666',
	},
	price: {
		fontSize: 16,
		color: '#333',
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	errorContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f8d7da',
		padding: 16,
	},
})

// function MarketCapsListContent() {
// 	const { data, loading, error } = useQuery(GET_MARKETCAPS, {
// 		client: BlocktapClient,
// 	})

// 	const [marketCaps, setMarketCaps] = useState([])

// 	useEffect(() => {
// 		if (data) {
// 			setMarketCaps(data.assets)
// 		}
// 	}, [data])

// 	if (loading) {
// 		return <Text>Loading...</Text>
// 	}

// 	if (error) {
// 		return <Text>Error! {error.message}</Text>
// 	}

// 	return (
// 		<FlatList
// 			data={marketCaps}
// 			renderItem={({ item }) => {
// 				console.log('Rendering item:', item);
// 				return (
// 				<View style={styles.container}>
// 					<Text style={styles.title}>
// 						{item.assetName} ({item.assetSymbol}) - {item.marketCap}
// 					</Text>
// 				</View>
// 			)}
// 			keyExtractor={(item) => item.id}
// 		/>
// 	)
// }
// export default FlatMarketList
