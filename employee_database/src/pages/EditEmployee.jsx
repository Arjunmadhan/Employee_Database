import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = ({ employees, setEmployees }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const employee = employees.find(emp => emp.employeeId === id);

  const [formData, setFormData] = useState({
    name: '',
    department: '',
    project: '',
    status: '',
    employeeId: '',
    designation: '',
    type: '',
  });

  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    } else {
      navigate('/');
    }
  }, [employee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('department', formData.department);
      form.append('project', formData.project);
      form.append('status', formData.status);
      form.append('designation', formData.designation);
      form.append('type', formData.type);
      form.append('employeeId', formData.employeeId); 
      if (photo) {
        form.append('profile_photo', photo);
      }

      console.log('📤 Updating employeeId:', formData.employeeId);

      await axios.put(`http://localhost:5000/api/employees/${id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

     
      const updatedEmployees = employees.map(emp =>
        emp.employeeId === id ? { ...formData } : emp
      );
      setEmployees(updatedEmployees);

      alert('Employee updated successfully!');
      navigate('/');
    } catch (err) {
      console.error('❌ Update failed:', err);
      alert('Failed to update employee.');
    }
  };

  const departments = ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance'];
  const designations = ['Software Engineer', 'Team Lead', 'HR Manager', 'Product Manager'];

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Employee</h2>

      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-gray-700">Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Department<span className="text-red-500">*</span></label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded bg-white"
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Project</label>
            <input
              type="text"
              name="project"
              value={formData.project}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Status<span className="text-red-500">*</span></label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded bg-white"
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Non Active">Non Active</option>
              <option value="Permanent">Permanent</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Employee ID*</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              readOnly
              className="w-full border px-4 py-2 bg-gray-100 text-gray-500 rounded cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Designation<span className="text-red-500">*</span></label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded bg-white"
            >
              <option value="">Select Designation</option>
              {designations.map((des) => (
                <option key={des} value={des}>{des}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded bg-white"
            >
              <option value="">Select Type</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block mb-1 text-gray-700">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded px-3 py-2 bg-white"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;

