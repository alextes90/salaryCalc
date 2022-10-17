import { keyframes } from '@emotion/react';

export const formContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1em',
  minWidth: '15em',
  maxWidth: '25em',
};

export const headerStyle = {
  padding: '2em',
  marginBottom: '2em',
  backgroundColor: '#0088fe',
  color: 'white',
};

export const appContainerStyle = {
  maxWidth: '1000px',
  margin: '0 auto',
};

const tiltShake = keyframes`
0% {
  transform: translateX(0px);
}  
25% {
  transform: translateX(5px);
}  
50% {
  transform: translateX(0px);
} 
75% {
  transform: translateX(-5px);
} 
100% {
  transform: translateX(0px);
} 
`;

export const tiltAnimationStyle = {
  animation: `${tiltShake} 0.2s 2`,
};
