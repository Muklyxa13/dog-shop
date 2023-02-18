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
    const res = await fetch(`${this.baseUrl}/products?query=${search}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    if (res.status > 299) {
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
}

export const dogFoodApi = new DogFoodApi({
  baseUrl: "https://api.react-learning.ru",
})
