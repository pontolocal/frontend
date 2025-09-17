import httpClient from "../api/axiosConfig";
import type StoresType from "../models/Stores";

export default class StoresServices {
  async getStores(url: string) {
    try {
      const response = await httpClient({url, method: 'get'})
      const Stores: StoresType[] = response.data
      return Stores
    } catch (error) {
      throw new Error(`Erro to get Stores: ${error}`)
    }
  }
}