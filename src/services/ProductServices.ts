import httpClient from "../api/axiosConfig";
import type { Product } from "../types/Product";

export default class ProductServices {
  async getProducts(url: string) {
    try {
      const response = await httpClient({url, method: 'get'})
      const products: Product[] = response.data
      return products
    } catch (error) {
      console.log(`Erro to get products: ${error}`)
      throw error;
    }
  }

  async createProduct(url: string, request : Product) {
    try {
      const response = await httpClient({url, method: 'post', data: request})
      const products: any = response.data
      return products
    } catch (error) {
      console.log(`Erro to create products: ${error}`)
      throw error
    }
  }

  async updateProduct(url: string, request : Product) {
    try {
      const response = await httpClient({url, method: 'put', data: request})
      const products: any = response.data
      return products
    } catch (error) {
      console.log(`Erro to update products: ${error}`)
      throw error
    }
  }

  async deleteProduct(url: string) {
    try {
      const response = await httpClient({url, method: 'delete'})
      const products: any = response.data
      return products
    } catch (error) {
      console.log(`Erro to delete products: ${error}`)
      throw error
    }
  }
}