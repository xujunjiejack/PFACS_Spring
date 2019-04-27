import axios from "axios"
import * as React from 'react';

import {Button, Label } from "semantic-ui-react"
import * as openSocket from 'socket.io-client';
import styled from "styled-components";
import './App.css'

const DataTestGround = styled.div`
    position: absolute;
    width: 1143px;
    height: 441px;
    left: 147px;
    top: 800px;
    background: #FFFFFF;
`

const socket = openSocket("http://localhost:8080")

const OverallClassPerformanceContainer = styled.div`
    position: absolute;
    width: 1143px;
    height: 441px;
    left: 147px;
    top: 279px;

    background: #FFFFFF;
`

const SectionHeader = styled.div`
    position: absolute;
    left: 4.55%;
    top: 9.52%;
    bottom: 85.49%;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: normal;

    color: #000000;
`

const SubTitle = styled.div`
    position: absolute;
    left: 4.55%;
    top: 16.78%;
    bottom: 78.23%;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: normal;

    color: #565656;
`

const TotalStudent = styled.div`
    position: absolute;
    left: 62.2%;
    right: 21.7%;
    top: 11.56%;
    bottom: 84.58%;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: normal;

    color: #7F7F7F;
`


const StudentsCount = styled.div`
    position: absolute;
    left: 62.2%;
    top: 11.56%;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: normal;

    color: #7F7F7F;
`


const LeftLabel1 = styled.div`
    position: absolute;
    left: 4.55%;
    right: 81.36%;
    top: 32.88%;
    bottom: 58.28%;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: normal;
    text-align: right;

    color: #000000;
`

const LeftLabel2 = styled.div`
    position: absolute;
    left: 5.16%;
    right: 81.89%;
    top: 45.8%;
    bottom: 47.17%;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: normal;
    text-align: right;

    color: #000000;
`

const LeftLabel3 = styled.div`
    position: absolute;
    left: 5.51%;
    right: 81.63%;
    top: 60.09%;
    bottom: 33.56%;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: normal;
    text-align: right;

    color: #000000;
`

const LeftLabel4 = styled.div`
    position: absolute;
    left: 5.42%;
    right: 81.71%;
    top: 71.66%;
    bottom: 22%;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: normal;
    text-align: right;

    color: #000000;
`

const YAxis = styled.div`
    position: absolute;
    left: 10.15%;
    top: 250px;
    width: 247px;
    border: 1px solid #C3C3C3;
    transform: matrix(0, 1, 1, 0, 0, 0);
`

const XAxis = styled.div`
    position: absolute;
    left: 20.73%;
    right: 21.78%;
    top: 84.81%;
    bottom: 15.19%;

    border: 1px solid #C3C3C3;
    transform: rotate(-0.09deg);

`

const GraphBar1 = styled.div`
    position: absolute;
    left: 21.17%;
    right: 21.78%;
    top: 32.88%;
    bottom: 60.54%;
    background-color: aqua;
`

const G1Familiar = styled.div`
    position: absolute;
    left: 0%;
    right: 26.23%;
    top: 0%;
    bottom: 0%;
    background: #EAF2E4;
`

const G1NotFamiliar = styled.div`
    position: absolute;
    left: 73.77%;
    right: 12.12%;
    top: 0%;
    bottom: 0%;

    background: #C45250;
`

const G1NotEnoughData = styled.div`
    position: absolute;
    left: 87.73%;
    right: 0%;
    top: 0%;
    bottom: 0%;

    background: #DFB58F;
`


const GraphBar2 = styled.div`
    position: absolute;
    left: 21.26%;
    right: 21.7%;
    top: 46.26%;
    bottom: 47.17%;
    background-color: aqua;
`

const G2Familiar = styled.div`
    position: absolute;
    left: 0%;
    right: 26.23%;
    top: 0%;
    bottom: 0%;
    background: #EAF2E4;
`

const G2NotFamiliar = styled.div`
    position: absolute;
    left: 73.77%;
    right: 12.12%;
    top: 0%;
    bottom: 0%;

    background: #C45250;
`

const G2NotEnoughData = styled.div`
    position: absolute;
    left: 87.73%;
    right: 0%;
    top: 0%;
    bottom: 0%;

    background: #DFB58F;
`

const GraphBar3 = styled.div`
    position: absolute;
    left: 21.17%;
    right: 21.78%;
    top: 59.18%;
    bottom: 34.24%;
    background-color: aqua;
`

const G3Familiar = styled.div`
    position: absolute;
    left: 0%;
    right: 53.22%;
    top: 0%;
    bottom: 0%;

    background: #EAF2E4;
`

const G3NotFamiliar = styled.div`
    position: absolute;
    left: 46.78%;
    right: 18.87%;
    top: 0%;
    bottom: 0%;

    background: #C45250;
`

