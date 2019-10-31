import * as React from "react"
import { Grid, Card, Button } from "semantic-ui-react"
import "semantic-ui-css/semantic.min.css"
import styled from "styled-components"
import * as _ from "lodash"
// import { StudentStatus } from 'src/data_structure/Student';

import { StudentStatus, Student } from '../data_structure/Student';

// the idea is that when the user clicks, the right will be locked. The data will not change unless the user clicks on close icon on the top right
// or click on another students. 

function generateColorBasedOnStatus(status: StudentStatus){
    switch (status) {
        case StudentStatus.InProgress:
            return "#DAF8FF"
        
        case StudentStatus.Idle:
            return "#EFEFEF"

        case StudentStatus.Absent:
            return "#EFEFEF"   

        case StudentStatus.Stuck: 
            return "#E2DAFF"

        default:
            return "#000000"
    }
} 

const DataTitle = styled.p`
    display: block;
    position: relative;
    width: 100%;
    font-size: 16px;
    margin-bottom: 8px;
    font-family: "Roboto";
    text-align: start;
`

const Data = styled.p`
    position: relative;
    width: 100%;
    height: 50px;
    font-size: 20px;
    font-family: "Roboto";
    font-weight: 700;
    text-align: start;
`

const Indicator = styled.div<{status: StudentStatus}>`
    position: relative;
    height: 16px;
    width: 16px;
    border-radius:16px;
    left: 15px;
    top: 2px;
    background-color: ${props => generateColorBasedOnStatus(props.status)}
`


export function StudentCurrentDetails(props: any) {
    const showCash = (cashNumber: number) : string => {
        if (cashNumber > 1000){
            return Math.round(cashNumber / 1000) + " k"
        }
        else {
            return cashNumber + ""
        }
    }

    return (
            <Card
                style={{
                    boxShadow:"none",
                    width: "100%",
                    padding: "0px 50px 0px 50px" 
                }}
            >
                <Card.Header
                    style={{
                        height: "70px",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "24px",
                        fontFamily: "'Roboto'",
                    }}
                >
                    <p
                        style={{
                            position: "relative",
                            backgroundColor: "transparent",
                            marginBottom: "0",
                        }}
                    >
                        {props.student.name} 
                    </p>
                    
                    <Indicator status={props.student.status}/>

                    <Button style={{position:"absolute", right: "10%"}} onClick={props.onCloseOnASpecificStudentEvent}> Close </Button>
                </Card.Header>
                <Card.Content style={{overflowY:"auto"}}>
                    <Grid>
                        <Grid.Row style={{ display: "flex" }}>
                            <Grid.Column width="8" style={{ paddingLeft: 0 }}>
                                <div
                                    style={{
                                        display: "flex",
                                        position: "relative",
                                        height: "54px",
                                        justifyContent: "flex-start",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        width: "300px",
                                        backgroundColor: "transparent",
                                    }}
                                >
                                    <DataTitle> Current turn </DataTitle>
                                    <Data> {props.student.currentTurn - 30} </Data>
                                </div>
                            </Grid.Column>
                            <Grid.Column width="8" style={{ paddingLeft: 0 }}>
                                <DataTitle> Current cash </DataTitle>
                                <Data> {showCash(props.student.currentCash)} </Data>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width="8" style={{ paddingLeft: 0 }}>
                                <DataTitle> Current screen </DataTitle>
                                {/* break the camel case */}
                                <Data> { _.startCase(props.student.currentScreen)}</Data>
                            </Grid.Column>
                            <Grid.Column width="8" style={{ paddingLeft: 0 }}>
                                <DataTitle> Released song count </DataTitle>
                                {/* break the camel case */}
                                <Data> {(props.student as Student).releasedSongCount}</Data>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width="8" style={{ paddingLeft: 0 }}>
                                <DataTitle>  Insight count </DataTitle>
                                {/* break the camel case */}
                                <Data> {(props.student as Student).insightCount}</Data>
                            </Grid.Column>

                            <Grid.Column width="8" style={{ paddingLeft: 0 }}>
                                <DataTitle> Successful Insight Count </DataTitle>
                                {/* break the camel case */}
                                <Data>  {(props.student as Student).successfulInsightCount}</Data>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width="8" style={{ paddingLeft: 0 }}>
                                <DataTitle>  Bar Use </DataTitle>
                                {/* break the camel case */}
                                <Data> {(props.student as Student).barUse}</Data>
                            </Grid.Column>

                            <Grid.Column width="8" style={{ paddingLeft: 0 }}>
                                <DataTitle> Line Use </DataTitle>
                                {/* break the camel case */}
                                <Data>  {(props.student as Student).lineUse}</Data>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width="8" style={{ paddingLeft: 0 }}>
                                <DataTitle>  Storage Buys </DataTitle>
                                {/* break the camel case */}
                                <Data> {(props.student as Student).storageBuys}</Data>
                            </Grid.Column>

                            <Grid.Column width="8" style={{ paddingLeft: 0 }}>
                                <DataTitle> Collect views </DataTitle>
                                {/* break the camel case */}
                                <Data>  {(props.student as Student).collectViews}</Data>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
            </Card>
    )
}
