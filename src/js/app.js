document.addEventListener("DOMContentLoaded", async () => {
    /**
     * @type {string}
     */
    const config = require('../data/config.base64');

    const list = document.querySelector("#boxes")
    const search = document.querySelector("#search")
    /**
     * @type {Array<Object>}
     */
    const configjson = JSON.parse(atob(config));


    /***************************************/
    // * Page content
    /***************************************/
    /**
     * 
     * @param {string} term 
     * @returns {string}
     */
    function getUrl(term) {
        return `https://duckduckgo.com/?q=${term}+hobbie`
    }

    /***************************************/
    // * Page content
    /***************************************/
    configjson.forEach((item, ind) => {
        let color = "#" + (Math.floor(899999 * Math.random()) + 1e5);
        list.innerHTML += `<div class="box" style="background: ${color}" id="${ind}"><a href="${getUrl(item.name)}" target="_blank">${item.title}</a></div>`
    })
    const box = document.querySelectorAll(".box");

    /***************************************/
    // * Search box
    /***************************************/
    search.addEventListener("keyup", () => {
        /**
         * @type {string}
         */
        let filter = search.value.toLowerCase()

            box.forEach(_box => {
                if (_box.innerText.includes(filter) || _box.innerText.startsWith(filter)) {
                    _box.style.display = "block"
                } else {
                    _box.style.display = "none"
                }
            })
    })
});