let words = [
	{
		ru: 'russian text 1',
		en: 'english text 1',
		ph: 'phonetics 1',
	},
	{
		ru: 'russian text 2',
		en: 'english text 2',
		ph: 'phonetics 2',
	},
	{
		ru: 'russian text 3',
		en: 'english text 3',
		ph: 'phonetics 3',
	},
];

let position = 0;

let cards = {
    getDOM: () => {
        let cards = {
            ru: document.getElementsByClassName('content__ru')[0],
            en: document.getElementsByClassName('content__en')[0],
            ph: document.getElementsByClassName('content__ph')[0],
        }
        return cards;
    },
    setContent: (ru, en, ph) => {
    	let fields = cards.getDOM();

    	fields.ru.innerHTML = ru;
    	fields.en.innerHTML = en;
    	fields.ph.innerHTML = ph;
    },
    stateAsk: () => {
    	let fields = cards.getDOM();

    	// fields.ru.classList.add('hide');
    	fields.en.classList.add('hide');
    	fields.ph.classList.add('hide');
    },
    stateAnswer: () => {
    	let fields = cards.getDOM();

    	// fields.ru.classList.remove('hide');
    	fields.en.classList.remove('hide');
    	fields.ph.classList.remove('hide');
    },
    stateToggle: () => {
    	let fields = cards.getDOM();

    	// fields.ru.classList.toggle('hide');
    	fields.en.classList.toggle('hide');
    	fields.ph.classList.toggle('hide');
    },
}


let slide = {
	current: () => {
		if (words[position]) {
			return words[position];
		}
		return null;
	},
	prev: () => {
		if (words[--position]) {
			return words[position];
		} else {
			position = words.length - 1;
			return words[position];
		}
		return null;
	},
	next: () => {
		if (words[++position]) {
			return words[position];
		} else {
			// Тасуем массив
			words = randomise(words);
			position = 0;
			return words[position];
		}
		return null;
	},
}

// Загрузка страницы
let word = slide.current();
cards.setContent(word.ru, word.en, word.ph);
cards.stateAsk();

// Листаем назад
document.getElementById('prev').onclick = function() {
	let word = slide.prev();
	cards.setContent(word.ru, word.en, word.ph);
	cards.stateAsk();
}

// Листаем вперед
document.getElementById('next').onclick = function() {
	let word = slide.next();
	cards.setContent(word.ru, word.en, word.ph);
	cards.stateAsk();
}

// Смотрим ответ
document.getElementById('content').onclick = function() {
	cards.stateToggle();
}

function randomise(array) {
	let newArray = [];
		
	let i = 0;
	while (array.length > newArray.length) {
		let random_index = rand(0, array.length - 1);

		if (i == 0 && random_index == array.length - 1) continue;

		if (!array[random_index]) continue;

		newArray[i] = array[random_index];

		array[random_index] = null;

		i++;
	}

	return newArray;
}


function rand(min, max) {
	if (max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	} else {
		return Math.floor(Math.random() * (min + 1));
	}
}

