import * as React from 'react';
import {  Card, CardContent,CardHeader, Grid } from "semantic-ui-react"
import styled from "styled-components";
import './App.css'
import { Student } from './data_structure/Student';

import logo from './logo.svg';
import StudentDetailedView from "./StudentDetailedView"
import {StudentOverview} from "./StudentOverview";


interface IAppState {
  studentChosen?: string 
}

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fbfbfb;
`

class App extends React.Component <any, IAppState>  { 

  public constructor(prop: any) {
    super(prop)
    this.state = {studentChosen: undefined}
  }

  public render() {
    return (
      <div className="App" style={{background:"#f1f1f1"}}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>

        <Grid>
          <Grid.Row>
          <Grid.Column width="1"/>
          <Grid.Column width="7">
            <Card style={{width:"100%",  height:"70vh"}} >
            <CardContent>
              <CardHeader textAlign="left" style={{paddingTop:`18px`, marginBottom: "20px", marginLeft: "10px"}} >
                 Student
              </CardHeader>
              <StudentOverview showDetailed={ this.showDetailed }/>
              </CardContent>
            </Card>
          </Grid.Column>

          <Grid.Column width="7" style={{display:"flex", alignItems: "center", justifyContent: "center", color:"#00000",}}>
          {/* <RightSection></RightSection> */}
          {this.state.studentChosen ?  ( 
              <Card style={{width:"100%",  height:"70vh"}} >
                <CardContent>
                  <CardHeader textAlign="left" style={{paddingTop:`18px`, marginBottom: "20px", marginLeft: "10px"}} >
                    {this.state.studentChosen}
                  </CardHeader>
                  <StudentDetailedView/>

                  </CardContent>
                </Card>)
            : "Select a student to view detail"}

          </Grid.Column>

          </Grid.Row>      
        </Grid>
      </div>
    );
  }

  private showDetailed = (studentId: string) => {
    return this.setState({studentChosen: studentId}) ;
}

}

export default App;
