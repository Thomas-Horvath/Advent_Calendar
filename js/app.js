import data from "../data/data.js";





const $container = document.querySelector(".js-container");
const $btn = document.querySelector(".js-btn");


const date = new Date();
const today = date.getDate();

let days;

function saveToStorage() {
    localStorage.setItem("data", JSON.stringify(days));
}

function initialData() {
    const storageData = localStorage.getItem("data");
    const localData = JSON.parse(storageData);

    if (localData) {
        days = localData;
    } else {
        days = data;
    }
}


function templateCard(day) {
    const card = document.createElement("div");
    const front = document.createElement("div");
    const back = document.createElement("div");


    card.classList = "card";


    if (day.isFlipped) {
        front.classList = "card_content card_front is-flipped";
        back.classList = "card_content card_back ";
    } else {
        front.classList = "card_content card_front";
        back.classList = "card_content card_back is-flipped";
    }




    front.innerHTML = `December ${day.day}`;





    let message

    if (day.day === 24) {
        message = 'Ma van karácsony napja'
    } else {
        message = `Még ${24 - day.day} nap van karácsonyig!`
    }


    back.innerHTML = `
        <div class="card_header"> 
        <iframe 
            title = "youtube video player"
            src= ${day.link}
            frameborder="0"
            allowfullscreen="";
        >
        </iframe>
        </div>
        <div class="card_body">
        <p>${message} </p>
        </div>
        `
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", () => {
        if (day.day <= today && today < 24) {
            front.classList.add('is-flipped');
            back.classList.remove('is-flipped');

            days[day.day - 1].isFlipped = true;

            saveToStorage();
        } else if (today > 24) {
            alert("A játék December elsején kezdődik el!")
        } else {
            alert("Hooo hoooo hoooo! Ennek a dátumnak még nincs itt az ideje! Várj türelemmel!")
        }
    })

    return card;
}

/* ============= */
const render = () => {
    $container.innerHTML = '';

    for (let day of days) {
        const newCard = templateCard(day);

        $container.appendChild(newCard);
    }
}
$btn.addEventListener("click", () => {
    for (let day of days) {
        day.isFlipped = false;
    }

    localStorage.clear();

    render();
})

initialData();
render();
