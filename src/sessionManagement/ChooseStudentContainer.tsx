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
        padding:14px;
    }
`

const HeaderStyledCheckbox = styled(Checkbox)`
    &&&{
        border-width:10;

        &.checked label {
            color: ${globalStyle.colors.baseDoctor}
        }

        &:active label {
            color: ${globalStyle.colors.baseDoctor}
        }

        & input:focus~label {
            color: ${globalStyle.colors.baseDoctor}
        }

        & label{

            // Global Style Text body
            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: -0.001em;

            color: ${globalStyle.colors.baseDoctor}
        }
    }
`

const StudentCheckbox = styled(Checkbox)`
    &&&{
        border-width:10;

        &.checked label{
            color: ${globalStyle.colors.baseBlueStone};            
        }

        &::selection label{
            color: ${globalStyle.colors.baseBlueStone};            
        }
    
        & input:focus~label {
            color: ${globalStyle.colors.baseBlueStone}
        }

        & label{

            // Global Style Text body
            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: -0.001em;

            color: ${globalStyle.colors.baseBlueStone};

            &:active {
                color: ${globalStyle.colors.basePacificBlueActive};
            }
        }
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
            const none = everyStudentCheckedArray.every(checked=> !checked)
            const all = everyStudentCheckedArray.every(checked=> checked)
            this.setState({studentCheckbox: this.props.allStudentsCheckitems, all, none} )
        }
      } 

    public render(){
        return(
            <React.Fragment>
                <ClassroomHeader>
                    <HeaderStyledCheckbox label={this.props.classInfo.className} 
                        style={{fontColor: globalStyle.colors.baseDoctor}}
                        indeterminate={!this.state.none && !this.state.all} checked={this.decideMasterCheckbox()}
                        onChange = {this.masterClick}
                    />
                </ClassroomHeader>
                
                {/* Student check */}
                <GridRow style={{marginTop: 0}}>
                    {
                        this.props.classInfo.studentName.map(
                            (s,i) => { 
                                return (
                                <GridColumn width="4" key={`${s}_${i}`} textAlign="left" style={{marginBottom: "10px"}}> 
                                    <StudentCheckbox key={`${s}_${i}`} label={s} checked={this.state.studentCheckbox.get(s)} 
                                        onChange={this.changeSpecificStudent}/>
                                </GridColumn>
                            )
                        })
                    }
                </GridRow>
            </React.Fragment>
        )
    }
    
    private decideMasterCheckbox = () => 
        this.state.all ? true :
            this.state.none? false : false

    private masterClick = (e: any, data: any) => {
        const isChecked = data.checked
        const studentCheckbox = this.state.studentCheckbox
        let updatedMap = studentCheckbox
        this.props.classInfo.studentName.forEach(
            s => {updatedMap = updatedMap.set(s, isChecked)}
        )
        this.props.setAllStudentCheckitems(updatedMap)

        if (isChecked){
            this.setState({all: true, studentCheckbox: updatedMap, none: false})
        } else {
            this.setState({none: true, studentCheckbox: updatedMap, all: false})
        }
    }


    private changeSpecificStudent = (e: any, data: any) => {
        const studentName =  data.label
        const updatedCheckItems: Map<string,boolean> = this.state.studentCheckbox.set(studentName, data.checked)
        const allStudentCheckedArray = this.props.classInfo.studentName.map(s=> updatedCheckItems.get(s))
        const none = allStudentCheckedArray.every(checked=> !checked)
        const all = allStudentCheckedArray.every(checked => checked)
        this.props.setAllStudentCheckitems(updatedCheckItems)
        this.setState( {studentCheckbox: updatedCheckItems, all, none} )
    }
}