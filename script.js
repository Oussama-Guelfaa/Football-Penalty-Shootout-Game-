< !DOCTYPE html >
    <
    html lang = "en" >
    <
    head >
    <
    meta charset = "UTF-8" >
    <
    title > 3 D Football Penalty Shootout Game < /title> <
    link rel = "stylesheet"
href = "style.css" >
    <
    /head> <
    body >
    <!-- UI Overlay -->
    <
    div id = "ui" >
    <
    h1 > Penalty Shootout < /h1> <
    div id = "instructions" >
    <
    p > Move your mouse to aim. < /p> <
    p > Click and hold to set power, release to shoot. < /p> <
    /div> <
    div id = "scoreboard" >
    <
    span > Goals: < span id = "goals" > 0 < /span></span >
    <
    span > Misses: < span id = "misses" > 0 < /span></span >
    <
    /div> <
    div id = "message" > < /div> <
    /div>

<!-- Three.js Library -->
<
script src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" > < /script>
    <!-- GLTFLoader (Not used in this simplified version) -->
    <!-- <script src="libs/GLTFLoader.js"></script> -->
    <!-- Main JavaScript -->
    <
    script src = "main.js" > < /script> <
    /body> <
    /html>