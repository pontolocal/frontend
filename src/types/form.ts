export type DocumentType = 'CPF' | 'CNPJ'

export interface SignUpFormData {
  companyName: string
  fullName: string
  email: string
  password: string
  confirmPassword: string
  whatsapp: string
  socialLink: string
  cep: string
  address: string
  complement: string
  neighborhood: string
  city: string
  state: string
  document: DocumentType | string
  companyInfo: string
}

export interface EditFormData {
  companyName: string
  fullName: string
  lastPassword: string
  newPassword: string
  whatsapp: string
  socialLink: string
  cep: string
  address: string
  complement: string
  neighborhood: string
  city: string
  state: string
  document: DocumentType | string
  companyInfo: string
}