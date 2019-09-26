/*********************
 * App.tsx
 * 
 * This file, a central piece of the application, manages the router of each page. It also provides 
 * the other coponent the context they might share in the future
 *
 * 
 **********************/

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFileAlt } from "@fortawesome/free-regular-svg-icons";
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import { createHashHistory } from "history"
import * as React from 'react';
import {Route, Router} from "react-router"

import './App.css'
import {initialUser, IUserContext, UserContext} from "./Context"
import {CreateSession} from "./sessionManagement/CreateSession"
import LoginPage from "./Login";
import {Session} from "./sessionManagement/SessionManagementPage";
import SessionView from "./specificSession/SpecificSessionView";
import {IGoogleClassroomInfo} from "./data_structure/GoogleClassroomInfo"

library.add(faTachometerAlt)
library.add(faFileAlt)

const history = createHashHistory()


/***
 * Interface
 */

interface IControlState {
  currentView: string,
  currentSessionId: string
}

interface IClassroomControl {
  classrooms: IGoogleClassroomInfo[]
}

type IAppState = IUserContext & IControlState & IClassroomControl;

// Should I keep the student id? probably true. I need to make sure we find those people 
interface ISessionData {
  startTime: string,
  ongoing: boolean,
  sessionName: string,
  studentNumber: number, 
  studentIds: string[],
  sessionId: string
}

/*** 
 * Dummy data two for sessions 
 */

const dummyDataStudentList = ["Alice","Bob","Charlie","Donny","Elise","Frank","Gigi","Hadi","Iris","Jojo","Kiki","Lala","Mimi","Norb","Onno","Poppy","Quinn","Rog","Sisko","Tom","Josh","Yan"]
// {"aee6c2569ea2cf8b88d79a7c36a90015": "JJ", "403870ae4811bcb15dcdfe7f0c2ad3f8": "Vishesh", "a47746fa74fe8f3823d48dfdcbc13618": "Nathan", "e311f1a829e27d2f8a4aef242ad0f71c": "Matthew", "fe185d1d04a7d905953ed7455f0561ca": "Reina", "3242fe1dc946799d204984d330975432": "Daisy"};
const dummyDataStudentIds = ["aee6c2569ea2cf8b88d79a7c36a90015", "403870ae4811bcb15dcdfe7f0c2ad3f8", "a47746fa74fe8f3823d48dfdcbc13618","e311f1a829e27d2f8a4aef242ad0f71c", "fe185d1d04a7d905953ed7455f0561ca", "3242fe1dc946799d204984d330975432"]
const dummyDataStudentIds2 = ["aee6c2569ea2cf8b88d79a7c36a90015", "403870ae4811bcb15dcdfe7f0c2ad3f8", "a47746fa74fe8f3823d48dfdcbc13618", "fe185d1d04a7d905953ed7455f0561ca", "3242fe1dc946799d204984d330975432"]
const dummyData1: ISessionData = {
  startTime: "23 July, 2017 - Started at 4:50pm",
  ongoing: true,
  sessionName: "Test Session",
  studentNumber: dummyDataStudentIds.length,
  studentIds: dummyDataStudentIds,
  sessionId: Math.random().toString(36)
}

const dummyData2: ISessionData = {
  startTime: "1 June, 2019 - Started at 4:50pm",
  ongoing: false,
  sessionName: "Fall 2019 Math Assessment",
  studentNumber: dummyDataStudentIds.length,
  studentIds: dummyDataStudentIds2, 
  sessionId: Math.random().toString(36)
}
// So I need to find the student data. 

const dummyData=[dummyData1, dummyData2]


/*** 
 * Dummy data two for Google classroom
 */

const dummyClassroomData1: IGoogleClassroomInfo = {
  className: "2018 Spring",
  studentName: ["Mike", "Charles", "Anna", "Dan", "Dan", "Dan", "Ben", "Anna"]
}

const dummyClassroomData2: IGoogleClassroomInfo = {
  className: "Fall 2018 Math",
  studentName: ["Anna", "Charles", "Steve", "Jack"]
}

const dummyClassroomData = [dummyClassroomData1, dummyClassroomData2]


/***
 * Main class
 */
class App extends React.Component <any, IAppState> { 
  
  public constructor(props: any){
    super(props)
    this.state = {...initialUser, userSessions: dummyData, currentSessionId: "", currentView: "dashboard", classrooms: dummyClassroomData} 
  }

  public addNewSession = ( newSession: ISessionData ) => {
      this.setState( 
        {
          userSessions: [
          ...this.state.userSessions, newSession]
        } 
      )
  }

  public setUser = (userName: string, userAccessToken: string, userIdToken: string ) => {
    // TODO: grab data in for user sessions from the database.
    this.setState({userName, userAccessToken, userIdToken, userSessions: dummyData})
  }

  private logout = (history) => {
    console.log("logout")
    history.push("/login")
    this.setState({userName: "", userAccessToken:"", userIdToken:"", userSessions:[]})
  }
  
  public setClassroom = (classroomInfo: IGoogleClassroomInfo[]) =>{
    this.setState({classrooms: classroomInfo})
  }

  public historyPush(path: string){
    history.push(path)
    return (<div> HELLLO </div>)
  }

  public render() {
    return (
      <div className="App" style={{background:"#f1f1f1", height:"100vh", width:"100vw"}}>
        <Router history={history}>
          <div>
          <Route exact={true} path="/" render={
            props=>
                { 
                  if (this.state.userName !== "")
                    {  
                      this.historyPush("/sessions")
                      return <div>Welcome</div>
                    } 
                  else
                    {return this.historyPush("/login")}}
                }/> 

          <Route exact={true} path="/login" 
                render={
                    props => 
                      <UserContext.Provider value={{ ...this.state}} >
                        <LoginPage history={props.history} setUser={this.setUser} setClassroom={this.setClassroom}/>
                      </UserContext.Provider>
              }
          />

          <Route exact={true} path="/sessions"
                render={
                    props =>
                      <UserContext.Provider value={{ ...this.state}} >
                          <Session history={props.history} changeCurrentSession={this.changeCurrentSession} logoutAction={this.logout}/>
                      </UserContext.Provider>
                }
            />

          <Route exact={true} path="/createsession"
              render = {
                  props => 
                      <UserContext.Provider value={{ ...this.state}}  >
                        <CreateSession history={props.history} addNewSession={this.addNewSession} changeCurrentSession={this.changeCurrentSession} classroomInfoData={this.state.classrooms} logoutAction={this.logout}/>                          
                      </UserContext.Provider>
              }
          />
          
          <Route exact={true} path="/livedashboard"
              render = {
                  props => 
                    <UserContext.Provider value={{ ...this.state}}  >
                      <SessionView history={props.history} currentSessionId={this.state.currentSessionId} currentSessionView={this.state.currentView} changeCurrentSession={this.changeCurrentSession} logoutAction={this.logout} />
                    </UserContext.Provider>
              }
             />
          </div>
          </Router>

       </div>
    );
  }


  private changeCurrentSession = (sessionId: string, sessionCurrentView: string ) => {
    // This code will change the session id 
    this.setState({
      currentSessionId: sessionId, currentView: sessionCurrentView
    })
}
}

export default App;
