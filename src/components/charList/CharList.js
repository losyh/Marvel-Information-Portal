import { Component } from 'react/cjs/react.production.min';
import './charList.scss';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {

    state = {
        char: {}
    }
    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar()
    }

    componentWillUnmount(){

    }
    onCharLoaded = (char) => {
        this.setState({char})
    }

    updateChar = () => {
        this.marvelService
        .getAllCharacters()
        .then(this.onCharLoaded)
    }


        render() {
        const allChars = this.state.char
        const chars = allChars.map(item => {
            return (
                <li className="char__item">
                        <img src={item.thumbnail} alt={item.name}/>
                        <div className="char__name">{item.name}</div>
                    </li>
            )
        }) 
        console.log(this.state.char)
            return (
                <div className="char__list">
                    <ul className="char__grid">
                     {chars}
                    </ul>
                    <button className="button button__main button__long">
                        <div className="inner">load more</div>
                    </button>
                </div>
            )
        }
    }



export default CharList;