
window.setInterval(() => {
    const heading = document.querySelector("h1");
    heading.style.color  = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
    if(heading.style.visibility == "hidden")
        heading.style.visibility = "visible";
    else
        heading.style.visibility = "hidden";
    
},500);