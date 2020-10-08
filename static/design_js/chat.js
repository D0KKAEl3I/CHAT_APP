$(document).on('click', '#showRoomTab', function(){
    $('#roomTabBG').css('display','block')
})

$(document).on('click', '#close', function (){
    $('#roomTabBG').css('display','none')
})

$(document).on('click', '#toMake', function(){
    document.getElementById('makingTab').animate([
        {transform:'translate(-600px,0)'}
    ],{
        duration:400,
        easing:'cubic-bezier(0, 0.7, 0.7, 1)',
        fill:'forwards'
    })
    document.getElementById('close').animate([
        {transform:'translate(-530px,0)'}
    ],{
        duration:400,
        easing:'cubic-bezier(0, 0.7, 0.7, 1)',
        fill:'forwards'
    })
    var buttons = document.getElementsByClassName('toButton')
    for(var i = 0; i < 2; i++){
        buttons[i].animate([
            {transform:'translate(-600px,0)'}
        ],{
            duration:400,
            easing:'cubic-bezier(0, 0.7, 0.7, 1)',
            fill:'forwards'
        })
    }
})

$(document).on('click', '#toJoin', function(){
    document.getElementById('joinTab').animate([
        {transform:'translate(-600px,0)'}
    ],{
        duration:400,
        easing:'cubic-bezier(0, 0.7, 0.7, 1)',
        fill:'forwards'
    })
    document.getElementById('close').animate([
        {transform:'translate(-530px,0)'}
    ],{
        duration:400,
        easing:'cubic-bezier(0, 0.7, 0.7, 1)',
        fill:'forwards'
    })
    var buttons = document.getElementsByClassName('toButton')
    for(var i = 0; i < 2; i++){
        buttons[i].animate([
            {transform:'translate(-600px,0)'}
        ],{
            duration:400,
            easing:'cubic-bezier(0, 0.7, 0.7, 1)',
            fill:'forwards'
        })
    }
})

$(document).on('click', '#returnMK' , function() {
    document.getElementById('makingTab').animate([
        {transform:'translate(0,0)'}
    ],{
        duration:400,
        easing:'cubic-bezier(0, 0.7, 0.7, 1)',
        fill:'forwards'
    })
    document.getElementById('close').animate([
        {transform:'translate(0,0)'}
    ],{
        duration:400,
        easing:'cubic-bezier(0, 0.7, 0.7, 1)',
        fill:'forwards'
    })
    var buttons = document.getElementsByClassName('toButton')
    for(var i = 0; i < 2; i++){
        buttons[i].animate([
            {transform:'translate(0,0)'}
        ],{
            duration:400,
            easing:'cubic-bezier(0, 0.7, 0.7, 1)',
            fill:'forwards'
        })
    }
})

$(document).on('click', '#returnJN' , function() {
    document.getElementById('joinTab').animate([
        {transform:'translate(0,0)'}
    ],{
        duration:400,
        easing:'cubic-bezier(0, 0.7, 0.7, 1)',
        fill:'forwards'
    })
    document.getElementById('close').animate([
        {transform:'translate(0,0)'}
    ],{
        duration:400,
        easing:'cubic-bezier(0, 0.7, 0.7, 1)',
        fill:'forwards'
    })
    var buttons = document.getElementsByClassName('toButton')
    for(var i = 0; i < 2; i++){
        buttons[i].animate([
            {transform:'translate(0,0)'}
        ],{
            duration:400,
            easing:'cubic-bezier(0, 0.7, 0.7, 1)',
            fill:'forwards'
        })
    }
})