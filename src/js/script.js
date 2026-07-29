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


