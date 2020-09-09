function C_click() {
    document.getElementById('H').style.animation='intro 1.3s cubic-bezier(0.0, 0.0, 0.58, 1.0) reverse forwards';
    document.getElementById('A').style.animation='intro 1.3s cubic-bezier(0.0, 0.0, 0.58, 1.0) reverse forwards';
    document.getElementById('T').style.animation='intro 1.3s cubic-bezier(0.0, 0.0, 0.58, 1.0) reverse forwards';
    document.getElementById('E').style.animation='intro 1.3s cubic-bezier(0.0, 0.0, 0.58, 1.0) reverse forwards'; 
    document.getElementById('R').style.animation='intro 1.3s cubic-bezier(0.0, 0.0, 0.58, 1.0) reverse forwards';
    document.getElementById('S').style.animation='intro 1.3s cubic-bezier(0.0, 0.0, 0.58, 1.0) reverse forwards';
    var cla = document.getElementsByClassName('logoLetter');
    for(var i in cla) {
        if(i!=0){
            cla[i].style.pointerEvents='none';
        }
    }
    // document.getElementById('C').style.animation='zoomIn 1.5s ease-in-out forwards'
}
