import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery'
import { BsFillXCircleFill} from "react-icons/bs";

function GradeListComponent({gradeSemesters, setItemGrade}) {
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
            if(value.course.length > 0){
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
                                        {addItemInCard(value.course, key)}
                                    </tbody>
                            </table>
                    </div>
    
                </div>
                    )
                )
            }
          });

          return cardList;
         
    };

    const addItemInCard = (courseList, semesterKey) => {
        console.log('countFrom add Item In card')
        return courseList.map((course, index) => {
            return ( <tr>
                <td scope="row" colSpan="1" style={{textAlign: "center"}}><BsFillXCircleFill onClick={() => deleteClick(index, semesterKey)}/></td>
                
                <td scope="col" colSpan="2">{course.id}</td>
                <td scope="col" colSpan="3">{course.name}</td>
                <td scope="col" colSpan="1">
                   <h4 style={{color: "red", fontWeight: "bold"}}>{course.gpa}</h4>
                </td>
            </tr>)
        });
    };

    const deleteClick = (courseIndex, semesterKey) => {
        console.log(courseIndex)
        console.log(semesterKey)
        gradeSemesters[`${semesterKey}`].course.splice(courseIndex, 1)
        if(gradeSemesters[`${semesterKey}`].course.length === 0) {
            gradeSemesters[`${semesterKey}`].totalCredit = 0
            gradeSemesters[`${semesterKey}`].totalScore = 0
        }
        setItemGrade({...gradeSemesters})
    }
    
    return (
        <>
            {cardLists}
        </>
    );
}

export default GradeListComponent;

