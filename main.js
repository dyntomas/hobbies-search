/*===============================
Fetch hobbies data file
===============================*/
async function hobbiesData() {
  // let gist = 'https://gist.githubusercontent.com/carlelieser/884584d06b2d9429f321ec192f6dc7b5/raw/0888b5449ecda4787001b74811e645d0a74b8132/hobbies.json'
  let res = await fetch('data/hobbies.json');
  return res.json();

}

/*===============================
Document ready event
===============================*/
document.addEventListener("DOMContentLoaded", async () => {
  let list = document.querySelector('#list'),
    input = document.querySelector('#search');

  await hobbiesData().then(hobbies => {
    hobbies.map(item => {
      let color = "#" + (Math.floor(Math.random() * 899999) + 100000)
      list.innerHTML += `<div class="list-item" style="background: ${color}"><a href="https://duckduckgo.com/?q=${item.title} hobbie">${item.title}</a></div>`;

    });

  });

  /*===============================
  Search box text changed event
  ===============================*/
  input.addEventListener('keyup', () => {
    let filter = input.value.toUpperCase(),
      box = document.querySelectorAll(".box");

    for (i = 0; i < box.length; i++) {
      a = box[i].querySelector("a");
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > 0) {
        box[i].hidden = false;
      } else {
        box[i].hidden = true;
      }
    }

  });

});