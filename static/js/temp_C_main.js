import '/static/assets/img1.png'

$( document ).ready(() => {

    let main_img = document.getElementById("tmpC_img") // img
    let main_div = document.getElementById("tmpC_main_div") // div

    let img_path_arr = ['/static/assets/img1.png', '/...']
    let text_arr

    setInterval(() => {
        let random = Math.floor(Math.random() * img_path_arr.length);

        main_img.src = img_path_arr[random].src;
        main_div.innerHTML = text_arr[random].text;
    }, 3000);

});
