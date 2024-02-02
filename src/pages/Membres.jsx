import '../css/membres.css'

import { useState, useEffect, React } from 'react'
import DataTable from 'react-data-table-component'        
import axios from 'axios'
import TableLoader from '../components/TableLoader'
import avatar from '../img/avatar.jpg'
import CompteDetails from '../components/compteDetail/CompteDetails'
import AddMembreForm from '../components/AddMembreForm'
import { redirect } from 'react-router-dom'
import toast, { resolveValue } from 'react-hot-toast'

function Membres() {    

    const [rows, setRows] = useState([])
    const [payments, setPayments] = useState([])
    const [pending, setPending] = useState(true)
    const [search, setSearch] = useState(rows)

    // Display Compte Details
    const [idmembre, setIdMembre] = useState()
    const [showCompte, setShowCompte] = useState(false)

    const handleShow = (filteredData) => {
        setIdMembre(filteredData.id_membre)
        setShowCompte(true)
    }     

    

    {/*--------Affichage des Membres dans table-------------*/}

    const fetchdata = async () =>{

        const token = localStorage.getItem("token")

        const config = {
            headers:{
                'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`,
            }
        }
        await axios.get(`http://localhost:8081/api/v1/membres/all`, config)
                    .then(res =>{
                        
                        const result = res.data
                        setRows(result.sort((a, b) => b.id_membre - a.id_membre))  
                        setPayments(result.paymentsSet) 
                        setPending(false)
                    })
                    .catch((errors) => {
                        if(errors.response.status  === 403) {
                            toast.error("Pease log in again !")  
                            //redirect("/auth")
                      } 
                    })
      }     
      {/*--------Handling filtering search-------------*/}
      const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase())         
       }
      const filteredData = search === '' ? rows : rows.filter((users) => {
            return users.nom.toLowerCase().includes(search)
        })

    useEffect(() => {           
       fetchdata()  
    }, [])

    
    {/*----------displaying add Form ------------*/}  

      const [addForm, setAddForm] = useState(false)
      const handleAddForm = () => setAddForm(true)
    

    {/*----------Datatable Property-------------*/}
    const columns = [
        
        {
            name: "",
            selector: row => <img src={avatar} alt="profile" width="35" height="35" className="img-fluid rounded-circle img-thumbnail shadow-sm" />,    
            sortable: true,
            width: "80px"
        },
        {            
            name: "Nom",
            selector: row => row.nom,
            sortable: true,
            width: "120px"
        },
        {
            name: "Prénom",
            selector: row => row.prenom,
            sortable: true,
            width: "120px"
        },
        {            
            name: "Ajouté le",
            selector: row => row.date_inscription,
            sortable: true,
            width: "120px"
        },
        {            
            name: "Date d'éxpriation",
            selector: row => row.paiementsSet.date_expiration,
            sortable: true,                                                                                                         
            width: "170px"
        },
        {            
            name: "Prix",
            selector: row => row.age,
            sortable: true,
            width: "100px"
        },
        {            
            name: "Statut",
            selector: row => row.statut,
            sortable: true,
            width: "100px"
        },
        {            
            name: "Etat",
            selector: row => row.state,
            sortable: true,
            width: "100px"
        }
        
    ]

    const paginationComponentOptions = {
        rowsPerPageText: 'Ligne par page',
        rangeSeparatorText: 'sur',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Tous',
    }
    const customStyles = {
        table: {
            style:{
                position: 'relative',
                backgroundColor: 'var(--sidebar-color)',
                marginTop: '50px',
                marginLeft: '30px',
                width: '100%',
                fontSize: '16px', 
                position: 'relative'
            }            
        },
        tableWrapper: {
            style: {
                width: '100%',
            },
        },    
        responsiveWrapper: {
            style: {
            },
        },
        headRow: {
            style: {
                height: '40px',
                backgroundColor: 'var(--sidebar-color)',
                color: 'var(--text-color)',
                fontSize: '13px',
                transition: 'var(--tran-03)'
            }
        },
        rows: {
            style: {
                height: '40px',
                backgroundColor: 'var(--sidebar-color)',
                color: 'var(--text-color)',
                fontSize: '12px',
                transition: 'var(--tran-03)',
            },
            stripedStyle: {
                backgroundColor: 'var(--body-color)',
                color: 'var(--text-color)',
            },
        },
        pagination:{
            style: {
                backgroundColor: 'var(--sidebar-color)',
                color: 'var(--text-color)',
                transition: 'var(--tran-03)'
            }    
        }
        
    }
    
  return (
    <>

    {/*******Texte search input for fitrer**********/}
    <div className='search-container'>
          <div>
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
            <input type='text' className='search-input' placeholder='Chercher par Nom' onChange={handleSearch} />
          </div>  
    </div>

    {/*-----------Table des Membres--------*/}
    <div className='container'>

    {/*******Bouton d'ajout d'un nouveau Membre**********/}
      <div className='table-header'> 
       <div className='add-btn'>
            <button className='btn btn-success' onClick={handleAddForm}>
                <i class="fa-solid fa-plus md-3 fa-sm"></i>  Ajouter Membre
            </button>
       </div>

    {/*******Liste de filtrage Payé/Impayé**********/}       
       <div className='sorting-option'>
            <span>Trier par</span>
            <select className='sorting-list'>   
                <option name='tous' selected>Tous</option>
                <option name='payés'>Payés</option>
                <option name='impayés'>Impayés</option>
                <option name='inactif'>Désactivés</option>
                <option name='blacklist'>Blacklisté</option>
            </select>
       </div>
       </div>   
        <DataTable                   
                columns={columns} 
                data={filteredData}
                progressPending={pending}
                progressComponent={<TableLoader />}
                customStyles={customStyles}                
                paginationComponentOptions={paginationComponentOptions}
                pagination
                responsive
                highlightOnHover
                onRowClicked={handleShow}
                Clicked
                />

    </div>

    <AddMembreForm display={addForm} setDisplay={setAddForm} />

    <CompteDetails idmembre={idmembre} display={showCompte} setDisplay={setShowCompte} />
    </>
  )
}

export default Membres