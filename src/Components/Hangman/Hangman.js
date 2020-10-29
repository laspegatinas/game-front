import React from 'react';

const styles = {
  character: {
    fill: 'none',
    stroke: 'black',
    strokeWidth: 3,
  },
  post: {
    fill: 'none',
    stroke: 'black',
    strokeWidth: 10,
  },
};

const Hangman = ({ body, leftArm, rightArm, leftLeg, rightLeg }) => {
  const _renderHead = () => {
    return body
        ? <circle cx="242.246" cy="184.155" r="40" fill="black" transform="matrix(0.842089, 0, 0, 0.829211, 38.34655, 29.65666)"></circle>
        : null;
  }

  const _renderBody = () => {
    return body
      ?  <line x1="242.983" y1="207.071" x2="242.983" y2="330.664" style={styles.character}></line>
      : null;
  }

  const _renderLeftArm = () => {
    return leftArm
      ?   <line x1="241.888" y1="251.913" x2="291.351" y2="230.682" style={styles.character}></line>
      : null;
  }

  const _renderRightArm = () => {
    return rightArm
      ?   <line x1="243.928" y1="252.366" x2="193.169" y2="228.568" style={styles.character}></line>
      : null;
  }

  const _renderLeftLeg = () => {
    return leftLeg
      ?  <line x1="243.257" y1="327.362" x2="288.012" y2="393.337" style={styles.character}></line>
      : null;
  }

  const _renderRightLeg = () => {
    return rightLeg
      ? <line x1="243.191" y1="327.877" x2="195.727" y2="393.088" style={styles.character}></line>
      : null;
  }

  return (
    <svg viewBox="0 0 500 500" width="300" height="300">
      <polyline points="294.046 417.321 104.262 417.321 135.892 417.321 135.892 112.217 243.436 112.217 243.436 150.356" style={styles.post}></polyline>
      {_renderBody()}
      {_renderLeftArm()}
      {_renderRightArm()}
      {_renderLeftLeg()}
      {_renderRightLeg()}
      {_renderHead()}
    </svg>
  );
}

export default Hangman;
