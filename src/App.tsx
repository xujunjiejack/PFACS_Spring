import { library } from '@fortawesome/fontawesome-svg-core'
import { faFileAlt } from "@fortawesome/free-regular-svg-icons";
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  axios from "axios"
import {createHashHistory} from "history"
import * as React from 'react';
import {GoogleLogin, GoogleLoginResponse} from "react-google-login"
import {MemoryRouter, Route, Router} from "react-router"
import styled from "styled-components";
import './App.css'
import {initialUser,ISession, IUserContext, UserContext} from "./Context"
import {CreateSession} from "./CreateSession"
import LoginPage from "./Login";
import logo from './logo.svg';
import {Session} from "./Session";
import SessionView from "./SessionView";

library.add(faTachometerAlt)
library.add(faFileAlt)

const history = createHashHistory()

// interface IAppState{
//   userName: string,
//   userAccessToken: string,
//   userIdToken: string,
//   userSession: 
// } 

interface IControlState {
  currentView: string,
  currentSessionId: string

}

type IAppState = IUserContext & IControlState;

// I can finish the internal data today. Let me focus
// I need to first figure out how the context data works right now.
// I also want to have an first impression on the data structure. Typescript should be great about it. I might be able to add type in the context
// My goal here is to use those session data to do the test. 
// All right, now it works well.
// Next step is to allow the session to be added in create sessions 
// So the problem right now is that create session doesn't really create anything, because it is not connected to the app context. So what I want to do is when the create button is clicked,
// the session will be created to the app context, added to the userSessions with its content. Session name, student ids. So it's like a form submit. 
// Two steps for tomorrow. 
// One is to figure out the data for session click. When the user clicks on the dashboard for one session, the corresponding session will be shown. The same interaction applies for the detailed report
// The other one is for each dashboard, how to link the square with the actual users clicked.
// So the problem seesm to be that the random session isn't there 

interface ISessionData {
  startTime: string,
  ongoing: boolean,
  sessionName: string,
  studentNumber: number, 
  studentIds: string[],
  sessionId: string
}

const dummyData1: ISessionData = {
  startTime: "23 July, 2017 - Started at 4:50pm",
  ongoing: true,
  sessionName: "Spring 2019 Math Assessment",
  studentNumber: 24,
  studentIds: ["Alice","Bob","Charlie","Donny","Elise","Frank","Gigi","Hadi","Iris","Jojo","Kiki","Lala","Mimi","Norb","Onno","Poppy","Quinn","Rog","Sisko","Tom","Josh","Yan"],
  sessionId: Math.random().toString(36)
}

const dummyData2: ISessionData = {
  startTime: "23 July, 2017 - Started at 4:50pm",
  ongoing: false,
  sessionName: "Fall 2019 Math Assessment",
  studentNumber: 25,
  studentIds: ["Alice","Bob","Charlie","Donny","Elise","Frank","Gigi","Hadi","Iris","Jojo","Kiki","Lala","Mimi","Norb","Onno","Poppy","Quinn","Rog","Sisko","Tom","Josh","Yan"], 
  sessionId: Math.random().toString(36)
}

const dummyData=[dummyData1, dummyData2]

class App extends React.Component <any, IAppState> { 
 
  public constructor(props: any){
    super(props)
    this.state = {...initialUser, userSessions: dummyData, currentSessionId: "", currentView: "dashboard"} 
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

  public historyPush(path: string){
    history.push(path)
    return (<div> HELLLO </div>)
  }

  public render() {
    return (
      <div className="App" style={{background:"#f1f1f1"}}>
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
                      <UserContext.Provider value={{ ...this.state}}  >
                      <LoginPage history={props.history} setUser={this.setUser}/>
                      </UserContext.Provider>
              }
          />

          <Route exact={true} path="/sessions"
                render={
                    props =>
                      <UserContext.Provider value={{ ...this.state}}  >
                          <Session history={props.history} changeCurrentSession={this.changeCurrentSession}/>
                      </UserContext.Provider>
                }
            />

          <Route exact={true} path="/createsession"
              render = {
                  props => 
                      <UserContext.Provider value={{ ...this.state}}  >
                        <CreateSession history={props.history} addNewSession={this.addNewSession} changeCurrentSession={this.changeCurrentSession}/>                          
                      </UserContext.Provider>
              }
          />
          
          {/* I have QUESTION: how would this the session shown related to the session the user chose*/}
          {/* I postpone the change of path later. It will be another task in to-do list */}
          {/* Let's test now */}
          {/* It tests pretty well */}
          {/* Now what is the next step? 
              1: write the detailed report component 
              2: fix the current live dashboard. 
                  Include added an "End the assessment" button

              For the sake of tomorrow's meeting. I need to finish the detailed report


            */}

          {/* Now the only thing I need to is to link the livedashboard to the stuff*/}
          
          <Route exact={true} path="/livedashboard"
              render = {
                  props => 
                    <UserContext.Provider value={{ ...this.state}}  >
                      <SessionView history={props.history} currentSessionId={this.state.currentSessionId} currentSessionView={this.state.currentView} changeCurrentSession={this.changeCurrentSession}/>
                    </UserContext.Provider>
              }
             />
          </div>
          </Router> 

        {/* <Session history={history}/>
        <CreateSession history={history}/>  */}
       </div>
    );

    // current view exists: dashboard, report
    // What is the Next step? Change the title based on the session in dashboard 

    // Next step. Declare what I want to do: props update in session view and update the state.
  }
  private changeCurrentSession = (sessionId: string, sessionCurrentView: string ) => {
    this.setState({
      currentSessionId: sessionId, currentView: sessionCurrentView
    })
}
}

export default App;
