window.addEventListener("load", function() {
    let html = document.getElementById("main-content");
    let voyant = `<iframe id="voyantIframe"></iframe>`;
    html.innerHTML = voyant+html.innerHTML;
    updateIframe();
});

function updateIframe() {
    // Define corpus URLs for different files
    const corpusMap = {
        "English-Home.html": "4293bd8db1a531ab9b131bc720e1374e",
        "English-Convo1.html": "f85e84f87f6c8bbdd9740c0915181b4e",
        "English-Convo2.html": "617af5d82c590c986d6ed84d73082c7f",
        "English-Convo3.html": "73c7edb47c19c288dab6fb993f374b01",
        "English-Convo4.html": "b8caa63587bb441317e2962d5dacc64c"
    };
    // Use the appropriate corpus ID based on the file
    const corpusID = corpusMap[file];
    let voyantURL = `https://voyant-tools.org/tool/Contexts/?corpus=${corpusID}`;
    console.log(`Voyant URL: ${voyantURL}`); // Log the URL for debugging
    document.getElementById('voyantIframe').src = voyantURL;
    //var body = document.body, html = document.documentElement;
    //var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    //document.getElementById('voyantContainer').style="margin-bottom:"+(-1*height)+";height:"+height+" !important;";
}
