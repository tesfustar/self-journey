import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { useMutation } from "react-query";
import { useToast, Checkbox } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);
  const toast = useToast();
  // const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  console.log({checked})
  // const phone = 'http://196.189.180.198:8181/api'
  //local `http://172.17.104.5:8181/api?q=251911520105`
  const registerMutation = useMutation(
    async (newData) =>
      await axios.post(`http://196.189.180.198:8181/api?q=251911520105`, newData, {
        headers,
      }),
    {
      retry: false,
    }
  );
  const otpMutationSubmitHandler = async (values) => {
    try {
      registerMutation.mutate(
        {},
        {
          onSuccess: (responseData) => {
            console.log(responseData?.data);
            toast({
              title: "Subscribed successfully",
              status: "info",
              duration: 1800,
              isClosable: true,
            });

            setTimeout(() => {
              // window.open("http://172.17.104.248:3000/login","_self");
            }, 1000);
            navigate('./login')
          },
          onError: (err) => {
            console.log(err);
            toast({
              title: "Subscribe",
              description: err?.response?.data?.message,
              status: "error",
              duration: 1800,
              isClosable: true,
            });
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const login = useCallback((token, user) => {
    console.log(user)
    setToken(token);
    setUser(user);
    localStorage.setItem(
      "vas_user_data",
      JSON.stringify({
        token,
        user,
      })
    );
  }, []);


  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("vas_user_data");
  }, []);

  let loginData;

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("vas_user_data"));
    if (storedData) {
      if (storedData?.token) {
        loginData = login(storedData?.token, storedData?.user);
        setTimeout(()=>(
          setChecked(true)
          ),3000)
       
      }
      
      setTimeout(()=>(
        setChecked(true)
        ),3000)
    }
    setTimeout(()=>(
      setChecked(true)
      ),3000)
  }, [loginData]);

  //Return
  return (
    <AuthContext.Provider value={{ user, token, checked, login, logout,setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
