const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const personagens = [
    'buyeon',
    'choyeon',
    'dangu',
    'janguk',
    'mudeok',
    'naksu',
    'yul',
    'principe',
    'tartaruga',
    // 'jade',
    // 'reliquias',
];

const criarElemento = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let primeiroCard = '';
let segundoCard = '';

const checarFinal = () => {
    const cartasDesativadas = document.querySelectorAll('.desativar-card');

    if (cartasDesativadas.length === 18) {
        setTimeout(() => {
            alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`) //CRASE
            clearInterval(this.loop)
        }, 500)

    }
}

const checarCards = () => {
    const primeiroPersonagem = primeiroCard.getAttribute('info-personagem');

    const segundoPersonagem = segundoCard.getAttribute('info-personagem');

    if (primeiroPersonagem === segundoPersonagem) {
        primeiroCard.firstChild.classList.add('desativar-card');
        segundoCard.firstChild.classList.add('desativar-card');

        primeiroCard = '';
        segundoCard = '';


    } else {
        setTimeout(() => {
            console.log('errado');
            primeiroCard.classList.remove('revelar-card');
            segundoCard.classList.remove('revelar-card');

            primeiroCard = '';
            segundoCard = '';
        }, 500)
    }
    checarFinal();

}

const revelarCarta = ({
    target
}) => {
    if (target.parentNode.className.includes('revelar-card')) {
        return;
    }

    if (primeiroCard === '') {
        target.parentNode.classList.add('revelar-card');
        primeiroCard = target.parentNode;
    } else if (segundoCard === '') {
        target.parentNode.classList.add('revelar-card');
        segundoCard = target.parentNode;

        checarCards();
    }


}


const criarCarta = (personagem) => {
    const card = criarElemento('div', 'card');
    const front = criarElemento('div', 'face front');
    const back = criarElemento('div', 'face back');

    front.style.backgroundImage = `url('../imagens/${personagem}.png')` //CRASE 

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revelarCarta);
    card.setAttribute('info-personagem', personagem)


    return card;
}


const carregarJogo = () => {
    const duplicarPersonagens = [...personagens, ...personagens];

    const arrayEmbaralhado = duplicarPersonagens.sort(() => Math.random() - 0.5);


    arrayEmbaralhado.forEach((personagem) => {

        const card = criarCarta(personagem)
        grid.appendChild(card);
    })
}

const iniciarTimer = () => {
    this.loop = setInterval(() => {
        const tempoAtual = Number(timer.innerHTML);
        timer.innerHTML = tempoAtual +1;
    }, 1000);
}
window.onload = () => {

    const nomePlayer = localStorage.getItem('player');

    spanPlayer.innerHTML = nomePlayer;
    iniciarTimer();
    carregarJogo();
}