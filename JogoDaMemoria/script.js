const cards = document.querySelectorAll('.card');
/*
function flipCard() {
    this.classList.toggle('flip')
    //this é o contexto, a carta que estamos acessando do momento
}

//cards.forEach é para percorrer e iterar toda a lista gerada ////no querySelector, para cada (card) adicionar um eventListener //e ativar a função flipCard
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
})
*/

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
    if(lockBoard) return; //se for verdadeiro retorna e nada acontece linha 49
    if(this === firstCard) return; //não retorna nada - para desabilitar duplo click

    this.classList.add('flip');
    
    if(!hasFlippedCard) { //para acionar quando o evento flipCard for acionado com o click
        hasFlippedCard = true; //se ele estiver falso se torna true porque viramos a primeira carta quando chamou a funcao flipCard
        firstCard = this; //o elemento clicado vai retornar exatamente o card
        return;
    }

    secondCard = this; //se não tiver a primeira carta virada, não vai entrar no if(!hasFlippedCard), então secondCard vai ser o this.
    hasFlippedCard = false; //para resetar
    checkForMath();
}

function checkForMath() { //para saber se as 2 cartas são iguais
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards(); //se for iguais desabilitar para n poder clicar
        return;
    }
    //else
    unflipCards();
}

function disableCards() { //para não poder virar se forem iguais
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() { //para desvirar as cartas se forem diferentes      myPromise
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard(); //lockBoard = false;
    }, 1500)
}

function resetBoard() { //desestruturação do array
    [hasFlippedCard, lockBoard] = [false, false]; //o segundo pega as propriedades do primeiro
    [firstCard, secondCard] = [null, null];
}

//a função suffle está dentro de outra função do tipo Immediatly Invoked Function;
(function shuffle() { 
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12); //Math.random vai sortear um valor de 0 a 11. Math.floor vai arredondar o valor sorteado para deixa-lo inteiro
        card.style.order = randomPosition; // order é a propriedade do CSS que ordena
    })
})();

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});