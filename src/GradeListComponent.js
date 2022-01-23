import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery'

function GradeListComponent({gradeSemesters}) {
    const [cardLists, setCard] = useState([]);

    useEffect(() => {
        console.log('call from gradelist')
        console.log(gradeSemesters)
        setCard(addCard(gradeSemesters))
    
    }, [gradeSemesters]);

    const addCard = (gradeSemesters) => {
        let cardList = [];
        Object.entries(gradeSemesters).forEach(entry => {
            const [key, value] = entry;
            console.log(key, value);
            cardList.push(
                (
                    <div className="container-fluid mx-0 px-0 pb-5 mb-4"
                        style={{backgroundColor: "white", borderBottomLeftRadius:"4px", borderBottomRightRadius:"4px"}}>
                        <div className="row mx-0 px-0 " style= {{backgroundColor: "red"}}>
                            <div className="col-10">
                                <p1>Semester {key}</p1>
                            </div>
                            <div className="col" style={{textAlign: "left"}}>
                                <p1>GPA:</p1>
                                <p1>{(value.totalScore/ value.totalCredit).toFixed(2)}</p1>
                            </div>

                        </div>

                        <div className="row mx-0 px-0">
                            <table className="table table-sm  mx-0 my-0 px-0 py-0 my-info">
                                <thead>
                                    <tr>
                                        <th scope="col" colSpan="1"></th>
                                        <th scope="col" colSpan="2">Course ID</th>
                                        <th scope="col" colSpan="3">Course Name</th>
                                        <th scope="col" colSpan="1">Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {addItemInCard(value.course)}
                                </tbody>
                        </table>
                </div>

            </div>
                )
            )
          });

          return cardList;
         
    };

    const addItemInCard = (courseList) => {
        console.log('countFrom add Item In card')
        return courseList.map(course => {
            return ( <tr>
                <td scope="row" colSpan="1"></td>
                
                <td scope="col" colSpan="2">{course.id}</td>
                <td scope="col" colSpan="3">{course.name}</td>
                <td scope="col" colSpan="1">
                   <h4 style={{color: "red", fontWeight: "bold"}}>{course.gpa}</h4>
                </td>
            </tr>)
        });
    };
    
    return (
        <>
            {cardLists}
        </>
    );
}

export default GradeListComponent;

