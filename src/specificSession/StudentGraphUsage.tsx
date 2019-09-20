import * as React from "react";
import { Card, CardHeader, Table, TableBody, TableCell, TableHeader, Tab, Dropdown} from "semantic-ui-react";
 
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

    private headerMatch = {collectionAndStorage: ["C&S Views", "Variable modifications", "Storage Increases"],
                        dataVisAndGraph: ["bar graph", "line graph", "heatmap"],
                        insghtAndInferences: ["Made insights", "Successful insights", "Good predictions"]}

    // The prop will include the table data.
    constructor(prop: any){
        super(prop)
        /*
            Change the data here. 
        */
        const tableData2 = [
            {graph: "Bar", often: 10, lessOften: 15, notUse: 10},
            {graph: "Line", often: 15, lessOften: 15, notUse: 10},
            {graph: "Heat Map", often: 15, lessOften: 5, notUse: 3},
        ]

        let tableData = {
            // {'header': "Collection and Storage"},
            "C&S Views": {often: 0, rarely: 0, notUse: 0},
            "Variable modifications": {often: 0, rarely: 0, notUse: 0},
            "Storage Increases": {often: 0, rarely: 0, notUse: 0},
  
            // {'header': "Data viz/graphing"},
            "bar graph": {often: 0, rarely: 0, notUse: 0},
            "line graph": {often: 0, rarely: 0, notUse: 0},
            "heatmap": {often: 0, rarely: 0, notUse: 0},
  
            // {'header': "Insight/inferences"},
            "Made insights": {often: 0, rarely: 0, notUse: 0},
            "Successful insights": {often: 0, rarely: 0, notUse: 0},
            "Good predictions": {often: 0, rarely: 0, notUse: 0},
          };
  

        this.state = {tableData, tableNumber: 0}
    }

    public createTableWith9Rows (data) {
        
        // let collectionAndStorageRow = this.headerMatch.collectionAndStorage.map( variable =>{
        //     return (
        //         <Table.Row>
        //             <Table.Cell>{variable}</Table.Cell>
        //             <CustomizedTableCell> <ColorText> {data[variable].often} </ColorText> </CustomizedTableCell>
        //             <CustomizedTableCell> <ColorText> {data[variable].rarely} </ColorText> </CustomizedTableCell>
        //             <CustomizedTableCell> <ColorText> {data[variable].notUse} </ColorText> </CustomizedTableCell>
        //         </Table.Row>
        //     )
        // } )
        if (Object.keys(data).length === 0){
            return []
        }
        let allRow = Object.keys(this.headerMatch).map( rowHeader =>{
            console.log(this.headerMatch[rowHeader])
            return this.headerMatch[rowHeader].map( 
                variable =>{
                    return (
                        <Table.Row>
                            <Table.Cell>{variable}</Table.Cell>
                            <CustomizedTableCell> <ColorText> {data[variable].often} </ColorText> </CustomizedTableCell>
                            <CustomizedTableCell> <ColorText> {data[variable].rarely} </ColorText> </CustomizedTableCell>
                            <CustomizedTableCell> <ColorText> {data[variable].notUse} </ColorText> </CustomizedTableCell>
                        </Table.Row>
                    )
                } 
            ) 
        }  )

        // let rows = data.map( (d) =>
        //     {
        //         return (
        //             <Table.Row>
        //                 <Table.Cell>{d.graph}</Table.Cell>
        //                 <CustomizedTableCell> <ColorText> {d.often} </ColorText> </CustomizedTableCell>
        //                 <CustomizedTableCell> <ColorText> {d.lessOften} </ColorText> </CustomizedTableCell>
        //                 <CustomizedTableCell> <ColorText> {d.notUse} </ColorText> </CustomizedTableCell>
        //             </Table.Row>
        //         )
        //         }
        //     )
        return allRow
    }

    public makeTable2 (tableNumber: number, data) {
        if (Object.keys(data).length === 0){
            return []
        }

        console.log(Object.keys(data))
        let options = {
            0: "collectionAndStorage",
            1: "dataVisAndGraph",
            2: "insghtAndInferences"
        }
        let tableKeys = this.headerMatch[options[tableNumber]]

        let rows = tableKeys.map( variable =>{
            return (
                <Table.Row>
                    <Table.Cell>{variable}</Table.Cell>
                    <CustomizedTableCell> <ColorText> {data[variable].often} </ColorText> </CustomizedTableCell>
                    <CustomizedTableCell> <ColorText> {data[variable].rarely} </ColorText> </CustomizedTableCell>
                    <CustomizedTableCell> <ColorText> {data[variable].notUse} </ColorText> </CustomizedTableCell>
                </Table.Row>
            )
        } )

        return rows 
    }

    private menuOnChange= (event, data)=>{
        // console.log(data)
        this.setState({tableNumber: data.value})
    }

    // This detailed view will include the table view of using different view
    public render(){
        
        let optionsForDropDown =[
            {key:"0", text:"Collection and Storage", value:"0"},
            {key:"1", text:"Graph", value:"1"},
            {key:"2", text:"Insights and Inference", value:"2"},
        ]

        return (
            <Card style={{width:"100%"}}>
                <Card.Content>
                    <CardHeader textAlign="left" style={{display:"flex", fontFamily:"Roboto", paddingTop:`18px`, marginBottom: "20px", marginLeft: "10px"}} >
                        <p style={{paddingTop:"5px", margin:"0px"}}>Class Overview</p>
                        <Dropdown selection placeholder="Collection and storage"  onChange={this.menuOnChange} options={optionsForDropDown}
                            defaultValue={"0"}
                            style={{
                            fontSize:"16px", position:"relative", left:"30%"}}/>
                            
                        {/* </Dropdown> */}
                    </CardHeader>

                    <Table basic='very' style={{marginLeft: "10px"}}>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell/> 
                            <Table.HeaderCell> Often </Table.HeaderCell>
                            <Table.HeaderCell> Rarely </Table.HeaderCell>
                            <Table.HeaderCell> Not at all   </Table.HeaderCell>

                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.makeTable2(this.state.tableNumber, this.props.tableData)}
                            {/* {this.createTableWith9Rows(this.state.tableData)} */}
                        </Table.Body>
                    </Table>
                </Card.Content>
            </Card>
        )
    }

}

export default StudentGraphUsage