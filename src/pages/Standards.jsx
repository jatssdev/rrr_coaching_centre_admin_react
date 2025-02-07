import React, { useContext } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { GlobalContext } from '../components/ContextProvider';



const Standards = () => {
    let { standards } = useContext(GlobalContext)
    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Standards</h2>
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="p-4 text-left">Grade (English)</th>
                            <th className="p-4 text-left">Grade (Gujarati)</th>
                            <th className="p-4 text-left">Dashboard Title</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standards.map(standard => (
                            <tr key={standard.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                                <td className="p-4 text-gray-700 font-medium">{standard.name_en}</td>
                                <td className="p-4 text-gray-700 font-medium">{standard.name_gu}</td>
                                <td className="p-4 text-gray-700 font-medium">{standard.dashboard_title}</td>
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
        </div>
    );
};

export default Standards;
