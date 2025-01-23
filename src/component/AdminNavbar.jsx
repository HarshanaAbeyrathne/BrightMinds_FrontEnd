import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function AdminNavbar() {
    const navigate = useNavigate();
    
      const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
      }

  return (
    <div className="navbar">
      {/* Placeholder for the left to maintain center alignment */}
      <div className="flex-1">
      <a className="btn btn-ghost normal-case text-xl text-white"><Link to="/admin">Bright Minds Admin</Link></a>
      </div>

      {/* Central navigation items */}
      <div className="flex-1 text-center">
        <ul className="menu menu-horizontal p-0 justify-center">
        <li><Link to="/add-item">Add Item</Link></li>
        <li><Link to="/remove-item">Remove item</Link></li>
        <li><Link to="/products">Recent Products</Link></li>
        </ul>
      </div>

      <div className="flex-1 flex justify-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User profile" />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-compact dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            <li><a>Profile</a></li>
            <li><a>Settings</a></li>
            <li><button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminNavbar