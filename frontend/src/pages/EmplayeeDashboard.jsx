import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleAddEmployeeClick = () => {
        navigate('/add-employee');
    };

    const handleEditClick = (employeeId) => {
        navigate(`/edit-employee/${employeeId}`); 
    };

    const handleDeleteClick = async (employeeId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/employees/${employeeId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete employee');
            }
           
            setEmployees((prevEmployees) => prevEmployees.filter(emp => emp._id !== employeeId));
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/employees');
                if (!response.ok) {
                    throw new Error('Failed to fetch employees');
                }
                const data = await response.json();
                setEmployees(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
            <button
                style={{
                    marginLeft: 'auto',
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                }}
                onClick={handleAddEmployeeClick}
            >
                Add Employee
            </button>
            <h1>Employee Dashboard</h1>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {employees.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Image</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Mobile No</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Designation</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Gender</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee._id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <img src={`data:image/jpeg;base64,${employee.image}`} alt={employee.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.email}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.mobileNo}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.designation}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.gender}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <button onClick={() => handleEditClick(employee._id)}>Edit/</button>
                                    <button onClick={() => handleDeleteClick(employee._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No employees to display.</p>
            )}
        </div>
    );
};

export default EmployeeDashboard;
