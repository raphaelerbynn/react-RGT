import { Navigate, useRoutes } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import { useContext } from 'react';
import { AuthContext, getAuthToken } from './utils/auth';
import PageNotFound from './components/PageNotFound';
import PostForm from './components/PostForm';

function App() {
  const {isAuthenticated} = useContext(AuthContext);

  // console.log(isAuthenticated);
  // console.log(getAuthToken());

  let element = useRoutes([
    {
      path: "/",
      element: <LoginForm />
    },
    {
      path: "/login",
      element: <LoginForm />
    },
    {
      path: "/dashboard",
      element: <Dashboard />
    },
    {
      path: "/post",
      element: isAuthenticated ? <PostForm /> : <Navigate to="/login" replace={true} />
    },
    {
      path: "*",
      element: <PageNotFound />
    }
  ]);

  // return (
  //   <BrowserRouter>
  //       <Routes>
  //         <Route path='/' Component={Navigation} />
  //         <Route path='/login' Component={LoginForm} />
  //         <Route path='/signup' Component={LoginForm} />
  //         {/* <Route path='/dashboard' element={() => loader} /> */}
  //         <ProtectedRoute path="/dashboard" component={Dashboard}/>
          
  //       </Routes>
  //   </BrowserRouter>
  // );
  return element;
}

export default App;
