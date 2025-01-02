const movieWatchlist = [
    { id: 1, title: "Parasite", genre: "Thriller", year: 2019, rating: 8.6, watched: true },
    { id: 2, title: "Spirited Away", genre: "Animation", year: 2001, rating: 8.6, watched: false },
    { id: 6, title: "Interstellar", genre: "Sci-Fi", year: 2014, rating: 8.6, watched: false },
    { id: 7, title: "Get Out", genre: "Horror", year: 2017, rating: 7.7, watched: true },
    { id: 8, title: "Coco", genre: "Animation", year: 2017, rating: 8.4, watched: true },
    { id: 9, title: "La La Land", genre: "Musical", year: 2016, rating: 8.0, watched: false },
    { id: 11, title: "Arrival", genre: "Sci-Fi", year: 2016, rating: 7.9, watched: false },
    { id: 12, title: "Whiplash", genre: "Drama", year: 2014, rating: 8.5, watched: true },
    { id: 13, title: "Her", genre: "Romance", year: 2013, rating: 8.0, watched: false },
];

let nextMovieId = 1;

const MovieGenre = {
    Action: "Action",
    Comedy: "Comedy",
    Drama: "Drama",
    Fantasy: "Fantasy",
    Horror: "Horror",
    Si_Fi: "Si-Fi",
    Thriller: "Thriller",
    Animation: "Animation"
}

function createMovie(title, genre, year, rating){
    return {
        id: nextMovieId++,
        title,
        genre,
        year,
        rating,
        watched: false
    };
};

function addMovie(title, genre, year, rating){
    const newMovie = createMovie(title, genre, year, rating);

    return movieWatchlist.push(newMovie);
}

function editMovie(id, newTitle, newGenre, newYear, newRating){
    const movie = movieWatchlist.find(movie => movie.id === id);

    if(!movie){
        console.log("Movie not found.");
        return;
    }

    movie.title = newTitle ?? movie.title;
    movie.genre = newGenre ?? movie.genre;
    movie.year = newYear ?? movie.year;
    movie.rating = newRating ?? movie.rating;
}

function toggleWatched(id){
    const movie = movieWatchlist.find(movie => movie.id === id);

    if(!movie){
        console.log("Movie not found.");
        return;
    }

    movie.watched = !movie.watched;

    return movie.watched;
}

function removeMovie(id){
    const movieIndex = movieWatchlist.findIndex(movie => movie.id === id);

    if(movieIndex !== -1){
        movieWatchlist.splice(movieIndex, 1);
    }
}

function findMovieByName(name){
    const movie = movieWatchlist.find(movie => movie.title.toLowerCase() === name.toLowerCase());

    if(!movie){
        console.log("Movie not found.");
        return;
    }

    printMovieDetails(movie);
    return movie;
}

function viewAllMovies(filter = "all", sortKey = "title"){
    const filteredMovies = filterMovies(filter);
    const sortedMovies = sortMovies(filteredMovies, sortKey);

    if(sortedMovies.length === 0){
        console.log("No movie found.");
        return;
    }

    console.log(`${filter} movies, sorted by ${sortKey}:`)
    for(let movie of sortedMovies){
        printMovieDetails(movie);
    }
}

function printMovieDetails(movie){
    if(!movie){
        console.log("No movie data.");
        return;
    }

    console.log(`Title: ${movie.title}, \nGenre: ${movie.genre}, \nYear: ${movie.year}, \nRating: ${movie.rating}, \nWatched: ${movie.watched}.`);
}

function filterMovies(filter){
    switch(filter){
        case "all": return movieWatchlist;
        case "watched": return movieWatchlist.filter(movie => movie.watched);
        case "unwatched": return movieWatchlist.filter(movie => !movie.watched);
        default: return [];
    }
}

function displayFilteredMovies(filter = "all"){
    const filteredMovies = filterMovies(filter);

    if(filteredMovies.length === 0){
        console.log("No movies found for this filter.");
        return;
    }

    console.log(`${filter} movies:`);
    filteredMovies.forEach(movie => printMovieDetails(movie));
}

function sortMovies(movies, key){
    switch(key){
        case 'title':
        case 'genre':
            return [...movies].sort((a, b) => a[key].localeCompare(b[key]));
        case 'year':
            return [...movies].sort((a, b) => a.year - b.year);
        case 'rating':
            return [...movies].sort((a, b) => b.rating - a.rating);
        default:
            return [];
    }
}

viewAllMovies("unwatched", "rating");