import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GlobalContext = createContext();

export default function ContextProvider({ children }) {
    const [options, setOptions] = useState([]);
    const [standards, setStandards] = useState([]);
    const [books, setBooks] = useState([]);

    const fetchOptions = async () => {
        try {
            const response = await axios.get("https://rrr.jatssdev.com/api/dashboard/all");
            if (response.data.status === "success") {
                setOptions(response.data.data || []);
            }
        } catch (error) {
            console.error("Error fetching options:", error);
        }
    };

    const fetchStandards = async () => {
        try {
            const response = await axios.get("https://rrr.jatssdev.com/api/standard/all");
            if (response.data.status === "success") {
                setStandards(response.data.data || []);
            }
        } catch (error) {
            console.error("Error fetching standards:", error);
        }
    };

    const fetchBooks = async () => {
        try {
            const response = await axios.get("https://rrr.jatssdev.com/api/book/all");
            if (response.data.status === "success") {
                setBooks(response.data.data || []);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };  

    useEffect(() => {
        fetchOptions();
        fetchStandards();
        fetchBooks();
    }, []);

    return (
        <GlobalContext.Provider value={{ options, setOptions, standards, setStandards, books, setBooks, fetchOptions, fetchStandards, fetchBooks }}>
            {children}
        </GlobalContext.Provider>
    );
}
