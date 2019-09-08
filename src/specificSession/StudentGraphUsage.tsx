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

/* Main Component */
class StudentGraphUsage extends React.Component{

    // This detailed view will include the table view of using different view
    public render(){
        return (

            <Card style={{width:"100%"}}>
                <Card.Content>
                    <CardHeader textAlign="left" style={{fontFamily:"Roboto", paddingTop:`18px`, marginBottom: "20px", marginLeft: "10px"}} >
                        Class Overview
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
                            <CustomizedTableCell> <ColorText>10</ColorText> </CustomizedTableCell>
                            <CustomizedTableCell> <ColorText>15</ColorText> </CustomizedTableCell>
                            <CustomizedTableCell> <ColorText>10</ColorText> </CustomizedTableCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Line</Table.Cell>
                            <Table.Cell> <ColorText>15</ColorText> </Table.Cell>
                            <Table.Cell> <ColorText>5</ColorText> </Table.Cell>
                            <Table.Cell> <ColorText>0</ColorText> </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Heat map</Table.Cell>
                            <Table.Cell> <ColorText>15</ColorText> </Table.Cell>
                            <Table.Cell> <ColorText>5</ColorText> </Table.Cell>
                            <Table.Cell> <ColorText>3</ColorText> </Table.Cell>
                        </Table.Row>
                        </Table.Body>
                    </Table>
                </Card.Content>
            </Card>
        )
    }

}

export default StudentGraphUsage