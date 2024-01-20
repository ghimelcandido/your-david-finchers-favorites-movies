export class SearchMovies {
    static search(movieName){
        const endpoint = `https://www.omdbapi.com/?apikey=4e9a0931&t=${movieName}`

        return fetch(endpoint)
        .then(data => data.json())
        .then(({Poster, Title, Year, imdbRating}) => ({
            Poster,
            Title,
            Year,
            imdbRating,
        }))
    }
}