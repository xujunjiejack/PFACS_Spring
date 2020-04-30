import * as React from 'react';
import { Button, Accordion } from "semantic-ui-react"
import styled from "styled-components";
import ArrowDropDownCircleOutlined from '@material-ui/icons/ArrowDropDownOutlined'
import ArrowDropUpOutlined from '@material-ui/icons/ArrowDropUpOutlined'

const PerformanceOverviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
`

const HeadersContainer = styled.div`
    display: flex;
    margin-bottom: 16px;
    // padding: 8px;
`

const Arrow = styled.div`
    // width: 120px;
    display: flex;
    justify-content: center;
    position: relative;
    color: #979797
`

const Line = styled.div`
    // margin-top: 14px;
    height: 20px;
    background: #979797;
    opacity: 0.8;
    width: 1px;
    // float: left;
    position: absolute;
`

const Point = styled.div`
    margin-top: 20px;
    width: 0;
    height: 0;
    border-top: 8px solid #979797;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    // float: right;
    opacity: 0.8;
    position: absolute;
`

const flexRow = `
    display:flex;
    flex-direction:row;
`

const flexColumn = `
    // display:flex;
    flex-direction: column;
`

const AssessmentTargetContainer = styled.div`
   ${flexRow};
   padding: 16px;
   height: fit-content;
   & div{
       display: flex;
   }
`

const RegularLevelsContainer = styled.div`
    flex-direction: column;
    width: 50%;
    padding-right: 5%;
    border-right: 1px solid #eeeeee; 

`

const IndividualLevelContainer = styled.div`
    flex-direction: row;
    margin: 10px 0;
