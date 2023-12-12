import { Component } from 'react/cjs/react.production.min';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMesage from '../errorMessage/errorMesage';

class CharList extends Component {

    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar()
    }

    componentWillUnmount(){

    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }

    OnError = () => {
        this.setState({loading: false, error: true})
    }

    updateChar = () => {
        this.setState({loading: true})
        this.marvelService
        .getAllCharacters()
        .then(this.onCharLoaded)
        .catch(this.OnError)
    }


        render() {
            const {char, loading, error} = this.state
            const errorMesage = error ? <ErrorMesage/> : null
            const spinner = loading ? <Spinner/> : null
            const content = !(loading || error) ? <View char={char}/> : null
            return (
                <div className="char__list">
                    <ul className="char__grid">
                    {errorMesage}
                    {spinner}
                    {content}
                    </ul>
                    <button className="button button__main button__long">
                        <div className="inner">load more</div>
                    </button>
                </div>
            )
        }
    }


    const View = ({char}) => {

        const charList = char.map((item, index) => {
            return (
                <li className="char__item" key={index}>
                <img src={item.thumbnail} alt={item.name}/>
                <div className="char__name">{item.name}</div>
            </li>
            )
        })
        return charList
    }



export default CharList;