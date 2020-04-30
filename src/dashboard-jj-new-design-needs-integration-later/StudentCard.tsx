import * as React from 'react';
import { Grid, GridColumn, GridRow, Icon, Tab, MenuItem, Button } from "semantic-ui-react"
import styled from "styled-components";
import TextTruncate from 'react-text-truncate';

// Need a place for generating the random data. 
// What will be the data? 

const dataArray : Number[] = []
// The category will be:
//      0: Student used no data to make prediction
//      1: Student made wrong decisions using data 
//      2: Student make right decision using bar graph
//      3: Student make right decision using both line graph and bar graph
//      4: Student win a game
//      5: Student loses a game 
// will random generate 0 - 1-3 for 130 

for (let i=0; i< 130; i++){
    dataArray.push(Math.floor(Math.random() * 3.1))
}

console.log(dataArray)

const StudentCardContainer = styled.div`
    height: 100%; 
    width: 450px;

    position: absolute; 
    right: 0px;
    top:0;

    padding: 30px;
    
    background-color: white;
    border: 1px solid #c9c9c9;

    transform: translate(450px, 0);
    transition: 0.5s ease-in;
    
    &.active {
        && {
             transform: translate(0,0);   
        }
    }

    & div {
        display: flex; 
    }
`

const HeaderSection = styled.div`
    flex-direction: row;
    justify-content: flex-start; 
    align-items: center;
    position: relative;   
`

const AssessmentTargetPerformanceContainer = styled.div`
    flex-direction: column;
    align-items: flex-start; 
    // justify-content: center;
    margin-top: 20px;

`

const GameStatsContainer = styled.div`
    flex-direction: column; 
    align-items: flex-start; 
    // justify-content: center;
    margin-top: 20px;
`

const GraphContainer = styled.div`
    flex-direction: column;
    margin-top: 20px;
`

const SectionTitleContainer = styled.div`
    flex-direction: row;
    justify-content:flex-start;
    align-items: center;
    position: relative;
    width: 100%;

    & : before {
        content:"";
        width: 6px;
        height: 6px; 
        background: #0e2d34;
        border-radius:50%; 
        position: absolute;
        top: calc(50% - 3px);
        left: -10px;
    }
`

interface IndividualSongDecisionBarProps {
    readonly value: Number; 
}

const IndividualSongDecisionBar = styled.div <IndividualSongDecisionBarProps> `
    width:4px;
    height:20px;
    margin-right:3px;
    border:${props => props.value === 0 ? "2px solid #eeeeee" : "none" };

    background: ${props => props.value === 1? "#80cfe1" 
                                : props.value === 2 ? "#00a0c3" 
                                    : props.value === 0 ? "#transparent" : "#00a0c3" };

    position: relative;

    ${ props => props.value === 3 ? `
        &:before {
            content: "";
            position: absolute;
            height: 2px;
            width: 4px;
            background: white;
            left: 0;
            top: 9px;
        }
    ` : "" }
`


interface KeyEntryIndicatorProps {
    readonly value: Number; 
}

const KeyEntryIndicator = styled.div <KeyEntryIndicatorProps> `
    width:16px; 
    height:16px;
    position: relative;
    align-items: center;


    border:${props => props.value === 0 ? "2px solid #eeeeee" : "none" };

    background: ${props => props.value === 1? "#80cfe1" 
                                : props.value === 2 ? "#00a0c3" 
                                    : props.value === 0 ? "#transparent" : "#00a0c3" };

    // &::after {
    //     content: "Student used no data to make prediction";
    //     position: relative; 
    //     left: 24px;
    //     width: 200px;
    //     display: inline-block;
    // }
`

const GraphKeyEntry = ({text, graphKeyValue}) => {
    return (
        <div style={{alignItems:"center", margin:"5px 0"}}> 
            <KeyEntryIndicator value={graphKeyValue}/>
            <div style={{marginLeft:"10px", textAlign: "left"}}>{text}</div>
        </div>
    )
}

const IndividualAssessmentTarget = ({assessmentTargetName, level}) => {
    return (
        <React.Fragment>
            <div style={{flexDirection:"row", width: "100%"}}> 
                <div className={"text-truncate-parent"} style={{width:"60%", marginRight:"10%"}}>
                    <TextTruncate
                        // style={{width:"50px"}}
                        line={1}
                        containerClassName="text-truncate-parent"
                        truncateText="…"
                        text={assessmentTargetName}
                        // textTruncateChild={<a href="#">Read on</a>}
                    />
                </div>
                <div style={{width:"30%", justifyContent:"flex-end"}}>
                    Level {level}
                </div>
            </div>
        </React.Fragment>
    )
}


