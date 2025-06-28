import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside className="w-64 bg-blue-900 text-white min-h-screen p-6">
    <h2 className="text-2xl font-bold mb-10">Employee Details</h2>
    <nav className="space-y-4">
      <Link to="/" className="block hover:text-gray-300">Dashboard</Link>
      <Link to="/add" className="block hover:text-gray-300">Add Employee</Link>
    </nav>
  </aside>
);

export default Sidebar;

