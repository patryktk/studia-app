import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import HeaderComponent from './HeaderComponent.jsx'
import ErrorComponent from './ErrorComponent'
import AuthProvider, { useAuth } from '../security/AuthContext'
import LoginComponent from './LoginComponent.jsx'
import WelcomeComponent from './WelcomeCoponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import TodoComoponent from './TodoComponent.jsx'
import ListTodosComoponent from './ListTodoComponent.jsx'

function AuthenticatedRoute({children}) {
    const authContext = useAuth()
     if(authContext.isAuthenticated){
        return(children)
     }
     return <Navigate to="/"/>
   
}

export default function Todoapp(){


    
    return(
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent/>
                    <Routes>
                        <Route path='/' element={<LoginComponent/>}/>
                        <Route path='/login' element={<LoginComponent/>}/>

                        <Route path='/welcome/:username' element={<AuthenticatedRoute><WelcomeComponent/></AuthenticatedRoute>}/>
                        <Route path='/todos' element={<AuthenticatedRoute><ListTodosComoponent/></AuthenticatedRoute>}/>
                        <Route path='/todo/:id' element={<AuthenticatedRoute><TodoComoponent/></AuthenticatedRoute>}/>
                        <Route path='/logout' element={<AuthenticatedRoute><LogoutComponent/></AuthenticatedRoute>}/>

                        <Route path='*' element={<ErrorComponent/>}/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}