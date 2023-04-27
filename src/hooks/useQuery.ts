import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

export default function useQuery<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<null | string>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<T>(url);

        setData(() => data);
      } catch (err) {
        const error = err as AxiosError;
        setIsError(error.message);
      }
    })();
    setIsLoading(false);
  }, []);

  return { data, isLoading, isError };
}
