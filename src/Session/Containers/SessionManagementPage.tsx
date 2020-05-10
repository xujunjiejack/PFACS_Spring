import * as React from "react";
import { ISession, UserContext } from "../../Context";
import { Layout } from "../../UI/Layout";
import { Grid, GridColumn, GridRow, Icon } from "semantic-ui-react";
import { withCookies } from "react-cookie";
import * as firebase from "firebase";
import {format} from "date-fns";
import * as StyledComponents from '../StyledComponents/SessionStyledComponents';

/* Main Component */
class Session extends React.Component<any, any> {

    public constructor(props) {
        super(props)
        console.log("Testing rules")
        // firebase.firestore().collection('access-test').where("teachers", "array-contains", "EaK1hFdseVTlqSPNCSi1sOJgqo72")
        // .get().then(snapShot => snapShot.docs.forEach(d => console.log(d.id))).catch(console.log)

    }

    public render() {
        const { cookies } = this.props;
        const userNameExistsInCookie = (cookies) => cookies.get("userName") !== undefined && cookies.get("userName") !== ""
        return (
            <UserContext.Consumer>
                {value => {
                    if (cookies !== undefined) {
                        if (!userNameExistsInCookie(cookies)) {
                            setTimeout(() => this.props.history.push("/login"), 3000)
                            return <div> Redirecting to login </div>
                        }
                    }
                    return this.createThisPage(value)
                }}
            </UserContext.Consumer>
        )
    }

    public componentDidMount() {
        const { cookies } = this.props;
        console.log("Component did mount")
        if (cookies.get("userName") !== undefined && cookies.get("userAccessToken") !== undefined && cookies.get("userIdToken") !== undefined && cookies.get("userEmail")!== undefined) {
            this.props.setUser(cookies.get("userName"), cookies.get("userAccessToken"), cookies.get("userIdToken"), cookies.get("userEemail"), cookies.get("userKey"), cookies.get("userSessions"), false)
            
            // Testing code for grabbing sessions from the firebase. 
            console.log(cookies.get("userKey"))
            const sessions = firebase.firestore().collection("TeacherSessions").where("owner", "==", cookies.get("userKey")).get().then(
                snapshot => {
                    const sessionsImported = [] as any[]
                    snapshot.forEach( doc => {
                        const data = doc.data()
                        console.log(doc.id)
                        console.log(data)
                        sessionsImported.push(data as any)
                    })
                    
                }
            )
            
        }
    }

    private navigateToCreation = () => this.props.history.push("/createsession")

    private createThisPage = (context: any) => {

        const sessionNumber = context.userSessions.length;
        switch (sessionNumber) {

            case 0:
                return (
                    <Layout history={this.props.history} userName={context.userName} logoutAction={this.props.logoutAction}>
                        <div>
                            <Grid style={{ position: "absolute", top: "43px", width: "100%" }}>
                                <GridRow>
                                    <GridColumn width="1" />
                                    <GridColumn width="14" style={{ background: "#FFFFFF", width: "100%", height: "75vh", margin: "14px", padding: "50px 50px 50px 50px" }}>
                                        <Grid>
                                            <Grid.Row>
                                                <StyledComponents.SessionLabel> Sessions </StyledComponents.SessionLabel>
                                            </Grid.Row>
                                        </Grid>
                                    </GridColumn>
                                </GridRow>
                            </Grid>

                            <StyledComponents.CreatePrompt> Seems like you have no previous PFACS Session </StyledComponents.CreatePrompt>
                            <StyledComponents.CreateNewButton onClick={this.navigateToCreation}>
                                <p> Create a new session </p>
                            </StyledComponents.CreateNewButton>
                        </div>
                    </Layout>
                )

            default:
                return (
                    <Layout history={this.props.history} userName={context.userName} logoutAction={this.props.logoutAction}>
                        <Grid style={{ position: "relative", top: "0", width: "100%", paddingTop: "0", paddingBottom: "50px" }}>
                            <GridRow style={{ width: "100%", height: "100px" }}>
                                <GridColumn width="1" />

                                <GridColumn width="7" style={{ display: "flex", alignItems: "center" }}>
                                    <StyledComponents.SessionLabel> Sessions </StyledComponents.SessionLabel>
                                </GridColumn>

                                <GridColumn width="7" style={{ display: "flex", alignItems: "center" }} >
                                    <StyledComponents.CreateNewButtonSmall onClick={this.navigateToCreation}>
                                        <StyledComponents.CreateNewButtonText> Create a new session </StyledComponents.CreateNewButtonText>
                                    </StyledComponents.CreateNewButtonSmall>
                                </GridColumn>
                            </GridRow>

                            <GridRow style={{ width: "100%", padding: 0, marginTop: "28px" }}>
                                <GridColumn width={1}></GridColumn>
                                <GridColumn width={14}>
                                    <Grid>
                                        {this.createSessions(context.userSessions)}
                                    </Grid>
                                </GridColumn>
                            </GridRow>
                        </Grid>
                    </Layout>
                )
        }
    }

