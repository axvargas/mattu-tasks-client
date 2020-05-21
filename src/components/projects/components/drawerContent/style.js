import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

}));

export default useStyles;