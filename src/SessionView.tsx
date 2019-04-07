import axios from "axios"
import * as React from 'react';
import {GoogleLogin, GoogleLoginResponse} from "react-google-login"
import {Route, Router} from "react-router"
import {Button, ButtonGroup, Card, CardContent,CardHeader, Grid, GridColumn, GridRow, Header } from "semantic-ui-react"
import styled from "styled-components";
import './App.css'
import {HeaderText, TitleText} from "./AppStyle";
import {Student, StudentStatus} from './data_structure/Student';
import DetailedReport from "./DetailedReport"
import {Layout} from "./Layout"
import LiveDashboard from "./LiveDashboard";
import StudentDetailedView from "./StudentDetailedView";
import StudentGraphUsage from "./StudentGraphUsage";
import {StudentOverview} from "./StudentOverview";


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
  right: 79.09%;
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
    // border: 1px solid #D8D8D8;
    // box-sizing: border-box;
    // box-shadow: 0px 4px 4px rgba(197, 197, 197, 0.25);
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
    // border: 1px solid #D8D8D8;
    // box-sizing: border-box;
    // box-shadow: 0px 4px 4px rgba(222, 215, 215, 0.25);
    border-radius: 4px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: normal;
    text-align: center;

    // color: #F85A5A;

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

class SessionView extends React.Component <any, any> {
    //  Anything above this will be extracted from this code
    // It will be put in a new base layout componenet, with livedashboard and detailed report as its children
    // I need to create one. I will call it session componenet. alright? What does this include? 

    // It will include the header, and the top bar. The header contains the buttons, and title and time. Anything below 
    // that will be seperated into two componenets: live dashboard and detailed reports 
    
    
    // Layout: Topbar
    // Header 

    // OK. So first, let me write the render part for uptwo. I will copy from Livedashboard
    // I will clean up the dependency now
    // First, what is this history? OK. This is the problem for extension in React. I need to specify state and props type
    // Using any is a method to move on. Not taht important 

    // Second, I need to move the CSS for two buttons to here. I move things above the class to give it a global feeling
    
    // Third, button click. 

    // I need too add constractor: 
    public constructor(props: any){
        super(props)
        // initial state 
        // currentView is double state, with an initial state
        this.state = {currentView: "dashboard"} 
        // Now I need to delete the Liveboard link to it
        // First import the dashboard into this file
        // Then link it 
        // Concern one: History, carry or not??? 

        // Now my thought is to change the LiveDashboard in other files. How do I find it? Through Session, or App.tsx? I forgot the router. 
    }


    public render(){

        return (
            <Layout history={this.props.history}>
                {/* Header */}
                {/* <header className="App-header"> */}
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                {/* <h1 className="App-title">Welcome to React</h1> */}
                {/* <Grid>
                <Grid.Row>
                    <Grid.Column/>
                    <Grid.Column width="1">
                        <HeaderText> Students </HeaderText> 
                    </Grid.Column>
                    <Grid.Column width="1" style={{paddingLeft: "10px"}}>
                    <HeaderText> Sessions </HeaderText> 
                    </Grid.Column>

                    <Grid.Column width="10"/>

                    <Grid.Column width="3">
                    <HeaderText> User Name </HeaderText> 
                    </Grid.Column>
                </Grid.Row>
                </Grid>
                </header> */}
                <p className="App-intro" style={{height: `5vh`}}>
                {/* To get started, edit <code>src/App.tsx</code> and save to reload. */}
                {/* <GoogleLogin clientId="908046556011-80kbve0btf4nnn1o4vd010a0ag59tfj5.apps.googleusercontent.com" 
                        scope="https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.rosters.readonly"
                onSuccess={this.onSuccess} onFailure={this.onFailure}/> */}
                </p>

                <HeaderContainer>
                  <Title>
                    Spring 2019 Math
                  </Title>

                  <StartTime>
                    Start: 5pm, 03/20/2019 
                  </StartTime>

                  {/* Create two buttons. These two button stuff is a switch. Left is one and right is detailed report*/}
                  {/* I think semantic UI Probably has it. That thing is called UI buttons. UI Buttons are stacked buttons within a group. 
                      So I can add two buttons, one for detailed report and one for live dashboard. Each button corresponds to one page of the content. Clicking on one will trigger the switch. 
                      I also need to apply style on it to make it big, and the color conforms to my own design 
                  
                      I meet a problem of having to style button of React semantic UI, however, I still can't do it with styled componenet. I don't know how I can change it though. It does not respond to the change I made hmmm  
                      I see the problem. It stems from that it has a button class, and its css seems to have a higher specificy than my styled compoenent stuff, leading to the css be overwritten. 
                       
                      One way: add everything into the style. However, one thing is how to add :hover in style 


                  */}
                  
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
                
                {/* Now I need to add the structured two sub components */}
                {/* { Dashboard  } */}
                {this.state.currentView === "dashboard"? <LiveDashboard/> : <DetailedReport> Detailed report </DetailedReport>}  
                </Layout>
        )
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