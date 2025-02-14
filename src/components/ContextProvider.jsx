import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GlobalContext = createContext();

export default function ContextProvider({ children }) {
    const [options, setOptions] = useState([]);
    const [standards, setStandards] = useState([]);
    const [books, setBooks] = useState([]);
    const [scientists, setScientists] = useState([]);

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

    const fetchStandards = async (url = 'https://rrr.jatssdev.com/api/standard/by-dashboard?dashboard_option_id=all') => {
        try {
            const response = await axios.get(url);
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

    const fetchScientists = async () => {
        try {
            const response = await axios.get("https://rrr.jatssdev.com/api/scientist/all");
            if (response.data.status === "success") {
                setScientists(response.data.data || []);
            }
        } catch (error) {
            console.error("Error fetching scientists:", error);
        }
    };

    useEffect(() => {
        fetchOptions();
        fetchStandards();
        fetchBooks();
        fetchScientists();
    }, []);

    return (
        <GlobalContext.Provider value={{ fetchOptions, fetchStandards, options, setOptions, standards, setStandards, books, setBooks, scientists, setScientists, fetchOptions, fetchStandards, fetchBooks, fetchScientists }}>
            {children}
        </GlobalContext.Provider>
    );
}