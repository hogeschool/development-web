import React from 'react';
import ReactDOM from 'react-dom'

export const main = () => {
  let rootElement = document.querySelector('#root')

  ReactDOM.render(
      <>
        <h1>Welcome to the exam template!</h1>
        <p>Extend this template in order to make the assignments indicated in the accompanying markdown file.</p>
        <p><em>Do not submit the template, but only the code you wrote yourself.</em></p>
        <p>Take a deep breath, you can do this, and good luck!!! 💪❤️</p>
      </>,
    rootElement
  )
}