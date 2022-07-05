import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

// Component
export const LoadingSpinner = ({ height = 50, width = 50, borderSize = 5 }) => {
  return <Loader height={height} width={width} borderSize={borderSize} />;
};

// Prop Types
LoadingSpinner.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  borderSize: PropTypes.number
};

// Keyframe Animations
const spin = keyframes`
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
`;

// Styled Components
const Loader = styled.div`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  border: ${({ borderSize }) => borderSize}px solid #e4e4e7;
  border-top: ${({ borderSize }) => borderSize}px solid #a1a1aa;
  border-radius: 50%;
  animation: ${spin} 500ms linear infinite;
`;
