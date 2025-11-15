document.addEventListener("DOMContentLoaded", function() {

    // --- Variáveis para a Máquina de Escrever ---
    const bioElement = document.getElementById('bio');
    // Certifica-se de que o elemento existe antes de continuar
    if (!bioElement) {
        console.error("Elemento com ID 'bio' não encontrado.");
        return; 
    }

    const bioText = "Salve negada, aqui quem vos fala é o Luan, Tenho 16 anos, Sou preto, Jogo truco pa carai, Moro com meus pais e com a minha irmã, Estudo no colégio Julio Szymanski e faço Desenvolvimento de Sistemas.";
    let charIndex = 0;
    const typingSpeed = 30; // 30ms
    let hasTyped = false; // Flag para não digitar de novo

    // --- Função que faz a digitação ---
    function typeWriter() {
        // Verifica se o índice ainda está dentro do texto
        if (charIndex < bioText.length) {
            bioElement.innerHTML += bioText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed); // Chama a si mesma para o próximo caractere
        }
    }

    // --- INICIAR A DIGITAÇÃO ---
    // Verifica se a digitação já aconteceu
    if (!hasTyped) {
        hasTyped = true; // Define a flag como verdadeira
        bioElement.innerHTML = ''; // Limpa o elemento caso haja algum conteúdo inicial
        typeWriter(); // Inicia o efeito de máquina de escrever
    }
});

    // --- Exemplo 1: Animação de Entrada ao Rolar (COM ATUALIZAÇÃO) ---

    // Seleciona todas as seções que queremos animar
    const sections = document.querySelectorAll('#info, #gallery, #social');

    // Configura o "Observador"
    const observerOptions = {
        root: null, // Observa a viewport (tela)
        rootMargin: '0px',
        threshold: 0.1 // Ativa quando 10% do elemento estiver visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Se o elemento entrou na tela (isIntersecting)
            if (entry.isIntersecting) {
                // Adiciona a classe que ativa a animação CSS
                entry.target.classList.add('is-visible');

                // --- ATUALIZAÇÃO: Iniciar a digitação ---
                // Se o elemento que apareceu é o #info E ainda não digitamos
                if (entry.target.id === 'info' && !hasTyped) {
                    hasTyped = true; // Marca como "já digitei"
                    typeWriter();    // Chama a função de digitação
                }
                // --- Fim da Atualização ---

                // Opcional: Para de observar o elemento depois que ele animou
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Coloca o Observador para "assistir" cada seção
    sections.forEach(section => {
        // Adiciona a classe de animação inicial a todas as seções
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // --- Exemplo 2: Efeito de Hover nas Fotos da Galeria ---

    const galleryImages = document.querySelectorAll('.gallery-container img');

    galleryImages.forEach(img => {

        // Define a animação de "crescer"
        const growAnimation = img.animate(
            [
                { transform: 'scale(1)', filter: 'brightness(1)' },
                { transform: 'scale(1.05)', filter: 'brightness(1.1)' }
            ],
            {
                duration: 300, // 300ms de duração
                fill: 'forwards', // Mantém o estado final
                easing: 'ease-out'
            }
        );
        // Pausa a animação imediatamente
        growAnimation.pause();

        // Toca a animação quando o mouse entra
        img.addEventListener('mouseenter', () => {
            growAnimation.play();
            growAnimation.playbackRate = 1; // Direção: normal
        });

        // Reverte a animação quando o mouse sai
        img.addEventListener('mouseleave', () => {
            // Se já estiver tocando, reverte, senão, toca ao contrário
            if (growAnimation.playState === 'finished') {
                growAnimation.reverse();
            } else {
                growAnimation.playbackRate = -1; // Direção: reversa
                growAnimation.play();
            }
        });
    });

});