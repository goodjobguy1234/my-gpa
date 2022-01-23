import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery'

function GradeListComponent() {
    const addCard = () => {

    };

    const addItemInCard = () => {

    };
    
    return (
        <>
            <div className="container-fluid mx-0 px-0 pb-5 mb-4"
                        style={{backgroundColor: "white", borderBottomLeftRadius:"4px", borderBottomRightRadius:"4px"}}>
                        <div className="row mx-0 px-0 " style= {{backgroundColor: "red"}}>
                            <div className="col-10">
                                <p1>Semester 1/2019</p1>
                            </div>
                            <div className="col" style={{textAlign: "left"}}>
                                <p1>GPA:</p1>
                                <p1>3.75</p1>
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
                                    <tr>
                                        <td scope="row" colSpan="1"></td>

                                        <td scope="col" colSpan="2">BG 1001</td>
                                        <td scope="col" colSpan="3">English I</td>
                                        <td scope="col" colSpan="1">
                                           <h4 style={{color: "red", fontWeight: "bold"}}>A</h4>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td scope="row" colSpan="1"></td>
                                        
                                        <td scope="col" colSpan="2">BG 1002</td>
                                        <td scope="col" colSpan="3">English II</td>
                                        <td scope="col" colSpan="1">
                                           <h4 style={{color: "red", fontWeight: "bold"}}>B+</h4>
                                        </td>
                                    </tr>
                                </tbody>
                        </table>
                </div>

            </div>

            <div className="container-fluid mx-0 px-0 pb-5 mb-4"
                        style={{backgroundColor: "white", borderBottomLeftRadius:"4px", borderBottomRightRadius:"4px"}}>
                        <div className="row mx-0 px-0 " style= {{backgroundColor: "red"}}>
                            <div className="col-10">
                                <p1>Semester 1/2019</p1>
                            </div>
                            <div className="col" style={{textAlign: "left"}}>
                                <p1>GPA:</p1>
                                <p1>3.75</p1>
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
                                    <tr>
                                        <td scope="row" colSpan="1"></td>

                                        <td scope="col" colSpan="2">BG 1001</td>
                                        <td scope="col" colSpan="3">English I</td>
                                        <td scope="col" colSpan="1">
                                           <h4 style={{color: "red", fontWeight: "bold"}}>A</h4>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td scope="row" colSpan="1"></td>
                                        
                                        <td scope="col" colSpan="2">BG 1002</td>
                                        <td scope="col" colSpan="3">English II</td>
                                        <td scope="col" colSpan="1">
                                           <h4 style={{color: "red", fontWeight: "bold"}}>B+</h4>
                                        </td>
                                    </tr>
                                </tbody>
                        </table>
                </div>

            </div>
                    
        </>
    );
}

export default GradeListComponent;

