import * as React from 'react';
import { Button } from "semantic-ui-react"
import styled from "styled-components";
import EmojiObjectsOutlined from '@material-ui/icons/EmojiObjectsOutlined';

const ImportantInsightsContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
`

const HeadersContainer = styled.div`
    display: flex;
    // padding: 8px;
`

const ImportantInsights = ({openStudentCard}) => {

    return (
        <React.Fragment>
            <ImportantInsightsContainer>
                <HeadersContainer>
                    <p style={{ marginRight: "16px" }}>Important Insights</p>
                    <EmojiObjectsOutlined />
                </HeadersContainer>

                <IndividualInsight openStudentCard={openStudentCard}/>
            </ImportantInsightsContainer>
        </React.Fragment>
    )

}

const IndividualInsight = ({openStudentCard}) => {
    const [mode, setMode] = React.useState("action") 
    const actionRef= React.useRef (null)
    const [sectionHeight, setSectionHeight] = React.useState (100)
    const switchMode = (event) => {
        let ref = actionRef.current as any
        if (ref !== undefined && ref !== null){
            if ( ref.clientWidth !== undefined){
            }
        }
        setSectionHeight(ref.clientHeight)
        mode === "action" ? setMode("student") : setMode("action")
    }
    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "row", border: "solid 1px #c3cbcc", boxSizing: "border-box", borderRadius: "4px", padding: "20px" }}>
            {/* Left and right */}
            <div ref={actionRef} style={{ display: "flex", flexDirection: "column", width: "30%", position: 'relative', borderRight: "1px solid #EBECF0" }}>
                <p style={{ textAlign: "left" }}> Many students have not visited the collection and storage screen </p>
                <Button onClick={switchMode} style={{ position: "absolute", bottom: "0px" }}> See Students</Button>
            </div>

            { mode === "action"? <Actions ref={null}/>  : <Students height={sectionHeight} openStudentCard={openStudentCard} />  }
            
        </div>
    )
}

const Actions = ( {ref} ) => {
    return (
        <div ref={ref} style={{ position: "relative", display: "flex", paddingLeft: "20px", flexDirection: "column", width: "70%", alignItems: "flex-start" }}>
            <h4 style={{ textTransform: "uppercase" }}> Immediate Action </h4>
            <p style={{ textAlign: "left" }}>
                1: Consider highlighting the collections/storage screen and encouraging students to interact with this screen
                <br />
                2: Discuss the importance of collecting and storing data. Include discussions of how to decide between different data to collect and how often data should be collected.
            </p>

            <h4 style={{ textTransform: "uppercase" }}> Teacher Activity </h4>
            <Button> Teacher Activity 3 </Button>
        </div>
    )
}

const Students = ({height, openStudentCard}) => {
    return (
        <div style={{ position: "relative", display: "flex", paddingLeft: "20px", flexDirection: "column", width: "70%", height:height+"px", alignItems: "flex-start" }}>
            <h4 style={{ textTransform: "uppercase" }}> Students </h4>

            <div style={{display: "flex", flexDirection:"row"}}>
                <Button onClick={()=>openStudentCard("Xavier")}> Xavier </Button>
                <Button> Ashe </Button>
                <Button> Ela </Button>
            </div>

        </div>
    )
}


export { ImportantInsights }