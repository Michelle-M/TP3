//api key 8c01ff3efa9da0aa4d758a7173f6e1fc
//api request https://api.themoviedb.org/3/movie/550?api_key=8c01ff3efa9da0aa4d758a7173f6e1fc
//appi read acces token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzAxZmYzZWZhOWRhMGFhNGQ3NThhNzE3M2Y2ZTFmYyIsInN1YiI6IjVjZGZmYWRkYzNhMzY4NGI1NTFlYjM4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JFlOxuT8Hu5nGVH6dwx6NXOy4CcSo--c_dAwpv0p2KY
// categoria Popular
//`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
// categoría Top Rated
//`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
// categoría Upcoming
//`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`
// categoría Now Playing
//`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`

//BUSCADOR
const apiKey = '8c01ff3efa9da0aa4d758a7173f6e1fc';
const input = document.querySelector('#buscar-peli');
const paginaActual = 1;

input.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        console.log(event); //funciona el evento
        const peliBuscada = input.value;
        console.log(peliBuscada) //aparece el nombre
        const filtroUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${peliBuscada}&page=${paginaActual}`;
        console.log(filtroUrl) //funciona la api
        fetch(filtroUrl)
            .then( res => res.json() )
            .then( pelicula => {

                const peliculas = pelicula.results; //los datos estan dentro de la prop results
                console.log(peliculas) //trae el listado

                //llamo al contenido para que cambie la pagina
                const contenidoPpal = document.querySelector('#contenido-principal'); //probar llamar a .contenido + #contenido-principal
                //llamo a los otros contenidos para que no se muestren
                //BANNER
                const banner = document.querySelector('.imagen-ppal');
                banner.style.display = 'none';
                //LISTADO DEL HOME QUE SE ELIMINA
                const listadoPeliculas = document.getElementsByClassName('popular-movies');
                for ( let i = 0; i < listadoPeliculas.length; i++ ) {
                    //console.log(listadoPeliculas[i].id);
                    listadoPeliculas[i].style.display = 'none'
                }
                //CREO LO NUEVO
                const contenedorPelis = document.createElement('div'); //CONTENEDOR GENERAL
                contenedorPelis.classList.add('search')
                const contenedorTB = document.createElement('div'); //CONTENEDOR TITULO Y BOTON VIEW ALL
                contenedorTB.classList.add('superior');
                const tituloPagina = document.createElement('h2');
                tituloPagina.innerText = 'Search Results'; 
                tituloPagina.classList.add('titulo');
                const botonVerMas = document.createElement('button');
                botonVerMas.classList.add('ver-mas');
                const cantidadPelis = pelicula.total_results;
                botonVerMas.innerHTML = cantidadPelis;
                const contenedorUl = document.createElement('ul');
                contenedorUl.classList.add('pelis');
                //resultado
                const resultadoBusqueda = peliculas.map( function (peli) {
                    return `<li><img src='https://image.tmdb.org/t/p/original${peli.poster_path}'> 
                            <p>${peli.title}</p></li>`; //agrego ese url sino no funcionan las imagenes 
                })
                //creo el boton load more
                const contenedorLM = document.createElement('div');
                contenedorLM.classList.add('boton-cargar');
                const loadMore = document.createElement('button');
                loadMore.classList.add('load-more');
                loadMore.innerHTML = 'LOAD MORE';
                contenedorLM.appendChild(loadMore);
                //appendeo 
                contenedorTB.appendChild(tituloPagina);
                contenedorTB.appendChild(botonVerMas);
                contenedorPelis.appendChild(contenedorTB);
                contenedorPelis.appendChild(contenedorUl);
                contenedorUl.innerHTML = resultadoBusqueda.join('');
                contenedorPelis.appendChild(contenedorLM);
                contenidoPpal.appendChild(contenedorPelis);
            })
    }
});

//CATEGORIAS TIENEN QUE ESTAR YA CARGADAS
//HACER LA FUNCION CON TODAS LAS CATEGORIAS Y LLAMAR ABAJO PARA QUE CARGUE SOLA

function home (categoria) {
    const url = `https://api.themoviedb.org/3/movie/${categoria}?api_key=${apiKey}`;
    console.log(url);
    
    fetch(url)
        .then( res => res.json() )
        .then( peliculas => {

            const peliculasHome = peliculas.results.slice(0,5);
            console.log(peliculasHome);
            //llamo al contenido principal
            const contenidoPpal = document.querySelector('#contenido-principal');
            //creo lo nuevo
            const contenedorDiv = document.createElement('div');
            contenedorDiv.classList.add('popular-movies');
            //creo titulo y boton view all
            const contenedorTB = document.createElement('div');
            contenedorTB.classList.add('superior');
            const tituloCategoria = document.createElement('h2');
            tituloCategoria.classList.add('titulo');
            tituloCategoria.innerHTML = 'Popular Movies';
            //logica de los titulos
            if ( categoria == 'popular' ) {
                tituloCategoria.innerHTML = 'Popular Movies'
            } else if ( categoria == 'top_rated' ) {
                tituloCategoria.innerHTML = 'Top Rated Movies'
            } else if ( categoria == 'upcoming' ) {
                tituloCategoria.innerHTML = 'Upcoming Movies'
            } else if ( categoria == 'now_playing') {
                tituloCategoria.innerHTML = 'Now Playing Movies'
            }
            const botonViewAll = document.createElement('button');
            botonViewAll.classList.add('ver-mas');
            botonViewAll.innerText = 'View All ➜';
            //contenedor de pelis ul
            const contenedorUl = document.createElement('ul');
            contenedorUl.classList.add('pelis');

            const peliculasInicio = peliculasHome.map( function (peli) {
                return `<li><img src='https://image.tmdb.org/t/p/original${peli.poster_path}'> 
                        <p>${peli.title}</p></li>`
            })
            //al contenedor del titulo y boton les apendeo t y b
            contenedorTB.appendChild(tituloCategoria);
            contenedorTB.appendChild(botonViewAll);
            //al contenedor popular le apendeo el contenedor TB y el contenedor UL
            contenedorDiv.appendChild(contenedorTB);
            contenedorDiv.appendChild(contenedorUl);
            //agrego el contenedor popular al contenedor ppal
            contenidoPpal.appendChild(contenedorDiv);
            //pongo contenido al contenedorUL
            contenedorUl.innerHTML = peliculasInicio.join('');
        })

}

home('popular');
home('top_rated');
home('upcoming');
home('now_playing');









