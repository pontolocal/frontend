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

export interface UserUpdateRequest {
  name: string;
  password: string;
  whatsapp: string;
  social_media_link: string;
  zip_code: string;
  address_complement: string;
  document: string;
  photo: string;
}


export interface LoginRequest {
  login: string;
  password: string;
}