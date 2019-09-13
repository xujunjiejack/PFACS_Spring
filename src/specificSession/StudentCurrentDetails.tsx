import * as React from "react"
import { Grid, Card } from "semantic-ui-react"
import "semantic-ui-css/semantic.min.css"
import styled from "styled-components"
import { StudentStatus } from '../data_structure/Student';

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
    font-size: 24px;
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
                </Card.Header>
                <Card.Content>
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
                            <Grid.Column width="8">
                                <DataTitle> Current cash </DataTitle>
                                <Data> {showCash(props.student.currentCash)} </Data>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width="16" style={{ paddingLeft: 0 }}>
                                <DataTitle> Current screen </DataTitle>
                                {/* break the camel case */}
                                <Data> {props.student.currentScreen}</Data>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
            </Card>
    )
}
