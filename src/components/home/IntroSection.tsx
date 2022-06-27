import React, { useEffect, useRef, useState } from 'react';
import Asset from '../utilities/Asset';
import HideMobile from '../utilities/HideMobile';
import FullSection from './FullSection';
import SHighlight from '../../styles/Highlight';
import styled from 'styled-components';
import useText from '../../hooks/useText';
import { useSettings } from '../../contexts/SettingsProvider';
import homeTexts from '../../texts/homeTexts';
import ScrollGuide from '../../styles/ScrollGuide';
import breakpoints from '../../styles/breakpoints';
import ButtonWithIcon from '../../styles/ButtonWithIcon';
import { useGlobals } from '../../contexts/GlobalProvider';

const MY_GITHUB_URL = 'https://github.com/seanK200';
const MY_LINKEDIN_URL = 'https://www.linkedin.com/in/youngwoo-kim-sean';

const IntroSection = () => {
  const { windowSize } = useGlobals();
  const { language } = useSettings();
  const t = useText(homeTexts);
  const introContentLeftRef = useRef<HTMLDivElement | null>(null);
  const memojiContainerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = windowSize.width <= breakpoints.mobile;
  const [fadedMemoji, setFadedMemoji] = useState<boolean>(false);

  useEffect(() => {
    if (introContentLeftRef.current && memojiContainerRef.current) {
      const { right } = introContentLeftRef.current.getBoundingClientRect();
      const { left } = memojiContainerRef.current.getBoundingClientRect();

      setFadedMemoji(right > left + 8 && !isMobile);
    }
  }, [windowSize]);

  return (
    <SIntroSection>
      <IntroContents>
        <div className="intro__contents" ref={introContentLeftRef}>
          <h1>
            <span>{t('greeting1')}</span>
            <br />
            <span>{t('greeting2')}</span>
            <span className="bold">{t('greeting3')}</span>
            <br />
            <Highlight lang={language}>{t('greeting4')}</Highlight>
            <span>{t('greeting5')}</span>
          </h1>

          <p>
            {t('introduction1')}
            <HideMobile>
              <br />
            </HideMobile>
            {t('introduction2')}
            <HideMobile>
              <br />
            </HideMobile>
            {t('introduction3')}
            <HideMobile>
              <br />
            </HideMobile>
          </p>
          <ButtonContainer>
            <ResumeButton>
              <Asset
                src="attachments.png"
                width="1.5rem"
                height="1.5rem"
                spriteX={16}
                spriteY={2}
                offsetX={1}
              />
              {language === 'en' ? (
                t('resume')
              ) : (
                <span className="button__text">{t('resume')}</span>
              )}
            </ResumeButton>

            <LinkButton as="a" href={MY_GITHUB_URL}>
              <Asset
                src="attachments.png"
                width="1.5rem"
                height="1.5rem"
                spriteX={16}
                spriteY={2}
                offsetX={4}
              />
              Github
            </LinkButton>

            <LinkButton as="a" href={MY_LINKEDIN_URL}>
              <Asset
                src="attachments.png"
                width="1.5rem"
                height="1.5rem"
                spriteX={16}
                spriteY={2}
                offsetX={8}
              />
              LinkedIn
            </LinkButton>
          </ButtonContainer>
        </div>
        <MemojiContainer ref={memojiContainerRef} fadedMemoji={fadedMemoji}>
          <img
            src={process.env.PUBLIC_URL + '/images/memoji.png'}
            alt="memoji"
          />
        </MemojiContainer>
      </IntroContents>
      <ScrollGuide>{t('scrollGuide1')}</ScrollGuide>
    </SIntroSection>
  );
};

const SIntroSection = styled(FullSection)`
  width: 100%;
  display: flex;
  align-items: center;
`;

const IntroContents = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > div.intro__contents {
    display: flex;
    flex-direction: column;
  }

  & h1 {
    font-weight: 300;
    font-size: 2.5rem;
    line-height: 1.4;
    margin-bottom: 24px;
  }
  & h1 span.bold {
    font-weight: 600;
  }

  & p {
    font-weight: 300;
    font-size: 1.25rem;
    line-height: 1.5;
    margin-bottom: 88px;
  }

  @media screen and (max-width: ${breakpoints.mobile}px) {
    & h1 {
      font-size: 2rem;
      line-height: 1.3;
      margin-bottom: 16px;
    }
    & p {
      font-size: 1.125rem;
      margin-bottom: 64px;
    }
    & > div.intro__contents {
      opacity: 0;
      animation-name: intro-reveal;
      animation-duration: 0.5s;
      animation-delay: 2s;
      animation-fill-mode: forwards;
    }
  }

  @keyframes intro-reveal {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Highlight = styled(SHighlight)`
  color: ${({ theme }) => theme.color.primary.default};
`;

const MemojiContainer = styled.div<{ fadedMemoji: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 254px;
  height: 254px;
  border-radius: 50%;
  box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.color.primary.default};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  ${({ fadedMemoji }) => (fadedMemoji ? 'opacity: 0.1;' : '')}

  & img {
    width: 50%;
  }

  @media screen and (max-width: ${breakpoints.mobile}px) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-name: memoji-reveal;
    animation-duration: 2s;
    animation-fill-mode: forwards;
  }

  @keyframes memoji-reveal {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(100%);
    }
    50% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(105%);
    }
    100% {
      opacity: 0.1;
      transform: translate(-50%, -50%) scale(100%);
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  & button,
  & a {
    margin-right: 32px;
  }
  & button:last-child,
  & a:last-child {
    margin-right: 0;
  }

  @media screen and (max-width: ${breakpoints.mobile}px) {
    flex-direction: column;
    align-items: flex-start;
    & button,
    & a {
      margin-right: 0;
      margin-bottom: 24px;
    }
  }
`;

const ResumeButton = styled(ButtonWithIcon)`
  color: ${({ theme }) => theme.color.primary.default};
  padding: 0;
`;

const LinkButton = styled(ButtonWithIcon)`
  color: ${({ theme }) => theme.textColor.default};
  padding: 0;
`;

export default IntroSection;
