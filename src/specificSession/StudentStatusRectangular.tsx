import * as React from "react";
// import * as ReactToolTip from "react-tooltip";
import ReactToolTip from "react-tooltip";
// import {Grid, GridColumn, GridRow} from "semantic-ui-react";
import styled from "styled-components";
import {Student, StudentStatus} from "../data_structure/Student";

function generateColorBasedOnStatus(status: StudentStatus){
    switch (status) {
        case StudentStatus.InProgress:
            return "#DAF8FF"
        
        case StudentStatus.Idle:
            return "#EFEFEF"

        case StudentStatus.Absent:
            return "#EFEFEF"   

        case StudentStatus.Stuck: 
            return "#E2DAFF"

        default:
            return "#000000"
    }
} 

const Rectangular = styled.div <{status: StudentStatus}>`
    background-color: ${props => generateColorBasedOnStatus(props.status)};
    font-size: 1.2em;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    margin-left: 3px;
    width: 85px;
    height: 60px;
    
    &.active1 {
        border: 5px solid red;
        outline: none;
    }
`

interface IStudentStatusRectProps{
    student: Student,
    showDetailed: (studentId:string) => void,
    onMouseOverASpecificStudentEvent: (studentData: Student) => void,
    onMouseOutASpecificStudentEvent: () => void,
    onClickOnASpecificStudentEvent: (studentData: Student) => void
}

interface IStudentStatusRectState{
    rectActive: boolean
}

class StudentStatusRect extends React.Component<IStudentStatusRectProps, IStudentStatusRectState> {

    constructor(props: any){
        super(props)
        this.state = {rectActive: false}         
    }

    public render() {
        
        return(
            <Rectangular 
                onMouseOver={ ()=>this.props.onMouseOverASpecificStudentEvent(this.props.student)}
                onMouseOut={()=>this.props.onMouseOutASpecificStudentEvent()}
                tabIndex={0}

                className={this.state.rectActive? "active" : ""}

                status={this.props.student.status} onClick={this.onClick} data-tip={this.getContentFromStatus(this.props.student.status)}>

                <ReactToolTip place="top" type="dark" effect="solid" />

                {this.props.student.name}
            </Rectangular>
        )
    }

    private onClick = () => {
        this.setState({rectActive: true})
        this.props.onClickOnASpecificStudentEvent(this.props.student)
    }

    private getContentFromStatus = (status: StudentStatus): string => {
        switch (status) {
            case StudentStatus.InProgress:
                return "In Progress"        

            case StudentStatus.Absent:
                return "Absent"

            case StudentStatus.Stuck:
                return "Idle for 2 minutes"

            case StudentStatus.Idle:
                return "Idle for 5 minutes"

            default:
                return ""
        }
    }
}

export default StudentStatusRect