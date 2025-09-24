import React from 'react';

import { colorsSekai } from '@/styles/sekai-colors';

import type { ColorsSekaiKey } from '@/styles/sekai-colors';

interface ColorProps {
  sekai: ColorsSekaiKey;
}

export const Color = ({ sekai }: ColorProps) => {
  const colorCode = colorsSekai[sekai];

  return (
    <>
      <div style={{ backgroundColor: colorCode, width: 240, height: 120, marginBottom: 16 }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontWeight: 'bold' }}>{sekai}</span>
        <span style={{ fontWeight: 'bold' }}>{colorCode}</span>
      </div>
    </>
  );
};
