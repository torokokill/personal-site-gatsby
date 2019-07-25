/** @jsx jsx */
import { jsx } from '@emotion/core';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';

const itemWaitMs = 5000;

const tags = [
  'Full-stack developer',
  'Technical mentor',
  'Infosec enthusiast',
  'HAM radio operator',
  'UI architecture specialist',
  'React developer',
  'Webpack wrangler',
  'Pythonista',
  'Dog person',
  'Bicyclist',
  'Trumpet player',
];

const transitionItem = {
  overflow: 'hidden',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',

  willChange: 'transform, opacity, height',
  whiteSpace: 'nowrap',
  lineHeight: '80px',
};

function SkillsRotator() {
  const ref = useRef([]);
  const [items, set] = useState([[tags[0]]]);
  const transitions = useTransition(items, null, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
    },
    enter: {
      opacity: 1,
      height: 80,
      innerHeight: 80,
    },
    leave: { innerHeight: 0, height: 0, opacity: 0 },
    // update: { color: '#28b4d7' },
  });

  const reset = useCallback(() => {
    ref.current.map(clearTimeout);
    ref.current = [];
    tags.forEach((tag, index) => {
      ref.current.push(setTimeout(() => set([tag]), itemWaitMs * index));
    });
    ref.current.push(setTimeout(() => reset(), itemWaitMs * tags.length));
  }, []);

  useEffect(() => void reset(), []);

  return (
    <div style={{ height: '80px' }}>
      {transitions.map(({ item, props: { innerHeight, ...rest }, key }) => (
        <animated.div css={transitionItem} key={key} style={rest}>
          <animated.div style={{ overflow: 'hidden', height: innerHeight }}>
            {item}
          </animated.div>
        </animated.div>
      ))}
    </div>
  );
}

export default SkillsRotator;