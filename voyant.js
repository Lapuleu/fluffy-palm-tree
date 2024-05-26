window.addEventListener("load", function() {
    let html = document.getElementById("main-content");
    let voyant = `
        <div id="voyantContainer">
            <form id="voyantForm" onsubmit="updateIframe(event); return false;">
                <label for="searchQuery">Search for a word:</label>
                <input type="text" id="searchQuery" name="searchQuery" required>
                <button type="submit">Search</button>
            </form>
            <iframe id="voyantIframe"></iframe>
        </div>`;
    html.innerHTML = voyant + html.innerHTML;
});

function updateIframe(event) {
    event.preventDefault();  // Prevent form submission from refreshing the page
    const searchQuery = document.getElementById('searchQuery').value.trim();
    let corpusURL = '';
    const fileName = file;
    if (window.location.protocol === "file:") {
         // For local file execution
         const localPath = window.location.href.replace(/\/[^\/]*$/, '/');
        corpusURL = localPath + encodeURIComponent(fileName);
    } else {
        // For hosted environment
        const baseURL = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/');
        corpusURL = `${baseURL}${encodeURIComponent(fileName)}`;
   }
    const voyantURL = `https://voyant-tools.org/?corpus=${encodeURIComponent(corpusURL)}#/?query=${encodeURIComponent(searchQuery)}`;
    console.log(`Voyant URL: ${voyantURL}`); // Log the URL for debugging
    document.getElementById('voyantIframe').src = voyantURL;
    }
