// import axios from "axios";
import { Map, get } from "immutable";
import * as React from "react";
import { Button, Form, Grid } from 'semantic-ui-react'
import styled from "styled-components"
import { ChooseStudentsRow } from "./ChooseStudentContainer"
import { Layout } from "../Layout"
import { IGoogleClassroomInfo } from "../data_structure/GoogleClassroomInfo"
import { UserContext } from '../Context';
import { string } from 'prop-types';
import * as firebase from "firebase"
import { withCookies } from "react-cookie";


/* CSS for the component */
const CreateAssessmentLabel = styled.div`
    position: relative;
    width: 842px;
    height: 30px;
    // left: 319px;
    top: 40px;

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

const StyledForm = styled(Form)`
    position: relative;
    width: 100%;
    height: 19px;
    // left: 318px;
    top: 70px;
    // border-width: 0;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: normal;

    color: #000000;
`
// Class Name. Dummy data 

const ChooseStudentContainer = styled.div`
    position: relative;
    // width: 816px;
    width: 100%;
    height: 448px;
    left: 0px;
    top: 0px;

    // border: 1px solid #C8C8C8;
    box-sizing: border-box;
    overflow: scroll;
`

const BackgroundContainer = styled(Grid)`
    position: absolute;
    width: 100vw;
    height: 100vh;
    // left: 121px;
    top: 43px;
    background: transparent;
