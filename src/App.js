import "./App.css";
import React from 'react';
import { useState, useRef, useEffect } from "react";
import GradeListComponent from './GradeListComponent';
import GraphListComponent from './GraphListComponent';
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery'

import { Container, Row, Col, Form, Button } from "react-bootstrap";

import useLocalStorage from 'react-localstorage-hook'

function App() {
  let csSubjectsData = [];
//   let tempItemGrade = {};
//   const [itemGrade, setItemGrade] = useState({});
const [itemGrade, setItemGrade] = useLocalStorage("itemGrade",{});

  let calculateGpax = (subjectItems) => {
    let totalScore = 0
    let totalCredit= 0
    subjectItems.forEach((course) => {

        totalScore += (stringToIntGrade(course.gpa) * course.credit)
        totalCredit += course.credit
    })
    return {
        totalCredit: totalCredit,
        totalScore: totalScore
    }
  }

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

  let courseAddStatus = (inputCourseName, semesterCourses) => {
    let statusString = 'canAdd'
    if (!(semesterCourses in itemGrade)) {
        statusString = 'canAdd'
    } else {
        if(itemGrade[`${semesterCourses}`].totalCredit > 21) {
            statusString = 'creditExceed'
        } else {
            Object.entries(itemGrade).forEach(entry => {
                const [key, value] = entry;

                value.course.forEach((item) => {
                    if(item.name == inputCourseName && 
                        (item.gpa != 'W' || item.gpa != 'I' || item.gpa != 'S' || item.gpa != 'U' || item.gpa != 'R' || item.gpa != 'TR')) {
                            statusString = 'duplicate'
                            
                    }
                })
                
            })
           
        }
    }
    return statusString
  }


  let addOnListerner = (year, semester, group, grade, subject) => {
        let courseData = getData(group, subject)
        let key = `${year}/${semester}`
        if(!(key in itemGrade)) {
            itemGrade[`${key}`] = {
                totalScore: courseData.credit * stringToIntGrade(grade),
                totalCredit: courseData.credit,
                course: [subjectItem(courseData.code, courseData.name, grade, courseData.credit)]
            }
        } else {
            itemGrade[`${key}`].totalScore += (courseData.credit * stringToIntGrade(grade))
            itemGrade[`${key}`].totalCredit += courseData.credit
            itemGrade[`${key}`].course.push(subjectItem(courseData.code, courseData.name, grade, courseData.credit))

        }
        setItemGrade({
            ...itemGrade
        })
        // console.log(tempItemGrade)
  }

  let getData = (groupName, subjectName) => {
    let {subjects} = csSubjectsData.find(item => {
        return item.groupName === groupName
    })

    let data = subjects.find(item => {
        return item.name === subjectName
    })
    return data;
  }

//   semester card and subjectItem use to create view and save into local storage. semester is top
  let semesterCard = (cumulateScore, listOfCourse, cumalateCredit) => {
    return {
      totalScore: cumulateScore,
      totalCredit: cumalateCredit,
      course: listOfCourse
    }
  }

  let subjectItem = (courseId, courseName, courseGrade, courseCredit) => {
    return {
      id: courseId,
      name: courseName,
      gpa: courseGrade,
      credit: courseCredit
    }
  }

  // data ==> [semesterCard] ==> gradeList order by item id ==> loop find subject item and semester card to create.

  useEffect(() => {

    $(function() {
      $.getJSON("./cs-subject.json",
      data => {
          var csSubjectArr = data.curriculum[0].subjects;
          var groupNameArr = csSubjectArr.map(item => {
              return item.groupName
          })
  
          csSubjectsData = csSubjectArr;
        //   console.log(csSubjectsData)
         
          renderGroupSubject(groupNameArr);
      });
    
      $('#groupSelect').change(() => {
        var selectedGroup = $('#groupSelect').val();
        let subjects = []
  
        csSubjectsData.forEach(data => {
            if (data.groupName === selectedGroup) {
                subjects = data.subjects
            }
        });
  
        let subjectNames = subjects.map(subject => {
            return subject.name
        });
  
        updateSubject(subjectNames);
    });
  
    $('#addbtn').click(() => {
        let year = $('#yearSelect').val();
        let semester = $('#semesterSelect').val();
        let groupSubject = $('#groupSelect').val();
        let subjectSelect = $('#subjectSelect').val();
        let gradeSelect = $('#gradeSelect').val();

        let isShow = false
        let alertString = `Have unselected field!, please fulfill the selector`;
        if (year === null) {
            alertString = alertString + `\n- year`;
            isShow = true
        }
        if (semester === null) {
            alertString = alertString + `\n- data`;
            isShow = true
        }
        if (groupSubject === null) {
            alertString = alertString + `\n- group of Subject`
            isShow = true
        }

        if(subjectSelect === null) {
            alertString = alertString + `\n- subject Select`
            isShow = true
        }

        if(gradeSelect === null) {
          alertString = alertString + `\n- grade Select`
          isShow = true
        }
  
        if (isShow) {
            alert(alertString);
            
        } else {
            let status = courseAddStatus(subjectSelect, `${year}/${semester}`)
            switch (status) {
                case "canAdd":
                    addOnListerner(year, semester, groupSubject, gradeSelect, subjectSelect)
                    break

                case "creditExceed":
                    alert('Already maxmimum course can take')
                    break

                case "duplicate":
                    alert('Course Already Taken')
                    break
            }
               
        }

    });
    })
  }, []);

  function renderGroupSubject(groupNameArr) {
    groupNameArr.forEach(element => {
        $('#groupSelect').append(
            `<option value="${element}">${element}</option>`
        );
    });
}

function updateSubject(subjectNames) {
    $('#subjectSelect').html('');
    subjectNames.forEach(element => {
        $('#subjectSelect').append(
            `<option value="${element}">${element}</option>`
        );
    })
}

  return (
    <>
      <h1 className = 'AppHeader' style={{color: "#4d5784", textAlign: "center"}}>Student's GPA Tracker</h1>
        <br></br>
        <div className = "container-fluid px-5" style={{padding: "40px"}}>
            <div className="row" style={{marginBottom: "14px"}}>
                <div className="col mx-0" 
                    style={{marginLeft: "10px", background: "#6f97b1", padding: "20px", borderTopLeftRadius:"8px", borderBottomLeftRadius:"8px"}}>
                    <table className="table-responsive table-borderless">
                        <tbody>
                            <tr>
                                <th scope = "row" style={{textAlign: "center", color: "#fff2e5"}}>Seminar</th>
                                <td className="col" style={{paddingLeft: "20px", paddingRight: "8px"}}>
                                    <select id="yearSelect" className="form-select" aria-label="Default select example">
                                        <option value="" selected disabled hidden>Year</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        
                                    </select>
                                </td>
                                <td className="col">
                                    <select id="semesterSelect" className="form-select" aria-label="Default select example">
                                        <option value="" disabled hidden>Semester</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                       
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <th scope="row" style={{textAlign: "center"}}>
                                    Subject
                                </th>
                                <td colSpan="2" className="col" style={{paddingLeft: "20px"}}>
                                    <select id="groupSelect" className="form-select" aria-label="Default select example">
                                        <option value="" selected disabled hidden>Group Subject</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>

                                <td colSpan="3" className="col">
                                    <select id="subjectSelect" className="form-select" aria-label="Default select example">
                                        <option value="" selected disabled hidden>Subject</option>
                                        <option value="" disabled>Please Selected Group First</option>
                                       
                                    </select>
                                </td>
                            </tr>

                            <tr>
                              <td colSpan="3" className="col">
                              <select id="gradeSelect" className="form-select grade-select"
                                                aria-label="Default select example">
                                                <option value="" selected disabled hidden>---</option>
                                                <option value="A">A</option>
                                                <option value="A-">A-</option>
                                                <option value="B+">B+</option>
                                                <option value="B">B</option>
                                                <option value="B-">B-</option>
                                                <option value="C+">C+</option>
                                                <option value="C">C</option>
                                                <option value="C-">C-</option>
                                                <option value="D">D</option>
                                                <option value="F">F</option>
                                                <option value="W">W</option>
                                                <option value="I">I</option>
                                                <option value="S">S</option>
                                                <option value="U">U</option>
                                                <option value="TR">TR</option>
                                </select>
                              </td>
                            </tr>
                        </tbody>
                    </table>
                    <button id="addbtn" style={{marginTop: "10px", marginBottom: "20px"}} type="button"
                        className="btn btn-primary">ADD
                        SUBJECT</button>
                </div>

                <div className="col-9"
                    style={{background: "#4d5784", borderTopRightRadius: "8px", borderBottomRightRadius:"8px"}}>
                    <h1 style={{color: "white", textAlign: "center"}}>GRADE LIST</h1>
                    <br />
                    
                    <GradeListComponent gradeSemesters= {itemGrade} setItemGrade = {setItemGrade}></GradeListComponent>


                </div>
            </div>

            <div className="row">
                <button type="button" className="btn btn-primary">Demonstrate GPA Progress</button>
            </div>
            <GraphListComponent></GraphListComponent>

           
        </div>
    </>
  );
}

export default App;
