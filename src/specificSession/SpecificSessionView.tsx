// import axios from "axios"
import * as React from 'react';
// import {GoogleLogin, GoogleLoginResponse} from "react-google-login"
// import {Route, Router} from "react-router"
// import {Button, ButtonGroup, Card, CardContent,CardHeader, Grid, GridColumn, GridRow, Header } from "semantic-ui-react"
import {Button, ButtonGroup, Grid } from "semantic-ui-react"
import styled from "styled-components";
import {ISession, UserContext} from "../Context"
import {Student, StudentStatus} from '../data_structure/Student';
import DetailedReport from "./DetailedReport"
import {Layout} from "../Layout"
import LiveDashboard from "./LiveDashboard";  
// import * as openSocket from 'socket.io-client'; 
import {idNamesPair} from "./../studentsIDsName";

// const socket = openSocket("http://localhost:8080/studentstatus")

/* CSS For Component */
const HeaderContainer = styled.div`
  position: relative;
  // width: 1143px;
  width: 100%;
  height: 110px;
  top: 0px;
  display: flex;
  align-items: center;
  background: #FFFFFF;
  justify-content: flex-end;  
  padding: 10px 20px 4px 20px;
`

const Title = styled.label`
  position: absolute;
  left: 4.29%;
  top: 25.49%;
  bottom: 50%;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: normal;

  color: #000000;
`

const StartTime = styled.div`
  position: absolute;
  left: 4.37%;
  top: 58.71%;
  bottom: 13.73%;

  font-family: Roboto;
  font-style: normal;
  font-weight: light;
  font-size: 20px;
  line-height: normal;

  color: #9C9C9C;
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
        this.state = {studentData: this.wrapData(["anna","hemmingway"]), currentView: this.props.currentSessionView, currentSessionId: this.props.currentSessionId}
    }

    public wrapData = (studentIds: string[]): Student[] => {
        // the name and the progress will be done here
        // the data will also change here
        // here things can only be set as a default, the actual data will only be received on mount. Due to the live data
        
        return studentIds.map(s => new Student(s, StudentStatus.InProgress, s, 10000, 10, 100000, "Make songs"))
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

    // public wrapDataThroughEmail = (studentIds: string[], names: string[]): Student[] => {
    //   // just for dummy data 
    //   return studentIds.map((s,i) => {
    //     return new Student(nameIdPair[s] , StudentStatus.Idle, s, 10000, 10, 100000, "Make songs");
    //   });
    // }
    

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
                {value => 
                       <Layout history={this.props.history} userName={value.userName} logoutAction={this.props.logoutAction}>

                       <p style={{height: `5vh`}}>    
                        {/*  */}
                       </p>
                      {/* I can add grid to it */}
                      <Grid style={{position: "relative"}}>
                      <Grid.Row> 
                      <Grid.Column width="1"/>
                      <Grid.Column width="14">
                        <HeaderContainer>
                          <Title>
                            { this.getSessionTitle(value.userSessions, this.state.currentSessionId) }
                          </Title>
        
                          <StartTime>
                            { this.getSessionTime(value.userSessions, this.state.currentSessionId) }
                          </StartTime>

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
                      </Grid>

                       <br/>
                       {this.state.currentView === "dashboard"? 
                          <LiveDashboard studentData={this.getStudentData(value.userSessions, this.state.currentSessionId)} sessionData={this.getSessionData(value.userSessions, this.state.currentSessionId)}/> 
                       : 
                          <DetailedReport sessionData={this.getSessionData(value.userSessions, this.state.currentSessionId)}> Detailed report </DetailedReport>}  
                       </Layout>
                }
            </UserContext.Consumer>
        )
    }

    private getStudentData = (allSessions: ISession[], currentSessionId: string) => {
        const session = this.getSessionData(allSessions, currentSessionId)
        // here is the set up of the session 
        // I remembered that I already made it work with socket 
        if (session){
          console.log(session.studentIDNamePair)
          const wrappedData = this.wrapDataThroughIdNamePair(session.studentIds, session.studentIDNamePair)
          console.log(wrappedData)
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

export default SessionView