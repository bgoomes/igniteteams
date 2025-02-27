import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type FilterStyleProps = {
    isActive?: boolean
}

export const Container = styled(TouchableOpacity)<FilterStyleProps>`
${({theme, isActive}: any) => isActive && css`
    border: 1px solid ${theme.COLORS.GREEN_700};
`};

    border-radius: 4px;
    margin-right: 12px;
    padding: 2px;


    height: 38px;
    min-width: 70px;

    align-items: center;
    justify-content: center;
`

export const Title = styled.Text`
  ${({theme}: any) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.WHITE};
`};  
    text-transform :uppercase;
`