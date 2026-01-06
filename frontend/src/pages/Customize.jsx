import { RiImageAddLine } from "react-icons/ri";
import image from "C:\Users\XPRISTO\Desktop\MERN Stack\frontend\public\assets\image.png.jfif";
import image1 from "../assets/image1.png.jfif";
import image3 from "../assets/image3.png.jfif";
import image4 from "../assets/image4.png.jfif";
import image5 from "../assets/image5.png.jfif";
import image6 from "../assets/image6.png.jfif";
import authBg from "../assets/authBg.png";
import React, { useContext,useState, useRef } from "react";
import Card from "../Component/Card";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";




function Customize() {
  const{serverUrl,userData,setUserData,BackendImage,setBackendImage,FrontendImage,
    setFrontendImage,selectedImage,setSelectedImage}=useContext(userDataContext)
const navigate=useNavigate()



const inputImage=useRef()

const handleImage=(e)=>{
  const file=e.target.files[0]
  setBackendImage(file)
  setFrontendImage(URL.createObjectURL(file))
}



  return (
    <div className="w-full h-full bg-gradient-to-t from-black to-[#06068a] flex flex-col items-center justify-center gap-10 p-6">
      <IoMdArrowRoundBack className='absolute top-[30px] left-[30px] text-white cursor-pointer w-[25px] h-[25px]'
       onClick={()=>navigate("/home")}/>
            



      <h1 className="text-white text-[30px] text-center">
        Select your <span className="text-blue-400">Assistant Image</span>
      </h1>

      {/* Grid of Images */}
      <div className="grid grid-cols-4 gap-6 place-items-center">
        <Card image={image} />
        <Card image={image1} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={authBg} />

        {/* Add Image Card */}
        <div className={`w-[150px] h-[250px] bg-[#0b0b68] border-2 border-transparent rounded-2xl 
                  overflow-hidden flex items-center justify-center cursor-pointer 
                  transform transition-transform duration-300 hover:-translate-y-2 
                  hover:shadow-2xl hover:border-white
                  ${selectedImage == image ? "border-4 border-white shadow-blue-950" : ""}`}
                        onClick={() => {inputImage.current.click() 
                        setSelectedImage("input") }}>
                      

                      {FrontendImage &&  <RiImageAddLine className="text-white w-[25px] h-[25px]" />}
                      {FrontendImage && <img src={FrontendImage}
                      className='h-full object-cover'/>
                      }
        </div>



<input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage}/>





      </div>

      {selectedImage && <button className="hover:bg-blue-600 text-white rounded-2xl shadow-lg transition duration-300 bg-amber-600 px-6 py-2 cursor-pointer"
      onClick={()=>navigate("/customize2")}>
        Next
      </button>}

      
      
    </div>
  );
}

export default Customize;