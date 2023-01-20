import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { SignIn } from "./components/Pages/SignIn/SignIn"
import { SignUp } from "./components/Pages/SignUp/SignUp"
import { Products } from "./components/Pages/Products/Products"
import { Main } from "./components/Main/Main"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DogShopContextProvider } from "./Contexts/DogShopContextProvider"
import { SignOut } from "./components/Pages/SignOut/SignOut"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signout",
        element: <SignOut />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        // path: "main",
        index: true,
        element: <Main />,
      },
    ],
  },
], 
// { basename: "/dog-shop" }
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DogShopContextProvider>
        <RouterProvider router={router} />
      </DogShopContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
)