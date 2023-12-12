document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("fallingElementsContainer");
    const customCursor = document.getElementById("customCursor");
    const counterElement = document.getElementById("counter");
    const timerElement = document.getElementById("timer");

    let counter = 0;
    let timer = 180; 

    for (let i = 0; i < 20; i++) {
        const element = document.createElement("div");
        element.className = "falling-element";
        element.style.left = `${Math.random() * 100}vw`; 
        element.style.animationDuration = `${Math.random() * 2 + 1}s`; 
        container.appendChild(element);
    }


    function updateTimer() {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        timerElement.innerText = `Tempo Restante: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (timer <= 0) {
           
            const elements = document.querySelectorAll('.falling-element');
            elements.forEach(element => {
                element.style.animation = "none";
            });

         
            const congratulationsElement = document.createElement("h1");
            congratulationsElement.innerText = "Parabéns!";
            congratulationsElement.style.position = "absolute";
            congratulationsElement.style.top = "50%";
            congratulationsElement.style.left = "50%";
            congratulationsElement.style.transform = "translate(-50%, -50%)";
            congratulationsElement.style.fontSize = "40px";
            congratulationsElement.style.fontWeight = "bold";
            congratulationsElement.style.color = "#00ff00";
            document.body.appendChild(congratulationsElement);
        } else {
            
            timer--;
            setTimeout(updateTimer, 1000);
        }
    }

    // Inicia o temporizador
    updateTimer();

    document.addEventListener("mousemove", function (e) {
        // Verifica se o cursor passa pela animação
        const cursorRect = customCursor.getBoundingClientRect();
        const elements = document.querySelectorAll('.falling-element');

        elements.forEach(element => {
            const elementRect = element.getBoundingClientRect();

            if (
                e.pageX >= elementRect.left &&
                e.pageX <= elementRect.right &&
                e.pageY >= elementRect.top &&
                e.pageY <= elementRect.bottom
            ) {
             
                customCursor.classList.add("shake");

          
                counter++;
                counterElement.innerText = `Contador: ${counter}`;

                
                if (counter === 100) {
                  
                    elements.forEach(element => {
                        element.style.animation = "none";
                    });

                   
                    const gameOverElement = document.createElement("h1");
                    gameOverElement.innerText = "Game Over";
                    gameOverElement.style.position = "absolute";
                    gameOverElement.style.top = "50%";
                    gameOverElement.style.left = "50%";
                    gameOverElement.style.transform = "translate(-50%, -50%)";
                    gameOverElement.style.fontSize = "40px";
                    gameOverElement.style.fontWeight = "bold";
                    gameOverElement.style.color = "#ff0000";
                    document.body.appendChild(gameOverElement);
                }
            } else {
                customCursor.classList.remove("shake");
            }
        });

       
        customCursor.style.left = e.pageX + "px";
        customCursor.style.top = e.pageY + "px";
    });
});
