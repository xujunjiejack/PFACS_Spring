import { Map } from "immutable";
import * as React from "react";
import { Button, Form, Grid } from 'semantic-ui-react'
import styled from "styled-components"
import { ChooseStudentsRow } from "./ChooseStudentContainer"
import { Layout } from "../Layout"
import { IGoogleClassroomInfo } from "../data_structure/GoogleClassroomInfo"
import { UserContext } from '../Context';
import * as firebase from "firebase"
import { withCookies } from "react-cookie";
import * as globalStyle from "../AppStyle";
import { ISession } from "../Context"

// I need to create a better wrap. 

/* CSS for the component */
const CreateAssessmentLabel = styled(globalStyle.Header600)`
    position: relative;
    width: 842px;
    height: 30px;
    top: 40px;

    color: ${globalStyle.colors.baseBlueStone};
    display: flex;
    justify-content: left;
    align-items:center;
`

const StyledForm = styled(Form)`
    position: relative;
    width: 100%;
    height: 19px;
    top: 70px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: normal;

    color: #000000;
`

const ChooseStudentContainer = styled.div`
    position: relative;
    width: 100%;
    height: 448px;
    left: 0px;
    top: 0px;

    box-sizing: border-box;
    overflow: scroll;
`

const BackgroundContainer = styled(Grid)`
    position: absolute;
    width: 100vw;
    height: 100vh;
    // left: 121px;
    top: 40px;
    background: transparent;
`

const SessionTitleLabel = styled(globalStyle.Header500)`
    color: ${globalStyle.colors.baseBlueStone};
    display: flex; 
    justify-content: left;
    margin-bottom: 10px
`

const StudentTitleLabel = styled(globalStyle.Header500)`
    color: ${globalStyle.colors.baseBlueStone};
    display: flex; 
    justify-content: left;
    margin-bottom: 10px
`

const ConfirmButton = styled(Button)`
    &&& {
        left: 0;
        background: ${globalStyle.colors.basePacificBlue};
        color: ${globalStyle.colors.baseDoctor};
    }
`

const CancelButton = styled(Button)`
    background: ${globalStyle.colors.lightNeutral50};
    color: ${globalStyle.colors.baseBlueStone50};
`

const ConfirmButtonText = styled(globalStyle.Header500)`
    color: ${globalStyle.colors.baseDoctor};
`

const CancelButtonText = styled(globalStyle.Header500)`
    color: ${globalStyle.colors.baseBlueStone50};
`

const Loading = (props) => (
    <div>
        Data is loading
    </div>
)


/* Main Component */
class ModifySession extends React.Component<any, any>{

    public constructor(props: any) {
        super(props)
        // const sessionToBeModified = this.props.sessionToBeModified as ISession
        this.state = { isLoading: true, sessionToBeModified: {}, title: "" }
        // sessionToBeModified interface as ISession     
    }

