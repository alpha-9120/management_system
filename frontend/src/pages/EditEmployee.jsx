import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        course: '',
    });

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/employees/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch employee data');
                }
                const data = await response.json();
                setEmployee(data);
            } catch (err) {
                setError(err.message);
            }
        };
        
        fetchEmployee();
    }, [id]);

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/api/employees/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employee),
            });

            if (!response.ok) {
                throw new Error('Failed to update employee');
            }
            setSuccess('Employee updated successfully!');
            navigate('/'); 
        } catch (err) {
            setError(err.message);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value,
        }));
    };

    return (
        <div style={styles.formContainer}>
            <h2>Edit Employee</h2>
            {success && <p style={styles.successMessage}>{success}</p>}
            {error && <p style={styles.errorMessage}>{error}</p>}
            <form style={styles.employeeForm} onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={employee.name}
                        onChange={handleChange}
                        required
                        style={styles.formInput}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        required
                        style={styles.formInput}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Mobile No:</label>
                    <input
                        type="text"
                        name="mobileNo"
                        value={employee.mobileNo}
                        onChange={handleChange}
                        required
                        style={styles.formInput}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Designation:</label>
                    <input
                        type="text"
                        name="designation"
                        value={employee.designation}
                        onChange={handleChange}
                        required
                        style={styles.formInput}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Gender:</label>
                    <select
                        name="gender"
                        value={employee.gender}
                        onChange={handleChange}
                        required
                        style={styles.formInput}
                    >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label>Course:</label>
                    <input
                        type="text"
                        name="course"
                        value={employee.course}
                        onChange={handleChange}
                        required
                        style={styles.formInput}
                    />
                </div>
                <button type="submit" style={styles.submitButton}>Update</button>
            </form>
        </div>
    );
};


const styles = {
    formContainer: {
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    employeeForm: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    formInput: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    successMessage: {
        color: 'green',
        textAlign: 'center',
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
    },
    submitButton: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default EditEmployee;
