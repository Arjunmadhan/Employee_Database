import { FaArrowLeft, FaUser } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const ViewEmployee = ({ employees }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const emp = employees.find(e => e.employeeId === id);
  console.log(emp);

  if (!emp) return <p className="text-center mt-8 text-gray-500">Employee not found.</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-5xl mx-auto mt-6">
      
      <div className="flex items-center gap-4 mb-6">
        <FaArrowLeft onClick={() => navigate(-1)} className="text-2xl cursor-pointer" />
        <h2 className="text-2xl font-semibold">View Employee Details</h2>
      </div>

    
      <div className="border-b mb-6">
        <div className="flex gap-2 items-center border-b-2 border-blue-500 w-fit px-3 pb-2 text-blue-600 font-semibold">
          <FaUser />
          <span>Personal Information</span>
        </div>
      </div>

      
      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                
        <img
  src={`http://localhost:5000/api/employees/${emp.employeeId}/photo`}
  alt={emp.name}
  
  className="w-20 h-20 rounded-md object-cover"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = ``;
  }}
/>
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-medium">{emp.name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Employee ID</p>
          <p className="font-medium">{emp.employeeId}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Department</p>
          <p className="font-medium">{emp.department}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Designation</p>
          <p className="font-medium">{emp.designation}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Project</p>
          <p className="font-medium">{emp.project}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Type</p>
          <p className="font-medium">{emp.type}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className="font-medium">{emp.status}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
