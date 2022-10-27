import {useHttp} from '../hooks/http.hooks';


const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=89ba4cb3e78a8cff10fb998524d28bea';
    const _baseOffset = 210;
    

    const getAllCharacters = async(offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async (offset = 0) => {
        const result = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return result.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const result = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(result.data.results[0]);
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available',
            homepage: comics.urls[0].url,
            pages: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            lang: comics.textObjects.language || 'en-us'
        }
    }
    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {loading, error, clearError, getCharacterByName, getAllCharacters, getCharacter, getAllComics, getComic}
}

export default useMarvelService;