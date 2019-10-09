import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import axios from "axios";
import * as React from "react";
// import {GoogleLogin, GoogleLoginResponse} from "react-google-login"
import styled from "styled-components"
// import {HeaderText, TitleText} from "../AppStyle";
import {ISession, UserContext} from "../Context"
import {Layout} from "../Layout"
// import {Grid, GridColumn, GridRow, Container} from "semantic-ui-react"
import {Grid, GridColumn, GridRow} from "semantic-ui-react"
import { withCookies, Cookies } from "react-cookie";


/* CSS For the components */
const DashboardIcon = styled(FontAwesomeIcon)`
    position: relative;
    width: 25px;
    height: 21px;
    // left: 510px;
    cursor: pointer; 
    margin-right: 8px;
`

const ReportIcon = styled(FontAwesomeIcon)`
    position: relative;
    width: 15px;
    height: 20px;
    // left: 550px;
    cursor: pointer;
    margin-right: 8px;
`

const DashboardButton = styled.button`
    border-radius: 6px;
    background-color: white;
    border-width: 1px;
    border-color: rgb(0,0,0,0.1);
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 35px;
    width: 120px;
    font-size:12px;
    justify-content: center;
    margin-right: 16px;
    right: 110px;
    position: absolute;

    :hover{
        background-color: #5A9AF8;
        color: white;
    }

    &.active {
        
        :hover{
          background-color: #357AE0;
          color: white;
        }
        background-color: #5A9AF8;
        color: white;
    }
`


const ReportButton = styled.button`
    border-radius: 6px;
    background-color: white;
    border-width: 1px;
    border-color: rgb(0,0,0,0.1);
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 35px;
    width: 120px;
    font-size:12px;
    justify-content: center;    
    right: 0px;
    position: absolute;
    
    :hover{
        background-color: #5A9AF8;
        color: white;
    }

    &.active {
        :hover{
            background-color: #357AE0;
            color: white;
        }
        background-color: #5A9AF8;
        color: white;
    }
`

const SessionLabel = styled.div`
    width: 85px;
    height: 22px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: normal;
    text-align: left;

    color: #000000;
`

const CreatePrompt = styled.div`
    position: absolute;
    width: 664px;
    height: 37px;
    left: 387px;
    top: 364px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 31px;
    line-height: normal;

    color: #000000;
`

const CreateNewButton = styled.div`
    position: absolute;
    width: 221px;
    height: 56px;
    left: 609px;
    top: 442px;

    border: 1px solid #818181;
    box-sizing: border-box;
    border-radius: 10px;
    display: flex;
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: normal;

    color: #000000;
    justify-content: center;
    align-items:center;
    cursor: pointer;
`

const CreateNewButtonSmall = styled.div`
    position: absolute;
    width: 184px;
    height: 38px;
    // left: 1142px;
    right: 0px

    background: #F4F4F4;
    // border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 6px;

    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: normal;

    color: #000000;
    display: flex;
    justify-content: center;
    align-items:center;
    cursor: pointer;

    :hover{
        background-color: #5A9AF8;
        color: white;
      }
  
      &.active {
        
        :hover{
          background-color: #357AE0;
          color: white;
        }
        background-color: #5A9AF8;
        color: white;
      }
`

// const LabelOfNoOfStudents = styled.div`
//     position: absolute;
//     width: 117px;
//     height: 17px;
//     left: 889px;
//     top: 183px;

//     font-family: Roboto;
//     font-style: normal;
//     font-weight: normal;
//     font-size: 14px;
//     line-height: normal;

//     color: #474747;
// `

// const Line = styled.div`
//     position: absolute;
//     width: 1206.01px;
//     height: 0px;
//     left: 120px;
//     top: 217px;

//     border: 1px solid #C4C4C4;
//     transform: rotate(-0.24deg);
// `

// const SessionRowContainer = styled.div`
//     position: absolute;
//     width: 1122px;
//     height: 61px;
//     left: 120px;
//     top: 229px;
// `

// const StartTime = styled.div`
//     position: absolute;
//     left: 0%;
//     right: 76.17%;
//     top: 68.85%;
//     bottom: 0%;

//     font-family: Roboto;
//     font-style: normal;
//     font-weight: normal;
//     font-size: 16px;
//     line-height: normal;

//     color: #8F8F8F;
// `

const SessionRowContainer2 = styled.div`
    position: relative;
    // width: 1132px;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 40px;
`

const SessionLabel2 = styled.div`

    position: relative;
    width: 30% ;
    text-align: left;
    height: 24px;
    top: 0px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: normal;

    color: #176FBF;
`

const SessionStartTime = styled.div`
    width: 422px;
    height: 19px;
    top: 42px;
    margin-top: 15px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: normal;
    text-align: left;
    color: #8F8F8F;
`

const StudentNumber2 = styled.div`
    position: relative;
    width: 96.98px;
    height: 22px;
    left: 200px;
    top: 1px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: normal;

    color: #000000;
`

const OngoingLabel2 = styled.div`
    position: absolute;
    height: 25px;
    left: 300px;
    top: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    background: #E1E1E1;
    border-radius: 8px;
    width: 110px;
`

/* Main Component */
class Session extends React.Component <any, any> {

