/*********************
 * App.tsx
 * 
 * This file, a central piece of the application, manages the router of each page. It also provides 
 * the other coponent the context they might share in the future
 *
 * 
 **********************/

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFileAlt, faTrashAlt, faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import { createBrowserHistory } from "history"
import * as React from 'react';
import { Route, Router } from "react-router"

import { initialUser, IUserContext, UserContext, ISession } from "./Context"
import CreateSession from "./CreateSession/CreateSession"
import ModifySession from "./Session/Containers/ModifySession"
import LoginPage from "./Login/Login";
import Session from "./Session/Containers/SessionManagementPage";
import SessionView from "./LiveDashboard/Containers/SpecificSessionView";
import { IGoogleClassroomInfo } from "./data_structure/GoogleClassroomInfo"
import * as firebase from "firebase"
import { withCookies } from "react-cookie"

import mockSessionData from './MockData/MockSessionData';
import mockClassroomData from './MockData/MockClassroomData';

library.add(faTachometerAlt)
library.add(faFileAlt)
library.add(faTrashAlt)
library.add(faEdit)

/***
 * Interface
 */

//  This interface is used to control the change of the state
interface IControlState {
  currentView: string,
  currentSessionId: string,
  allUserData: Object[],
  modificationSessionId: string,
}

interface IClassroomControl {
  classrooms: IGoogleClassroomInfo[]
}

type IAppState = IUserContext & IControlState & IClassroomControl;

// TODO Don't export this once we no longer need mock data
export interface ISessionData {
  startTime: Date,
  ongoing: boolean,
  sessionName: string,
  studentNumber: number,
  studentIds: string[],
  sessionId: string,
  emails: string[]
}

const history = createBrowserHistory()

/***
 * Main class
 */
class App extends React.Component<any, IAppState> {

  public constructor(props: any) {
    super(props)
    const cookies = this.props.cookies;
    const userSessionCookie = cookies.get("userSessions")
    const userSessions = userSessionCookie !== undefined ? userSessionCookie : mockSessionData
    this.state = {
      ...initialUser, userSessions, currentSessionId: "", currentView: "dashboard", classrooms: mockClassroomData,
      allUserData: [], modificationSessionId: ""
    }
  }

  public setUserSessionsInCookie = (newUserSession: ISession[]) => this.props.cookies.set("userSessions", newUserSession, { path: "/" })
  public appendNewUserSessionToExistingSessions = (newUserSession: ISession) => this.setState({ userSessions: [...this.state.userSessions, newUserSession] })

  public addNewSession = (newUserSession: ISession) => {
    const newUserSessions = [...this.state.userSessions, newUserSession]
    this.appendNewUserSessionToExistingSessions(newUserSession)
    this.setUserSessionsInCookie(newUserSessions)
  }

  public setUser = (userName: string, userAccessToken: string, userIdToken: string, userEmail?, userKey?,userSessions?, firstLogin: boolean = false,) => {
    const { cookies } = this.props;

    // Set the cookies
    cookies.set('userName', userName, { path: '/' });
    cookies.set('userAccessToken', userAccessToken, { path: '/' });
    cookies.set('userIdToken', userIdToken, { path: '/' });
    cookies.set('userEmail', userEmail, { path: '/' });
  
    if (userKey === undefined && cookies.get('userKey') !== undefined){
      cookies.set('userKey', cookies.get('userKey'), {path:"/"})
    }else if (userKey !== undefined) {
      cookies.set('userKey', userKey, {path:"/"})
    }

    // Determine whether the user sessions needs to be updated.
    const userFirstSignIn = userSessions === undefined || firstLogin
    if (userFirstSignIn) {
      userSessions = mockSessionData
    } else if (!userFirstSignIn){
      this.setUserSessionsInCookie(userSessions)
    }

    const currentNoUserLoggedIn = this.state.userName === ""
    if (currentNoUserLoggedIn) {
      // Login 
      this.setState({ userName, userAccessToken, userIdToken, userSessions: userSessions })
    }
  }

  public deleteUserSession = (userSessionToBeDeleted) => {
    console.log("deleting a user session")
    const newUserSessionsWithoutOne = this.state.userSessions.filter(s => s.sessionId !== userSessionToBeDeleted.sessionId)
    this.setState({ userSessions: newUserSessionsWithoutOne })
    this.setUserSessionsInCookie(newUserSessionsWithoutOne)
  }

