import { Component } from "react";
import ErrorMesage from "../errorMessage/errorMesage";
class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(err, errInfo) {
        console.log(err, errInfo);
        this.setState({error: true})
    }

    render() {
        if(this.state.error) {
            return <ErrorMesage/>
        }

        return this.props.children
    }
}

export default ErrorBoundary