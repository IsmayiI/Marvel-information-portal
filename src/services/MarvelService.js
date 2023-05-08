import { useHttp } from "../hooks/http.hook";


const useMarvelService = () => {
   const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
   const _apiKey = 'apikey=adf59916cfe1c275efa26f293f502304'
   const _baseOffset = 210

   const { loading, request, error, clearError, process, setProcess } = useHttp()

   const getAllCharacters = async (offset = _baseOffset) => {
      const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
      return res.data.results.map(_transformCharacter)
   }

   const getCharacter = async (id) => {
      const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
      return _transformCharacter(res.data.results[0])
   }

   const getName = async (name) => {
      const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
      return res.data.results.map(_transformCharacter);
   }


   const getAllComics = async (offset = 1) => {
      const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
      return res.data.results.map(_transformComics)
   }

   const getComic = async (id = 13) => {
      const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
      return _transformComics(res.data.results[0])
   }



   const _transformComics = (char) => {
      return {
         id: char.id,
         pages: char.pageCount,
         text: char.textObjects.length ? char.textObjects[0].text : 'There is no description for this character',
         language: char.textObjects.length ? char.textObjects[0].language : null,
         name: char.title,
         price: char.prices[0].price,
         thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`
      }
   }


   const _transformCharacter = (char) => {
      return {
         id: char.id,
         name: char.name,
         description: char.description.length ? `${char.description.slice(0, 154)}...` : "Description not available at the moment. We apologize to you. Go to Wiki.",
         thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
         homepage: char.urls[0].url,
         wiki: char.urls[1].url,
         comics: char.comics.items
      }
   }

   return { loading, error, process, setProcess, clearError, getAllCharacters, getCharacter, getAllComics, getComic, getName }
}

export default useMarvelService