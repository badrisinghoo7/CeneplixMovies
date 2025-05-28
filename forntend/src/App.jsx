import './App.css';
import AllRoutes from './Routes/AllRoutes';
import Navbar from './Components/Navbar';
import React, { useState } from 'react';

function App() {
  const [search, setSearch] = useState('');
  return (
    <div className=" flex flex-col bg-transparent">
      <Navbar search={search} setSearch={setSearch} />
      <div className="flex-1 pt-20">
        <AllRoutes search={search} setSearch={setSearch} />
      </div>
    </div>
  );
}

export default App;
