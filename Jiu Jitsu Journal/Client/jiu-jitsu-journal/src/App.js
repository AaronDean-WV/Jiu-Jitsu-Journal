import React from "react";
import "./App.css";
import { BrowserRouter } from 'react-router-dom'
import ClassList from "./components/ClassList";

function App() {
 render(
  <BrowserRouter>
    <ClassList />
  </BrowserRouter>,
  document.getElementById('root')
)
}

export default App;