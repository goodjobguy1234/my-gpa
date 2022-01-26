import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillXCircleFill} from "react-icons/bs";

function GradeListComponent({gradeSemesters, setItemGrade}) {
    const [cardLists, setCard] = useState([]);

    useEffect(() => {
        setCard(addCard(gradeSemesters))
    }, [gradeSemesters]);

    const addCard = (gradeSemesters) => {
        let cardList = [];
        Object.entries(gradeSemesters).forEach(entry => {
            const [key, value] = entry;
          
            if(value.course.length > 0){
                cardList.push(
                    (
                        <div className="container-fluid mx-0 px-0 pb-5 mb-4"
                            style={{backgroundColor: "white", borderBottomLeftRadius:"4px", borderBottomRightRadius:"4px"}}>
                            <div className="row mx-0 px-0 " style= {{backgroundColor: "red"}}>
                                <div className="col-10">
                                    <span>Semester {key}</span>
                                </div>
                                <div className="col" style={{textAlign: "left"}}>
                                    <span>GPA:</span>
                                    <span>{(value.totalScore/ value.totalCredit).toFixed(2)}</span>
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
    
        return courseList.map((course, index) => {
            let stringGrade = course.gpa
            if(stringGrade == 'W' || stringGrade == 'I' || stringGrade == 'S' || stringGrade == 'U' || stringGrade == 'R' || stringGrade == 'TR') {
                console.log("transform gpa string")
                stringGrade = '-'
            }
            return ( <tr>
                <td scope="row" colSpan="1" style={{textAlign: "center"}}><BsFillXCircleFill onClick={() => deleteClick(index, semesterKey)}/></td>
                
                <td scope="col" colSpan="2">{course.id}</td>
                <td scope="col" colSpan="3">{course.name}</td>
                <td scope="col" colSpan="1">
                   <h4 style={{color: "red", fontWeight: "bold"}}>{stringGrade}</h4>
                </td>
            </tr>)
        });
    };

    let stringToIntGrade = (stringGpa) => {
        switch(stringGpa) {
            case "A":
                return 4.00
            case "A-":
                return 3.75
            case "B+":
                return 3.25
            case "B":
                return 3.00
            case "B-":
                return 2.75
            case "C+":
                return 2.25
            case "C":
                return 2.00
            case "C-":
                return 1.75
            case "D":
                return 1.00
            case "F":
                return 0.00
            default:
                return 0.00
          }
      }

    const deleteClick = (courseIndex, semesterKey) => {
        let deletedCourse = (gradeSemesters[`${semesterKey}`].course)[courseIndex]
        
        gradeSemesters[`${semesterKey}`].course.splice(courseIndex, 1)
        if(gradeSemesters[`${semesterKey}`].course.length === 0) {
            gradeSemesters[`${semesterKey}`].totalCredit = 0
            gradeSemesters[`${semesterKey}`].totalScore = 0
        } else {
          
            gradeSemesters[`${semesterKey}`].totalCredit -= deletedCourse.credit
            gradeSemesters[`${semesterKey}`].totalScore -= (stringToIntGrade(deletedCourse.gpa) * deletedCourse.credit)
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

