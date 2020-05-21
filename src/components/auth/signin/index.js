import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

//@Material-UI imports
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid,
    Box,
    Container,
    Typography,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// Component imports
import Copyright from '../../copyright';

// Style imports
import useStyles from './style';

// Context imports
import AuthContext from '../../../context/auth/context';

//notistack
import { useSnackbar } from 'notistack';

const SignIn = ({ history }) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    // Local States

    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: false,
        password: false
    });

    const [helpers, setHelpers] = useState({
        email: '',
        password: ''
    });

    // Extract context
    const authContext = useContext(AuthContext);
    const { signInUser, authentication, msg, error, field, byeError, submit } = authContext;

    //EFFECT
    useEffect(() => {
        if(error){
            setErrors({
                ...errors,
                [field]: true
            });
            setHelpers({
                ...helpers,
                [field]: msg
            })
        }
        if (authentication) {
            enqueueSnackbar("Signed in",
                { variant: 'success', preventDuplicate: true });
            history.push('/projects')
        }
        if (error) {
            enqueueSnackbar(msg,
                { variant: 'error', preventDuplicate: true });
        }
        // eslint-disable-next-line 
    }, [submit, error, authentication, field]);

    // Functions
    const handleChange = (prop) => (event) => {
        setForm({
            ...form,
            [prop]: event.target.value
        })
        setErrors({
            ...errors,
            [prop]: false
        })
        setHelpers({
            ...helpers,
            [prop]: ''
        })
    };

    const handleClickShowPassword = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let [emailError, passwordError] = [false, false];
        let [emailHelper, passwordHelper] = ['', ''];

        if (form.email.trim() === '') {
            [emailError, emailHelper] = [true, 'Type your email'];
        }
        if (form.password.trim() === '') {
            [passwordError, passwordHelper] = [true, 'Type a password'];
        }
        if (emailError || passwordError) {
            setErrors({
                email: emailError,
                password: passwordError
            })
            setHelpers({
                email: emailHelper,
                password: passwordHelper
            })
            console.log('Stopped');

            enqueueSnackbar("Fill the form",
                { variant: 'error', preventDuplicate: true });
            return;
        }
        signInUser({
            email: form.email,
            password: form.password
        });
        
        console.log("Submiting..")


    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={form.email}
                        onChange={handleChange('email')}
                        error={errors.email}
                        helperText={helpers.email}
                    />

                    <FormControl className={classes.txt} required fullWidth variant="outlined" error={errors.password}>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={form.password}
                            onChange={handleChange('password')}
                            autoComplete="current-password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}

                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={85}
                        />
                        <FormHelperText error={errors.password}>{helpers.password}</FormHelperText>
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            {/* <Link href="#" variant="body2"> */}
                                Forgot password?
                            {/* </Link> */}
                        </Grid>
                        <Grid item>
                            <Link to='/sign-up' variant="body2" onClick={byeError}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
export default SignIn;