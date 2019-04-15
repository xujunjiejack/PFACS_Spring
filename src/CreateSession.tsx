import axios from "axios";
import { Map } from "immutable";
import * as React from "react";
import {GoogleLogin, GoogleLoginResponse} from "react-google-login"
import { Button, Checkbox, Container, Form, Grid, GridColumn, GridRow } from 'semantic-ui-react'
import styled from "styled-components"
import { HeaderText, TitleText } from "./AppStyle";
import {ChooseStudentsRow} from "./ChooseStudentContainer"
import {UserContext} from "./Context"
import {Layout} from "./Layout"


const CreateAssessmentLabel = styled.div`
    position: absolute;
    width: 842px;
    height: 30px;
    left: 319px;
    top: 148px;

    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: normal;

    color: #000000;
    display: flex;
    justify-content: left;
    align-items:center;
cursor: pointer;
`

const SessionTitleLabel = styled.div`
    position: absolute;
    width: 92px;
    height: 19px;
    left: 318px;
    top: 211px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: normal;

    color: #000000;
`

const StyledForm = styled(Form) `
    position: absolute;
    width: 30vw;
    height: 19px;
    left: 318px;
    top: 211px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: normal;

    color: #000000;

`

// Class Name. Dummy data 
export interface IGoogleClassroomInfo {
    className: string; 
    studentName: string[];
}

const dummyData1: IGoogleClassroomInfo = {
    className: "2018 Spring",
    studentName: ["Mike", "Charles", "Anna", "Dan", "Dan", "Dan", "Ben", "Anna"]
}

const dummyData2: IGoogleClassroomInfo = {
    className: "Fall 2018 Math",
    studentName: ["Anna", "Charles", "Steve", "Jack"]
}

const dummyData = [dummyData1, dummyData2]

const ChooseStudentContainer = styled.div`
    position: relative;
    width: 816px;
    height: 448px;
    left: 0px;
    top: 0px;

    border: 1px solid #C8C8C8;
    box-sizing: border-box;
`

const BackgroundContainer = styled.div`
    position: absolute;
    width: 1198px;
    height: 876px;
    left: 121px;
    top: 74px;

    background: #FFFFFF;
`


export class CreateSession extends React.Component<any, any>{

  
    public constructor(props: any){
        super(props)
        let m = Map<string, boolean>()
        dummyData.forEach(
            d => {
                d.studentName.forEach(s =>{
                    m = m.set(s, false)
                })
            }
        )
        this.state = {allStudentCheckbox: m, title: ''}
    }
    // What this idea does is to store each entry in the state. 
    // change the state when onChange
    // and send the state when submit

    public render(){
        
        return (
            <Layout history={this.props.history}>
                <BackgroundContainer/>
                
                <CreateAssessmentLabel>
                    CREATE A NEW ASSESSMENT
                </CreateAssessmentLabel>

                <StyledForm>
                    <Form.Field>
                        <label style={{display: "flex", justifyContent:"left", marginBottom:"10px"}}>Session Title</label>
                        <input placeholder='Session Title' value={this.state.title} name="title" onChange={this.formOnChange}/>
                    </Form.Field>

                    <div style={{height: "24px"}}/>  
                    <Form.Field>
                        <label style={{display: "flex", justifyContent:"left", marginBottom:"10px"}}>
                            Students (From Google Classroom)
                        </label>

                        {/* Given the data and generate it*/}
                        <ChooseStudentContainer>                        
                            <Grid padded="horizontally" style={{marginTop: 0}}>
                                <ChooseStudentsRow classInfo={dummyData1} allStudentsCheckitems={this.state.allStudentCheckbox} setAllStudentCheckitems={this.setAllStudentItems}/>
                                <ChooseStudentsRow classInfo={dummyData2} allStudentsCheckitems={this.state.allStudentCheckbox} setAllStudentCheckitems={this.setAllStudentItems}/>
                            </Grid>
                        </ChooseStudentContainer>
                        
                    </Form.Field>   
                    <Form.Field>
                        <Button onClick={this.createSession} style={{position:"absolute", left: `0px`}}>
                            Create Session
                        </Button>
                    </Form.Field>

                </StyledForm>
            </Layout>    
        )
    }

    private formOnChange = (e:any) =>{
        console.log(this.state)
        this.setState({[e.target.name]: e.target.value})
    }

    private createSession = () => {
        // Now I need to add the session to the top level data
        // First, let me prepare the data 
        // the first data is title. I can get from the state
        // the second data is the student ids. I need to extract from student checkboxes
        // the third data is timestamps
        // the fourth is the ongoing 
        // the fifth is the student number, collected by the student checkbox 
        // Now the problem is that the title seems not readable hmm. Alright, I see. it is related to the sessions, probably not related to here.
        // Now I want to figure out the warning of duplicate keys. How should I get rid of it?
        // The problem might exist in the Choose student row. The function for key generation might not be smart enough
        // TODO: More user validation with some micro-interactions.
         
        const sessionName = this.state.title
        const studentMaps: Map<string, boolean> = this.state.allStudentCheckbox
        const studentIds = studentMaps.filter((v,k) => v === true).keySeq().toArray()
        const studentNumber = studentIds.length
        const ongoing = true;
        const startTime = "time-need-format"
        const sessionId = Math.random().toString(36)
        const newSessionEntry = {
            ongoing, startTime, studentNumber, studentIds, sessionName, sessionId,
        }

        console.log(newSessionEntry)
        this.props.addNewSession(newSessionEntry)
        this.props.changeCurrentSession(sessionId, "dashboard")
        this.props.history.push("/livedashboard")
    }

    private setAllStudentItems = (newAllStudentItems: Map<string, boolean> ) => {
        this.setState({allStudentCheckbox: newAllStudentItems})
    }

    private generateClassCheckboxes(data: IGoogleClassroomInfo) {
        return (
            <Grid>
                <GridRow style={{height:"51px", background:"#F4F4F4"}}>
                    <Checkbox label={data.className}/>
                </GridRow>
                
                <GridRow style={{height:"51px"}}>
                    { data.studentName.map(s => { return (<Checkbox key={s} label={s}/>)
                     })}
                </GridRow>
            </Grid>
        )
    }

    

}