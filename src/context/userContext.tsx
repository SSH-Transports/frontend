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

import { jwtDecode } from "jwt-decode";
import getUser from '../services/getUser';
import { User } from '../types/User';

interface UserContextData {
  loggedStatus?: boolean
  setLoggedStatus: React.Dispatch<SetStateAction<boolean>>
  user?: User
  setUser: React.Dispatch<SetStateAction<User | undefined>>
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
  const status = localStorage.getItem('loggedStatusVariable')
  const [user, setUser] = useState<User>()
  const [loggedStatus, setLoggedStatus] = useState<boolean>(!!status)


  useEffect(() => {
    const fetchUser = async () => {
      if(token){
        const decoded = jwtDecode(tokenStorage as string);
        if (decoded && decoded.exp && decoded.exp < Date.now() / 1000) {
          setUser(undefined)
          setToken('')
          setLoggedStatus(false)
          localStorage.removeItem('token')
          localStorage.removeItem('loggedStatusVariable')
        } else {
          if (typeof decoded.sub === 'string') {
            await getUser(decoded.sub)
              .then((response) => {
                setUser(response)
              })
              .catch((error) => {
                console.error(error)
              })
          }
        }
      }
    }
    fetchUser();
  }, [token]);


  useEffect(() => {
    if (tokenStorage && !token) {
      setToken(tokenStorage)
    }
  }, [tokenStorage, token])

  const values = useMemo(() => {
    return {
      token,
      loggedStatus,
      setLoggedStatus,
      user,
      setUser
    }
  }, [loggedStatus, token, user])

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}
