import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    underline: {
        borderBottom: '1px solid grey',
        width: '115px',
        fontWeight: '500',
        fontSize: '0.875rem',
        color: 'rgba(0, 0, 0, 0.54)'
    }

}));
export default useStyles;