import axios from "axios";
import * as React from "react";
import {GoogleLogin, GoogleLoginResponse} from "react-google-login"
import styled from "styled-components"
import { HeaderText, TitleText } from "./AppStyle";
import {UserContext} from "./Context"
import {Layout} from "./Layout"

const dummySessionNumbers = 0

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

const OngoingLabel = styled.div`
    position: absolute;
    left: 31.47%;
    right: 57.43%;
    top: 4.92%;
    bottom: 54.1%;

    background: #E1E1E1;
    border-radius: 8px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: normal;

    color: #000000;
    display: flex;
    justify-content: center;
    align-items:center;
    cursor: pointer;
`

const SessionName = styled.div`
    position: absolute;
    left: 0%;
    right: 72.71%;
    top: 0%;
    bottom: 60.66%;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: normal;

    color: #176FBF;
`

const StudentNumber = styled.div`
    position: absolute;
    left: 65.23%;
    right: 11%;
    top: 1.64%;
    bottom: 62.3%;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: normal;
    color: #000000;
`

export class Session extends React.Component <any, any> {

    public render(){
        if (dummySessionNumbers === 0){
            return (
                <Layout history={this.props.history}>
                    <div>
                        <SessionLabel> SESSIONS </SessionLabel>
                        <CreatePrompt> Seems like you have no previous PFACS Session </CreatePrompt>
                        <CreateNewButton onClick={this.navigateToCreation}> Create a new session </CreateNewButton>
                    </div>
                </Layout>
            )
        }
        else {
            return ( <Layout history={this.props.history}>
                        <div>
                            <SessionLabel> SESSIONS </SessionLabel>
                            <CreateNewButtonSmall onClick={this.navigateToCreation}> Create a new session </CreateNewButtonSmall>  
                            <LabelOfNoOfStudents> No. Of Students </LabelOfNoOfStudents>  
                            <Line/>

                            <SessionRowContainer style={{marginTop: "12px"}}>
                                <StartTime> 23 July, 2017 - Started at 4:50pm </StartTime>
                                <OngoingLabel> ONGOING </OngoingLabel>
                                <SessionName> Spring 2019 Math Assessment </SessionName>
                                <StudentNumber> 24 Students </StudentNumber>
                            </SessionRowContainer>

                        </div>
                    </Layout>
            )
        }
    }

    private navigateToCreation = ()=> {
        console.log("navigate")
        this.props.history.push("/createsession")
    }
}

