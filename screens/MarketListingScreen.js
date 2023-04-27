// This code is setting up an Apollo Client to make GraphQL requests to the Blocktap API. It is creating an httpLink to the Blocktap API, setting up an authLink to provide the API key, and creating an Apollo Client with the httpLink and authLink. It is also setting up a GraphQL query to get the market caps of assets.
import { ApolloProvider, gql, useQuery } from '@apollo/client'
import BlocktapClient from '../components/BlocktapClient'
import { useEffect, useState } from 'react'

import {
	StyleSheet,
	Text,
	View,
	Pressable,
	FlatList,
	StatusBar,
} from 'react-native'
import { useTheme, DataTable } from 'react-native-paper'

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


const MarketCapsTableContent = () => {
	const { loading, error, data } = useQuery(GET_MARKETCAPS, {
		fetchPolicy: 'network-only',
	}) // only network not cache

	console.log(`Data: ${JSON.stringify(data)}`)

	const [portfolio, setAddToPortfolio] = useState([])

	console.log(`Portfolio: ${portfolio}`)

	if (loading) return <Text>Loading...</Text>
	if (error) return <Text>Error: ${error.message}</Text>
	if (!data) return <Text>Not found</Text>

	const tableRows = data.assets.map(
		({ id, assetName, assetSymbol, marketCap }) => (
			<Pressable
				key={id}
				onPress={() => {
					alert(`${assetSymbol} Currency Added to Portfolio`)

					setAddToPortfolio([...portfolio, id])
				}}
			>
				<DataTable.Row>
					<DataTable.Cell>{assetName}</DataTable.Cell>
					<DataTable.Cell>{assetSymbol}</DataTable.Cell>
					<DataTable.Cell numeric>{marketCap.toLocaleString()}</DataTable.Cell>
				</DataTable.Row>
			</Pressable>
		)
	)
	return tableRows
}

const numberOfItemsPerPage = [5, 10, 15]

const DisplayMarketCaps = () => {
	const [page, setPage] = useState(0)
	const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPage[0])

	useEffect(() => {
		setPage(0)
	}, [itemsPerPage])

	return (
		<DataTable>
			<DataTable.Header>
				<DataTable.Title>Asset Name</DataTable.Title>
				<DataTable.Title>Symbol</DataTable.Title>
				<DataTable.Title>Market Cap USD</DataTable.Title>
			</DataTable.Header>
			<MarketCapsTableContent />

			<DataTable.Pagination
				page={page}
				numberOfPages={3}
				onPageChange={(page) => setPage(page)}
				label='1-2 of 6'
				optionsPerPage={numberOfItemsPerPage}
				itemsPerPage={itemsPerPage}
				setItemsPerPage={setItemsPerPage}
				showFastPagination
				optionsLabel={'Rows per page'}
			/>
		</DataTable>
	)
}

function MarketListing() {
	return (
		<ApolloProvider client={BlocktapClient}>
			<View style={styles.container}>
				<Text style={styles.title}>Crypto Market Cap Ranking</Text>
				<Text style={styles.body}>Let's create a tracking portfolio</Text>
				<DisplayMarketCaps />
			</View>
		</ApolloProvider>
	)
}

export default MarketListing

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'gray',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: StatusBar.currentHeight || 0,
	},
	title: {
		fontSize: 25,
		fontWeight: '500',
		padding: 5,
		textAlign: 'center',
	},
	item: {
		backgroundColor: '#f9c2ff',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
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
