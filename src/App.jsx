import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileForm from './ProfileForm';
import DataTableComponent from './DataTableComponent';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProfileForm />} />
          <Route path="/data-table" element={<DataTableComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;