'use client';

import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

const SkeletonWrapper = styled.div<{
  width?: string;
  height?: string;
  borderRadius?: string;
}>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '20px'};
  border-radius: ${({ borderRadius }) => borderRadius || '4px'};
  background: #f0f0f0;
  background-image: linear-gradient(to right, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%);
  background-repeat: no-repeat;
  background-size: 400px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  display: inline-block;
`;

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export default function Skeleton({ width, height, borderRadius, className }: SkeletonProps) {
  return <SkeletonWrapper width={width} height={height} borderRadius={borderRadius} className={className} />;
}
