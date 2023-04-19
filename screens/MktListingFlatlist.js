// This code is setting up an Apollo Client to make GraphQL requests to the Blocktap API. It is creating an httpLink to the Blocktap API, setting up an authLink to provide the API key, and creating an Apollo Client with the httpLink and authLink. It is also setting up a GraphQL query to get the market caps of assets.
import { ApolloProvider, gql, useQuery } from '@apollo/client'
import BlocktapClient from '../components/BlocktapClient'
import { useEffect, useState } from 'react'

import { StyleSheet, Text, View, Pressable, Flatlist } from 'react-native'
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

// create a MarketCapsTableContent function to render data returned from a graphql query using react-native Flatlist
function MarketCapsTableContent() {
	const { loading, error, data } = useQuery(GET_MARKETCAPS)
	const [marketCaps, setMarketCaps] = useState([])
	const { colors } = useTheme()

	useEffect(() => {
		if (data) {
			setMarketCaps(data.assets)
		}
	}, [data])

	if (loading) return <Text>Loading...</Text>
	if (error) return <Text>Error :(</Text>

	return (
		<Flatlist
			data={marketCaps}
			renderItem={({ item }) => (
				<View style={styles.container}>
					<Text style={styles.title}>
						{item.assetName} ({item.assetSymbol}) - {item.marketCap}
					</Text>
				</View>
			)}
			keyExtractor={(item) => item.id}
		/>
	)
}

/* Explanation for the code above:
1. The GraphQL query is called GET_MARKETCAPS, and it's a constant variable.
2. The query is structured in a way that it will return a list of assets that have a market cap rank less than or equal to 15.
3. The query will sort the result by market cap rank in ascending order.
4. The query will return the id, assetName, assetSymbol, and marketCap of each asset.
5. The MarketCapsTableContent function is a React component that will render the data returned from the GraphQL query.
6. The useQuery hook is used to execute the GraphQL query and return the result. It takes the GraphQL query as an argument.
7. The useState hook is used to create a state variable called marketCaps. It is initialized to an empty array.
8. The useEffect hook is used to update the marketCaps state variable when the data returned from the GraphQL query changes.
9. The Flatlist component is used to render the data returned from the GraphQL query. It takes the data as an argument and renders each item in the data array as a row in the table. */

{
	/* function SignOutButton() {
	const { signOut } = useAuthenticator()
	return <Button style={styles.signOut} title='Sign Out' onPress={signOut} />
} */
}

function FlatMarketList() {
	return (
		<ApolloProvider client={BlocktapClient}>
			<View style={styles.container}>
				<Text style={styles.title}>Crypto Market Cap Ranking</Text>
				<Text style={styles.body}>Let's create a tracking portfolio</Text>
				<MarketCapsTableContent />
			</View>
		</ApolloProvider>
	)
}

export default FlatMarketList

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
