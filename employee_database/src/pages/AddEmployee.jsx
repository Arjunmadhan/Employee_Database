import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmployee = ({ setEmployees, employees }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    department: '',
    project: '',
    status: 'Active',
    employeeId: '',
    designation: '',
    type: 'Online',
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const departments = ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance'];
  const designations = ['Software Engineer', 'Team Lead', 'HR Manager', 'Product Manager'];

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      form.append(key, val);
    });

    if (photo) form.append('profile_photo', photo);

    try {
      await axios.post('http://localhost:5000/api/employees', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setEmployees([...employees, formData]);
      alert('Employee added successfully!');
      navigate('/');
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to add employee.');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Employee</h2>

      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        {/* Profile Photo */}
        <div className="flex flex-col items-start">
          <label className="mb-1 font-medium text-gray-700">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="mb-2"
          />
          {preview && (
            <img src={preview} alt="Preview" className="w-24 h-24 rounded-full border object-cover" />
          )}
        </div>

        {/* Employee Fields */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-gray-700">Name*</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Department*</label>
            <select
              name="department"
              required
              value={formData.department}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded bg-white"
            >
              <option value="">Select</option>
              {departments.map((d) => (
                <option key={d}>{d}</option>
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
              className="w-full border px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Status*</label>
            <select
              name="status"
              required
              value={formData.status}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded bg-white"
            >
              <option>Active</option>
              <option>Non Active</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Employee ID*</label>
            <input
              type="text"
              name="employeeId"
              required
              value={formData.employeeId}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Designation*</label>
            <select
              name="designation"
              required
              value={formData.designation}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded bg-white"
            >
              <option value="">Select</option>
              {designations.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="col-span-2 w-1/2">
            <label className="block mb-1 text-gray-700">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded bg-white"
            >
              <option>Online</option>
              <option>Offline</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;


