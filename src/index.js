
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import React from "react";
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/auth";
import { HomeProvider } from "./context/HomeContext";
import './index.css';
import ScrollToTop from './ScrollToTop'
const queryClient = new QueryClient();

const theme = extendTheme({
  components: {
    Steps,
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
  <AuthProvider>
     <ScrollToTop />
      <ChakraProvider  theme={theme}>
        <HomeProvider>
          <App />
        </HomeProvider>
      </ChakraProvider>
  </AuthProvider>
    </BrowserRouter>
</QueryClientProvider>,
);

