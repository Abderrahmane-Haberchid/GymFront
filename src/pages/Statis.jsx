import React, { useEffect, useState } from 'react'
import '../css/statis.css'
import { Chart as Chartjs, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, LineElement,
    PointElement } from 'chart.js'
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';
import DataTable from 'react-data-table-component';
import { decodeToken } from 'react-jwt';
import LoaderTablePayments from '../components/LoaderTablePayments'
import axios from 'axios'


Chartjs.register( 
    BarElement,
    CategoryScale,  
    LinearScale, 
    Tooltip, 
    Legend,
    ArcElement,
    LineElement,
    PointElement
)

function Statis() {

    const [payments, setPayments] = useState([])
    const [pending, setPending] = useState(true)

    const today = new Date()
    console.log(today.getMonth()+1)

    // All chart data are here
    
    const data1 = {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        datasets:[{
            label: 'Etat des souscriptions',
            data: [5, 46, 59, 10, 54, 44, 67, 4, 88, 2, 102, 87],
            borderColor: 'black',
            backgroundColor: ['#2193b0'],
            borderWidth: 1,
            
        }]
    }
    const options = {
        responsive: true,
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false
          },
        }
           
}
    const data2 = {
        labels: ['Payés', 'Impayés'],
        datasets:[{
            label: 'nombre: ',
            data: [89, 30],
            borderColor: 'black',
            backgroundColor: ['#2193b0', 'rgba(255, 0, 0, 0.8)'],
            borderWidth: 1,
            
        }
    ]
    }
   

    const data4 = {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        datasets:[{
            label: 'Nouvelles Inscriptions en DH',
            data: [12000, 3000, 5900, 1900, 5400, 4400, 6700, 4000, 8800, 2000, 1020, 8700],
            borderColor: 'black',
            backgroundColor: ['#2193b0'],
            borderWidth: 1,
            pointStyle: 'circle',
            pointRadius: 8,
            pointHoverRadius: 12
            
        },
        {
            label: 'Vente Suppléments en DH',
            data: [2000, 1500, 1000, 2500, 2200, 1100, 1800, 3400, 4200, 1350, 3330, 2300],
            borderColor: 'black',
            backgroundColor: ['#753a88'],
            borderWidth: 1,
            pointStyle: 'circle',
            pointRadius: 8,
            pointHoverRadius: 12
            
        }
    ]

    }

    const data6 = {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        datasets:[{
            label: 'Total Gains en DH',
            data: [12000, 3000, 5900, 1900, 5400, 4400, 6700, 4000, 8800, 2000, 1020, 8700],
            borderColor: 'black',
            backgroundColor: ['#2193b0'],
            borderWidth: 1,
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15
            
        }]
    }
    // ======= End of Data chart ==========

    // Fetching payments from DB

    const token = localStorage.getItem("token")

    const decodedToken = decodeToken(token)

    const fetchPayments = async () => {
            await axios.get(`http://localhost:8081/api/v1/user/${decodedToken.sub}`, 
                   { 
                    headers: {
                        "Content-Type": "Application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                        setPayments(res.data.paiementsSet.sort((a,b) => b.id - a.id))
                        setPending(false)
                })
    }

    useEffect(() =>{
        fetchPayments()
    }, [])
   
        let total = 0
        payments.map((value) => {
            total += value.prix
        })
    
      console.log(total);

    // Payments history table's column

    const columns = [
        {
            name: "Prix",
            selector: row => row.prix + " DH",
            sortable: true,
            width: "90px"
        },
        {            
            name: "Date",
            selector: row => row.date_paiement,
            sortable: true,
        },
        {
            name: "Expiration",
            selector: row => row.date_expiration,
            sortable: true
        }
        
    ]

    // Styling data table

    const customStyles = {
        tableWrapper:{
            style:{
                
            }
        },
        table: {
            style:{
                backgroundColor: 'var(--sidebar-color)',
                scrollbarColor: "var(--primary-dark-color)"
            }            
        },
        responsiveWrapper: {
            style: {},
        },
        headRow: {
            style: {
                backgroundColor: 'var(--sidebar-color)',
                color: 'var(--text-color)',
                fontWeight: 'bold',
                fontSize: '12px',
                transition: 'var(--tran-03)'
            }
        },
        rows: {
            style: {
                backgroundColor: 'var(--sidebar-color)',
                color: 'var(--text-color)',
                fontSize: '11px',
                transition: 'var(--tran-03)'
            }
        },
        
        
    }

  return (
    
    <div class="statis-container">
    <div className='header-container'>
        <div className='membre-card'>
        <i class="fa-solid fa-user fa-2xl"></i>
            <h3><b>150</b></h3>
            
            Membres au total
        </div>
        <div className='ajoutecemois-card'> 
        <i class="fa-solid fa-circle-plus fa-2xl"></i>
            <h3><b>150</b></h3>
            Ajoutés ce Mois
        </div>
        <div className='payment-card'> 
        <i class="fa-solid fa-sack-dollar fa-2xl"></i>
            <h3><b>150</b></h3>
            Payments ce Mois
        </div>
        <div className='desactive-card'>
        <i class="fa-solid fa-trash-can fa-2xl"></i>
            <h3><b>150</b></h3> 
            Membres Désactivés
        </div>

    </div>


<div className='body-container'>  

        <div className='money-monthly'>  
          <p>Situation Financiére:</p>
            <Line data={data4} options={options} width={680} height={400} className='chart1' />
        </div>

        
        <div className='payments-history'>
        <p id='payments-history-p'>Historique Paiments ({payments.length })</p> 
        <div className='history-wrapper'>
        <p id='totalPayment'>Total: {total} DH </p>
        
            <form>
            <select name='sel' className='form-select' defaultValue={"Mois"}>
                <options selected>Mois</options>
                <options value="Janvier">Janvier</options>
                <options value="Fevrier">Fevrier</options>
            </select>
            </form>
            
            </div>    
        <DataTable
         fixedHeader    
         columns={columns} 
         data={payments}
         progressPending={pending}
         progressComponent={<LoaderTablePayments />}
         fixedHeaderScrollHeight="400px"   
         className='datatable'
         highlightOnHover
         customStyles={customStyles} 
        />
        </div>

        <div className='added-member-monthly'> 
        <p>Etat des nouvelles Inscriptions:</p> 
            <Bar data={data1} options={options} height={400} width={300} />
        </div>

        <div className='added-payments-monthly'>
        <p>Etat des paiments:</p>
            <Pie data={data2} options={options} />
        </div>

        <div className='total-money-monthly'>
        <p>Situation Financiére Globale:</p>
            <Line data={data6} options={options} height={400} width={300} className='chart2' />
        </div>
    </div>
    </div>
  
  )
}

export default Statis