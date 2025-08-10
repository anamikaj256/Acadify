import { useState } from "react";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope } from "react-icons/fa";

const EditProfile = () => {
  const { user, updateProfile } = useUser();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  if (!user) {
    return <p className="text-center text-red-500">No user logged in.</p>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Name and Email are required");
      return;
    }

    if (formData.email !== user.email) {
      toast.info(
        "Your login email has been updated. Use the new email to log in."
      );
    }

    updateProfile(formData);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 animate-slideUp floating-card"
        style={{
          boxShadow:
            "0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07)",
          border: "1px solid #cbd5e1",
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 tracking-wide">
          Edit Profile
        </h2>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition duration-200 shadow-md"
          >
            Save Changes
          </button>
        </form>
      </div>

      <style>
        {`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slideUp {
            animation: slideUp 0.6s ease-out;
          }
          @keyframes floatCard {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0px); }
          }
          .floating-card {
            animation: floatCard 6s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default EditProfile;
