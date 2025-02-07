import React, { useContext, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { GlobalContext } from '../components/ContextProvider';

const Options = () => {
    const { options } = useContext(GlobalContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newOption, setNewOption] = useState({ title: '', priority: '' });

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        setNewOption({ ...newOption, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New Option:', newOption);
        handleCloseModal();
    };

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Options</h2>
                <button
                    onClick={handleOpenModal}
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600">
                    <FaPlus className="mr-2" /> Add Option
                </button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-500 text-white">
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
                                    <input type="number" className="w-16 p-2 border rounded" value={option.priority} readOnly />
                                </td>
                                <td className="p-4 flex justify-center space-x-4">
                                    <button className="text-blue-500 hover:text-blue-700 bg-blue-100 p-2 rounded-lg">
                                        <FaEdit />
                                    </button>
                                    <button className="text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-lg">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Add New Option</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newOption.title}
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
                                    value={newOption.priority}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
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

export default Options;