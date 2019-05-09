
import * as React from "react";
import { Card, CardHeader, Table } from "semantic-ui-react";
 
import styled from "styled-components";

// this class needs session id to query he data from the backend, pass the session data as a props
import * as openSocket from 'socket.io-client'; 

const socket = openSocket("http://localhost:8080/classoverview") // communicate through the new name space classoverview

/* CSS For Component */
const ColorText = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 27px;
    line-height: normal;
    text-align: center;

    color: #5A9AF8;
	font-variant-numeric: proportional-nums;
`

const CustomizedTableCell = styled(Table.Cell)`
    justify-content: center;
`

interface IClassOverviewData {
    bar: number[],
    line: number[],
    heatmap: number[]
}

const dummyData: IClassOverviewData = {
    bar: [10,15,10],
    line: [15,5,0],
    heatmap: [15,5,3]
} 

/* Main Component */
class ClassGraphUsageOverview extends React.Component<any, any>{

    public constructor(props){
        super(props)
        if (props.sessionData !== undefined){
            this.state = {overviewData: dummyData, sessionId: props.sessionData.sessionId}
        }

        socket.on("live class overview update", message => {
            // convert data from the backend. 
            const newStudentData: IClassOverviewData = {bar:[], line:[], heatmap:[]}
            console.log("class overview update")
            // Another way is to understand the 
            this.setState({overviewData: message})
          })

    }

    // I want it to send a message to backend for class overview, and be consistent
    // with the communication draft 
    public componentWillMount(){
        socket.emit('listen to class overview', {sessionId: this.state.sessionId})
    }

    public componentDidMount(){
        window.onbeforeunload = () =>{
          socket.emit('stop listening class overview')
        }
    }

    public componentWillUnmount(){
        // close connection
        // axios.post("/mongodata/endlivedata").then(res => {
        //   console.log(res.data)
        // });
        socket.emit('stop listening class overview')
      }

    // This detailed view will include the table view of using different view
    public render(){
        return (

            <Card style={{width:"100%"}}>
                <Card.Content>
                    <CardHeader textAlign="left" style={{paddingTop:`18px`, marginBottom: "20px", marginLeft: "10px", letterSpacing:"2px", wordSpacing:"5px"}} >
                        CLASS OVERVIEW
                    </CardHeader>

                    <Table basic='very' style={{marginLeft: "10px"}}>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell/> 
                            <Table.HeaderCell> Use it often </Table.HeaderCell>
                            <Table.HeaderCell> Use it less often </Table.HeaderCell>
                            <Table.HeaderCell> Not use at all   </Table.HeaderCell>

                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        <Table.Row>
                            <Table.Cell>Bar</Table.Cell>
                            {/* This needs to be changed to a more data driven process */}
                            { this.state.overviewData.bar.map( (num,index) => 
                                <CustomizedTableCell key={num + " "+ index}> <ColorText>{num}</ColorText> </CustomizedTableCell>)                             
                            }    
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>Line</Table.Cell>
                            { this.state.overviewData.line.map( (num,index) => 
                                <CustomizedTableCell key={num + " "+ index}> <ColorText>{num}</ColorText> </CustomizedTableCell>)                             
                            }
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>Heat map</Table.Cell>
                            {this.state.overviewData.heatmap.map( (num,index) => 
                                <CustomizedTableCell key={num + " "+ index}> <ColorText>{num}</ColorText> </CustomizedTableCell>
                            )}
                        </Table.Row>

                        </Table.Body>
                    </Table>
                </Card.Content>
            </Card>
        )
    }

}

export default ClassGraphUsageOverview