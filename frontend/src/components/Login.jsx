import { useNavigate, Link } from 'react-router-dom'
import { useLoginMutation } from '../redux/features/auth/authApiSlice';
import { setCredentials } from '../redux/features/auth/authSlice';
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <Link to="/">Go to Home</Link>
            <hr />
            <div>
                {errMsg ? (<div>{errMsg}</div>) : ""}
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username"> Username
                        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} id="username" required />
                    </label>
                    <label htmlFor="password"> Password
                        <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} id="password" required />
                    </label>

                    <button type='submit' disabled={isLoading} >{isLoading ? <div>Loading ...</div> : "Login"}</button>
                </form>
            </div>
        </div>
    )
}

export default Login