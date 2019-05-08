import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios";
import * as React from "react";
import {GoogleLogin, GoogleLoginResponse} from "react-google-login"
import styled from "styled-components"
import {ISession, UserContext} from "../Context"
import {Layout} from "../Layout"


/* CSS For the components */
const DashboardIcon = styled(FontAwesomeIcon)`
    position: relative;
    width: 29px;
    height: 25px;
    left: 510px;
    cursor: pointer; 
`

const ReportIcon = styled(FontAwesomeIcon)`
    position: relative;
    width: 17px;
    height: 25px;
    left: 550px;
    cursor: pointer;
`


const SessionLabel = styled.div`
    position: absolute;
    width: 85px;
    height: 22px;
    left: 144px;
    top: 113px;

    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: normal;

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
    left: 1142px;
    top: 105px;

    background: #F4F4F4;
    border: 1px solid #000000;
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
`

const LabelOfNoOfStudents = styled.div`
    position: absolute;
    width: 117px;
    height: 17px;
    left: 889px;
    top: 183px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: normal;

    color: #474747;
`

const Line = styled.div`
    position: absolute;
    width: 1206.01px;
    height: 0px;
    left: 120px;
    top: 217px;

    border: 1px solid #C4C4C4;
    transform: rotate(-0.24deg);
`

const SessionRowContainer = styled.div`
    position: absolute;
    width: 1122px;
    height: 61px;
    left: 120px;
    top: 229px;
`

const StartTime = styled.div`
    position: absolute;
    left: 0%;
    right: 76.17%;
    top: 68.85%;
    bottom: 0%;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: normal;

    color: #8F8F8F;
`

const SessionRowContainer2 = styled.div`
    position: relative;
    top: 250px;
    width: 1132px;
    left: 121px;
    margin-top: 15px;
    margin-bottom: 40px;
`

const SessionLabel2 = styled.div`

    position: relative;
    width: 30% ;
    text-align: left;
    height: 24px;
    left: 20px;
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
    margin-left: 20px;
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
    left: 400px;
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
    width: 110.11px;
    height: 25px;
    left: 400px;
    top: 3px;
    display: inline-block;

    background: #E1E1E1;
    border-radius: 8px;
`

/* Main Component */
export class Session extends React.Component <any, any> {

    public render(){

        return (
            <UserContext.Consumer>
                { value => this.createThisPage(value) }
            </UserContext.Consumer>
        )
    }

    private navigateToCreation = ()=> {
        this.props.history.push("/createsession")
    }

    private createThisPage = (context: any)=>{
        
        const sessionNumber = context.userSessions.length;
        switch (sessionNumber) {

            case 0:
                return( 
                    <Layout history={this.props.history}>
                        <div>
                            <SessionLabel> SESSIONS </SessionLabel>
                            <CreatePrompt> Seems like you have no previous PFACS Session </CreatePrompt>
                            <CreateNewButton onClick={this.navigateToCreation}> Create a new session </CreateNewButton>
                        </div>
                    </Layout>
                )

            default:
                return (
                    <Layout history={this.props.history}>
                        <div>
                            <SessionLabel> SESSIONS </SessionLabel>
                            <CreateNewButtonSmall onClick={this.navigateToCreation}> Create a new session </CreateNewButtonSmall>  
                            <LabelOfNoOfStudents> No. Of Students </LabelOfNoOfStudents>  
                            <Line/>

                            {this.createSessions(context.userSessions)}
                        </div>
                    </Layout>
                )   
            }
    }

    private createSessions = (dummyDataList: ISession[]) => {
        return(
            <div>
                {dummyDataList.map(dummy => 
                
                    <SessionRowContainer2 key={dummy.sessionName}>

                        <div style={{display: "flex", alignItems:"center"}}>
                            <SessionLabel2>{dummy.sessionName} </SessionLabel2>
                            { dummy.ongoing ?  <OngoingLabel2> Ongoing </OngoingLabel2> : <div/>}
                            <StudentNumber2> {dummy.studentNumber} Students </StudentNumber2> 
                            <span onClick={()=>this.dashboardClick(dummy.sessionId)}>
                                <DashboardIcon icon="tachometer-alt" size="2x"/>
                            </span>
                            <span onClick={()=>this.reportClick(dummy.sessionId)}>
                                <ReportIcon icon={["far","file-alt"]} size="2x"/>
                            </span>

                        </div>                     

                        <SessionStartTime> {dummy.startTime} </SessionStartTime>
                        
                    </SessionRowContainer2>
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

