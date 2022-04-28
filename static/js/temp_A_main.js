$( document ).ready(() => {
    setInterval(() => {
        let random = Math.floor(Math.random() * 3);
        image.src = commercialsMedium[random].src;
        p.innerHTML = commercialsMedium[random].text;
        card.style = "width: 35rem; height: 35rem;"

        }, 5000);

});
