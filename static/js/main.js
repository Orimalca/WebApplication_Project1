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
        "2022-05-23",
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
        "2022-05-25",
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


function dateValid(currentDate, ad_fromDate, ad_toDate) {
    if (!(ad_fromDate <= currentDate && currentDate <= ad_toDate)) return true;
}

function dayValid(currentDay, ad_day) { if(ad_day == 'all' || ad_day == currentDay) return true; }

function hoursValid(currentHour, ad_fromHour, ad_toHour) {
    if(ad_fromHour <= currentHour && currentHour <= ad_toHour) return true;
}


let adsStack = []


function showAdd(ad) {

}


$( document ).ready(() => {
    let interval_id


    setInterval(() => {
        let currentDate = new Date();
        let currentDay = currentDate.getDay();
        let currentHour = currentDate.getHours();

        switch (currentDay) {
            case 0: currentDay = 'sunday'; break;
            case 1: currentDay = 'monday'; break;
            case 2: currentDay = 'tuesday'; break;
            case 3: currentDay = 'wednesday'; break;
            case 4: currentDay = 'thursday'; break;
            case 5: currentDay = 'friday'; break;
            case 6: currentDay = 'saturday'; break;
        }

        ads.forEach(ad => {
            if(dateValid(currentDate, new Date(ad.fromDate), new Date(ad.toDate))) return; // emulating JavaScript forEach continue statement (same as continue)

            for (const [day, time] of Object.entries(ad.days)) {
                if(dayValid(currentDay, day)  && (hoursValid(currentHour, time.fromHour, time.toHour))) {
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


