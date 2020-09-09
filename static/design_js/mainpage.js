toggle = true;
function clicking(char) {
    console.log(toggle)
    if(toggle){
        var letters = ['C', 'H', 'A', 'T', 'E', 'R', 'S'];
        for(var i in letters){
            if(letters[i] == char) {
                document.getElementById(letters[i]).disabled = true;
                continue;
            }
            dels=0.0
            document.getElementById(letters[i]).animate([
                {transform: 'translate(0, 3500px)'}
            ], {
                duration:1500,
                fill:"forwards"
            })
            // document.getElementById(letters[i]).style.animation=`intro 1.3s ${dels}s cubic-bezier(0.0, 0.0, 0.58, 1.0) reverse forwards`;
            dels += 0.1;
        }
        var tar = document.getElementById(char)
        var tarLeft = tar.getBoundingClientRect().left;
        var abLeft = window.pageXOffset + tarLeft
        // var wi = 
        var wi = (screen.width/2)-(document.getElementById(char).clientWidth*0.5)-abLeft
        console.log(wi)
        console.log(abLeft)
        document.getElementById(char).animate([
            {transform: `translate( ${wi}px, 0)`+" "+`scale(2.5, 2.5)`}
        ], {
            duration:600,
            easing:"cubic-bezier(0.0, 0.0, 0.3, 2)",
            delay:1600,
            fill:"forwards"
        })
        toggle = !toggle        
    } else {
        var letters = ['C', 'H', 'A', 'T', 'E', 'R', 'S'];
        for(var i in letters){
            if(letters[i] == char) {
                continue;
            } 
            // document.getElementById(letters[i]).style.animation='intro 1.3s cubic-bezier(0.0, 0.0, 0.58, 1.0) forwards';
            document.getElementById(letters[i]).animate([
                {transform: 'translate(0, 0)'}
            ], {
                duration:1500,
                fill:"forwards",
                easing:"cubic-bezier(0.0, 0.0, 0.58, 1.0)"
            })
        }
        toggle = !toggle;
    }
}
