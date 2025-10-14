import httpClient from "../api/axiosConfig";
import type CategoryType from "../models/Categories";

export default class CategoryServices {
  async getCategories(url: string) {
    try {
      const response = await httpClient({url, method: 'get'})
      const categories: CategoryType[] = response.data
      return categories
    } catch (error) {
      throw new Error(`Erro to get categories: ${error}`)
    }
  }
}