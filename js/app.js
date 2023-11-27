import days from "../data/data.js";

const $container = document.querySelector(".js-container");

function templateCard(day) {
    const card = document.createElement("div");
    const front = document.createElement("div");
    const back = document.createElement("div");


    card.classList = "card";
    front.classList = "card_content card_front";
    back.classList = "card_content card_back is-flipped";

    front.innerHTML = `December ${day}`;
    (day === 24) ? back.innerHTML = `<p>Ma van karácsony napja</p>` : back.innerHTML = `<p>Még ${24 - day} nap van karácsonyig!</p>`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", () => {
        front.classList.toggle('is-flipped');
        back.classList.toggle('is-flipped');
    })

    return card;
}

/* ============= */
const render = () => {

    for (let i = 1; i <= 24; i++) {
        const newCard = templateCard(i);

        $container.appendChild(newCard);
    }
}

render();
