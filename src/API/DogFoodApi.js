class DogFoodApi {
    constructor({baseUrl}) {
        this.baseUrl = baseUrl

        this.token = ''
    }

    getAuthorizationHandler() {
        return `Bearer ${this.token}`
    }

    checkToken() {
        this.token = token
    }

    async signIn() {
        const res = await fetch({

        }
        
        if (res.status === 401) {

        }
        if (res.status === 401) {

        }

        return res.json()
        )
    }
}

export const dogFoodApi = new DogFoodApi()