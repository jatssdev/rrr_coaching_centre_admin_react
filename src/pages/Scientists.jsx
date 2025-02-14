import React, { useContext, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import { GlobalContext } from "../components/ContextProvider";
import axios from "axios";

const Scientists = () => {
    const { scientists, fetchScientists } = useContext(GlobalContext);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newScientist, setNewScientist] = useState({ name: "", img_url: "", pdf_url: "" });
    const [editScientist, setEditScientist] = useState(null);

    const handleAddModalOpen = () => setIsAddModalOpen(true);
    const handleAddModalClose = () => {
        setNewScientist({ name: "", img_url: "", pdf_url: "" });
        setIsAddModalOpen(false);
    };

    const handleEditModalOpen = (scientist) => {
        setEditScientist(scientist);
        setIsEditModalOpen(true);
    };
    const handleEditModalClose = () => setIsEditModalOpen(false);

    const handleChange = (e) => {
        setNewScientist({ ...newScientist, [e.target.name]: e.target.value });
    };

    const handleEditChange = (e) => {
        setEditScientist({ ...editScientist, [e.target.name]: e.target.value });
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://rrr.jatssdev.com/api/scientist/add", newScientist);
            fetchScientists();
            handleAddModalClose();
        } catch (error) {
            console.error("Error adding scientist:", error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`https://rrr.jatssdev.com/api/scientist/update`, editScientist);
            fetchScientists();
            handleEditModalClose();
        } catch (error) {
            console.error("Error updating scientist:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this scientist?")) {
            try {
                await axios.delete(`https://rrr.jatssdev.com/api/scientist/delete?id=${id}`);
                fetchScientists();
            } catch (error) {
                console.error("Error deleting scientist:", error);
            }
        }
    };

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Scientists</h2>
                <button
                    onClick={handleAddModalOpen}
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition"
                >
                    <FaPlus className="mr-2" /> Add Scientist
                </button>
            </div>

            {/* Table */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="p-4 text-left">Image</th>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">PDF</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scientists.map((scientist) => (
                            <tr key={scientist.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                                <td className="p-4">
                                    <img
                                        src={scientist.img_url}
                                        alt={scientist.name}
                                        className="w-14 h-14 rounded-lg shadow-md"
                                    />
                                </td>
                                <td className="p-4 text-gray-700 font-medium">{scientist.name}</td>
                                <td className="p-4 text-gray-700 font-medium">
                                    <a
                                        href={scientist.pdf_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        View PDF
                                    </a>
                                </td>
                                <td className="p-4 flex justify-center space-x-4">
                                    <button
                                        onClick={() => handleEditModalOpen(scientist)}
                                        className="text-blue-500 hover:text-blue-700 bg-blue-100 p-2 rounded-lg"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(scientist.id)}
                                        className="text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-lg"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Scientist Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Add Scientist</h2>
                            <button onClick={handleAddModalClose} className="text-gray-500 hover:text-gray-700">
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleAddSubmit} className="space-y-4">
                            <input type="text" name="name" placeholder="Name" value={newScientist.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
                            <input type="text" name="img_url" placeholder="Image URL" value={newScientist.img_url} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
                            <input type="text" name="pdf_url" placeholder="PDF URL" value={newScientist.pdf_url} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
                            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Add</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Scientist Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Edit Scientist</h2>
                            <button onClick={handleEditModalClose} className="text-gray-500 hover:text-gray-700">
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <input type="text" name="name" placeholder="Name" value={editScientist.name} onChange={handleEditChange} className="w-full px-4 py-2 border rounded-lg" required />
                            <input type="text" name="img_url" placeholder="Image URL" value={editScientist.img_url} onChange={handleEditChange} className="w-full px-4 py-2 border rounded-lg" required />
                            <input type="text" name="pdf_url" placeholder="PDF URL" value={editScientist.pdf_url} onChange={handleEditChange} className="w-full px-4 py-2 border rounded-lg" required />
                            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Update</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Scientists;
