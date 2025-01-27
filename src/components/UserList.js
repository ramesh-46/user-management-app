import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './UserList.css'; // Import component-specific CSS

const UserList = ({ users, onDelete }) => {
  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text || "";
  };

  return (
    <div className="user-list-container">
      <h2>Users</h2>
      <div className="user-list"> {/* Container for both table and cards */}
        <div className="table-wrapper"> {/* Wrap the table for centering */}
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Company</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.company.name}</td>
                            <td className="actions-cell">
                                <Link to={`/edit/${user.id}`} className="edit-button">
                                    <FaEdit />
                                </Link>
                                <button className="delete-button" onClick={() => onDelete(user.id)}>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="user-cards">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <h3>{truncateText(user.name, 20)}</h3>
              <p>ID: {user.id}</p>
              <p>Email: {truncateText(user.email, 25)}</p>
              <p>Company: {truncateText(user.company.name, 20)}</p>
              <div className="card-actions">
                <Link to={`/edit/${user.id}`} className="edit-button">
                  <FaEdit />
                </Link>
                <button className="delete-button" onClick={() => onDelete(user.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link to="/add" className="add-user-button">Add User</Link>
    </div>
  );
};

export default UserList;