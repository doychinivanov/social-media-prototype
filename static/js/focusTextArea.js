document.getElementById('post-body').addEventListener('click', resetCursor);

function resetCursor(ev) { 
    if (ev.target.setSelectionRange) { 
        ev.target.focus(); 
        ev.target.setSelectionRange(0, 0); 
    } else if (ev.target.createTextRange) { 
        var range = ev.target.createTextRange();  
        range.moveStart('character', 0); 
        range.select(); 
    } 
}