  private setAllUserData = (data) => {
    const studentID = data.map(d => d.playerUniqueID)
    const studentName = data.map(d => d.userEmail)
    const studentNameIDMap = {}
    studentName.forEach((e, i) => {
      studentNameIDMap[e] = studentID[i]
    });

    let newClassroom: IGoogleClassroomInfo = { studentID, studentName, className: "Advisory Board", studentNameIDMap }
    this.setState({ allUserData: data, classrooms: [newClassroom] })
  }

  private logout = (history) => {
    history.push("/login")

    const { cookies } = this.props;
    cookies.remove("userName")
    cookies.remove("userIdToken")
    cookies.remove("userAccessToken")
    cookies.remove("userSessions")

    this.setState({ userName: "", userAccessToken: "", userIdToken: "", userSessions: [] })
    firebase.auth().signOut().then(() => console.log("firebase logout successful")).catch(e => console.log(e))
  }

  public setClassroom = (classroomInfo: IGoogleClassroomInfo[]) => this.setState({ classrooms: classroomInfo })

  public historyPush(path: string) {
    history.push(path)
    return (<div> HELLLO </div>)
  }
 

  public setClassForModified = (sessionId) => this.setState({ modificationSessionId: sessionId })

  public render() {
    return (
      <div className="App" style={{ background: "#ffffff", height: "100vh", width: "100vw" }}>
        <Router history={history}>
          <div>
            <Route exact={true} path="/" render={
              props => {
                // TODO: Is this the best way to allow a user back into a session? What about using cookies?
                if (this.state.userName !== "") {
                  this.historyPush("/sessions")
                  return <div>Welcome</div>
                }
                else { return this.historyPush("/login") }
              }
            } />

            {/* Need 404 page. */}

            <Route exact={true} path="/login"
              render={
                props =>
                  <UserContext.Provider value={{ ...this.state }} >
                    <LoginPage history={props.history} setUser={this.setUser} setClassroom={this.setClassroom} setAllUserData={this.setAllUserData} />
                  </UserContext.Provider>
              }
            />

            <Route exact={true} path="/sessions"
              render={
                props =>
                  <UserContext.Provider value={{ ...this.state }} >
                    <Session history={props.history} setUser={this.setUser} changeCurrentSession={this.changeCurrentSession} logoutAction={this.logout} modifyOneSession={this.setClassForModified} deleteASession={this.deleteUserSession} />
                  </UserContext.Provider>
              }
            />

            <Route exact={true} path="/createsession"
              render={
                props =>
                  <UserContext.Provider value={{ ...this.state }}  >
                    <CreateSession history={props.history} setUser={this.setUser} addNewSession={this.addNewSession} changeCurrentSession={this.changeCurrentSession} classroomInfoData={this.state.classrooms} logoutAction={this.logout} />
                  </UserContext.Provider>
              }
            />

            <Route exact={true} path="/livedashboard"
              render={
                props =>
                  <UserContext.Provider value={{ ...this.state }}  >
                    <SessionView history={props.history} setUser={this.setUser} currentSessionId={this.state.currentSessionId} currentSessionView={this.state.currentView} changeCurrentSession={this.changeCurrentSession} logoutAction={this.logout} />
                  </UserContext.Provider>
              }
            />

            <Route exact={true} path="/modifysession"
              render={
                props =>
                  <UserContext.Provider value={{ ...this.state }}>
                    <ModifySession history={props.history} setUser={this.setUser} modificationSessionID={this.state.modificationSessionId} logoutAction={this.logout} modifySession={this.modifySession}></ModifySession>
                  </UserContext.Provider>
              }
            />
          </div>
        </Router>
      </div>
    );
  }

  private modifySession = (modifiedSession: ISession) => {
    // first create a new array by filter for the new reference. Otherwise react will automatically render
    const newSessionArray = this.state.userSessions.filter(s => s.sessionId !== modifiedSession.sessionId)
    
    // then splice based on the original position. 
    const indexOfModifiedSession = this.state.userSessions.findIndex( s => s.sessionId === modifiedSession.sessionId )
    newSessionArray.splice(indexOfModifiedSession, 0, modifiedSession)
    this.setState( {userSessions:newSessionArray})

    const { cookies } = this.props;
    cookies.set("userSessions", newSessionArray, { path: "/" })
  }


  private changeCurrentSession = (sessionId: string, sessionCurrentView: string) => {
    // This code will change the session id 
    this.setState({currentSessionId: sessionId, currentView: sessionCurrentView})

    const { cookies } = this.props
    cookies.set("sessionId", sessionId, { path: "/" })
    cookies.set("sessionCurrentView", sessionCurrentView, { path: "/" })
  }
}

export default withCookies(App);
