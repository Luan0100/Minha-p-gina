
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