    private createSessions = (dummyDataList: ISession[]) => {
        return (
            <React.Fragment>
                {dummyDataList.map(dummy =>
                    // <li key={dummy.sessionName}>
                    <React.Fragment key={dummy.sessionName}>
                        <StyledComponents.SessionRowContainer key={dummy.sessionName}>
                            <GridColumn style={{ display: "flex", alignItems: "center" }} width={3}>
                                <StyledComponents.SessionNameText>{dummy.sessionName} </StyledComponents.SessionNameText>
                            </GridColumn>

                            <GridColumn style={{ display: "flex", alignItems: "center" }} width={5}>
                                {dummy.ongoing ? <StyledComponents.OngoingLabel> Ongoing </StyledComponents.OngoingLabel> : <div />}
                            </GridColumn>

                            <GridColumn style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }} width={8}>
                                <StyledComponents.StudentNumber isOnGoing={dummy.ongoing}> {dummy.studentNumber} Students </StyledComponents.StudentNumber>

                                <StyledComponents.DashboardButton onClick={() => this.dashboardClick(dummy.sessionId)}>
                                    <span>
                                        <StyledComponents.DashboardIcon icon="tachometer-alt" size="2x" />
                                    </span>

                                    <StyledComponents.ViewButtonText> Dashboard </StyledComponents.ViewButtonText>
                                </StyledComponents.DashboardButton>

                                <StyledComponents.ReportButton onClick={() => this.reportClick(dummy.sessionId)}>
                                    <span>
                                        <StyledComponents.ReportIcon icon={["far", "file-alt"]} size="2x" />
                                    </span>

                                    <StyledComponents.ViewButtonText> Report </StyledComponents.ViewButtonText>
                                </StyledComponents.ReportButton>

                                <StyledComponents.EditButton onClick={() => this.modifyThisSession(dummy.sessionId)}>
                                    <span>
                                        <StyledComponents.DeleteIcon key={"edit"} icon={["far", "edit"]} size="2x" />
                                    </span>
                                </StyledComponents.EditButton>

                                <StyledComponents.DeleteButton onClick={() => this.props.deleteASession(dummy)}>
                                    <span>
                                        <StyledComponents.DeleteIcon icon={["far", "trash-alt"]} size="2x" style={{ color: "red" }} />
                                    </span>
                                </StyledComponents.DeleteButton>
                            </GridColumn>

                        </StyledComponents.SessionRowContainer>
                        <Grid.Row style={{ paddingTop: 0 }}>
                            <GridColumn>
                                <StyledComponents.SessionStartTimeText> {format(dummy.startTime, "'Started at' hh:mmaaaa',' LL/dd/yyyy")} </StyledComponents.SessionStartTimeText>
                            </GridColumn>
                        </Grid.Row>
                        {/* </li> */}
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }

    private dashboardClick = (sessionId: string) => {
        this.props.changeCurrentSession(sessionId, "dashboard")
        this.props.history.push("/livedashboard")
    }

    private reportClick = (sessionId: string) => {
        this.props.changeCurrentSession(sessionId, "report")
        this.props.history.push("/livedashboard")
    }

    private modifyThisSession = (sessionId: string) => {
        this.props.modifyOneSession(sessionId)
        this.props.history.push("/modifysession")
    }
}

export default withCookies(Session)