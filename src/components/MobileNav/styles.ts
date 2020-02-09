import { media, styled } from '@styles';
import ReactSVG from 'react-svg';

export const LogoWrapper = styled(ReactSVG)`
  line-height: 0;

  svg {
    width: 6rem;

    ${media.mediumScreen`
      width: 4rem;
    `}

    ${media.mediumScreen`
      height: 30px;
    `}
  }
`;