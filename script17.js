let links = document.querySelectorAll("header a"), data = {};
links.forEach(link => {
    link.addEventListener("click", async function (event) {
        event.preventDefault();
        let href = this.href;
        if (!data[href]) {
            let page = await fetch(href);
            data[href] = await page.text();
            document.querySelector("#container").innerHTML = data[href];
           
        }
        else {
            document.querySelector("#container").innerHTML = data[href];
        }
         window.location.hash = this.getAttribute("data-hash");
    });
});

async function start() {
    let hash = window.location.hash;
    hash = hash.substr(1);
    if (!hash)
        hash = "main";
    let data = await fetch(`${hash}.html`);
    document.querySelector("#container").innerHTML = await data.text();
}
start();
window.addEventListener("hashchange", function () {
    validateHash();
    start();
});

const validHashes = ['main', 'about', 'photos'];
function validateHash() {
    const currentHash = window.location.hash.substring(1);
    if (!currentHash || !validHashes.includes(currentHash)) {
        window.location.hash = 'main';
    }
}
document.addEventListener('DOMContentLoaded', validateHash);

