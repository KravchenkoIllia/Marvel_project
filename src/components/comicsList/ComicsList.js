import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true)
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if(newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewComicsLoading(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    }

    function renderComics(arr) {
        const items = arr.map((item) => {
            let imgStyle = {'objectFit': 'cover'};
            if(item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = {'objectFit': 'unset'};
            }

            return (
                <li className={'comics__item'}
                    key={item.id}
                    >
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img" style={imgStyle}/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const comics = renderComics(comicsList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newComicsLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {comics}
            <button 
                className="button button__main button__long"
                disabled={newComicsLoading}
                onClick={() => onRequest(offset)}
                style={{'display': comicsEnded ? 'none': 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

export default ComicsList;