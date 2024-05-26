window.addEventListener("load", function() {
    let html = document.getElementById("main-content");
    let voyant = `
        <div id="voyantContainer">
            <iframe id="voyantIframe"></iframe>
        </div>`;
    html.innerHTML = voyant + html.innerHTML;
    updateIframe();
});
function updateIframe() {
    let voyantURL = `http://docs.voyant-tools.org/tool/Contexts/?corpus=4293bd8db1a531ab9b131bc720e1374e`;
    if (file==="English-Home.html"){
        voyantURL = `http://docs.voyant-tools.org/tool/Contexts/?corpus=4293bd8db1a531ab9b131bc720e1374e`;
    } else if (file==="English-Convo1.html"){
        voyantURL = `http://docs.voyant-tools.org/tool/Contexts/?corpus=f85e84f87f6c8bbdd9740c0915181b4e`;
    } else if (file==="English-Convo2.html"){
        voyantURL = `http://docs.voyant-tools.org/tool/Contexts/?corpus=617af5d82c590c986d6ed84d73082c7f`;
    } else if (file==="English-Convo3.html"){
        voyantURL = `http://docs.voyant-tools.org/tool/Contexts/?corpus=73c7edb47c19c288dab6fb993f374b01`;
    } else if (file==="English-Convo4.html"){
        voyantURL = `http://docs.voyant-tools.org/tool/Contexts/?corpus=b8caa63587bb441317e2962d5dacc64c`;
    }
    console.log(`Voyant URL: ${voyantURL}`); // Log the URL for debugging
    document.getElementById('voyantIframe').src = voyantURL;
}