const StudentCard = ({ individualStatsShownUp, closeIndividualStats, studentData, ...props }) => {
    // Student data will have a lot of stuff going on

    // Figure out how many row needed.
    const createProgressFlow = () => {
        let rowNumber = Math.ceil(dataArray.length / 50) 
        
        return (
            <React.Fragment>
                {
                    new Array(rowNumber).fill(0).map((value, index) => {
                        let startIndex = index * 50;
                        let endIndex = (index + 1) * 50;
                        let dataForTheWork = dataArray.slice(startIndex, endIndex)
                        console.log(index)
                        return (
                            <React.Fragment>
                                <div style={{flexDirection:"column", margin: "10px 0 5px 0"}}> 
                                    <div style={{height: "", width:"100%"}}>
                                        {
                                            dataForTheWork.map( (v) => {
                                                return (<IndividualSongDecisionBar value={v}></IndividualSongDecisionBar>)
                                            })
                                        }
                                    </div>

                                    <div style={{display:"flex", width:"100%", height:"1px", backgroundColor:"#eeeeee", margin:"10px 0 3px 0 "}}></div>
                                    {/* Index of songs */}
                                    <div style={{flexDirection:"row", width:"100%", position:"relative", alignItems:"center"}}> 
                                        <p style={{margin:"0 auto 0 0", lineHeight:"30px"}}> {startIndex}th song </p>
                                        <p style={{margin:"0 0 0 auto", lineHeight:"30px"}}> {endIndex}th song </p>
                                    </div>
                                </div>
                            </React.Fragment>                            
                        )
                    })
                }
            </React.Fragment>
        )
    }

    {/* Student card */ }
    return (
        < StudentCardContainer {...props} className = { individualStatsShownUp ? "active" : "" } >
            
            {/* Header */}
            <HeaderSection>
                { studentData }
                <Button style={{position:"absolute", right: 10}} onClick = {()=> { closeIndividualStats() }}> Close </Button>           
            </HeaderSection>

            {/* Assessment Target Performance */}
            <AssessmentTargetPerformanceContainer>
                
                <SectionTitleContainer>
                    <div style={{marginRight:"10%", width: "60%"}}>
                        Assessment Targets Performance
                    </div> 

                    <div style={{width: "30%", justifyContent:"flex-end"}}> Learn more </div>

                </SectionTitleContainer>

                {/* Divider */}
                <div style={{width: "100%", height:"1px", backgroundColor:"#eeeeee"}}/>

                {/* Actual content */}
                {/* Collection and storage: Students are able… */}
                <IndividualAssessmentTarget assessmentTargetName="Collection and storage: Students are able to identify variables that should be collected for a specific situation."
                    level={1} />

                <IndividualAssessmentTarget assessmentTargetName="Visualization and inferences: Students are able to use an appropriate representation of data to make predictions."
                    level={2} />

                <IndividualAssessmentTarget assessmentTargetName="Collection and storage: Students are able to identify variables that should be collected for a specific situation."
                    level={3} />

            </AssessmentTargetPerformanceContainer>

            {/* Game Statistics */}
            <GameStatsContainer>
                {/* Title */}
                <SectionTitleContainer>
                    <div style={{marginRight:"10%", width: "60%"}}>
                        Game statistics
                    </div> 

                </SectionTitleContainer>

                {/* Divider */}
                <div style={{width: "100%", height:"1px", backgroundColor:"#eeeeee"}}/>

                <div style={{flexDirection:"row", width: "100%"}}> 
                    <div className={"text-truncate-parent"} style={{width:"60%", marginRight:"10%"}}>
                        {/* <TextTruncate
                            // style={{width:"50px"}}
                            line={1}
                            containerClassName="text-truncate-parent"
                            truncateText="…"
                            text="Play time"
                            // textTruncateChild={<a href="#">Read on</a>}
                        /> */}
                        Play time

                    </div>
                    <div style={{width:"30%", justifyContent:"flex-end"}}>
                        30%
                    </div>
                </div>
                
                <div style={{flexDirection:"row", width: "100%"}}> 
                    <div className={"text-truncate-parent"} style={{width:"60%", marginRight:"10%"}}>
                        <TextTruncate
                            // style={{width:"50px"}}
                            line={1}
                            containerClassName="text-truncate-parent"
                            truncateText="…"
                            text="Percentage of checking graphs before making decisions"
                            // textTruncateChild={<a href="#">Read on</a>}
                        />
                    </div>
                    <div style={{width:"30%", justifyContent:"flex-end"}}>
                        30%
                    </div>
                </div>

                <div style={{flexDirection:"row", width: "100%"}}> 
                    <div className={"text-truncate-parent"} style={{width:"60%", marginRight:"10%"}}>
                        <TextTruncate
                            // style={{width:"50px"}}
                            line={1}
                            containerClassName="text-truncate-parent"
                            truncateText="…"
                            text="Success rate for making the best song with graphs"
                            // textTruncateChild={<a href="#">Read on</a>}
                        />
                    </div>
                    <div style={{width:"30%", justifyContent:"flex-end"}}>
                        30%
                    </div>
                </div>
                

                {/* Game statistics */}
            </GameStatsContainer>

            {/* Performance in using graphs */}
            <GraphContainer>
                <SectionTitleContainer>
                    <div style={{marginRight:"10%", width: "70%", justifyContent:"flex-start"}}>
                        Performance in using graphs for each song
                    </div> 

                </SectionTitleContainer>

                {/* Divider */}
                <div style={{width: "100%", height:"1px", backgroundColor:"#eeeeee", margin:"5px 0 15px 0 "}}/>
                
                {/* Needs some calculation */}
                <div style={{flexDirection:"column", width:"100%"}}>
                    {createProgressFlow()}
                </div>
                
                {/* The key */}
                <div style={{flexDirection:"column", width: "100%"}}>
                    <GraphKeyEntry text="Student used no data to make prediction" graphKeyValue={0}/>
                    <GraphKeyEntry text="Student made wrong decisions using data" graphKeyValue={1}/>
                    <GraphKeyEntry text="Student make right decision using bar graph" graphKeyValue={2}/>
                    <GraphKeyEntry text="Student make right decision using both line graph and bar graph" graphKeyValue={3}/>
                    <GraphKeyEntry text="Student won a game" graphKeyValue={4}/>
                    <GraphKeyEntry text="Student loses a game" graphKeyValue={5}/>
                </div>
            </GraphContainer>
                        

        </StudentCardContainer > 
    )
}

export {StudentCard}