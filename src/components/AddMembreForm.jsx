
import { React } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import { decodeToken } from "react-jwt";

function AddMembreForm(props) {

    const {
        register,
        handleSubmit,
        reset,
        formState: {isLoading, errors}
      } = useForm()

     // Submit add Membre Form
     const onSubmit = async (data) => {            

        const token = localStorage.getItem("token")
        const jsonData = JSON.stringify(data)

        const decoded = decodeToken(token)
        
        await axios.post(`http://localhost:8081/api/v1/membres/save/${decoded.sub}`,
                         jsonData, 
                         {
                            headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`
                            }  
                        }
                        ) 

                    .then(response =>{
                        response?.status === 201 && toast.success('Membre ajouté')
                        reset()                        
                    })  
                    .catch(errors => {
                        errors?.response?.status === 302 && toast.error("Adresse mail déjà existante !")
                        errors?.response?.status != 302 && toast.error("Une erreur générée !")
                    })
     }

     const closeForm = () =>{
        props.setDisplay(false)
     }

  return (
   
     <Offcanvas show={props.display} onHide={closeForm} placement='top' scroll="true" backdrop="true" className="offCanvas"> 
     <div className='compte-container'>
         <Offcanvas.Header closeButton>
           <Offcanvas.Title>Créer un Membre</Offcanvas.Title>
         </Offcanvas.Header>
        <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
             <div className='photo-div mb-3'>
             <label className='form-label' htmlFor="profile-photo">
                 Photo de profile
             </label>
             <input type='file' name="profile-photo" className='' />
             </div>
            <div className='row mb-3'>
             <div className='col'> 
                    <label for="lname" className='form-label'>
                        Nom:
                    </label>
                    <input type='text'
                            {...register('nom', {required: "Veuillez saisir le nom"})}
                            className='form-control' 
                            placeholder="Veuillez écrire le nom..." />
                    {errors.nom && <p className='text text-danger mt-2'>{errors.nom.message}</p>}        
             </div>
             <div className='col'>       
                    <label for="fname" className='form-label'>
                        Prénom: 
                    </label>
                    
                    <input type='text' 
                            {...register('prenom', {required: "Veuillez saisir le prenom"})} 
                            className='form-control' 
                            placeholder="Veuillez écrire le prénom..." />
                    {errors.prenom && <p className='text text-danger mt-2'>{errors.prenom.message}</p>}         
             </div>
             </div> 
             <div className='email-div mb-3'>
                    <label for="email" className='form-label'>
                        E-mail: 
                    </label>
                    <input type='mail' 
                            {...register('email', {required: "Veuillez saisir une adresse mail"})}
                            className='form-control' 
                            placeholder="Adresse email..." />
                    {errors.email && <p className='text text-danger mt-2'>{errors.email.message}</p>}         
             </div>
             <div className='row mb-3'>
                <div className='col'>
                    <label for="telephone" className='form-label'>
                        Téléphone
                    </label>
                    <input type='number' 
                            {...register('telephone')}
                            className='form-control' 
                            placeholder="Téléphone..." />
                </div>            
                <div className='col'>
             
                    <label for="age" className='form-label'>
                        Téléphone
                    </label>
                    <input type='number' 
                            {...register('age')}
                            className='form-control' 
                            placeholder="age..." />
                </div>            
             </div>
             <div className='adresse-div mb-4'>
                    <label for="adresse" className='form-label'>
                        Adresse: 
                    </label>
                    <input type='text' 
                            {...register('adresse')}
                            className='form-control' 
                            placeholder="Adresse postale..." />
             </div>
 
             <div className='submit-btn mb-4'>
                 <button 
                     className='btn btn-success'
                     disabled={isLoading}>
                     Valider</button>
             </div>
        </form> 
        </div>       
           
     </div>        
     </Offcanvas>
  )
}

export default AddMembreForm