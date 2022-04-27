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
        [],
        {
            all: true,
            fromHour: 8,
            toHour: 22
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
let date = new Date();
let applicableAds = new Array();
let timeout = 2000;
let timeSet = timeout;
let adIndex = -1;

$( document ).ready(function() {

    let date = new Date();

    console.log(date.getDay())
    console.log(date.getDay() in ads[0].days)

    timeout = setInterval(showAds,timeout)
    /*setInterval((handler,interval) => {


    }, timeout);*/

});

function showAds() {
    console.log("change: " + timeSet);
    let nowDay_num = date.getDay();
    let nowDay_str;

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
        if (nowDay_str in ad.days || ad.days.all == true) {
            const from_date = new Date(ad.fromDate);
            const to_date = new Date(ad.toDate);

            if ((from_date <= date && date <= to_date)) {
                if (ad.days.fromHour <= date.getHours()
                    && date.getHours() <= ad.days.toHour) {
                    if (!(ad in applicableAds)) {
                        applicableAds[applicableAds.length] = ad;
                    }
                } else if (ad in applicableAds) {
                    applicableAds.remove(ad);
                }
            } else if (ad in applicableAds) {
                applicableAds.remove(ad);
            }
        }
    });

    clearInterval(timeout);
    if(applicableAds.length > 0){
        adIndex = (adIndex + 1) % applicableAds.length;
        $('#main_div').load('/' + applicableAds[adIndex].templateUrl);
        timeSet = applicableAds[adIndex].timeDuration * 1000;
        timeout = setInterval(showAds,timeSet);
    } else {
        timeSet = 2000;
        timeout = setInterval(showAds,timeSet);
    }
}

        /*let nowDay_num = date.getDay();
        let nowDay_str;
        let nowHour = date.getHours();*/

        /*switch (nowDay_num) {
            case 0: nowDay_str = 'sunday'; break;
            case 1: nowDay_str = 'monday'; break;
            case 2: nowDay_str = 'tuesday'; break;
            case 3: nowDay_str = 'wednesday'; break;
            case 4: nowDay_str = 'thursday'; break;
            case 5: nowDay_str = 'friday'; break;
            case 6: nowDay_str = 'saturday'; break;
        }*/

        /*ads.forEach(ad => {
            const from_date = new Date(ad.fromDate);
            const to_date = new Date(ad.toDate);
            // emulating JavaScript forEach continue statement (same as continue)
            if (!(from_date <= date && date <= to_date)) return;

            let ad_days = ad.days;
            let ad_duration = ad.timeDuration * 1000;
            let day_found = false

            for (const [day, time] of Object.entries(ad.days)) {
                console.log(day+"\n")
                // console.log(hours+"\n")
                console.log(time.fromHour+"\n")

                if('all' in ad.days) {
                    console.log("abcdef");
                    console.log(day+':'+time)
                }
                /!*
                if (day == nowDay_str
                    && time.fromHour <= nowHour
                    && nowHour <= time.toHour
                ) {

                    $('#main_div').load('/' + ad.templateUrl)
                }
                *!/

            }*/


    /*    });
    }, 2000);*/


//});


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