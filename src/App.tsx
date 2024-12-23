import "./App.css";
import React from "react";
import Header from "./components/header";
import { Navigate, Route, Routes } from "react-router-dom";
import ProductsListPage from "./pages/PLP";
import ProductDetailsPage from "./pages/PDP";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost/scandiweb/graphql.php",
  cache: new InMemoryCache(),
});

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <ApolloProvider client={client}>
        <div className="px-4 md:px-28">
          <Header />

          <Routes>
            <Route path="/" element={<Navigate to="/products/all" />} />
            <Route
              path="/products/"
              element={<Navigate to="/products/all" />}
            />
            <Route path="products/:category" element={<ProductsListPage />} />
            <Route
              path="products/:category/:productId"
              element={<ProductDetailsPage />}
            />
          </Routes>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
