import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import Flex from "../../../components/Box/Flex";
import { LogoIcon, LogoWithTextIcon } from "../../../components/Svg";
import { MenuContext } from "../context";

interface Props {
  isDark: boolean;
  href: string;
}

const blink = keyframes`
  0%,  100% { transform: scaleY(1); }
  50% { transform:  scaleY(0.1); }
`;

const StyledLink = styled("a")`
  display: flex;
  align-items: center;
  .mobile-icon {
    width: 54px;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: none;
    }
  }
  .desktop-icon {
    width: 240px;
    display: none;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: block;
    }
  }
  .eye {
    animation-delay: 20ms;
  }
  &:hover {
    .eye {
      transform-origin: center 60%;
      animation-name: ${blink};
      animation-duration: 350ms;
      animation-iteration-count: 1;
    }
  }
`;

const StyledLogo = styled.img`
  margin-left: 16px;
  margin-right: 16px;
`;

const StyledLogoWithTextIcon = styled.img`
  margin-left: 16px;
  margin-right: 32px;
`;


const Logo: React.FC<Props> = ({ isDark, href }) => {
  const { linkComponent } = useContext(MenuContext);
  const isAbsoluteUrl = href.startsWith("http");
  const mobileLogo = isDark ? '/images/logo-dark.svg' : '/images/logo-light.svg'
  const desktopLogo = isDark ? '/images/logoWithText_dark.png' : '/images/logoWithText_light.png'

  const innerLogo = (
    <>
      {/* <LogoIcon className="mobile-icon" />
      <LogoWithTextIcon className="desktop-icon" isDark={isDark} /> */}
      <StyledLogo className="mobile-icon" src={mobileLogo} />
      <StyledLogoWithTextIcon className="desktop-icon" src={desktopLogo} />
    </>
  );

  return (
    <Flex>
      {isAbsoluteUrl ? (
        <StyledLink as="a" href={href} aria-label="Pancake home page">
          {innerLogo}
        </StyledLink>
      ) : (
        <StyledLink href={href} as={linkComponent} aria-label="Pancake home page">
          {innerLogo}
        </StyledLink>
      )}
    </Flex>
  );
};

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark);
