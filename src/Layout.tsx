/*********************
 * Layout.tsx
 * 
 * This file provides a standard layout for header for all of the page. It can also be used in the future
 * to add the footer to all of the files.
 *
 * 
 **********************/


import {History} from "history";
import * as React from "react";
import styled from "styled-components";
import { Button, Grid, GridColumn } from 'semantic-ui-react';
import * as globalStyle from "./AppStyle"

/* CSS For different componenets*/
const TopBarBackground = styled.div`
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;

    background: #454545;
`

const SessionButton = styled.div`
    color: #FFFFFF;
    cursor: pointer;
    z-index: 1;
`

const SessionButtonText = styled(globalStyle.Header500)`
    color: ${globalStyle.colors.baseBlueStone}
`

const UserNameButton = styled.div`
    display: flex;
    align-items: center;
    
    left: 0px;  
    width: 100px;

    color: #FFFFFF;
    cursor: pointer;
    z-index: 1;
`

const UserNameText = styled(globalStyle.Header500)`
    color: ${globalStyle.colors.baseBlueStone}
`

const LogoutButton = styled(Button)`
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

const TopBarContainer = styled(Grid.Row)`
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

const TopBarRightButtonGroupContainer = styled.div`
    display: flex;
    flexDirection:row; 
    left: 80%;
    position: relative
`

/* Props interface  */
interface ILayoutProps{ 
    history: History,
    userName?: string,
    logoutAction?: (history)=>void
}


/* Main Class  */
export class Layout extends React.Component<ILayoutProps, any> {

    public render(){
        return (
            <React.Fragment>
            <Grid style={{marginTop: 0, marginBottom: 0, padding:0}}>
                <TopBarContainer>
                    <GridColumn width={1}/>
                    <GridColumn width={1} style={{display: "flex", alignItems: "center"}}>
                        <SessionButton onClick={this.navigateToSessions}> 
                            <SessionButtonText> Sessions </SessionButtonText>
                        </SessionButton>
                    </GridColumn>
                    <GridColumn width={10}>

                    </GridColumn>

                    <GridColumn width={3} style={{display:"flex", alignItems:"center", justifyContent:"flex-end"}}>
                        <UserNameButton> <UserNameText> {this.props.userName} </UserNameText> </UserNameButton>
                        <LogoutButton onClick={this.logoutAction}> Log out </LogoutButton>   
                    </GridColumn>
                    
                    {/* 
                    <TopBarRightButtonGroupContainer>
                            <UserNameButton> <UserNameText> {this.props.userName} </UserNameText> </UserNameButton>                
                            <LogoutButton onClick={this.logoutAction}> Log out </LogoutButton>
                    </TopBarRightButtonGroupContainer> 
                    */}
                </TopBarContainer>
            </Grid>
            {this.props.children}
            </React.Fragment>
        )
    }

    private logoutAction = () => {
        if (this.props.logoutAction !== undefined)
            this.props.logoutAction(this.props.history)
    }

    private navigateToSessions = () => {
        this.props.history.push('/sessions')

    }
}