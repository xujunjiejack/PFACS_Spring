import * as React from "react";
import {Grid, GridColumn, GridRow} from "semantic-ui-react";
import styled from "styled-components";
import { Student, StudentStatus } from "./data_structure/Student";
import StudentStatusRectangular from "./StudentStatusRectangular";
import StudentStatusRect from './StudentStatusRectangular';

const currentData = [ new Student("lili", StudentStatus.InProgress, "lili"),
                      new Student("mimi", StudentStatus.InProgress, "mimi"),
                      new Student("ben", StudentStatus.Idle, "ben"),
                      new Student("josh", StudentStatus.Absent, "josh"),
                      new Student("kuku", StudentStatus.Stuck, "kuku"),
                      new Student("liz", StudentStatus.InProgress, "liz"),
                      new Student("jojo", StudentStatus.InProgress, "jojo")                      
]

interface IStudentOverviewProps{
    showDetailed: (studentId: string) => void
}

export class StudentOverview extends React.Component <IStudentOverviewProps ,any> {

    // How to create a mutual exclusive design
    
    // I need a way to track the current. Hmm. Redux?????? Too complicated? 

    public render(){
        return(
             <div>

                {this.createGridFromData(currentData)}
                {/* <GridRow>
                    <GridColumn width="2"/>

                    <GridColumn width="2">

                        <Rectangular status={StudentStatus.Idle}> Hello </Rectangular>
                
                    </GridColumn>

                    <GridColumn width="2">

                            <Rectangular status={StudentStatus.Idle}> Hello </Rectangular>

                    </GridColumn>


                </GridRow> */}
            </div>
        )

    }

    private createGridFromData(studentData: Student[])  {
        
        // Decide on Row and column
        const elementNumberOneRow = 6;

        const rowNum = Math.round(studentData.length / elementNumberOneRow) + 1

        const a = new Array();

        for(let i =0; i < rowNum; i++){
            a.push(i)
        }

        return (<Grid columns="6" padded={true} verticalAlign="middle" style={{flexWrap: "wrap"}}>
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
