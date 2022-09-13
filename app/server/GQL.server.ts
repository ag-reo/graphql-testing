import { GraphQLClient } from 'graphql-request'
import { getSdk } from './sdk'

const GQL_ENDPOINT = process.env.REMIX_GQL_ENDPOINT
if (!GQL_ENDPOINT) {
  console.log('No GraphQL end-point', process.env)
  throw new Error('No GraphQL end-point')
}

export function gqlSdk(slice?: string, fetch?: any) {
  if (!GQL_ENDPOINT) {
    throw new Error('No GraphQL end-point was discovered')
  }

  let graphQLClient: GraphQLClient

  try {
    if (fetch) {
      graphQLClient = new GraphQLClient(GQL_ENDPOINT, {
        fetch,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: slice ? `Bearer ${slice}` : '',
        },
      })
    } else {
      graphQLClient = new GraphQLClient(GQL_ENDPOINT, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: slice ? `Bearer ${slice}` : '',
        },
      })
    }

    return getSdk(graphQLClient)
  } catch (err) {
    throw getError(err)
  }
}

function getError(err: any) {
  // Validation errors
  if (err.response && err.response.errors && err.response.errors.length > 0) {
    const message = err.response.errors
      .map((graphqlError: any) => {
        const path = graphqlError.path ? `(${graphqlError.path}) ` : ''
        const errorMessage = graphqlError.message || 'Unknown error'
        return `${path}${errorMessage}`
      })
      .join('\n')
    return new Error(message)
  }

  // Internal Server Error
  if (err.response && err.response.status >= 500) {
    return new Error(`Please contact support - ${err.message}`)
  }

  return new Error(err.message)
}
