import axios from "axios";
import * as React from "react";
import {GoogleLogin, GoogleLoginResponse} from "react-google-login"
import styled from "styled-components"
import { HeaderText, TitleText } from "./AppStyle";
import {UserContext} from "./Context"

const GoogleLoginButton = styled(GoogleLogin)`
    position: absolute;
    width: 508px;
    height: 97px;
    left: 468px;
    top: 495px;

    // text-align: center;
    justify-content: center;
`

interface ILogin {
    studentChosen?: string ,
    response?: GoogleLoginResponse,
    accessToken? : string
  }

class LoginPage extends React.Component <any, any> {

    public constructor(prop: any) {
        super(prop)
        this.state = {studentChosen: undefined, response: undefined, accessToken: undefined }
        this.onSuccess = this.onSuccess.bind(this)
      }

    public render(){
        return(

            <UserContext.Consumer>
              {value => 
                <div>
                  <TitleText>
                      PFACS Teacher Dashboard
                  </TitleText>

                  <GoogleLoginButton clientId="908046556011-80kbve0btf4nnn1o4vd010a0ag59tfj5.apps.googleusercontent.com" 
                          scope="https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.rosters.readonly"
                  onSuccess={this.onSuccess} onFailure={this.onFailure}/>
                </div>
              }
            </UserContext.Consumer>
        )
    }

    private showDetailed = (studentId: string) => {
        return this.setState({studentChosen: studentId}) ;
      }
    
      // use this to get data https://developers.google.com/classroom/reference/rest/
      private async onSuccess (response: GoogleLoginResponse) {
        // this.setState({response})
        // this.setState({accessToken: response.getAuthResponse().access_token})
        
        // The course data looks like {courses: {id, name}}
        // setUser(userName: string, userAccessToken:string, userIdToken:string )
        this.props.setUser(response.getId, response.getAuthResponse().access_token, response.getAuthResponse().id_token) 
        // axios({url:`https://classroom.googleapis.com/v1/courses/${firstId}/students`, method:"list"}).then(console.log).catch(console.log)
        const email = await this.getStudentEmailList(response.getAuthResponse().access_token)
        this.props.history.push("/") 
  
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

export default LoginPage

