const mediaType  = {
    movie:  'movie',
    tv:     'tv'
}

const mediaCategory = {
    popular: 'popular',
    top_rated: 'top_rated',
}

const backdropPath = (imgEndPoint) => `https://iamge.tmdb.org/t/p/original${imgEndPoint}`

const posterPath =  (imgEndPoint) => `https://iamge.tmdb.org/t/p/original/${imgEndPoint}`

const youtubePath = (videoId) => `https://ww.youtube.com/embed/${videoId}?controls=0`

const tmdbConfig = {
    mediaType,
    mediaCategory,
    backdropPath,
    posterPath,
    youtubePath,
}

export default tmdbConfig;