import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../components/ContextProvider';
import { FaEdit, FaTrash, FaPlus, FaBookOpen } from 'react-icons/fa';
import axios from 'axios';

const MathBooks = () => {
    const { fetchMathsOptions, mathsOptions } = useContext(GlobalContext); // Assuming you have math options in context
    const [mathBooks, setMathBooks] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newBook, setNewBook] = useState({ title: '', icon: '', pdf_url: '', type: '', mathematics_option_id: '' });
    const [editBook, setEditBook] = useState(null);

    // Fetch Math Books on Mount
    useEffect(() => {
        fetchMathBooks();
        fetchMathsOptions(); // Fetch math options for select menu
    }, []);

    const fetchMathBooks = async () => {
        try {
            const response = await axios.get('https://rrr.jatssdev.com/api/mathematics/all');
            if (response.data.status === 'success') {
                setMathBooks(response.data.data || []);
            }
        } catch (error) {
            console.error('Error fetching math books:', error);
        }
    };

    // Modal Controls
    const handleAddModalOpen = () => setIsAddModalOpen(true);
    const handleAddModalClose = () => {
        setNewBook({ title: '', icon: '', pdf_url: '', type: '', mathematics_option_id: '' });
        setIsAddModalOpen(false);
    };

    const handleEditModalOpen = (book) => {
        setEditBook(book);
        setIsEditModalOpen(true);
    };
    const handleEditModalClose = () => setIsEditModalOpen(false);

    // Form Handlers
    const handleAddChange = (e) => setNewBook({ ...newBook, [e.target.name]: e.target.value });
    const handleEditChange = (e) => setEditBook({ ...editBook, [e.target.name]: e.target.value });

    // Add Math Book
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://rrr.jatssdev.com/api/mathematics/add', newBook);
            fetchMathBooks();
            handleAddModalClose();
        } catch (error) {
            console.error('Error adding math book:', error);
        }
    };

    // Edit Math Book
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://rrr.jatssdev.com/api/mathematics/update?id=${editBook.id}`, editBook);
            fetchMathBooks();
            handleEditModalClose();
        } catch (error) {
            console.error('Error updating math book:', error);
        }
    };

    // Delete Math Book
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await axios.delete(`https://rrr.jatssdev.com/api/mathematics/delete?id=${id}`);
                fetchMathBooks();
            } catch (error) {
                console.error('Error deleting math book:', error);
            }
        }
    };

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Math Books</h2>
                <button
                    onClick={handleAddModalOpen}
                    className="flex items-center bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-primary"
                >
                    <FaPlus className="mr-2" /> Add Book
                </button>
            </div>

            {/* Books Table */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Icon</th>
                            <th className="p-4 text-left">PDF</th>
                            <th className="p-4 text-left">Type</th>
                            <th className="p-4 text-left">Math Option ID</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mathBooks.map((book) => (
                            <tr key={book.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                                <td className="p-4 text-gray-700 font-medium">{book.title}</td>
                                <td className="p-4">
                                    <img src={book.icon} alt={book.title} className="w-12 h-12 rounded-lg" />
                                </td>
                                <td className="p-4">
                                    <a
                                        href={book.pdf_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        View PDF
                                    </a>
                                </td>
                                <td className="p-4 text-gray-700 font-medium">{book.type}</td>
                                <td className="p-4 text-gray-700 font-medium">{book.mathematics_option_id}</td>
                                <td className="p-4 flex justify-center space-x-4">
                                    <button
                                        onClick={() => handleEditModalOpen(book)}
                                        className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(book.id)}
                                        className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Book Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Add Math Book</h3>
                        <form onSubmit={handleAddSubmit} className="space-y-4">
                            {/* Title */}
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={newBook.title}
                                onChange={handleAddChange}
                                className="w-full p-2 border rounded"
                                required
                            />

                            {/* Icon URL */}
                            <input
                                type="text"
                                name="icon"
                                placeholder="Icon URL"
                                value={newBook.icon}
                                onChange={handleAddChange}
                                className="w-full p-2 border rounded"
                                required
                            />

                            {/* PDF URL */}
                            <input
                                type="text"
                                name="pdf_url"
                                placeholder="PDF URL"
                                value={newBook.pdf_url}
                                onChange={handleAddChange}
                                className="w-full p-2 border rounded"
                                required
                            />

                            {/* Type Select Menu */}
                            <select
                                name="type"
                                value={newBook.type}
                                onChange={handleAddChange}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="vedicmaths">Vedic Maths</option>
                                <option value="generalmaths">General Maths</option>
                                <option value="sutro">Sutro</option>
                            </select>

                            {/* Mathematics Option Select */}
                            <select
                                name="mathematics_option_id"
                                value={newBook.mathematics_option_id}
                                onChange={handleAddChange}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="">Select Math Option</option>
                                {mathsOptions.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.title}
                                    </option>
                                ))}
                            </select>

                            {/* Form Buttons */}
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleAddModalClose}
                                    className="bg-gray-300 px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary"
                                >
                                    Add Book
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {/* Edit Book Modal */}
            {isEditModalOpen && editBook && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Edit Math Book</h3>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={editBook.title}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                name="icon"
                                placeholder="Icon URL"
                                value={editBook.icon}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                name="pdf_url"
                                placeholder="PDF URL"
                                value={editBook.pdf_url}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                name="type"
                                placeholder="Type"
                                value={editBook.type}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                            <select
                                name="mathematics_option_id"
                                value={editBook.mathematics_option_id}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="">Select Math Option</option>
                                {mathsOptions.map((option) => (
                                    <option key={option.id} value={option.id}>{option.title}</option>
                                ))}
                            </select>
                            <div className="flex justify-end space-x-4">
                                <button type="button" onClick={handleEditModalClose} className="bg-gray-300 px-4 py-2 rounded-lg">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary">
                                    Update Book
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MathBooks;
