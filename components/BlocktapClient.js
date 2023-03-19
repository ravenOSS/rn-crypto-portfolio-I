import { ApolloClient, InMemoryCache } from '@apollo/client'
import { Blocktap_API_KEY, BlockTap_GraphQL_ENDPOINT } from '@env'

const BlocktapClient = new ApolloClient({
	uri: BlockTap_GraphQL_ENDPOINT,
	//! change cache to network only
	cache: new InMemoryCache(),
	headers: {
		authorization: Blocktap_API_KEY,
	},
})

export default BlocktapClient
