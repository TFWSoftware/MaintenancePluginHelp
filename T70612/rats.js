"use strict";

var eRat;
var t1;
var t2;
var opacity = 0;
var upStep = 0.1;
var downStep = 0.2;
var showTime = 19;
var state = 0; // 0 = hidden, 1 = fading up, 2 = displaying, 3 = fading down
var delayCount = 0;

function animationTick()
{
    switch (state)
    {
        case 0:
            break;
        case 1:
            opacity += upStep;
            if (opacity >= 1.0)
            {
                opacity = 1;
                state = 2;
                delayCount = showTime;
            }
            break;
        case 2:
            if (--delayCount <= 0)
            {
                state = 3;
            }
            break;
        case 3:
            opacity -= downStep;
            if (opacity <= 0)
            {
                opacity = 0;
                state = 0;
                clearInterval(t2);
                t1 = setTimeout(showRat, Math.random() * 27000 + 3000);
            }
        break;
    }
    eRat.style.opacity = opacity;
}

function showRat()
{
    state = 1;
    t2 = setInterval(animationTick, 100);
}

function initRat()
{
    eRat = document.getElementById("rat");
    eRat.style.opacity = opacity = 0;
    t1 = setTimeout(showRat, 10000);
}
