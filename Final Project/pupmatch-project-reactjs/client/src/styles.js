import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    imageLogo: {
        borderRadius: '100%',
        width: '150px',
        height: '150px',
        marginRight: '10px',
        marginTop: '10px',
        marginBottom: '10px',
    },
    loginLink: {
        textDecoration: 'none',
        color: 'white',
    },
    registerLink: {
        textDecoration: 'none',
        color: '#1976d2',
    },
    homeLink: {
        textDecoration: 'none',
        color: 'white',
    }
}));

export default useStyles;