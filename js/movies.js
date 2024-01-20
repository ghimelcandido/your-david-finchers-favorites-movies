import { SearchMovies } from "./favoritemovies.js"

export class Movies {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    load() {
        this.moviesEntries = JSON.parse(localStorage.getItem('@david-fincher-movies')) || []
    }

    save(){
        localStorage.setItem('@david-fincher-movies', JSON.stringify(this.moviesEntries))
    }

    async add(movieChosen) {
        try {
            const movie = await SearchMovies.search(movieChosen)

            if (movie.Title === undefined) {
                throw new Error('Try another movie')
            }

            this.moviesEntries = [movie, ...this.moviesEntries]
            this.update()
            this.save()

        } catch (error) {
            alert(error.message)
        }
    }

    delete(movie) {
        const filteredEntries = this.moviesEntries
            .filter(entry => entry.Title !== movie.Title)

        this.moviesEntries = filteredEntries
        this.update()
        this.save()
    }
}

export class FavoriteMovies extends Movies {
    constructor(root) {
        super(root)
        this.tbody = document.querySelector('table tbody')

        this.update()
        this.onadd()
    }

    onadd() {
        const buttonClick = this.root.querySelector('.search button')
        buttonClick.onclick = () => {
            const { value } = this.root.querySelector('.search input')
            
            this.add(value)
        } 
    }

    update() {
        this.removeStructure()

        this.moviesEntries
            .forEach((movie) => {
                const row = this.createRow()

                row.querySelector('.movieSelected img').src = movie.Poster
                row.querySelector('.movieSelected p').textContent = movie.Title
                row.querySelector('.imdbRating').textContent = movie.imdbRating
                row.querySelector('.movieYear').textContent = movie.Year

                row.querySelector('.buttonRemove').onclick = () => {
                    const isOk = confirm('Are you sure?')
                    if (isOk) {
                        this.delete(movie)
                    }
                }

                this.tbody.append(row)
            })

    }

    createRow() {
        const tr = document.createElement('tr')

        tr.innerHTML =
            `<td class="movieSelected">
        <img src="https://m.media-amazon.com/images/M/MV5BMTk0MDQ3MzAzOV5BMl5BanBnXkFtZTgwNzU1NzE3MjE@._V1_SX300.jpg"
        alt="poster">
        <p>Gone Girl</p>
        </td>
        <td class="imdbRating">8.1</td>
        <td class="movieYear">2014</td>
        <td class="buttonRemove"><button>Remove</button></td>`

        return tr
    }

    removeStructure() {
        this.tbody.querySelectorAll('tr')
            .forEach((movie) => {
                movie.remove()
            })
    }
}