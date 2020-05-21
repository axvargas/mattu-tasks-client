import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    nested: {
        paddingLeft: theme.spacing(8)
    }
}));

export default useStyles;