import React, { useContext, useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { GlobalContext } from '../components/ContextProvider';
import axios from 'axios';

const Standards = () => {
    const { standards, fetchStandards, options, fetchOptions } = useContext(GlobalContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newStandard, setNewStandard] = useState({ name_en: '', name_gu: '', dashboard_option_id: '' });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const [editStandard, setEditStandard] = useState(null);
    const [selectOptions, setSelectoptions] = useState([])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewStandard({ ...newStandard, [name]: value });
    };
    useEffect(() => {
        fetchOptions()
    }, [])
    useEffect(() => {
        let v = options.filter((x) => x.type == 'standards')
        setSelectoptions(v)
    }, [options])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://rrr.jatssdev.com/api/standard/add", newStandard);
            fetchStandards();
            handleCloseModal();
        } catch (error) {
            console.error("Error adding standard:", error);
        }
    };

    const DeleteStandards = async (id) => {
        if (window.confirm("Are you sure you want to delete this standard?")) {
            try {
                await axios.delete(`https://rrr.jatssdev.com/api/standard/delete?id=${id}`);
                fetchStandards();
            } catch (error) {
                console.error("Error deleting book:", error);
            }
        }
    }
    const handleEditModalOpen = (standard) => {
        setEditStandard(standard);
        setIsEditModalOpen(true);
    };
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditStandard({ ...editStandard, [name]: value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://rrr.jatssdev.com/api/standard/update?id=${editStandard.id}`, editStandard);
            fetchStandards();
            handleEditModalClose();
        } catch (error) {
            console.error("Error updating standard:", error);
        }
    };
    const handleEditModalClose = () => setIsEditModalOpen(false);
    let handleChangeDashboard = (e) => {
        fetchStandards('https://rrr.jatssdev.com/api/standard/by-dashboard?dashboard_option_id=' + e.target.value)
    }
    return (
        <>
            <select
                onChange={handleChangeDashboard}
                name=""
                id=""
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition duration-300 bg-white text-gray-700"
            >
                <option value="all" className="text-gray-700">All</option>
                {selectOptions.map((x) => (
                    <option key={x.id} value={x.id} className="text-gray-700">
                        {x.title}
                    </option>
                ))}
            </select> 

            <div className="p-10 bg-gray-100 min-h-screen"> 
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Standards</h2>
                    <button
                        onClick={handleOpenModal}
                        className="flex items-center bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-primary">
                        <FaPlus className="mr-2" /> Add Standard
                    </button>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="p-4 text-left">Grade (English)</th>
                                <th className="p-4 text-left">Grade (Gujarati)</th>
                                <th className="p-4 text-left">Dashboard Option ID</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {standards.map(standard => (
                                <tr key={standard.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                                    <td className="p-4 text-gray-700 font-medium">{standard.name_en}</td>
                                    <td className="p-4 text-gray-700 font-medium">{standard.name_gu}</td>
                                    <td className="p-4 text-gray-700 font-medium">{standard.dashboard_option_id}</td>
                                    <td className="p-4 flex justify-center space-x-4">
                                        <button onClick={() => handleEditModalOpen(standard)} className="text-primary hover:text-blue-700 bg-blue-100 p-2 rounded-lg">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => DeleteStandards(standard.id)} className="text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-lg">
                                            <FaTrash />
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
                            <h3 className="text-xl font-semibold mb-4">Add New Standard</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Grade (English)</label>
                                    <input
                                        type="text"
                                        name="name_en"
                                        value={newStandard.name_en}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Grade (Gujarati)</label>
                                    <input
                                        type="text"
                                        name="name_gu"
                                        value={newStandard.name_gu}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Dashboard Option</label>
                                    <select
                                        name="dashboard_option_id"
                                        value={newStandard.dashboard_option_id}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    >
                                        <option value="">Select Dashboard Option</option>
                                        {options.map(option => (
                                            <option key={option.id} value={option.id}>{option.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <button type="button" onClick={handleCloseModal} className="bg-gray-300 px-4 py-2 rounded-lg">Cancel</button>
                                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {isEditModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h3 className="text-xl font-semibold mb-4">Edit Standard</h3>
                            <form onSubmit={handleEditSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Grade (English)</label>
                                    <input type="text" name="name_en" value={editStandard.name_en} onChange={handleEditChange} className="w-full p-2 border rounded" required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Grade (Gujarati)</label>
                                    <input type="text" name="name_gu" value={editStandard.name_gu} onChange={handleEditChange} className="w-full p-2 border rounded" required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Dashboard Option</label>
                                    <select name="dashboard_option_id" value={editStandard.dashboard_option_id} onChange={handleEditChange} className="w-full p-2 border rounded" required>
                                        <option value="">Select Dashboard Option</option>
                                        {options.map(option => (
                                            <option key={option.id} value={option.id}>{option.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <button type="button" onClick={handleEditModalClose} className="bg-gray-300 px-4 py-2 rounded-lg">Cancel</button>
                                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}


            </div>
        </>
    );
};

export default Standards;
