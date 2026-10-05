function mover(id, direcao) {
    const trilho = document.getElementById(id);
  if (!trilho) return;

  const cards = Array.from(trilho.querySelectorAll('.card-item'));
  if (cards.length === 0) return;

  const indiceAtivo = cards.findIndex((card) => card.classList.contains('active'));
  if (indiceAtivo === -1) {
    cards[0].classList.add('active');
    return;
  }

  const novoIndice = direcao === 'next'
    ? (indiceAtivo < cards.length - 1 ? indiceAtivo + 1 : 0)
    : (indiceAtivo > 0 ? indiceAtivo - 1 : cards.length - 1);

  cards[indiceAtivo].classList.remove('active');
  cards[novoIndice].classList.add('active');
}

function moverDireita(id) { mover(id, 'next'); }
function moverEsquerda(id) { mover(id, 'prev'); }




/*  secao FAQ  */
const faqHoverDelay = 3000; 

function fecharTodosFaqs(excecaoDetalhe) {
  document.querySelectorAll('.faq-grid details').forEach((detalhe) => {
    if (detalhe !== excecaoDetalhe) {
      detalhe.open = false;
    }
  });
}

function inicializarFaqExpansao() {
  document.querySelectorAll('.faq-grid details').forEach((detalhe) => {
    const summary = detalhe.querySelector('summary');
    let hoverTimer = null;
    let closeTimer = null;

    const cancelarFechamento = () => {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
    };

    const iniciarFechamento = () => {
      if (closeTimer) {
        clearTimeout(closeTimer);
      }
      closeTimer = window.setTimeout(() => {
        detalhe.open = false;
      }, 2000); 
    };

    summary?.addEventListener('mouseenter', () => {
      hoverTimer = window.setTimeout(() => {
        fecharTodosFaqs(detalhe);
        detalhe.open = true;
      }, faqHoverDelay);
    });

    summary?.addEventListener('mouseleave', () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      }
    });

    detalhe.addEventListener('mouseenter', cancelarFechamento);
    detalhe.addEventListener('mouseleave', () => {
      if (detalhe.open) {
        iniciarFechamento();
      }
    });

    summary?.addEventListener('click', (evento) => {
      evento.preventDefault();
      const vaiAbrir = !detalhe.open;
      fecharTodosFaqs(detalhe);
      detalhe.open = vaiAbrir;
      if (vaiAbrir) {
        cancelarFechamento();
      }
    });
  });

  document.addEventListener('click', (evento) => {
    if (!evento.target.closest('.faq-grid details')) {
      fecharTodosFaqs(null);
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  inicializarFaqExpansao();
});


const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const scrollAtual = window.pageYOffset || document.documentElement.scrollTop;
  
  // Verifica se chegou no final do site (com uma margem de tolerância de 20 pixels)
  const chegouNoFim = (window.innerHeight + window.pageYOffset) >= (document.documentElement.scrollHeight - 20);

  // O menu SÓ APARECE se estiver estritamente no topo (<= 10px) OU no final do site
  if (scrollAtual <= 10 || chegouNoFim) {
    header.classList.remove('hidden');
  } 
  // Em qualquer outro lugar da página (seja rolando para cima ou para baixo), ele fica escondido
  else {
    header.classList.add('hidden');
  }
});