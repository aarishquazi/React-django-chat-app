import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
// import uploadFile from '../helpers/uploadFile';
// import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import api from '../api'


const RegisterPage = ({route}) => {
  const [name,setname]=useState("");
  const [email,setemail]=useState("");
  const [profile_pic,setprofilepic]=useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [uploadPhoto,setUploadPhoto] = useState("")
  const navigate = useNavigate();

  // const navigate = useNavigate()


  const handleUploadPhoto = async(e)=>{
    const file = e.target.files[0]

    setUploadPhoto(file)
    setprofilepic(file)
    // const uploadPhoto = await uploadFile(file)

    // setUploadPhoto(file)
  }
  const handleClearUploadPhoto = (e)=>{
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()
    try{
      console.log(profile_pic)
    // const res = await api.post(route, {username, password,profile_pic,email,name })
    const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('email', email);
      formData.append('name', name);
      if (profile_pic) {
        formData.append('profile_pic', profile_pic);  // Append file to form data
      }
      console.log(formData);
      const res = await api.post(route, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'X-CSRFToken': getCsrfToken(),
        }, });
      
    console.log(res);
    toast.success("registered")
    navigate('/login')
    }
    catch (error) {
      alert(error)
    }
    // const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`

    // try {
    //     const response = await axios.post(URL,data)
    //     console.log("response",response)

        // toast.success(response.data.message)

        // if(response.data.success){
        //     setData({
        //       name : "",
        //       email : "",
        //       password : "",
        //       profile_pic : ""
        //     })

    //         navigate('/email')

    //     }
    // } catch (error) {
    //     toast.error(error?.response?.data?.message)
    // }
    // console.log('data',data)
  }


  return (
    <div className='mt-5'>
        <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>
          <h3>Welcome to Chat app!</h3>
          <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
              <div className='flex flex-col gap-1'>
        
                <label htmlFor='name'>Name :</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  placeholder='enter your name' 
                  className='bg-slate-100 px-2 py-1 focus:outline-primary'
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor='username'>username :</label>
                <input
                  type='text'
                  id='username'
                  name='username'
                  placeholder='enter your name' 
                  className='bg-slate-100 px-2 py-1 focus:outline-primary'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor='email'>Email :</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='enter your email' 
                  className='bg-slate-100 px-2 py-1 focus:outline-primary'
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor='password'>Password :</label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='enter your password' 
                  className='bg-slate-100 px-2 py-1 focus:outline-primary'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor='profile_pic'>Photo :

                  <div className='h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
                      <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                        {
                          uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"
                        }
                      </p>
                      {
                        uploadPhoto?.name && (
                          <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearUploadPhoto}>
                            <IoClose/>
                          </button>
                        )
                      }
                      
                  </div>
                
                </label>
                
                <input
                  type='file'
                  id='profile_pic'
                  name='profile_pic'
                  className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
                  onChange={handleUploadPhoto}
                />
              </div>


              <button
               className='bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
              >
                Register
              </button>

          </form>

          <p className='my-3 text-center'>Already have account ? <Link to={"/login"} className='hover:text-primary font-semibold'>Login</Link></p>
        </div>
    </div>
  )
}

export default RegisterPage