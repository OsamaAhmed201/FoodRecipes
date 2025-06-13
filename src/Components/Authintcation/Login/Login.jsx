import React, { useContext, useState } from 'react'
import logoimg from '../../../assets/foodRecipe.png'
import { data, Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { AuthContext } from '../../Context/authContext/AuthContextProvider.jsx'
import { axiosInstance, USERS_URLS } from '../../Shared/baseUrl/baseUrl.js'
import { EMAIL_VALIDTION, PASSWORD_VALIDTION } from '../../Shared/Validtion/Validtion.js'
export default function Login() {
  let [loding, setLoding] = useState(false)
  let { setToken } = useContext(AuthContext)
  let navigate = useNavigate()
  let { register, handleSubmit, formState: { errors } } = useForm()
  const [show, setShow] = useState(false)



  // call ApiLogin
  const onSubmit = async (data) => {
    try {
      setLoding(true)
      let respons = await axiosInstance.post(USERS_URLS.LOGIN, data)

      if (respons.statusText === 'OK') {
        toast.success(`Login successful`)
        setLoding(false)
        setToken(respons.data.token)
        localStorage.setItem("token", respons.data.token)
        navigate('/dashboard')
      }

    } catch (error) {
      toast.error(error.response.data.message || "Login Failed")
      setLoding(false)
    }
  }

  return (
    <>
      {loding ? (
        <div className="d-flex justify-content-center align-items-center vh-100 bg_load">
          <div class="loader"></div>
        </div>
      ): <div className='All_AuthContant'>
        <div className="container-fluid overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-6 bg-white  rounded-3 py-5 px-5">
              <div>
                {/* /logoimg/ */}
                <div className="log_img text-center ">
                  <img src={logoimg} className='w-50' alt="food-logo" />
                </div>
                {/* /title/ */}
                <div className="title_auth">
                  <h2>Log In</h2>
                  <p className='text-muted'>Welcome Back! Please enter your details</p>
                </div>
                {/* /form/ */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* /email/ */}
                  <div className="input-group mt-3">
                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
                    <input {...register('email', EMAIL_VALIDTION)} type="mail" name='email' className="form-control input_email" placeholder="Enter your E-mail" aria-label="email" aria-describedby="basic-addon1" />
                  </div>
                  {errors.email && <span className='text-danger'>{errors.email.message}</span>}

                  {/* /password/ */}
                  <div className="input-group mt-3 position-relative all_pass ">
                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-key"></i></span>
                    <input   {...register('password', PASSWORD_VALIDTION)} type={show ? "text" : "password"} name='password' className="form-control input_email bord_pass" placeholder="Password" aria-label="password" aria-describedby="basic-addon1" />
                    <span
                      className="position-absolute end-0 top-50 translate-middle-y pe-2 alleye rounded-3"
                      onClick={() => setShow((prev) => !prev)}
                    >
                      {show ? (
                        <i className="fa-solid fa-eye p-2 me-1 "></i>
                      ) : (
                        <i className="fa-solid fa-eye-slash p-2 m-1"></i>
                      )}
                    </span>
                  </div>
                  {errors.password && <span className='text-danger'>{errors.password.message}</span>}

                  {/* links */}
                  <div className="d-flex justify-content-between links_Log mb-3 mt-3">
                    <Link to={'/register'} className='text-decoration-none text-dark '>Register Now?</Link>
                    <Link to={'/forget_pass'} className='text-decoration-none text-success'>Forgot Password?</Link>
                  </div>
                  <button className='bnt_submit w-100'>Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>}

     

    </>


  )
}
