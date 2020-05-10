import { Map } from "immutable";
import * as React from "react";
import { Form, Grid } from 'semantic-ui-react';
import { ChooseStudentsRow } from "../Session/Containers/ChooseStudentContainer";
import { Layout } from "../UI/Layout";
import { IGoogleClassroomInfo } from "../data_structure/GoogleClassroomInfo";
import { UserContext } from '../Context';
import * as firebase from "firebase";
import { withCookies } from "react-cookie";
import { format } from "date-fns";
import * as StyledComponents from './CreateSessionStyledComponents';

/* Sub Component */
const RedirectingPage = () => ( <div> Redirecting to login </div> )
const LoadingPage = () => ( <div> Data is loading </div> )

const CancelButtonComponent = ( {...prop} ) => (
    <StyledComponents.CancelButton {...prop} style={{}}>
        <StyledComponents.CancelButtonText>
            Cancel
        </StyledComponents.CancelButtonText>
    </StyledComponents.CancelButton>
)

const ConfirmButtonComponent = ({...prop}) =>(
    <StyledComponents.ConfirmButton {...prop}>
        <StyledComponents.ConfirmButtonText>
            Create Session
        </StyledComponents.ConfirmButtonText>
    </StyledComponents.ConfirmButton>
)

const SessionTitleInputComponent = ({sessionTitleLabel = "Session Title", ...props}) => (
    <React.Fragment>
        <StyledComponents.SessionTitleLabel>{sessionTitleLabel}</StyledComponents.SessionTitleLabel>
        <input placeholder='Session Title' {...props} style={{ width: "100%" }}/>
    </React.Fragment>
)

const ChooseStudentComponent = ( {isLoading, studentTitleLabel="Students (From Google Classroom)", 
            googleClassroomDataInfo, allStudentCheckStatusMap, setAllStudentItems } ) =>(
    <React.Fragment>
        <StyledComponents.StudentTitleLabel>
            {studentTitleLabel}
        </StyledComponents.StudentTitleLabel>

        {/* Given the data and generate it*/}
        <StyledComponents.ChooseStudentContainer>
            {isLoading ?
                <LoadingPage/>
                :
                <Grid padded="horizontally" style={{ marginTop: 0 }}>
                    {googleClassroomDataInfo.map(
                        (data: IGoogleClassroomInfo) =>
                            <ChooseStudentsRow key={data.className} classInfo={data}
                                allStudentsCheckitems={allStudentCheckStatusMap} setAllStudentCheckitems={setAllStudentItems} />
                    )}
                </Grid>
            }
        </StyledComponents.ChooseStudentContainer>
    </React.Fragment>   
 )

/* Main Component */
class CreateSession extends React.Component<any, any>{

    public constructor(props: any) {
        super(props)
        this.state = { isLoading: true, title: "" }
    }

    public covertAllUsersIntoAdvisoryBoardClassroom = (snapshot) => {
        const docArray: Array<any> = []
        snapshot.forEach(doc => docArray.push(doc.data()))

        const studentID = docArray.map(d => d.playerUniqueID)
        const studentName = docArray.map(d => d.userEmail)
        const studentNameIDMap = {}
        studentName.forEach((e, i) => studentNameIDMap[e] = studentID[i])

        // This is hardcoded to the advisory board
        const newClassroom: IGoogleClassroomInfo = { studentID, studentName, className: "Advisory Board", studentNameIDMap }
        const classrooms = [newClassroom]
        return classrooms
    }

    public createStudentCheckStatusMap = (classrooms: IGoogleClassroomInfo[]) => {
        let m = Map<string, boolean>()
        classrooms.forEach(
            (d: IGoogleClassroomInfo) => {
                d.studentName.forEach(s =>
                    m = m.set(s, false))
            }
        )
        return m
    }

    public createNameIDMap = (classrooms: IGoogleClassroomInfo[]) =>{
        let m2 = Map<string, string>()
        classrooms.forEach(
            (d: IGoogleClassroomInfo) => {
                Object.keys(d.studentNameIDMap).forEach(k => m2[k] = d.studentNameIDMap[k])
            }
        )
        return m2
    }

    

    public componentDidMount() {
        firebase.firestore().collection('users').get().then(snapshot => {
            const classrooms = this.covertAllUsersIntoAdvisoryBoardClassroom(snapshot)
            const allStudentCheckStatusMap = this.createStudentCheckStatusMap(classrooms)
            const allStudentNameIDMap = this.createNameIDMap(classrooms)

            this.setState({ allStudentCheckStatusMap, allStudentNameIDMap, googleClassroomDataInfo: classrooms, isLoading: false })
        }).catch(err => console.log('Error ', err));
        
        // I don't think this flow works. I should set user first, if not, I need to. hmm. It's duplicated???
        const { cookies } = this.props;
        if (cookies.get("userName") !== undefined && cookies.get("userAccessToken") !== undefined && cookies.get("userIdToken") !== undefined && cookies.get("userEmail")!==undefined) {
            this.props.setUser(cookies.get("userName"), cookies.get("userAccessToken"), cookies.get("userIdToken"), cookies.get("userEmail"), cookies.get("userKey"), cookies.get("userSessions"))
        }
    }

