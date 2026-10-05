import { productFragment } from './product';

export const getCollectionQuery = /* GraphQL */ `
  query GetCollection(
    $handle: String!
    $first: Int!
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $filters: [ProductFilter!]
  ) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      seo {
        title
        description
      }
      image {
        url
        altText
      }
      products(
        first: $first
        sortKey: $sortKey
        reverse: $reverse
        filters: $filters
      ) {
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
  }
  ${productFragment}
`;

export const getCollectionsQuery = /* GraphQL */ `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

export const GET_COLLECTION_META_QUERY = /* GraphQL */ `
  query GetCollectionMeta($handle: String!) {
    collection(handle: $handle) {
      title
      description
      image {
        url
        altText
        width
        height
      }
    }
  }
`;

