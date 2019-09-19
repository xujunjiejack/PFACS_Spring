import * as React from "react";
import { Card, CardHeader, Table, TableBody, TableCell, TableHeader, Tab} from "semantic-ui-react";
 
import styled from "styled-components";
import { create } from 'istanbul-reports';

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
class StudentGraphUsage extends React.Component <any, any>{

    constructor(prop: any){
        super(prop)

        /*
            Change the data here. 
        */
        const tableData = [
            {graph: "Bar", often: 10, lessOften: 15, notUse: 10},
            {graph: "Line", often: 15, lessOften: 15, notUse: 10},
            {graph: "Heat Map", often: 15, lessOften: 5, notUse: 3},
        ]
        this.state = {tableData}
    }

    public createTable (data) {
    
        let table = data.map( (d) =>
            {
                return (
                    <Table.Row>
                        <Table.Cell>{d.graph}</Table.Cell>
                        <CustomizedTableCell> <ColorText> {d.often} </ColorText> </CustomizedTableCell>
                        <CustomizedTableCell> <ColorText> {d.lessOften} </ColorText> </CustomizedTableCell>
                        <CustomizedTableCell> <ColorText> {d.notUse} </ColorText> </CustomizedTableCell>
                    </Table.Row>
                )
                }
            )
        return table
    }

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
                            {this.createTable(this.state.tableData)}
                        </Table.Body>
                    </Table>
                </Card.Content>
            </Card>
        )
    }

}

export default StudentGraphUsage