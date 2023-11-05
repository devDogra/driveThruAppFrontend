import { useEffect, useState } from "react";
import api from "../config/axios.config";

export default function useFetchApi(url, defaultValue) {
    const [ data, setData ] = useState(defaultValue || ({}));
    const [ error, setError ] = useState(null);

    useEffect(() => {
        api.get(url).then(result => {
            setData(result.data);
            console.log("Fetched data: "); 
            console.log(data); 
        }).catch(err => setError(err));
    }, [])

    return {
        data,
        error
    }

}