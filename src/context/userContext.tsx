import React, {
  FC,
  useState,
  useEffect,
  useContext,
  createContext,
  SetStateAction,
  PropsWithChildren,
  useMemo,
} from 'react'

import { jwtDecode } from 'jwt-decode'
import getUser from '../services/getUser'
import { User } from '../types/User'

interface UserContextData {
  user?: User
  setUser: React.Dispatch<SetStateAction<User | undefined>>
  logout: () => void
}

interface PropsWithReactNode {
  children?: React.ReactNode
}

const UserContext = createContext({} as UserContextData)

export const useUserContext = () => {
  return useContext(UserContext)
}

export const UserProvider: FC<PropsWithChildren<PropsWithReactNode>> = ({
  children,
}) => {
  const [token, setToken] = useState<string>()
  const tokenStorage = localStorage.getItem('token')
  const [user, setUser] = useState<User>()
  const userStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null

  useEffect(() => {
    if (tokenStorage && !token) {
      setToken(tokenStorage)
    }
  }, [tokenStorage])

  const fetchUser = async () => {
    if (tokenStorage) {
      const decoded = jwtDecode(tokenStorage as string)
      if (decoded && decoded.exp && decoded.exp < Date.now() / 1000) {
        logout()
      } else {
        if (typeof decoded.sub === 'string') {
          await getUser(decoded.sub)
          .then(response => {
              setUser(response)
            })
            .catch(error => {
              console.error(error)
            })
        }
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(undefined); 
  }

  useEffect(() => {
    fetchUser()
  }, [token, user])

  useEffect(() => {
    if (userStorage && !user) {
      setUser(userStorage)
    }
  }, [userStorage, user])

  const values = useMemo(() => {
    return {
      tokenStorage,
      user,
      setUser,
      logout
    }
  }, [tokenStorage, user, userStorage, logout])

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}
