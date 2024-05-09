document.addEventListener("DOMContentLoaded", function () {
    const nextButtons = document.querySelectorAll(".js-btn-next");
    const progressButtons = document.querySelectorAll(".multisteps-form__progress-btn");

    nextButtons.forEach(function (button, index) {
        button.addEventListener("click", function (event) {
            const currentPanel = this.closest(".multisteps-form__panel");
            const inputs = currentPanel.querySelectorAll("input, select, textarea");
            const select = currentPanel.querySelector(".multisteps-form__select");
            

            let isValid = true;
            inputs.forEach(function (input) {
                if (!input.checkValidity()) {
                    isValid = false;
                    input.classList.add("invalid-input"); // Agrega la clase de sombra roja
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Por favor diligencia todos los campos obligatorios.'
                    });                   
                } else {
                    input.classList.remove("invalid-input"); // Retira la clase de sombra roja                   
                }
            // Validar que la primera opción del select no esté seleccionada
                if (select && select.selectedIndex === 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Por favor diligencia todos los campos obligatorios.'
                    });
                    select.classList.add("invalid-input"); // Agrega la clase de sombra roja
                    event.preventDefault(); // Evita el avance al siguiente paso
                    return;
                } else {
                    select.classList.remove("invalid-input"); // Retira la clase de sombra roja
                }
            });
           
            //Validar si deberiamos pasar al siguiente form, revisando si existe la clase invalid-input
            const hasInvalidInput = currentPanel.querySelector(".invalid-input");
            
            if (hasInvalidInput) {
                event.preventDefault(); // Evita el avance al siguiente paso
                return;
            }else{
                const nextPanel = currentPanel.nextElementSibling;
                currentPanel.classList.remove("js-active");
                nextPanel.classList.add("js-active");
                // Agregar la clase js-active al botón correspondiente en la barra de progreso
            progressButtons[index + 1].classList.add("js-active");

            
            }
                       
        });
    });

    // Configuración de los botones "volver" con la clase .js-btn-prev
    const prevButtons = document.querySelectorAll(".js-btn-prev");
    prevButtons.forEach(function (button, index) {
        button.addEventListener("click", function (event) {
            const currentPanel = this.closest(".multisteps-form__panel");
            const prevPanel = currentPanel.previousElementSibling;
            if (prevPanel) {
                
                currentPanel.classList.remove("js-active");
                prevPanel.classList.add("js-active");
                progressButtons[index + 1].classList.remove("js-active");

                
            }
        });
    });


    const scriptURL = 'https://script.google.com/a/macros/mapleoiltools.com/s/AKfycbxbWap5Rn6PpKkXBvhp4y_bkl6jeuWE0OC7FMT6kZcL_AghJ2HA2axxSjQoqFTFXLda/exec'

    const form = document.forms['ideas-form']

    form.addEventListener('submit', e => {
        e.preventDefault()
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: 'Enviado',
                text: '¡Gracias! Tu formulario se ha enviado exitosamente.'
            }).then(() => {
                window.location.reload();
            });
        })
        .catch(error => console.error('Error!', error.message))
});

    

    
    


});