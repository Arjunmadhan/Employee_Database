import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeTable from '../components/EmployeeTable';

const Dashboard = ({ employees, setEmployees }) => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/employees')
      .then((res) => setEmployees(res.data))
      .catch((err) => {
        console.error('Failed to fetch employees:', err);
        alert('Error fetching employee data from backend.');
      });
  }, [setEmployees]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Employees</h1>
        <button
          onClick={() => navigate('/add')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Employee
        </button>
      </div>
      <EmployeeTable employees={employees} setEmployees={setEmployees} />
    </div>
  );
};

export default Dashboard;
