 import "./App.css";
 import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import TaskForm from "./component/TaskForm"
import About from "./About"
 function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<TaskForm />} />
                  <Route path="about" element={<About/>} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}
export default App;