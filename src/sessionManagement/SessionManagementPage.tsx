import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from "react";
import styled from "styled-components"
import { ISession, UserContext } from "../Context"
import { Layout } from "../Layout"
import { Grid, GridColumn, GridRow, Icon } from "semantic-ui-react"
import { withCookies } from "react-cookie";
import * as globalStyle from "../AppStyle"
import * as firebase from "firebase"
import {format} from "date-fns"

/* CSS For the components */
const DeleteIcon = styled(FontAwesomeIcon)`
    position: relative;
    width: 20px;
    height: 20px;
    curosr: pointer;
`

const DashboardIcon = styled(FontAwesomeIcon)`
    position: relative;
    width: 25px;
    height: 21px;
    // left: 510px;
    cursor: pointer; 
    margin-right: 8px;
`

const ReportIcon = styled(FontAwesomeIcon)`
    position: relative;
    width: 15px;
    height: 20px;
    cursor: pointer;
    margin-right: 8px;
`

const ViewButtonText = styled(globalStyle.Header100)`
    line-height:0px;    

    color:${globalStyle.colors.baseBlueStone};
    
`

const ViewActionButton = styled.button`
    border-radius: 6px;
    background: ${globalStyle.colors.lightNeutral25};
    // background: #F4F4F4;
    border-width: 0px;
    border-color: rgb(0,0,0,0.1);
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 35px;
    width: 120px;

    justify-content: center;
    margin-right: 8px;
    text-decoration: none;
    :hover{
        background-color: ${globalStyle.colors.basePacificBlue25};
    }

    &.active { 
        :hover{
        background-color: #357AE0;
        }
        background-color: ${globalStyle.colors.basePacificBlue25};
    },
    outline: none;
`

const DashboardButton = styled(ViewActionButton)`
    width: 120px;
    margin-right: 8px;
    margin-left: 12px;
`

const DeleteButton = styled(ViewActionButton)`
    width: 40px; 
    margin-right: 0;
    
`

const EditButton = styled(ViewActionButton)`
    width : 40px;
`

const ReportButton = styled(ViewActionButton)`
    width: 120px;
`

const SessionLabel = styled(globalStyle.Header600)`
    width: 85px;
    height: 22px;
    text-align: left;
    display: flex;
    align-items: center;
    color: ${globalStyle.colors.baseBlueStone};
`

const CreatePrompt = styled.div`
    position: absolute;
    width: 664px;
    height: 37px;
    left: 387px;
    top: 364px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 31px;
    line-height: normal;

    color: #000000;
`

const CreateNewButton = styled.div`
    position: absolute;
    width: 221px;
    height: 44px;
    left: 609px;
    top: 442px;

    border: 1px solid #818181;
    box-sizing: border-box;
    border-radius: 10px;
    display: flex;

    background-color: ${globalStyle.colors.basePacificBlue};
    justify-content: center;
    align-items:center;
    cursor: pointer;

    :hover {
        background-color: ${globalStyle.colors.basePacificBlueActive}
    }
`

const CreateNewButtonText = styled(globalStyle.Header500)`
    font-weight: normal;
    color: ${globalStyle.colors.baseDoctor}
`

const CreateNewButtonSmall = styled.div`

    &&& {
    position: absolute;
    width: 184px;
    height: 38px;
    // left: 1142px;
    right: 14px;

    background: #F4F4F4;
    box-sizing: border-box;
    border-radius: 6px;
    background-color: ${globalStyle.colors.basePacificBlue};

    display: flex;
    justify-content: center;
    align-items:center;
    cursor: pointer;


    :hover{
        background-color: ${globalStyle.colors.basePacificBlueActive};
      }
  
      &.active {
        
        :hover{
          background-color:${globalStyle.colors.baseBlueStone};
          color: white;
        }
        background-color:${globalStyle.colors.basePacificBlueActive};
        color: white;
      }
    }
`

const SessionRowContainer = styled(GridRow)`
    position: relative;
    // width: 1132px;
    width: 100%;
    
    &:first-of-type {
        margin-top: 0px; 
    }

    margin-top: 15px;
    margin-bottom: 0px;
    display: flex;
    alignItems: center;

    &&& {
        padding-bottom:4px;
    }
`

