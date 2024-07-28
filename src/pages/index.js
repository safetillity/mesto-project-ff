import '../pages/index.css'
import { initialCards } from '../components/cards.js'
import { createCard, removeCard, likeCard } from '../components/cardFunc.js'
import { clearValidation, enableValidation } from '../components/validation.js'
import { closePopup, openPopup } from '../components/modal.js'

const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible',
}

const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const closeButtons = document.querySelectorAll('.popup__close')
const popupEdit = document.querySelector('.popup_type_edit')
const popupNewCard = document.querySelector('.popup_type_new-card')
const popupImage = document.querySelector('.popup_type_image')
const popupImagePicture = popupImage.querySelector('.popup__image')
const popupCaption = popupImage.querySelector('.popup__caption')

function openImagePopup(cardContent) {
	popupImagePicture.src = cardContent.link
	popupImagePicture.alt = cardContent.name
	popupCaption.textContent = cardContent.name

	openPopup(popupImage)
}

const cardList = document.querySelector('.places__list')
initialCards.forEach(cardContent => {
	const cardElement = createCard(
		cardContent,
		removeCard,
		openImagePopup,
		likeCard
	)
	cardList.append(cardElement)
})

editButton.addEventListener('click', function () {
	openPopup(popupEdit)
	clearValidation(editForm, validationConfig)
	nameInput.value = profileTitle.textContent
	jobInput.value = profileDescription.textContent
})

addButton.addEventListener('click', function () {
	openPopup(popupNewCard)
})

closeButtons.forEach(button => {
	button.addEventListener('click', function () {
		const popup = button.closest('.popup')
		closePopup(popup)
	})
})

document.addEventListener('click', function (evt) {
	if (evt.target.classList.contains('popup')) {
		closePopup(evt.target)
	}
})

const editForm = document.querySelector('.popup_type_edit .popup__form')
const nameInput = editForm.querySelector('.popup__input_type_name')
const jobInput = editForm.querySelector('.popup__input_type_description')

const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

function editProfile(evt) {
	evt.preventDefault()
	const newName = nameInput.value
	const newJob = jobInput.value

	profileTitle.textContent = newName
	profileDescription.textContent = newJob
	clearValidation(editForm, validationConfig)
	closePopup(popupEdit)
}

editForm.addEventListener('submit', editProfile)

const addForm = document.querySelector('.popup_type_new-card .popup__form')
const cardNameInput = addForm.querySelector('.popup__input_type_card-name')
const cardUrlInput = addForm.querySelector('.popup__input_type_url')
function addCard(evt) {
	evt.preventDefault()
	const newCard = {
		name: cardNameInput.value,
		link: cardUrlInput.value,
	}
	const cardElement = createCard(newCard, removeCard, openImagePopup, likeCard)
	cardList.prepend(cardElement)
	closePopup(popupNewCard)
	clearValidation(addForm, validationConfig)
}
addForm.addEventListener('submit', addCard)

enableValidation(validationConfig)
