import {
    FC,
    useState,
    useEffect,
    useContext,
    useCallback,
    createContext,
    SetStateAction,
    PropsWithChildren,
    useMemo,
  } from "react";
  import { User } from "../types/User";
  import login from "../services/postLogin";
  
  interface UserContextData {
    loggedStatus?: boolean;
    userMongoDB?: User;
    setLoggedStatus: React.Dispatch<SetStateAction<boolean>>;
    setUserMongoDB: React.Dispatch<SetStateAction<User | undefined>>;
  }

  interface PropsWithReactNode {
    children?: React.ReactNode;
  }
  
  const UserContext = createContext({} as UserContextData);
  
  export const useUserContext = () => {
    return useContext(UserContext);
  };
  
  export const UserProvider: FC<PropsWithChildren<PropsWithReactNode>> = ({
    children,
  }) => {
    const [userMongoDB, setUserMongoDB] = useState<User>();
    const userStorage = JSON.parse(localStorage.getItem("user")!);
    const status = localStorage.getItem("loggedStatusVariable");
  
    const [loggedStatus, setLoggedStatus] = useState<boolean>(!!status);
  
    const handleUserMongoDb = useCallback(async () => {
      if (userStorage) {
        const userAuthenticated = await login(userStorage.email);
        if (userAuthenticated) {
          setUserMongoDB(userAuthenticated);
        }
      }
    }, [userStorage]);
  
    useEffect(() => {
      if (userStorage && !userMongoDB) {
        void handleUserMongoDb();
      }
    }, [userStorage, handleUserMongoDb, userMongoDB]);
  
    const values = useMemo(() => {
      return {
        userMongoDB,
        loggedStatus,
        setUserMongoDB,
        setLoggedStatus,
      };
    }, [userMongoDB, loggedStatus]);
  
    return (
      <UserContext.Provider value={values}>{children}</UserContext.Provider>
    );
  };
  