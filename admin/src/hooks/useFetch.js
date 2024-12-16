import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const url = "http://localhost:2704/api";

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(url);
                setData(res.data);
                setError(null);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    
    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);
            setError(null);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };
    
    return { data, loading, error, reFetch };
};

export default useFetch;