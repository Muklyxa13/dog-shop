import { useQuery } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"
import { dogFoodApi } from "../../../API/DogFoodApi"
import { getDetailSelector } from "../../../redux/slices/detailSlice"
import { getTokenSelector } from "../../../redux/slices/userSlice"
import { Loader } from "../../Loader/Loader"

export const ProductDetailPage = () => {
  const dispatch = useDispatch()
  const token = useSelector(getTokenSelector)
  const detailPage = useSelector(getDetailSelector)
  console.log({ detailPage })
  const id = detailPage.map((product) => product.id)

  const { data, isLoading } = useQuery({
    queryKey: ["detail"],
    queryFn: () => dogFoodApi.getProductById(id, token),
    keepPreviousData: true,
  })
  console.log({ data })

  if (isLoading) <Loader />

  return <div>деталька</div>
}
