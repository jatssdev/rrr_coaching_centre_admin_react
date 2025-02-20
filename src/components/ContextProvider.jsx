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
    const [banners, setBanners] = useState([]); // New State
    const [chapters, setChapters] = useState([]);
    const [mathsOptions, setMathsOptions] = useState([]);

    const fetchMathsOptions = async (url = "https://rrr.jatssdev.com/api/mathematics-option/all") => {
        try {
            const response = await axios.get(url);
            if (response.data.status === "success") {
                setMathsOptions(response.data.data || []);
            }
        } catch (error) {
            console.error("Error fetching Maths Options:", error);
        }
    };


    const fetchChapters = async () => {
        try {
            const response = await axios.get("https://rrr.jatssdev.com/api/chapter/all");
            if (response.data.status === "success") {
                setChapters(response.data.data || []);
            }
        } catch (error) {
            console.error("Error fetching Chapters:", error);
        }
    };
    const fetchBanners = async () => {
        try {
            const response = await axios.get("https://rrr.jatssdev.com/api/banner/all");
            if (response.data.status === "success") {
                setBanners(response.data.data || []);
            }
        } catch (error) {
            console.error("Error fetching Banners:", error);
        }
    };
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
                setOptions(response.data.data.reverse() || []);
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

    const fetchBooks = async (url = "https://rrr.jatssdev.com/api/book/all") => {
        try {
            const response = await axios.get(url);
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
        fetchBanners()
        fetchMathsOptions()
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
                banners, setBanners, fetchBanners,
                chapters,
                setChapters,
                fetchChapters,
                mathsOptions,
                setMathsOptions,
                fetchMathsOptions,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
