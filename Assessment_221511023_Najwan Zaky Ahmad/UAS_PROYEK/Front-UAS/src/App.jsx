import "./App.css"
import { Route, Routes } from "react-router-dom"


import EditDistribusi from "./Components/editDistribusi"


function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<EditDistribusi />} />
      
    </Routes>
  )
}

export default App
