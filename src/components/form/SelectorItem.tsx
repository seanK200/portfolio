import React from 'react';
import styled from 'styled-components';
import Asset, { AssetPropTypes, defaultAssetProps } from '../utilities/Asset';

const SelectorItem = ({
  value,
  selected,
  toggle = false,
  disabled = false,
  onSelect: handleSelect,
  assetProps,
  selectedAssetProps,
  children,
}: {
  value: string;
  toggle?: boolean;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: (value: string) => void;
  assetProps?: AssetPropTypes;
  selectedAssetProps?: Partial<AssetPropTypes>;
  children: React.ReactNode;
}) => {
  const className = disabled ? 'disabled' : selected ? 'selected' : undefined;

  const handleClick: React.MouseEventHandler<HTMLLIElement> = () => {
    if (typeof handleSelect === 'function') {
      handleSelect(selected && toggle ? '' : value);
    }
  };

  // Asset
  if (assetProps) {
    assetProps = { ...defaultAssetProps, ...assetProps };

    if (selected && selectedAssetProps) {
      assetProps = { ...assetProps, ...selectedAssetProps };
    }
  }

  return (
    <SSelectorItem
      className={className}
      role="menuitemradio"
      onClick={handleClick}
    >
      {assetProps && <Asset {...assetProps} />}
      {children}
    </SSelectorItem>
  );
};

const SSelectorItem = styled.li`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: ${({ theme }) => theme.textColor.default};
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  & span {
    margin-right: 16px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }
  &.selected,
  &.selected:hover {
    color: white;
    background-color: ${({ theme }) => theme.color.primary.default};
  }
  &.disabled,
  &.disabled:hover {
    cursor: default;
    color: ${({ theme }) => theme.color.primary.disabled};
    background-color: none;
  }
`;

export default SelectorItem;
