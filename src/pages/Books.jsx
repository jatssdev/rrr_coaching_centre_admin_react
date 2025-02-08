import React, { useContext, useState } from 'react';
import { GlobalContext } from '../components/ContextProvider';
import { FaBookOpen, FaTrash, FaEye, FaPlus, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import axios from 'axios';

const Books = () => {
    const { books, fetchBooks, standards } = useContext(GlobalContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBook, setNewBook] = useState({ title: '', book_url: '', standard_id: '' });

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

    const handleToggleChapters = async (id, currentStatus) => {
        try {
            await axios.put(`https://rrr.jatssdev.com/api/book/toggle?id=${id}`);
            fetchBooks();
        } catch (error) {
            console.error("Error updating book chapters status:", error);
        }
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

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

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Books</h2>
                <button
                    onClick={handleOpenModal}
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600">
                    <FaPlus className="mr-2" /> Add Book
                </button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Standard</th>
                            <th className="p-4 text-left">Has Chapters</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                                <td className="p-4 text-gray-700 font-medium flex items-center space-x-2">
                                    <FaBookOpen className="text-blue-600" />
                                    <span>{book.title}</span>
                                </td>
                                <td className="p-4 text-gray-700 font-medium">{book.standard_name}</td>
                                <td className="p-4 text-gray-700 font-medium flex justify-center">
                                    <button onClick={() => handleToggleChapters(book.id, book.has_chapters)} className="text-blue-600">
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
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Add New Book</h3>
                        <form onSubmit={handleSubmit}>
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
                            <div className="mb-4">
                                <label className="block text-gray-700">Standard</label>
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
                            <div className="flex justify-end space-x-4">
                                <button type="button" onClick={handleCloseModal} className="bg-gray-300 px-4 py-2 rounded-lg">Cancel</button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Books;
