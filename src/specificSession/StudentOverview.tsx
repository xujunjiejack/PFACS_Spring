import * as React from "react";
import {Grid, GridColumn, GridRow} from "semantic-ui-react";
import styled from "styled-components";
import { Student, StudentStatus } from "../data_structure/Student";
import StudentStatusRect from './StudentStatusRectangular';

/* Interface */
interface IStudentOverviewProps{
    showDetailed: (studentId: string) => void,
    studentData: Student[]
}

/* Main Component */
export class StudentStatusOverview extends React.Component <IStudentOverviewProps ,any> {

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
                            this.state.studentData.map((s: Student) => {
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

}
