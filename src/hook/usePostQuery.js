import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { useAuth } from "../context/auth";

//How to call hook
// const [Data, Error, Loading, setValue, setUrl] = useGetQuery(["url"]);

export default function usePostQuery([URL, TOKEN]) {
  //Hook
  const [Data, setData] = useState(null);
  const [Error, setError] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Url, setUrl] = useState(URL);
  const [Run, setRun] = useState(false);
  const [Value, setValue] = useState(null);
  const firstUpdate = useRef(true);
  const { token } = useAuth();

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

  const PostMutation = useMutation(
    async (newData) =>
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}${Url}`, newData, {
        headers: TOKEN ? headers : header,
      }),
    {
      retry: false,
    }
  );

  const PostHandler = async () => {
    try {
      PostMutation.mutate(
        { ...Value },
        {
          onSuccess: (res) => {
            setData(res);
          },
          onError: (err) => {
            setError(err);
          },
        }
      );
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (Run === true) {
      PostHandler();
      setRun(false);
    }
  }, [Run]);

  useEffect(() => {
    if (PostMutation?.isFetching) {
      setLoading(true);
    }
    if (PostMutation?.isFetched) {
      setLoading(false);
    }
  }, [PostMutation]);

  //Return
  return [Data, Error, Loading, setValue, setUrl];
}
