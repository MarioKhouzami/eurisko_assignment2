import { MoonIcon } from "@heroicons/react/24/solid";

const NavBar = () => {
  return (
    <div className="bg-[#3251D0] p-4 flex justify-between items-center">
      <h1 className="text-white font-semibold text-[20px]">User Management</h1>
      <div>
        <button className="bg-white text-[#3251D0] px-3 py-2 rounded-[5px] mr-3 hover:bg-blue-500 hover:text-white">
          Create User
        </button>
        <button className="bg-red-600 text-white px-3 py-2 rounded-[5px] mr-3 hover:bg-red-800">
          Logout
        </button>
        <button
          className="text-white ml-3 mr-3 relative top-1"
          aria-label="Toggle dark mode"
          title="Toggle dark mode"
        >
          <MoonIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
