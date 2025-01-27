import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../App.css';

const UserForm = ({ onAddUser, users, onEdit }) => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', email: '', company: { name: '' } });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (userId && users) {
            const userToEdit = users.find((user) => user.id === parseInt(userId, 10));
            if (userToEdit) {
                setUser(userToEdit);
            }
        }
    }, [userId, users]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
            company: { ...prevUser.company, name: name === 'company' ? value : prevUser.company.name },
        }));
        setErrors({ ...errors, [name]: null });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!user.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!user.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.email)) {
            newErrors.email = 'Invalid email format';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            if (userId) {
                onEdit({ ...user, id: parseInt(userId, 10) });
            } else {
                onAddUser({ ...user, id: Date.now() });
            }
            navigate('/');
        }
    };

    return (
        <div className="user-form">
            <h2>{userId ? 'Edit User' : 'Add User'}</h2>
            <Link to="/" className="back-button">Back to User List</Link> {/* Back button always present */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} id="name" name="name" value={user.name} onChange={handleChange} />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" name="email" value={user.email} onChange={handleChange} />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="company" className="form-label">Company:</label>
                    <input type="text" className="form-control" id="company" name="company" value={user.company.name} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary form-submit-button">{userId ? 'Update User' : 'Add User'}</button>
            </form>
        </div>
    );
};

export default UserForm;