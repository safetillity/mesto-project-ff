import '../pages/index.css'
import {
	initialCards,
	createCard,
	removeCard,
	likeCard,
} from '../components/cards.js'
import { closePopup, openImagePopup } from '../components/modal.js'

const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const closeButtons = document.querySelectorAll('.popup__close')
const popupEdit = document.querySelector('.popup_type_edit')
const popupNewCard = document.querySelector('.popup_type_new-card')

const cardList = document.querySelector('.places__list')
initialCards.forEach(cardContent => {
	const cardElement = createCard(cardContent, removeCard, openImagePopup)
	cardList.append(cardElement)
})

editButton.addEventListener('click', function () {
	popupEdit.classList.add('popup_is-opened')
	nameInput.value = profileTitle.textContent
	jobInput.value = profileDescription.textContent
})

addButton.addEventListener('click', function () {
	popupNewCard.classList.add('popup_is-opened')
})

closeButtons.forEach(button => {
	button.addEventListener('click', closePopup)
})

document.addEventListener('keydown', function (event) {
	if (event.key === 'Escape') {
		closePopup()
	}
})

document.addEventListener('click', function (evt) {
	if (evt.target.classList.contains('popup')) {
		closePopup()
	}
})

const editForm = document.querySelector('.popup_type_edit .popup__form')
const nameInput = editForm.querySelector('.popup__input_type_name')
const jobInput = editForm.querySelector('.popup__input_type_description')

let profileTitle = document.querySelector('.profile__title')
let profileDescription = document.querySelector('.profile__description')

function handleFormSubmit(evt) {
	evt.preventDefault()
	let newName = nameInput.value
	let newJob = jobInput.value

	profileTitle.textContent = newName
	profileDescription.textContent = newJob
	closePopup()
}

editForm.addEventListener('submit', handleFormSubmit)

const addForm = document.querySelector('.popup_type_new-card .popup__form')
const cardNameInput = addForm.querySelector('.popup__input_type_card-name')
const cardUrlInput = addForm.querySelector('.popup__input_type_url')
function addCard(evt) {
	evt.preventDefault()
	const newCard = {
		name: cardNameInput.value,
		link: cardUrlInput.value,
	}
	initialCards.unshift(newCard)
	createCard(newCard, removeCard, openImagePopup, likeCard)
	const cardElement = createCard(newCard, removeCard, openImagePopup, likeCard)
	cardList.prepend(cardElement)
	closePopup()
	addForm.reset()
}
addForm.addEventListener('submit', addCard)

const likeButtons = document.querySelectorAll('.card__like-button')
likeButtons.forEach(like => {
	like.addEventListener('click', likeCard)
})
