import '../css/supplements.css'
import protein from '../img/protein.png'
import vitamine from '../img/vitamine.png'
import React, { useEffect, useState } from 'react'
import AddSale from '../components/AddSale';
import AddProduct from '../components/AddProduct';
import { decodeToken } from 'react-jwt';
import toast from 'react-hot-toast';
import TableLoader from '../components/TableLoader'
import DataTable from 'react-data-table-component'        
import axios from 'axios'

function Supplements() {

  const [showAddSaleForm, setShowAddSaleForm] = useState(false)
  const [showAddProductForm, setShowAddProductForm] = useState(false)
  const [supps, setSupps] = useState([])
  const [pending, setPending] = useState(true)

  const handleAddSale = () => {
      setShowAddSaleForm(true)
  }
  const handleAddProduct = () => {
    setShowAddProductForm(true)
}

  const handleClick = () => {
    console.log("div clicked")
  }

  const token = localStorage.getItem("token")
  const decodedToken = decodeToken(token)

  const fetchSupp = async () => {
      await axios.get(`http://localhost:8081/api/v1/user/${decodedToken.sub}`, 
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            }
          }
        ).then(res => {
            setSupps(res.data.suppSet.sort((a,b) => b.id - a.id))
            
            setPending(false)
        })
        .catch(errors => {
            toast.error("Une erreur s'est produite")
        })
  }

  useEffect(() =>{
    fetchSupp()
  }, [])

  {/*----------Datatable Property-------------*/}
  const columns = [
        
    {
        name: "Nom",
        selector: row => row.nom,    
        sortable: true,
        width: "80px"
    },
    {            
        name: "Marque",
        selector: row => row.marque,
        sortable: true,
        width: "120px"
    },
    {
        name: "Type",
        selector: row => row.type,
        sortable: true,
        width: "120px"
    },
    {            
        name: "Prix Achat",
        selector: row => row.prix_achat,
        sortable: true,
        width: "120px"
    },
    {            
        name: "Prix Vente",
        selector: row => row.prix_vente,
        sortable: true,                                                                                                         
        width: "170px"
    },
    {            
        name: "Qte",
        selector: row => row.quantity,
        sortable: true,
        width: "100px"
    },
    {            
        name: "Ajouté le",
        selector: row => row.date_ajout,
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

    tableWrapper: {
        style: {
            width: '8ß0%',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: '20px',
            left: '0px',
            backgroundColor: 'var(--sidebar-color)',
        },
    },  
    table: {
        style:{
            margin: '20px',
            marginLeft: '30px',
            fontSize: '16px'
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

  return (
    <div className='wrapper'>

    <div className='sale-div'>
            <button className='btn btn-outline-success' onClick={handleAddSale}>
                <i class="fa-solid fa-plus md-3 fa-sm"></i>  Valider Vente
            </button>
            <button className='btn btn-outline-primary' onClick={handleAddProduct}>
                <i class="fa-solid fa-plus md-3 fa-sm"></i>  Ajouter Produit
            </button>
       </div>
    <div className='container-items'>

      <div className='protein' onClick={handleClick}>
        <div>
          <img src={protein} className='prot' />
        </div>
        <div>
          <h6>Protéines</h6>
          <h6>20</h6>
        </div>
        
      </div>
      <div className='gainer'>
      <div>
          <img src={protein} className='prot' />
        </div>
        <div>
        <h6>Gainer</h6>
        <h6>20</h6>
        </div>
      </div>
      <div className='vitamine'>
      <div>
          <img src={vitamine} className='prot' />
        </div>
        <div>
        <h6>Vitamine</h6>
          <h6>20</h6>
        </div>
      </div>
      <div className='creatine'>
      <div>
          <img src={protein} className='prot' />
        </div>
        <div>
        <h6>Créatine</h6>
        <h5>20</h5>
        </div>
      </div>

      <DataTable                   
                columns={columns} 
                data={supps}
                progressPending={pending}
                progressComponent={<TableLoader />}
                customStyles={customStyles}                
                paginationComponentOptions={paginationComponentOptions}
                pagination
                responsive
                highlightOnHover
                Clicked
                />

    </div>  
    <AddSale display={showAddSaleForm} setDisplay={setShowAddSaleForm} />
    <AddProduct display={showAddProductForm} setDisplay={setShowAddProductForm} />

       
     

    </div>

    
  )
  
}


export default Supplements