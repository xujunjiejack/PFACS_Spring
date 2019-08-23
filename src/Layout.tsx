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
import styled from "styled-components"

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
    position: absolute;
    left: 86.25%;
    right: 7.5%;
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

const TopBarContainer = styled.div`
    position: relative;
    width: 1440px;
    height: 43px;
    left: 0px;
    top: 0px;
`

/* Props interface  */
interface ILayoutProps{ 
    history: History
}

/* Main Class  */
export class Layout extends React.Component<ILayoutProps, any> {

    public render(){
        return (
            <TopBarContainer>
                <TopBarBackground/>
                <SessionButton onClick={this.navigateToSessions}> Sessions </SessionButton>
                <UserNameButton> User Name </UserNameButton>

                {this.props.children}
            </TopBarContainer>
        )
    }

    private navigateToSessions = () => {
        this.props.history.push('/sessions')

    }
}