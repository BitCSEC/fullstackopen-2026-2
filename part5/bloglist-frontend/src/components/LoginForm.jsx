import { TextField, Button } from '@mui/material'

const LoginForm = ({ username, password, handlers }) => {
    const [handleLogin, setUsername, setPassword] = handlers
    return (
        <div>
            <h2>log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <TextField
                        label='username'
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <TextField
                        label='password'
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <div>
                    <Button type='submit' variant='contained' style={{ marginTop: 10 }}>login</Button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
