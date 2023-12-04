

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=138b2936cc7005e1831cd8801a375bb2'
        getResourse = async (url) => {
            let res = await fetch(url)

            if (!res.ok) {
                throw new Error(`Could not featch ${url}, status: ${res.status}`)
            }

            return await res.json();
        }

        getAllCharacters = () => {
            return this.getResourse(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
        }

        getCharacter = (id) => {
            return this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`)
        }
}

export default MarvelService