    public render() {
        const { cookies } = this.props;
        const cookieNotHasUserName = () => cookies.get("userName") === undefined || cookies.get("userName") === ""

        return (
            <UserContext.Consumer>
                {value => {
                    if (cookies !== undefined) {
                        if (cookieNotHasUserName()) {
                            setTimeout(() => this.props.history.push("/login"), 3000)
                            return <RedirectingPage/>
                        }
                    }

                    return <Layout history={this.props.history} userName={value.userName} logoutAction={this.props.logoutAction}>
                        <StyledComponents.BackgroundContainer >
                            <Grid.Row>
                                <Grid.Column width={1} />
                                {/* Why padding 40? */}
                                <Grid.Column width={14} style={{ background: "#FFFFFF", paddingRight: "40px" }} >
                                    <StyledComponents.CreateAssessmentLabel>
                                        Create a new assessment
                                    </StyledComponents.CreateAssessmentLabel>

                                    <StyledComponents.StyledForm>
                                        <Form.Field style={{marginBottom: "24px"}}>
                                            <SessionTitleInputComponent placeholder='Session Title' value={this.state.title} name="title" onChange={this.formOnChange}/>
                                        </Form.Field>

                                        <Form.Field>
                                            <ChooseStudentComponent 
                                                    isLoading={this.state.isLoading} googleClassroomDataInfo={this.state.googleClassroomDataInfo}
                                                    allStudentCheckStatusMap={this.state.allStudentCheckStatusMap} setAllStudentItems={this.setAllStudentItems}
                                            />
                                        </Form.Field>

                                        <Form.Field style={{ display: "flex", flexDirection: "row" }}>
                                                <ConfirmButtonComponent disabled={this.state.title === "" || this.noStudentIsSelected()} onClick={this.createSession} style={{ left: `0px` }}/>  
                                                <CancelButtonComponent onClick={this.cancelTheNewSession}/>
                                        </Form.Field>
                                    </StyledComponents.StyledForm>
                                </Grid.Column>
                            </Grid.Row>
                        </StyledComponents.BackgroundContainer>
                    </Layout>
                }}
            </UserContext.Consumer>
        )
    }

    private noStudentIsSelected = () =>
        this.state.allStudentCheckStatusMap !== undefined ?
            this.state.allStudentCheckStatusMap.filter((checked) => checked === true).toArray() === 0 :
            true

    private setAllStudentItems = (newAllStudentItems: Map<string, boolean>) => this.setState({ allStudentCheckStatusMap: newAllStudentItems })

    private formOnChange = (e: any) => this.setState({ [e.target.name]: e.target.value })

    private timeStringFormat = (date: Date) =>
        format(date, "'Started at' hh:mmaaaa',' LL/dd/yyyy")
        // `${date.getMonth() + 1}/${date.getDate()}, ${date.getFullYear()} - Started at ${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes()}${date.getHours() >= 12 ? "pm" : "am"}`

    private formatCurrentTimeString = () => this.timeStringFormat(new Date())

    private cancelTheNewSession = event => this.props.history.push("/sessions")

    private splitTheNameFromEmail = (emailAddress: string) => emailAddress.split("@")[0]

    private navigateToLiveDashboard = sessionID => {
        this.props.changeCurrentSession(sessionID, "dashboard");
        this.props.history.push("/livedashboard")
    }

    private createSession = () => {
        const sessionName = this.state.title
        const studentMaps: Map<string, boolean> = this.state.allStudentCheckStatusMap
        const studentNames = studentMaps.filter((checked, studentName) => checked === true).keySeq().toArray()
        const studentIds = studentNames.map(n => this.state.allStudentNameIDMap[n])

        const studentIDNamePair = {}
        studentIds.forEach((id, i) => studentIDNamePair[id] = this.splitTheNameFromEmail(studentNames[i]))

        const studentNumber = studentIds.length
        const ongoing = true;
        // const startTime = this.formatCurrentTimeString()
        const startTime = new Date();
        const sessionId = Math.random().toString(36)

        const newSessionEntry = {
            ongoing, startTime, studentNumber, studentNames, studentIds, sessionName, sessionId, studentIDNamePair
        }

        this.props.addNewSession(newSessionEntry)
        this.navigateToLiveDashboard(sessionId)
    }
}

export default withCookies(CreateSession)