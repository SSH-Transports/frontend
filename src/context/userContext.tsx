import React, {
  FC,
  useState,
  useContext,
  createContext,
  SetStateAction,
  PropsWithChildren,
  useMemo,
  useCallback,
} from 'react'

import { jwtDecode } from 'jwt-decode'
import getUser from '../services/getUser'
import { User } from '../types/User'
import postLogin from '../services/postLogin'
import { toast } from 'react-toastify'
import { LoginFormData } from '../pages/LoginPage'

export type LoginData = LoginFormData & { isFromMobile: boolean }

interface UserContextData {
  user?: User
  setUser: React.Dispatch<SetStateAction<User | undefined>>
  logout: () => void
  login: (data: LoginData) => void
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
  const userStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : undefined
  const [user, setUser] = useState<User | undefined>(userStorage)

  const fetchUser = useCallback(async () => {
    const decoded = jwtDecode(localStorage.getItem('token') as string)
    if (typeof decoded.sub === 'string') {
      const user = await getUser(decoded.sub)
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      toast.success('Login feito com sucesso')
    }
  }, [localStorage.getItem('token')])

  const login = async (data: LoginData) => {
    const login = await postLogin(data)
    if (login.access_token) {
      localStorage.setItem('token', login.access_token)
      await fetchUser()
    } else {
      toast.error('Erro ao fazer login')
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(undefined)
  }

  const values = useMemo(() => {
    return {
      user,
      setUser,
      login,
      logout,
    }
  }, [user, userStorage, login, logout])

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}
