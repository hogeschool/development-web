import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'

export const main = () => {
  const rootElement = document.querySelector("#root")
  if (!rootElement) { alert("nooooooo"); return }
  const root = createRoot(rootElement)
  const isLoggedIn = true
  root.render(
    isLoggedIn ?  
      <div key="main-div">Hello world!!!</div>
    : <div key="secondary-div">Goodbye world!!!</div>
  )
}