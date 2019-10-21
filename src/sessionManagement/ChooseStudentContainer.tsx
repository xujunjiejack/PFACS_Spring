// import axios from "axios";
import { Map } from "immutable";
import * as React from "react";
import { Checkbox, GridColumn, GridRow} from 'semantic-ui-react'

import {IGoogleClassroomInfo} from "../data_structure/GoogleClassroomInfo"
import styled from "styled-components"
import * as globalStyle from "../AppStyle"

const ClassroomHeader = styled(GridRow)`
    &&& {
    height:51px;
    display: flex;
    align-items:center;
    background:${globalStyle.colors.basePacificBlue};
    margin-top: 0;
    padding-left: 14px;
    padding-right: 14px;
    padding-top: 14px;
    padding-bottom: 14px;
    }
`

/* Interface for props and states */
interface IChooseStudentContainerProps {
    classInfo: IGoogleClassroomInfo,
    allStudentsCheckitems: Map<string, boolean>,
    setAllStudentCheckitems(x: Map<string, boolean> ) : any
}

interface IChooseStudentContainerStates {
    all: boolean;
    chosenStudents: string[];
    none: boolean;
    studentCheckbox: Map<string, boolean>
}


/***
 *  Main Class  
 *  This is used in the create session to ask users to choose students to participate in the row 
 * 
 */
export class ChooseStudentsRow extends React.Component<IChooseStudentContainerProps, IChooseStudentContainerStates>{
    
    constructor(props: IChooseStudentContainerProps){
        super(props)
        this.state = {
            all: false,
            chosenStudents: [],
            none: true,
            studentCheckbox: this.props.allStudentsCheckitems
        }
    }

    public componentDidUpdate(prevProps: IChooseStudentContainerProps) {

        if (prevProps.allStudentsCheckitems !== this.props.allStudentsCheckitems){
            const everyStudentCheckedArray = this.props.classInfo.studentName.map(s=> this.props.allStudentsCheckitems.get(s))
            const none = everyStudentCheckedArray.every(x=> x === false)
            const all = everyStudentCheckedArray.every(x=> x === true)
            this.setState({studentCheckbox: this.props.allStudentsCheckitems, all, none} )
        }
      } 

    public render(){
        return(
            <React.Fragment>
                <ClassroomHeader>
                    <Checkbox label={this.props.classInfo.className} 
                        style={{fontColor: globalStyle.colors.baseDoctor}}
                        indeterminate={!this.state.none && !this.state.all} checked={this.decideMasterCheckbox()}
                        onChange = {this.masterClick}
                    />
                </ClassroomHeader>
                
                <GridRow style={{marginTop: 0}}>
                    {
                        this.props.classInfo.studentName.map(
                        (s,i) => { 
                            return (
                            <GridColumn width="4" key={`${s}_${i}`} textAlign="left" style={{marginBottom: "10px"}}> 
                                <Checkbox key={`${s}_${i}`} label={s} checked={this.state.studentCheckbox.get(s)}  onChange={this.changeSpecificStudent}/>
                            </GridColumn>
                        )
                        })
                    }
                </GridRow>
            </React.Fragment>
        )
    }
    
    private decideMasterCheckbox = () => { 
        if (this.state.all){return true}
        if (this.state.none){return false}
        return false
    }

    private masterClick = (e: any, data: any) => {
        const isChecked = data.checked
        if (isChecked){
            const studentCheckbox = this.state.studentCheckbox
            let updatedMap = studentCheckbox
            this.props.classInfo.studentName.forEach(
                s => {updatedMap = updatedMap.set(s, true)}
            )
            this.props.setAllStudentCheckitems(updatedMap)

            this.setState({all: true, studentCheckbox: updatedMap, none: false})
        
        } else {
            // set all students checkbox to false
            const studentCheckbox = this.state.studentCheckbox
            let updatedMap = studentCheckbox
            this.props.classInfo.studentName.forEach(
                s => {updatedMap= updatedMap.set(s, false)}
            )
            this.props.setAllStudentCheckitems(updatedMap)
            this.setState({none: true, studentCheckbox: updatedMap, all: false})
        }
    }


    private changeSpecificStudent = (e: any, data: any) => {
        const studentName =  data.label
        const isChecked = data.checked
        const updatedCheckItems: Map<string,boolean> = this.state.studentCheckbox.set(studentName, isChecked)
        const valueArray = this.props.classInfo.studentName.map(s=> updatedCheckItems.get(s))
        const none = valueArray.every(x=> x === false)
        const all = valueArray.every(x=> x === true)
        this.props.setAllStudentCheckitems(updatedCheckItems)
        this.setState( {studentCheckbox: updatedCheckItems, all, none} )
    }
}