import { decodeToken } from 'react-jwt'
import '../css/user.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'

function Admin(){

    const [ user, setUser] = useState([])

    const token = localStorage.getItem('token')
    const decodedToken = decodeToken(token)

    const {
        register,
        handleSubmit
    } = useForm()

    const fetchUser = async () => {

       await axios.get(`http://localhost:8081/api/v1/user/${decodedToken.sub}`, 
                    {
                        headers: {
                               'Content-Type': 'Application/json',
                               Authorization: `Bearer ${token}` 
                        }
                    })
                    .then(res => {
                            
                        setUser(res.data)
                    })
                    .catch(error =>{
                        error?.response?.status !== 200 && toast.error('Une erreur de connexion est produite !')
                    })
    } 

        useEffect(() => {
            fetchUser()
        })            

    return(
        <div className='wrapper-admin'>
            <div className='title'>
                <h3>Welcome {user.username} !</h3>
            </div>  
            <div className='centent'>
                <form>
                <div className="form-contol row">
                    <label for="username" className="form-label">
                        Username
                    </label>
                    <input {...register('username')}
                           className="form-control" 
                           id="username"  
                           value={user.username}
                           disabled
                           />
                </div>
                <div className="form row">
                    <label for="username" className="form-label">
                        Email 
                    </label>
                    <input {...register('email')}
                           className="form-control" 
                           id="username"  
                           value={user.email}
                           disabled
                           />
                </div>
                <div className="form row">
                    <label for="username" className="form-label">
                        Created at:
                    </label>
                    <input {...register('created_at')}
                           className="form-control" 
                           id="username"  
                           value={user.created_at}
                           disabled
                           />
                </div>

                <div className="updateBtn">
                    
                    <input type="submit" className="btn btn-primary"/>
                </div>

                </form>
            </div >
        </div>
    )
}
export default Admin 