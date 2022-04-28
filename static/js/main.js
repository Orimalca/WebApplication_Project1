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
        "/templates/temp_A.html",
        ["text1", "text2", "text3", "text4"],
        ["images/img1.jpg", "images/img2.jpg"],
        {
            monday: {
                fromHour: '06:00',
                toHour: '12:00'
            },
            wednesday: {
                fromHour: '13:00',
                toHour: '20:00'
            }
        },

        "2022-04-01",
        "2022-04-31",
        3,
        {"1": true, "2":true}
    ),
    new Ad(
        "two",
        "/templates/temp_B.html",
        ["text1", "text2", "text3", "text4", "text5", "text6", "text7", "text8", "text9", "text10"],
        ["images/img1.jpg"],
        {
            tuesday: {
                fromHour: '10:00',
                toHour: '16:00'
            },
            wednesday: {
                fromHour: '10:00',
                toHour: '16:00'
            }
        },
        "2022-04-20",
        "2022-04-31",
        5,
        {"1": true, "3": true}
    ),
    new Ad(
        "three",
        "/templates/temp_C.html",
        [],
        [],
        {
            all: true,
            fromHour: '08:00',
            toHour: '22:00'
        },
        "2022-04-26",
        "2022-05-01",
        7,
        {"2": true, "3": true}
    ),
    new Ad(
        "four",
        "/templates/temp_A.html",
        ["text1", "text2"],
        [],
        {
            monday: {
                fromHour: '06:00',
                toHour: '12:00'
            }
        },
        "2022-04-27",
        "2022-04-28",
        4,
        {"1": true}
    ),
    new Ad(
        "five",
        "/templates/temp_B.html",
        ["text1", "text2", "text3", "text4", "text5", "text6", "text7"],
        ["images/img1.jpg", "images/img2.jpg"],
        {
            monday: {
                fromHour: '01:00',
                toHour: '23:00',
            }, tuesday: {
                fromHour: '01:00',
                toHour: '23:00',
            }, wednesday: {
                fromHour: '01:00',
                toHour: '23:00',
            }
        },

        "2022-04-27",
        "2022-04-30",
        6,
        {"3": true}
    ),
    new Ad(
        "six",
        "/templates/temp_B.html",
        ["text1", "text2", "text3", "text4", "text5", "text6", "text7"],
        ["images/img1.jpg", "images/img2.jpg"],
        {
            monday: {
                fromHour: '01:00',
                toHour: '23:00',
            }, tuesday: {
                fromHour: '01:00',
                toHour: '23:00',
            }, wednesday: {
                fromHour: '01:00',
                toHour: '23:00',
            }, thursday: {
                fromHour: '17:00',
                toHour: '20:43'
            }
        },

        "2022-04-27",
        "2022-04-30",
        6,
        {"3": true}
    )
];

//////////////////////////////////////////////
let applicableAds = new Array();
let timeout = 0;
let timeSet = timeout;
let adIndex = -1;
const iframe = document.getElementById('main_frame');

$( document ).ready(function() {
    
    timeout = setInterval(showAds,timeout);

});

function showAds() {
    console.log("change: " + timeSet);
    let date = new Date();
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
        if (ad.days.hasOwnProperty(nowDay_str) || ad.days.all == true) {
            const from_date = new Date(ad.fromDate);
            const to_date = new Date(ad.toDate);
            let currentTime = date.getHours() + ":" + date.getMinutes();

            if (from_date <= date && date <= to_date) {

                if (ad.days.all == true && ad.days.fromHour <= currentTime &&
                    currentTime <= ad.days.toHour) {
                    if (applicableAds.indexOf(ad) == -1) {
                        applicableAds.push(ad);
                    }
                } else if (ad.days.hasOwnProperty(nowDay_str) &&
                    ad.days[nowDay_str].fromHour <= currentTime &&
                    currentTime <= ad.days[nowDay_str].toHour){
                    if (applicableAds.indexOf(ad) == -1) {
                        applicableAds.push(ad);
                    }
                }
                else if (applicableAds.indexOf(ad) != -1) {
                    applicableAds.splice(applicableAds.indexOf(ad),1);
                }
            } else if (applicableAds.indexOf(ad) != -1) {
                applicableAds.splice(applicableAds.indexOf(ad),1);
            }
        }
    });

    clearInterval(timeout);
    if(applicableAds.length > 0){
        adIndex = (adIndex + 1) % applicableAds.length;
        //iframe.src = applicableAds[adIndex].templateUrl;
        $('#main_div').load(applicableAds[adIndex].templateUrl);
        timeSet = applicableAds[adIndex].timeDuration * 1000;
        timeout = setInterval(showAds,timeSet);
    } else {
        timeSet = 2000;
        timeout = setInterval(showAds,timeSet);
    }
}