import * as React from "react";
import {Grid, GridColumn, GridRow} from "semantic-ui-react";
import styled from "styled-components";
import { Student, StudentStatus } from "../data_structure/Student";
import StudentStatusRect from './StudentStatusRectangular';

// const currentData = [ new Student("Alice", StudentStatus.InProgress, "lili"),
//                       new Student("Bob", StudentStatus.InProgress, "mimi"),
//                       new Student("Charlie", StudentStatus.Idle, "ben"),
//                       new Student("Donny", StudentStatus.Absent, "josh"),
//                       new Student("Elise", StudentStatus.Stuck, "kuku"),
//                       new Student("Frank", StudentStatus.InProgress, "liz"),
//                       new Student("Gigi", StudentStatus.InProgress, "jojo"),
//                       new Student("Hadi", StudentStatus.InProgress, "Hadi"),
//                       new Student("Iris", StudentStatus.InProgress, "Iris"),
//                       new Student("Jojo", StudentStatus.InProgress, "Jojo"),
//                       new Student("Kiki", StudentStatus.InProgress, "Kiki"),
//                       new Student("Lala", StudentStatus.InProgress, "Lala"),
//                       new Student("Mimi", StudentStatus.InProgress, "Mimi"),
//                       new Student("Norb", StudentStatus.InProgress, "Norb"),
//                       new Student("Onno", StudentStatus.InProgress, "Onno"),
//                       new Student("Poppy", StudentStatus.InProgress, "Poppy"),
//                       new Student("Quinn", StudentStatus.InProgress, "Quinn"),
//                       new Student("Rog", StudentStatus.InProgress, "Rog"),
//                       new Student("Sisko", StudentStatus.InProgress, "Sisko"),
//                       new Student("Tom", StudentStatus.Stuck, "Tom"),
//                       new Student("Josh", StudentStatus.InProgress, "Josh"),
//                       new Student("Yan", StudentStatus.InProgress, "Yan"),
// ]

interface IStudentOverviewProps{
    showDetailed: (studentId: string) => void,
    studentData: Student[]
}

export class StudentOverview extends React.Component <IStudentOverviewProps ,any> {

    public constructor(props: any){
        super(props)
        this.state = {studentData: this.props.studentData}
    }


    public render(){

        const elementNumberOneRow = 5;
        const rowNum = Math.round(this.state.studentData.length / elementNumberOneRow) + 1
        const a = new Array();

        for(let i =0; i < rowNum; i++){
            a.push(i)
        }

        return (
                <React.Fragment>
                <Grid padded={true} verticalAlign="middle" style={{flexWrap: "wrap"}}>

                     {/* Create the status grid */}
                      {
                            this.state.studentData.map((s: Student, index: number) => {
                                return (
                                    <StudentStatusRect
                                        key={`student_${s.name}_rect`}
                                        showDetailed={this.props.showDetailed} 
                                        student={s}
                                    />
                                )  
                        }
                        )        
                    }

                </Grid>
                </React.Fragment>
        )
    }

    public componentDidUpdate(prevProps: any){
        if (prevProps.studentData !== this.props.studentData){
            this.setState({studentData: this.props.studentData})
        }
    }

    private createGridFromData(studentData: Student[])  {
        
        const elementNumberOneRow = 5;

        const rowNum = Math.round(studentData.length / elementNumberOneRow) + 1

        const a = new Array();

        for(let i =0; i < rowNum; i++){
            a.push(i)
        }

        return (<Grid padded={true} verticalAlign="middle" style={{flexWrap: "wrap"}}>

            {
                studentData.map((s, index) => {
                return (
                
                    <StudentStatusRect key={`student_${s.name}_rect`} showDetailed={this.props.showDetailed} 
                                student={s}/>
                )  
                }
                )
            }

            </Grid>
        )
    }
}
