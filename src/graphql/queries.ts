import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($categoryName: String) {
    products(categoryName: $categoryName) {
      id
      name
      description
      price
      in_stock
      gallery
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      price
      in_stock
      category {
        id
        name
      }
      description
      gallery
      attributes {
        id
        name
        type
        items {
          id
          value
          displayValue
          swatch
        }
      }
    }
  }
`;
