import styled from "styled-components";
import * as globalStyles from "../AppStyle";
import {Button} from 'semantic-ui-react';

export const FirebaseLoginButton = styled(Button)`
    &&& {
        // position: absolute;
        width: 209px;
        height: 55px;
        text-align: left;
        // left: 468px;
        // top: 495px;
        justify-content: left;
        background-color: ${globalStyles.colors.basePacificBlue}
    }
`

export const LoginButtonText = styled(globalStyles.Header500)`
    color: ${globalStyles.colors.baseDoctor}
`