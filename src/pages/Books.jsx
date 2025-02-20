import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../components/ContextProvider';
import { FaBookOpen, FaTrash, FaEye, FaPlus, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import axios from 'axios';

const Books = () => {
    const { books, fetchBooks, standards, fetchStandards } = useContext(GlobalContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStandard, setSelectedStandard] = useState("all");
    const [newBook, setNewBook] = useState({ title: '', book_url: '', standard_id: '', streams: [] });
    const streamsOptions = ["Arts", "Science", "Commerce"]; // Fixed streams
    // Add these states at the top with other states
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editBook, setEditBook] = useState({ title: '', book_url: '', standard_id: '', streams: [] });

    // Open Edit Modal & Populate Data
    const handleEditModalOpen = (book) => {
        setEditBook({
            id: book.id,
            title: book.title,
            book_url: book.book_url,
            standard_id: book.standard_id,
            streams: book.streams || []
        });
        setIsEditModalOpen(true);
    };

    // Close Edit Modal
    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setEditBook({ title: '', book_url: '', standard_id: '', streams: [] });
    };

    // Handle Edit Form Changes
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditBook({ ...editBook, [name]: value });
    };

    // Handle Streams Change in Edit Modal
    const handleEditStreamsChange = (e) => {
        const selectedStreams = Array.from(e.target.selectedOptions, option => option.value);
        setEditBook({ ...editBook, streams: selectedStreams });
    };

    // Handle Edit Book Submit
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://rrr.jatssdev.com/api/book/update?id=${editBook.id}`, editBook);
            fetchBooks();
            handleEditModalClose();
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };
    // Fetch standards on mount
    useEffect(() => {
        fetchStandards();
    }, []);

    // Fetch books when standard is selected
    const handleChangeStandard = (e) => {
        const standardId = e.target.value;
        setSelectedStandard(standardId);

        const url = standardId === "all"
            ? "https://rrr.jatssdev.com/api/book/all"
            : `https://rrr.jatssdev.com/api/books/by-standard?standard_id=${standardId}`;

        fetchBooks(url);
    };

    // Handle Book Delete
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            try {
                await axios.delete(`https://rrr.jatssdev.com/api/book/delete?id=${id}`);
                fetchBooks();
            } catch (error) {
                console.error("Error deleting book:", error);
            }
        }
    };

    // Handle Toggle Chapters
    const handleToggleChapters = async (id) => {
        try {
            await axios.put(`https://rrr.jatssdev.com/api/book/toggle?id=${id}`);
            fetchBooks();
        } catch (error) {
            console.error("Error updating book chapters status:", error);
        }
    };

    // Handle Form Inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    // Handle Stream Selection
    const handleStreamsChange = (e) => {
        const selectedStreams = Array.from(e.target.selectedOptions, option => option.value);
        setNewBook({ ...newBook, streams: selectedStreams });
    };

    // Handle Add Book
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://rrr.jatssdev.com/api/book/add", newBook);
            fetchBooks();
            handleCloseModal();
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    // Modal Controls
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewBook({ title: '', book_url: '', standard_id: '', streams: [] });
    };

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            {/* Dropdown for Filtering Books by Standard */}
            <select
                onChange={handleChangeStandard}
                className="p-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-700"
            >
                <option value="all">All Standards</option>
                {standards.map(std => (
                    <option key={std.id} value={std.id}>{std.name_gu}</option>
                ))}
            </select>

            {/* Books Table */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Books</h2>
                <button
                    onClick={handleOpenModal}
                    className="flex items-center bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-primary">
                    <FaPlus className="mr-2" /> Add Book
                </button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Standard</th>
                            <th className="p-4 text-left">Streams</th>
                            <th className="p-4 text-left">Has Chapters</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                                <td className="p-4 text-gray-700 font-medium flex items-center space-x-2">
                                    <FaBookOpen className="text-primary" />
                                    <span>{book.title}</span>
                                </td>
                                <td className="p-4 text-gray-700 font-medium">{book.standard_name}</td>
                                <td className="p-4 text-gray-700 font-medium">{book.streams?.join(", ") || "N/A"}</td>
                                <td className="p-4 flex justify-center">
                                    <button onClick={() => handleToggleChapters(book.id)} className="text-primary">
                                        {book.has_chapters ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
                                    </button>
                                </td>
                                <td className="p-4 flex space-x-4">
                                    <a
                                        href={`/books/${book.book_url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 flex items-center"
                                    >
                                        <FaEye className="mr-2" /> View
                                    </a>
                                    <button
                                        onClick={() => handleEditModalOpen(book)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 flex items-center"
                                    >
                                        <FaBookOpen className="mr-2" /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(book.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 flex items-center"
                                    >
                                        <FaTrash className="mr-2" /> Delete
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Book Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Edit Book</h3>
                        <form onSubmit={handleEditSubmit}>
                            {/* Title */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={editBook.title}
                                    onChange={handleEditChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            {/* Book URL */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Book URL</label>
                                <input
                                    type="text"
                                    name="book_url"
                                    value={editBook.book_url}
                                    onChange={handleEditChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            {/* Standard Selection */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Standard</label>
                                <select
                                    name="standard_id"
                                    value={editBook.standard_id}
                                    onChange={handleEditChange}
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="">Select Standard</option>
                                    {standards.map(std => (
                                        <option key={std.id} value={std.id}>{std.name_en}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Streams Selection (For 11th & 12th Standards) */}
                            {(editBook.standard_id === "11" || editBook.standard_id === "12") && (
                                <div className="mb-4">
                                    <label className="block text-gray-700">Streams</label>
                                    <select
                                        multiple
                                        value={editBook.streams}
                                        onChange={handleEditStreamsChange}
                                        className="w-full p-2 border rounded"
                                    >
                                        {streamsOptions.map(stream => (
                                            <option key={stream} value={stream}>
                                                {stream}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-sm text-gray-500 mt-1">Hold Ctrl (Cmd on Mac) to select multiple streams.</p>
                                </div>
                            )}

                            {/* Form Buttons */}
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleEditModalClose}
                                    className="bg-gray-300 px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary"
                                >
                                    Update Book
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {/* Add New Book Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Add New Book</h3>
                        <form onSubmit={handleSubmit}>
                            {/* Title Input */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newBook.title}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            {/* Book URL */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Book URL</label>
                                <input
                                    type="text"
                                    name="book_url"
                                    value={newBook.book_url}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            {/* Standard Selection */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Standard</label>
                                <select name="" id=""></select>
                                <select
                                    name="standard_id"
                                    value={newBook.standard_id}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="">Select Standard</option>
                                    {standards.map(std => (
                                        <option key={std.id} value={std.id}>{std.name_en}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Streams Selection (Only for 11th & 12th) */}
                            {(newBook.standard_id === "11" || newBook.standard_id === "10") && (
                                <div className="mb-4">
                                    <label className="block text-gray-700">Streams</label>
                                    <select
                                        multiple
                                        value={newBook.streams}
                                        onChange={handleStreamsChange}
                                        className="w-full p-2 border rounded"
                                    >
                                        {streamsOptions.map((stream) => (
                                            <option key={stream} value={stream}>{stream}</option>
                                        ))}
                                    </select>
                                    <p className="text-sm text-gray-500 mt-1">Hold Ctrl (Cmd on Mac) to select multiple streams.</p>
                                </div>
                            )}

                            {/* Form Buttons */}
                            <div className="flex justify-end space-x-4">
                                <button type="button" onClick={handleCloseModal} className="bg-gray-300 px-4 py-2 rounded-lg">Cancel</button>
                                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Books;   
