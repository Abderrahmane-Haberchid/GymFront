import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import "../css/login.css";
import { redirect } from 'react-router-dom';

function Register() {

    const {
        register,
        reset,
        handleSubmit
    } = useForm()

    const onSubmitRegister = (dataRegister) => {

        const resgiterData = JSON.stringify(dataRegister)
       // const signIn = useSignIn()

        axios.post("http://localhost:8081/api/v1/auth/register", 
                  resgiterData,
                  {headers: {'content-Type': 'application/json'}}
                  )
              .then(res => {
                if(res.status === 200){ 
                    
                    localStorage.setItem("token", res.data.token)

                    toast.success("Account created ! Welcome")
                }
                               
              })
              .catch(errors => {
                 toast.error("An error has occured, please try again later !")
              })
              
  }

  return (

    <div className="container" id="container">

   
    <div className="form-container sign-in">
    
    <form onSubmit={handleSubmit(onSubmitRegister)}>
        <h1>Create Account</h1>
        <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
        </div>
        <span>or use your email for registeration</span>
        <input type="text"
               {...register('name')} 
               placeholder="Gym Club Name" 
            />

        <input type="mail"
               {...register('email')}  
               placeholder="Email" 
            />

        <input type="password" 
               {...register('password')} 
               placeholder="Password" 
            />
        <button>Sign Up</button>
    </form>
    </div>
    </div>
  )
}

export default Register