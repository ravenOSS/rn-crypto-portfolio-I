import { createAuthLink } from 'aws-appsync-auth-link'
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link'

import {
	ApolloClient,
	ApolloLink,
	from,
	HttpLink,
	InMemoryCache,
} from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'

import awsmobile from '../src/aws-exports'

const url = awsmobile.aws_appsync_graphqlEndpoint
const region = awsmobile.aws_appsync_region
const auth = {
	type: awsmobile.aws_appsync_authenticationType,
	apiKey: awsmobile.aws_appsync_apiKey,
}

const httpLink = new HttpLink({ uri: url })

// ! PER GPT - add (operation, forward)
const AppSyncLink = ApolloLink.from([
	createAuthLink({ url, region, auth }, httpLink),
	createSubscriptionHandshakeLink(url, httpLink),
	// Add the forward function here
	(operation, forward) => {
		return forward(operation).map((response) => {
			const { errors } = response
			if (errors) {
				errors.map(({ message }) => {
					console.warn(`[GraphQL error]: Message: ${message}`)
				})
			}
			return response
		})
	},
])

const BlocktapClient = new ApolloClient({
	uri: awsmobile.aws_appsync_graphqlEndpoint,
	//! change cache to network only
	cache: new InMemoryCache(),
	headers: {
		authorization: auth,
	},
})

const AppSyncClient = new ApolloClient({
	link: AppSyncLink,
	cache: new InMemoryCache(),
})

export default AppSyncClient
