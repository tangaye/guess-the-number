
const gameCardsEl = document.querySelector('.page__body')
const livesEl = document.querySelector('.header__lives')
const resultEl = document.querySelector('.header__result')

const LUCKY_NUMBER = Math.floor(Math.random() * 100) + 1
let lives = 10

onclick = event => handleOnClick(event)

const handleOnClick = event =>
{
	const target = event.target
	const targetClassList = Array.from(target.classList)

	if (targetClassList.includes('btn--play'))
	{
		// clear dom
		gameCardsEl.innerHTML = "";

		// start game
		const numbers = generateNumbers()

		numbers.forEach(number => gameCardsEl.insertAdjacentHTML('afterbegin', `
				<button class="body__btn btn btn--default" data-value="${number}">${number}</button>
			`))
	}

	if (targetClassList.includes('body__btn'))
	{

		const value = Number(target.dataset.value)

		if (value > LUCKY_NUMBER)
		{
			resultEl.innerHTML = 'Too High'

			lives--
			livesEl.innerHTML = lives.toString()

			target.classList.remove('btn--default')
			target.classList.add('btn--failure')
		}
		else if (value < LUCKY_NUMBER)
		{
			resultEl.innerHTML = 'Too Low'

			lives--
			livesEl.innerHTML = lives.toString()

			target.classList.remove('btn--default')
			target.classList.add('btn--failure')
		}
		else
		{
			resultEl.innerHTML = 'You Win'

			target.classList.remove('btn--default')
			target.classList.add('btn--success')
		}

	}
}



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