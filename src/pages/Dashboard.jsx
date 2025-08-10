import React from "react";
import { motion } from "framer-motion";
import * as Icons from "react-icons/fa"; 
import dashboardConfig from "../data/dashboardConfig.json";
import { useUser } from "../context/UserContext";

const Dashboard = () => {
  const { user } = useUser();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.4 },
    }),
  };

  const StatusBadge = ({ status }) => {
    const statusColors = {
      Active: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Inactive: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-sm font-semibold ${
          statusColors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status || "Unknown"}
      </span>
    );
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading user data...
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* User Welcome Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {user.name || "User"}!
        </h1>
        <p className="text-gray-600">Here’s your dashboard overview.</p>
      </div>

      {/* Dashboard Sections */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {dashboardConfig.sections.map((section, index) => {
          const IconComponent = Icons[section.icon] || Icons.FaQuestionCircle;

          return (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              className="bg-white shadow-lg rounded-xl p-5 border border-gray-200"
            >
              <div className="flex items-center space-x-3 mb-4">
                <IconComponent className={`text-2xl ${section.iconColor}`} />
                <h2 className="text-lg font-semibold text-gray-800">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-2">
                {section.items.map((item, i) => {
                  const value =
                    item.type === "statusBadge" ? (
                      <StatusBadge status={user?.[item.valueKey]} />
                    ) : (
                      user?.[item.valueKey] ?? item.fallback
                    );

                  return (
                    <li
                      key={i}
                      className="flex justify-between text-gray-700 border-b pb-1"
                    >
                      <span className="font-medium">{item.label}:</span>
                      <span>{value}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Dashboard;
