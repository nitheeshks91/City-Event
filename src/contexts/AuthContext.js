import React, { createContext, useContext } from 'react';
import { loginApi, signupApi } from '../services/authService';
import secureStore from '../storage/secureStore';

const AUTH_TOKEN_KEY = 'AUTH_TOKEN';

const AuthContext = createContext();

export function AuthProvider({ children }) {


  async function signIn({ email, password }) {
    const res = await loginApi({ email, password });

    const storedToken = await secureStore.getItem(AUTH_TOKEN_KEY);
    const tokens = storedToken ? JSON.parse(storedToken) : [];

    if (tokens.includes(res.token)) {
      return true;
    } else {
      return false;
    }
  }

  async function signUp({ email, password }) {
    const res = await signupApi({ email, password });

    const storedToken = await secureStore.getItem(AUTH_TOKEN_KEY);
    const tokens = storedToken ? JSON.parse(storedToken) : [];

    if (!tokens.includes(res.token)) {
      tokens.push(res.token);
      await secureStore.setItem(AUTH_TOKEN_KEY, JSON.stringify(tokens));
      console.log("Token added:", res.token);
    } else {
      console.log("Token already exists:", res.token);
    }

    return res.token;
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
