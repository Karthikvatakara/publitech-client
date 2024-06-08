
import Navbar from "./components/landPage/Navbar";
import LandPage from "./pages/landpage/LandPage";
import { BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { getUserData } from "./redux/actions/user/userActions";
import ApplyToTeach from "./pages/public/ApplyToTeach";
import ApplytoTeachForm from "./pages/public/ApplytoTeachForm";
import ApplySuccess from "./pages/public/ApplySuccess";
import AdminLandPage from "./pages/admin/AdminLandPage";

//auth
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AppState,RootState } from "./redux/store";

type RoleRoutes = {
  [key:string] : string;
}

interface RoleBasedRedirectProps {
  roles: RoleRoutes;
}

function App() {
  const { user } = useSelector((state:RootState) => state.user);
  const dispatch = useDispatch<AppState>();

  useEffect(() => {
    if(!user){
      dispatch(getUserData());      
    }
  },[dispatch,user])


  const RoleBasedRedirect: React.FC<RoleBasedRedirectProps> =({ roles }) => {
    const { user } = useSelector((state: RootState) => state.user);

    if(user && roles[user.role]) {
      return <Navigate to={roles[user.role]} replace/>
    }
    return <Navigate to="/publitech" replace/>
  }
 

  return (
    <>
    <Router>
        <Routes>
         {/* AUTH PAGES */}
            <Route path="/" element={ <RoleBasedRedirect roles={{admin:"/admin",instructor:"/instrucotr",student:"/publitech"}}/> }/>
            <Route path="/login" element={!user ? <Login/> : <Navigate to={"/publitech"}/>} />
            <Route path="/signup" element={!user ? <Signup/> : <Navigate to={"/publitech"} />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            {/* <Route path="/login" element={!user ? <Login /> : <Navigate to={'/userHome'} />} /> */}

          {/* GENERAL PAGES */}

            <Route path="/publitech" element={<LandPage/>} />
            <Route path="/apply" element={!user?<Login/>:<ApplyToTeach/>} />
            <Route path="/apply-to-teach" element={<ApplytoTeachForm/>} />
            <Route path="/apply-success" element={<ApplySuccess/>} />
            <Route path="/admin" element={<AdminLandPage/>}/>
        </Routes>
    </Router>
    </>
  )
}



export default App


