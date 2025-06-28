import axios from 'axios';
import EmployeeRow from './EmployeeRow';

const EmployeeTable = ({ employees, setEmployees }) => {
  const handleDelete = async (employeeId) => {
    const confirm = window.confirm('Are you sure you want to delete this employee?');
    if (!confirm) return;

    try {
      console.log('Deleting employeeId:', employeeId); 
      await axios.delete(`http://localhost:5000/api/employees/${employeeId}`);

      const updated = employees.filter(emp => emp.employeeId !== employeeId);
      setEmployees(updated);

      console.log('Employee deleted successfully');
    } catch (err) {
      console.error('Delete failed:', err.response?.data || err.message);
      alert('Failed to delete employee.');
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-6 border border-gray-200">
      <table className="w-full table-auto text-left text-sm text-gray-800">
        <thead>
          <tr className="bg-gray-100 text-gray-700 uppercase">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Designation</th>
            <th className="px-4 py-2">Project</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <EmployeeRow
              key={emp.employeeId}
              {...emp}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;

