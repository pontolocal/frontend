export interface UserRegisterRequest {
  name: string;
  login: string;
  password: string;
  whatsapp: string;
  social_media_link: string;
  zip_code: string;
  address_complement: string;
  document: string;
  photo?: string;
  role: number;
}

export interface UserUpdateRequest {
  name: string;
  address_complement: string;
  document: string;
  role: number;
  social_media_link: string;
  whatsapp: string;
  zip_code: string;
  city: string;
  address: string;
  state: string;
  photo?: string;
}

export interface UserRegisterResponse {
  id: number;
  login: string;
}

export interface UserLoginRequest {
  login: string;
  password: string;
}

export interface UserLoginResponse {
  token: string;
  role: [
    {
      authority: string;
    }
  ];
  id: number;
}

export interface LoginRequest {
  login: string;
  password: string;
}
