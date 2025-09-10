import httpClient from "../api/axiosConfig";
import type { ProductType } from "../models/Products";

export default class ProductServices {
  async getProducts(url: string) {
    try {
      const response = await httpClient({url, method: 'get'})
      const products: ProductType[] = response.data
      return products
    } catch (error) {
      throw new Error(`Erro to get products: ${error}`)
    }
  }
}