import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const LoginContext = createContext();
async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  async function loginAction(key, value) {
    try {
      await SecureStore.setItemAsync(key, value);
      setIsLogin(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function LogoutActions(key, value) {
    try {
      await SecureStore.deleteItemAsync(key);
      setIsLogin(false);
    } catch (error) {
      console.log(error);
    }
  }

  // secure storage
  useEffect(() => {
    getValueFor("auth")
      .then((data) => {
        // console.log(data);
        if (data) {
          setIsLogin(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <LoginContext.Provider
      value={{ isLogin, setIsLogin, loginAction, LogoutActions }}
    >
      {children}
    </LoginContext.Provider>
  );
};
