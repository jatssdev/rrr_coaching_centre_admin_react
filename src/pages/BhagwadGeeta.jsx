import React, { useContext, useState } from 'react';
import { GlobalContext } from '../components/ContextProvider';
import { FaBookOpen, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import axios from 'axios';

const BhagwadGeeta = () => {
    const { bhagwadGeeta, fetchBhagwadGeeta } = useContext(GlobalContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newGeeta, setNewGeeta] = useState({ title: '', icon: '', pdf_url: '', priority: '' });

    // Handle Delete
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this Bhagwad Geeta entry?")) {
            try {
                await axios.delete(`https://rrr.jatssdev.com/api/bhagwad-geeta/delete?id=${id}`);
                fetchBhagwadGeeta();
            } catch (error) {
                console.error("Error deleting Bhagwad Geeta entry:", error);
            }
        }
    };

    // Handle Modal
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewGeeta({ ...newGeeta, [name]: value });
    };

    // Handle Add
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://rrr.jatssdev.com/api/bhagwad-geeta/add", newGeeta);
            fetchBhagwadGeeta();
            handleCloseModal();
        } catch (error) {
            console.error("Error adding Bhagwad Geeta entry:", error);
        }
    };

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Bhagwad Geeta</h2>
                <button
                    onClick={handleOpenModal}
                    className="flex items-center bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-primary">
                    <FaPlus className="mr-2" /> Add Entry
                </button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Icon</th>
                            <th className="p-4 text-left">PDF</th>
                            <th className="p-4 text-left">Priority</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bhagwadGeeta.map(geeta => (
                            <tr key={geeta.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                                <td className="p-4 text-gray-700 font-medium flex items-center space-x-2">
                                    <FaBookOpen className="text-primary" />
                                    <span>{geeta.title}</span>
                                </td>
                                <td className="p-4">
                                    <img src={geeta.icon} alt="Icon" className="w-10 h-10 rounded-full" />
                                </td>
                                <td className="p-4">
                                    <a href={geeta.pdf_url} target="_blank" rel="noopener noreferrer"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 flex items-center">
                                        <FaEye className="mr-2" /> View PDF
                                    </a>
                                </td>
                                <td className="p-4 text-gray-700 font-medium text-center">{geeta.priority}</td>
                                <td className="p-4 flex space-x-4">
                                    <button
                                        onClick={() => handleDelete(geeta.id)}
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

            {/* Add New Bhagwad Geeta Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Add New Bhagwad Geeta Entry</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newGeeta.title}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Icon URL</label>
                                <input
                                    type="text"
                                    name="icon"
                                    value={newGeeta.icon}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">PDF URL</label>
                                <input
                                    type="text"
                                    name="pdf_url"
                                    value={newGeeta.pdf_url}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Priority</label>
                                <input
                                    type="number"
                                    name="priority"
                                    value={newGeeta.priority}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
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

export default BhagwadGeeta;
