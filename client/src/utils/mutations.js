import { gql } from "@apollo/client";

export const LOGIN = gql`
mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          title
          link
          image
          description
          bookId
          authors
        }
      }
    }
  }
`
export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          authors
          bookId
          description
          image
          link
          title
        }
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation Mutation(
    $authors: [String]
    $description: String
    $title: String
    $bookId: String
    ) {
    saveBook(
        authors: $authors
        description: $description
        title: $title
        bookId: $bookId
        ) {
        _id
        username
        email
        bookCount
        savedBooks {
            authors
            bookId
            description
            image
            link
            title
        }
    }
}
`;

export const REMOVE_BOOK = gql`
  mutation Mutation($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
    }
  }
`;

