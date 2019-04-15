import axios from "axios"
import * as React from 'react';
import {GoogleLogin, GoogleLoginResponse} from "react-google-login"
import {Route, Router} from "react-router"
import {Button, ButtonGroup, Card, CardContent,CardHeader, Grid, GridColumn, GridRow, Header } from "semantic-ui-react"
import styled from "styled-components";
import './App.css'
import {HeaderText, TitleText} from "./AppStyle";
import {ISession, UserContext} from "./Context"
import {Student, StudentStatus} from './data_structure/Student';
import {Layout} from "./Layout"
import StudentDetailedView from "./StudentDetailedView";
import StudentGraphUsage from "./StudentGraphUsage";
import {StudentOverview} from "./StudentOverview";



const currentData = [ new Student("Alice", StudentStatus.InProgress, "lili"),
                      new Student("Bob", StudentStatus.InProgress, "mimi"),
                      new Student("Charlie", StudentStatus.Idle, "ben"),
                      new Student("Donny", StudentStatus.Absent, "josh"),
                      new Student("Elise", StudentStatus.Stuck, "kuku"),
                      new Student("Frank", StudentStatus.InProgress, "liz"),
                      new Student("Gigi", StudentStatus.InProgress, "jojo"),
                      new Student("Hadi", StudentStatus.InProgress, "Hadi"),
                      new Student("Iris", StudentStatus.InProgress, "Iris"),
                      new Student("Jojo", StudentStatus.InProgress, "Jojo"),
                      new Student("Kiki", StudentStatus.InProgress, "Kiki"),
                      new Student("Lala", StudentStatus.InProgress, "Lala"),
                      new Student("Mimi", StudentStatus.InProgress, "Mimi"),
                      new Student("Norb", StudentStatus.InProgress, "Norb"),
                      new Student("Onno", StudentStatus.InProgress, "Onno"),
                      new Student("Poppy", StudentStatus.InProgress, "Poppy"),
                      new Student("Quinn", StudentStatus.InProgress, "Quinn"),
                      new Student("Rog", StudentStatus.InProgress, "Rog"),
                      new Student("Sisko", StudentStatus.InProgress, "Sisko"),
                      new Student("Tom", StudentStatus.Stuck, "Tom"),
                      new Student("Josh", StudentStatus.InProgress, "Josh"),
                      new Student("Yan", StudentStatus.InProgress, "Yan"),
]

function generateColorBasedOnStatus(status: StudentStatus){
  switch (status) {
      case StudentStatus.InProgress:
          return "#DAF8FF"
          break;
      
      case StudentStatus.Idle:
          return "#EFEFEF"
          break;

      case StudentStatus.Absent:
          return "#EFEFEF"   

      case StudentStatus.Stuck: 
          return "#E2DAFF"

      default:
          return "#000000"
  }
} 


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

const GridHeaderStyle = {

  paddingLeft: "25px",
  paddingTop:"30px",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "30px",
  height: "80px",
  color: "#000000"
}

const TotalStudentLabel = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: normal;

  color: #C0C0C0;

  display: inline;
  padding-left:50%;
`

const Rect = styled.div <{status: StudentStatus}> `
  

    &:first-of-type{
      margin-left:4px;
    }

    width:15px;
    height:15px;
    background-color: ${props=>generateColorBasedOnStatus(props.status)};
    margin-right: 6px;
    margin-left: 30px;
    // display: block;
    display: inline-block;   
