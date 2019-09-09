import axios from "axios"
import * as React from 'react';
import {GoogleLogin, GoogleLoginResponse} from "react-google-login"
import {Route, Router} from "react-router"
import {Button, ButtonGroup, Card, CardContent,CardHeader, Grid, GridColumn, GridRow, Header } from "semantic-ui-react"
import styled from "styled-components";
import {HeaderText, TitleText} from "../AppStyle";
import {Student, StudentStatus} from '../data_structure/Student';
import {ISession, UserContext} from "../Context"
import {Layout} from "../Layout"
import StudentGraphUsage from "./StudentGraphUsage";
import {StudentOverview} from "./StudentOverview";
import * as openSocket from 'socket.io-client'; 
import {StudentCurrentDetails} from "./StudentCurrentDetails"

// Now I'm totally lost about how I should approach this problem
// the problem that I need to reflect the data in the server onto the frontend. 
const socket = openSocket("http://localhost:3001/studentstatus")

/* CSS for components */
const GridHeaderStyle = {
  paddingLeft: "50px",
  paddingTop: "32px",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "normal",
  height: "60px",
  color: "#000000",
  borderWidth:"0px"
}

const TotalStudentLabel = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: normal;

  color: #C0C0C0;

  display: inline;
  // padding-left:60%;
  right: 50px;
  position: absolute
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

