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

interface UserContextData {
  loggedStatus?: boolean
  setLoggedStatus: React.Dispatch<SetStateAction<boolean>>
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

  const [loggedStatus, setLoggedStatus] = useState<boolean>(!!status)

  useEffect(() => {
    if (tokenStorage && !token) {
      setToken(tokenStorage)
    }
  }, [tokenStorage, token])

  console.log(token)

  const values = useMemo(() => {
    return {
      token,
      loggedStatus,
      setLoggedStatus,
    }
  }, [loggedStatus, token])

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}
