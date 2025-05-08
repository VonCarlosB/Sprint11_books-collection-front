const getUsersBtn = document.getElementById('getUsersBtn')
const getBooksBtn = document.getElementById('getBooksBtn')
const informacion = document.getElementById('informacion')
const usersURL = 'http://localhost:3000/users'
const booksURL = 'http://localhost:3000/books'

const loader = document.createElement('div')
document.querySelector('body').appendChild(loader)
loader.classList.add('loader')
loader.innerText = 'LOADING...'

getUsersBtn.addEventListener('click', getUsers)
getBooksBtn.addEventListener('click', getBooks)

const userTemplate = (nombre, apellidos, correo, coleccion, wishlist) => {
    return `
        <li class="element">
            <h3>${nombre} ${apellidos}</h3>
            <p>Email: ${correo}</p>
            <ul class="lista"><b>Colección:</b>
                ${coleccion.map(book => `<li>${book}</li>`).join("")}
            </ul>
            <ul class="lista"><b>Wishlist:</b>
                ${wishlist.map(book => `<li>${book}</li>`).join("")}
            </ul>
        </li>
    `
}

const bookTemplate = (titulo, autor, fechaPublicacion, imagen) => {
    return `
        <li class="element">
            <h3>${titulo}</h3>
            <div><img src="${imagen}"></div>
            <p>Autor: ${autor}</p>
            <p>Fecha de publicación: ${fechaPublicacion}</p>
        </li>
    `
}

function getUsers() {
    informacion.innerHTML = ''
    loader.style.display = 'block'
    fetch(usersURL).then(response => response.json())
        .then(data => {
            data.forEach(element => {
                const {nombre, apellidos, correo, coleccion, wishlist} = element
                informacion.innerHTML += userTemplate(nombre, apellidos, correo, coleccion, wishlist)
            })
            loader.style.display = 'none'
        })
        .catch(error => {
            informacion.innerHTML = `Error en la obtención de usuarios`
            loader.style.display = 'none'
        })
}

function getBooks() {
    informacion.innerHTML = ''
    loader.style.display = 'block'
    fetch(booksURL).then(response => response.json())
        .then(data => {
            data.forEach(element => {
                const {titulo, autor, fechaPublicacion, imagen} = element
                informacion.innerHTML += bookTemplate(titulo, autor, fechaPublicacion, imagen)
            loader.style.display = 'none'
            })
        })
        .catch(error => {
            informacion.innerHTML = `Error en la obtención de libros`
            loader.style.display = 'none'
        })
}