import * as React from "react";
import { Card, CardHeader, Table, TableBody, TableCell, TableHeader} from "semantic-ui-react";
 
import styled from "styled-components";

const Ellipse = styled.div`
    width: 49px;
    --height: 49px;
    border-radius: 50%;
    font-size: 16px;
    color: #fff; 
    text-align: center;
    line-height: var(--height);
    background: #000
`

class StudentGraphUsage extends React.Component{

    // Use very basic
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
                            <Table.HeaderCell>Use it often</Table.HeaderCell>
                            <Table.HeaderCell>Use it less often</Table.HeaderCell>
                            <Table.HeaderCell>Not use at all</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        <Table.Row>
                            <Table.Cell>Bar</Table.Cell>
                            <Table.Cell> <Ellipse>10</Ellipse> </Table.Cell>
                            <Table.Cell> <Ellipse>15</Ellipse> </Table.Cell>
                            <Table.Cell> <Ellipse>15</Ellipse> </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Line</Table.Cell>
                            <Table.Cell> <Ellipse>15</Ellipse> </Table.Cell>
                            <Table.Cell> <Ellipse>5</Ellipse> </Table.Cell>
                            <Table.Cell> <Ellipse>0</Ellipse> </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Heat map</Table.Cell>
                            <Table.Cell> <Ellipse>15</Ellipse> </Table.Cell>
                            <Table.Cell> <Ellipse>5</Ellipse> </Table.Cell>
                            <Table.Cell> <Ellipse>3</Ellipse> </Table.Cell>
                        </Table.Row>
                        </Table.Body>
                    </Table>
                </Card.Content>
            </Card>
        )
    }

}

export default StudentGraphUsage