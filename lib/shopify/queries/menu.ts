export const getMenuQuery = /* GraphQL */ `
  query GetMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        title
        url
        type
        items {
          title
          url
          type
        }
      }
    }
  }
`;