`

/* Main Component */
class CreateSession extends React.Component<any, any>{

    public constructor(props: any) {
        super(props)
        let m = Map<string, boolean>()

        // the only problem right now is this:
        // at the initial stage of the (before login), the classroomInfodata in the props will be null
        // so how do I change it later. Repopulate the allStudentCheckStatusMap???

        // props.classroomInfoData.forEach(
        //     (d: IGoogleClassroomInfo) => {
        //         d.studentName.forEach(s =>{
        //             m = m.set(s, false)
        //         })
        //     }
        // )
        // let m2 = {}
        // this.props.classroomInfoData.forEach(
        //     (d: IGoogleClassroomInfo) => {
        //         Object.keys(d.studentNameIDMap).forEach(k => m2[k] = d.studentNameIDMap[k])
        //     }
        // )

        // this.state = {allStudentCheckStatusMap: m, title: '', googleClassroomDataInfo: props.classroomInfoData,allStudentNameIDMap: m2,
        //         isLoading: true
        //         }
        this.state = { isLoading: true }
    }

    public componentDidMount() {
        firebase.firestore().collection('users').get().then((snapshot) => {
            const docArray: Array<any> = []
            snapshot.forEach((doc) => {
                docArray.push(doc.data())

            });

            // setAllUserData : ([Object] ) => void
            // Questions is how to deal with this thing
            // this.props.setAllUserData( docArray )
            const studentID = docArray.map(d => d.playerUniqueID)
            const studentName = docArray.map(d => d.userEmail)
            const studentNameIDMap = {}
            studentName.forEach((e, i) => {
                studentNameIDMap[e] = studentID[i]
            });

            const newClassroom: IGoogleClassroomInfo = { studentID, studentName, className: "Advisory Board", studentNameIDMap }
            const classrooms = [newClassroom]
            let m = Map<string, boolean>()
            classrooms.forEach(
                (d: IGoogleClassroomInfo) => {
                    d.studentName.forEach(s => {
                        m = m.set(s, false)
                    })
                }
            )

            let m2 = Map<string, string>()
            classrooms.forEach(
                (d: IGoogleClassroomInfo) => {
                    Object.keys(d.studentNameIDMap).forEach(k => m2[k] = d.studentNameIDMap[k])
                }
            )
            this.setState({ allStudentCheckStatusMap: m, allStudentNameIDMap: m2, googleClassroomDataInfo: classrooms, isLoading: false })
        })
        .catch((err) => {
            console.log('Error ', err);
        });

        const { cookies } = this.props;
        if (cookies.get("userName") !== undefined && cookies.get("userAccessToken") !== undefined && cookies.get("userIdToken") !== undefined){
            this.props.setUser( cookies.get("userName"), cookies.get("userAccessToken"), cookies.get("userIdToken"), cookies.get("userSessions") )    
        }
    }

    // public componentDidUpdate(prevProps: any){
    //     if (prevProps.allStudentCheckStatusMap !== this.props.allStudentCheckStatusMap){
    //         let m = Map<string, boolean>()
    //         this.props.classroomInfoData.forEach(
    //             (d: IGoogleClassroomInfo) => {
    //                 d.studentName.forEach(s =>{
    //                     m = m.set(s, false)
    //                 })
    //             }
    //         )

    //         let m2 = Map<string, string>()
    //         this.props.classroomInfoData.forEach(
    //             (d: IGoogleClassroomInfo) => {
    //                 Object.keys(d.studentNameIDMap).forEach(k => m2[k] = d.studentNameIDMap[k])
    //             }
    //         )
    //         console.log(m2)
    //         this.setState({allStudentCheckStatusMap: m, allStudentNameIDMap: m2})
    //     }
    // }

    public render() {

        return (
            <UserContext.Consumer>
                {value => {
                    const { cookies } = this.props;
                    if (cookies !== undefined) {
                        if (cookies.get("userName") === undefined || cookies.get("userName") === "") {
                            setTimeout(() => {
                                this.props.history.push("/login")
                            }, 3000)
                            return <div> Redirecting to login </div>
                        }
                    }

                    return <Layout history={this.props.history} userName={value.userName} logoutAction={this.props.logoutAction}>
                        <BackgroundContainer style={{ margin: "14px 0 0 0" }}>

                            <Grid.Column width={1} />
                            <Grid.Column width={14} style={{ background: "#FFFFFF", paddingLeft: "40px", paddingRight: "40px" }} >
                                <CreateAssessmentLabel>
                                    Create a new assessment
                                </CreateAssessmentLabel>

                                <StyledForm>

                                    {/* Session title */}
                                    <Form.Field>
                                        <label style={{ display: "flex", justifyContent: "left", marginBottom: "10px" }}>Session Title</label>
                                        <input placeholder='Session Title' value={this.state.title} name="title" onChange={this.formOnChange} style={{ width: "100%" }} />
                                    </Form.Field>

                                    <div style={{ height: "24px" }} />

                                    {/* Session check box */}
                                    <Form.Field>
                                        <label style={{ display: "flex", justifyContent: "left", marginBottom: "10px" }}>
                                            Students (From Google Classroom)
                                        </label>

                                        {/* Given the data and generate it*/}
                                        <ChooseStudentContainer>
                                            {this.state.isLoading ?
                                                <div>
                                                    Data is loading
                                                </div>
                                                :
                                                <Grid padded="horizontally" style={{ marginTop: 0 }}>
                                                    {/* this is for adding the class info and it needs to be dynamically generated*/}
                                                    {/* <ChooseStudentsRow classInfo={dummyData1} allStudentsCheckitems={this.state.allStudentCheckStatusMap} setAllStudentCheckitems={this.setAllStudentItems}/>
                                    <ChooseStudentsRow classInfo={dummyData2} allStudentsCheckitems={this.state.allStudentCheckStatusMap} setAllStudentCheckitems={this.setAllStudentItems}/> */}
                                                    {this.state.googleClassroomDataInfo.map(
                                                        (data: IGoogleClassroomInfo) => {
                                                            return <ChooseStudentsRow key={data.className} classInfo={data} allStudentsCheckitems={this.state.allStudentCheckStatusMap} setAllStudentCheckitems={this.setAllStudentItems} />
                                                        }
                                                    )}
                                                </Grid>
                                            }
                                        </ChooseStudentContainer>

                                    </Form.Field>

                                    {/* Create Session */}
                                    <Form.Field>
                                        <Button onClick={this.createSession} style={{ position: "absolute", left: `0px` }}>
                                            Create Session
                        </Button>
                                    </Form.Field>

                                </StyledForm>
                            </Grid.Column>
                        </BackgroundContainer>
                    </Layout>
                }
                }
            </UserContext.Consumer>
        )
    }

    private formOnChange = (e: any) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    private formatCurrentTimeString = () => {
        const date = new Date()
        // "23 July, 2017 - Started at 4:50pm"
        return `${date.getMonth() + 1}/${date.getDate()}, ${date.getFullYear()} - Started at ${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes()}${date.getHours() >= 12 ? "pm" : "am"}`
    }

    private createSession = () => {

        const sessionName = this.state.title
        const studentMaps: Map<string, boolean> = this.state.allStudentCheckStatusMap
        const studentNames = studentMaps.filter((v, k) => v === true).keySeq().toArray()
        const studentIds = studentNames.map(n => {
            // console.log(this.state.allStudentNameIDMap[n])
            return this.state.allStudentNameIDMap[n]
        })
        const studentIDNamePair = {}
        studentIds.forEach((id, i) => {
            // Email only
            const name = studentNames[i].split("@")[0]
            studentIDNamePair[id] = name
        })

        const studentNumber = studentIds.length
        const ongoing = true;
        const startTime = this.formatCurrentTimeString()
        const sessionId = Math.random().toString(36)

        const newSessionEntry = {
            ongoing, startTime, studentNumber, studentNames, studentIds, sessionName, sessionId, studentIDNamePair
        }

        this.props.addNewSession(newSessionEntry)
        this.props.changeCurrentSession(sessionId, "dashboard")
        this.props.history.push("/livedashboard")
    }

    private setAllStudentItems = (newAllStudentItems: Map<string, boolean>) => {
        this.setState({ allStudentCheckStatusMap: newAllStudentItems })
    }
}

export default withCookies(CreateSession)