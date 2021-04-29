import Chart from 'chart.js/dist/chart';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles({
    chart: {
        width  : 400,
        height : 400
    }
})




export default function CharHeroe(props){
    const classes = useStyles();

    //Dibujo el chart
    React.useEffect(async () => {
        const data = await axios.get('http://127.0.0.1:5000/api/perfil/' + props.name);
        const chico_data = data.data[0];
        const ctx = document.getElementById('chart_heroe').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chico_data.amigo_name,
                datasets: [{
                    label: 'Winrate con ' + props.name,
                    data: chico_data.amigo_winrate,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192,1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    
                }]
            },
            options:{
                scales: {
                    y : {
                        beingAtZero : true,
                        max: 100,
                        min: 0,
                    }
                }
            }
            
        })
    }, [])


    return(
        <>
        <div className={classes.chart}>
            <canvas id="chart_heroe" />
        </div>
        </>
    )
}

/*
<canvas id="myChart" width="400" height="400"></canvas>
<script>
var ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
</script>
*/