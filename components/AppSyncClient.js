/* Here is the explanation for the code below:
1. We import the createAuthLink and createSubscriptionHandshakeLink functions from the aws-appsync-auth-link and aws-appsync-subscription-link packages.
2. We create an ApolloLink from the createAuthLink function and pass the url, region and auth objects as arguments.
3. We create an Apollo client and pass the AppSyncLink and InMemoryCache as arguments.
4. We export the AppSyncClient from the module. */

import { createAuthLink } from 'aws-appsync-auth-link'
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link'

// The createSubscriptionHandshakeLink is used in the AWS documentation to create a subscription link and shows the syntax for using the httpLink. However, the createSubscriptionHandshakeLink is not required in our application. So, httpLink has to be moved to the AppSyncLink creation

import {
	ApolloClient,
	ApolloLink,
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

const AppSyncLink = ApolloLink.from([
	createAuthLink({ url, region, auth }),
	httpLink,
])

const AppSyncClient = new ApolloClient({
	link: AppSyncLink,
	cache: new InMemoryCache(),
})

export default AppSyncClient