`


interface ILoginState {
    studentChosen?: string ,
    response?: GoogleLoginResponse,
    accessToken? : string
    currentView: string,  // "dashboard" or "report"
    sessionData: ISession,
    studentData: Student[]
  }

// Next step, I need to decouple the livedashboard with its base layout.


class LiveDashboard extends React.Component  <any, ILoginState>{

    public constructor(props: any) {
        super(props)
        this.state = {studentChosen: undefined, response: undefined, accessToken: undefined, currentView: "dashboard", sessionData: this.props.sessionData, 
        studentData: this.props.studentData}
        this.onSuccess = this.onSuccess.bind(this)
      }

    public render(){
        return (
            <UserContext.Consumer>
            { value => 
            <React.Fragment>
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
                {/* <p className="App-intro" style={{height: `5vh`}}> */}
                {/* To get started, edit <code>src/App.tsx</code> and save to reload. */}
                {/* <GoogleLogin clientId="908046556011-80kbve0btf4nnn1o4vd010a0ag59tfj5.apps.googleusercontent.com" 
                        scope="https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.rosters.readonly"
                onSuccess={this.onSuccess} onFailure={this.onFailure}/> */}
                {/* </p> */}
{/* 
                <Grid style={{height: `10vh`}}>
                <GridRow>
                    <GridColumn width="1"/>
                    <GridColumn width="7" >
                    <p style={{fontSize: "20px", textAlign:"left"}} > Students usage of Bar, Line, and Heat Map </p>
                        
                    </GridColumn>

                    <GridColumn width="4">
                    <p style={{fontSize:"20px", color:"#c5c5c5", textAlign:"left"}}> Class Duration: 50 min </p>
                    </GridColumn>

                    <GridColumn width="4">
                    <p style={{fontSize:"20px", color:"#c5c5c5", textAlign:"left"}}> 14 min remaining</p>
                    </GridColumn>
                    
                </GridRow>
                </Grid> */}

                {/* <HeaderContainer>
                  <Title>
                    Spring 2019 Math
                  </Title>

                  <StartTime>
                    Start: 5pm, 03/20/2019 
                  </StartTime> */}

                  {/* Create two buttons. These two button stuff is a switch. Left is one and right is detailed report*/}
                  {/* I think semantic UI Probably has it. That thing is called UI buttons. UI Buttons are stacked buttons within a group. 
                      So I can add two buttons, one for detailed report and one for live dashboard. Each button corresponds to one page of the content. Clicking on one will trigger the switch. 
                      I also need to apply style on it to make it big, and the color conforms to my own design 
                  
                      I meet a problem of having to style button of React semantic UI, however, I still can't do it with styled componenet. I don't know how I can change it though. It does not respond to the change I made hmmm  
                      I see the problem. It stems from that it has a button class, and its css seems to have a higher specificy than my styled compoenent stuff, leading to the css be overwritten. 
                       
                      One way: add everything into the style. However, one thing is how to add :hover in style 


                  */}
                  
                  {/* <StyledButtonGroup>
                                      
                    <ReportButton onClick={this.dashboardClick} className={ this.state.currentView === "dashboard" ? "active": "" }>
                      Dashboard
                    </ReportButton>

                    <EndSessionButton onClick={this.reportClick} className={this.state.currentView === "report" ? "active": ""}>
                      Report
                    </EndSessionButton>
                  </StyledButtonGroup>

                </HeaderContainer>
                
                <br/> */}
                
                {/* Anything above this will be extracted from this code
                    It will be put in a new base layout componenet, with livedashboard and detailed report as its children
                    I need to create one. I will call it session componenet. alright? What does this include? 

                    It will include the header, and the top bar. The header contains the buttons, and title and time. Anything below 
                    that will be included two stuff

                */}

                <Grid style={{position: "relative", left: "143px"}}>
                <Grid.Row>

                <Grid.Column width="8">
                    <Card style={{width:"100%",  height:"70vh"}} >
                    <CardHeader textAlign="left" style={GridHeaderStyle} >
                        <div style={{display: "inline"}}> STUDENT </div>
                        <TotalStudentLabel> Total student 24</TotalStudentLabel>
                    </CardHeader>
                    <CardContent style={{padding: "50px"}}>
                      <StudentOverview showDetailed={this.showDetailed} studentData={this.state.studentData}/>
                    </CardContent>

                    {/* The problem is that the three legends stack together, not arranged in a row. I usually use a row to solve this problem 
                      But row isn't the right way. 

                      I think it might have problem with style. 

                      What I will do is to lay these three as I have done before. And then carefully arrange the three componenets. 
                    */}

                    <div style={{fontSize: "20px", paddingLeft:"50px" , textAlign: "left", position:"absolute", bottom:"100px"}}>

                        <Rect status={StudentStatus.InProgress}/>
                        Engaged
                    
                        <Rect status={StudentStatus.Stuck}/>
                        Stuck
                        
                        <Rect status={StudentStatus.Absent}/>
                        Disconnected
                    </div>

                        {/* <div style={{width: "33%"}}>
                          <Rect/>
                          Engaged
                        </div>

                        <div style={{width: "33%"}}>
                          <Rect/>
                          Engaged
                  </div> */}                                                                                                                                                

                    </Card>
                </Grid.Column>

                <Grid.Column width="7" style={{display:"flex", justifyContent: "center", color:"#00000"}}>
                {/* <RightSection></RightSection> */}
                {/* {this.state.studentChosen ?  ( 
                    <Card style={{width:"100%",  height:"70vh"}} >
                        <CardContent>
                        <CardHeader textAlign="left" style={{paddingTop:`18px`, marginBottom: "20px", marginLeft: "10px"}} >
                            {this.state.studentChosen}
                        </CardHeader>
                        <StudentDetailedView/>

                        </CardContent>
                        </Card>)
                    : "Select a student to view detail"} */}
                    <StudentGraphUsage/>
                </Grid.Column>
                </Grid.Row>      
            </Grid>
            </React.Fragment>
             
            }
            </UserContext.Consumer>

        )
    }

    public componentDidUpdate(prevProps: any) {
        if (prevProps.studentData !== this.props.studentData ){
          this.setState( {studentData: this.props.studentData} )
        }
    }

    private showDetailed = (studentId: string) => {
        return this.setState({studentChosen: studentId}) ;
      }
    
      // use this to get data https://developers.google.com/classroom/reference/rest/
      private async onSuccess (response: GoogleLoginResponse) {
        this.setState({response})
        this.setState({accessToken: response.getAuthResponse().access_token})
        
        // The course data looks like {courses: {id, name}}
        // axios({url:`https://classroom.googleapis.com/v1/courses/${firstId}/students`, method:"list"}).then(console.log).catch(console.log)

        const email = await this.getStudentEmailList(response.getAuthResponse().access_token)
    
        return ;
      }
    
      private async getStudentEmailList(accessToken: string): Promise<string[]> {
        
        try {
          const googleCourseResponse = await axios.get("https://classroom.googleapis.com/v1/courses ", {headers:{Authorization:`Bearer  ${accessToken}`}})
          const data = googleCourseResponse.data ;
          const firstId = data.courses[0].id
          console.log(data.courses[0].id)
          const googleStudentResponse = await axios.get(`https://classroom.googleapis.com/v1/courses/${firstId}/students`, {headers:{Authorization:`Bearer  ${accessToken}`}})
          const studentData: any[] = googleStudentResponse.data.students
          // data structure: {students: [{courseId:"", profile: { emailAddress:"", name:{first:"", last:"" }}}]}
          console.log(googleStudentResponse.data.students[0].profile.emailAddress)
          const studentEmailList = studentData.map(s => s.profile.emailAddress)
          return new Promise((resolve, reject) => {resolve(studentEmailList)}) 
    
        } catch(error){
          console.log("function end:" + error)
        }
        
        return await Promise.reject("error")
      }
    
      private onFailure = (error: any) =>{
        console.log(error)
      }

      // add private functions for clicking the dashboard button
      // change the state to dashboard
      private dashboardClick = () =>{
        this.setState({currentView: "dashboard"})
      }

      private reportClick = () =>{
        this.setState({currentView: "report"})
      }

      // add private functions for clicking the report button
      // how to add active. add classname with active, and use .active

}

export default LiveDashboard
