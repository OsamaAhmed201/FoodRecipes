import React, { use, useEffect, useState } from 'react'
import logoimg from '../../../assets/foodRecipe.png'
import { data, Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import { axiosInstance, USERS_URLS } from '../../Shared/baseUrl/baseUrl.js'
import { EMAIL_VALIDTION, PASSWORD_VALIDTION } from '../../Shared/Validtion/Validtion.js'

export default function Forget_PassWord() {
  let [userEmail, setUserEmail] = useState('')
  let [loding, setLoding] = useState(false)
  let navigate = useNavigate()
  let { register, watch, handleSubmit, formState: { errors } } = useForm()
  const [show, setShow] = useState(false)
  const [dispalyForm, setDisplayForm] = useState(true)


  // call ApiForget
  const onSubmit = async (data) => {
    try {
      setLoding(true)
      let respons = await axiosInstance.post(USERS_URLS.FORGET_PASSWORD, data)
      if (respons.data.message === 'Your request is being processed, please check your email') {
        toast.success(`success,please check your email`)
        setUserEmail(respons.data.email)
        setLoding(false)
        setDisplayForm(false)

      }

    } catch (error) {
      toast.error(error.response.data.message)
      setLoding(false)
    }
  }
  // call ApiUpdate
  const onSubmitUpdate = async (data) => {
    try {
      setLoding(true)
      let respons = await axiosInstance.post(USERS_URLS.RESET_PASSWORD, data)
      console.log(respons);

      if (respons.data.message === 'Password has been updated successfully') {
        toast.success(`Password has been updated successfully`)
        setLoding(false)
        navigate('/login')
      }

    } catch (error) {
      toast.error(error.response.data.message)
      setLoding(false)
    }
  }
  useEffect(() => {
    if (userEmail) {
      setUserEmail('email', userEmail);

    }
  }, [userEmail, setUserEmail])
  return (
    <>
      {loding ? (
        <div className="d-flex justify-content-center align-items-center vh-100 bg_load">
          <div class="loader"></div>
        </div>
      ) : <>
        {dispalyForm ?
          <div className='All_AuthContant'>
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
                      <h2>Forgot Your Password?</h2>
                      <p className='text-muted'>No worries! Please enter your email and we will send a password reset link </p>
                    </div>
                    {/* /form/ */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {/* /email/ */}
                      <div className="input-group mt-3">
                        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
                        <input {...register('email', EMAIL_VALIDTION)} type="mail" name='email' className="form-control input_email" placeholder="Enter your E-mail" aria-label="email" aria-describedby="basic-addon1" />

                      </div>
                      {errors.email && <span className='text-danger'>{errors.email.message}</span>}



                      <button className='bnt_submit w-100 mt-4'>Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

          </div>
          :
          <div className='All_AuthContant'>
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
                      <h2> Reset  Password</h2>
                      <p className='text-muted'>Please Enter Your Otp  or Check Your Inbox</p>
                    </div>
                    {/* /form/ */}
                    <form onSubmit={handleSubmit(onSubmitUpdate)}>
                      {/* /email/ */}
                      <div className="input-group mt-3">
                        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
                        <input {...register('email', EMAIL_VALIDTION)} type="mail" name='email' value={userEmail}
                          readOnly className="form-control input_height" placeholder="Enter your E-mail" aria-label="email" aria-describedby="basic-addon1" />
                      </div>
                      {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                      {/* /OTP/ */}
                      <div className="input-group mt-3">
                        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
                        <input {...register('seed', {
                          required: 'OTP is require',
                        })} type="text" name='seed' className="form-control input_height" placeholder="Enter your Code" aria-label="seed" aria-describedby="basic-addon1" />

                      </div>
                      {errors.seed && <span className='text-danger'>{errors.seed.message}</span>}
                      {/* //password// */}
                      <div className="input-group mt-3 position-relative all_pass ">
                        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
                        <input   {...register('password', PASSWORD_VALIDTION)} type={show ? "text" : "password"} name='password' className="form-control input_height bord_pass" placeholder="Password" aria-label="password" aria-describedby="basic-addon1" />
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
                      {/* //confirmPassword// */}
                      <div className="input-group mt-3 position-relative all_pass ">
                        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-key"></i></span>
                        <input
                          {...register('confirmPassword', {
                            required: 'confirmPassword is require',
                            validate: (val) => {
                              if (watch('password') !== val) {
                                return "Your passwords don't match"
                              }
                            }
                          })}
                          type={show ? "text" : "password"} name='confirmPassword' className="form-control input_height bord_pass" placeholder="Confirm New Password" aria-label="password" aria-describedby="basic-addon1" />
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
                      {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}

                      <button className='bnt_submit w-100 mt-4'>Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

          </div>}
      </>}



    </>


  )
}
