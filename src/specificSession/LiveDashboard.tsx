import * as React from 'react';
import {GoogleLoginResponse} from "react-google-login";
import {Card, CardContent,CardHeader, Grid } from "semantic-ui-react";
import styled from "styled-components";
import {Student, StudentStatus} from '../data_structure/Student';
import {ISession, UserContext} from "../Context"
import StudentGraphUsage from "./StudentGraphUsage";
import {StudentOverview} from "./StudentOverview"; 
import socketIOClient from 'socket.io-client'; 

import {StudentCurrentDetails} from "./StudentCurrentDetails";
import {idNamesPair} from "./../studentsIDsName";
import * as globalStyle from "../AppStyle"

// const socket = openSocket("http://127.0.0.1:3001/studentstatus")
// console.log("socket ip " + process.env.SOCKETIP);
// const BACKEND = 'http://localhost';
const BACKEND = window.location.hostname;
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

const TotalStudentLabel = styled(globalStyle.Header400)`
  color: ${globalStyle.colors.baseBlueStone50};

  display: inline;
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

const StatusInstruction = styled(globalStyle.Header400)`
    color: ${globalStyle.colors.baseBlueStone}
`

const StudentLabel = styled(globalStyle.Header500)`
    color: ${globalStyle.colors.baseBlueStone};
    display: inline
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
          if (sArray[s]["collectViews"] > 3) { tableData["Collection Views"]["often"]++;}
          else if (sArray[s]["collectViews"] > 1) { tableData["Collection Views"]["rarely"]++;}
          else if (sArray[s]["collectViews"] === 0) { tableData["Collection Views"]["notUse"]++;}

          if (sArray[s]["storageBuys"] > 2) {
            tableData["Storage Increases"]["often"]++;
          } 
          else if (sArray[s]["storageBuys"] > 0) {tableData["Storage Increases"]["rarely"]++;}
          else if (sArray[s]["storageBuys"] === 0) {tableData["Storage Increases"]["notUse"]++;}

          if (sArray[s]["barUse"] > 3) { tableData["bar graph"]["often"]++;
          }
          else if (sArray[s]["barUse"] > 1) { tableData["bar graph"]["rarely"]++;
          }
          else if (sArray[s]["barUse"] === 0) { tableData["bar graph"]["notUse"]++;}

          if (sArray[s]["lineUse"] > 3) { tableData["line graph"]["often"]++; 
          }
          else if (sArray[s]["lineUse"] > 1) { tableData["line graph"]["rarely"]++; 
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
      this.setState({loading: false, studentData: this.props.studentData})
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
      
      this.props.studentData.forEach(s => {s.clearTimeout()});
    }

    public componentDidUpdate(prevProps: any) {
      if (prevProps.studentData !== this.props.studentData ){
        this.setState( {studentData: this.props.studentData} )
      }
    }

    public onMouseOverASpecificStudentEvent = (studentData: Student) =>{
        if (this.state.lockSpecificDetail) return
        this.setState({doesShowSpecificDetail: true, specificStudentData: studentData})
    }

    public onMouseOutASpecificStudentEvent = () =>{
        if (this.state.lockSpecificDetail) return
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

                  <Grid style={styles.liveDashboardContainer}>
                  <Grid.Row style={styles.liveDashboardRowContainer}>
                  <Grid.Column width="1"/>
                    <Grid.Column width="7">
                        <Card style={styles.leftCardStyle}>
                          <CardHeader textAlign="left" style={GridHeaderStyle}>
                              <StudentLabel> Students </StudentLabel>
                              <TotalStudentLabel> 24 Total students</TotalStudentLabel>
                          </CardHeader>

                          <CardContent style={{padding: "20px 50px 0px 8px", borderWidth:"0px"}}>
                            <StudentOverview showDetailed={this.showDetailed} studentData={this.state.studentData}
                              onMouseOverASpecificStudentEvent= {this.onMouseOverASpecificStudentEvent}
                              onMouseOutASpecificStudentEvent={this.onMouseOutASpecificStudentEvent}
                              onClickOnASpecificStudentEvent={this.onClickOnASpecificStudentEvent}
                            />
                          </CardContent>

                          <div style={{fontSize: "16px", paddingLeft:"8px" , textAlign: "left", position:"absolute", bottom:"40px", display: "flex"}}>
                              <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                                <Rect status={StudentStatus.InProgress}/>
                                <StatusInstruction>
                                  Engaged
                                </StatusInstruction>
                              </div>
                              
                              <div style={{display:"flex", flexDirection:"row", marginLeft: "16px", alignItems:"center"}}>
                                  <Rect status={StudentStatus.Stuck}/>
                                  <StatusInstruction>
                                    Idle for 2 minutes
                                  </StatusInstruction>
                              </div>
                              
                              <div style={{display:"flex", flexDirection:"row", marginLeft: "16px", alignItems:"center"}}>
                              <Rect status={StudentStatus.Absent}/>
                              <StatusInstruction>
                                Idle for 5 minutes
                              </StatusInstruction>
                              </div>
                          </div>
                          <div style={{height: "100%", width: "1px", backgroundColor:"rgba(0, 0, 0, 0.10)", position:"absolute", right:"0", top:"0" }}>  </div>
                        </Card>
                    </Grid.Column>

                    <Grid.Column width="7" style={styles.rightCardStyle}>
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

    private showDetailed = (studentId: string) => {
        return this.setState({studentChosen: studentId}) ;
    }
}

const styles = {
    liveDashboardContainer: {position: "relative", marginTop:"0"},
    liveDashboardRowContainer: {height: "75vh", paddingTop:"0"},
    leftCardStyle : {width:"100%",  height:"100%", borderWidth: "0px",boxShadow:"none"}, 
    rightCardStyle: {display:"flex", height: "100%",justifyContent: "center", color:"#00000"}
}



export default LiveDashboard
