import httpClient from "../api/axiosConfig";

export default class FavoriteServices {
  async getFavorites(url: string) {
    try {
      const response = await httpClient({url, method: 'get'})
      const favorites: any = response.data
      return favorites
    } catch (error) {
      console.log(`Erro to get favorites: ${error}`)
      throw error;
    }
  }

  async createFavorite(url: string) {
    try {
      const response = await httpClient({url, method: 'post'})
      const favorite: any = response.data
      return favorite
    } catch (error) {
      console.log(`Erro to create favorite: ${error}`)
      throw error
    }
  }

  async deleteFavorite(url: string) {
    try {
      const response = await httpClient({url, method: 'delete'})
      return response.data
    } catch (error) {
      console.log(`Erro to delete favorite: ${error}`)
      throw error
    }
  }
}