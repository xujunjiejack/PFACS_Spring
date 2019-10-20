// import axios from "axios"
import * as React from 'react';
import {Button, ButtonGroup, Grid } from "semantic-ui-react"
import styled from "styled-components";
import {ISession, UserContext} from "../Context"
import {Student, StudentStatus} from '../data_structure/Student';
import DetailedReport from "./DetailedReport"
import {Layout} from "../Layout"
import LiveDashboard from "./LiveDashboard";  
// import * as openSocket from 'socket.io-client'; 
import {idNamesPair} from "./../studentsIDsName";
import { withCookies } from "react-cookie";

/* CSS For Component */
const HeaderContainer = styled.div`
  position: relative;
  // width: 1143px;
  width: 100%;
  height: 80px;
  top: 0px;
  display: flex;
  align-items: center;
  background: #FFFFFF;
  justify-content: flex-end;  
  padding: 10px 20px 4px 20px;
`

const Title = styled.label`
  // position: relative;
  // left: 8px;
  // top: 25.49%;
  // bottom: 50%;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: normal;
  text-align:left;
  color: #000000;
`

const StartTime = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: light;
  font-size: 20px;
  line-height: normal;
  text-align: left;
  padding-top: 8px;

  color: rgba(156, 156, 156, 0.75);
`

const StyledButtonGroup = styled(ButtonGroup)`
  && {
    height: 62px;
    width: 400px;

  }
`

// Why using && can bump the specificty
// using && to boop the specificty. It is an inherent problem 
const ReportButton = styled(Button)`
  && {
    background: #F5F5F5;
    border-radius: 6px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: normal;
    
    // color: #5A9AF8;

    display: flex;
    justify-content: center;
    align-items:center;
    cursor: pointer;

    :hover{
      background-color: #5A9AF8;
      color: white;
    }


    &.active {
     
      :hover{
        background-color: #357AE0;
        color: white;
      }

      background-color: #5A9AF8;
      color: white;
    }
  }
`

const EndSessionButton = styled(Button)`
  && {
    background: #F5F5F5;
    border-radius: 4px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: normal;
    text-align: center;

    display: flex;
    justify-content: center;
    align-items:center;
    cursor: pointer;

    :hover{
      background-color: #5A9AF8;
      color: white;
    }

    &.active {
      
      :hover{
        background-color: #357AE0;
        color: white;
      }
      background-color: #5A9AF8;
      color: white;
    }
  }
`


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
        if (cookies.get("userName") !== undefined && cookies.get("userAccessToken") !== undefined && cookies.get("userIdToken") !== undefined){
            this.props.setUser( cookies.get("userName"), cookies.get("userAccessToken"), cookies.get("userIdToken"), cookies.get("userSessions") )    
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

                       <p style={{height: `5vh`}}>    
                        {/*  */}
                       </p>
                    
                      <Grid style={{position: "relative"}}>
                      <Grid.Row> 
                      <Grid.Column width="1"/>
                      <Grid.Column width="14">
                        <HeaderContainer>
                          <div style={{position:"absolute", left: "8px",top: "15%", display: "flex", flexDirection:"column", bottom:"13%"}}>
                            <Title>
                              { this.getSessionTitle(value.userSessions, this.state.currentSessionId) }
                            </Title>
        
                            <StartTime>
                              { this.getSessionTime(value.userSessions, this.state.currentSessionId) }
                            </StartTime>
                          </div>

                          <StyledButtonGroup>                              
                            <ReportButton style={{fontSize: "20px", width:"200px"}} onClick={this.dashboardClick} className={ this.state.currentView === "dashboard" ? "active": "" }>
                              Dashboard
                            </ReportButton>
        
                            <EndSessionButton style={{fontSize: "20px", width:"200px"}} onClick={this.reportClick} className={this.state.currentView === "report" ? "active": ""}>
                              Report
                            </EndSessionButton>
                          </StyledButtonGroup>

                        </HeaderContainer>
                        </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{padding:"8px 8px 0 8px"}}>
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
        return currentSession.startTime
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