const G3NotEnoughData = styled.div`
    position: absolute;
    left: 81.13%;
    right: 0%;
    top: 0%;
    bottom: 0%;

    background: #DFB58F;
`

const GraphBar4 = styled.div`
    position: absolute;
    left: 21.17%;
    right: 21.78%;
    top: 72.34%;
    bottom: 21.09%;
    background-color: aqua;
`

const G4Familiar = styled.div`
    position: absolute;
    left: 0%;
    right: 66.26%;
    top: 0%;
    bottom: 0%;

    background: #EAF2E4;
`

const G4NotFamiliar = styled.div`
    position: absolute;
    left: 33.74%;
    right: 12.12%;
    top: 0%;
    bottom: 0%;

    /* Incorrect */
    background: #C45250;
`

const G4NotEnoughData = styled.div`
    position: absolute;
    left: 87.73%;
    right: 0%;
    top: 0%;
    bottom: 0%;

    /* No_attempt_color */
    background: #DFB58F
`

const LegendTitle = styled.div`
    
    margin-top: 20%;
    
    padding-left: 15%;
    padding-bottom: 4%;
    text-align: left;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: normal;

    color: #000000;
`

const Rect = styled.div <{color: string}> `
    position: absolute;
    left:15.08%;
    width:15px;
    height:15px;
    background-color: ${props=>props.color};
    margin-right: 6px;
    // display: block;
    display: inline-block;   
`

const LegendContainer = styled.div`    
    position: absolute;
    width: 179px;
    height: 162px;
    left: 942px;
    top: 22px;
    
`

const LegendText = styled.div`
    position: absolute;
    left: 25%;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: normal;
    display: inline;

    color: #000000;
`

const IndividualLegend = styled.div`
    
`


class DetailedReport extends React.Component<any, any> {

    constructor (props: any){
        super(props)
        this.state = { socketData: "placeholder" }
        socket.on("message", (message: string)=>{
            console.log("Receiving: " + message)
            this.setState( {socketData: message} ) 
          })
    }

    public render(){
        return(
            <React.Fragment>
                
                <OverallClassPerformanceContainer>
                    
                    <SectionHeader>
                        Overall Class Performance 
                    </SectionHeader>
                    
                    <SubTitle>
                        Students usage of Bar, Line, and Heat Map
                    </SubTitle>

                    <StudentsCount>
                        Total students present: 24/24
                    </StudentsCount>

                    <LeftLabel1>
                        Understand which presentation to choose
                    </LeftLabel1>

                    <LeftLabel2>
                        Understand how to infer a line data
                    </LeftLabel2>

                    <LeftLabel3>
                        Understand how to infer a bar graph 
                    </LeftLabel3>

                    <LeftLabel4>
                        Understand how to infer a heatmap 
                    </LeftLabel4>

                    <YAxis/>

                    <XAxis/>

                    <GraphBar1>
                        <G1Familiar/>
                        <G1NotFamiliar/>
                        <G1NotEnoughData/>
                    </GraphBar1>

                    <GraphBar2>
                        <G2Familiar/>
                        <G2NotFamiliar/>
                        <G2NotEnoughData/>

                    </GraphBar2>

                    <GraphBar3>
                        <G3Familiar/>
                        <G3NotFamiliar/>
                        <G3NotEnoughData/>
                    </GraphBar3>

                    <GraphBar4>
                        <G4Familiar/>
                        <G4NotFamiliar/>
                        <G4NotEnoughData/>
                    </GraphBar4>
                    

                    <LegendContainer>
                        <LegendTitle> Legend </LegendTitle>
                        <IndividualLegend>
                            <Rect color="#EAF2E4"/> 
                            <LegendText>
                                Familiar
                            </LegendText>
                        </IndividualLegend>
                        <br/>

                        <IndividualLegend>
                            <Rect color="#C45250"/> 
                            <LegendText>
                                InFamiliar
                            </LegendText>
                        </IndividualLegend>

                        <br/>

                        <IndividualLegend>
                            <Rect color="#DFB58F"/> 
                            <LegendText>
                                Not enough data
                            </LegendText>
                        </IndividualLegend>

                    </LegendContainer>

                </OverallClassPerformanceContainer>
                
                <DataTestGround>
                <Button onClick={this.getGraphUsage}>
                        Click me to get data 
                    </Button>

                <Label>
                    {this.state.socketData}
                </Label>
                </DataTestGround>

                

                {/* Individual Performance componenet */}
                {/* Now my goal is to write out the component that has no responsive ability. It will  */}
            </React.Fragment>
        )
    }

    private getGraphUsage = () =>{
        axios.get("/mongodata/graphusage").then( res =>
            this.setState({socketData:JSON.stringify(res.data)}) 
        )
        return 
    }
}


export default DetailedReport
