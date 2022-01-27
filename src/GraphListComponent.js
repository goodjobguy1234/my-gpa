// For showing graph only
import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Doughnut, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    ArcElement,
    Legend,
  } from 'chart.js';
import { each } from "jquery";

function GraphListComponent({totalGpa, eachGpa}) {
    //  need ** line chart for each grade and pie chart for gpac
    const [gradeGraphData, setGradeGraphData] = useState({
        labels: [],
        datasets: []
    });
    const [totalGrade, setTotalGradeData] = useState(0.00);
    const [pieGraphData, setPieGraph] = useState(
        {
            labels: ['GPAC', 'Total GPAC'],
            datasets: [
                {
                label: '# of GPAC',
                data: [0.00, 4.00],
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 0,
                },
            ]
        }
    )

    useEffect(() => {
  
    setTotalGradeData(totalGpa)
    setGradeGraphData({...eachGpa})

    const data =
    {
        labels: ['GPAC', 'Total GPAC'],
        datasets: [
            {
            label: '# of Votes',
            data: [totalGpa, 4.00],
            backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 0,
            },
        ]
    }

    setPieGraph(data)

    }, [eachGpa])

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        ArcElement
      );

    const lineGraphOptions = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: 4
            }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'GPA Progress Chart',
          },
        },
      };

    return (
        <Container style={{backgroundColor: "white", borderTopLeftRadius:"8px", borderBottomLeftRadius:"8px", borderTopRightRadius: "8px", borderBottomRightRadius:"8px", padding: "50px"}}>
            <Row >
                <Col>
                    <Line options={lineGraphOptions} data={gradeGraphData} />;
                </Col>
                <Col style={{textAlign: "center", alignItems:"center", alignContent: "center"}}>
                    <Row style={{height:"80%", width:"80%" }}>
                        <Doughnut data={pieGraphData} options={{responsive: true , maintainAspectRatio: false,}}/>;
                    </Row>
                    <Row>
                        <h1 style={{color: "red", border: "2px"}}>
                            GPAC :  {(totalGrade) ?? (0).toFixed(2)}
                        </h1>
                    </Row>
                </Col>
            </Row>
            
        </Container>
    );
}

export default GraphListComponent;