    public componentDidMount() {

        firebase.firestore().collection('users').get().then((snapshot) => {
            const docArray: Array<any> = []
            snapshot.forEach((doc) => {
                docArray.push(doc.data())
            });

            const studentID = docArray.map(d => d.playerUniqueID)
            const studentName = docArray.map(d => d.userEmail)
            const studentNameIDMap = {}
            studentName.forEach((e, i) => {
                studentNameIDMap[e] = studentID[i]
            });

            const newClassroom: IGoogleClassroomInfo = { studentID, studentName, className: "Advisory Board", studentNameIDMap }
            const classrooms = [newClassroom]
            let m = Map<string, boolean>()

            // One problem I'm going to have is to have double name
            if (this.currentSessionData) console.log(this.currentSessionData.studentIds)

            classrooms.forEach(
                (d: IGoogleClassroomInfo) => {
                    d.studentName.forEach(s => {
                        if (this.currentSessionData) {
                            if (this.currentSessionData.studentNames) {
                                m = m.set(s, this.currentSessionData.studentNames.includes(s))
                                return
                            }
                        }
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
            this.setState({ allStudentCheckStatusMap: m, allStudentNameIDMap: m2, googleClassroomDataInfo: classrooms, isLoading: false, })
        })
            .catch((err) => {
                console.log('Error ', err);
            });

        const { cookies } = this.props;
        if (cookies.get("userName") !== undefined && cookies.get("userAccessToken") !== undefined && cookies.get("userIdToken") !== undefined && cookies.get("userEmail")!==undefined) {
            this.props.setUser(cookies.get("userName"), cookies.get("userAccessToken"), cookies.get("userIdToken"),  cookies.get("userEmail"), cookies.get("userKey"), cookies.get("userSessions"))
        }

        if (this.currentSessionData)
            this.setState({ title: this.currentSessionData.sessionName })
    }


    public render() {
        const { cookies } = this.props;
        const cookieNotHasUserName = () => cookies.get("userName") === undefined || cookies.get("userName") === ""

        return (
            <UserContext.Consumer>
                {value => {
                    if (cookies !== undefined) {
                        if (cookieNotHasUserName()) {
                            setTimeout(() => {
                                this.props.history.push("/login")
                            }, 3000)
                            return <div> Redirecting to login </div>
                        }
                    }

                    this.currentSessionData = this.getSessionData(value.userSessions, this.props.modificationSessionID)

                    return <Layout history={this.props.history} userName={value.userName} logoutAction={this.props.logoutAction}>
                        <BackgroundContainer >
                            <Grid.Row style={{}}>

                                <Grid.Column width={1} />
                                <Grid.Column width={14} style={{ background: "#FFFFFF", paddingRight: "40px" }} >
                                    <CreateAssessmentLabel>
                                        Modify an existing assessment
                                </CreateAssessmentLabel>

                                    <StyledForm>
                                        {/* Session title */}
                                        <Form.Field>
                                            <SessionTitleLabel>Session Title</SessionTitleLabel>
                                            <input placeholder='Session Title' value={this.state.title} name="title" onChange={this.formOnChange} style={{ width: "100%" }} />
                                        </Form.Field>

                                        <div style={{ height: "24px" }} />

                                        {/* Session check box */}
                                        <Form.Field>
                                            <StudentTitleLabel>
                                                Students (From Google Classroom)
                                            </StudentTitleLabel>

                                            {/* Given the data and generate it*/}
                                            <ChooseStudentContainer>
                                                {this.state.isLoading ?
                                                    <Loading/>
                                                    :
                                                    <Grid padded="horizontally" style={{ marginTop: 0 }}>
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
                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                <ConfirmButton disabled={this.state.title === "" || this.noStudentIsSelected()} onClick={this.modifySession} style={{ left: `0px` }}>
                                                    <ConfirmButtonText>
                                                        Modify the Session
                                                </ConfirmButtonText>
                                                </ConfirmButton>

                                                <CancelButton onClick={this.cancelTheNewSession} style={{}}>
                                                    <CancelButtonText>
                                                        Cancel
                                                </CancelButtonText>
                                                </CancelButton>
                                            </div>
                                        </Form.Field>

                                    </StyledForm>
                                </Grid.Column>
                            </Grid.Row>
                        </BackgroundContainer>
                    </Layout>
                }
                }
            </UserContext.Consumer>
        )
    }

    private currentSessionData: ISession | undefined

    private noStudentIsSelected = () =>
        this.state.allStudentCheckStatusMap !== undefined ?
            this.state.allStudentCheckStatusMap.filter((checked) => checked === true).toArray() === 0 :
            true

    private setAllStudentItems = (newAllStudentItems: Map<string, boolean>) => this.setState({ allStudentCheckStatusMap: newAllStudentItems })

    private formOnChange = (e: any) => this.setState({ [e.target.name]: e.target.value })

    private timeStringFormat = (date: Date) =>
        `${date.getMonth() + 1}/${date.getDate()}, ${date.getFullYear()} - Started at ${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes()}${date.getHours() >= 12 ? "pm" : "am"}`

    private formatCurrentTimeString = () => this.timeStringFormat(new Date())

    private cancelTheNewSession = (event) => {
        this.props.history.push("/sessions")
    }

    private modifySession = () => {
        const sessionToBeModified = this.currentSessionData as ISession;
        const sessionName = this.state.title
        const studentMaps: Map<string, boolean> = this.state.allStudentCheckStatusMap
        const studentNames = studentMaps.filter(checked => checked === true).keySeq().toArray()
        const studentIds = studentNames.map(n => {
            return this.state.allStudentNameIDMap[n]
        })
        const studentIDNamePair = {}
        studentIds.forEach((id, i) => {
            const name = studentNames[i].split("@")[0]
            studentIDNamePair[id] = name
        })

        const studentNumber = studentIds.length
        const ongoing = sessionToBeModified.ongoing;
        const startTime = sessionToBeModified.startTime
        const sessionId = sessionToBeModified.sessionId

        const sessionModified = {
            ongoing, startTime, studentNumber, studentNames, studentIds, sessionName, sessionId, studentIDNamePair
        }
        this.props.modifySession(sessionModified)
        this.props.history.goBack()
    }

    private createSession = () => {
        const sessionName = this.state.title
        const studentMaps: Map<string, boolean> = this.state.allStudentCheckStatusMap
        const studentNames = studentMaps.filter((checked, studentName) => checked === true).keySeq().toArray()
        const studentIds = studentNames.map(n => {
            return this.state.allStudentNameIDMap[n]
        })
        const studentIDNamePair = {}
        studentIds.forEach((id, i) => {
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

        this.props.history.goBack()
    }

    private getSessionData = (allSessions: ISession[], currentSessionId: string): ISession | undefined => {
        return allSessions.find(s => s.sessionId === currentSessionId)
    }
}



export default withCookies(ModifySession)