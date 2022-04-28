"use strict"



class Ad {
    constructor(name, templateUrl, texts, imagesUrl, days, fromDate, toDate, timeDuration, screens) {
        this.name = name
        this.templateUrl = templateUrl
        this.texts = texts
        this.imagesUrl = imagesUrl
        this.days = days
        this.fromDate = fromDate
        this.toDate = toDate
        this.timeDuration = timeDuration
        this.screens = screens
    }
}


let ads = [
    new Ad(
        "one",
        "templates/temp_A.html",
        ["text1", "text2", "text3", "text4"],
        ["images/img1.jpg", "images/img2.jpg"],
        {
            monday: {
                fromHour: 6,
                toHour: 12
            },
            wednesday: {
                fromHour: 13,
                toHour: 20
            }
        },

        "2022-04-01",
        "2022-04-31",
        3,
        {"1": true, "2":true}
    ),
    new Ad(
        "two",
        "templates/temp_B.html",
        ["text1", "text2", "text3", "text4", "text5", "text6", "text7", "text8", "text9", "text10"],
        ["images/img1.jpg"],
        {
            tuesday: {
                fromHour: 10,
                toHour: 16
            },
            wednesday: {
                fromHour: 10,
                toHour: 16
            }
        },
        "2022-04-20",
        "2022-04-31",
        5,
        {"1": true, "3": true}
    ),
    new Ad(
        "three",
        "templates/temp_C.html",
        [],
        ['/static/assets/img1.png', '/static/assets/img5.png'],
        {
            all: {
                fromHour: 8,
                toHour: 22
            }
        },
        "2022-04-26",
        "2022-05-01",
        7,
        {"2": true, "3": true}
    ),
    new Ad(
        "four",
        "templates/temp_A.html",
        ["text1", "text2"],
        [],
        {
            monday: {
                fromHour: 6,
                toHour: 12
            }
        },
        "2022-04-27",
        "2022-04-28",
        4,
        {"1": true}
    ),
    new Ad(
        "five",
        "templates/temp_B.html",
        ["text1", "text2", "text3", "text4", "text5", "text6", "text7"],
        ["images/img1.jpg", "images/img2.jpg"],
        {
              monday: {
                fromHour: 1,
                toHour: 23,
            }, tuesday: {
                fromHour: 1,
                toHour: 23,
            }, wednesday: {
                fromHour: 1,
                toHour: 23,
            }
        },

        "2022-04-27",
        "2022-04-31",
        6,
        {"3": true}
    )
];

//////////////////////////////////////////////

$( document ).ready(() => {
    let interval_id

    setInterval(() => {
        let date = new Date();
        let nowDay_num = date.getDay();
        let nowDay_str;
        let nowHour = date.getHours();

        switch (nowDay_num) {
            case 0: nowDay_str = 'sunday'; break;
            case 1: nowDay_str = 'monday'; break;
            case 2: nowDay_str = 'tuesday'; break;
            case 3: nowDay_str = 'wednesday'; break;
            case 4: nowDay_str = 'thursday'; break;
            case 5: nowDay_str = 'friday'; break;
            case 6: nowDay_str = 'saturday'; break;
        }

        ads.forEach(ad => {
            const from_date = new Date(ad.fromDate);
            const to_date = new Date(ad.toDate);
            if (!(from_date <= date && date <= to_date)) return; // emulating JavaScript forEach continue statement (same as continue)

            let ad_days = ad.days;
            let ad_duration = ad.timeDuration * 1000;
            let day_found = false

            for (const [day, time] of Object.entries(ad.days)) {
                if((day == 'all' || day == nowDay_str)
                    && (time.fromHour <= nowHour && nowHour <= time.toHour)
                ) {
                    $('#main_div').load('/' + ad.templateUrl, () => {
                        interval_id = setInterval(() => {
                            let random = Math.floor(Math.random() * ad.imagesUrl.length)
                            $('#tmp_img').attr("src", ad.imagesUrl[random])
                            //$('#tmp_img').src = ad.imagesUrl[random]
                        }, 2000);
                    });
                }



            }


        });
    }, 3000);


});


/*
if (w <=920 && w > 480){
      setInterval(() => {
        let random = Math.floor(Math.random() * 3);
        image.src = commercialsMedium[random].src;
        p.innerHTML = commercialsMedium[random].text;
        card.style = "width: 35rem; height: 35rem;"
      }, 2000);
    }
*/