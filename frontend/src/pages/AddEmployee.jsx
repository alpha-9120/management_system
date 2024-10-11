import React, { useState } from 'react';

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    designation: '',
    gender: '',
    course: '', 
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEmployeeData({
      ...employeeData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const formData = new FormData();
    for (const key in employeeData) {
      formData.append(key, employeeData[key]);
    }

    try {
      const response = await fetch('http://localhost:3001/api/employees/add-employee', { 
        method: 'POST',
        body: formData, 
      });

      const data = await response.json();
      if (response.ok) {
        alert('Employee added successfully');
        setEmployeeData({
          name: '',
          email: '',
          mobileNo: '',
          designation: '',
          gender: '',
          course: '',
          image: null,
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{ 
        padding: '20px', 
        maxWidth: '600px', 
        margin: 'auto', 
        border: '1px solid #ccc', 
        borderRadius: '8px', 
        backgroundColor: '#f9f9f9',
        boxShadow: '0px 4px 8px rgba(0,0,0,0.1)'
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Employee</h2>

      <div style={{ marginBottom: '15px' }}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={employeeData.name}
          onChange={handleInputChange}
          required
          style={{ 
            width: '100%', 
            padding: '10px', 
            marginTop: '5px', 
            borderRadius: '4px', 
            border: '1px solid #ccc' 
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={employeeData.email}
          onChange={handleInputChange}
          required
          style={{ 
            width: '100%', 
            padding: '10px', 
            marginTop: '5px', 
            borderRadius: '4px', 
            border: '1px solid #ccc' 
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Mobile No</label>
        <input
          type="text"
          name="mobileNo"
          value={employeeData.mobileNo}
          onChange={handleInputChange}
          required
          style={{ 
            width: '100%', 
            padding: '10px', 
            marginTop: '5px', 
            borderRadius: '4px', 
            border: '1px solid #ccc' 
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Designation</label>
        <select
          name="designation"
          value={employeeData.designation}
          onChange={handleInputChange}
          required
          style={{ 
            width: '100%', 
            padding: '10px', 
            marginTop: '5px', 
            borderRadius: '4px', 
            border: '1px solid #ccc' 
          }}
        >
          <option value="">Select</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Gender</label>
        <div>
          <input
            type="radio"
            name="gender"
            value="M"
            checked={employeeData.gender === 'M'}
            onChange={handleInputChange}
            style={{ marginRight: '5px' }}
          /> Male
          <input
            type="radio"
            name="gender"
            value="F"
            checked={employeeData.gender === 'F'}
            onChange={handleInputChange}
            style={{ marginLeft: '20px', marginRight: '5px' }}
          /> Female
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
    <label>Course</label>
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '8px' }}>
        <label style={{ marginBottom: '5px' }}>
            <input
                type="checkbox"
                name="course"
                value="MCA"
                checked={employeeData.course === 'MCA'}
                onChange={handleInputChange}
                style={{
                    marginRight: '8px',
                }}
            />
            MCA
        </label>
        <label style={{ marginBottom: '5px' }}>
            <input
                type="checkbox"
                name="course"
                value="BCA"
                checked={employeeData.course === 'BCA'}
                onChange={handleInputChange}
                style={{
                    marginRight: '8px',
                }}
            />
            BCA
        </label>
        <label style={{ marginBottom: '5px' }}>
            <input
                type="checkbox"
                name="course"
                value="BSC"
                checked={employeeData.course === 'BSC'}
                onChange={handleInputChange}
                style={{
                    marginRight: '8px',
                }}
            />
            BSC
        </label>
    </div>
</div>

      <div style={{ marginBottom: '15px' }}>
        <label>Image Upload</label>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          required
          style={{ 
            width: '100%', 
            padding: '10px', 
            marginTop: '5px', 
            borderRadius: '4px', 
            border: '1px solid #ccc' 
          }}
        />
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddEmployee;
