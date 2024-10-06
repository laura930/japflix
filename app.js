document.addEventListener("DOMContentLoaded", function () {

const searchInput= document.querySelector("#inputBuscar");
const btn= document.querySelector("#btnBuscar");
let list= document.querySelector("#lista");
let searchValue;
let data;


 async function fecthApi(){
    const dataFetch = await fetch ("https://japceibal.github.io/japflix_api/movies-data.json");
    data = await dataFetch.json();
    console.log(data);
}

 fecthApi();
 
btn.addEventListener("click", function () {

 searchValue = searchInput.value.toLowerCase(); // le asigno a la variable el valor ingresado en el input, sin considerar mayusuclas.


 if ( searchValue.length > 0 ){ // condicion para que el contenido del input no este vacio.

// filtro la info del json segun el valor de busqueda y la guardo en listPelis.
    listPelis = data.filter( dato => 
        dato.title.toLowerCase().includes(searchValue)||
        JSON.stringify(dato.genres).toLowerCase().includes(searchValue)||
        dato.overview.toLowerCase().includes(searchValue)||
        dato.tagline.toLowerCase().includes(searchValue)
    );
    console.log(listPelis);

     // Limpiar la lista antes de agregar nuevos elementos
     list.innerHTML = "";

    listPelis.forEach(dato => {
        const peli= document.createElement("li"); // creo la li dentro de la "ul con id lista"
        peli.classList.add("list-group"); // agrega la clase que esta dentro del "list-group container"
        
        console.log(peli)
        
        peli.textContent= dato.title; // agrega titulo directamente al li
    
        let paragraph = document.createElement("p");
        paragraph.appendChild(document.createTextNode(`${dato.tagline}`)); //agrega titulo y tagline al parrafo
        peli.appendChild(paragraph) // agrega el parafo al li
        list.appendChild(peli) // agrega li a la lista

        // Crear el div para las estrellas
        const divStars = document.createElement('div');
        divStars.className = "divStars";
        peli.appendChild(divStars); // Agregar el div de estrellas al li

        // Calcular el número de estrellas basado en el voto promedio
        const votesPelis = Number(dato.vote_average);
        const percentage = (votesPelis / 10) * 100; // Convertir a porcentaje
        const outOfFive = Math.round((percentage / 100) * 5); // Convertir a estrellas de 0 a 5

        createStars(divStars, outOfFive); // Llamar a la función para crear las estrellas

      
        
});
}
});


function createStars(divStars, numStars) {
for (let i = 0; i < numStars; i++) {
    const spanStars = document.createElement('span');
    spanStars.className = 'fa fa-star checked'; // Estrella llena
    divStars.appendChild(spanStars);
}

// Agregar estrellas vacías si es necesario
for (let i = numStars; i < 5; i++) {
    const spanStars = document.createElement('span');
    spanStars.className = 'fa fa-star'; // Estrella vacía
    divStars.appendChild(spanStars);
}
}
});






  
