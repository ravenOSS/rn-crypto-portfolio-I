import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	ApolloLink,
	gql,
	useMutation,
	useQuery,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import {
	AWS_GraphQL_API_KEY,
	AWS_GraphQL_ENDPOINT,
	Blocktap_API_KEY,
	BlockTap_GraphQL_ENDPOINT,
} from '@env'

const blocktap_httpLink = createHttpLink({
	uri: BlockTap_GraphQL_ENDPOINT,
})

const blocktap_authLink = setContext((_, { headers }) => {
	const token = Blocktap_API_KEY
	//! return the headers to the context so blocktap_httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	}
})

const BlocktapClient = new ApolloClient({
	link: blocktap_authLink.concat(blocktap_httpLink),
	cache: new InMemoryCache(),
	credentials: 'include',
})

export default BlocktapClient
