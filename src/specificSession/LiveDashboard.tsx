// import axios from "axios"
import * as React from 'react';
// import {GoogleLogin, GoogleLoginResponse} from "react-google-login"
import {GoogleLoginResponse} from "react-google-login";
// import {Route, Router} from "react-router"
// import {Button, ButtonGroup, Card, CardContent,CardHeader, Grid, GridColumn, GridRow, Header } from "semantic-ui-react"
import {Card, CardContent,CardHeader, Grid } from "semantic-ui-react";
import styled from "styled-components";
// import {HeaderText, TitleText} from "../AppStyle";
import {Student, StudentStatus} from '../data_structure/Student';
import {ISession, UserContext} from "../Context"
// import {Layout} from "../Layout"
import StudentGraphUsage from "./StudentGraphUsage";
import {StudentOverview} from "./StudentOverview";
// import * as openSocket from 'socket.io-client'; 
// import openSocket from 'socket.io-client'; 
import socketIOClient from 'socket.io-client'; 

import {StudentCurrentDetails} from "./StudentCurrentDetails";
import {idNamesPair} from "./../studentsIDsName";

// const socket = openSocket("http://127.0.0.1:3001/studentstatus")
// console.log("socket ip " + process.env.SOCKETIP);
const BACKEND = 'http://localhost';
const socket = socketIOClient(BACKEND + ":3001/studentstatus");

