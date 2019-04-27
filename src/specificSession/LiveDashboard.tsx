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
      }

    public render(){
        return (
            <UserContext.Consumer>
            { value => 
            <React.Fragment>
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

                        <div style={{fontSize: "20px", paddingLeft:"50px" , textAlign: "left", position:"absolute", bottom:"100px"}}>
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
