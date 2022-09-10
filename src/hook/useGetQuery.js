import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../context/auth";

//How to call hook
// const [Data, Error, Loading, setCount, setUrl] = useGetQuery(["url", "id"]);

export default function useGetQuery([URL, ID, TOKEN]) {
  //Hook
  const { token } = useAuth();
  const [Data, setData] = useState(null);
  const [Error, setError] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Count, setCount] = useState("1");
  const [Url, setUrl] = useState(URL);

  //Function
  const header = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const GetData = useQuery(
    ID + Count,
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}${Url}`, {
        headers: TOKEN ? headers : header,
      }),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!TOKEN,
      onSuccess: (res) => {
        setData(res);
      },
      onError: (err) => {
        setError(err);
      },
    }
  );

  useEffect(() => {
    if (GetData?.isFetching) {
      setLoading(true);
    }
    if (GetData?.isFetched) {
      setLoading(false);
    }
  }, [GetData]);

  //Return
  return [Data, Error, Loading, setCount, setUrl];
}
