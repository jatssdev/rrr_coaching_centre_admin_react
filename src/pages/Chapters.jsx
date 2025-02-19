import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../components/ContextProvider';
import { FaBookOpen, FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import axios from 'axios';

const Chapters = () => {
    const { chapters, standards, fetchChapters } = useContext(GlobalContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newChapter, setNewChapter] = useState({ book_id: '', title: '', icon: '', priority: '', page_number: '' });
    const [editChapter, setEditChapter] = useState(null);
    const [currStandard, setCurrStandard] = useState('');
    const [currBooks, setCurrBooks] = useState([]);
    const [isLoadingBooks, setIsLoadingBooks] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch Chapters on Mount
    useEffect(() => {
        fetchChapters();
    }, []);

    // Handle Standard Selection & Fetch Books
    const handleChangeStandard = async (e) => {
        const standardId = e.target.value;
        setCurrStandard(standardId);
        setCurrBooks([]);
        setNewChapter({ ...newChapter, book_id: '' });

        if (!standardId) return;

        setIsLoadingBooks(true);
        try {
            const response = await axios.get(`https://rrr.jatssdev.com/api/books/by-standard?standard_id=${standardId}`);
            if (response.data.status === "success") {
                setCurrBooks(response.data.data || []);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
            setErrorMessage("Failed to load books. Please try again.");
        }
        setIsLoadingBooks(false);
    };

    // Handle Book Selection
    const handleChangeBook = (e) => {
        setNewChapter({ ...newChapter, book_id: e.target.value });
    };

    // Handle Delete Chapter
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this chapter?")) {
            try {
                await axios.delete(`https://rrr.jatssdev.com/api/chapter/delete?id=${id}`);
                fetchChapters();
            } catch (error) {
                console.error("Error deleting chapter:", error);
                setErrorMessage("Failed to delete chapter. Please try again.");
            }
        }
    };

    // Handle Add Chapter
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!newChapter.book_id || !newChapter.title || !newChapter.icon || !newChapter.priority || !newChapter.page_number) {
            setErrorMessage("All fields are required.");
            return;
        }

        try {
            await axios.post("https://rrr.jatssdev.com/api/chapter/add", newChapter);
            fetchChapters();
            handleCloseModal();
        } catch (error) {
            console.error("Error adding chapter:", error);
            setErrorMessage("Failed to add chapter. Please try again.");
        }
    };

    // Handle Modal Controls
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setErrorMessage("");
    };

    // Handle Edit Chapter
    const handleOpenEditModal = (chapter) => {
        setEditChapter(chapter);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => setIsEditModalOpen(false);

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!editChapter.title || !editChapter.icon || !editChapter.priority || !editChapter.page_number) {
            setErrorMessage("All fields are required.");
            return;
        }

        try {
            await axios.put(`https://rrr.jatssdev.com/api/chapter/update?id=${editChapter.id}`, editChapter);
            fetchChapters();
            handleCloseEditModal();
        } catch (error) {
            console.error("Error updating chapter:", error);
            setErrorMessage("Failed to update chapter. Please try again.");
        }
    };

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Chapters</h2>
                <button
                    onClick={handleOpenModal}
                    className="flex items-center bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-primary">
                    <FaPlus className="mr-2" /> Add Chapter
                </button>
            </div>

            {/* Chapters Table */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Icon</th>
                            <th className="p-4 text-left">Priority</th>
                            <th className="p-4 text-left">Page Number</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chapters.map(chapter => (
                            <tr key={chapter.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                                <td className="p-4 text-gray-700 font-medium flex items-center space-x-2">
                                    <FaBookOpen className="text-primary" />
                                    <span>{chapter.title}</span>
                                </td>
                                <td className="p-4">
                                    <img src={chapter.icon} alt="Icon" className="w-10 h-10 rounded-full" />
                                </td>
                                <td className="p-4 text-gray-700 font-medium">{chapter.priority}</td>
                                <td className="p-4 text-gray-700 font-medium">{chapter.page_number}</td>
                                <td className="p-4 flex space-x-4">
                                    <button onClick={() => handleOpenEditModal(chapter)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center">
                                        <FaEdit className="mr-2" /> Edit
                                    </button>
                                    <button onClick={() => handleDelete(chapter.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center">
                                        <FaTrash className="mr-2" /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Chapter Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Add New Chapter</h3>
                        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                        <form onSubmit={handleSubmit}>
                            {/* Select Standard */}
                            <label className="block text-gray-700 mb-2">Standard</label>
                            <select
                                onChange={handleChangeStandard}
                                className="w-full p-2 border rounded mb-4"
                                required
                            >
                                <option value="">Select Standard</option>
                                {standards.map(std => (
                                    <option key={std.id} value={std.id}>{std.name_en}</option>
                                ))}
                            </select>

                            {/* Select Book (Filtered) */}
                            <label className="block text-gray-700 mb-2">Book</label>
                            <select
                                onChange={handleChangeBook}
                                className="w-full p-2 border rounded mb-4"
                                disabled={currBooks.length === 0}
                                required
                            >
                                <option value="">Select Book</option>
                                {currBooks.map(book => (
                                    <option key={book.id} value={book.id}>{book.title}</option>
                                ))}
                            </select>

                            {/* Title Input */}
                            <label className="block text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Enter chapter title"
                                onChange={(e) => setNewChapter({ ...newChapter, title: e.target.value })}
                                required
                                className="w-full p-2 border rounded mb-4"
                            />

                            {/* Icon Input */}
                            <label className="block text-gray-700 mb-2">Icon URL</label>
                            <input
                                type="text"
                                name="icon"
                                placeholder="Enter icon URL"
                                onChange={(e) => setNewChapter({ ...newChapter, icon: e.target.value })}
                                required
                                className="w-full p-2 border rounded mb-4"
                            />

                            {/* Priority Input */}
                            <label className="block text-gray-700 mb-2">Priority</label>
                            <input
                                type="number"
                                name="priority"
                                placeholder="Enter priority"
                                onChange={(e) => setNewChapter({ ...newChapter, priority: e.target.value })}
                                required
                                className="w-full p-2 border rounded mb-4"
                            />

                            {/* Page Number Input */}
                            <label className="block text-gray-700 mb-2">Page Number</label>
                            <input
                                type="number"
                                name="page_number"
                                placeholder="Enter page number"
                                onChange={(e) => setNewChapter({ ...newChapter, page_number: e.target.value })}
                                required
                                className="w-full p-2 border rounded mb-4"
                            />

                            {/* Buttons */}
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="bg-gray-300 px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary"
                                >
                                    Add Chapter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Chapters;
