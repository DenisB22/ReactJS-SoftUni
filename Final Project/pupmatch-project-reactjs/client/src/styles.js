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
    imageContainer: {
        height: '400px',
        overflow: 'hidden',
        objectFit: 'cover',
    },
    loginLink: {
        textDecoration: 'none',
        color: 'white',
    },
    registerLink: {
        textDecoration: 'none',
        color: '#1976d2',
    },
    messagesLink: {
        textDecoration: 'none',
        color: '#1976d2',
    },
    createPostLink: {
        textDecoration: 'none',
        color: '#1976d2',
    },
    homeLink: {
        textDecoration: 'none',
        color: 'white',
    },
    homeLinkBlog: {
        textDecoration: 'none',
        color: '#5f92d8',
    },
    detailsLink: {
        textDecoration: 'none',
        color: '#1976d2',
    },
    editLink: {
        textDecoration: 'none',
        color: '#1976d2',
    },
    nameLogoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px'
    },
    cardContainer: {
        marginTop: "calc(((100vh - 64px) - 570px) / 2)",
        
    },
}));

export default useStyles;