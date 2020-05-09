// import axios from "axios"
import * as React from 'react';
import { Grid } from "semantic-ui-react"
import {ISession, UserContext} from "../../Context"
import {Student, StudentStatus} from '../../data_structure/Student';
import DetailedReport from "./DetailedReport"
import {Layout} from "../../UI/Layout"
import LiveDashboard from "./LiveDashboard";  
// import * as openSocket from 'socket.io-client'; 
import {idNamesPair} from "../../MockData/studentsIDsName";
import { withCookies } from "react-cookie";
import {format} from "date-fns";
import * as StyledComponents from '../StyledComponents/SessionViewStyledComponents';

/* Main Component */
class SessionView extends React.Component <any, any> {

    public constructor(props: any){
        super(props) 
        this.state = {studentData: [], currentView: this.props.currentSessionView, currentSessionId: this.props.currentSessionId}
    }

    public wrapDataThroughIdNamePair = (studentIds: string[], nameIdPair): Student[] => {
      // just for dummy data 
      if (nameIdPair === undefined) {
        nameIdPair = idNamesPair
      }

      return studentIds.map((s,i) => {
        return new Student(nameIdPair[s] , StudentStatus.Idle, s, 10000, 10, 100000, "Make songs");
      });
    }
    
    public componentDidMount(){
      const { cookies } = this.props;
        if (cookies.get("userName") !== undefined && cookies.get("userAccessToken") !== undefined && cookies.get("userIdToken") !== undefined && cookies.get("userEmail")!== undefined){
            this.props.setUser( cookies.get("userName"), cookies.get("userAccessToken"), cookies.get("userIdToken"), cookies.get("userEmail"), cookies.get("userKey"),  cookies.get("userSessions") )    
        }
    }

    public componentDidUpdate(prevProps: any){
        if (prevProps.currentSessionId !== this.props.currentSessionId || prevProps.currentView !== this.props.currentView ) {
          this.setState({
            currentView: this.props.currentSessionView,
            currentSessionId: this.props.currentSessionId
          })
        }
    }
    
    public render(){

        return (
            <UserContext.Consumer>
                {value => {
                  const { cookies } = this.props;
                  if (cookies !== undefined){
                      if (cookies.get("userName") === undefined || cookies.get("userName")=== ""){
                          setTimeout(()=>{
                              this.props.history.push("/login")
                          }, 3000)
                          return <div> Redirecting to login </div>
                      }
                  }
                  
                  return <Layout history={this.props.history} userName={value.userName} logoutAction={this.props.logoutAction}>

                       {/* <p style={{height: `5vh`}}>     */}
                        {/*  */}
                       {/* </p> */}
                    
                      <Grid style={{position: "relative"}}>
                      <Grid.Row> 
                      <Grid.Column width="1"/>
                      <Grid.Column width="14">
                        <StyledComponents.HeaderContainer>
                          <div style={{position:"absolute", left: "0px", display: "flex", flexDirection:"column"}}>
                            <StyledComponents.Title>
                              { this.getSessionTitle(value.userSessions, this.state.currentSessionId) }
                            </StyledComponents.Title>
        
                            <StyledComponents.StartTime>
                              { this.getSessionTime(value.userSessions, this.state.currentSessionId) }
                            </StyledComponents.StartTime>
                          </div>

                          <StyledComponents.StyledButtonGroup>                              
                            <StyledComponents.DashboardButton style={{fontSize: "20px", width:"200px"}} onClick={this.dashboardClick} className={ this.state.currentView === "dashboard" ? "active": "" }>
                              <StyledComponents.DashboardButtonText>
                                Dashboard
                              </StyledComponents.DashboardButtonText>
                            </StyledComponents.DashboardButton>
        
                            <StyledComponents.EndSessionButton style={{fontSize: "20px", width:"200px"}} onClick={this.reportClick} className={this.state.currentView === "report" ? "active": ""}>
                              <StyledComponents.ReportButtonText>
                                Report
                              </StyledComponents.ReportButtonText>
                            </StyledComponents.EndSessionButton>
                          </StyledComponents.StyledButtonGroup>

                        </StyledComponents.HeaderContainer>
                        </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{padding:"8px 8px 0 0"}}>
                          <Grid.Column width="1"/>
                          <Grid.Column width="14" >
                          <div style={{height:"1px", backgroundColor:"rgba(0, 0, 0, 0.08)", width:"100%"}}/>
                          </Grid.Column>
                        
                        </Grid.Row>
                      </Grid>

                       <br/>
                       {this.state.currentView === "dashboard"? 
                          <LiveDashboard studentData={this.getStudentData(value.userSessions, this.state.currentSessionId)} sessionData={this.getSessionData(value.userSessions, this.state.currentSessionId)}/> 
                          : 
                          <DetailedReport sessionData={this.getSessionData(value.userSessions, this.state.currentSessionId)}> Detailed report </DetailedReport>}  
                       </Layout>
                     }
                  }
            </UserContext.Consumer>
        )
    }

    private getStudentData = (allSessions: ISession[], currentSessionId: string) => {
        const session = this.getSessionData(allSessions, currentSessionId)
        if (session){
          const wrappedData = this.wrapDataThroughIdNamePair(session.studentIds, session.studentIDNamePair)
          return wrappedData
        }
        return []
    }

    private getSessionData =  (allSessions: ISession[], currentSessionId: string) : ISession|undefined => {
        return allSessions.find( s => s.sessionId === currentSessionId)
    }

    private getSessionTitle = (allSessions: ISession[], currentSessionId: string) => {
      const currentSession = this.getSessionData(allSessions, this.state.currentSessionId) 
      if (currentSession){
        return currentSession.sessionName
      }
      return "No session"
    }

    private getSessionTime = (allSessions: ISession[], currentSessionId: string) => {
      const currentSession = this.getSessionData(allSessions, this.state.currentSessionId) 
      if (currentSession){
        return format(currentSession.startTime, "'Started at' hh:mmaaaa',' LL/dd/yyyy")
      }
      return "No session"
    }

    // this require to use state. So I will the currentView into the state. This state will be essential to control the display of dashboard and report 
    private dashboardClick = () =>{
        this.setState({currentView: "dashboard"})
      }

    private reportClick = () =>{
      this.setState({currentView: "report"})
    }

}

export default withCookies(SessionView)