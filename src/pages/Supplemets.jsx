import '../css/supplements.css'
import protein from '../img/protein.png'
import vitamine from '../img/vitamine.png'
import React, { useState } from 'react'
import AddSale from '/Users/abderahman/Developer/GymFront/GymFrontend/src/components/suppComponents/AddSale.jsx';
import AddProduct from '/Users/abderahman/Developer/GymFront/GymFrontend/src/components/suppComponents/AddProduct.jsx';
import DataTable from 'react-data-table-component';

function Supplements() {

  const [showAddSaleForm, setShowAddSaleForm] = useState(false)
  const [showAddProductForm, setShowAddProductForm] = useState(false)

  const handleAddSale = () => {
      setShowAddSaleForm(true)
  }
  const handleAddProduct = () => {
    setShowAddProductForm(true)
}

  const handleClick = () => {
    console.log("div clicked")
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
    <div className='container'>

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
        <h5>Gainer</h5>
        <h5>20</h5>
        </div>
      </div>
      <div className='vitamine'>
      <div>
          <img src={vitamine} className='prot' />
        </div>
        <div>
        <h5>Vitamine</h5>
          <h5>20</h5>
        </div>
      </div>
      <div className='creatine'>
      <div>
          <img src={protein} className='prot' />
        </div>
        <div>
        <h5>Créatine</h5>
        <h5>20</h5>
        </div>
      </div>

    </div>  

    <AddSale display={showAddSaleForm} setDisplay={setShowAddSaleForm} />
    <AddProduct display={showAddProductForm} setDisplay={setShowAddProductForm} />

       
     

    </div>

    
  )
  
}


export default Supplements