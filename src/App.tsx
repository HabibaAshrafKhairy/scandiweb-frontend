import "./App.css";
import React from "react";
import Header from "./components/header";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AppRoutes from "./components/appRoutes";
import { Toaster } from "react-hot-toast";

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_API,
  cache: new InMemoryCache(),
});

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <ApolloProvider client={client}>
        <div className="px-4 md:px-28">
          <Toaster />
          <Header />

          <AppRoutes />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
