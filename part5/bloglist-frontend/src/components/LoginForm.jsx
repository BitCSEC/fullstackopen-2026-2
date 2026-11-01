import { TextField, Button, Typography, Card, CardContent } from '@mui/material'

const LoginForm = ({ username, password, handlers }) => {
    const [handleLogin, setUsername, setPassword] = handlers
    return (
        <Card sx={{ marginTop: 5, mx: 'auto' }}>
        <CardContent>
            <Typography variant='h4' component='h2'>
                log in to to application
            </Typography>
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
        </CardContent>
        </Card>
    )
}

export default LoginForm
