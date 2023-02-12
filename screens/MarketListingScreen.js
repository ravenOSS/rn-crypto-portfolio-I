import { useEffect, useState } from 'react'

import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useTheme, DataTable } from 'react-native-paper'

import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	ApolloLink,
	gql,
} from '@apollo/client'
import { useMutation, useQuery } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const blocktap_httpLink = createHttpLink({
	uri: 'https://api.blocktap.io/graphql',
})

const blocktap_authLink = setContext((_, { headers }) => {
	const token = process.env.Blocktap_API_Key
	//! return the headers to the context so blocktap_httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	}
})

const blocktap_client = new ApolloClient({
	link: blocktap_authLink.concat(blocktap_httpLink),
	cache: new InMemoryCache(),
	credentials: 'include',
})

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
	const { loading, error, data } = useQuery(GET_MARKETCAPS)

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

function SignOutButton() {
	const { signOut } = useAuthenticator()
	return <Button title='Sign Out' onPress={signOut} />
}

function MarketListing() {
	return (
		<ApolloProvider client={blocktap_client}>
			<Text style={styles.title}>Welcome Crypto Enthusiast!</Text>
			<Text>Let's create a tracking portfolio</Text>
			<DisplayMarketCaps />
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
