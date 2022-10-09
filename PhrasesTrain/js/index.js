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
            remain: document.getElementById('remain'),
            spent: document.getElementById('spent'),
        }
        return cards;
    },
    setContent: (words, position) => {
    	let fields = cards.getDOM();

    	fields.ru.innerHTML = words[position].ru;
    	fields.en.innerHTML = words[position].en;
    	fields.ph.innerHTML = words[position].ph;
		fields.spent.innerHTML = position + 1;
    	fields.remain.innerHTML = words.length - (position + 1);
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


let setPosition = {
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

/************************ События ************************/

// Загрузка страницы
words = randomise(words);
setPosition.current();
cards.setContent(words, position);
cards.stateAsk();

// Листаем назад
document.getElementById('prev').onclick = function() {
	setPosition.prev();
	cards.setContent(words, position);
	cards.stateAsk();
}

// Листаем вперед
document.getElementById('next').onclick = function() {
	setPosition.next();
	cards.setContent(words, position);
	cards.stateAsk();
}

// Смотрим ответ
document.getElementById('content').onclick = function() {
	cards.stateToggle();
}

document.onkeydown = function(event) {
	// << Листаем назад
	if (event.keyCode == 37) {
		setPosition.prev();
		cards.setContent(words, position);
		cards.stateAsk();
	}
	// >> Листаем вперед
	if (event.keyCode == 39) {
		setPosition.next();
		cards.setContent(words, position);
		cards.stateAsk();
	}
	
	// /\ Смотрим ответ
	if (event.keyCode == 38) {
		cards.stateToggle();
	}
}
