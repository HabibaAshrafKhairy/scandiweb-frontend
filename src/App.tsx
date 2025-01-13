import "./App.css";
import React from "react";
import Header from "./components/header";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AppRoutes from "./components/appRoutes";
import { Toaster } from "react-hot-toast";

// okay now this is working as it used to be http://localhost/scandiweb/graphql.php old file and no cors issues and htaccess must be in public folder nt root

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <ApolloProvider client={client}>
        <div className="px-4 md:px-28">
          <Toaster toastOptions={{ duration: 4000 }} />
          <Header />

          <AppRoutes />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
