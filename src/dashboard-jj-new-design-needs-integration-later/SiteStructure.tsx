import * as React from 'react';
import { Grid, GridColumn, GridRow, Icon, Tab, MenuItem, Button } from "semantic-ui-react"
import styled from "styled-components";
import SpeedOutlined from '@material-ui/icons/SpeedOutlined';
import EmojiObjectsOutlined from '@material-ui/icons/EmojiObjectsOutlined';
import { ImportantInsights } from './ImportantInsights';
import TableChartOutlined from '@material-ui/icons/TableChartOutlined';
import { PerformanceOverview } from "./PerformanceOverview";
import { StudentCard } from "./StudentCard";

const ClassInformationHeader = styled(GridRow)`
    &&& {
        height: 80px;
        width: 100%; 
        display: flex;
        flex-direction: row;
        align-items: center;
    }
`


const CustomizedTabItem = ({ icon, text }) =>
    <MenuItem key={"messages"} style={{ display: "flex", justifyContent: "flex-start", padding: "8px", alignItem: "center", height: "60px" }}>
        {icon}
        <p style={{ paddingLeft: "4px", lineHeight: "24px" }}> {text} </p>
    </MenuItem>



class SiteStructure extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = { individualStatsShownUp: false, studentForIndividual: "Ela"}
    }

    panes = [
        {
            menuItem:
                (<MenuItem key={"messages"} style={{ display: "flex", justifyContent: "flex-start", padding: "12px", alignItems: "center", height: "60px" }}>
                    <SpeedOutlined style={{ height: "24px", width: "24px" }} />
                    <p style={{ paddingLeft: "8px", lineHeight: "24px" }}> Live </p>
                </MenuItem>),
            render: () => <Tab.Pane style={{ height: "100%" }}>
                Live
            </Tab.Pane>
        },
        {
            menuItem: (<MenuItem key={"messages"} style={{ display: "flex", justifyContent: "flex-start", padding: "12px", alignItems: "center", height: "60px" }}>
                <EmojiObjectsOutlined style={{ height: "24px", width: "24px" }} />
                <p style={{ paddingLeft: "8px", lineHeight: "24px", textAlign: "left" }}> Important Insights </p>
            </MenuItem>),
            render: () => <Tab.Pane><ImportantInsights openStudentCard={this.openStudentCard} /></Tab.Pane>
        },
        {
            menuItem: (<MenuItem key={"messages"} style={{ display: "flex", justifyContent: "flex-start", padding: "12px", alignItems: "center", height: "60px" }}>
                <TableChartOutlined style={{ height: "24px", width: "24px" }} />
                <p style={{ paddingLeft: "8px", lineHeight: "18px", textAlign: "left" }}> Performance Overview </p>
            </MenuItem>), render: () => <Tab.Pane> <PerformanceOverview /> </Tab.Pane>
        },
        { menuItem: 'Students', render: () => <Tab.Pane>Students Content</Tab.Pane> },
        { menuItem: 'Help', render: () => <Tab.Pane>Help Content</Tab.Pane> },
    ]

    openStudentCard = (studentName) => {
        this.setState({ individualStatsShownUp: true, studentForIndividual: studentName })
    }

    closeStudentCard = () => {
        this.setState({ individualStatsShownUp: false} )
    }

    render() {

        return (
            <Grid padded>
                <ClassInformationHeader>
                    {/* Header */}
                    Spring 2020
                </ClassInformationHeader>

                <GridRow style={{ height: "100vh" }}>
                    {/* Content */}
                    <GridColumn width="16" height="100%" style={{ position: "relative" }}>
                        <Tab
                            menu={{ attached: "true", fluid: true, vertical: true, style: { margin: 0, padding: 0 } }}
                            // menuPosition='left'
                            panes={this.panes}
                            // The class gridhack is the only css hack I know to get no gutter. 
                            // Its definition is in App.css
                            grid={{ className: "grid-gutter-hack", paneWidth: 14, tabWidth: 2, gutterWidth: "0px", style: { height: "100%", padding: "0px" } }}
                            style={{ height: "100%" }}
                        />

                    <StudentCard individualStatsShownUp={this.state.individualStatsShownUp} studentData={this.state.studentForIndividual} closeIndividualStats={this.closeStudentCard} />
                    </GridColumn>
                </GridRow>
            </Grid>
        )
    }
}

export { SiteStructure }