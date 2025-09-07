import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";

function Customize2() {
  const { userData, BackendImage, selectedImage, serverUrl, setUserData } =
    useContext(userDataContext);

  const navigate = useNavigate();
  

  const [assistantName, setAssistantName] = useState(userData?.assistantName || "");
  const [loading, setLoading] = useState(false);
  const [assistantImage, setAssistantImage] = useState(null);

  const handleUpdateAssistant = async () => {
    if (!assistantName) return; // safety check

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("assistantName", assistantName);

      if (BackendImage) {
        formData.append("assistantImage", BackendImage);
      } else if (selectedImage) {
        formData.append("imageUrl", selectedImage);
      }

      const result = await axios.post(
  `${serverUrl}/api/user/update`,
  {
    assistantName: assistantName,
    assistantImage: assistantImage
  },
  {
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
  }
);



      console.log(result.data);
      setUserData(result.data);
      setLoading(false);

      navigate("/"); // redirect to home
    } catch (error) {
      console.log("Error updating assistant:", error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-t from-black to-[#06068a] flex flex-col items-center justify-center gap-10 p-6 relative">
      {/* Back Button */}
      <IoMdArrowRoundBack
        className="absolute top-[30px] left-[30px] text-white cursor-pointer w-[25px] h-[25px]"
        onClick={() => navigate("/customize")}
      />

      {/* Heading */}
      <h1 className="text-white text-[30px] text-center">
        Enter your <span className="text-blue-400">Assistant Name</span>
      </h1>

      {/* Input */}
      <input
        type="text"
        placeholder="eg. Nova"
        className="w-full max-w-[500px] h-[60px] outline-none border-2 border-white bg-transparent text-white text-sm placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
        required
        value={assistantName}
        onChange={(e) => setAssistantName(e.target.value)}
      />

      {/* Submit Button */}
      {assistantName && (
        <button
          className="hover:bg-blue-600 text-white rounded-2xl shadow-lg transition duration-300 bg-amber-600 px-6 py-2 cursor-pointer"
          disabled={loading}
          onClick={handleUpdateAssistant}
        >
          {!loading ? "Finally create your Assistant" : "Loading...."}
        </button>
      )}
    </div>
  );
}

export default Customize2;
