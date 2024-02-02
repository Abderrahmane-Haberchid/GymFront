import React, { useEffect, useState } from 'react'
import 'C:/xampp/htdocs/gym_frontend/gym-dashboard/src/css/actionsContent.css';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import toast from 'react-hot-toast';

function ActionsContent(props) {

    const [membre, setMembre] = useState([])
    const [pending, setPending] = useState(true)

    const id = props.membreId

    const loadMembre = async () => {
        const token = localStorage.getItem("token")

        await axios.get(`http://localhost:8081/api/v1/membres/id/${id}`,
                        {
                        headers: {
                            "Content-Type": "Application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                        )
                    .then(res => {
                        setMembre(res.data)  
                        setPending(false)     
                    })
    }

    useEffect(() => {
        loadMembre()
    }, [])
    
        
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
      } = useForm()

      const onSubmit = async (data) => {
            const jsonData = JSON.stringify(data)
            const token = localStorage.getItem('token')
            
            await axios.put(`http://localhost:8081/api/v1/membres/edit/${id}`, 
                                jsonData, 
                                {
                                    headers: {
                                            'Content-Type': 'application/json',
                                             'Authorization': `Bearer ${token}`,   
                                        }
                                })       
                    .then(response => {
                        response.status === 202 && toast.success('Membre modifié!')                           
                    })
                    .catch(errors => {
                        errors.data && toast.error("Une erreur s'est produite."+ errors.response.status)
                    })
      }

  return (
    <div className='actions-content'>     
    
    <center>{ pending === true && <Spinner animation="grow" className='spiner' /> }</center>   

     { pending === false &&        
    <form className='classForm' onSubmit={handleSubmit(onSubmit)}>                  
                <div className='nomInput'>
                    <input type='text' 
                           {...register('nom', {required: "Veuillez saisir le nom"})} 
                           className='nomInput-text' 
                           {...setValue('nom', membre.nom)}
                           />
                    {errors.nom && <p className='text text-danger mt-2'>{errors.nom.message}</p>}       
                </div>
                <div className='prenomInput'>
                    <input type='text'
                           {...register('prenom', {required: "Veuillez saisir le prenom"})}
                           className='prenomInput-text' 
                           {...setValue('prenom', membre.prenom)}
                           />
                    {errors.prenom && <p className='text text-danger mt-2'>{errors.prenom.message}</p>}       
                </div>
                
                <div className='abtInput'>
                    <input type="mail" 
                            className='abtInput-text'
                            {...register('email', {required: "Veuillez saisir le nom"})}
                            {...setValue('email', membre.email)}
                            />
                     {errors.email && <p className='text text-danger mt-2'>{errors.email.message}</p>}       
                </div>
                <div className='adrInput'>
                    <input type='text'
                           {...register('adresse')} 
                           className='adrInput-text' 
                           {...setValue('adresse', membre.adresse)}
                           />
                </div>
                
                <div className='ageInput'>
                    <input type='number'
                           {...register('age')}
                           className='ageInput-text'
                           {...setValue('age', membre.age)}
                           />
                </div>
                <div className='telephoneInput'>
                    <input type='number' 
                           {...register('telephone')} 
                           className='ageInput-text'
                           {...setValue('telephone', membre.telephone)}
                            />   
                </div>
                <br />                
                <button className='btn btn-success'>Modifier</button>
    </form>
      }             
    </div>
  )
}

export default ActionsContent