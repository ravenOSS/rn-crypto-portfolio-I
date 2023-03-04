import { AWS_GraphQL_API_KEY } from '@env'
import { createAuthLink } from 'aws-appsync-auth-link'

import { v4 as uuidv4 } from 'uuid'
import {
	ApolloProvider,
	ApolloClient,
	ApolloLink,
	InMemoryCache,
	HttpLink,
	gql,
	useMutation,
	useQuery,
} from '@apollo/client'

import awsmobile from '../src/aws-exports'

const url = awsmobile.aws_appsync_graphqlEndpoint
const region = awsmobile.aws_appsync_region
const auth = {
	type: awsmobile.aws_appsync_authenticationType,
	apiKey: AWS_GraphQL_API_KEY,
}

const AShttpLink = new HttpLink({ uri: url })

const AppSyncLink = ApolloLink.from([
	createAuthLink({ url, region, auth }),
	AShttpLink,
])

const AppSyncClient = new ApolloClient({
	AppSyncLink,
	cache: new InMemoryCache(),
})

export default AppSyncClient
