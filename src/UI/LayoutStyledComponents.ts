import * as globalStyle from "../AppStyle";
import styled from "styled-components";
import { Button, Grid, GridColumn } from 'semantic-ui-react';

export const TopBarBackground = styled.div`
position: absolute;
left: 0%;
right: 0%;
top: 0%;
bottom: 0%;

background: #454545;
`

export const SessionButton = styled.div`
color: #FFFFFF;
cursor: pointer;
z-index: 1;
`

export const SessionButtonText = styled(globalStyle.Header500)`
color: ${globalStyle.colors.baseBlueStone}
`

export const UserNameButton = styled.div`
display: flex;
align-items: center;

left: 0px;  
width: 100px;

color: #FFFFFF;
cursor: pointer;
z-index: 1;
`

export const UserNameText = styled(globalStyle.Header500)`
color: ${globalStyle.colors.baseBlueStone}
`

export const LogoutButton = styled(Button)`
// position: absolute;
// right: 1.5%;
// top: 23.26%;
color: #FFFFFF;
width: 100px;
z-index: 1;
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: normal;
`

export const TopBarContainer = styled(Grid.Row)`
&&&  {
    padding-top: 8px;
    padding-bottom: 8px;
    position: relative;
    display: flex;
    width: 100vw;
    // height: 44px;
    left: 0px;
    alignItems: center;
    background: ${globalStyle.colors.lightNeutral25};
}
`

export const TopBarRightButtonGroupContainer = styled.div`
display: flex;
flexDirection:row; 
left: 80%;
position: relative
`