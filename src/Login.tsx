import axios from "axios";
import * as React from "react";
import {GoogleLogin, GoogleLoginResponse} from "react-google-login"
import styled from "styled-components";
import {TitleText} from "./AppStyle";
import {UserContext} from "./Context"
import {IGoogleClassroomInfo} from "./data_structure/GoogleClassroomInfo";
import * as firebase from "firebase"
import {Button} from "semantic-ui-react"
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
        this.firebaseLogin = this.firebaseLogin.bind(this)
        // this.responseGoogle = this.responseGoogle.bind(this)
      }

    public async firebaseLogin () {
      firebase.auth().signInWithPopup(provider).then( (result : firebase.auth.UserCredential) =>  {
        // This gives you a Google Access Token. You can use it to access the Google API.
        if (result !== null){
          const credential = result.credential as any 
          const token = (result.credential as any).accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("firebase login");
          console.log(result.credential);
          console.log(user);
          // firebase.firestore().collection('users').get().then((snapshot) => {
          //   snapshot.forEach((doc) => {
          //     console.log(doc.id, '=>', doc.data());
          //   });
          // })
          // .catch((err) => {
          //   console.log('Error ', err);
          // });
          // firebase.database().ref("/users/DU7k6DVcJmS0ASOBvMv6nqCByuh2").once('value').then((snapshot) =>{
          //   console.log(snapshot.val());
          // }).catch( (error) =>{ console.log(error) } );

        // ...
          this.props.setUser("Dummy", token, credential.id_token) 
          this.props.history.push("/")
        }
        // What is this id??
        // const email = await this.getStudentEmailList(response.getAuthResponse().access_token)        
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
    }

    public render(){
        return(

            <UserContext.Consumer>
              {value => 
                <div>
                  <TitleText>
                      PFACS Teacher Dashboard
                  </TitleText>
                  <Button onClick={ this.firebaseLogin }>
                    Firebase login with Google provider
                  </Button>
                  <GoogleLoginButton clientId="908046556011-80kbve0btf4nnn1o4vd010a0ag59tfj5.apps.googleusercontent.com" 
                          scope="https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.rosters.readonly"
                  onSuccess={this.onSuccess} onFailure={this.onFailure}/>
                  
                </div>
              }
            </UserContext.Consumer>
        )
    }
    
    // use this to get data https://developers.google.com/classroom/reference/rest/
    private async onSuccess (response: any) {
      console.log("success")
      // The course data looks like {courses: {id, name}}
      // setUser(userName: string, userAccessToken:string, userIdToken:string )
      console.log(response)
      this.props.setUser(response.getId, response.getAuthResponse().access_token, response.getAuthResponse().id_token) 

      // Need to save the things in the cookie. 
      // axios({url:`https://classroom.googleapis.com/v1/courses/${firstId}/students`, method:"list"}).then(console.log).catch(console.log)
      const email = await this.getStudentEmailList(response.getAuthResponse().access_token)
      this.props.history.push("/")
      
      return ;
    }
  
    // private async responseGoogle(response: any) {
    //   console.log(response);
    //   console.log("success")
    //   // The course data looks like {courses: {id, name}}
    //   // setUser(userName: string, userAccessToken:string, userIdToken:string )
    //   this.props.setUser(response.getId, response.getAuthResponse().access_token, response.getAuthResponse().id_token) 
    
    //   // Need to save the things in the cookie. 
    //   // axios({url:`https://classroom.googleapis.com/v1/courses/${firstId}/students`, method:"list"}).then(console.log).catch(console.log)
    //   const email = await this.getStudentEmailList(response.getAuthResponse().access_token)
    //   this.props.history.push("/")
    // }

    private async getStudentDataFromCourseId(data: any, accessToken: any){
      
      const result = data.courses.map(async (course: any) => {
        const classroomInfo: IGoogleClassroomInfo = {className:"",  studentName:[]}
        classroomInfo.className = course.name
        
        const courseId = course.id
        const googleStudentResponse = await axios.get(`https://classroom.googleapis.com/v1/courses/${courseId}/students`, {headers:{Authorization:`Bearer  ${accessToken}`}})
        const studentData: any[] = googleStudentResponse.data.students
        
        // data structure: {students: [{courseId:"", profile: { emailAddress:"", name:{familyName:"", givenName:"" }}}]}
        classroomInfo.studentID = studentData.map(s => s.profile.emailAddress)
        classroomInfo.studentName = studentData.map(s=> s.profile.name.givenName)
        // I need to find a way for the classroomInfo unique id as well. It definitely is 
        // better than the name which can have duplicate. I probably should change the 
        console.log(classroomInfo)
        return classroomInfo
      } ) 
      return await Promise.all(result)
    }

    private async getStudentEmailList(accessToken: string): Promise<string[]> {
      try {
        const googleCourseResponse = await axios.get("https://classroom.googleapis.com/v1/courses", {headers:{Authorization:`Bearer  ${accessToken}`}})
        const data = googleCourseResponse.data;
        
        const classrooms = await this.getStudentDataFromCourseId(data, accessToken)

        // I need to change something here to map course into different GoogleClassroomInfo for App.tsx
        this.props.setClassroom(classrooms)

        return new Promise((resolve, reject) => {resolve(["OK"])})

      } catch(error){
        console.log("function end:" + error)
      }
      
      return await Promise.reject("error")
    }
  
    private onFailure = (error: any) =>{
      console.log("error")
      console.log(error)
    }
}

export default LoginPage