    public render(){

        return (
            <UserContext.Consumer>
                { value => 
                    {
                        //    if (value.userName === "" || value.userName === undefined || value.userName === null) {
                        //        return <div/>
                        //    } else {
                        //         return this.createThisPage(value) 
                        //    }
                        const { cookies } = this.props;
                        if (cookies !== undefined){
                            if (cookies.get("userName") === undefined || cookies.get("userName")=== ""){
                                setTimeout(()=>{
                                    this.props.history.push("/login")
                                }, 3000)
                                return <div> Redirecting to login </div>
                                
                            }
                        }
                        return this.createThisPage(value) 
                    } 
                }
            </UserContext.Consumer>
        )
    }

    public componentDidMount (){
        const { cookies } = this.props;
        // window.addEventListener("load", ()=>{
        //     if (cookies.get("userName") !== undefined && cookies.get("userAccessToken") !== undefined && cookies.get("userIdToken") !== undefined){
        //         this.props.setUser( cookies.get("userName"), cookies.get("userAccessToken"), cookies.get("userIdToken") )    
        //     }  
        // })

        // window.addEventListener("onload", ()=>{
        //     if (cookies.get("userName") !== undefined && cookies.get("userAccessToken") !== undefined && cookies.get("userIdToken") !== undefined){
        //         this.props.setUser( cookies.get("userName"), cookies.get("userAccessToken"), cookies.get("userIdToken") )    
        //     }  
        // })
        if (cookies.get("userName") !== undefined && cookies.get("userAccessToken") !== undefined && cookies.get("userIdToken") !== undefined){
            this.props.setUser( cookies.get("userName"), cookies.get("userAccessToken"), cookies.get("userIdToken"), cookies.get("userSessions") )    
        }
    }

    private onReload() {
        this.props.setUser()
        // I will set the user information. 
    }

    private navigateToCreation = ()=> {
        this.props.history.push("/createsession")
    }

    private createThisPage = (context: any)=>{
        
        const sessionNumber = context.userSessions.length;
        switch (sessionNumber) {

            case 0:
                return( 
                    <Layout history={this.props.history} userName={context.userName} logoutAction={this.props.logoutAction}>
                        <div>
                            <SessionLabel> SESSIONS </SessionLabel>
                            <CreatePrompt> Seems like you have no previous PFACS Session </CreatePrompt>
                            <CreateNewButton onClick={this.navigateToCreation}> Create a new session </CreateNewButton>
                        </div>
                    </Layout>
                )

            default:
                return (
                    // like the user name will be gone hmm. One way is to extract the data from Cookie 
                    // if the context is the same 
                    // or I can just set the user.
                    <Layout history={this.props.history} userName={context.userName} logoutAction={this.props.logoutAction}>
                        <Grid style={{position:"absolute", top:"43px", width:"100%"}}>
                            <GridRow>
                                <GridColumn width="1"/>
                                <GridColumn width="14" style={{background:"#FFFFFF", width:"100%", height:"75vh", margin:"14px", padding:"50px 50px 50px 50px"}}>
                                        <Grid>
                                        <Grid.Row >
                                            <Grid.Column width="8" style={{paddingLeft: "0px"}}>
                                                <SessionLabel> Sessions </SessionLabel>
                                            </Grid.Column>
                                            <Grid.Column width="8">
                                                <CreateNewButtonSmall onClick={this.navigateToCreation}> Create a new session </CreateNewButtonSmall>  
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            {/* <Container> */}
                                            <ul style={{listStyleType:"none", paddingLeft:"0", width:"100%"}}>
                                                {this.createSessions(context.userSessions)}
                                            </ul>
                                            {/* </Container> */}
                                        </Grid.Row>

                                        </Grid>                                        
                                </GridColumn>
                            </GridRow>
                        </Grid>
                    </Layout>
                )   
            }
    }

    private createSessions = (dummyDataList: ISession[]) => {
        return(
            <div>
                {dummyDataList.map(dummy => 
                    <li  key={dummy.sessionName}>
                        <SessionRowContainer2 key={dummy.sessionName}>

                            <div style={{display: "flex", alignItems:"center"}}>
                                <SessionLabel2>{dummy.sessionName} </SessionLabel2>
                                { dummy.ongoing ?  <OngoingLabel2> Ongoing </OngoingLabel2> : <div/>}
                                <StudentNumber2> {dummy.studentNumber} Students </StudentNumber2> 
                                
                                <DashboardButton onClick={()=>this.dashboardClick(dummy.sessionId)}>
                                    <span>
                                        <DashboardIcon icon="tachometer-alt" size="2x"/>
                                    </span>
                                    <span>
                                        Dashboard
                                    </span>
                                </DashboardButton>
                                
                                <ReportButton onClick={()=>this.reportClick(dummy.sessionId)}>
                                    <span>
                                        <ReportIcon icon={["far","file-alt"]} size="2x"/>
                                    </span>

                                    <span>
                                        Report
                                    </span>
                                </ReportButton>

                            </div>                     

                            <SessionStartTime> {dummy.startTime} </SessionStartTime>
                            
                        </SessionRowContainer2>
                    </li>
                )}
            </div>
        )
    }

    private dashboardClick = (sessionId: string) => {
        this.props.changeCurrentSession(sessionId, "dashboard")
        this.props.history.push("/livedashboard")
    }

    private reportClick = (sessionId: string) => {
        this.props.changeCurrentSession(sessionId, "report")
        this.props.history.push("/livedashboard")
    }
}

export default withCookies(Session)