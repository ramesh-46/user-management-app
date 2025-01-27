import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PacmanLoader from "react-spinners/PacmanLoader";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddUser = (newUser) => {
    if (users.some(user => user.email === newUser.email)) {
        toast.error("User with this email already exists!");
        return;
    }
    setUsers([...users, newUser]);
    toast.success("User added successfully!");
  };

  const handleEditUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    toast.success("User updated successfully!");
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    toast.success("User deleted successfully!");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <PacmanLoader color="#36D7B7" loading={loading} size={50} />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <h1>User Management App</h1>
          <Routes>
            <Route path="/" element={<UserList users={users} onDelete={handleDeleteUser} />} />
            <Route path="/add" element={<UserForm onAddUser={handleAddUser} />} />
            <Route path="/edit/:userId" element={<UserForm users={users} onEdit={handleEditUser} />} />
          </Routes>
          <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"/>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;