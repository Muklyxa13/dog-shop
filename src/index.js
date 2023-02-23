import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { SignIn } from "./components/Pages/SignIn/SignIn"
import { SignUp } from "./components/Pages/SignUp/SignUp"
import { Main } from "./components/Main/Main"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Cart } from "./components/Pages/Cart/Cart"
import { store } from "./redux/store"
import { Provider } from "react-redux"
import { SearchAndProducts } from "./components/SearchAndProducts/SearchAndProducts"
import { ProductDetailPage } from "./components/Pages/ProductDetailPage/ProductDetailPage"
import { FavoritePage } from "./components/Pages/FavoritePage/FavoritePage"
import { User } from "./components/Pages/User/User"
import { ProductReviewsById } from "./components/Pages/ProductDetailPage/ProductReviewsById/ProductReviewsById"

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "signin",
          element: <SignIn />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "/products",
          element: <SearchAndProducts />,
        },
        {
          path: "/products/:productId",
          element: <ProductDetailPage />,
        },
        {
          path: "/products/:productId",
          element: <ProductReviewsById />,
        },
        {
          path: "/favorite",
          element: <FavoritePage />,
        },
        {
          path: "/user",
          element: <User />,
        },
        {
          // path: "main",
          index: true,
          element: <Main />,
        },
      ],
    },
  ]
  // { basename: "/dog-shop/" }
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
)
