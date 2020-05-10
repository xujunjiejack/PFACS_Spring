import * as globalStyle from "../../AppStyle";
import styled from "styled-components";
import { StudentStatus } from '../../data_structure/Student';

export const GridHeaderStyle = {
    // paddingLeft: "8px",
    paddingTop: "16px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    height: "60px",
    color: "#000000",
    borderWidth:"0px"
  }
  
  export const TotalStudentLabel = styled(globalStyle.Header400)`
    color: ${globalStyle.colors.baseBlueStone50};
  
    display: inline;
    right: 50px;
    position: absolute
  `
  
  export const Rect = styled.div <{status: StudentStatus}> `
      &:first-of-type{
        margin-left:4px;
      }
  
      width:15px;
      height:15px;
      background-color: ${props=>generateColorBasedOnStatus(props.status)};
      margin-right: 6px;
      margin-left: 30px;
      display: inline-block;   
  `
  
  export const StatusInstruction = styled(globalStyle.Header400)`
      color: ${globalStyle.colors.baseBlueStone}
  `
  
  export const StudentLabel = styled(globalStyle.Header500)`
      color: ${globalStyle.colors.baseBlueStone};
      display: inline
  `


  const generateColorBasedOnStatus = (status: StudentStatus) => {
    switch (status) {
      case StudentStatus.InProgress:
        return "#DAF8FF";

      case StudentStatus.Idle:
        return "#EFEFEF";

      case StudentStatus.Absent:
        return "#EFEFEF";  

      case StudentStatus.Stuck: 
        return "#E2DAFF";

      default:
        return "#000000";
    }
} 
