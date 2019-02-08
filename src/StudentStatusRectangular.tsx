import * as React from "react";
import * as ReactToolTip from "react-tooltip";
import {Grid, GridColumn, GridRow} from "semantic-ui-react";
import styled from "styled-components";
import {Student, StudentStatus} from "./data_structure/Student";

function generateColorBasedOnStatus(status: StudentStatus){
    switch (status) {
        case StudentStatus.InProgress:
            return "green"
            break;
        
        case StudentStatus.Idle:
            return "yellow"
            break;

        case StudentStatus.Absent:
            return "grey"   

        case StudentStatus.Stuck: 
            return "purple"

        default:
            return "#000000"
    }
} 

const Rectangular = styled.div <{status: StudentStatus}>`
    background-color: ${props => generateColorBasedOnStatus(props.status)};
    // min-width: 40px;
    font-size: 20px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    width: 3.5em;
    height: 3.5em;

    // &: focus {
    //     border: 5px solid red;
    //     outline: none;
    // }

    &.active1 {
        border: 5px solid red;
        outline: none;
    }
    // display:box;
    // width: 100px;
    // padding-top: 100%;

`

interface IStudentStatusRectProps{
    student: Student,
    showDetailed: (studentId:string) => void 
}

interface IStudentStatusRectState{
    rectActive: boolean
}

class StudentStatusRect extends React.Component<IStudentStatusRectProps, IStudentStatusRectState> {

    constructor(props: any){
        super(props)
        console.log(props)
        const ref = React.createRef();
        this.state = {rectActive: false} 
        
        // ReactToolTip.show(this.state.rectRef)
    }

    public render() {
    //  
        return(
            <Rectangular 
            tabIndex={0}
            
            className = {this.state.rectActive? "active" : ""}
            // className="active1"

            status={this.props.student.status} onClick={this.onClick} data-tip={this.getContentFromStatus(this.props.student.status)}>
                <ReactToolTip place="top" type="dark" effect="solid" />
                {this.props.student.name}
            </Rectangular>
        )
    }

    private onClick = () => {
        this.setState({rectActive: true})
        this.props.showDetailed(this.props.student.id)
        
    }

    private getContentFromStatus = (status: StudentStatus): string => {
        switch (status) {
            case StudentStatus.InProgress:
                return "In Progress"        

            case StudentStatus.Absent:
                return "Absent"

            case StudentStatus.Stuck:
                return "Stuck"

            case StudentStatus.Idle:
                return "Idle"

            default:
                return ""
        }
    }
}

export default StudentStatusRect