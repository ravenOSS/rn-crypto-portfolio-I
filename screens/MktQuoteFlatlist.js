// This code is setting up an Apollo Client to make GraphQL requests to the Blocktap API. It is creating an httpLink to the Blocktap API, setting up an authLink to provide the API key, and creating an Apollo Client with the httpLink and authLink. It is also setting up a GraphQL query to get the market caps of assets.
import { ApolloProvider, gql, useQuery } from '@apollo/client'
import BlocktapClient from '../components/BlocktapClient'
import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native'
import { useTheme } from 'react-native-paper'

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
const limit = 15

const TOP_RANKED_QUERY = gql`
	query topRankedAssets {
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
			marketCapRank
		}
	}
`

// const IntrospectionQuery = gql`
// 	query IntrospectionQuery {
//   __schema {
//     queryType {
//       name
//     }
//     mutationType {
//       name
//     }
//     subscriptionType {
//       name
//     }
//     types {
//       ...FullType
//     }
//     directives {
//       name
//       description
//       locations
//       args {
//         ...InputValue
//       }
//     }
//   }
// }

// const TOP_RANKED_QUERY = gql`
// 	query topRankedAssets {
// 		assets(
// 			filter: {
// 				marketCapRank: {
// 					_lte: 15 # less than or equal to 15
// 				}
// 			}
// 			sort: { marketCapRank: ASC }
// 		) {
// 			id
// 			assetName
// 			assetSymbol
// 			marketCapRank
// 			markets {
// 				marketSymbol
// 				ticker {
// 					lastPrice
// 					baseVolume
// 					percentChange
// 				}
// 			}
// 		}
// 	}
// `

const MarketQuote = () => {
	// function MarketList () {
	const [portfolio, setPortfolioAdd] = useState([])

	// Fetch cryptocurrency data using Apollo useQuery hook
	// https://www.apollographql.com/docs/react/api/react/hooks/#usequery
	const { loading, error, data, refetch } = useQuery(TOP_RANKED_QUERY, {
		fetchPolicy: 'cache-and-network',
	})

	useFocusEffect(
		useCallback(() => {
			refetch()
		}, [])
	)

	if (loading) {
		// Render loading state
		return (
			<View style={styles.messageContainer}>
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

	if (!data) {
		// Render empty state
		return (
			<View style={styles.messageContainer}>
				<Text>Not found</Text>
			</View>
		)
	}

	console.log(`Data: ${JSON.stringify(data)}`)
	console.log(`Portfolio: ${portfolio}`)

	function renderItem({ item }) {
		return (
			<View style={styles.itemContainer}>
				<Pressable
					key={item.id}
					onPress={() => {
						alert(`${item.assetSymbol} Currency Added to Portfolio`)

						setPortfolioAdd([...portfolio, item.id])
					}}
				>
					<View style={styles.horizontal}>
						<Text style={styles.name}>{item.assetName}</Text>
					</View>
					<View style={styles.horizontal}>
						<Text style={styles.symbol}>{item.assetSymbol}</Text>
					</View>
					<Text style={styles.currency}>
						Market Cap Rank: {item.marketCapRank.toLocaleString()}
					</Text>
				</Pressable>
			</View>
		)
	}

	const headerContent = () => {
		return (
			<View style={styles.itemContainer}>
				<Text style={styles.ListHeader}>Crypto Market Quote</Text>
			</View>
		)
	}

	// Render FlatList with cryptocurrency data
	return (
		<View style={styles.container}>
			<FlatList
				data={data.assets} // Replace with the actual data retrieved from GraphQL query
				ListHeaderComponent={headerContent}
				renderItem={renderItem}
				keyExtractor={(item) => item.id} // Replace with the unique identifier for each item
				horizontal={false}
				numColumns={1}
			/>
		</View>
	)
}

function MarketQuoteScreen() {
	return (
		<ApolloProvider client={BlocktapClient}>
			<View style={styles.container}>
				<MarketQuote />
			</View>
		</ApolloProvider>
	)
}

export default MarketQuoteScreen

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
	currency: {
		fontSize: 16,
		color: '#333',
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	messageContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	errorContainer: {
		// required for error message?
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f8d7da',
		padding: 16,
	},
	ListHeader: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333',
	},
})
