// create apollo client code to only use network and not cache
//

import { ApolloClient, InMemoryCache } from '@apollo/client'
import { Blocktap_API_KEY, BlockTap_GraphQL_ENDPOINT } from '@env'

const BlocktapClient = new ApolloClient({
	uri: BlockTap_GraphQL_ENDPOINT,
	cache: new InMemoryCache(),
	headers: {
		authorization: Blocktap_API_KEY,
	},
	// React useQuery hook will not update the cache when the network request is made. This is because the default fetchPolicy is cache-first. We can change this by setting the fetchPolicy to network-only.
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'network-only',
		},
		query: {
			fetchPolicy: 'network-only',
		},
	},
})

export default BlocktapClient
