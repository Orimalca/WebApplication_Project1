"use strict"

import * as ad from "../js/Ad"

const ad_1 = document.getElementById("commercial_1")
const ads_runningNow = []

function func () {
    let date = new Date()
    alert(date.toLocaleDateString() + '\n' + date.toLocaleTimeString())
}

document.onload = func()
