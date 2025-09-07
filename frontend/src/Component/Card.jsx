import React, { useContext } from "react";
import { userDataContext } from "../context/UserContext";




function Card({ image }) {
  const{serverUrl,userData,setUserData,BackendImage,setBackendImage,FrontendImage,
      setFrontendImage,selectedImage,setSelectedImage}=useContext(userDataContext)
  

return(
  <div className={`w-[150px] h-[250px] bg-[#0b0b68]  border-[#0000ff61] rounded-2xl 
                  overflow-hidden flex items-center justify-center cursor-pointer 
                  transform transition-transform duration-300 hover:-translate-y-2 
                  hover:shadow-2xl hover:border-4 hover:border-white 
                  ${selectedImage == image ? "border-4 border-white shadow-blue-950" : "null"}`}
                  onClick={()=>{
                    setSelectedImage(image)
                    setBackendImage(null)
                    setFrontendImage(null)
                    }}>

    <img
  src={image}
  alt="Card-img"
  className={`w-full h-full object-cover block 
              ${selectedImage === image ? "border-4 border-white shadow-blue-950" : ""}`}
/>

    </div>
    
  );
}
export default Card