const SessionNameText = styled(globalStyle.Header500)`
    position: relative;
    height: 24px;
    top: 0px;
    margin-bottom: 0;

    display: flex;
    align-items: center;
    text-align: left;

    color: ${globalStyle.colors.baseBlueStone};
`

const SessionStartTimeText = styled(globalStyle.Header200)`
    width: 422px;
    height: 19px;
    top: 42px;

    text-align: left;

    color: ${globalStyle.colors.baseBlueStone50};
`

const StudentNumber = styled(globalStyle.Header400) <{ isOnGoing: boolean }>`
    position: relative;
    width: 96.98px;
    height: 22px;
    top: 1px;

    color: ${globalStyle.colors.baseBlueStone};
    margin-bottom: 0px;
    margin-right: 8px;
`

const OngoingLabel = styled(globalStyle.Header300)`
    position: relative;
    height: 25px;
    left: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    vertical-align: middle;
    background: ${globalStyle.colors.basePacificBlue};
    color: ${globalStyle.colors.baseDoctor}
    border-radius: 8px;

    width: 110px;
`

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
                                                <SessionLabel> Sessions </SessionLabel>
                                            </Grid.Row>
                                        </Grid>
                                    </GridColumn>
                                </GridRow>
                            </Grid>

                            <CreatePrompt> Seems like you have no previous PFACS Session </CreatePrompt>
                            <CreateNewButton onClick={this.navigateToCreation}>
                                <p> Create a new session </p>
                            </CreateNewButton>
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
                                    <SessionLabel> Sessions </SessionLabel>
                                </GridColumn>

                                <GridColumn width="7" style={{ display: "flex", alignItems: "center" }} >
                                    <CreateNewButtonSmall onClick={this.navigateToCreation}>
                                        <CreateNewButtonText> Create a new session </CreateNewButtonText>
                                    </CreateNewButtonSmall>
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
                        <SessionRowContainer key={dummy.sessionName}>
                            <GridColumn style={{ display: "flex", alignItems: "center" }} width={3}>
                                <SessionNameText>{dummy.sessionName} </SessionNameText>
                            </GridColumn>

                            <GridColumn style={{ display: "flex", alignItems: "center" }} width={5}>
                                {dummy.ongoing ? <OngoingLabel> Ongoing </OngoingLabel> : <div />}
                            </GridColumn>

                            <GridColumn style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }} width={8}>
                                <StudentNumber isOnGoing={dummy.ongoing}> {dummy.studentNumber} Students </StudentNumber>

                                <DashboardButton onClick={() => this.dashboardClick(dummy.sessionId)}>
                                    <span>
                                        <DashboardIcon icon="tachometer-alt" size="2x" />
                                    </span>

                                    <ViewButtonText> Dashboard </ViewButtonText>
                                </DashboardButton>

                                <ReportButton onClick={() => this.reportClick(dummy.sessionId)}>
                                    <span>
                                        <ReportIcon icon={["far", "file-alt"]} size="2x" />
                                    </span>

                                    <ViewButtonText> Report </ViewButtonText>
                                </ReportButton>

                                <EditButton onClick={() => this.modifyThisSession(dummy.sessionId)}>
                                    <span>
                                        <DeleteIcon key={"edit"} icon={["far", "edit"]} size="2x" />
                                    </span>
                                </EditButton>

                                <DeleteButton onClick={() => this.props.deleteASession(dummy)}>
                                    <span>
                                        <DeleteIcon icon={["far", "trash-alt"]} size="2x" style={{ color: "red" }} />
                                    </span>
                                </DeleteButton>
                            </GridColumn>

                        </SessionRowContainer>
                        <Grid.Row style={{ paddingTop: 0 }}>
                            <GridColumn>
                                <SessionStartTimeText> {format(dummy.startTime, "'Started at' hh:mmaaaa',' LL/dd/yyyy")} </SessionStartTimeText>
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