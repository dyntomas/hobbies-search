import { version } from '../../package.json';

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
  /***************************************/
  // * Functions
  /***************************************/
  function pageContent() {
    select("#boxes").innerHTML = ""

    shuffle(configjson).forEach((item, ind) => {
      let color = "#" + (Math.floor(899999 * Math.random()) + 1e5);
      /**
       * @type {HTMLElement}
       */
      const html = `<div class="box" style="background: ${color}" data-meta="${item.category};${item.subCategory}"><a href="${getUrl(item.title)}" target="_blank">${item.title}</a></div>`

      select("#boxes").innerHTML += html
    })
  }
    /**
   * 
   * @param {string} term 
   * @returns {string}
   */
  function getUrl(term) {
    return `https://duckduckgo.com/?q=${term.replaceAll(" ", "+")}+hobbie`
  }

  /**
    * @type {string}
    */
  const config = require('../data/config.base64');
  const ver = version;
  const search = select("#search")
  /**
   * @type {Array<Object>}
   */
  const configjson = JSON.parse(atob(config));

  /***************************************/
  // * Page content
  /***************************************/
  setTimeout(() => {
      select("#content").style.display = "block"
  }, 2000)

  pageContent()
  select("#btn1").addEventListener("click", () => {
    pageContent()
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
  select("#version").innerText = ver
  select("#sitename").innerText = select("title").innerText

  /***************************************/
  // * Disable Right-click Image
  /***************************************/
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });
});