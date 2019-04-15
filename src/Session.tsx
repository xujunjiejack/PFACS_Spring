import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios";
import * as React from "react";
import {GoogleLogin, GoogleLoginResponse} from "react-google-login"
import styled from "styled-components"
import { HeaderText, TitleText } from "./AppStyle";
import {ISession, UserContext} from "./Context"
import {Layout} from "./Layout"


const dummySessionNumbers:number = 1

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

export class Session extends React.Component <any, any> {

    public render(){
        // Here is my thoughts about what is going on.
        // So the problem is that given that I hard code the dummy session numbers, the ts detect that the dummuy sessions number will be met the 
        // condition to true branch. ts lint checked it. What if I don't use the else? It might trigger the fact that there is no false case. Nah, it just agree with the fact that 
        // some condition in if can be constantly false. Use switch?

        // WTF... 1 has a type of 1........ all right
        // Never mind, it works now 
           {/* 
                                What I want is to use the font-awesome icon in this page. So I need to set up something
                                Next point is that how to position the icon. I think styled componenet can finish this thing        
                                It works. So I can also add OnClick to make it work 
                                Also, how to make the icon larger? Height and weight
                                
                                I'm thinking about what is the next step. How the backend can work will help the front-end work
                                One part of the database is that we need a way to store the teachers' sessions. Students they add in. and how they work with. the operation for the session
                                is to add, delete, modify, add students(do we actually need?) Is there any other functionality? If not, I will go on.

                                I doubt I will add those information to the firebase, because it's not related to the stuff. 
                                So it comes back to this talk, how will the login system work? What identifiers the user will have for our dashboard side. A simple remember system surely works
                                
                                Well I can just create a new collection with teachers, sessions and its associated students. I need to figure it out a little bit in the backend. I think this is somewhat essential to the work.
                                Also, I think dynamically generating the session row is also important right now 

                                Now I'm thinking about two tasks I need to do: 
                                    Kind of dynamically generating the session row 
                                    Bind the user data within the web-app

                                For the first task:
                                    What do I need?
                                        Need some dummy data     
                                        Need the elements position in each component in Figma 

                                    What is the process?
                                        Write an individual session within a container
                                        Based on the dummy data, auto generate the multiple rows  

                                For the second task:
                                    What do I need?
                                        I need a map of the data flow, and some interaction flows 
                                        A dummy data output place 
                                    
                                    What is the process?
                                        Create the map of data flow
                                        And then implement the data


                            */}

        // Actually I was wrong about one thing. I should have used the consumer before the switch. What di I think it can't be done? Just 
        // because the switch statment??


        return (
            <UserContext.Consumer>
                {
                    value => this.createThisPage(value)
                }
            </UserContext.Consumer>
        )
        // switch (dummySessionNumbers) {
        //     case 0:
        //      return( 
        //         <UserContext.Consumer>
        //             {
        //                 value => 
        //                     <Layout history={this.props.history}>
        //                         <div>
        //                             <SessionLabel> SESSIONS </SessionLabel>
        //                             <CreatePrompt> Seems like you have no previous PFACS Session </CreatePrompt>
        //                             <CreateNewButton onClick={this.navigateToCreation}> Create a new session </CreateNewButton>
        //                         </div>
        //                     </Layout>
        //             }

        //         </UserContext.Consumer>)
                
        //     case 1: 
        //         return (
        //             <UserContext.Consumer>{
        //                 value => 
        //                     <Layout history={this.props.history}>
        //                         <div>
        //                             <SessionLabel> SESSIONS </SessionLabel>
        //                             <CreateNewButtonSmall onClick={this.navigateToCreation}> Create a new session </CreateNewButtonSmall>  
        //                             <LabelOfNoOfStudents> No. Of Students </LabelOfNoOfStudents>  
        //                             <Line/>

        //                             {/* <SessionRowContainer style={{marginTop: "12px"}}>
        //                                 <StartTime> 23 July, 2017 - Started at 4:50pm </StartTime>
        //                                 <OngoingLabel> ONGOING </OngoingLabel>
        //                                 <SessionName> Spring 2019 Math Assessment </SessionName>
        //                                 <StudentNumber> 24 Students </StudentNumber>
        //                             </SessionRowContainer>
        //                             <SessionRowContainer style={{marginTop: "12px"}}>
        //                                 <StartTime> 23 July, 2017 - Started at 4:50pm </StartTime>
        //                                 <OngoingLabel> ONGOING </OngoingLabel>
        //                                 <SessionName> Spring 2019 Math Assessment </SessionName>
        //                                 <StudentNumber> 24 Students </StudentNumber>
        //                             </SessionRowContainer> */}


        //                             {/* Todo: link the dummyData with the session data */}
        //                             {this.createSessions(dummyData)}
        //                         </div>
        //                     </Layout>
        //             }
        //             </UserContext.Consumer>
        //         )  

        //     default:
        //         return(
        //             <div>Hello</div>
        //         )
        // }
    }

    private navigateToCreation = ()=> {
        console.log("navigate")
        this.props.history.push("/createsession")
    }

    private createThisPage = (context: any)=>{
        
        const sessionNumber = context.userSessions.length;
        console.log(context)
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

                        {/* <SessionRowContainer style={{marginTop: "12px"}}>
                            <StartTime> 23 July, 2017 - Started at 4:50pm </StartTime>
                            <OngoingLabel> ONGOING </OngoingLabel>
                            <SessionName> Spring 2019 Math Assessment </SessionName>
                            <StudentNumber> 24 Students </StudentNumber>
                        </SessionRowContainer>
                        <SessionRowContainer style={{marginTop: "12px"}}>
                            <StartTime> 23 July, 2017 - Started at 4:50pm </StartTime>
                            <OngoingLabel> ONGOING </OngoingLabel>
                            <SessionName> Spring 2019 Math Assessment </SessionName>
                            <StudentNumber> 24 Students </StudentNumber>
                        </SessionRowContainer> */}


                        {/* Todo: link the dummyData with the session data */}
                        {this.createSessions(context.userSessions)}
                    </div>
                </Layout>
        
    )
        }
    }

    /*
        Illustrate the problems 
        Now the problem is that both of those two rows are floating at the top of everything 
        I need to bring it down to the middle.
        So what is the problem? What are other probems. Why is it wrong?
        Because when I imagine it, it will be "absolute" related to the session row container.
        But I'm wondering where my row is. Where is the container. How does this work right now? 
        The div is where I expect it to be. How about me changing things to the relative? It might work because relative will first position itself at where it is.
        

    */
    private createSessions = (dummyDataList: ISession[]) => {
        return(
            // <React.Fragment>
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
            // {/* </React.Fragment> */}
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

