import * as React from "react";
import {Grid, GridColumn, GridRow} from "semantic-ui-react";
import styled from "styled-components";
import { Student, StudentStatus } from "./data_structure/Student";
import StudentStatusRectangular from "./StudentStatusRectangular";
import StudentStatusRect from './StudentStatusRectangular';

const currentData = [ new Student("Alice", StudentStatus.InProgress, "lili"),
                      new Student("Bob", StudentStatus.InProgress, "mimi"),
                      new Student("Charlie", StudentStatus.Idle, "ben"),
                      new Student("Donny", StudentStatus.Absent, "josh"),
                      new Student("Elise", StudentStatus.Stuck, "kuku"),
                      new Student("Frank", StudentStatus.InProgress, "liz"),
                      new Student("Gigi", StudentStatus.InProgress, "jojo"),
                      new Student("Hadi", StudentStatus.InProgress, "Hadi"),
                      new Student("Iris", StudentStatus.InProgress, "Iris"),
                      new Student("Jojo", StudentStatus.InProgress, "Jojo"),
                      new Student("Kiki", StudentStatus.InProgress, "Kiki"),
                      new Student("Lala", StudentStatus.InProgress, "Lala"),
                      new Student("Mimi", StudentStatus.InProgress, "Mimi"),
                      new Student("Norb", StudentStatus.InProgress, "Norb"),
                      new Student("Onno", StudentStatus.InProgress, "Onno"),
                      new Student("Poppy", StudentStatus.InProgress, "Poppy"),
                      new Student("Quinn", StudentStatus.InProgress, "Quinn"),
                      new Student("Rog", StudentStatus.InProgress, "Rog"),
                      new Student("Sisko", StudentStatus.InProgress, "Sisko"),
                      new Student("Tom", StudentStatus.Stuck, "Tom"),
                      new Student("Josh", StudentStatus.InProgress, "Josh"),
                      new Student("Yan", StudentStatus.InProgress, "Yan"),
]

interface IStudentOverviewProps{
    showDetailed: (studentId: string) => void,
    studentData: Student[]
}

export class StudentOverview extends React.Component <IStudentOverviewProps ,any> {

    // How to create a mutual exclusive design
    
    // I need a way to track the current. Hmm. Redux?????? Too complicated? 
    public constructor(props: any){
        super(props)
        this.state = {studentData: this.props.studentData}
    }


    public render(){
        return(
             <React.Fragment>

                {this.createGridFromData(this.state.studentData)}
                {/* <GridRow>
                    <GridColumn width="2"/>

                    <GridColumn width="2">

                        <Rectangular status={StudentStatus.Idle}> Hello </Rectangular>
                
                    </GridColumn>

                    <GridColumn width="2">

                            <Rectangular status={StudentStatus.Idle}> Hello </Rectangular>

                    </GridColumn>


                </GridRow> */}
            </React.Fragment>
        )

    }

    public componentDidUpdate(prevProps: any){
        if (prevProps.studentData !== this.props.studentData){
            this.setState({studentData: this.props.studentData})
        }
    }

    private createGridFromData(studentData: Student[])  {
        
        // Decide on Row and column
        const elementNumberOneRow = 5;

        const rowNum = Math.round(studentData.length / elementNumberOneRow) + 1

        const a = new Array();

        for(let i =0; i < rowNum; i++){
            a.push(i)
        }

        return (<Grid padded={true} verticalAlign="middle" style={{flexWrap: "wrap"}}>
            {/* {
                a.map((r,rowIndex) => { 
                    console.log(rowIndex)
                    const slicedColumn = studentData.slice(rowIndex*6, rowIndex*6 + 6)
                    return (
                        <GridRow key={`row${r}`}>
                        
                            { slicedColumn.map( (s, index) => {
                                return (
                                    <GridColumn key={`row${r}_column${index}`} style={{paddingLeft: `5px`, paddingRight:`5px`}}>
                                        <Rectangular status={s.status}>
                                            {s.name}
                                        </Rectangular> 
                                    </GridColumn>
                                )
                            }  ) }
                        </GridRow>
                        )
                    }
             
                )  
            } */}

            {
                studentData.map((s, index) => {
                return (
                    // <GridColumn key={`student_column${index}`} style={{paddingLeft: `5px`, paddingRight:`5px`}}>
                    <StudentStatusRect key={`student_${s.name}_rect`} showDetailed={this.props.showDetailed} 
                                student={s}/>
                    // </GridColumn>
                )  
                }
                )
            }

            </Grid>
        )
    }
}
