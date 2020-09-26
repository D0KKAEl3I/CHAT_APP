function toNext(num){
    hideAnima(num);
}

function toBack(num){
    showAnima(num)
}

function hideAnima(num){   
    target = document.getElementById(`section${num}`)
    target.animate([ 
        {transform: 'translate(-3000px,0)'}
    ], {
        duration: 300,
        easing: "cubic-bezier(0.3, 0.6, 0.8, 1)",
        fill:"forwards"
    });
}  

function showAnima(num){   
    document.getElementById(`section${num}`).animate([ 
        {transform: 'translate(0px,0)'}
    ], {
        duration: 300,
        easing: "cubic-bezier(0.3, 0.6, 0.8, 1)",
        fill:"forwards"
    })
    console.log(1)
}
