import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from '../routes/Router';
import { SnackbarProvider } from 'notistack';

//Providers
import ProjectState from '../context/projects/state';
import TasksState from '../context/tasks/state';
import AuthState from '../context/auth/state';


//@material-ui imports 
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

//tokenAuth import
import tokenAuth from '../config/tokenAuth';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	success: { backgroundColor: '#3f51b5' },
	error: { backgroundColor: '#f50057' },
	warning: { backgroundColor: 'yellow' },
	info: { backgroundColor: 'blue' },
}));

// Check if we have a token
const token = localStorage.getItem('token');
if(token){
	tokenAuth(token);
}

const App = () => {
	const classes = useStyles();
	const notistackRef = React.createRef();
	const onCloseSnack = key => () => {
		notistackRef.current.closeSnackbar(key);
	}


	return (
		<BrowserRouter>
			<SnackbarProvider
				ref={notistackRef}
				maxSnack={5}
				action={(key) => (

					<IconButton onClick={onCloseSnack(key)} size="small">
						<CloseIcon size="small" />
					</IconButton>

				)}
				classes={{
					variantSuccess: classes.success,
					variantError: classes.error,
					variantWarning: classes.warning,
					variantInfo: classes.info,
				}}
			>
				<ProjectState>
	
						<TasksState>
							<AuthState>
								<Router />
							</AuthState>
						</TasksState>

				</ProjectState>
			</SnackbarProvider>
		</BrowserRouter >

	);
}

export default App;
