import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GlobalContext = createContext();

export default function ContextProvider({ children }) {
    // States for different entities
    const [options, setOptions] = useState([]);
    const [jivVikashPothi, setJivVikashPothi] = useState([]);
    const [standards, setStandards] = useState([]);
    const [books, setBooks] = useState([]);
    const [scientists, setScientists] = useState([]);
    const [generalKnowledge, setGeneralKnowledge] = useState([]); // New State
    const [bhagwadGeeta, setBhagwadGeeta] = useState([]); // New State

    const fetchBhagwadGeeta = async () => {
        try {
            const response = await axios.get("https://rrr.jatssdev.com/api/bhagwad-geeta/all");
            if (response.data.status === "success") {
                setBhagwadGeeta(response.data.data || []);
            }
        } catch (error) {
            console.error("Error fetching Bhagwad Geeta:", error);
        }
    };
    // Fetch Functions
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

    const fetchJivVikashPothis = async () => {
        try {
            const response = await axios.get("https://rrr.jatssdev.com/api/jiv-vikash-pothi/all");
            if (response.data.status === "success") {
                setJivVikashPothi(response.data.data || []);
            }
        } catch (error) {
            console.error("Error fetching Jiv Vikash Pothi:", error);
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

    const fetchGeneralKnowledge = async () => {
        try {
            const response = await axios.get("https://rrr.jatssdev.com/api/general-knowledge/all");
            if (response.data.status === "success") {
                setGeneralKnowledge(response.data.data || []);
            }
        } catch (error) {
            console.error("Error fetching General Knowledge:", error);
        }
    };

    // Fetch all data on component mount
    useEffect(() => {
        fetchOptions();
        fetchStandards();
        fetchBooks();
        fetchScientists();
        fetchJivVikashPothis();
        fetchGeneralKnowledge(); // Fetch General Knowledge
        fetchBhagwadGeeta();
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                options, setOptions, fetchOptions,
                jivVikashPothi, setJivVikashPothi, fetchJivVikashPothis,
                standards, setStandards, fetchStandards,
                books, setBooks, fetchBooks,
                scientists, setScientists, fetchScientists,
                generalKnowledge, setGeneralKnowledge, fetchGeneralKnowledge, // Added to Context,
                bhagwadGeeta, setBhagwadGeeta, fetchBhagwadGeeta,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
