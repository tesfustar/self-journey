import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const HomeContext = createContext();

export function useHome() {
  return useContext(HomeContext);
}

export function HomeProvider({ children }) {
  //Hook
  const [Category, setCategory] = useState("Recommended");
  const [recomendedData,setRecomendedData]=useState([])
  const [pages, setPages] = useState(2 + 2);
  const [User, setUser] = useState();
  const firstUpdate = useRef(true);
  const [URL, setURL] = useState();
  const [vacancyId, setVacancyId] = useState(null);
  const [blogCategory,setBlogCategory]=useState(null)
  
  const mySet = new Set();
 
  //Function
  function GetUser() {
    const res = JSON.parse(localStorage.getItem("user"));
    setUser(res);
    firstUpdate.current = false;
  }

  useEffect(() => {
    let url = `${process.env.REACT_APP_BACKEND_URL}homepage`;
    if (Category === "Recommended") {
      url = `${process.env.REACT_APP_BACKEND_URL}homepage`;
    } else {
      url = `${process.env.REACT_APP_BACKEND_URL}journey-by-category/${Category}`;
    }
    setURL(url);
  }, [Category]);
 console.log(URL)
  useEffect(() => {
    if (firstUpdate.current) {
      GetUser();
      return;
    }
  }, [User]);



  //Return
  return (
    <HomeContext.Provider
      value={{
        Category,
        setCategory,
        pages,
        setPages,
        User,
        setUser,
        URL,
        setVacancyId,
        vacancyId,
        mySet,
        blogCategory,
        setBlogCategory,
        recomendedData,setRecomendedData
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
