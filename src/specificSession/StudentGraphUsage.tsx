import * as React from "react";
import { Card, CardHeader, Grid, Table, TableBody, TableCell, TableHeader, Tab, Dropdown} from "semantic-ui-react";
import styled from "styled-components";
// import { create } from 'istanbul-reports';

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
        // const tableData2 = [
        //     {graph: "Bar", often: 10, lessOften: 15, notUse: 10},
        //     {graph: "Line", often: 15, lessOften: 15, notUse: 10},
        //     {graph: "Heat Map", often: 15, lessOften: 5, notUse: 3},
        // ]

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

        // console.log(Object.keys(data))
        let options = {
            0: "collectionAndStorage",
            1: "dataVisAndGraph",
            2: "insghtAndInferences"
        };
        let tableKeys = this.headerMatch[options[tableNumber]];

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

        return rows;
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
            <Card style={{width:"100%", boxShadow:"none"}}>
                <Card.Content style={{overflowY:"scroll"}}>
                    <CardHeader textAlign="left" style={{display:"flex", fontFamily:"Roboto", paddingTop:`18px`, marginBottom: "20px", marginLeft: "10px"}} >
                        <p style={{paddingTop:"5px", margin:"0px"}}>Class Overview</p>
                        {/* <Dropdown selection placeholder="Collection and storage"  onChange={this.menuOnChange} options={optionsForDropDown}
                            defaultValue={"0"}
                            style={{
                            fontSize:"16px", position:"relative", left:"30%"}}/> */}
                            
                        {/* </Dropdown> */}
                    </CardHeader>

                    {/* <Table basic='very' style={{marginLeft: "10px"}}>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell/> 
                            <Table.HeaderCell> Often </Table.HeaderCell>
                            <Table.HeaderCell> Rarely </Table.HeaderCell>
                            <Table.HeaderCell> Not at all </Table.HeaderCell>

                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.makeTable2(this.state.tableNumber, this.props.tableData)}
                            {this.createTableWith9Rows(this.state.tableData)}
                        </Table.Body>
                    </Table> */}

                    <OverviewNineColumns tableData={this.props.tableData}/>
                </Card.Content>
            </Card>
        )
    }

}
// Open Preview: Command + P
// Learn more: https://framer.com/api

const mainStack = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
    marginLeft:"10px",
    paddingRight: "10px"
} as React.CSSProperties

const seperatedLine = {
    width: "100%",
    height: 1,
    overflow: "visible",
    backgroundColor: "rgba(178, 178, 178, 1)",
} as React.CSSProperties

const tableName = {
    width: "100%",
    position: "relative",
    top: "16px",
    fontFamily: `"Roboto", "Roboto", sans-serif`,
    color: "#000000",
    fontSize: "14px",
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 900,
    fontStyle: "normal",
    textAlign:"left"
} as React.CSSProperties

const cellStyle = {
    width: "50px",
    borderWidth: "0px",
    paddingTop: "5px",
    paddingBottom: "5px",
}

const StyledHeaderCell = styled(Table.HeaderCell)`
    &&& {   
        background: red;
        border-width: 0px;
        text-align: center;
        font-size: 14px;
        font-weight: normal;
    }
`

function IndividualTableRow(props) {
    const rowData = props.rowData as Array<string>

    return (
        <Table.Row
            style={{
                backgroundColor: "rgba(228, 226, 226, 0.48)",
                textAlign: "center",
                fontWeight: "normal",
                fontSize: "14px",
            }}
        >
            <Table.Cell style={cellStyle}>{rowData[0]}</Table.Cell>
            <Table.Cell style={cellStyle}>{rowData[1]}</Table.Cell>
            <Table.Cell style={cellStyle}>{rowData[2]}</Table.Cell>
            <Table.Cell style={cellStyle}>{rowData[3]}</Table.Cell>
        </Table.Row>
    )
}

