import { MoonIcon } from "@heroicons/react/24/solid";

const NavBar = () => {
  return (
    <div className="main-navbar">
      <h1 className="nav-header">User Management</h1>
      <div>
        <button className="create-user-btn">Create User</button>
        <button className="delete-user-btn">Logout</button>
        <button
          className="moonicon-btn"
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