const currentData = [ new Student("Matthew", StudentStatus.InProgress, "lili"),
    new Student("Vishesh", StudentStatus.InProgress, "mimi"),
    new Student("Reina", StudentStatus.Idle, "ben"),
    new Student("Nathan", StudentStatus.Absent, "josh"),
    new Student("Daisy", StudentStatus.Stuck, "kuku"),
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

/* Interface for the state */
interface ILoginState {
  studentChosen?: string ,
  response?: GoogleLoginResponse,
  accessToken? : string
  currentView: string,  // "dashboard" or "report"
  sessionData: ISession,
  studentData: Student[],
  doesShowSpecificDetail: boolean,
  specificStudentData?: Student,
  loading: boolean,
}


/* Main component */
class LiveDashboard extends React.Component  <any, ILoginState>{

    public constructor(props: any) {
        super(props)
        this.state = {studentChosen: undefined, response: undefined, accessToken: undefined, currentView: "dashboard", sessionData: this.props.sessionData, 
        studentData: this.props.studentData, doesShowSpecificDetail: false, specificStudentData: undefined, loading: false}


        socket.on("receive inital data", message =>{
          console.log("")
          // The initial data will decide the initial status 
          // get rid of the loading problem 
          this.setState({loading: false})
          const updatedDocuments = message  
          
          const statusSetFunction = (id, status) => {
            this.setState( ( prevState )=>{
              const otherStudentData = prevState.studentData.filter( s => s.id !== id)
              const searchResults = prevState.studentData.filter( s => s.id === id)
              if (searchResults.length > 0) {
                const studentNeedToBeUpdated = searchResults[0]
                studentNeedToBeUpdated.status = status
                const updatedResults = otherStudentData.concat(studentNeedToBeUpdated)
                return {...prevState, studentData: updatedResults}
              }
              return {...prevState}
            }) 
          }
          
          let updatedStudentDataArray = this.state.studentData
          console.log(updatedDocuments)
          const newUpdatedStudentData: Student[] = []
          for (const document of updatedDocuments) {  
              const searchResults = this.state.studentData.filter( s => s.id === document.playerUniqueID)
              console.log("Search results")
              console.log(searchResults.length)
              if (searchResults.length > 0) {
                console.log(searchResults.length)
                const studentNeedToBeUpdated = searchResults[0]
                studentNeedToBeUpdated.currentTurn = document.currentTurn
                studentNeedToBeUpdated.currentScreen = document.currentScreen
                studentNeedToBeUpdated.currentCash = document.currentCash
                studentNeedToBeUpdated.lastActTime = 10000
                // studentNeedToBeUpdated.statusReset(statusSetFunction)
                // decide on the status based on the last active time 
                newUpdatedStudentData.push(studentNeedToBeUpdated)
                updatedStudentDataArray = updatedStudentDataArray.filter(s => s.id !== document.playerUniqueID)
              }
          }

          console.log(newUpdatedStudentData) 
          updatedStudentDataArray = updatedStudentDataArray.concat(newUpdatedStudentData)
          this.setState({studentData: updatedStudentDataArray});

        })

        socket.on("live status update", message => {
          // convert data from the backend. 
          console.log("Data update");
          const newStudentData: Student[] = []
          this.setState({loading: false})

          // Another way is to understand the 

          // Object.keys(message).forEach(k => {
          //   // no need for external function wrap
          //   let status = StudentStatus.InProgress;
            
          //   switch (message[k]) {
          //     case 0:
          //       status = StudentStatus.InProgress;
          //       break;
              
          //     case 1:
          //       status = StudentStatus.Stuck;
          //       break;
            
          //     case 2: 
          //     case 3:
          //       status = StudentStatus.Absent
          //       break

          //     default:
          //       break;
          //   }
          //   newStudentData.push(new Student(k, status, k, 10000))
          // })
          // This is not entirely right. If it's actually update, I need to see whether the data is already there 
           
          // if the data has not shown up. What will happen
          // for (const studentData of message){
          //   newStudentData.push(new Student(studentData.playerUniqueID, StudentStatus.InProgress,studentData.playerUniqueID
          //      , 10000, studentData.currentTurn, studentData.currentCash, studentData.currentScreen))
          // }
          
          // Technically, if the code is run correctly, the student data should already exists. There are actually two 
          // use case for live data update, then. Or one. Let me check the initial state

          // Live dashboard update
          // most time, the students should be the same, but not really.
          // Probably just find the current student and change it
          // If I understand correctly, this will only be updated one document at a time
          // So I only need to find that document and update that 
          // Possible need for adding a new student??????? I didn't think of that. That would be painful if there doesn't exist a easy to do it. It's just it would be another can of for implementing 
          
          // should accept an array. 

          // For updating live data 

          // const updateDocuments = this.state.studentData.filter((s) => { s.id })
          // const needUpdateDocumentsUniqueId
          const updatedDocuments = message  
          // this.state.studentData.so
          // if (updatedDocuments.some((d) => d.playerUniqueID === eachCurrentStudentData.id)){
          //   const newStudentData = new Student(studentData.playerUniqueID, StudentStatus.InProgress,studentData.playerUniqueID
          //     , 10000, studentData.currentTurn, studentData.currentCash, studentData.currentScreen)
          // } 
          // get the specific updated document 
          // create new student data
          // remove old one
          // concat the new one

          // The other way. filter out the document needs updated
          // const studentDataNeedsUpdated = this.state.
          // create new based on it 
          // concat it 

          // The other one 
          // for each document in the updated documents 
          //    if the player exists in the  (which should)
          //      find the document out 
          //      change it 
          //      add this to an updated ddocument array
          //      delete it 
          //  concat the array
          
          let updatedStudentDataArray = this.state.studentData
          console.log(updatedDocuments)
          const newUpdatedStudentData: Student[] = []
          for (const document of updatedDocuments) {  
              const searchResults = this.state.studentData.filter( s => s.id === document.playerUniqueID)
              console.log("Search results")
              console.log(searchResults.length)
              if (searchResults.length > 0) {
                console.log(searchResults.length)
                const studentNeedToBeUpdated = searchResults[0]
                studentNeedToBeUpdated.currentTurn = document.currentTurn
                studentNeedToBeUpdated.currentScreen = document.currentScreen
                studentNeedToBeUpdated.currentCash = document.currentCash
                studentNeedToBeUpdated.lastActTime = 10000
                studentNeedToBeUpdated.statusReset(this.statusSetFunction)
                newUpdatedStudentData.push(studentNeedToBeUpdated)
                updatedStudentDataArray = updatedStudentDataArray.filter(s => s.id !== document.playerUniqueID)
              }
          }

          

          console.log(newUpdatedStudentData) 
          updatedStudentDataArray = updatedStudentDataArray.concat(newUpdatedStudentData)
          this.setState({studentData: updatedStudentDataArray});
        });

        socket.on("live2", message => {
          // convert data from the backend. 

          // console.log(message.fullDocument);
          // console.log("state");
          // console.log(this.state.studentData);

          // const newStudentData: Student[] = [];

          // Another way is to understand the 

          const k = message.fullDocument;
          console.log(k);
          let status = StudentStatus.InProgress;
          const newStudentData = this.state.studentData;
          const studentName = k.userEmail.slice(0,8);

          let newStudent = true;

          for (const s of Object.keys(newStudentData)) {
            const timeGap = ((new Date()).getTime()/1000) - newStudentData[s].lastActTime;
            // console.log(k.lastActTime + " " + ((new Date()).getTime()/1000));
            console.log(newStudentData[s].lastActTime);
            console.log(timeGap);
            if (timeGap < 1000){
              status = StudentStatus.InProgress;
            }
            else if (timeGap < 10000) {
              status = StudentStatus.Stuck;
            }
            else{
              status = StudentStatus.Absent;
            }  
            
            if (newStudentData[s].name === studentName) {
              newStudent = false;
            }
            newStudentData[s].setStatus(status);
          }

          if (newStudent){
            newStudentData.push(new Student(studentName, status, k.userId, k.lastActTime,k.currentTurn, k.currentCash, k.currentScreen));
          }
                   
          newStudentData.filter(x => x.name === studentName);
          
          // newStudentData.studentUser = status;
          this.setState({studentData: newStudentData});

        });
      }

      public statusSetFunction = (id, status) => {
        this.setState( ( prevState )=>{
          const otherStudentData = prevState.studentData.filter( s => s.id !== id)
          const searchResults = prevState.studentData.filter( s => s.id === id)
          if (searchResults.length > 0) {
            const studentNeedToBeUpdated = searchResults[0]
            studentNeedToBeUpdated.status = status
            const updatedResults = otherStudentData.concat(studentNeedToBeUpdated)
            return {...prevState, studentData: updatedResults}
          }
          return {...prevState}
        }) 
      }

      public wrapData = (studentIds): Student[] => {
        // just for dummy data 
        return Object.keys(studentIds).map((s,i) => {
          return new Student(studentIds[s] , StudentStatus.Idle, s, 10000, 10, 100000, "Make songs");
        });
      }
      
      public componentWillMount(){
    
        // This should be the right data format. 
        // const students = this.props.studentData.map(s=>s.name)
        
        // const students = {"Vishesh": 0 , "Nathan": 0 ,  "Matthew": 0  , "Reina": 0 , "Daisy": 0  };
        // const students = ["Vishesh", "Nathan", "Matthew", "Reina", "Daisy"];
    
      }
      
      public componentDidMount(){

        const students = ["5d8e8868a3bb1d4f2dcec66cac311f13", "eb8452b1765435e9f7ca856809c7fc31", "d88a1b66dece974a1c2576c752c3a187", "604527392b8c515ea87122933a57cb51", "aee6c2569ea2cf8b88d79a7c36a90015"]
        const idNames = {"aee6c2569ea2cf8b88d79a7c36a90015": "JJ", "403870ae4811bcb15dcdfe7f0c2ad3f8": "Vishesh", "a47746fa74fe8f3823d48dfdcbc13618": "Nathan", "e311f1a829e27d2f8a4aef242ad0f71c": "Matthew", "fe185d1d04a7d905953ed7455f0561ca": "Reina", "3242fe1dc946799d204984d330975432": "Daisy"};
        
        const studentData = this.wrapData(idNames);
        this.setState({loading: true, studentData})
        // set dummy data for right now, if the second time change, it shouldn't be dummy data, just minor performance issue 
        // this.setState({studentData}) 
        console.log("live dashboard");
        console.log(studentData);
        // Loading data ?
        // socket.emit('listen to live data', {students})
        socket.emit('listen to live data', { "students": Object.keys(idNames) } );

        window.onbeforeunload = () =>{
          socket.emit('stop listening student status');
        }
      }

      public componentWillUnmount(){
        // close connection
        // axios.post("/mongodata/endlivedata").then(res => {
        //   console.log(res.data)
        // });
        socket.emit('stop listening student status')
      }

      public onMouseOverASpecificStudentEvent = (studentData: Student) =>{
        // console.log(studentData.name)
          this.setState({doesShowSpecificDetail: true, specificStudentData: studentData})
      }

      public onMouseOutASpecificStudentEvent = () =>{
          this.setState({doesShowSpecificDetail: false, specificStudentData: undefined})
      }

    public render(){
        return (
            <UserContext.Consumer>
            { value => 
            <React.Fragment>
                {this.state.loading ? <div> loading </div> : 

                <Grid style={{position: "relative"}}>
                <Grid.Row>
                <Grid.Column width="1"/>
                  <Grid.Column width="7">
                      <Card style={{width:"100%",  height:"70vh", borderWidth: "0px"}} >

                        <CardHeader textAlign="left" style={GridHeaderStyle} >
                            <div style={{display: "inline", fontSize:"18px", fontWeight: "bold"}}> Students </div>
                            <TotalStudentLabel> 24 Total students</TotalStudentLabel>
                            {/* Need some non-hard code later */}
                        </CardHeader>

                        <CardContent style={{padding: "20px 50px 0px 50px", borderWidth:"0px"}}>
                          {/* the goal is to connect the left with right */}
                          {/* Pass the function to control the data in the on hover */}
                          <StudentOverview showDetailed={this.showDetailed} studentData={this.state.studentData}
                            onMouseOverASpecificStudentEvent= {this.onMouseOverASpecificStudentEvent}
                            onMouseOutASpecificStudentEvent={this.onMouseOutASpecificStudentEvent}
                          />
                        </CardContent>

                        <div style={{fontSize: "16px", paddingLeft:"50px" , textAlign: "left", position:"absolute", bottom:"40px"}}>
                            <Rect status={StudentStatus.InProgress}/>
                            Engaged
                        
                            <Rect status={StudentStatus.Stuck}/>
                            Stuck
                            
                            <Rect status={StudentStatus.Absent}/>
                            Disconnected
                        </div>

                      </Card>
                  </Grid.Column>

                  <Grid.Column width="7" style={{display:"flex", justifyContent: "center", color:"#00000"}}>
                      {/* <StudentGraphUsage/> */}
                      {this.state.doesShowSpecificDetail? <StudentCurrentDetails student={this.state.specificStudentData}/> : <StudentGraphUsage/>}

                  </Grid.Column>
                </Grid.Row>      
                </Grid>
                }
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

      // add private functions for clicking the dashboard button
      // change the state to dashboard
      private dashboardClick = () =>{
        this.setState({currentView: "dashboard"})
      }

      private reportClick = () =>{
        this.setState({currentView: "report"})
      }

}

export default LiveDashboard
