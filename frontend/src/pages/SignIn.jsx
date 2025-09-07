import React from "react"
import bg from "../assets/authBg.png"
import { IoEye } from "react-icons/io5"
import {useState,useContext} from 'react'
import { IoEyeOff } from "react-icons/io5"
import {useNavigate} from 'react-router-dom'
import axios from "axios"
import { userDataContext } from "../context/UserContext"

function SignIn() {

const {serverUrl,userData, setUserData}=useContext(userDataContext)
const[showPassword,setShowPassword]=useState(false)

const navigate=useNavigate()

const[email,setEmail]=useState("")
const [loading,setLoading]=useState(false)
const[password,setPassword]=useState("")

const[err,setErr]=useState("")

const handleSignIn=async (e)=>{
  e.preventDefault()
  console.log({ email, password })

setErr("")
setLoading(true)
try {
  
let result = await axios.post(`${serverUrl}/api/auth/signin`, {  email, password }, { withCredentials: true });
setUserData(result.data)

      
    
      console.log(result)
      setLoading(false)
      navigate("/")
  }

 

 catch (error) {
  console.log("Frontend Error:", error.response?.data || error.message);
  setUserData(null)
  setLoading(false)
  setErr(error.response?.data?.message || "Something went wrong");

 }
}





  return (
 <div
      className="w-full h-[100vh] bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}  
    >
      <form className="w-[70%] h-[500px] max-w-[500px] bg-[#00000008] backdrop-blur rounded-xl p-6 shadow-lg
       shadow-black " onSubmit={handleSignIn}>
        <h1 className="text-white text-2xl font-bold mb-6 text-center mb-30px">Sign In To <span className="text-black">Virtual Assistant</span></h1>
       
      

<input 
          type="Email" 
          placeholder='Email' 
          className='w-full h-[50px] outline-none border-2 border-white mb-5 bg-transparent text-white text-sm placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' 
          required onChange={(e)=>setEmail(e.target.value)} value={email}
        />


<div className="w-full h-[50px] border-2
 border-white bg-transparent text-white rounded-full text-[18px]">
         <input 
          type={showPassword?"text":"Password"} 
          placeholder='Password' 
          className='w-full h-[50px] outline-none  bg-transparent  placeholder-gray-300 px-[20px] py-[10px]' 
          required onChange={(e)=>setPassword(e.target.value)} value={password}

          />

{!showPassword && <IoEye className='absolute top-[165px]  left-[430px] right-[20px]
  text-[white] w-[25px] h-[25px] cursor-pointer' onClick={()=>setShowPassword(true)} />
}

{showPassword && <IoEyeOff className='absolute top-[165px]  left-[430px] right-[20px]
  text-[white] w-[25px] h-[25px] cursor-pointer' onClick={()=>setShowPassword(false)} />
}

</div>


{err.length>0 && <p className='text-red-500 text-[17px]'>
  *{err}
</p>}


<div className="w-full flex justify-center mt-15">
  <button
    type="submit"
    className="bg-blue-800 text-white text-[20px] 
      py-3 px-7 rounded-full font-bold hover:bg-blue-600 transition " 
    disabled={loading}>{loading?"Loading...":"Sign In"}
  </button>
</div>


<div className="w-full flex justify-center mt-8">
        <p className='text-white text-[17px] cursor-pointer' onClick={()=>navigate("/SignUp")}>
            Want to create a new account ? <span className='text-black font-bold'>Sign Up</span>
        </p>
</div>







</form>
</div>
  );
}
export default SignIn
