import React, { useContext, useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { GlobalContext } from '../components/ContextProvider';
import axios from 'axios';

const Maths = () => {
    const { options, fetchOptions, mathsOptions, fetchMathsOptions } = useContext(GlobalContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newOption, setNewOption] = useState({ title: '', icon: '', priority: 0, dashboard_option_id: '' });
    const [editOption, setEditOption] = useState(null);
    const [filteredDashboardOptions, setFilteredDashboardOptions] = useState([]);

    useEffect(() => {
        fetchOptions();
        fetchMathsOptions();
    }, []);

    useEffect(() => {
        const filtered = options.filter(opt => opt.type === 'maths');
        setFilteredDashboardOptions(filtered);
    }, [options]);

    const handleInputChange = (e, updater) => {
        const { name, value } = e.target;
        updater(prev => ({ ...prev, [name]: value }));
    };

    const handleDashboardChange = (e) => {
        const dashboardOptionId = e.target.value;
        if (dashboardOptionId === 'all') {
            fetchMathsOptions();
        } else {
            fetchMathsOptions(`https://rrr.jatssdev.com/api/maths/by-dashboard?dashboard_option_id=${dashboardOptionId}`);
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://rrr.jatssdev.com/api/mathematics-option/add", newOption);
            fetchMathsOptions();
            setIsModalOpen(false);
            setNewOption({ title: '', icon: '', priority: 0, dashboard_option_id: '' });
        } catch (error) {
            console.error("Error adding math option:", error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://rrr.jatssdev.com/api/maths/update?id=${editOption.id}`, editOption);
            fetchMathsOptions();
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error updating math option:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this math option?")) {
            try {
                await axios.delete(`https://rrr.jatssdev.com/api/maths/delete?id=${id}`);
                fetchMathsOptions();
            } catch (error) {
                console.error("Error deleting math option:", error);
            }
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <select
                    onChange={handleDashboardChange}
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-primary bg-white"
                >
                    <option value="all">All Dashboard Options</option>
                    {filteredDashboardOptions.map(option => (
                        <option key={option.id} value={option.id}>{option.title}</option>
                    ))}
                </select>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary-dark"
                >
                    <FaPlus className="mr-2" /> Add Math Option
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
                <table className="w-full border-collapse">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Icon</th>
                            <th className="p-4 text-left">Priority</th>
                            <th className="p-4 text-left">Dashboard Option</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mathsOptions.map((option) => (
                            <tr key={option.id} className="hover:bg-gray-100 border-b">
                                <td className="p-4">{option.title}</td>
                                <td className="p-4">
                                    <img src={option.icon} alt={option.title} className="w-10 h-10 object-cover" />
                                </td>
                                <td className="p-4">{option.priority}</td>
                                <td className="p-4">{option.dashboard_option_id}</td>
                                <td className="p-4 flex justify-center space-x-2">
                                    <button onClick={() => { setEditOption(option); setIsEditModalOpen(true); }} className="text-primary">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(option.id)} className="text-red-500">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Modal */}
            {isModalOpen && (
                <Modal
                    title="Add Math Option"
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddSubmit}
                    formState={newOption}
                    handleChange={(e) => handleInputChange(e, setNewOption)}
                    dashboardOptions={filteredDashboardOptions}
                />
            )}

            {/* Edit Modal */}
            {isEditModalOpen && editOption && (
                <Modal
                    title="Edit Math Option"
                    onClose={() => setIsEditModalOpen(false)}
                    onSubmit={handleEditSubmit}
                    formState={editOption}
                    handleChange={(e) => handleInputChange(e, setEditOption)}
                    dashboardOptions={filteredDashboardOptions}
                />
            )}
        </div>
    );
};

const Modal = ({ title, onClose, onSubmit, formState, handleChange, dashboardOptions }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formState.title}
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
                        value={formState.icon}
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
                        value={formState.priority}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Dashboard Option</label>
                    <select
                        name="dashboard_option_id"
                        value={formState.dashboard_option_id}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select Dashboard Option</option>
                        {dashboardOptions.map(option => (
                            <option key={option.id} value={option.id}>{option.title}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end space-x-4">
                    <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-lg">Cancel</button>
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg">Save</button>
                </div>
            </form>
        </div>
    </div>
);

export default Maths;
