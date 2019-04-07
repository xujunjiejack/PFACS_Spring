import  axios from "axios"
import {createHashHistory} from "history"
import * as React from 'react';
import {GoogleLogin, GoogleLoginResponse} from "react-google-login"
import {MemoryRouter, Route, Router} from "react-router"
import styled from "styled-components";
import './App.css'
import {HeaderText} from "./AppStyle";
import {initialUser, UserContext} from "./Context"
import {CreateSession} from "./CreateSession"
import { Student } from './data_structure/Student';
import LiveDashboard from "./LiveDashboard";
import LoginPage from "./Login";
import logo from './logo.svg';
import {Session} from "./Session";
import SessionView from "./SessionView";

const history = createHashHistory()

interface IAppState{
  userName: string,
  userAccessToken: string,
  userIdToken: string
} 

class App extends React.Component <any, IAppState> { 
 
  public constructor(props: any){
    super(props)
    this.state = initialUser
  }

  public setUser = (userName: string, userAccessToken: string, userIdToken: string ) => {
    this.setState({userName, userAccessToken, userIdToken})
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
                render={props => 
                <UserContext.Provider value={{ ...this.state}}  >
                <LoginPage history={history} setUser={this.setUser}/>
              </UserContext.Provider>
              }
          />

          <Route exact={true} path="/sessions"
                render={
                    props => <Session history={props.history}/>
                }
            />

          <Route exact={true} path="/createsession"
              render = {
                  props => 
                  <CreateSession history={props.history}/>                          
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
          <Route exact={true} path="/livedashboard"
              render = {
                  props => 
                  <SessionView history={props.history}/>                          
              }
          />
        </div>
        </Router> 

        {/* <Session history={history}/>
        <CreateSession history={history}/>  */}
       </div>
    );
  }
}

export default App;
