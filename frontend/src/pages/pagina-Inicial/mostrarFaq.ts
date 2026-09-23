// Pegando os ids dos objetos que vai fazer aparecer com o click
const Mostrarfaq1 = document.getElementById('mostrar-resposta-1') as HTMLSpanElement;

const Mostrarfaq2 = document.getElementById('mostrar-resposta-2') as HTMLSpanElement;

const Mostrarfaq3 = document.getElementById('mostrar-resposta-3') as HTMLSpanElement;

const Mostrarfaq4 = document.getElementById('mostrar-resposta-4') as HTMLSpanElement;

const Mostrarfaq5 = document.getElementById('mostrar-resposta-5') as HTMLSpanElement;


// Objetos que irao aparecer
const faq1 = document.getElementById("resposta-feq-1") as HTMLSpanElement;

const faq2 = document.getElementById("resposta-feq-2") as HTMLSpanElement;

const faq3 = document.getElementById("resposta-feq-3") as HTMLSpanElement;

const faq4 = document.getElementById("resposta-feq-4") as HTMLSpanElement;

const faq5 = document.getElementById("resposta-feq-5") as HTMLSpanElement;

Mostrarfaq1.addEventListener( 'click', () => {

    if (faq1.style.display === "none" || faq1.style.display === "") {
        Mostrarfaq1.innerText = "remove"
        faq1.style.display = "block"
    }else {
        Mostrarfaq1.innerText = "add"
        faq1.style.display = "none"
    }
})

// 
Mostrarfaq2.addEventListener( 'click', () => {

    if (faq2.style.display === "none" || faq2.style.display === "") {
        Mostrarfaq2.innerText = "remove"
        faq2.style.display = "block"
    }else {
        Mostrarfaq2.innerText = "add"
        faq2.style.display = "none"
    }
})

// 
Mostrarfaq3.addEventListener( 'click', () => {

    if (faq3.style.display === "none" || faq3.style.display === "") {
        Mostrarfaq3.innerText = "remove"
        faq3.style.display = "block"
    }else {
        Mostrarfaq3.innerText = "add"
        faq3.style.display = "none"
    }
})

Mostrarfaq4.addEventListener( 'click', () => {

    if (faq4.style.display === "none" || faq4.style.display === "") {
        Mostrarfaq4.innerText = "remove"
        faq4.style.display = "block"
    }else {
        Mostrarfaq4.innerText = "add"
        faq4.style.display = "none"
    }
})


Mostrarfaq5.addEventListener( 'click', () => {

    if (faq5.style.display === "none" || faq5.style.display === "") {
        Mostrarfaq5.innerText = "remove"
        faq5.style.display = "block"
    }else {
        Mostrarfaq5.innerText = "add"
        faq5.style.display = "none"
    }
})