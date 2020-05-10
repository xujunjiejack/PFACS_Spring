import styled from "styled-components";

export const DataTestGround = styled.div`
position: absolute;
width: 1143px;
height: 441px;
left: 147px;
top: 800px;
background: #FFFFFF;
`

export const OverallClassPerformanceContainer = styled.div`
position: absolute;
width: 1143px;
height: 441px;
left: 147px;
top: 279px;

background: #FFFFFF;
`

export const SectionHeader = styled.div`
position: absolute;
left: 4.55%;
top: 9.52%;
bottom: 85.49%;
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: normal;

color: #000000;
`

export const SubTitle = styled.div`
position: absolute;
left: 4.55%;
top: 16.78%;
bottom: 78.23%;
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: normal;

color: #565656;
`

export const StudentsCount = styled.div`
position: absolute;
left: 62.2%;
top: 11.56%;

font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: normal;

color: #7F7F7F;
`


export const LeftLabel1 = styled.div`
position: absolute;
left: 4.55%;
right: 81.36%;
top: 32.88%;
bottom: 58.28%;

font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: normal;
text-align: right;

color: #000000;
`

export const LeftLabel2 = styled.div`
position: absolute;
left: 5.16%;
right: 81.89%;
top: 45.8%;
bottom: 47.17%;

font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: normal;
text-align: right;

color: #000000;
`

export const LeftLabel3 = styled.div`
position: absolute;
left: 5.51%;
right: 81.63%;
top: 60.09%;
bottom: 33.56%;

font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: normal;
text-align: right;

color: #000000;
`

export const LeftLabel4 = styled.div`
position: absolute;
left: 5.42%;
right: 81.71%;
top: 71.66%;
bottom: 22%;

font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: normal;
text-align: right;

color: #000000;
`

export const YAxis = styled.div`
position: absolute;
left: 10.15%;
top: 250px;
width: 247px;
border: 1px solid #C3C3C3;
transform: matrix(0, 1, 1, 0, 0, 0);
`

export const XAxis = styled.div`
position: absolute;
left: 20.73%;
right: 21.78%;
top: 84.81%;
bottom: 15.19%;

border: 1px solid #C3C3C3;
transform: rotate(-0.09deg);

`

export const GraphBar1 = styled.div`
position: absolute;
left: 21.17%;
right: 21.78%;
top: 32.88%;
bottom: 60.54%;
background-color: aqua;
`

export const G1Familiar = styled.div`
position: absolute;
left: 0%;
right: 26.23%;
top: 0%;
bottom: 0%;
background: #EAF2E4;
`

export const G1NotFamiliar = styled.div`
position: absolute;
left: 73.77%;
right: 12.12%;
top: 0%;
bottom: 0%;

background: #C45250;
`

export const G1NotEnoughData = styled.div`
position: absolute;
left: 87.73%;
right: 0%;
top: 0%;
bottom: 0%;

background: #DFB58F;
`


export const GraphBar2 = styled.div`
position: absolute;
left: 21.26%;
right: 21.7%;
top: 46.26%;
bottom: 47.17%;
background-color: aqua;
`

export const G2Familiar = styled.div`
position: absolute;
left: 0%;
right: 26.23%;
top: 0%;
bottom: 0%;
background: #EAF2E4;
`

export const G2NotFamiliar = styled.div`
position: absolute;
left: 73.77%;
right: 12.12%;
top: 0%;
bottom: 0%;

background: #C45250;
`

export const G2NotEnoughData = styled.div`
position: absolute;
left: 87.73%;
right: 0%;
top: 0%;
bottom: 0%;

background: #DFB58F;
`

export const GraphBar3 = styled.div`
position: absolute;
left: 21.17%;
right: 21.78%;
top: 59.18%;
bottom: 34.24%;
background-color: aqua;
`

export const G3Familiar = styled.div`
position: absolute;
left: 0%;
right: 53.22%;
top: 0%;
bottom: 0%;

background: #EAF2E4;
`

export const G3NotFamiliar = styled.div`
position: absolute;
left: 46.78%;
right: 18.87%;
top: 0%;
bottom: 0%;

background: #C45250;
`

export const G3NotEnoughData = styled.div`
position: absolute;
left: 81.13%;
right: 0%;
top: 0%;
bottom: 0%;

background: #DFB58F;
`

export const GraphBar4 = styled.div`
position: absolute;
left: 21.17%;
right: 21.78%;
top: 72.34%;
bottom: 21.09%;
background-color: aqua;
`

export const G4Familiar = styled.div`
position: absolute;
left: 0%;
right: 66.26%;
top: 0%;
bottom: 0%;

background: #EAF2E4;
`

export const G4NotFamiliar = styled.div`
position: absolute;
left: 33.74%;
right: 12.12%;
top: 0%;
bottom: 0%;

/* Incorrect */
background: #C45250;
`

export const G4NotEnoughData = styled.div`
position: absolute;
left: 87.73%;
right: 0%;
top: 0%;
bottom: 0%;

/* No_attempt_color */
background: #DFB58F
`

export const LegendTitle = styled.div`

margin-top: 20%;

padding-left: 15%;
padding-bottom: 4%;
text-align: left;
font-family: Roboto;
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: normal;

color: #000000;
`

export const Rect = styled.div <{color: string}> `
position: absolute;
left:15.08%;
width:15px;
height:15px;
background-color: ${props=>props.color};
margin-right: 6px;
// display: block;
display: inline-block;   
`

export const LegendContainer = styled.div`    
position: absolute;
width: 179px;
height: 162px;
left: 942px;
top: 22px;

`

export const LegendText = styled.div`
position: absolute;
left: 25%;
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: normal;
display: inline;

color: #000000;
`

export const IndividualLegend = styled.div`

`