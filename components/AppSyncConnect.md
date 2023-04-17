# Build connection to AWS-AppSync from Apollo Client

To construct a connection string from Apollo Client to AWS AppSync, you can use the `createHttpLink` method from the `apollo-link-http` package, along with your AppSync endpoint URL and any necessary configuration options. Here's an example:

```javascript
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createHttpLink } from 'apollo-link-http'

const endpoint = 'https://your-appsync-endpoint-url/graphql'

const httpLink = createHttpLink({
	uri: endpoint,
	headers: {
		// Add any required headers, such as API key or authorization token
	},
})

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
})
```

//In this example, we're creating an Apollo Client instance with a link that points to the AppSync endpoint URL. We're also setting any required headers, such as an API key or authorization token, in the `headers` option of the `createHttpLink` method.

//Once you've created your client, you can use it to send queries, mutations, and subscriptions to your AppSync API.

To connect Apollo Client to AWS AppSync using the `awsmobile` configuration, you can follow these steps:

- Install required packages:

```bash
npm install aws-appsync graphql-tag apollo-client apollo-cache-inmemory apollo-link-http aws-sdk
```

- Import necessary modules:

```javascript
import AWSAppSyncClient from 'aws-appsync'
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	ApolloLink,
	gql,
} from '@apollo/client'
import AWS from 'aws-sdk'
```

- Create an instance of AWS AppSync client:

```javascript
AWS.config.update({
	region: awsmobile.aws_project_region,
	credentials: new AWS.CognitoIdentityCredentials({
		IdentityPoolId: awsmobile.aws_cognito_identity_pool_id,
	}),
})

const client = new AWSAppSyncClient({
	url: awsmobile.aws_appsync_graphqlEndpoint,
	region: awsmobile.aws_appsync_region,
	auth: {
		type: awsmobile.aws_appsync_authenticationType,
		credentials: AWS.config.credentials,
	},
	disableOffline: true,
	cache: new InMemoryCache(),
	link: ApolloLink.from([
		createHttpLink({
			uri: awsmobile.aws_appsync_graphqlEndpoint,
		}),
	]),
})
```

- Wrap your app with ApolloProvider and Rehydrated:

```javascript
<ApolloProvider client={client}>
	<Rehydrated>
		<App />
	</Rehydrated>
</ApolloProvider>
```

- Use the client to execute GraphQL queries:

```javascript
client
	.query({
		query: gql`
			query {
				listAssets {
					items {
						id
						name
						description
					}
				}
			}
		`,
	})
	.then((data) => console.log('data', data))
	.catch((err) => console.log('error', err))
```

Note: Make sure to replace the GraphQL query with your own query according to your AWS AppSync API.
