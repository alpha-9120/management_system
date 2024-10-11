import {BrowserRouter, Routes,Route,Navigate} from 'react-router-dom';
import Login from "./pages/Login";
import AdminDashboard from './pages/AdminDashboard';
import EmplayeeDashboard from './pages/EmplayeeDashboard';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';


function App() {
  

  return (
   
     <BrowserRouter>
     <Routes>

      <Route path="/" element= {<Navigate to = "/Login" />}> </Route>
      <Route path="login" element= {<Login />}> </Route>
      <Route path="admin-dashboard" element= {<AdminDashboard />}> </Route>
      <Route path="employee-dashboard" element= {<EmplayeeDashboard />}> </Route>
      <Route path="add-employee" element={<AddEmployee />} />
      <Route path="/edit-employee/:id" element={<EditEmployee />} />


     </Routes>
    </BrowserRouter>
    
  )
}

export default App;
