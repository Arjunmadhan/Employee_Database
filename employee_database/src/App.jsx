import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AddEmployee from './pages/AddEmployee';
import Dashboard from './pages/Dashboard';
import EditEmployee from './pages/EditEmployee';
import ViewEmployee from './pages/ViewEmployee';

const App = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/employees')
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error('Failed to fetch employees:', err));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
      
        <Header employees={employees} />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard employees={employees} setEmployees={setEmployees} />} />
            <Route path="/add" element={<AddEmployee setEmployees={setEmployees} employees={employees} />} />
            <Route path="/edit/:id" element={<EditEmployee employees={employees} setEmployees={setEmployees} />} />
            <Route path="/view/:id" element={<ViewEmployee employees={employees} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;

