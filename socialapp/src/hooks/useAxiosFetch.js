import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]); // State to hold the data
  const [fetchError, setFetchError] = useState(null); // State for errors
  const [isLoading, setIsLoading] = useState(false); // State for loading status

  useEffect(() => {
    let isMounted = true; // Flag to track if component is mounted
    const source = axios.CancelToken.source(); // Cancel token to cancel axios request

    const fetchData = async (url) => {
      setIsLoading(true); // Set loading to true before fetching data
      try {
        const response = await axios.get(url, {
          cancelToken: source.token, // Pass cancel token to axios
        });
        if (isMounted) {
          setData(response.data); // Set data if the component is still mounted
          setFetchError(null); // Clear errors if successful
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message); // Set error if any occurs
          setData([]); // Clear data in case of error
        }
      } finally {
            isMounted && setTimeout(()=>
                setIsLoading(false), 2000);
      }
    };

    fetchData(dataUrl); // Fetch data from the provided URL

    const cleanUp = () => {
      isMounted = false; // Set the flag to false when the component unmounts
      source.cancel(); // Cancel the request when the component unmounts
    }

    return cleanUp;
  }, [dataUrl]); // Re-run the effect if the URL changes

  return { data, fetchError, isLoading }; // Return data, error, and loading state
};

export default useAxiosFetch;
