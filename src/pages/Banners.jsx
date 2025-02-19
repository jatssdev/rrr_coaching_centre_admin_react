import React, { useContext, useState } from 'react';
import { GlobalContext } from '../components/ContextProvider';
import { FaImage, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import axios from 'axios';

const Banners = () => {
    const { banners, fetchBanners } = useContext(GlobalContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBanner, setNewBanner] = useState({ title: '', image: '', link: '' });

    // Handle Delete
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this banner?")) {
            try {
                await axios.delete(`https://rrr.jatssdev.com/api/banner/delete?id=${id}`);
                fetchBanners();
            } catch (error) {
                console.error("Error deleting banner:", error);
            }
        }
    };

    // Handle Modal
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBanner({ ...newBanner, [name]: value });
    };

    // Handle Add
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://rrr.jatssdev.com/api/banner/add", newBanner);
            fetchBanners();
            handleCloseModal();
        } catch (error) {
            console.error("Error adding banner:", error);
        }
    };

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Banners</h2>
                <button
                    onClick={handleOpenModal}
                    className="flex items-center bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-primary">
                    <FaPlus className="mr-2" /> Add Banner
                </button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Image</th>
                            <th className="p-4 text-left">Link</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {banners.map(banner => (
                            <tr key={banner.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                                <td className="p-4 text-gray-700 font-medium flex items-center space-x-2">
                                    <FaImage className="text-primary" />
                                    <span>{banner.title}</span>
                                </td>
                                <td className="p-4">
                                    <img src={`https://rrr.jatssdev.com/banners/${banner.image}`} alt="Banner" className="w-24 h-12 object-cover rounded" />
                                </td>
                                <td className="p-4">
                                    <a href={banner.link} target="_blank" rel="noopener noreferrer"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 flex items-center">
                                        <FaEye className="mr-2" /> View
                                    </a>
                                </td>
                                <td className="p-4 flex space-x-4">
                                    <button
                                        onClick={() => handleDelete(banner.id)}
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

            {/* Add New Banner Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Add New Banner</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newBanner.title}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={newBanner.image}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Link</label>
                                <input
                                    type="text"
                                    name="link"
                                    value={newBanner.link}
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

export default Banners;
