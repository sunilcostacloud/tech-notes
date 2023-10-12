import { useNavigate, Link } from 'react-router-dom';
import { useSendLogoutMutation } from '../redux/features/auth/authApiSlice';
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Button } from "@mui/material";

const Home = () => {
    const navigate = useNavigate()
    const { username, roles } = useAuth();

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/login')
    }, [isSuccess, navigate])

    return (
        <div>
            <h1>Home</h1>
            <button onClick={sendLogout} disabled={isLoading}>{isLoading ? "Logging Out..." : "Logout"}</button>
            <div><Link to="/login">Login</Link></div>
            <div><Link to="/admin-page">admin</Link></div>
            <div><Link to="/manager-page">manager</Link></div>
            <div><Link to="/user-page">userPage</Link></div>
            <hr />
            <p>Current User: {username}</p>
            <Button onClick={() => navigate('/users')} color='primary' variant='contained' >
                Users Crud
            </Button>
            <hr />
            {isError && <p>Error: {error.data?.message}</p>}
            <hr />
            <h1>Text to show as per user role</h1>
            <h1>Admin: </h1>
            {roles.includes('Admin') && <h2>This is admin</h2>}
            <h1>Manager: </h1>
            {(roles.includes('Admin') || roles.includes('Manager')) && <h2>This is Manager</h2>}
            <h1>Only Manager: </h1>
            {(!roles.includes('Admin') && roles.includes('Manager')) && <h2>This is only Manager</h2>}
        </div>
    )
}

export default Home