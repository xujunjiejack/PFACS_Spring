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
import { Grid, GridColumn } from 'semantic-ui-react';
import * as StyledComponents from './LayoutStyledComponents';

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
                <StyledComponents.TopBarContainer>
                    <GridColumn width={1}/>
                    <GridColumn width={1} style={{display: "flex", alignItems: "center"}}>
                        <StyledComponents.SessionButton onClick={this.navigateToSessions}> 
                            <StyledComponents.SessionButtonText> Sessions </StyledComponents.SessionButtonText>
                        </StyledComponents.SessionButton>
                    </GridColumn>
                    <GridColumn width={10}>

                    </GridColumn>

                    <GridColumn width={3} style={{display:"flex", alignItems:"center", justifyContent:"flex-end"}}>
                        <StyledComponents.UserNameButton> <StyledComponents.UserNameText> {this.props.userName} </StyledComponents.UserNameText> </StyledComponents.UserNameButton>
                        <StyledComponents.LogoutButton onClick={this.logoutAction}> Log out </StyledComponents.LogoutButton>   
                    </GridColumn>
                    
                    {/* 
                    <TopBarRightButtonGroupContainer>
                            <UserNameButton> <UserNameText> {this.props.userName} </UserNameText> </UserNameButton>                
                            <LogoutButton onClick={this.logoutAction}> Log out </LogoutButton>
                    </TopBarRightButtonGroupContainer> 
                    */}
                </StyledComponents.TopBarContainer>
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