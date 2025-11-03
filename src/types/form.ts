export interface SignUpFormData {
  name: string;
  login: string;
  password: string;
  confirmPassword: string;
  whatsapp: string;
  social_media_link: string;
  zip_code: string;
  address_complement: string;
  document: string;
  photo?: string;
  description?: string;
  role: number;
  address: string;
  city: string;
  state: string
}

export interface EditFormData {
  name: string;
  companyName: string;
  whatsapp: string;
  social_media_link: string;
  zip_code: string;
  address_complement: string;
  document: string;
  photo?: string;
  description?: string;
  role: number;
  address: string;
  city: string;
  state: string
}
