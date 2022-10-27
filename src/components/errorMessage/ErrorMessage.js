import img from './error.gif';

const ErrorMessage = () => {
    return (
        <img 
        style={{display: "block", width: "250px", height: "250px", margin: "0 auto", objectFit: "contain"}} 
        src={img} 
        alt='error'/>
        //<img src={process.env.PUBLIC_URL + '/error.gif'} alt="error" />
    )
}

export default ErrorMessage;