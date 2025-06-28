import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EmployeeRow = ({
  name,
  employeeId,
  department,
  designation,
  project,
  type,
  status,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleEdit = () => navigate(`/edit/${employeeId}`);
  const handleView = () => navigate(`/view/${employeeId}`);

  const handleDelete = () => {
    const confirmed = window.confirm(`Are you sure you want to delete ${name}?`);
    if (confirmed) {
      console.log("Deleting employeeId:", employeeId); 
      onDelete(employeeId);
    }
  };

  const statusStyle =
    status === 'Active'
      ? 'bg-green-100 text-green-700'
      : status === 'Non Active'
      ? 'bg-red-100 text-red-700'
      : 'bg-yellow-100 text-yellow-700';

  return (
    <tr className="border-b hover:bg-gray-50 text-sm">
      <td className="px-4 py-3 flex items-center gap-3">
        <img
          src={`http://localhost:5000/api/employees/${employeeId}/photo`}
          alt={name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="font-medium">{name}</span>
      </td>
      <td className="px-4 py-3">{employeeId}</td>
      <td className="px-4 py-3">{department}</td>
      <td className="px-4 py-3">{designation}</td>
      <td className="px-4 py-3">{project}</td>
      <td className="px-4 py-3">{type}</td>
      <td className="px-4 py-3">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusStyle}`}>
          {status}
        </span>
      </td>
      <td className="px-4 py-3 flex gap-3 text-gray-600">
        <FaEye onClick={handleView} className="cursor-pointer hover:text-blue-500" />
        <FaEdit onClick={handleEdit} className="cursor-pointer hover:text-green-500" />
        <FaTrash onClick={handleDelete} className="cursor-pointer hover:text-red-500" />
      </td>
    </tr>
  );
};

export default EmployeeRow;
