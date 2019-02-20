import  axios from "axios"
import * as React from 'react';
import {GoogleLogin, GoogleLoginResponse} from "react-google-login"
import {Card, CardContent,CardHeader, Grid} from "semantic-ui-react"

import styled from "styled-components";
import './App.css'
import { Student } from './data_structure/Student';
import logo from './logo.svg';
import StudentDetailedView from "./StudentDetailedView";
import {StudentOverview} from "./StudentOverview";

interface IAppState {
  studentChosen?: string ,
  response?: GoogleLoginResponse,
  accessToken? : string
}

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fbfbfb;
`

class App extends React.Component <any, IAppState>  { 

  public constructor(prop: any) {
    super(prop)
    this.state = {studentChosen: undefined, response: undefined, accessToken: undefined }
    this.onSuccess = this.onSuccess.bind(this)
  }

  public render() {
    return (
      <div className="App" style={{background:"#f1f1f1"}}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
          <GoogleLogin clientId="908046556011-80kbve0btf4nnn1o4vd010a0ag59tfj5.apps.googleusercontent.com" 
                scope="https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.rosters.readonly"
          onSuccess={this.onSuccess} onFailure={this.onFailure}/>
        
        </p>

        <Grid>
          <Grid.Row>
          <Grid.Column width="1"/>
          <Grid.Column width="7">
            <Card style={{width:"100%",  height:"70vh"}} >
            <CardContent>
              <CardHeader textAlign="left" style={{paddingTop:`18px`, marginBottom: "20px", marginLeft: "10px"}} >
                 Student
              </CardHeader>
              <StudentOverview showDetailed={ this.showDetailed }/>
              </CardContent>
            </Card>
          </Grid.Column>

          <Grid.Column width="7" style={{display:"flex", alignItems: "center", justifyContent: "center", color:"#00000",}}>
          {/* <RightSection></RightSection> */}
          {this.state.studentChosen ?  ( 
              <Card style={{width:"100%",  height:"70vh"}} >
                <CardContent>
                  <CardHeader textAlign="left" style={{paddingTop:`18px`, marginBottom: "20px", marginLeft: "10px"}} >
                    {this.state.studentChosen}
                  </CardHeader>
                  <StudentDetailedView/>

                  </CardContent>
                </Card>)
            : "Select a student to view detail"}

          </Grid.Column>

          </Grid.Row>      
        </Grid>
      </div>
    );
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

export default App;
