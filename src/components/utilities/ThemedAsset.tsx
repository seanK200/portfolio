import React from 'react';
import styled from 'styled-components';
import { useSettings } from '../../contexts/SettingsProvider';

type AssetRole = 'image' | 'link';

interface RequiredPropTypes {
  src: string;
}

interface OptionalPropTypes {
  role?: AssetRole;
  hoverable?: boolean;
  width?: string;
  height?: string;
  alt?: string;
  href?: string;
  style?: React.CSSProperties;
}

interface PropTypes extends RequiredPropTypes, OptionalPropTypes {}

interface StyledPropTypes extends OptionalPropTypes {
  src?: string;
  path: string;
  as?: React.ElementType | keyof JSX.IntrinsicElements;
  assetWidth?: string;
  assetHeight?: string;
}

const ThemedAsset = (props: PropTypes) => {
  const {
    src,
    role = 'image',
    hoverable = false,
    width,
    height,
    alt,
    href,
    style,
  } = props;

  const { themeMode } = useSettings();

  const path = `${process.env.PUBLIC_URL}/assets/${themeMode}/${src}`;

  const styledProps: StyledPropTypes = {
    path,
    hoverable,
    assetWidth: width,
    assetHeight: height,
    style,
  };

  if (role === 'image') {
    if (!alt)
      throw new Error(
        "ThemedAsset requires an alt prop for asset role='image'."
      );
    styledProps.src = `${process.env.PUBLIC_URL}/images/transparent.png`;
    styledProps.alt = alt;
    styledProps.width = '1';
    styledProps.height = '1';
  } else {
    if (!href)
      throw new Error(
        "ThemedAsset requires a href prop for asset role='link'."
      );
    styledProps.as = 'a';
    styledProps.href = href;
  }

  return <SThemedAsset {...styledProps} />;
};

const SThemedAsset = styled.img<StyledPropTypes>`
  display: block;
  cursor: ${({ hoverable }) => (hoverable ? 'pointer' : 'auto')};
  ${({ assetWidth }) => (assetWidth ? `width: ${assetWidth};` : '')}
  ${({ assetHeight }) => (assetHeight ? `height: ${assetHeight};` : '')}
  background: url(${({ path }) => path}) 0 0;
  background-size: cover;
  &:hover {
    background-position-x: ${({ hoverable }) => (hoverable ? '-100%' : 'left')};
  }
`;

export default ThemedAsset;
