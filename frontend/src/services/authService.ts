import { supabase } from './supabase'
import { api } from './api'

export interface RegisterData {
  email: string
  password: string
  fullName: string
  referralCode?: string
}

export interface LoginData {
  email: string
  password: string
}

// Kayıt ol
export const register = async (data: RegisterData) => {
  const response = await api.post('/auth/register', {
    email: data.email,
    password: data.password,
    fullName: data.fullName,
    referralCode: data.referralCode,
  })

  // Token'ı localStorage'a kaydet
  if (response.data.session?.access_token) {
    localStorage.setItem('auth_token', response.data.session.access_token)
  }

  return response.data
}

// Giriş yap
export const login = async (data: LoginData) => {
  const response = await api.post('/auth/login', {
    email: data.email,
    password: data.password,
  })

  // Token'ı localStorage'a kaydet
  if (response.data.session?.access_token) {
    localStorage.setItem('auth_token', response.data.session.access_token)
  }

  return response.data
}

// Kullanıcı bilgilerini getir
export const getMe = async () => {
  const response = await api.get('/auth/me')
  return response.data
}

// Çıkış yap
export const logout = async () => {
  try {
    await api.post('/auth/logout')
  } finally {
    // Token'ı temizle
    localStorage.removeItem('auth_token')
    
    // Supabase session'ı temizle
    await supabase.auth.signOut()
  }
}

// Session kontrolü (sayfa yüklendiğinde)
export const checkSession = async () => {
  const token = localStorage.getItem('auth_token')
  
  if (!token) {
    return null
  }

  try {
    const response = await getMe()
    return response.user
  } catch (error) {
    // Token geçersizse temizle
    localStorage.removeItem('auth_token')
    return null
  }
}
