import { useState, React, useEffect } from 'react'
import axios from 'axios'
import ProfileContent from './ProfileContent'
import ActionsContent from './ActionsContent'
import PaymentsContent from './PaymentsContent'
import AddPayment from './AddPayment'
import Offcanvas from 'react-bootstrap/Offcanvas'
import avatar from './avatar.jpg'
import { Link } from 'react-router-dom'

function CompteDetails(props) {

    const [membre, setMembre] = useState([])
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
      //const id = 3

      console.log(id)
      
      const token = localStorage.getItem("token")
      const loadMembre = async () => {
                
                await axios.get(`http://localhost:8081/api/v1/membres/id/${id}`, 
                            {
                                headers: {
                                    "Content-Type": "Application/json",
                                    "Authorization": `Bearer ${token}`,
                                }
                            }
                        )
                       .then(response => {
                            setMembre(response.data)
                       })
                       .catch(errors =>{
                            console.log(errors)
                       })
      }
      useEffect(() =>{
            loadMembre()
      },[id])

  return (

     <Offcanvas show={props.display} onHide={handleClose} placement='end' scroll="true" backdrop="true" className="offCanvas"> 
     <div className='compte-container'>
         <Offcanvas.Header closeButton>
           <Offcanvas.Title>Détail Compte</Offcanvas.Title>
         </Offcanvas.Header>
         
           
             <center>
             <div className='compte-container-header'>
              <img src={avatar} alt="" width="80" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
              <p>{membre.prenom} {membre.nom}</p>
             </div>  
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