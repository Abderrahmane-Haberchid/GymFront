import React, { useEffect, useState } from 'react'
import '/Users/abderahman/Developer/GymFront/GymFrontend/src/css/compte.css';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

function ProfileContent(props) {
    const [membre, setMembre] = useState([])
    const [spiner, setSpiner] = useState(true)
    const id = props.membreId

    const fetchUser = async () => {
      const token = localStorage.getItem('token')

        await axios.get(`http://localhost:8081/api/v1/membres/id/${id}`,
                          {
                            headers: {
                              'Content-Type': 'Application/json',
                              'Authorization': `Bearer ${token}`,
                            }
                          }
                        )
        .then(res => {            
            setMembre(res.data)
            setSpiner(false)
        })
    }

    useEffect(() => {         
        fetchUser()
    }, [])

    //checking payment state
    const cssStatut = membre.statut === "Paid" ? "td-payment" : "td-payment-nok"
    
  return (
    <div className='profile-content'>
                    
                    <center>{ spiner === true && <Spinner animation="grow" className='spiner' /> }</center>
                      { spiner === false &&       
                        <table>
                                <tr>
                                  <td><b>Etat du compte</b></td>
                                  <td><p id={cssStatut}>{membre.statut}</p></td>
                                </tr>
                                <tr>
                                  <td><b>Date d'inscripton</b></td>
                                  <td>{membre.date_inscription}</td>
                                </tr>
                                <tr>
                                  <td><b>Dérniere MAJ</b></td>
                                  <td>{membre.date_update}</td>
                                </tr>
                                <tr>
                                    <td><b>E-mail</b></td>
                                    <td>{membre.email}</td>
                                </tr>
                                <tr>
                                    <td><b>Téléphone</b></td>
                                    <td>{membre.telephone}</td>
                                </tr>
                                <tr>
                                    <td><b>Adresse</b></td>
                                    <td>{membre.adresse}</td>
                                </tr>
                               
                                <tr>
                                    <td><b>Age</b></td>
                                    <td>{membre.age}ans</td>
                                </tr>
                               
                        </table>

                       }
                    
                    <br />
                        <div className='btn-profile'>
                        <button className='btn btn-secondary'>Désactiver</button>    
                        <button className='btn btn-danger'>Blacklister</button>    
                        </div>
                    
    </div>
  )
}

export default ProfileContent