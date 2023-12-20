import { Component } from 'react/cjs/react.production.min';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMesage from '../errorMessage/errorMesage';

class CharList extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        char: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1550,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest()
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharLoaded)
            .catch(this.OnError)
    }

    onCharListLoading = () => {
        this.setState({newItemLoading: true})
    }

    onCharSelected = (id) => {
        this.props.onCharSelected(id)
    }
    onCharLoaded = (newChar) => {
        let ended = false
        if(newChar.length < 9) {
            ended = true
        }
        this.setState(({offset, char}) => ({
            char: [...char, ...newChar],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
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
            const {char, loading, error, onCharSelected, offset, newItemLoading, charEnded} = this.state
            const errorMesage = error ? <ErrorMesage/> : null
            const spinner = loading ? <Spinner/> : null
            const content = !(loading || error) ? <View char={char} charId={this.onCharSelected}/> : null
            return (
                <div className="char__list">
                    <ul className="char__grid">
                    {errorMesage}
                    {spinner}
                    {content}
                    </ul>
                    <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display' : charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                        <div className="inner">load more</div>
                    </button>
                </div>
            )
        }
    }


    const View = ({char, charId}) => {
        
        const charList = char.map((item) => {
            const objectFit = item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'unset'} : null
            return (
                <li className="char__item" key={item.id}
                onClick={()=> charId(item.id)}>
                <img src={item.thumbnail} alt={item.name} style={objectFit}/>
                <div className="char__name">{item.name}</div>
            </li>
            )
        })
        return charList
    }



export default CharList;