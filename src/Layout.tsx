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
// import { GoogleLogout } from 'react-google-login';
import { Button } from 'semantic-ui-react';

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
    position: absolute;
    left: 8.96%;
    right: 85.97%;
    top: 23.26%;
    bottom: 25.58%;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: normal;
    

    color: #FFFFFF;
    cursor: pointer;
    z-index: 1;
`

const UserNameButton = styled.div`
    display: flex;
    align-items: center;
    // left: 86.25%;
    left: 0px;  
    width: 100px;
    // right: 7.5%;
    // top: 23.26%;
    // bottom: 25.58%;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: normal;

    color: #FFFFFF;
    cursor: pointer;
    z-index: 1;
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

const TopBarContainer = styled.div`
    position: relative;
    // width: 1440px;
    width: 100vw;
    height: 43px;
    left: 0px;
    top: 0px;
    background: #454545;
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
            <TopBarContainer>
                <SessionButton onClick={this.navigateToSessions}> Sessions </SessionButton>
                
                <TopBarRightButtonGroupContainer>
                    <UserNameButton> {this.props.userName} </UserNameButton>                
                    <LogoutButton onClick={this.logoutAction}> Log out </LogoutButton>
                </TopBarRightButtonGroupContainer>

                {this.props.children}

            </TopBarContainer>
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