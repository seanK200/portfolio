import React from 'react';
import styled from 'styled-components';
import FullSection from '../components/home/FullSection';
import Asset from '../components/utilities/Asset';
import { useSettings } from '../contexts/SettingsProvider';
import useText from '../hooks/useText';
import ButtonWithIcon from '../styles/ButtonWithIcon';
import SHighlight from '../styles/Highlight';
import ScrollGuide from '../styles/ScrollGuide';
import homeTexts from '../texts/homeTexts';

const MY_GITHUB_URL = 'https://github.com/seanK200';
const MY_LINKEDIN_URL = 'https://www.linkedin.com/in/youngwoo-kim-sean';

const HomeView = (): JSX.Element => {
  const { language } = useSettings();
  const t = useText(homeTexts);

  return (
    <React.Fragment>
      <Introduction>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          <div>
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
              <br />
              {t('introduction2')}
              <br />
              {t('introduction3')}
              <br />
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
          <div>
            <MemojiContainer>
              <img
                src={process.env.PUBLIC_URL + '/images/memoji.png'}
                alt="memoji"
              />
            </MemojiContainer>
          </div>
        </div>
        <ScrollGuide>{t('scrollGuide1')}</ScrollGuide>
      </Introduction>
      <FullSection id="portfolio">Portfolio Overview</FullSection>
    </React.Fragment>
  );
};

const Introduction = styled(FullSection)`
  justify-content: space-between;
  & h1 {
    font-weight: 300;
    font-size: 2.5rem;
    line-height: 1.5;
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
`;

const Highlight = styled(SHighlight)`
  color: ${({ theme }) => theme.color.primary.default};
`;

const MemojiContainer = styled.div`
  width: 254px;
  height: 254px;
  border-radius: 50%;
  box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.color.primary.default};
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 50%;
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
`;

const ResumeButton = styled(ButtonWithIcon)`
  color: ${({ theme }) => theme.color.primary.default};
  padding: 0;
`;

const LinkButton = styled(ButtonWithIcon)`
  color: ${({ theme }) => theme.textColor.default};
  padding: 0;
`;

export default HomeView;
