import React, { useContext } from 'react';
import { GlobalContext } from '../components/ContextProvider';
import {
    FaUserGraduate, FaBook, FaBuilding, FaUsers, FaPlus, FaCog,
    FaFlask, FaBookOpen
} from 'react-icons/fa';

const Dashboard = () => {
    const { options, standards, books, scientists, jivVikashPothi } = useContext(GlobalContext);

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-10">
                <StatCard title="Total Students" value="11,257,000" change="+12% from last month" icon={<FaUserGraduate className="text-primary" />} />
                <StatCard title="Total Books" value={books.length} change="" icon={<FaBook className="text-purple-600" />} />
                <StatCard title="Standards" value={standards.length} change="" icon={<FaBuilding className="text-orange-600" />} />
                <StatCard title="Total Options" value={options.length} change="" icon={<FaUsers className="text-green-600" />} />
                <StatCard title="Scientists" value={scientists.length} change="" icon={<FaFlask className="text-blue-600" />} />
                <StatCard title="Jiv Vikash Pothi" value={jivVikashPothi.length} change="" icon={<FaBookOpen className="text-red-600" />} />
            </div>

            {/* Recent Activities & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <ActivityCard />
                <QuickActions />
            </div>

            {/* Data Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <ListCard title="Options" data={options} />
                <ListCard title="Books" data={books} />
                <ListCard title="Standards" data={standards} />
                <ListCard title="Scientists" data={scientists} />
                <ListCard title="Jiv Vikash Pothi" data={jivVikashPothi} />
            </div>
        </div>
    );
};

const StatCard = ({ title, value, change, icon }) => (
    <div className="bg-white p-10 rounded-lg shadow-lg flex items-center">
        <div className="text-4xl bg-gray-100 p-5 rounded-lg mr-6">{icon}</div>
        <div>
            <p className="text-gray-600 text-lg font-medium">{title}</p>
            <h3 className="text-3xl font-bold">{value}</h3>
            <p className="text-md text-green-600">{change}</p>
        </div>
    </div>
);

const ActivityCard = () => (
    <div className="bg-white p-10 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-6">Recent Activities</h3>
        <ActivityItem icon={<FaPlus className="text-primary" />} text="New book added: Mathematics Grade 10 " time="2 hours ago" />
        <ActivityItem icon={<FaUserGraduate className="text-green-600" />} text="New student registration" time="4 hours ago" />
        <ActivityItem icon={<FaBuilding className="text-purple-600" />} text="Standard updated" time="6 hours ago" />
    </div>
);

const ActivityItem = ({ icon, text, time }) => (
    <div className="flex items-center space-x-6 mb-4">
        <div className="text-3xl bg-gray-100 p-3 rounded-lg">{icon}</div>
        <div>
            <p className="text-gray-700 text-lg font-medium">{text}</p>
            <p className="text-sm text-gray-500">{time}</p>
        </div>
    </div>
);

const QuickActions = () => (
    <div className="bg-white p-10 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-6">
            <ActionButton text="Add Book" icon={<FaPlus className="text-primary" />} />
            <ActionButton text="Add Student" icon={<FaUserGraduate className="text-green-600" />} />
            <ActionButton text="Add Standard" icon={<FaBuilding className="text-purple-600" />} />
            <ActionButton text="Settings" icon={<FaCog className="text-orange-600" />} />
        </div>
    </div>
);

const ActionButton = ({ text, icon }) => (
    <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center space-x-3 hover:bg-gray-200 cursor-pointer text-lg font-medium">
        {icon}
        <span className="text-gray-700">{text}</span>
    </div>
);

const ListCard = ({ title, data }) => (
    <div className="bg-white p-10 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        {data.length > 0 ? (
            <ul className="space-y-3">
                {data.slice(0, 5).map((item, index) => (
                    <li key={index} className="text-gray-700 border-b pb-2">{item.name || item.title || item.name_gu}</li>
                ))}
            </ul>
        ) : (
            <p className="text-gray-500">No {title.toLowerCase()} available</p>
        )}
    </div>
);

export default Dashboard;
