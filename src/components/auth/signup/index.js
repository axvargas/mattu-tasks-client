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
    Typography,
    Container,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText,

} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// Component imports
import Copyright from '../../copyright';

// Style imports
import useStyles from './style';
import { useSnackbar } from 'notistack';

// Context imports
import AuthContext from '../../../context/auth/context';

const SignUp = ({ history }) => {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();

    // Extract context
    const authContext = useContext(AuthContext);
    const { signUpUser, msg, error, authentication, byeError, submit } = authContext;



    // Local States

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [form, setForm] = useState({
        first: '',
        last: '',
        email: '',
        password: '',
        password1: ''
    });
    const [errors, setErrors] = useState({
        first: false,
        last: false,
        email: false,
        password: false,
        password1: false
    });

    const [helpers, setHelpers] = useState({
        first: '',
        last: '',
        email: '',
        password: '',
        password1: ''
    });


    useEffect(() => {

        if (authentication) {
            enqueueSnackbar("Account created successfully",
                { variant: 'success', preventDuplicate: true });
            history.push('/projects')
        }
        if (error) {
            enqueueSnackbar(msg,
                { variant: 'error', preventDuplicate: true });
        }
        // eslint-disable-next-line 
    }, [submit, msg, authentication]);
    // Functions
    const handleChange = (prop) => (event) => {
        if (prop === 'email') {
            byeError();
        }
        if (prop === 'password' || prop === 'password1') {

            setErrors({
                ...errors,
                password: false,
                password1: false
            })
            setHelpers({
                ...helpers,
                password: '',
                password1: ''
            })
        } else {
            setErrors({
                ...errors,
                [prop]: false
            })
            setHelpers({
                ...helpers,
                [prop]: ''
            })
        }
        setForm({
            ...form,
            [prop]: event.target.value
        })


    };

    const handleClickShowPassword = (prop) => (event) => {
        event.preventDefault();
        switch (prop) {
            case 'password':
                setShowPassword(!showPassword);
                break;
            case 'password1':
                setShowPassword1(!showPassword1);
                break;
            default:
                break;
        }

    };


    const handleSubmit = (event) => {
        event.preventDefault();
        let [firstError, lastError, emailError, passwordError, password1Error] = [false, false, false, false, false];
        let [firstHelper, lastHelper, emailHelper, passwordHelper, password1Helper] = ['', '', '', '', ''];

        if (form.first.trim() === '') {
            [firstError, firstHelper] = [true, 'Type your first name'];
        }
        if (form.last.trim() === '') {
            [lastError, lastHelper] = [true, 'Type your last name'];

        }
        if (form.email.trim() === '') {
            [emailError, emailHelper] = [true, 'Type your email'];

        }
        if (form.password.length < 6) {
            [passwordError, passwordHelper] = [true, 'Password must be at least 6 characters'];
        }
        if (form.password.trim() === '') {
            [passwordError, passwordHelper] = [true, 'Type a password'];

        }
        if (form.password1.trim() === '') {
            [password1Error, password1Helper] = [true, 'Type a password'];
        }
        if (!passwordError) {
            if (form.password !== form.password1) {
                [passwordError, passwordHelper] = [true, 'Passwords must match'];
                [password1Error, password1Helper] = [true, 'Passwords must match'];
            }
        }

        if (firstError || lastError || emailError || passwordError || password1Error) {
            setErrors({
                first: firstError,
                last: lastError,
                email: emailError,
                password: passwordError,
                password1: password1Error
            })
            setHelpers({
                first: firstHelper,
                last: lastHelper,
                email: emailHelper,
                password: passwordHelper,
                password1: password1Helper
            })
            enqueueSnackbar("Check the form's fields",
                { variant: 'error', preventDuplicate: true });
            console.log('Stopped');

            return;
        }
        setErrors({
            first: false,
            last: false,
            email: false,
            password: false,
            password1: false
        })
        setHelpers({
            first: '',
            last: '',
            email: '',
            password: '',
            password1: ''
        })

        console.log("Submiting..")
        signUpUser({
            firstName: form.first,
            lastName: form.last,
            email: form.email,
            password: form.password
        })


    }


    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={handleChange('first')}
                                value={form.first}
                                error={errors.first}
                                helperText={helpers.first}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={handleChange('last')}
                                value={form.last}
                                error={errors.last}
                                helperText={helpers.last}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange('email')}
                                value={form.email}
                                error={error || errors.email}
                                helperText={msg || helpers.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
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
                                                onClick={handleClickShowPassword('password')}

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
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className={classes.txt} required fullWidth variant="outlined" error={errors.password1}>
                                <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
                                <OutlinedInput
                                    id="confirmation-password"
                                    type={showPassword1 ? 'text' : 'password'}
                                    value={form.password1}
                                    onChange={handleChange('password1')}
                                    autoComplete="current-password"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword('password1')}

                                                edge="end"
                                            >
                                                {showPassword1 ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={150}
                                />
                                <FormHelperText error={errors.password1}>{helpers.password1}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to='/sign-in' variant="body2" onClick={byeError}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>

    );
}
export default SignUp;