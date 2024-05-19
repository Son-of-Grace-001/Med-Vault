import {Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Home} from './component/Home'
import {SignUpForm} from './Register/SignUpForm'
import { Login } from './Register/Login';
import { Dashboard } from './Dashboard/Dashboard';
import { Register } from './component/Register';
import {View } from './component/View';
import {RecordDetail} from './component/RecordDetail';
import {NewRecord} from './component/NewRecord';
import {Otp}  from './component/Otp'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUpForm/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/otp/:id' element={<Otp/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/record/:id" element={<View/>}/>
        <Route path="/detail/:id" element={<RecordDetail/>}/>
        <Route path="/newrecord/:patientId" element={<NewRecord/>} />
      </Routes>
    </div>
  );
}

export default App;
