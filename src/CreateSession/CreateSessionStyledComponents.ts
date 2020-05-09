import { Button, Form, Grid } from 'semantic-ui-react';
import styled from "styled-components";
import * as globalStyle from "../AppStyle";

export const CreateAssessmentLabel = styled(globalStyle.Header600)`
    position: relative;
    width: 842px;
    height: 30px;
    top: 40px;

    color: ${globalStyle.colors.baseBlueStone};
    display: flex;
    justify-content: left;
    align-items:center;
`

export const StyledForm = styled(Form)`
    position: relative;
    width: 100%;
    height: 19px;
    top: 70px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: normal;

    color: #000000;
`

export const ChooseStudentContainer = styled.div`
    position: relative;
    width: 100%;
    height: 448px;
    left: 0px;
    top: 0px;

    box-sizing: border-box;
    overflow: scroll;
`

export const BackgroundContainer = styled(Grid)`
    // position: absolute;
    width: 100vw;
    height: 100vh;
    // left: 121px;
    // top: 40px;
    background: transparent;
`

export const SessionTitleLabel = styled(globalStyle.Header500)`
    color: ${globalStyle.colors.baseBlueStone};
    display: flex; 
    justify-content: left;
    margin-bottom: 10px
`

export const StudentTitleLabel = styled(globalStyle.Header500)`
    color: ${globalStyle.colors.baseBlueStone};
    display: flex; 
    justify-content: left;
    margin-bottom: 10px
`

export const ConfirmButton = styled(Button)`
    &&& {
        left: 0;
        background: ${globalStyle.colors.basePacificBlue};
        color: ${globalStyle.colors.baseDoctor};
    }
`

export const CancelButton = styled(Button)`
        background: ${globalStyle.colors.lightNeutral50};
        color: ${globalStyle.colors.baseBlueStone50};
`

export const ConfirmButtonText = styled(globalStyle.Header500)`
    color: ${globalStyle.colors.baseDoctor};
`

export const CancelButtonText = styled(globalStyle.Header500)`
    color: ${globalStyle.colors.baseBlueStone75};
`