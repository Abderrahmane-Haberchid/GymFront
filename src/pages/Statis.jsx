import React from 'react'
import '../css/statis.css'
import { Chart as Chartjs, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, LineElement,
    PointElement } from 'chart.js'
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';


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
    const data3 = {
        labels: ['Actifs', 'Désactivés', 'Blacklistés'],
        datasets:[{
            label: 'nombre: ',
            data: [89, 15, 12],
            borderColor: 'black',
            backgroundColor: ['#2193b0', 'rgba(255, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.7)'],
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
            pointRadius: 4,
            pointHoverRadius: 8
            
        },
        {
            label: 'Vente Suppléments en DH',
            data: [2000, 1500, 1000, 2500, 2200, 1100, 1800, 3400, 4200, 1350, 3330, 2300],
            borderColor: 'black',
            backgroundColor: ['#753a88'],
            borderWidth: 1,
            pointStyle: 'circle',
            pointRadius: 4,
            pointHoverRadius: 8
            
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
            <Line data={data4} options={options} width={680} height={320} className='chart1' />
        </div>

        <div className='total-money-monthly'>
        <p>Situation Financiére Globale:</p>
            <Line data={data6} options={options} className='chart2' />
        </div>

        <div className='added-member-monthly'> 
        <p>Etat des nouvelles Inscriptions:</p> 
            <Bar data={data1} options={options} />
        </div>

        <div className='added-payments-monthly'>
        <p>Etat des paiments:</p>
            <Pie data={data2} options={options} />
        </div>

        <div className='general-view'>
        <p>Statuts général:</p>
            <Doughnut data={data3} options={options} />
        </div> 
    </div>
    </div>
  
  )
}

export default Statis