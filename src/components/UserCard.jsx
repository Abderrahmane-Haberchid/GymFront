import '../css/usercard.css';
import '../css/compte.css';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import avatar from '../img/avatar.jpg'
import Loader from './Loader';
import axios from 'axios';
import toast from 'react-hot-toast';
import CompteDetails from './compteDetail/CompteDetails';
import { decodeToken } from "react-jwt";

function UserCard() {

    const [users, setUsers] = useState({})
    const [showCompte, setShowCompte] = useState(false)
    const [ pending, setPending ] = useState(true)
    const [idmembre, setIdMembre] = useState()

    const [search, setSearch] = useState('')

    const handleShow = (e) => {
      setShowCompte(true)
      setIdMembre(e.currentTarget.id)
    }

    const token = localStorage.getItem("token")

    const decoded = decodeToken(token)

    const [membreCount, setMembreCount] = useState(0)

      const dataLoader = async () => {

              await axios.get(`http://localhost:8081/api/v1/user/${decoded.sub}`,
                              {
                                headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                                }
                              }
                      )
                      .then(res => {

                          setMembreCount(res.data.membreSet.length)

                        setUsers(res.data.membreSet.sort((a, b) => b.id_membre - a.id_membre))
                        setPending(false)
                      })
                      .catch(errors => {
                        if(errors.response.status  === 403) {
                          toast.error("403 error !"+token)  
                         // redirect("/auth")
                        } 
                        else toast.error("An error has occured !")
                      })
      }
      useEffect(() => {
          dataLoader()
        
      }, [])
      const handleSearch = (e) => {
        setSearch(e.target.value)         
       }
    
  return (
    
    
    <>

    <div className='search-container'>

          <div>
          <h3>{membreCount} Membres</h3>
          <br />
          </div>
          
          <div>
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input type='text' className='search-input' placeholder='Chercher par Nom' onChange={handleSearch} />
          </div>  

    </div>
    <div className='usercard-list'>

    { pending === false &&
    users.filter((user) =>{
        return search.toLowerCase() === '' ? user : user.nom.toLowerCase().includes(search)
    })
    .map((user, index) =>  

    <Link to="/" id={user.id_membre}  key={index} className='usercard shadow' onClick={handleShow}>
                <ul className="list-iems-card">   
                <li>
                    <img src={avatar} alt="" width="70" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                    {user.statut === "Paid" && <i className='bx bx-checkbox-checked bx-md payment-state-ok' ></i>}
                    {user.statut === "Unpaid" && <i className="fa-solid fa-triangle-exclamation bx-sm payment-state-nok"></i>}
                    
                    {user.statut === "Bundled" && <i className="fa-solid fa-ban fa-lg payment-state-nok"></i>}
                </li>
                <li>
                    <p className="card-title">{user.nom}</p>
                </li>
                <li>
                    <span className="card-subtitle">{user.age}</span>
                </li>                                
                </ul>  
    </Link> 
    
    )}
</div>        


      <CompteDetails idmembre={idmembre} display={showCompte} setDisplay={setShowCompte} />

      { pending === true && (<Loader />) }
</>    
    
  )
}

export default UserCard