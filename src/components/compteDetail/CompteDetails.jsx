import { useState, React, useEffect } from 'react'
import axios from 'axios'
import ProfileContent from './ProfileContent'
import ActionsContent from './ActionsContent'
import PaymentsContent from './PaymentsContent'
import AddPayment from './AddPayment'
import Offcanvas from 'react-bootstrap/Offcanvas'
import avatar from './avatar.jpg'
import { Link } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import toast from 'react-hot-toast'
import { ProgressBar } from 'react-bootstrap'
import Membre from './Membre'

function CompteDetails(props) {
    const [progress, setProgress] = useState({started: false, pc: 0})
    
    //const [membre, setMembre] = useState([])
    const [image, setImage] = useState(null)
    

    {/*-----------Account section----------*/}

    const [showProfile, setShowProfile] = useState(true);
    const [showActions, setShowActions] = useState(false);
    const [showPayments, setShowPayments] = useState(false);
    const [addPayment, setAddPayment] = useState(false);
    
    const handleClose = () => {
        props.setDisplay(false)
    }       
    
    
    const changeProfile = () => {
      setShowProfile(true)
      setShowActions(false)
      setShowPayments(false)  
      setAddPayment(false)  
    }
    const changeActions = () => {
        setShowProfile(false)
        setShowActions(true)
        setShowPayments(false)  
        setAddPayment(false)  
    }
    const changePayments = () => {
        setShowProfile(false)
        setShowActions(false)
        setShowPayments(true)  
        setAddPayment(false)  
      }
      const changeAddPayments = () => {
        setAddPayment(true)  
        setShowProfile(false)
        setShowActions(false)
        setShowPayments(false)  
      }
      
      const id = props.idmembre === "" ? "" : props.idmembre
      const token = localStorage.getItem("token")

     

      const handleUpload = async () => {

        const formData = new FormData()
        formData.append("file", image)

            await axios.post(`http://localhost:8081/api/v1/membres/upload/${id}`, formData, 
            {
                onUploadProgress: (eventProgress) => setProgress((prevState) => {
                    return {...prevState, pc: eventProgress.progress*100}
                }),
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            }
            ).then(res => {
                toast.success("Image chargé !")
            })
            .catch(errors => {
                toast.error(errors?.response?.status)
            })
      }

  return (

     <Offcanvas show={props.display} onHide={handleClose} placement='end' scroll="true" backdrop="true" className="offCanvas">
        
     <div className='compte-container'>
     <ProgressBar now={progress} label={progress.pc} />
         <Offcanvas.Header closeButton>
           <Offcanvas.Title>Détail Compte</Offcanvas.Title>
         </Offcanvas.Header>
         
           
             <center>
             <div className='compte-container-header'>
              <img src={image !== null ? URL.createObjectURL(image) : avatar} 
                    style={{width:"100px", height:"100px", backgroundImage:"cover"}} 
                    className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />

              <Membre membreId = {props.idmembre} />
             </div>  

             <Dropzone onDrop={acceptedFiles => {
                setImage(acceptedFiles[0]);
                handleUpload();
                }    
                }>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()} onDrop={handleUpload}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        </section>
                    )}
             </Dropzone>

             

             </center>  
             <div className='compte-container-body-btn'>
                 <Link to=""
                     className="profile-btn"
                     onClick={changeProfile}
                     >Profile
                 </Link>
                 <Link to="" 
                     className="actions-btn"
                     onClick={changeActions}
                     >Update
                 </Link>
                 <Link to=""
                     className="payments-btn"
                     onClick={changeAddPayments}
                     >Paiments
                 </Link>
                 <Link to=""
                     className="payments-btn"
                     onClick={changePayments}
                     >Historique
                 </Link>
                 
                
             </div>
             <hr />
             <div className='compte-container-body'>
               { showProfile === true && <ProfileContent membreId = {props.idmembre} /> }
               { showActions === true && <ActionsContent membreId = {props.idmembre} /> }
               { showPayments === true && <PaymentsContent membreId = {props.idmembre} /> }
               { addPayment === true && <AddPayment membreId = {props.idmembre} /> }
            </div>  
 
           </div>
       </Offcanvas>
        
  )
}

export default CompteDetails