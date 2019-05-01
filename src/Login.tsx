import axios from "axios";
import * as React from "react";
import {GoogleLogin, GoogleLoginResponse} from "react-google-login"
import styled from "styled-components";
import {TitleText} from "./AppStyle";
import {UserContext} from "./Context"
import {IGoogleClassroomInfo} from "./data_structure/GoogleClassroomInfo";

/* CSS For different componenets*/
const GoogleLoginButton = styled(GoogleLogin)`
    position: absolute;
    width: 508px;
    height: 97px;
    left: 468px;
    top: 495px;

    justify-content: center;
`

/* Interface */
interface ILoginProps {
    studentChosen?: string ,
    response?: GoogleLoginResponse,
    accessToken? : string
  }

/* Main Component Class*/
class LoginPage extends React.Component <any, ILoginProps> {

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
    
    // use this to get data https://developers.google.com/classroom/reference/rest/
    private async onSuccess (response: GoogleLoginResponse) {
      
      // The course data looks like {courses: {id, name}}
      // setUser(userName: string, userAccessToken:string, userIdToken:string )
      this.props.setUser(response.getId, response.getAuthResponse().access_token, response.getAuthResponse().id_token) 

      // Need to save the things in the cookie. 
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

        const googleStudentResponse = await axios.get(`https://classroom.googleapis.com/v1/courses/${firstId}/students`, {headers:{Authorization:`Bearer  ${accessToken}`}})
        const studentData: any[] = googleStudentResponse.data.students
        // data structure: {students: [{courseId:"", profile: { emailAddress:"", name:{familyName:"", givenName:"" }}}]}
        
        const studentEmailList = studentData.map(s => s.profile.emailAddress)
        
        const classroomInfo: IGoogleClassroomInfo = {className:"",  studentName:[]}
        classroomInfo.className = "Course" // how to get this one 
        classroomInfo.studentName = studentData.map(s=> s.givenName)
        // I need to find a way for the classroomInfo unique id as well. It definitely is 
        // better than the name which can have duplicate
        // I probably should change the 

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

