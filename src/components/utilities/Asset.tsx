import React from 'react';
import styled from 'styled-components';
import { useSettings } from '../../contexts/SettingsProvider';

export type AssetPropTypes = {
  src: string;
  width: number | string;
  height: number | string;
  spriteX?: number; // total number of assets in sprite (x-axis)
  spriteY?: number; // total number of assets in sprite (y-axis)
  offsetX?: number; // choose one of the asssets (x-axis, 0: left --> right)
  offsetY?: number; // choose one of the asssets (y-axis, 0: top  --> bottom)
  themed?: boolean;
  hoverable?: boolean;
};

type StyledPropTypes = {
  url: string;
  width: string;
  height: string;
  offsetX: string;
  offsetY: string;
  scale: string;
  hoverable: boolean;
};

export const defaultAssetProps = {
  spriteX: 1,
  spriteY: 1,
  offsetX: 0,
  offsetY: 0,
  themed: true,
  hoverable: false,
};

const Asset = (props: AssetPropTypes) => {
  const { theme } = useSettings();

  const {
    src,
    width,
    height,
    spriteX = defaultAssetProps.spriteX,
    spriteY = defaultAssetProps.spriteY,
    offsetX = defaultAssetProps.offsetX,
    offsetY = defaultAssetProps.offsetY,
    themed = defaultAssetProps.themed,
    hoverable = defaultAssetProps.hoverable,
  } = props;

  const useDarkTheme = themed && spriteY > 1 && theme === 'dark';

  return (
    <SAsset
      url={process.env.PUBLIC_URL + '/assets/' + src}
      width={typeof width === 'number' ? `${width}px` : width}
      height={typeof height === 'number' ? `${height}px` : height}
      offsetX={`calc(-1 * ${width} * ${offsetX})`}
      offsetY={`calc(-1 * ${height} * ${offsetY} ${
        useDarkTheme ? `- ${height}` : ''
      })`}
      scale={`${spriteX * 100}%`}
      hoverable={hoverable}
    ></SAsset>
  );
};

const SAsset = styled.span<StyledPropTypes>`
  display: block;
  background: ${({ url, offsetX, offsetY }) =>
    `url(${url}) ${offsetX} ${offsetY}`};
  background-repeat: no-repeat;
  background-size: ${({ scale }) => scale};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  cursor: ${({ hoverable }) => (hoverable ? 'pointer' : 'auto')};

  &:hover {
    background-position-x: ${({ hoverable, offsetX, width }) =>
      hoverable ? `calc(${offsetX} - ${width})` : offsetX};
  }
`;

export default Asset;