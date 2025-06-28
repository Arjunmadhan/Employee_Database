
const Header = ({ employees }) => {

  const latest = employees && employees.length > 0 ? employees[employees.length - 1] : null;

  return (
    <header className="bg-white shadow flex items-center justify-between px-6 py-4">
      <input
        type="text"
        placeholder="Search employees..."
        className="bg-gray-100 px-4 py-2 rounded w-1/2 focus:outline-none"
      />

      
    </header>
  );
};

export default Header;