/* CSS for components */
const GridHeaderStyle = {
  paddingLeft: "8px",
  paddingTop: "16px",
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
    display: inline-block;   
`

function generateColorBasedOnStatus(status: StudentStatus){
    switch (status) {
      case StudentStatus.InProgress:
        return "#DAF8FF";

      case StudentStatus.Idle:
        return "#EFEFEF";

      case StudentStatus.Absent:
        return "#EFEFEF";  

      case StudentStatus.Stuck: 
        return "#E2DAFF";

      default:
        return "#000000";
    }
} 

/* Interface for the state */
interface ILiveDashboardState {
  studentChosen?: string ,
  response?: GoogleLoginResponse,
  accessToken? : string
  currentView: string,  // "dashboard" or "report"
  sessionData: ISession,
  studentData: Student[],
  doesShowSpecificDetail: boolean,
  specificStudentData?: Student,
  loading: boolean,
  classOverviewData: Object,
  lockSpecificDetail: boolean
}


/* Main component */
class LiveDashboard extends React.Component  <any, ILiveDashboardState>{

    public liveUpdateListener;

    public constructor(props: any) {
        super(props)
        this.state = {studentChosen: undefined, response: undefined, accessToken: undefined, currentView: "dashboard", sessionData: this.props.sessionData, 
        studentData: this.props.studentData, doesShowSpecificDetail: false, specificStudentData: undefined, loading: false, classOverviewData: {}, lockSpecificDetail: false}
        console.log("constructing")
       
        this.liveUpdateListener = (message: any) => {
          // convert data from the backend. 
          console.log("Getting live data")
          const updatedDocuments = message;
          let updatedStudentDataArray = this.state.studentData;
          const newUpdatedStudentData: Student[] = [];
          for (const document of updatedDocuments) {
              const searchResults = this.state.studentData.filter( s => s.id === document.playerUniqueID);
              if (searchResults.length > 0) {
                const studentNeedToBeUpdated = searchResults[0];
                let propList = ["currentTurn", "currentScreen", "currentCash", "currentFans", "lastActTime", "madeInsight", "successfulInsight", "twoSongsReleased", "upgradedStorage", "barUse", "lineUse", "heatmapUse", "barChartUsed", "storageBuys", "insightCount", "successfulInsightCount", "releasedSongCount", "collectViews"];
                for (let p in propList) {
                  studentNeedToBeUpdated[propList[p]] = document[propList[p]];
                }
                studentNeedToBeUpdated.statusReset(this.statusSetFunction);
                newUpdatedStudentData.push(studentNeedToBeUpdated);
                updatedStudentDataArray = updatedStudentDataArray.filter(s => s.id !== document.playerUniqueID);
              }
          }
          updatedStudentDataArray = updatedStudentDataArray.concat(newUpdatedStudentData);
          this.setState({studentData: updatedStudentDataArray});
          this.setState({classOverviewData: this.makeTableData(updatedStudentDataArray)});
        }

        socket.on("live status update", this.liveUpdateListener);
      }

      public makeTableData(sArray: Student[]) : Object{

        let tableData = {
          // {'header': "Collection and Storage"},
          // "Collection Views": {often: 1, rarely: 0, notUse: 0},
          // "Variable modifications": {often: 2, rarely: 0, notUse: 0},
          // "Storage Increases": {often: 3, rarely: 0, notUse: 0},

          // {'header': "Data viz/graphing"},
          // "bar graph": {often: 4, rarely: 0, notUse: 0},
          // "line graph": {often: 5, rarely: 0, notUse: 0},
          // "heatmap": {often: 6, rarely: 0, notUse: 0},

          // {'header': "Insight/inferences"},
          // "Made insights": {often: 7, rarely: 0, notUse: 0},
          // "Successful insights": {often: 8, rarely: 0, notUse: 0},
          // "Good predictions": {often: 9, rarely: 0, notUse: 0},

          "Collection Views": {often: 0, rarely: 0, notUse: 0},
          "Variable modifications": {often: 0, rarely: 0, notUse: 0},
          "Storage Increases": {often: 0, rarely: 0, notUse: 0},

          // {'header': "Data viz/graphing"},
          "bar graph": {often: 0, rarely: 0, notUse: 0},
          "line graph": {often: 0, rarely: 0, notUse: 0},
          "heatmap": {often: 0, rarely: 0, notUse: 0},

          // {'header': "Insight/inferences"},
          "Made insights": {often: 0, rarely: 0, notUse: 0},
          "Successful insights": {often: 0, rarely: 0, notUse: 0},
          "Good predictions": {often: 0, rarely: 0, notUse: 0},
        };

        for (let s in sArray) {
          // console.log(sArray[s]);

          if (sArray[s]["collectViews"] > 3) { tableData["Collection Views"]["often"]++;}
          else if (sArray[s]["collectViews"] > 1) { tableData["Collection Views"]["rarely"]++;}
          else if (sArray[s]["collectViews"] === 0) { tableData["Collection Views"]["notUse"]++;}


          if (sArray[s]["storageBuys"] > 2) {
            tableData["Storage Increases"]["often"]++;
          } 
          else if (sArray[s]["storageBuys"] > 0) {tableData["Storage Increases"]["rarely"]++;}
          else if (sArray[s]["storageBuys"] === 0) {tableData["Storage Increases"]["notUse"]++;}

          if (sArray[s]["barUse"] > 3) { tableData["bar graph"]["often"]++;
        // console.log("bar use often"); console.log(sArray[s]);
          }
          else if (sArray[s]["barUse"] > 1) { tableData["bar graph"]["rarely"]++;
        // console.log("line use often"); console.log(sArray[s]);
          }
          else if (sArray[s]["barUse"] === 0) { tableData["bar graph"]["notUse"]++;}

          if (sArray[s]["lineUse"] > 3) { tableData["line graph"]["often"]++; 
          // console.log("line use often"); console.log(sArray[s]);
          }
          else if (sArray[s]["lineUse"] > 1) { tableData["line graph"]["rarely"]++; 
          // console.log("line use "); console.log(sArray[s]);
          }
          else if (sArray[s]["lineUse"] === 0) { tableData["line graph"]["notUse"]++;}

          if (sArray[s]["heatmapUse"] > 3) { tableData["heatmap"]["often"]++;}
          else if (sArray[s]["heatmapUse"] > 1) { tableData["heatmap"]["rarely"]++;}
          else if (sArray[s]["heatmapUse"] === 0) { tableData["heatmap"]["notUse"]++;}          

          if (sArray[s]["insightCount"] > 3) { tableData["Made insights"]["often"]++;}
          else if (sArray[s]["insightCount"] > 1) { tableData["Made insights"]["rarely"]++;}
          else if (sArray[s]["insightCount"] === 0) { tableData["Made insights"]["notUse"]++;}

          if (sArray[s]["successfulInsightCount"] > 3) { tableData["Successful insights"]["often"]++;}
          else if (sArray[s]["successfulInsightCount"] > 1) { tableData["Successful insights"]["rarely"]++;}
          else if (sArray[s]["successfulInsightCount"] === 0) { tableData["Successful insights"]["notUse"]++;}
        }
        return tableData;
      }

      public statusSetFunction = (id: String, status: any) => {
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

      public wrapData = (studentIds: any) => {
        // just for dummy data 
        return Object.keys(studentIds).map((s: any) => {
          return new Student(studentIds[s] , StudentStatus.Idle, s, 10000, 10, 100000, "Make songs");
        });
      }
      
      public convertIdsToIdNamePair (ids: string[]){
        const idNamePairRet = {}
        ids.forEach((id) =>{
          idNamePairRet[id] = idNamesPair[id]
        })
        return idNamePairRet
      }

      public componentDidMount(){

        // const students = ["5d8e8868a3bb1d4f2dcec66cac311f13", "eb8452b1765435e9f7ca856809c7fc31", "d88a1b66dece974a1c2576c752c3a187", "604527392b8c515ea87122933a57cb51", "aee6c2569ea2cf8b88d79a7c36a90015"]
        // const idNames = {"aee6c2569ea2cf8b88d79a7c36a90015": "JJ", "403870ae4811bcb15dcdfe7f0c2ad3f8": "Vishesh", "a47746fa74fe8f3823d48dfdcbc13618": "Nathan", "e311f1a829e27d2f8a4aef242ad0f71c": "Matthew", "fe185d1d04a7d905953ed7455f0561ca": "Reina", "3242fe1dc946799d204984d330975432": "Daisy"};
        // const idNames = this.convertIdsToIdNamePair(this.props.studentData)
        // const studentData = this.wrapData(idNames);
        
        // this.setState({loading: true, studentData: this.props.studentData})
        this.setState({loading: false, studentData: this.props.studentData})

        // set dummy data for right now, if the second time change, it shouldn't be dummy data, just minor performance issue 
        console.log("live dashboard");
        const studentIds = this.props.studentData.map(s => s.id)
        socket.emit('listen to live data', { "students": studentIds} );

        window.onbeforeunload = () =>{
          socket.emit('stop listening student status');
        }
      }

      public componentWillUnmount(){
        // close connection
        socket.emit('stop listening student status')
        socket.off('live status update', this.liveUpdateListener)
        console.log("stop listening student status")
        this.props.studentData.forEach(s => {
          s.clearTimeout()   
        });
      }

      public onMouseOverASpecificStudentEvent = (studentData: Student) =>{
          if (this.state.lockSpecificDetail){
            return
          }

          this.setState({doesShowSpecificDetail: true, specificStudentData: studentData})
      }

      public onMouseOutASpecificStudentEvent = () =>{
          if (this.state.lockSpecificDetail){
            return
          }
          this.setState({doesShowSpecificDetail: false, specificStudentData: undefined})
      }

      public onClickOnASpecificStudentEvent = (studentData: Student) => {
        this.setState({doesShowSpecificDetail: true, specificStudentData: studentData, lockSpecificDetail: true})
      }

      public onCloseOnASpecificStudentEvent = () =>{
        this.setState({lockSpecificDetail: false, doesShowSpecificDetail: false, specificStudentData: undefined})
      }
      

    public render(){
        return (
            <UserContext.Consumer>
            { value => 
              <React.Fragment>
                  {this.state.loading ? <div> loading </div> : 

                  <Grid style={{position: "relative", marginTop:"0"}}>
                  <Grid.Row style={{height: "75vh", paddingTop:"0"}}>
                  <Grid.Column width="1"/>
                    <Grid.Column width="7">
                        <Card style={{width:"100%",  height:"100%", borderWidth: "0px",boxShadow:"none"}} >

                          <CardHeader textAlign="left" style={GridHeaderStyle} >
                              <div style={{display: "inline", fontSize:"18px", fontWeight: "bold"}}> Students </div>
                              <TotalStudentLabel> 24 Total students</TotalStudentLabel>
                              {/* Need some non-hard code later */}
                          </CardHeader>
                        {/* The idea is that everytime the data is loaded, 
                            I will set up a timer to update the student information. 
                        */}
                          <CardContent style={{padding: "20px 50px 0px 8px", borderWidth:"0px"}}>
                            {/* the goal is to connect the left with right */}
                            {/* Pass the function to control the data in the on hover */}
                            <StudentOverview showDetailed={this.showDetailed} studentData={this.state.studentData}
                              onMouseOverASpecificStudentEvent= {this.onMouseOverASpecificStudentEvent}
                              onMouseOutASpecificStudentEvent={this.onMouseOutASpecificStudentEvent}
                              onClickOnASpecificStudentEvent={this.onClickOnASpecificStudentEvent}
                            />
                          </CardContent>

                          <div style={{fontSize: "16px", paddingLeft:"8px" , textAlign: "left", position:"absolute", bottom:"40px"}}>
                              <Rect status={StudentStatus.InProgress}/>
                              Engaged

                              <Rect status={StudentStatus.Stuck}/>
                              Idle for 2 minutes
                              
                              <Rect status={StudentStatus.Absent}/>
                              Idle for 5 minutes
                          </div>
                          <div style={{height: "100%", width: "1px", backgroundColor:"rgba(0, 0, 0, 0.10)", position:"absolute", right:"0", top:"0" }}>  </div>
                        </Card>
                    </Grid.Column>

                    <Grid.Column width="7" style={{display:"flex", height: "100%",justifyContent: "center", color:"#00000"}}>
                        {/* <StudentGraphUsage/> */}
                        {this.state.doesShowSpecificDetail? <StudentCurrentDetails student={this.state.specificStudentData} onCloseOnASpecificStudentEvent={this.onCloseOnASpecificStudentEvent} /> : <StudentGraphUsage tableData={this.state.classOverviewData}/>}
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

    private calculateWhetherOnline = (lastActiveTime): StudentStatus => {
      let currentDate = new Date()
      let timeStampInSecond = Math.floor(currentDate.getTime()/1000)
      let timeDifference = timeStampInSecond - lastActiveTime
      if (timeDifference < 120){
        return StudentStatus.InProgress
      } else if (timeDifference >= 120 && timeDifference < 300){
        return StudentStatus.Stuck
      } 
      return StudentStatus.Idle
    }
}

export default LiveDashboard

// Random code
// socket.on("receive initial data", message =>{
//   console.log("receive initial data")
//   // The initial data will decide the initial status 
//   // get rid of the loading problem 
//   this.setState({loading: false})
//   const updatedDocuments = message  
//   let updatedStudentDataArray = this.state.studentData
//   const newUpdatedStudentData: Student[] = []
//   for (const document of updatedDocuments) {  
//       const searchResults = this.state.studentData.filter( s => s.id === document.playerUniqueID)
      
//       if (searchResults.length > 0) {
//         const studentNeedToBeUpdated = searchResults[0];
      
//         let propList = ["currentTurn", "currentScreen", "currentCash", "currentFans", "lastActTime", "madeInsight", "successfulInsight", "twoSongsReleased", "upgradedStorage", "barUse", "lineUse", "heatmapUse", "barChartUsed", "storageBuys", "insightCount", "successfulInsightCount", "releasedSongCount", "collectViews"];
//         for (let p in propList) {
//           studentNeedToBeUpdated[propList[p]] = document[propList[p]];
//         }
        
//         studentNeedToBeUpdated.status = this.calculateWhetherOnline(document.lastActTime);
//         studentNeedToBeUpdated.startTimer(this.statusSetFunction);

//         // decide on the status based on the last active time 
//         newUpdatedStudentData.push(studentNeedToBeUpdated)
//         updatedStudentDataArray = updatedStudentDataArray.filter(s => s.id !== document.playerUniqueID)
//       }
//   }

//   updatedStudentDataArray = updatedStudentDataArray.concat(newUpdatedStudentData);
//   this.setState({studentData: updatedStudentDataArray, classOverviewData: this.makeTableData(updatedStudentDataArray)});
// })

