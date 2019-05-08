import * as React from "react";
import { Card, CardHeader, Table, TableBody, TableCell, TableHeader} from "semantic-ui-react";
 
import styled from "styled-components";

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

const dummyData = {
    bar: [10,15,10],
    line: [15,5,0],
    heatmap: [15,5,3]
} 

/* Main Component */
class StudentGraphUsage extends React.Component{

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
                            { dummyData.bar.map( (num,index) => 
                                <CustomizedTableCell key={num + " "+ index}> <ColorText>{num}</ColorText> </CustomizedTableCell>)                             
                            }    
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>Line</Table.Cell>
                            { dummyData.line.map( (num,index) => 
                                <CustomizedTableCell key={num + " "+ index}> <ColorText>{num}</ColorText> </CustomizedTableCell>)                             
                            }
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>Heat map</Table.Cell>
                            { dummyData.heatmap.map( (num,index) => 
                                <CustomizedTableCell key={num + " "+ index}> <ColorText>{num}</ColorText> </CustomizedTableCell>)                             
                            }
                        </Table.Row>
                        </Table.Body>
                    </Table>
                </Card.Content>
            </Card>
        )
    }

}

export default StudentGraphUsage