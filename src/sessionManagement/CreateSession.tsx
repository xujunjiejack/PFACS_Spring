import axios from "axios";
import { Map } from "immutable";
import * as React from "react";
import { Button, Form, Grid} from 'semantic-ui-react'
import styled from "styled-components"
import {ChooseStudentsRow} from "./ChooseStudentContainer"
import {Layout} from "../Layout"
import {IGoogleClassroomInfo} from "../data_structure/GoogleClassroomInfo"

/* CSS for the component */
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
// export interface IGoogleClassroomInfo {
//     className: string; 
//     studentName: string[];
// }

// const dummyData1: IGoogleClassroomInfo = {
//     className: "2018 Spring",
//     studentName: ["Mike", "Charles", "Anna", "Dan", "Dan", "Dan", "Ben", "Anna"]
// }

// const dummyData2: IGoogleClassroomInfo = {
//     className: "Fall 2018 Math",
//     studentName: ["Anna", "Charles", "Steve", "Jack"]
// }

// const dummyData = [dummyData1, dummyData2]

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

/* Main Component */
export class CreateSession extends React.Component<any, any>{

    public constructor(props: any){
        super(props)
        let m = Map<string, boolean>()

        // the only problem right now is this:
        // at the initial stage of the (before login), the classroomInfodata in the props will be null
        // so how do I change it later. Repopulate the allStudentCheckStatusMap???

        props.classroomInfoData.forEach(
            (d: IGoogleClassroomInfo) => {
                d.studentName.forEach(s =>{
                    m = m.set(s, false)
                })
            }
        )
        this.state = {allStudentCheckStatusMap: m, title: '', googleClassroomDataInfo: props.classroomInfoData}
    }
    
    public componentDidUpdate(prevProps: any){
        if (prevProps.allStudentCheckStatusMap !== this.props.allStudentCheckStatusMap){
            let m = Map<string, boolean>()
            this.props.classroomInfoData.forEach(
                (d: IGoogleClassroomInfo) => {
                    d.studentName.forEach(s =>{
                        m = m.set(s, false)
                    })
                }
            )
             
            this.setState({allStudentCheckStatusMap: m})
        }
    }

    public render(){
        
        return (
            <Layout history={this.props.history}>
                <BackgroundContainer/>
                
                <CreateAssessmentLabel>
                    CREATE A NEW ASSESSMENT
                </CreateAssessmentLabel>

                <StyledForm>
                    
                    {/* Session title */}
                    <Form.Field>
                        <label style={{display: "flex", justifyContent:"left", marginBottom:"10px"}}>Session Title</label>
                        <input placeholder='Session Title' value={this.state.title} name="title" onChange={this.formOnChange}/>
                    </Form.Field>

                    <div style={{height: "24px"}}/>  

                     {/* Session check box */}
                    <Form.Field>
                        <label style={{display: "flex", justifyContent:"left", marginBottom:"10px"}}>
                            Students (From Google Classroom)
                        </label>

                        {/* Given the data and generate it*/}
                        <ChooseStudentContainer>                        
                            <Grid padded="horizontally" style={{marginTop: 0}}>
                                {/* this is for adding the class info and it needs to be dynamically generated*/}
                                {/* <ChooseStudentsRow classInfo={dummyData1} allStudentsCheckitems={this.state.allStudentCheckStatusMap} setAllStudentCheckitems={this.setAllStudentItems}/>
                                <ChooseStudentsRow classInfo={dummyData2} allStudentsCheckitems={this.state.allStudentCheckStatusMap} setAllStudentCheckitems={this.setAllStudentItems}/> */}
                                { this.state.googleClassroomDataInfo.map(
                                    (data: IGoogleClassroomInfo) => {
                                        return <ChooseStudentsRow key={data.className} classInfo={data} allStudentsCheckitems={this.state.allStudentCheckStatusMap} setAllStudentCheckitems={this.setAllStudentItems}/>
                                    }

                                )} 
                            </Grid>
                        </ChooseStudentContainer>
                        
                    </Form.Field>   

                    {/* Create Session */}
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
         
        const sessionName = this.state.title
        const studentMaps: Map<string, boolean> = this.state.allStudentCheckStatusMap
        const studentIds = studentMaps.filter((v,k) => v === true).keySeq().toArray()
        const studentNumber = studentIds.length
        const ongoing = true;
        const startTime = "time-need-format"
        const sessionId = Math.random().toString(36)
        const newSessionEntry = {
            ongoing, startTime, studentNumber, studentIds, sessionName, sessionId,
        }

        this.props.addNewSession(newSessionEntry)
        this.props.changeCurrentSession(sessionId, "dashboard")
        this.props.history.push("/livedashboard")
    }

    private setAllStudentItems = (newAllStudentItems: Map<string, boolean> ) => {
        this.setState({allStudentCheckStatusMap: newAllStudentItems})
    }
}