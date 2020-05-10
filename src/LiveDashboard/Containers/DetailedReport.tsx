import axios from "axios"
import * as React from 'react';

import {Button, Label } from "semantic-ui-react"
// import * as openSocket from 'socket.io-client';
import openSocket from 'socket.io-client';
import * as StyledComponents from '../StyledComponents/DetailedReportStyledComponents';

const socket = openSocket("http://localhost:3001");

/* The component */
class DetailedReport extends React.Component<any, any> {

    private underConstruction = true

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
                
                {
                    this.underConstruction ? <div> Under Construction </div> 
                    :
                <StyledComponents.OverallClassPerformanceContainer>
                    
                    <StyledComponents.SectionHeader>
                        Overall Class Performance 
                    </StyledComponents.SectionHeader>
                    
                    <StyledComponents.SubTitle>
                        Students usage of Bar, Line, and Heat Map
                    </StyledComponents.SubTitle>

                    <StyledComponents.StudentsCount>
                        Total students present: 24/24
                    </StyledComponents.StudentsCount>

                    <StyledComponents.LeftLabel1>
                        Understand which presentation to choose
                    </StyledComponents.LeftLabel1>

                    <StyledComponents.LeftLabel2>
                        Understand how to infer a line data
                    </StyledComponents.LeftLabel2>

                    <StyledComponents.LeftLabel3>
                        Understand how to infer a bar graph 
                    </StyledComponents.LeftLabel3>

                    <StyledComponents.LeftLabel4>
                        Understand how to infer a heatmap 
                    </StyledComponents.LeftLabel4>

                    <StyledComponents.YAxis/>

                    <StyledComponents.XAxis/>

                    <StyledComponents.GraphBar1>
                        <StyledComponents.G1Familiar/>
                        <StyledComponents.G1NotFamiliar/>
                        <StyledComponents.G1NotEnoughData/>
                    </StyledComponents.GraphBar1>

                    <StyledComponents.GraphBar2>
                        <StyledComponents.G2Familiar/>
                        <StyledComponents.G2NotFamiliar/>
                        <StyledComponents.G2NotEnoughData/>

                    </StyledComponents.GraphBar2>

                    <StyledComponents.GraphBar3>
                        <StyledComponents.G3Familiar/>
                        <StyledComponents.G3NotFamiliar/>
                        <StyledComponents.G3NotEnoughData/>
                    </StyledComponents.GraphBar3>

                    <StyledComponents.GraphBar4>
                        <StyledComponents.G4Familiar/>
                        <StyledComponents.G4NotFamiliar/>
                        <StyledComponents.G4NotEnoughData/>
                    </StyledComponents.GraphBar4>
                    

                    <StyledComponents.LegendContainer>
                        <StyledComponents.LegendTitle> Legend </StyledComponents.LegendTitle>
                        <StyledComponents.IndividualLegend>
                            <StyledComponents.Rect color="#EAF2E4"/> 
                            <StyledComponents.LegendText>
                                Familiar
                            </StyledComponents.LegendText>
                        </StyledComponents.IndividualLegend>
                        <br/>

                        <StyledComponents.IndividualLegend>
                            <StyledComponents.Rect color="#C45250"/> 
                            <StyledComponents.LegendText>
                                InFamiliar
                            </StyledComponents.LegendText>
                        </StyledComponents.IndividualLegend>

                        <br/>

                        <StyledComponents.IndividualLegend>
                            <StyledComponents.Rect color="#DFB58F"/> 
                            <StyledComponents.LegendText>
                                Not enough data
                            </StyledComponents.LegendText>
                        </StyledComponents.IndividualLegend>

                    </StyledComponents.LegendContainer>

                </StyledComponents.OverallClassPerformanceContainer>
                }
                <StyledComponents.DataTestGround>
                    <Button onClick={this.getGraphUsage}>
                        Click me to get data 
                    </Button>
                    <Label>
                        {this.state.socketData}
                    </Label>
                </StyledComponents.DataTestGround>
            </React.Fragment>
        )
    }

    private getGraphUsage = () =>{
        axios.get("/mongodata/graphusage").then(res =>
            this.setState({socketData:JSON.stringify(res.data)}) 
        )
        return 
    }
}


export default DetailedReport
