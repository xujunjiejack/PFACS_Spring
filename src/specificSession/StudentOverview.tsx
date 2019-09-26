import * as React from "react";
import { Grid, GridColumn, GridRow } from "semantic-ui-react";
import styled from "styled-components";
import { Student, StudentStatus } from "../data_structure/Student";
import StudentStatusRect from './StudentStatusRectangular';
import * as _ from "lodash"
/* Interface */
interface IStudentOverviewProps {
    showDetailed: (studentId: string) => void,
    studentData: Student[],
    onMouseOverASpecificStudentEvent: (studentData: Student)=> void
    onMouseOutASpecificStudentEvent: () => void
    onClickOnASpecificStudentEvent: (studentData: Student) => void
}

/* Main Component */
export class StudentOverview extends React.Component<IStudentOverviewProps, any> {

    public constructor(props: any) {
        super(props)
        this.state = { studentData: this.props.studentData }
    }


    public render() {

        const elementNumberOneRow = 5;
        const rowNum = Math.round(this.state.studentData.length / elementNumberOneRow) + 1
        const a = new Array();

        for (let i = 0; i < rowNum; i++) {
            a.push(i)
        }

        return (
            <React.Fragment>
                <Grid padded={true} verticalAlign="middle"
                    style={{
                        padding: "0px 0px 0px 0px",
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        alignContent: "flex-start",
                    }}>

                    {/* Create the status grid */}
                    {
                        
                        
                        _.sortBy(this.state.studentData,'name').map((s: Student) => {
                            return (
                                <StudentStatusRect
                                    key={`student_${s.name}_rect`}
                                    showDetailed={this.props.showDetailed}
                                    student={s}
                                    onMouseOverASpecificStudentEvent={this.props.onMouseOverASpecificStudentEvent}
                                    onMouseOutASpecificStudentEvent= {this.props.onMouseOutASpecificStudentEvent}
                                    onClickOnASpecificStudentEvent = {this.props.onClickOnASpecificStudentEvent}
                                />
                            )
                            }
                        )
                    }

                </Grid>
            </React.Fragment>
        )
    }

    public componentDidUpdate(prevProps: any) {
        if (prevProps.studentData !== this.props.studentData) {
            this.setState({ studentData: this.props.studentData })
        }
    }

}
