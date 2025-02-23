import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../components/ContextProvider';
import { FaTrash, FaEdit, FaPlus, FaYoutube } from 'react-icons/fa';
import axios from 'axios';

const YouTube = () => {
    const { standards } = useContext(GlobalContext);
    const [videos, setVideos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newVideo, setNewVideo] = useState({ chapter_id: '', title: '', icon: '', priority: '', length: '', link: '' });
    const [editVideo, setEditVideo] = useState(null);
    const [currBooks, setCurrBooks] = useState([]);
    const [currChapters, setCurrChapters] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch all videos on mount
    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const response = await axios.get("https://rrr.jatssdev.com/api/youtube/all");
            if (response.data.status === "success") {
                setVideos(response.data.data || []);
            }
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    // Handle Standard Selection
    const handleStandardChange = async (e) => {
        const standardId = e.target.value;
        setCurrBooks([]);
        setCurrChapters([]);
        setNewVideo({ ...newVideo, chapter_id: '' });

        if (!standardId) return;

        try {
            const response = await axios.get(`https://rrr.jatssdev.com/api/books/by-standard?standard_id=${standardId}`);
            if (response.data.status === "success") {
                setCurrBooks(response.data.data || []);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    // Handle Book Selection
    const handleBookChange = async (e) => {
        const bookId = e.target.value;
        setCurrChapters([]);
        setNewVideo({ ...newVideo, chapter_id: '' });

        if (!bookId) return;

        try {
            const response = await axios.get(`https://rrr.jatssdev.com/api/chapter/by-book?book_id=${bookId}`);
            if (response.data.status === "success") {
                setCurrChapters(response.data.data || []);
            }
        } catch (error) {
            console.error("Error fetching chapters:", error);
        }
    };

    // Handle Chapter Selection
    const handleChapterChange = (e) => {
        setNewVideo({ ...newVideo, chapter_id: e.target.value });
    };

    // Handle Add Video
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const { chapter_id, title, icon, priority, length, link } = newVideo;
        if (!chapter_id || !title || !icon || !priority || !length || !link) {
            setErrorMessage("All fields are required.");
            return;
        }

        try {
            await axios.post("https://rrr.jatssdev.com/api/youtube/add", newVideo);
            fetchVideos();
            handleCloseModal();
        } catch (error) {
            console.error("Error adding video:", error);
            setErrorMessage("Failed to add video. Please try again.");
        }
    };

    // Handle Delete Video
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this video?")) {
            try {
                await axios.delete(`https://rrr.jatssdev.com/api/youtube/delete?id=${id}`);
                fetchVideos();
            } catch (error) {
                console.error("Error deleting video:", error);
            }
        }
    };

    // Handle Edit Video
    const handleOpenEditModal = (video) => {
        setEditVideo(video);
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://rrr.jatssdev.com/api/youtube/update?id=${editVideo.id}`, editVideo);
            fetchVideos();
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error updating video:", error);
        }
    };

    // Modal Handlers
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setErrorMessage('');
    };

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">YouTube Videos</h2>
                <button
                    onClick={handleOpenModal}
                    className="flex items-center bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-primary">
                    <FaPlus className="mr-2" /> Add Video
                </button>
            </div>

            {/* Videos Table */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Thumbnail</th>
                            <th className="p-4 text-left">Priority</th>
                            <th className="p-4 text-left">Length</th>
                            <th className="p-4 text-left">Link</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videos.map(video => (  
                            <tr key={video.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                                <td className="p-4 text-gray-700 font-medium flex items-center space-x-2">
                                    <FaYoutube className="text-red-500" />
                                    <span>{video.title}</span>
                                </td>
                                <td className="p-4">
                                    <img src={video.icon} alt="Thumbnail" className="w-16 h-10 rounded" />
                                </td>
                                <td className="p-4 text-gray-700 font-medium">{video.priority}</td>
                                <td className="p-4 text-gray-700 font-medium">{video.length}</td>
                                <td className="p-4">
                                    <a href={video.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                        Watch
                                    </a>
                                </td>
                                <td className="p-4 flex space-x-4">
                                    <button onClick={() => handleOpenEditModal(video)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(video.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Video Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6  rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Add New Video</h3>
                        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                        <form className=' max-h-[70vh] overflow-auto' onSubmit={handleSubmit}>
                            {/* Standard Selection */}
                            <label className="block text-gray-700 mb-2">Standard</label>
                            <select onChange={handleStandardChange} className="w-full p-2 border rounded mb-4" required>
                                <option value="">Select Standard</option>
                                {standards.map(std => (
                                    <option key={std.id} value={std.id}>{std.name_en}</option>
                                ))}
                            </select>

                            {/* Book Selection */}
                            <label className="block text-gray-700 mb-2">Book</label>
                            <select onChange={handleBookChange} className="w-full p-2 border rounded mb-4" required disabled={!currBooks.length}>
                                <option value="">Select Book</option>
                                {currBooks.map(book => (
                                    <option key={book.id} value={book.id}>{book.title}</option>
                                ))}
                            </select>

                            {/* Chapter Selection */}
                            <label className="block text-gray-700 mb-2">Chapter</label>
                            <select onChange={handleChapterChange} className="w-full p-2 border rounded mb-4" required disabled={!currChapters.length}>
                                <option value="">Select Chapter</option>
                                {currChapters.map(chapter => (
                                    <option key={chapter.id} value={chapter.id}>{chapter.title}</option>
                                ))}
                            </select>

                            {/* Video Details */}
                            <label className="block text-gray-700 mb-2">Title</label>
                            <input type="text" placeholder="Video Title" className="w-full p-2 border rounded mb-4" onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })} required />

                            <label className="block text-gray-700 mb-2">Thumbnail URL</label>
                            <input type="text" placeholder="Thumbnail URL" className="w-full p-2 border rounded mb-4" onChange={(e) => setNewVideo({ ...newVideo, icon: e.target.value })} required />

                            <label className="block text-gray-700 mb-2">Priority</label>
                            <input type="number" placeholder="Priority" className="w-full p-2 border rounded mb-4" onChange={(e) => setNewVideo({ ...newVideo, priority: e.target.value })} required />

                            <label className="block text-gray-700 mb-2">Length</label>
                            <input type="text" placeholder="Video Length (e.g., 10:23)" className="w-full p-2 border rounded mb-4" onChange={(e) => setNewVideo({ ...newVideo, length: e.target.value })} required />

                            <label className="block text-gray-700 mb-2">YouTube Link</label>
                            <input type="text" placeholder="YouTube Link" className="w-full p-2 border rounded mb-4" onChange={(e) => setNewVideo({ ...newVideo, link: e.target.value })} required />

                            {/* Buttons */}
                            <div className="flex justify-end space-x-4">
                                <button type="button" onClick={handleCloseModal} className="bg-gray-300 px-4 py-2 rounded-lg">Cancel</button>
                                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary">Add Video</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default YouTube;
