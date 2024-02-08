import React from 'react'
import '/Users/abderahman/Developer/GymFront/GymFrontend/src/css/actionsContent.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'

function AddPayment(props) {
    const id = props.membreId
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const onSubmit = async (data) => {
        const jsonData = JSON.stringify(data)
        const token = localStorage.getItem("token")
        
        await axios.post(`http://localhost:8081/api/v1/membres/add_payment/${id}`,
                                 jsonData, 
                                 {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`,
                                    }
                                })
                .then(response => {
                    response.status === 200 && toast.success("Paiement validé!")
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000)
                })
                .catch(errors => {
                    errors.response.status === 400 && toast.error("Une erreur s'est produite!")
                })
    }

  return (
    <div className='actions-content'>        
            
    <form className='classForm' onSubmit={handleSubmit(onSubmit)}>                  
                                
                <div className='abtInput'>
                    <select
                     {...register("type_abonnement")}   
                     className='abtInput-text'>
                        <option selected>Basic + Tapis Roulant</option>
                        <option>Basic + Coach</option>
                        <option>Basic</option>
                    </select>
                </div>
                
                <div className='abtInput'>
                    <select 
                        {...register("type_paiement")} 
                        className='abtInput-text'>
                        <option selected>Mensuel</option>
                        <option>Par jour</option>
                        <option>Par 3mois</option>
                        <option>Par 6mois</option>
                        <option>Annuel</option>
                    </select>
                </div>
                <div className='abtInput'>
                    <input 
                        {...register("prix", {required: "Veuillez saisir le prix"})}
                        type='number' 
                        placeholder='Prix à payer' 
                        className='abtInput-text' />
                    {errors.prix && <p className='text text-danger mt-2'>{errors.prix.message}</p>}     
                </div>
                   
                <div className='abtInput'>             
                <input type='submit' 
                       className='btn btn-success' 
                       style={{width:"350px", marginTop:"20px"}} 
                       value="Valider paiments" />
                </div>
    </form>
                  
    </div>
  )
}

export default AddPayment