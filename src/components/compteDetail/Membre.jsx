import { useState, React, useEffect } from 'react'
import axios from 'axios'

function Membre(props) {

    const [membre, setMembre] = useState([])

    const id = props.membreId === "" ? "" : props.membreId

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
                            toast.errors(errors.response.status)
                       })
      }
      useEffect(() =>{
            loadMembre()
      },[id])


  return (
    <>
        <p>{membre.prenom} {membre.nom}</p>
    </>
  )
}

export default Membre