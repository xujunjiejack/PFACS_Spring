import axios from "axios"
import * as React from 'react';
import {GoogleLogin, GoogleLoginResponse} from "react-google-login"
import {Route, Router} from "react-router"
import {Button, ButtonGroup, Card, CardContent,CardHeader, Grid, GridColumn, GridRow, Header } from "semantic-ui-react"
import styled from "styled-components";
import {ISession, UserContext} from "../Context"
import {Student, StudentStatus} from '../data_structure/Student';
import DetailedReport from "./DetailedReport"
import {Layout} from "../Layout"
import LiveDashboard from "./LiveDashboard";  


/* CSS For Component */
const HeaderContainer = styled.div`
  position: relative;
  width: 1143px;
  height: 102px;
  left: 143px;
  top: 0px;
  display: flex;
  align-items: center;
  background: #FFFFFF;
  justify-content: flex-end;  
  padding: 10px 20px 10px 20px;
`

const Title = styled.label`
  position: absolute;
  left: 4.29%;
  top: 25.49%;
  bottom: 50%;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: normal;

  color: #000000;
`

const StartTime = styled.div`
  position: absolute;
  left: 4.37%;
  top: 64.71%;
  bottom: 13.73%;

  font-family: Roboto;
  font-style: normal;
  font-weight: light;
  font-size: 18px;
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
        return studentIds.map(s => new Student(s, StudentStatus.InProgress, s))
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
                {value => 
                       <Layout history={this.props.history}>

                       <p style={{height: `5vh`}}>    
                        {/*  */}
                       </p>
       
                       <HeaderContainer>
                         <Title>
                           { this.getSessionTitle(value.userSessions, this.state.currentSessionId) }
                         </Title>
       
                         <StartTime>
                          { this.getSessionTime(value.userSessions, this.state.currentSessionId) }
                         </StartTime>

                         <StyledButtonGroup>                              
                           <ReportButton onClick={this.dashboardClick} className={ this.state.currentView === "dashboard" ? "active": "" }>
                             Dashboard
                           </ReportButton>
       
                           <EndSessionButton onClick={this.reportClick} className={this.state.currentView === "report" ? "active": ""}>
                             Report
                           </EndSessionButton>
                         </StyledButtonGroup>
       
                       </HeaderContainer>
                       <br/>
                       
                       {this.state.currentView === "dashboard"? <LiveDashboard studentData={this.getStudentData(value.userSessions, this.state.currentSessionId)} sessionData={this.getSessionData(value.userSessions, this.state.currentSessionId)}/> : <DetailedReport sessionData={this.getSessionData(value.userSessions, this.state.currentSessionId)}> Detailed report </DetailedReport>}  
                       </Layout>
                }
            </UserContext.Consumer>
        )
    }

    private getStudentData = (allSessions: ISession[], currentSessionId: string) => {
        const session = this.getSessionData(allSessions, currentSessionId)
        if (session){
          const wrappedData = this.wrapData(session.studentIds)
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