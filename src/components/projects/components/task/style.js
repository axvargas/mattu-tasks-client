import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    paper: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(2),
        elevation: 1,
        position: 'relative',
    },
    btn: {
        marginLeft: theme.spacing(1),
    },
    typo: {
        whiteSpace: 'pre-wrap',

    }

}));
export default useStyles;