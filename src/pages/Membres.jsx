import '../css/membres.css'

import { useState, useEffect, React } from 'react'
import DataTable from 'react-data-table-component'        
import axios from 'axios'
import TableLoader from '../components/TableLoader'
import avatar from '../img/avatar.jpg'
import CompteDetails from '../components/compteDetail/CompteDetails'
import AddMembreForm from '../components/AddMembreForm'
import toast, { resolveValue } from 'react-hot-toast'
import { decodeToken } from "react-jwt";

function Membres() {    

    const [rows, setRows] = useState([])
    const [pending, setPending] = useState(true)
    const [search, setSearch] = useState(rows)
    const [stateFilter, setStateFilter] = useState(rows)
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
        const tokenD = localStorage.getItem("token")

        const decoded = decodeToken(tokenD)

        await axios.get(`http://localhost:8081/api/v1/user/${decoded.sub}`, config)
                    .then(res =>{
                        setRows(res.data.membreSet.sort((a, b) => b.id_membre - a.id_membre))  
                        setPending(false)
                    })
                    .catch((errors) => {
                        if(errors?.response?.status  === 403) {
                            toast.error("Pease log in again !")  
                      } 
                    })
      }     
      {/*--------Handling filtering search-------------*/}

      let filteredData = ""

      const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase())         
       }
       const handleStateFilterMenu = (e) => {
            setStateFilter(e.target.value.toLowerCase())
       }

        if(search !== ""){
            filteredData = rows.filter((users) => {
            return users.nom.toLowerCase().includes(search) || users.prenom.toLowerCase().includes(search) 
        })
        }
        if(stateFilter !== ""){
            filteredData = rows.filter((users) => {
            return users.statut.toLowerCase().includes(stateFilter)
            })
            }  


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
            width: "140px"
        },
        {            
            name: "Ajouté le",
            selector: row => row.dateInscription,
            sortable: true,
            width: "120px"
        },
        {            
            name: "Tel",
            selector: row => row.telephone,
            sortable: true,                                                                                                         
            width: "140px"
        },
        {            
            name: "Age",
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
        selectAllRowsItem: false,
        selectAllRowsItemText: 'Tous',
    }
    const customStyles = {

        tableWrapper: {
            style: {
                width: '70%',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '20px',
                left: '250px',
                backgroundColor: 'var(--sidebar-color)',
            },
        },  
        table: {
            style:{
                margin: '20px',
                marginLeft: '30px',
                fontSize: '16px',
                cursor: 'hand'
            }            
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
                cursor: 'pointer'
            },
            stripedStyle: {
                backgroundColor: 'var(--body-color)',
                color: 'var(--text-color)',
            },
        },
        pagination:{
            style: {
                backgroundColor: 'transparent',
                color: 'var(--text-color)',
                fontSize: '16px',
                marginRight: '10%',
                transition: 'var(--tran-03)'
            }    
        }
        
    }

    const conditionalRowStyles = [

        {
            when: row => row.statut === "Paid",
            style: {
                backgroundColor: 'rgba(63, 195, 128, 0.9)',
                color: 'white',
            },
        },
        
        {
            when: row => row.statut === "Unpaid",
            style: {
                backgroundColor: 'rgba(242, 38, 19, 0.9)',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        }
    ]
    const dataFinal = filteredData !== "" ? filteredData : rows
    
  return (
    <>

    {/*******Texte search input for fitrer**********/}
    <div className='search-container'>

          <div className="membreCounter-container"> 
          <p className='membreCounter-text'>{dataFinal.length} Membres</p>
          <br />
          </div>
          
          <div>
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input type='text' className='search-input' placeholder='Chercher par Nom' onChange={handleSearch} />
          </div>  

    </div>

    {/*-----------Table des Membres--------*/}
    

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
            <select className='sorting-list' onChange={handleStateFilterMenu}>   
                <option value='' selected>Tous</option>
                <option value='Paid'>Payés</option>
                <option value='Unpaid'>Impayés</option>
            </select>
       </div>
         
        <DataTable                   
                columns={columns} 
                data={dataFinal}
                progressPending={pending}
                progressComponent={<TableLoader />}
                customStyles={customStyles}                
                paginationComponentOptions={paginationComponentOptions}
                pagination

                responsive
                highlightOnHover
                onRowClicked={handleShow}
                conditionalRowStyles={conditionalRowStyles}
                Clicked
                />



    <AddMembreForm display={addForm} setDisplay={setAddForm} />

    <CompteDetails idmembre={idmembre} display={showCompte} setDisplay={setShowCompte} /></div> 
    </>
  )
}

export default Membres