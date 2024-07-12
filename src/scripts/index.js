import '../pages/index.css'
import {initialCards} from "../scripts/cards.js"

const cardTemplate = document.querySelector('#card-template').content
function createCard(cardContent, removeCard) {
	const cardElement = cardTemplate.cloneNode(true)
	const cardImage = cardElement.querySelector('.card__image')
	const cardTitle = cardElement.querySelector('.card__title')
	const cardDeleteButton = cardElement.querySelector('.card__delete-button')

	cardImage.src = cardContent.link
	cardImage.alt = cardContent.name
	cardTitle.textContent = cardContent.name

	cardDeleteButton.addEventListener('click', removeCard)

	return cardElement
}

function removeCard(event) {
	const card = event.target.closest('.card')
	card.remove()
}

const cardList = document.querySelector('.places__list')
initialCards.forEach(cardContent => {
	const cardElement = createCard(cardContent, removeCard)
	cardList.append(cardElement)
})
