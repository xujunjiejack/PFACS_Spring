import axios from "axios";
import { Map, update } from "immutable";
import * as React from "react";
import {GoogleLogin, GoogleLoginResponse} from "react-google-login"
import { Button, Checkbox, CheckboxProps, Container, Form, Grid, GridColumn, GridRow, Label} from 'semantic-ui-react'
import styled from "styled-components"
import { HeaderText, TitleText } from "./AppStyle";
import {UserContext} from "./Context"
import {IGoogleClassroomInfo} from "./CreateSession"
import {GoogleClassroomInfo} from "./data_structure/GoogleClassroomInfo"
import {Layout} from "./Layout";

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

export class ChooseStudentsRow extends React.Component<IChooseStudentContainerProps, IChooseStudentContainerStates>{
    
    constructor(props: IChooseStudentContainerProps){
        super(props)
        // this.props.classInfo.studentName.forEach(
        //     s => {
        //         this.props.allStudentsCheckitems.set(s, false)
        //     }
        // )

        this.state = {
            all: false,
            chosenStudents: [],
            none: true,
            studentCheckbox: this.props.allStudentsCheckitems
        }
    }

    public componentDidUpdate(prevProps: IChooseStudentContainerProps) {
        // Typical usage (don't forget to compare props):

      
        if (prevProps.allStudentsCheckitems !== this.props.allStudentsCheckitems){
            console.log("here")
            const valueArray = this.props.classInfo.studentName.map(s=> this.props.allStudentsCheckitems.get(s))
            const none = valueArray.every(x=> x === false)
            const all = valueArray.every(x=> x === true)
            this.setState({studentCheckbox: this.props.allStudentsCheckitems, all, none} )
        }
      } 

// checked={this.decideMasterCheckbox()}
    public render(){
        return(
            <React.Fragment>
            <GridRow style={{height:"51px", background:"#F4F4F4", marginTop: 0}}>
                <Checkbox label={this.props.classInfo.className}  indeterminate={!this.state.none && !this.state.all} checked={this.decideMasterCheckbox()}
                    onChange = {this.masterClick}
                />
                {/* What does this master checkbox do ?
                    It turns to intermediate if not all and not none
                    Click on it will lead to all select and all deselect
                    */}
            </GridRow>
            
            <GridRow style={{marginTop: 0}}>
                {
                    this.props.classInfo.studentName.map(
                    s => { 
                        return (
                        <GridColumn width="4" key={s} textAlign="left" style={{marginBottom: "10px"}}> 
                            <Checkbox key={s} label={s} checked={this.state.studentCheckbox.get(s)}  onChange={this.changeSpecificStudent}/>
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
        console.log(`is checked ${isChecked}`)
        if (isChecked){

            // set all students checkbox to true 
            const studentCheckbox = this.state.studentCheckbox
            let updatedMap = studentCheckbox
            this.props.classInfo.studentName.forEach(
                s => {updatedMap = updatedMap.set(s, true)}
            )
            this.props.setAllStudentCheckitems(updatedMap)

            this.setState({all: true, studentCheckbox: updatedMap, none: false})
            console.log("clicked true")
        } else {
            // set all students checkbox to false
            const studentCheckbox = this.state.studentCheckbox
            let updatedMap = studentCheckbox
            this.props.classInfo.studentName.forEach(
                s => {updatedMap= updatedMap.set(s, false)}
            )
            this.props.setAllStudentCheckitems(updatedMap)

            this.setState({none: true, studentCheckbox: updatedMap, all: false})
            console.log("clicked false")
        }
        
    }


    private changeSpecificStudent = (e: any, data: any) => {
        const studentName =  data.label
        console.log(`student name is ${studentName}`)
        const isChecked = data.checked
        console.log(`is checked ${isChecked}`)
        const updatedCheckItems: Map<string,boolean> = this.state.studentCheckbox.set(studentName, isChecked)

        // Check whether all students or none students
        const valueArray = this.props.classInfo.studentName.map(s=> updatedCheckItems.get(s))
        const none = valueArray.every(x=> x === false)
        const all = valueArray.every(x=> x === true)
        this.props.setAllStudentCheckitems(updatedCheckItems)
        this.setState( {studentCheckbox: updatedCheckItems, all, none} )
        
        // this.props.enrolledStudent.push(studentName)
        console.log(this.state.studentCheckbox)
    }


}