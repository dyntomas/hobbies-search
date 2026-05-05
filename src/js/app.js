function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function select(target) {
    return document.querySelector(target)
}

document.addEventListener("DOMContentLoaded", async () => {
   window.addEventListener("contextmenu", e => e.preventDefault());  

    /**
      * @type {string}
      */
    const config = require('../data/config.base64');
    const version = require("../../version.json")[0];
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
        return `https://duckduckgo.com/?q=${term.replaceAll(" ", "+")}+hobbie`
    }

    /***************************************/
    // * Page content
    /***************************************/
    shuffle(configjson).forEach((item, ind) => {
        let color = "#" + (Math.floor(899999 * Math.random()) + 1e5);
        /**
         * @type {HTMLElement}
         */
        const html = `<div class="box" style="background: ${color}" data-meta="${item. category};${item. subCategory}"><a href="${getUrl(item.title)}" target="_blank">${item.title}</a></div>`

        document.querySelector("#boxes").innerHTML += html
    })

    /***************************************/
    // * Search box
    /***************************************/
    const box = document.querySelectorAll(".box");

    search.addEventListener("keyup", () => {
        /**
         * @type {string}
         */
        let filter = search.value.toLowerCase()

        box.forEach(_box => {
            if (new RegExp(filter, "gi").test(_box.innerText) || new RegExp(filter, "gi").test(_box.dataset.meta)) {
                _box.style.display = "block"
            } else {
                _box.style.display = "none"
            }
        })
    })

        /***************************************/
    // * Infobox
    /***************************************/
    select("#version").innerText = version
    select("#sitename").innerText = document.querySelector("title").innerText

    /***************************************/
    // * Disable Right-click Image
    /***************************************/
document.addEventListener('contextmenu', (e) => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});
});