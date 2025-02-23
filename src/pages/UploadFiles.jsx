import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";

const UploadFiles = () => {
    const [folderType, setFolderType] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const folderOptions = [
        { value: "uploads", label: "Uploads" },
        { value: "pdf_book", label: "PDF Book" },
        { value: "scientist", label: "Scientist" },
        { value: "jivan_vikash_pothi", label: "Jivan Vikash Pothi" },
        { value: "gk", label: "General Knowledge" },
        { value: "geeta", label: "Geeta" },
        { value: "banners", label: "Banners" },
        { value: "math", label: "Math" },

    ];

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!folderType || !selectedFile) {
            setMessageType("error");
            setMessage("Please select a folder and choose a file.");
            return;
        }

        const formData = new FormData();
        formData.append("type", folderType);
        formData.append("file", selectedFile);

        try {
            const response = await axios.post(
                "https://rrr.jatssdev.com/api/upload/file",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (response.data.status === "success") {
                setMessageType("success");
                setMessage(response.data.message);
            } else {
                setMessageType("error");
                setMessage(response.data.message || "Upload failed.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            setMessageType("error");
            setMessage("An error occurred while uploading.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-2xl">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    <FaCloudUploadAlt className="inline text-3xl text-primary mr-2" />
                    Upload & Replace Files
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Folder Selection */}
                    <div>
                        <label htmlFor="type" className="block text-gray-700 font-semibold mb-2">
                            Select Folder
                        </label>
                        <select
                            id="type"
                            value={folderType}
                            onChange={(e) => setFolderType(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            required
                        >
                            <option value="">Choose Folder</option>
                            {folderOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* File Input */}
                    <div>
                        <label htmlFor="file" className="block text-gray-700 font-semibold mb-2">
                            Choose File
                        </label>
                        <input
                            type="file"
                            id="file"
                            onChange={handleFileChange}
                            className="w-full p-3 border rounded-lg"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-lg shadow-lg hover:bg-primary-dark transition"
                    >
                        Upload File
                    </button>

                    {/* Message */}
                    {message && (
                        <div
                            className={`text-center p-3 rounded-lg text-sm ${messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                }`}
                        >
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UploadFiles;