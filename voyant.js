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
    const voyantURL = "http://voyant-tools.org/tool/Contexts/?useReferer=true";
    console.log(`Voyant URL: ${voyantURL}`); // Log the URL for debugging
    document.getElementById('voyantIframe').src = voyantURL;
}
