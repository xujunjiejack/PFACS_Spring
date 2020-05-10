import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import * as globalStyle from '../../AppStyle';
import {GridRow} from 'semantic-ui-react';

/**
 * Contains styled components for session management page
 */
export const DeleteIcon = styled(FontAwesomeIcon)`
    position: relative;
    width: 20px;
    height: 20px;
    curosr: pointer;
`

export const DashboardIcon = styled(FontAwesomeIcon)`
    position: relative;
    width: 25px;
    height: 21px;
    // left: 510px;
    cursor: pointer; 
    margin-right: 8px;
`

export const ReportIcon = styled(FontAwesomeIcon)`
    position: relative;
    width: 15px;
    height: 20px;
    cursor: pointer;
    margin-right: 8px;
`

export const ViewButtonText = styled(globalStyle.Header100)`
    line-height:0px;    

    color:${globalStyle.colors.baseBlueStone};
    
`

export const ViewActionButton = styled.button`
    border-radius: 6px;
    background: ${globalStyle.colors.lightNeutral25};
    // background: #F4F4F4;
    border-width: 0px;
    border-color: rgb(0,0,0,0.1);
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 35px;
    width: 120px;

    justify-content: center;
    margin-right: 8px;
    text-decoration: none;
    :hover{
        background-color: ${globalStyle.colors.basePacificBlue25};
    }

    &.active { 
        :hover{
        background-color: #357AE0;
        }
        background-color: ${globalStyle.colors.basePacificBlue25};
    },
    outline: none;
`

export const DashboardButton = styled(ViewActionButton)`
    width: 120px;
    margin-right: 8px;
    margin-left: 12px;
`

export const DeleteButton = styled(ViewActionButton)`
    width: 40px; 
    margin-right: 0;
    
`

export const EditButton = styled(ViewActionButton)`
    width : 40px;
`

export const ReportButton = styled(ViewActionButton)`
    width: 120px;
`

export const SessionLabel = styled(globalStyle.Header600)`
    width: 85px;
    height: 22px;
    text-align: left;
    display: flex;
    align-items: center;
    color: ${globalStyle.colors.baseBlueStone};
`

export const CreatePrompt = styled.div`
    position: absolute;
    width: 664px;
    height: 37px;
    left: 387px;
    top: 364px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 31px;
    line-height: normal;

    color: #000000;
`

export const CreateNewButton = styled.div`
    position: absolute;
    width: 221px;
    height: 44px;
    left: 609px;
    top: 442px;

    border: 1px solid #818181;
    box-sizing: border-box;
    border-radius: 10px;
    display: flex;

    background-color: ${globalStyle.colors.basePacificBlue};
    justify-content: center;
    align-items:center;
    cursor: pointer;

    :hover {
        background-color: ${globalStyle.colors.basePacificBlueActive}
    }
`

export const CreateNewButtonText = styled(globalStyle.Header500)`
    font-weight: normal;
    color: ${globalStyle.colors.baseDoctor}
`

export const CreateNewButtonSmall = styled.div`

    &&& {
    position: absolute;
    width: 184px;
    height: 38px;
    // left: 1142px;
    right: 14px;

    background: #F4F4F4;
    box-sizing: border-box;
    border-radius: 6px;
    background-color: ${globalStyle.colors.basePacificBlue};

    display: flex;
    justify-content: center;
    align-items:center;
    cursor: pointer;


    :hover{
        background-color: ${globalStyle.colors.basePacificBlueActive};
      }
  
      &.active {
        
        :hover{
          background-color:${globalStyle.colors.baseBlueStone};
          color: white;
        }
        background-color:${globalStyle.colors.basePacificBlueActive};
        color: white;
      }
    }
`

export const SessionRowContainer = styled(GridRow)`
    position: relative;
    // width: 1132px;
    width: 100%;
    
    &:first-of-type {
        margin-top: 0px; 
    }

    margin-top: 15px;
    margin-bottom: 0px;
    display: flex;
    alignItems: center;

    &&& {
        padding-bottom:4px;
    }
`

export const SessionNameText = styled(globalStyle.Header500)`
    position: relative;
    height: 24px;
    top: 0px;
    margin-bottom: 0;

    display: flex;
    align-items: center;
    text-align: left;

    color: ${globalStyle.colors.baseBlueStone};
`

export const SessionStartTimeText = styled(globalStyle.Header200)`
    width: 422px;
    height: 19px;
    top: 42px;

    text-align: left;

    color: ${globalStyle.colors.baseBlueStone50};
`

export const StudentNumber = styled(globalStyle.Header400) <{ isOnGoing: boolean }>`
    position: relative;
    width: 96.98px;
    height: 22px;
    top: 1px;

    color: ${globalStyle.colors.baseBlueStone};
    margin-bottom: 0px;
    margin-right: 8px;
`

export const OngoingLabel = styled(globalStyle.Header300)`
    position: relative;
    height: 25px;
    left: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    vertical-align: middle;
    background: ${globalStyle.colors.basePacificBlue};
    color: ${globalStyle.colors.baseDoctor}
    border-radius: 8px;

    width: 110px;
`