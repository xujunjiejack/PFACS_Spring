import * as React from "react";
// import { Grid, GridColumn, GridRow } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
// import styled from "styled-components";
// import { Student, StudentStatus } from "../data_structure/Student";
import { Student } from "../data_structure/Student";
import StudentStatusRect from './StudentStatusRectangular';
import * as _ from "lodash";
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

    private myRef ;

    public constructor(props: any) {
        super(props);
        this.state = { studentData: this.props.studentData };
        this.myRef = React.createRef()

    }

    public componentDidMount(){
        // this.myRef.current !== null ? console.log("ref" + this.myRef.current) : console.log("myref node is null")
        const containerWidth = this.myRef.current.getBoundingClientRect().width
        console.log(this.myRef.current.getBoundingClientRect().width)
        const elementARow = Math.floor(containerWidth / 90)
        console.log(elementARow)
        if (this.state.studentData !== undefined){
            const emptyBlockNum = this.state.studentData.length % elementARow
            if (emptyBlockNum !== 0) {

            }
        }
    }

    // public setRef(element){
    //    
    // }

    public render() {
        const elementNumberOneRow = 5;
        const rowNum = Math.round(this.state.studentData.length / elementNumberOneRow) + 1
        const a = new Array();

        for (let i = 0; i < rowNum; i++) {
            a.push(i)
        }

        return (
            <React.Fragment>
                <div 
                    style={{
                        padding: "0px 0px 0px 0px",
                        display: "flex",
                        // justifyContent: "space-between",
                        justifyContent: "flex-start",
                        flexWrap: "wrap",
                        alignContent: "flex-start",
                        height: "100%"

                    }} ref={this.myRef}>
                    {/* <div ref={this.setRef} >  </div> */}
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

                    {/* We need add empty rect */}
                    {/* {
                        setTimeout(() => this.myRef.current !== null ? console.log("ref" + this.myRef.current) : console.log("myref node is null") , 
                            3000)
                        
                    } */}

                </div>
            </React.Fragment>
        )
    }

    public componentDidUpdate(prevProps: any) {
        if (prevProps.studentData !== this.props.studentData) {
            this.setState({ studentData: this.props.studentData })
        }
    }

}
