function mover(id, direcao) {
    const trilho = document.getElementById(id);
    const cards = trilho.querySelectorAll('.card-item');
    let ativo = trilho.querySelector('.card-item.active');
    let index = Array.from(cards).indexOf(ativo);

    let novoIndex = direcao === 'next' 
        ? (index < cards.length - 1 ? index + 1 : 0)
        : (index > 0 ? index - 1 : cards.length - 1);

    cards[index].classList.remove('active');
    cards[novoIndex].classList.add('active');
}

function moverDireita(id) { mover(id, 'next'); }
function moverEsquerda(id) { mover(id, 'prev'); }