function IndividualTable(props) {
    const data = props.tableData
    const headers = data.headers as Array<string>

    return (
        <div style={props.style}>
            <div style={seperatedLine} />
            <Grid style={{ width: "100%" }}>
                <Grid.Row>
                    <Grid.Column
                        width="5"
                        style={{
                            backgroundColor: "transparent",
                        }}
                    >
                        <p style={tableName}>{data.tableName}</p>
                    </Grid.Column>
                    <Grid.Column
                        width="11"
                        style={{
                            backgroundColor: "transparent",
                            padding: "0",
                        }}
                    >
                        {/*Table*/}
                        <Table
                            celled
                            unstackable
                            style={{ borderWidth: "0px" }}
                        >
                            <Table.Header>
                                <Table.Row>
                                    <StyledHeaderCell
                                        style={{
                                            width: "50px",
                                            background: "transparent",
                                            borderWidth: "0px",
                                        }}
                                    ></StyledHeaderCell>
                                    <StyledHeaderCell
                                        style={{
                                            background: "transparent",
                                            borderWidth: "0px",
                                        }}
                                    >
                                        {" "}
                                        {headers[0]}
                                    </StyledHeaderCell>
                                    <StyledHeaderCell
                                        style={{
                                            background: "transparent",
                                            borderWidth: "0px",
                                        }}
                                    >
                                        {" "}
                                        {headers[1]}
                                    </StyledHeaderCell>
                                    <StyledHeaderCell
                                        style={{
                                            background: "transparent",
                                            borderWidth: "0px",
                                        }}
                                    >
                                        {" "}
                                        {headers[2]}
                                    </StyledHeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <IndividualTableRow rowData={data.data[0]} />
                                <IndividualTableRow rowData={data.data[1]} />
                                <IndividualTableRow rowData={data.data[2]} />
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

function OverviewNineColumns(props) {
    if (Object.keys(props.tableData).length ===0){
        return <div/>
    }

    const collectionAndStorageKeys=["C&S Views", "Variable modifications", "Storage Increases"]
    const dataVisGraphKeys=["bar graph","line graph","heatmap"]
    const insightKeys = ["Made insights","Successful insights", "Good predictions"]
    const data = [
        {
            tableName:"Collection and Storage",
            headers:["Often", "Rarely", "never"],
            data: collectionAndStorageKeys.map(k => 
                {
                    console.log(props.tableData)
                return [k, props.tableData[k].often, props.tableData[k].rarely, props.tableData[k].notUse]
                }) 
        },
        {
            tableName:"Data Vis and graph",
            headers:["Often", "Rarely", "never"],
            data: dataVisGraphKeys.map(k => [k, props.tableData[k].often, props.tableData[k].rarely, props.tableData[k].notUse]) 
        },
        {
            tableName:"Insights",
            headers:["Often", "Rarely", "never"],
            data: insightKeys.map(k => [k, props.tableData[k].often, props.tableData[k].rarely, props.tableData[k].notUse]) 
        }

    ]
    return (

            <div style={mainStack}>
                {" "}
                {data.map( t => 
                    <React.Fragment>
                    <IndividualTable key={t.tableName} tableData={t} style={{ marginBottom: "8px", width: "100%" }}/> 
                    <br/>
                    </React.Fragment>)}

                {/* <IndividualTable
                    tableData={{
                        tableName: "Collection and Storage",
                        headers: ["header1", "header2", "header3"],
                        data: [
                            ["row1", "0", "0", "0"],
                            ["row2", "0", "0", "0"],
                            ["row3", "0", "0", "0"],
                        ],
                    }}
                    style={{ marginBottom: "8px", width: "100%" }}
                />{" "}
                <br />
                <IndividualTable
                    tableData={{
                        tableName: "Graph",
                        headers: ["header1", "header2", "header3"],
                        data: [
                            ["row1", "0", "0", "0"],
                            ["row2", "0", "0", "0"],
                            ["row3", "0", "0", "0"],
                        ],
                    }}
                    style={{ marginBottom: "8px", width: "100%" }}
                />{" "}
                <br />
                <IndividualTable
                    tableData={{
                        tableName: "Table 2",
                        headers: ["header1", "header2", "header3"],
                        data: [
                            ["row1", "0", "0", "0"],
                            ["row2", "0", "0", "0"],
                            ["row3", "0", "0", "0"],
                        ],
                    }}
                    style={{ marginBottom: "8px", width: "100%" }}
                />{" "} */}
            </div>
    )
}


export default StudentGraphUsage