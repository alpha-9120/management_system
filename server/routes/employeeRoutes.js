import express from 'express';
import multer from 'multer';
import Employee from '../models/employee.js'; 
const router = express.Router();
const storage = multer.memoryStorage(); 
const upload = multer({ storage }); 


router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees); 
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee', error: error.message });
    }
});


router.post('/add-employee', upload.single('image'), async (req, res) => {
    try {
        const { name, email, mobileNo, designation, gender, course } = req.body;

       
        const newEmployee = new Employee({
            name,
            email,
            mobileNo,
            designation,
            gender,
            course,
            image: req.file.buffer, 
        });

       
        await newEmployee.save();

      
        res.status(201).json({ message: 'Employee added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding employee', error: error.message });
    }
});


router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, mobileNo, designation, gender, course } = req.body;

        
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            {
                name,
                email,
                mobileNo,
                designation,
                gender,
                course,
                image: req.file ? req.file.buffer : undefined, 
            },
            { new: true, omitUndefined: true } 
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee updated successfully', updatedEmployee });
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee', error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

   
        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error: error.message });
    }
});

export default router;
