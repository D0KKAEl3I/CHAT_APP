toggle = true;
function clicking(char) {
    var letters = ['c', 'h', 'a', 't', 'e', 'r', 's'];
    if(toggle){
        for(var i in letters){
            if(letters[i] == char) {
                continue;
            }
            var btn=document.getElementById(letters[i]);
            btn.animate([
                {transform: 'translate(0, 3500px)'}
            ], {
                duration:1500,
                fill:"forwards"
            })
        }

        var tar = document.getElementById(char)
        var tarLeft = tar.getBoundingClientRect().left;
        var abLeft = window.pageXOffset + tarLeft
        var wi = (screen.width/2)-(document.getElementById(char).clientWidth*0.5)-abLeft
        document.getElementById(char).animate([
            {transform: `translate( ${wi}px, 0)`+" "+`scale(2.5, 2.5)`}
        ], {
            duration:600,
            easing:"cubic-bezier(0.0, 0.0, 0.2, 1)",
            delay:600,
            fill:"forwards"
        })
        
        var h2 = tar.getElementsByClassName('text');
        for(var i in h2){
            console.log(i);
            // h2[i].animate([
            //     // {transform:}
            // ])
        }

        toggle = !toggle
    } else {
        var tar = document.getElementById(char)
        var tarLeft = tar.getBoundingClientRect().left;
        var abLeft = window.pageXOffset + tarLeft
        var wi = (screen.width/2)-(document.getElementById(char).clientWidth*0.5)-abLeft
        document.getElementById(char).animate([
            {transform: `translate( 0, 0)`+" "+`scale(1, 1)`}
        ], {
            duration:600,
            easing:"cubic-bezier(0.0, 0.0, 0.2, 1)",
            fill:"forwards"
        })
        
        for(var i in letters){
            if(letters[i] == char) {
                continue;
            }         
            var btn=document.getElementById(letters[i]);
            btn.animate([
                {transform: 'translate(0, 0)'}
            ], {
                duration:1500,
                fill:"forwards",
                easing:"cubic-bezier(0.0, 0.0, 0.2, 1.0)"
            })
            
        }
        toggle = !toggle;
    }
}
