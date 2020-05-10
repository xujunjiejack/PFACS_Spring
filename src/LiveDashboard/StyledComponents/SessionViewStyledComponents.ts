import {Button, ButtonGroup, Grid } from "semantic-ui-react";
import styled from "styled-components";
import * as globalStyle from "../../AppStyle";

export const HeaderContainer = styled.div`
position: relative;
width: 100%;
height: 80px;
top: 0px;
display: flex;
align-items: center;
background: #FFFFFF;
justify-content: flex-end;  
padding: 10px 20px 4px 20px;
`

export const Title = styled(globalStyle.Header600)`
text-align:left;
color: ${globalStyle.colors.baseBlueStone};
margin-bottom: 8px;
`

export const StartTime = styled(globalStyle.Header400)`
text-align: left;

color: ${globalStyle.colors.baseBlueStone50}
`

export const StyledButtonGroup = styled(ButtonGroup)`
&& {
  height: 62px;
  width: 400px;
}
`


export const DashboardButtonText = styled(globalStyle.Header600)`
  color: ${globalStyle.colors.baseBlueStone} 
  
  &.active {
   
    :hover{
      color: ${globalStyle.colors.baseDoctor} ;
    }
    
    color: ${globalStyle.colors.baseDoctor};
  }   
`

export const DashboardButton = styled(Button)`
&& {
  background: ${globalStyle.colors.lightNeutral25};
  border-radius: 6px;

  display: flex;
  justify-content: center;
  align-items:center;
  cursor: pointer;

  :hover{
    background-color: ${globalStyle.colors.basePacificBlue};
  }

  &.active  ${DashboardButtonText},  &:hover ${DashboardButtonText}  {
    color: ${globalStyle.colors.baseDoctor}
  }
  
  &.active {
   
    :hover{
      background-color: ${globalStyle.colors.basePacificBlueActive};
    }

    background-color: ${globalStyle.colors.basePacificBlue};
  }
}
`

export const ReportButtonText = styled(globalStyle.Header600)`
  color: ${globalStyle.colors.baseBlueStone} 
  
  &.active {
    :hover{
      color: ${globalStyle.colors.baseDoctor} ;
    }
    
    color: ${globalStyle.colors.baseDoctor};
  }   
`


export const EndSessionButton = styled(Button)`
&& {
  background: ${globalStyle.colors.lightNeutral25};
  border-radius: 4px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: normal;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items:center;
  cursor: pointer;

  :hover{
    background-color: ${globalStyle.colors.basePacificBlue};
  }

  &.active  ${ReportButtonText}, &:hover ${ReportButtonText} {
    color: ${globalStyle.colors.baseDoctor}
  }

  &.active {
    
    :hover{
      background-color: ${globalStyle.colors.basePacificBlueActive};
    }

    background-color: ${globalStyle.colors.basePacificBlue};
  }
}
`