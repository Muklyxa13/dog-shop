import { toast } from "react-hot-toast"

class DogFoodApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl

    this.token = ""
  }

  getAuthorizationHandler() {
    return `Bearer ${this.token}`
  }

  setToken(token) {
    this.token = token
  }

  checkToken() {
    if (!this.token) throw new Error("Отсутствует токен")
  }

  async signIn(values) {
    const res = await fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    if (res.status === 401) {
      throw new Error(`Ошибка ${res.status}: Неправильные почта или пароль`)
    }

    if (res.status === 404) {
      throw new Error(
        `Ошибка ${res.status}: Пользователь с указанным email не найден`
      )
    }

    if (res.status >= 300) {
      throw new Error(
        `Ошибка ${res.status}: Поле "email" должно быть валидным email-адресом`
      )
    }

    return res.json()
  }

  async signUp(values) {
    const res = await fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    if (res.status > 299) {
      throw new Error(
        `Ошибка ${res.status}: пользователь с таким email уже зарегистрирован`
      )
    }

    return res.json()
  }

  async getAllProducts(search, token) {
    const res = await fetch(`${this.baseUrl}/products/search?query=${search}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    if (res.status === 401) {
      throw new Error(`Вы не авторизованы! Status: ${res.status}`)
    }
    if (res.status > 299 && res.status <= 400) {
      throw new Error(
        `Ошибка при получении списка продуктов. Status: ${res.status}`
      )
    }

    return res.json()
  }

  async getProductById(productId, token) {
    const res = await fetch(`${this.baseUrl}/products/${productId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    return res.json()
  }

  getProductsByIds(ids, token) {
    return Promise.all(
      ids.map((id) =>
        fetch(`${this.baseUrl}/products/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json())
      )
    )
  }

  async pushCommentById(productId, token, values) {
    const res = await fetch(`${this.baseUrl}/products/review/${productId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })

    if (res.status === 200)
      toast.success("Отзыв успешно добавлен!", {
        duration: 2000,
      })

    return res.json()
  }

  async addNewProduct(values, token) {
    const res = await fetch(`${this.baseUrl}/products`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    })

    if (res.status === 201)
      toast.success("Продукт успешно добавлен!", {
        duration: 2000,
      })

    return res.json()
  }

  async editProduct(values, token, productId) {
    const res = await fetch(`${this.baseUrl}/products/${productId}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    })

    if (res.status === 200)
      toast.success("Продукт успешно обновлен!", {
        duration: 2000,
      })

    return res.json()
  }

  async deleteProduct(token, productId) {
    const res = await fetch(`${this.baseUrl}/products/${productId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    })

    if (res.status === 200) {
      toast.success("Продукт успешно удален!", {
        duration: 2000,
      })
    }

    return res.json()
  }

  async getUserByToken(token) {
    const res = await fetch(`${this.baseUrl}/v2/sm9/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    return res.json()
  }

  async getReviewsById(productId, token) {
    const res = await fetch(`${this.baseUrl}/products/review/${productId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    return res.json()
  }

  async editUserAvatar(token, value) {
    const res = await fetch(`${this.baseUrl}/v2/sm9/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(value),
    })

    if (res.status === 200)
      toast.success("Аватар успешно обновлен!", {
        duration: 2000,
      })

    return res.json()
  }

  async deleteComment(token, productId, reviewId) {
    const res = await fetch(
      `${this.baseUrl}/products/review/${productId}/${reviewId}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      }
    )
    if (res.status === 200)
      toast.success("Отзыв удален!", {
        duration: 2000,
      })

    return res.json()
  }
}

export const dogFoodApi = new DogFoodApi({
  baseUrl: "https://api.react-learning.ru",
})
