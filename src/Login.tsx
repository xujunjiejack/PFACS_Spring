import axios from "axios";
import * as React from "react";
// import {GoogleLogin, GoogleLoginResponse} from "react-google-login"
import {GoogleLoginResponse} from "react-google-login"
import styled from "styled-components";
import {TitleText} from "./AppStyle";
import {UserContext} from "./Context"
import {IGoogleClassroomInfo} from "./data_structure/GoogleClassroomInfo";
import * as firebase from "firebase"
import {Button} from "semantic-ui-react"
import {withCookies} from 'react-cookie';
import * as globalStyles from "./AppStyle"
import { async } from 'q';

const firebaseConfig = {
  apiKey: "AIzaSyAbY4nV71yiRKOo83KAv0c2xm-IV5fmH6k",
  authDomain: "test-pfacs.firebaseapp.com",
  databaseURL: "https://test-pfacs.firebaseio.com",
  projectId: "test-pfacs",
  storageBucket: "test-pfacs.appspot.com",
  messagingSenderId: "908046556011",
  appId: "1:908046556011:web:917ef33f5fc776aa1f4a2e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.rosters.readonly")


/* CSS For different componenets*/
const FirebaseLoginButton = styled(Button)`
    &&& {
        position: absolute;
        width: 508px;
        height: 97px;
        left: 468px;
        top: 495px;
        justify-content: center;
        background-color: ${globalStyles.colors.basePacificBlue}
    }
`

const LoginButtonText = styled(globalStyles.Header800)`
    color: ${globalStyles.colors.baseDoctor}
`

/* Interface */
interface ILoginProps {
    studentChosen?: string ,
    response?: GoogleLoginResponse,
    accessToken? : string,
  }

/* Main Component Class*/
class LoginPage extends React.Component <any, ILoginProps> {

    public constructor(prop: any) {
        super(prop)
        this.state = {studentChosen: undefined, response: undefined, accessToken: undefined }
    }

    public firebaseLogin = async () => {
      firebase.auth().signInWithPopup(provider).then( (result : firebase.auth.UserCredential) =>  {
        if (result !== null){
          const credential = result.credential as any 
          const token = (result.credential as any).accessToken;
          const user = result.user;
          
          if (user !== null)           
            this.props.setUser(user.displayName, token, credential.idToken) 
          else 
            this.props.setUser("Dummy", token, credential.idToken) 
        
          this.props.history.push("/")
        }
      }).catch(console.log);
    }

    public render(){
        const { cookies } = this.props;
        const redirectToSessionPageInSeconds = seconds => setTimeout(()=>this.props.history.push("/sessions"), seconds)
        const userNameExistsInCookie = (cookies) => cookies.get("userName") !== undefined && cookies.get("userName") !== ""
        const redirectMessage = (<div> User logged in. Redirecting </div>)

        return(
            <UserContext.Consumer>
              {value => 
                {
                  if (cookies !== undefined){
                      if (userNameExistsInCookie(cookies)) {
                        redirectToSessionPageInSeconds(3000)    
                        return redirectMessage
                      }
                  }
                  return (
                    <React.Fragment>
                      <TitleText>
                          PFACS Teacher Dashboard
                      </TitleText>
                    
                      <FirebaseLoginButton onClick={ this.firebaseLogin }>
                        <LoginButtonText>Log in with Google</LoginButtonText>
                      </FirebaseLoginButton>
                    </React.Fragment>
                  )
                }
              }
            </UserContext.Consumer>
        )
    }
    
    private async getStudentDataFromCourseId(data: any, accessToken: any){
      const result = data.courses.map(async (course: any) => {

        const googleStudentResponse = await axios.get(`https://classroom.googleapis.com/v1/courses/${course.id}/students`, {headers:{Authorization:`Bearer  ${accessToken}`}})
        const studentData: any[] = googleStudentResponse.data.students

        const classroomInfo: IGoogleClassroomInfo = {className:"",  studentName:[], studentNameIDMap: {}}
        classroomInfo.className = course.name
        classroomInfo.studentID = studentData.map(s => s.profile.emailAddress)
        classroomInfo.studentName = studentData.map(s=> s.profile.name.givenName)
        return classroomInfo
      }) 
      // Super inefficient
      return await Promise.all(result)
    }

    // use this to get data https://developers.google.com/classroom/reference/rest/
    private onSuccess = async (response: any) => {
      this.props.setUser(response.getId, response.getAuthResponse().access_token, response.getAuthResponse().id_token);
      this.props.history.push("/");
    }
  

    private async getStudentEmailList(accessToken: string): Promise<string[]> {
      try {
        const googleCourseResponse = await axios.get("https://classroom.googleapis.com/v1/courses", {headers:{Authorization:`Bearer  ${accessToken}`}})
        const data = googleCourseResponse.data;
        
        const classrooms = await this.getStudentDataFromCourseId(data, accessToken)

        this.props.setClassroom(classrooms)

        return new Promise((resolve, reject) => {resolve(["OK"])})

      } catch(error){
        console.log("function end:" + error)
      }
      
      return await Promise.reject("error")
    }
}

export default withCookies(LoginPage)

