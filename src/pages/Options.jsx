import React, { useContext, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { GlobalContext } from '../components/ContextProvider';
import axios from 'axios';

const Options = () => {
    const { options, fetchOptions } = useContext(GlobalContext);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newOption, setNewOption] = useState({ title: '', icon: '' });
    const [editOption, setEditOption] = useState(null);

    const handleAddModalOpen = () => setIsAddModalOpen(true);
    const handleAddModalClose = () => setIsAddModalOpen(false);

    const handleEditModalOpen = (option) => {
        setEditOption(option);
        setIsEditModalOpen(true);
    };
    const handleEditModalClose = () => setIsEditModalOpen(false);

    const handleChange = (e) => {
        setNewOption({ ...newOption, [e.target.name]: e.target.value });
    };

    const handleEditChange = (e) => {
        setEditOption({ ...editOption, [e.target.name]: e.target.value });
    };

    const handlePriorityChange = async (id, value) => {
        try {
            await axios.put(`https://rrr.jatssdev.com/api/dashboard/priority?id=${id}`, { priority: value });
            fetchOptions();
        } catch (error) {
            console.error("Error updating priority:", error);
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://rrr.jatssdev.com/api/dashboard/add", newOption);
            fetchOptions();
            handleAddModalClose();
        } catch (error) {
            console.error("Error adding option:", error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://rrr.jatssdev.com/api/dashboard/edit?id=${editOption.id}`, editOption);
            fetchOptions();
            handleEditModalClose();
        } catch (error) {
            console.error("Error updating option:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this option?")) {
            try {
                await axios.delete(`https://rrr.jatssdev.com/api/dashboard/delete?id=${id}`);
                fetchOptions();
            } catch (error) {
                console.error("Error deleting option:", error);
            }
        }
    };

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Options</h2>
                <button onClick={handleAddModalOpen} className="flex items-center bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-primary">
                    <FaPlus className="mr-2" /> Add Option
                </button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="p-4 text-left">Icon</th>
                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Priority</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {options.map(option => (
                            <tr key={option.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                                <td className="p-4">
                                    <img src={`https://rrr.jatssdev.com/uploads/${option.icon}`} alt={option.title} className="w-14 h-14 rounded-lg shadow-md" />
                                </td>
                                <td className="p-4 text-gray-700 font-medium">{option.title}</td>
                                <td className="p-4 text-gray-700 font-medium">
                                    <input type="number" className="w-16 p-2 border rounded" defaultValue={option.priority} onBlur={(e) => handlePriorityChange(option.id, e.target.value)} />
                                </td>
                                <td className="p-4 flex justify-center space-x-4">
                                    <button onClick={() => handleEditModalOpen(option)} className="text-primary hover:text-blue-700 bg-blue-100 p-2 rounded-lg">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(option.id)}  className="text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-lg">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isAddModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Add New Option</h3>
                        <form onSubmit={handleAddSubmit}>
                            <input type="text" name="title" placeholder="Title" onChange={handleChange} required className="w-full p-2 border rounded mb-4" />
                            <input type="text" name="icon" placeholder="Icon URL" onChange={handleChange} required className="w-full p-2 border rounded mb-4" />
                            <div className="flex justify-end space-x-4">
                                <button type="button" onClick={handleAddModalClose} className="bg-gray-300 px-4 py-2 rounded-lg">Cancel</button>
                                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {isEditModalOpen && editOption && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Edit Option</h3>
                        <form onSubmit={handleEditSubmit}>
                            <input type="text" name="title" value={editOption.title} onChange={handleEditChange} required className="w-full p-2 border rounded mb-4" />
                            <input type="text" name="icon" value={editOption.icon} onChange={handleEditChange} required className="w-full p-2 border rounded mb-4" />
                            <div className="flex justify-end space-x-4">
                                <button type="button" onClick={handleEditModalClose} className="bg-gray-300 px-4 py-2 rounded-lg">Cancel</button>
                                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Options;
