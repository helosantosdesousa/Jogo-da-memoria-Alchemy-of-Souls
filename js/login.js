const input = document.querySelector('.login-input');
const button = document.querySelector('.login-button');
const form = document.querySelector('.login-form')

const validarInput = (event) =>{
    if (event.target.value.length > 1){
        button.removeAttribute('disabled');
    } else{
        button.setAttribute('disabled', '');
    }
}
const salvarNome = (event) =>{
    event.preventDefault(); //impedir q recarregue a pagina
    localStorage.setItem('player', input.value);
    window.location = 'pages/game.html';
}


input.addEventListener('input', validarInput);
form.addEventListener('submit', salvarNome);
