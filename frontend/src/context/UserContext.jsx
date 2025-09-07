import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const userDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = "http://localhost:8000";
  
  const [userData, setUserData] = useState(null);

  // extra states for customization
  const [FrontendImage, setFrontendImage] = useState(null);
  const [BackendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });

      // 🔎 Check what backend sends
      // Example: if result.data = { success: true, user: {...} }
      if (result.data?.user) {
        setUserData(result.data.user);
      } else {
        setUserData(result.data);
      }

      console.log("Current user:", result.data);
    } catch (error) {
      console.log("Frontend Error:", error);
      setUserData(null); // ensure logout/reset on error
    }
  };

const  getGeminiResponse=async(command)=>{
  try {
    const result=await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},{withCredentials:true})
    return result.data
    
  } catch (error) {
    console.log(error)
    
  }


}









  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData,
    FrontendImage,
    setFrontendImage,
    BackendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
    getGeminiResponse
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