`

const LevelIndicator = ({levelIndex, lastOne=false, ...props}) => {
    
    return (
        <div {...props} style={{flexDirection: "column", justifyContent: "flex-start", alignItems: "center", marginRight: "24px" }}>
            {/* { levelIndex === 1? "Level" : ""} */}
            level
            <div style={{ marginBottom: "10px", width: "40px", height: "40px", backgroundColor: "#ebecf0", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {levelIndex}
            </div>
            {
                lastOne? <React.Fragment/> : 
                    <Arrow>
                        <Line></Line>
                        <Point></Point>
                    </Arrow>
            }
        </div>
    )
}

const PerformanceOverview = () => {
    const [activeIndex, setActiveIndex] = React.useState(0)

    const handleClick = (e, titleProps) => {
        const { index } = titleProps
        const newIndex = activeIndex === index ? -1 : index
        console.log("index: " + activeIndex)
        setActiveIndex(newIndex)
    }
    return (
        <React.Fragment>
            <PerformanceOverviewContainer>
                <HeadersContainer>
                    <p style={{ marginRight: "16px" }}>Performance overview</p>
                </HeadersContainer>

                {/* Accordian */}
                <Accordion styled style={{ width: "100%" }}>
                    <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={handleClick}
                        style={{ display: 'flex', alignItems: "center", }}
                    >
                        {activeIndex === 0 ? <ArrowDropUpOutlined style={{ marginRight: "8px" }} /> : <ArrowDropDownCircleOutlined style={{ marginRight: "8px" }} name='dropdown' />}
                        Collection and storage: Students are able to identify variables that should be collected for a specific situation
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <AssessmentTargetContainer>
                            {/* Regular level is on the left */}
                            <RegularLevelsContainer>

                                {/* Level 1*/}
                                <IndividualLevelContainer>
                                    {/* Left level sign */}
                                    <LevelIndicator levelIndex={1}/>

                                    {/* This needs better refactor */}
                                    <div style={{ width: "100%", flexDirection: "column", alignItems: "flex-start" }}>
                                        <p>
                                            Students do not use data appropriately
                                        </p>

                                        <div style={{ flexWrap: "wrap" }}>
                                            <Button style={{ background: "white", border: "1px solid #c9c9c9", height: "36px", width: "72px", borderRadius: "2.5px", marginRight: "8px" }}> Ben </Button>
                                            <Button style={{ background: "white", border: "1px solid #c9c9c9", height: "36px", width: "72px", borderRadius: "2.5px", marginRight: "8px" }}> Gary </Button>
                                            <Button style={{ background: "white", border: "1px solid #c9c9c9", height: "36px", width: "72px", borderRadius: "2.5px", marginRight: "8px" }}> Jenn </Button>
                                        </div>

                                        {/* divider */}
                                        <div style={{ width: "100%", height: "1px", marginTop: "20px", backgroundColor: "#eeeeee" }}>
                                        </div>
                                    </div>

                                </IndividualLevelContainer>

                                {/* Level 2 */}
                                <div style={{ display: "flex", flexDirection: "row", margin:"10px 0" }}>
                                    {/* Left level sign */}
                                    <LevelIndicator levelIndex={2}/>

                                    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                        <p>
                                            Students do not use data appropriately
                                        </p>

                                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                                            <Button style={{ background: "white", border: "1px solid #c9c9c9", height: "36px", width: "72px", borderRadius: "2.5px", marginRight: "8px" }}> Ben </Button>
                                            <Button style={{ background: "white", border: "1px solid #c9c9c9", height: "36px", width: "72px", borderRadius: "2.5px", marginRight: "8px" }}> Gary </Button>
                                            <Button style={{ background: "white", border: "1px solid #c9c9c9", height: "36px", width: "72px", borderRadius: "2.5px", marginRight: "8px" }}> Jenn </Button>
                                        </div>

                                        {/* divider */}
                                        <div style={{ width: "100%", height: "1px", marginTop: "20px", backgroundColor: "#eeeeee" }}>
                                        </div>

                                    </div>
                                </div>


                                 {/* Level 3 */}
                                 <div style={{ display: "flex", flexDirection: "row", margin:"10px 0" }}>
                                    {/* Left level sign */}
                                    <LevelIndicator levelIndex={3} lastOne={true}/>

                                    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                        <p>
                                            Students do not use data appropriately
                                        </p>

                                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                                            <Button style={{ background: "white", border: "1px solid #c9c9c9", height: "36px", width: "72px", borderRadius: "2.5px", marginRight: "8px" }}> Ben </Button>
                                            <Button style={{ background: "white", border: "1px solid #c9c9c9", height: "36px", width: "72px", borderRadius: "2.5px", marginRight: "8px" }}> Gary </Button>
                                            <Button style={{ background: "white", border: "1px solid #c9c9c9", height: "36px", width: "72px", borderRadius: "2.5px", marginRight: "8px" }}> Jenn </Button>
                                        </div>

                                        {/* divider */}
                                        <div style={{ width: "100%", height: "1px", marginTop: "20px", backgroundColor: "#eeeeee" }}>
                                        </div>

                                    </div>
                                </div>
                            </RegularLevelsContainer>

                            {/* Virtical Divider */}
                            {/* <div style={{height:"300px", backgroundColor:"#eeeeee", width:"1px"}}></div> */}

                            {/* No data level */}
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "45%", marginLeft:"5%" }}>
                                {/* Right */}
                                <div style={{ display: "flex", flexDirection: "row", margin:"10px 0" }}>

                                    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                        <p>
                                            Students with no enough data for this assessment target
                                        </p>

                                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                                            <Button style={{ background: "white", border: "1px solid #c9c9c9", height: "36px", width: "72px", borderRadius: "2.5px", marginRight: "8px" }}> Ben </Button>
                                            <Button style={{ background: "white", border: "1px solid #c9c9c9", height: "36px", width: "72px", borderRadius: "2.5px", marginRight: "8px" }}> Gary </Button>
                                            <Button style={{ background: "white", border: "1px solid #c9c9c9", height: "36px", width: "72px", borderRadius: "2.5px", marginRight: "8px" }}> Jenn </Button>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </AssessmentTargetContainer>

                        {/* <p>
                            A dog is a type of domesticated animal. Known for its loyalty and
                            faithfulness, it can be found as a welcome guest in many households
                            across the world.
                        </p> */}
                    </Accordion.Content>
                </Accordion>
            </PerformanceOverviewContainer>
        </React.Fragment>
    )
}

export { PerformanceOverview }