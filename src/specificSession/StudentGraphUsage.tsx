import * as React from "react";
// import { Card, CardHeader, Grid, Table, TableBody, TableCell, TableHeader, Tab, Dropdown} from "semantic-ui-react";
import { Card, CardHeader, Grid, Table} from "semantic-ui-react";
import styled from "styled-components";
import * as _ from "lodash"

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

const StyledHeaderCell = styled(Table.HeaderCell)`
    &&& {   
        background: red;
        border-width: 0px;
        text-align: center;
        font-size: 14px;
        font-weight: normal;
    }
`

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
    borderWidth: "0px",
    paddingTop: "5px",
    paddingBottom: "5px",
}

/* Main Component */
class StudentGraphUsage extends React.Component <any, any>{

    // The prop will include the table data.
    constructor(prop: any){
        super(prop)
        /*
            Change the data here. 
        */
        let tableData = {
            // {'header': "Collection and Storage"},
            "Collection Views": {often: 0, rarely: 0, notUse: 0},
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

    // This detailed view will include the table view of using different view
    public render(){
        return (
            <Card style={{width:"100%", boxShadow:"none"}}>
                <Card.Content style={{overflowY:"scroll", padding:"0"}}>

                    <CardHeader textAlign="left" style={{display:"flex", fontFamily:"Roboto", paddingTop:`16px`, marginBottom: "20px", marginLeft: "10px"}} >
                        <p style={{margin:"0px"}}>Class Overview</p>
                    </CardHeader>

                    <OverviewNineColumns tableData={this.props.tableData}/>

                </Card.Content>
            </Card>
        )
    }

}

function IndividualTableRow(props) {
    const rowData = props.rowData as Array<string>
    const index = props.index as number

    return (
        <Table.Row
            style={{
                backgroundColor: index % 2 === 0 ?  "rgba(234, 249, 255, 0.65)" : "#ffffff",  
                textAlign: "center",
                fontWeight: "normal",
                fontSize: "14px",
            }}
        >
            <Table.Cell key={"c1"} width={7} style={{...cellStyle}} textAlign="left">{_.startCase(rowData[0])}</Table.Cell>
            <Table.Cell key={"c2"} width={3} style={cellStyle}>{rowData[1]}</Table.Cell>
            <Table.Cell key={"c3"} width={3} style={cellStyle}>{rowData[2]}</Table.Cell>
            <Table.Cell key={"c4"} width={3} style={cellStyle}>{rowData[3]}</Table.Cell>
        </Table.Row>
    )
}

function IndividualTable(props) {
    const data = props.tableData
    const headers = data.headers as Array<string>

    return (
        <div style={props.style}>
            <Grid style={{ width: "100%" }}>
                <Grid.Row>
                    <Grid.Column
                        width="5"
                        style={{
                            backgroundColor: "transparent",
                        }}
                    >
                        <p style={tableName}>{_.startCase(data.tableName)}</p>
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
                                <IndividualTableRow key={"row1"} rowData={data.data[0]} index={0} />
                                <IndividualTableRow key={"row2"} rowData={data.data[1]} index={1} />
                                <IndividualTableRow key={"row3"} rowData={data.data[2]} index={2} />
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

    const collectionAndStorageKeys=["Collection Views", "Variable modifications", "Storage Increases"]
    const dataVisGraphKeys=["bar graph","line graph","heatmap"]
    const insightKeys = ["Made insights","Successful insights", "Good predictions"]
    const data = [
        {
            tableName:"Collection and Storage",
            headers:["Often", "Rarely", "Never"],
            data: collectionAndStorageKeys.map(k => [k, props.tableData[k].often, props.tableData[k].rarely, props.tableData[k].notUse]) 
        },
        {
            tableName:"Data Vis and graph",
            headers:["Often", "Rarely", "Never"],
            data: dataVisGraphKeys.map(k => [k, props.tableData[k].often, props.tableData[k].rarely, props.tableData[k].notUse]) 
        },
        {
            tableName:"Insights",
            headers:["Often", "Rarely", "Never"],
            data: insightKeys.map(k => [k, props.tableData[k].often, props.tableData[k].rarely, props.tableData[k].notUse]) 
        }

    ]
    return (

            <div style={mainStack}>
                {" "}
                {data.map( (t,i,array) => 
                    <React.Fragment key={t.tableName + i}>
                        <IndividualTable key={t.tableName + i} tableData={t} style={{ marginBottom: 
                            (i !== array.length-1) ? "8px": "0px", width: "100%" }}/> 
                            {(i !== array.length-1) ? <br/> : <div/>}
                    </React.Fragment>)}
            </div>
    )
}


export default StudentGraphUsage