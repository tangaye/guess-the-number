
const gameCardsEl = document.querySelector('.page__body')
const livesEl = document.querySelector('.header__lives')
const resultEl = document.querySelector('.header__result')

let luckyNumber, lives

onclick = event => handleOnClick(event)

const handleOnClick = event =>
{
	const target = event.target
	const targetClassList = Array.from(target.classList)

	if (targetClassList.includes('btn--play')) toggleGame()

	if (targetClassList.includes('body__btn'))
	{

		if (targetClassList.includes('btn--failure') || targetClassList.includes('btn--success')) return

		const value = Number(target.dataset.value)

		if (value > luckyNumber)
		{
			playAudio()

			toggleResult('Too High')
			reduceLives()
			toggleBtnClass(target, 'btn--failure', 'btn--default')
		}
		else if (value < luckyNumber)
		{
			playAudio()

			toggleResult('Too Low')
			reduceLives()
			toggleBtnClass(target, 'btn--failure', 'btn--default')
		}
		else
		{
			toggleResult('You Win')
			toggleBtnClass(target, 'btn--success', 'btn--default')
		}

		if (lives === 0) endGame()

	}
}

/**
 *
 * @param el - btn el
 * @param addClass - class to add
 * @param removeClass - class to remove
 */
const toggleBtnClass = (el, addClass, removeClass) => el.classList.replace(removeClass, addClass)

/**
 * Returns an array of randomized/shuffled numbers from 1 to 100 for the board
 * @return {Array}
 */
const generateNumbers = () =>
{
	// generates a random number b/w 0-100
	const numbersArray = [...Array(101).keys()]

	// remove the first item from the array, supposedly 0
	numbersArray.shift()

	return fisherYatesShuffle(numbersArray)
}

/**
 * Shuffles an array
 * https://www.youtube.com/watch?v=tLxBwSL3lPQ&ab_channel=AdamKhoury
 *
 * @param items - array
 * @return {array}
 */
const fisherYatesShuffle = items =>
{
	const arrayLength = items.length - 1

	for (let i = arrayLength; i >= 0; i--)
	{

		const randomNumber = Math.floor(Math.random() * i)

		if (randomNumber !== i)
		{
			const temp = items[randomNumber]

			items[randomNumber] = items[i]

			items[i] = temp
		}
	}

	return items
}

/**
 * Generates a number b/w 1 and 100
 * @return {number}
 */
const generateLuckyNumber = () => luckyNumber = Math.floor(Math.random() * 100) + 1


/**
 * Clears the board
 *
 * @return {string}
 */
const clearBoard = () => gameCardsEl.innerHTML = "";

/**
 * Reset player lives
 *
 * @return {number}
 */
const resetLives = () => {
	lives = 2
	displayLives()
}

/**
 * Reduce lives
 *
 * @return {number}
 */
const reduceLives = () => {
	lives--
	displayLives()
}

const displayLives = () => livesEl.innerHTML = lives.toString()

const toggleResult = result => resultEl.innerHTML = result

/**
 * Starts or restart the game
 *
 */
const toggleGame = () =>
{

	clearBoard();

	toggleResult('lives')

	resetLives();

	generateLuckyNumber()

	generateNumbers().forEach(number => gameCardsEl.insertAdjacentHTML('afterbegin', `
				<button class="body__btn btn btn--default" data-value="${number}">${number}</button>
			`))
}


const endGame = () => {

	toggleResult("Game Over!")

	const buttons = [...document.querySelectorAll('.body__btn')]
	let successBtn;

	buttons.forEach(button => {

		if (isLuckyNumber(Number(button.dataset.value)))
		{
			// window.scrollTo({ top: button.offsetTop, behavior: 'smooth'});
			// console.log('scrolling....')
			successBtn = button
			button.className = 'body__btn btn btn--success'
			// button.scrollIntoView({behavior: 'smooth'})
		}
		else button.className = 'body__btn btn btn--failure'
	})

	successBtn.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
}


/**
 * Returns true if number is lucky number
 *
 * @param number
 * @return {boolean}
 */
const isLuckyNumber = number => luckyNumber === number;


/**
 * Plays audio file
 */
const playAudio = () =>
{
	const sources = ['./audio/think-about-your-life.m4a', './audio/basic1plus1.m4a', './audio/cutting-grass.m4a', './audio/dinner-man.m4a', './audio/no-future.m4a', './audio/pregnancy.m4a', './audio/you-are-a-failure.m4a', './audio/you-can-never-make-it-1.m4a']

	const randomIndex = Math.floor(Math.random() * sources.length)

	const audio = new Audio(sources[randomIndex])

	audio.play()
}