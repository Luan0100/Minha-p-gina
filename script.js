document.addEventListener("DOMContentLoaded", function() {

    // --- Parte 1: Variáveis para a Máquina de Escrever ---
    const bioElement = document.getElementById('info'); // MUDANÇA: Usar o #info para o IntersectionObserver
    const bioTextElement = document.createElement('p'); // Cria um novo <p> para o texto
    const bioText = "Salve negada, aqui quem vos fala é o Luan, Tenho 16 anos, Sou preto, Jogo truco pa carai, Moro com meus pais e com a minha irmã, Estudo no colégio Julio Szymanski e faço Desenvolvimento de Sistemas.";
    let charIndex = 0;
    const typingSpeed = 30; // 30ms
    let hasTyped = false; // Flag para não digitar de novo

    // Pega o <p> original do HTML para podermos inserir o novo antes dele
    const originalBioP = document.querySelector('#info p');
    if (originalBioP) {
        // Insere o novo <p> (que vai ser digitado) antes do <p> original
        bioElement.insertBefore(bioTextElement, originalBioP);
        // Oculta o <p> original que já tem o texto completo
        originalBioP.style.display = 'none'; 
    } else {
        // Se não achar o <p> original, apenas adiciona o novo
        bioElement.appendChild(bioTextElement);
    }

    // --- Função que faz a digitação ---
    function typeWriter() {
        if (charIndex < bioText.length) {
            bioTextElement.innerHTML += bioText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
    }

    // --- Parte 2: Animação de Entrada ao Rolar ---
    const sections = document.querySelectorAll('#info, #gallery, #social');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Ativa com 10% visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // ATIVAÇÃO: Iniciar a digitação quando #info aparecer
                if (entry.target.id === 'info' && !hasTyped) {
                    hasTyped = true;
                    typeWriter(); // Chama a função de digitação
                }

                observer.unobserve(entry.target); // Para de observar após animar
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('animate-on-scroll'); // Adiciona classe base
        observer.observe(section);
    });

    // --- Parte 3: Efeito de Hover nas Fotos da Galeria ---
    const galleryImages = document.querySelectorAll('.gallery-container img');

    galleryImages.forEach(img => {
        const growAnimation = img.animate(
            [
                { transform: 'scale(1)', filter: 'brightness(1)' },
                { transform: 'scale(1.05)', filter: 'brightness(1.1)' }
            ],
            {
                duration: 300,
                fill: 'forwards',
                easing: 'ease-out'
            }
        );
        growAnimation.pause(); // Pausa a animação

        img.addEventListener('mouseenter', () => {
            growAnimation.play();
            growAnimation.playbackRate = 1;
        });

        img.addEventListener('mouseleave', () => {
            if (growAnimation.playState === 'finished') {
                growAnimation.reverse();
            } else {
                growAnimation.playbackRate = -1;
                growAnimation.play();
            }
        });
    });

    // --- Parte 4: NOVA ANIMAÇÃO (Foto de Perfil Flutuante) ---
    const profilePic = document.querySelector('.profile-pic');
    
    if (profilePic) {
        profilePic.animate(
            [
                // Keyframes
                { transform: 'translateY(0px)' },
                { transform: 'translateY(-8px)' },
                { transform: 'translateY(0px)' }
            ],
            {
                // Opções
                duration: 3500, // Duração de 3.5 segundos
                iterations: Infinity, // Repete para sempre
                easing: 'ease-in-out' // Suaviza o início e o fim
            }
        );
    }

}); // Fim do 'DOMContentLoaded'