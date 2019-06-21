import { styled } from "@styles";
import { NavLink } from "react-router-dom";

export const Link = styled(NavLink)`
  position: relative;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  text-transform: uppercase;
  z-index: 0;

  &.${props => props.activeClassName} {
    &:before {
      background-color: ${props => props.theme.colors.primary};
      content: "";
      height: 7px;
      left: -5px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%) skew(45deg);
      width: calc(100% + 10px);
      z-index: -1;
    }
  }
`;