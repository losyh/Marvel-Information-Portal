import img from './error.gif'
const ErrorMesage = () => {
    return (
        <img style={{ display: 'block',objectFit: 'contain', margin: "0 auto"}} src={img} alt="error"/>
    )
}

export default ErrorMesage