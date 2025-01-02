import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./router/rootLayout";
import MainPage from "./pages/mainPage";
import ListPage from "./pages/listPage";
import GlobalStyle from "./assets/style/GlobalStyle";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./assets/style/theme";
import RankingPage from "./pages/rankingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "list",
        element: <ListPage />,
      },
      {
        path: "ranking",
        element: <RankingPage />,
      },
    ],
  },
]);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
