import axios from "axios"
import * as React from 'react';
import {GoogleLogin, GoogleLoginResponse} from "react-google-login"
import {Route, Router} from "react-router"
import {Button, Card, CardContent,CardHeader, Grid, GridColumn, GridRow, Header } from "semantic-ui-react"
import styled from "styled-components";
import './App.css'
import {HeaderText, TitleText} from "./AppStyle";
import {Student} from './data_structure/Student';
import {Layout} from "./Layout"
import StudentDetailedView from "./StudentDetailedView";
import StudentGraphUsage from "./StudentGraphUsage";
import {StudentOverview} from "./StudentOverview";

const HeaderContainer = styled.div`
  position: relative;
  width: 1143px;
  height: 102px;
  left: 143px;
  top: 0px;

  background: #FFFFFF;
`

const Title = styled.label`
  position: absolute;
  left: 4.29%;
  right: 81.19%;
  top: 25.49%;
  bottom: 50%;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 21px;
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
  font-weight: normal;
  font-size: 18px;
  line-height: normal;

  color: #565656;
`


const ReportButton = styled.div`
  position: absolute;
  left: 59.84%;
  right: 21.78%;
  top: 20.59%;
  bottom: 24.51%;

  background: #FFFFFF;
  border: 1px solid #D8D8D8;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(197, 197, 197, 0.25);
  border-radius: 6px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: normal;
  
  color: #5A9AF8;

  display: flex;
  justify-content: center;
  align-items:center;
  cursor: pointer;
`

const EndSessionButton = styled.div`
  position: absolute;
  left: 79.7%;
  right: 0.96%;
  top: 20.59%;
  bottom: 24.51%;

  background: #FFFFFF;
  border: 1px solid #D8D8D8;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(222, 215, 215, 0.25);
  border-radius: 4px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: normal;
  text-align: center;

  color: #F85A5A;

  display: flex;
  justify-content: center;
  align-items:center;
  cursor: pointer;
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


interface ILoginState {
    studentChosen?: string ,
    response?: GoogleLoginResponse,
    accessToken? : string
  }


class LiveDashboard extends React.Component  <any, ILoginState>{

    public constructor(prop: any) {
        super(prop)
        this.state = {studentChosen: undefined, response: undefined, accessToken: undefined }
        this.onSuccess = this.onSuccess.bind(this)
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

                <HeaderContainer>
                  <Title>
                    Spring 2019 Math
                  </Title>

                  <StartTime>
                  Start: 5 pm 03/20/2019 
                  </StartTime>

                  <ReportButton>
                    Detailed report
                  </ReportButton>

                  <EndSessionButton>
                    End the session
                  </EndSessionButton>

                </HeaderContainer>
                
                <br/>

                <Grid style={{position: "relative", left: "143px"}}>
                <Grid.Row>

                <Grid.Column width="8">
                    <Card style={{width:"100%",  height:"70vh"}} >
                    <CardHeader textAlign="left" style={GridHeaderStyle} >
                        <div style={{display: "inline"}}> STUDENT </div>
                        <TotalStudentLabel> Total student 24</TotalStudentLabel>
                    </CardHeader>
                    <CardContent>
                    <StudentOverview showDetailed={this.showDetailed}/>
                    </CardContent>
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
            </Layout>

        )
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
}

export default LiveDashboard
