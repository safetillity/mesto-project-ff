import '../pages/index.css'
import { createCard, removeCard, likeCard } from '../components/cards.js'
import { clearValidation, enableValidation } from '../components/validation.js'
import {
	closePopup,
	openPopup,
	closePopupByOverlay,
} from '../components/modal.js'
import {
	getCards,
	getUserInfo,
	patchProfile,
	postCards,
	patchAvatar,
} from '../components/api.js'

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
const placesList = document.querySelector('.places__list')
const profileForm = document.querySelector('.popup_type_edit .popup__form')
const nameInput = profileForm.querySelector('.popup__input_type_name')
const jobInput = profileForm.querySelector('.popup__input_type_description')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileAvatar = document.querySelector('.profile__image')
const addForm = document.querySelector('.popup_type_new-card .popup__form')
const cardNameInput = addForm.querySelector('.popup__input_type_card-name')
const cardUrlInput = addForm.querySelector('.popup__input_type_url')
const popupAvatar = document.querySelector('.popup_type_new-avatar')
const avatarForm = popupAvatar.querySelector('.popup__form')
const avatarUrlInput = avatarForm.querySelector('.popup__input_type_url')
const popups = document.querySelectorAll('.popup')

let userInfo

Promise.all([getUserInfo(), getCards()])
	.then(([profileData, cardList]) => {
		userInfo = profileData
		profileTitle.textContent = userInfo.name
		profileDescription.textContent = userInfo.about
		profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`

		cardList.forEach(cardContent => {
			const cardElement = createCard({
				cardContent,
				userInfo,
				removeCard,
				openImagePopup,
				likeCard,
			})
			placesList.append(cardElement)
		})
	})
	.catch(error => console.error(`Ошибка при загрузке данных: ${error}`))

function openImagePopup(cardContent) {
	popupImagePicture.src = cardContent.link
	popupImagePicture.alt = cardContent.name
	popupCaption.textContent = cardContent.name
	openPopup(popupImage)
}

function renderLoading(isLoading, submitButton) {
	if (isLoading) {
		submitButton.textContent = 'Сохранение...'
	} else {
		submitButton.textContent = 'Сохранить'
	}
}

function editProfile(event) {
	event.preventDefault()
	const submitButton = event.target.querySelector('.popup__button')
	renderLoading(true, submitButton)
	patchProfile(nameInput.value, jobInput.value)
		.then(updatedUserInfo => {
			userInfo = updatedUserInfo
			profileTitle.textContent = userInfo.name
			profileDescription.textContent = userInfo.about
			closePopup(popupEdit)
		})
		.catch(error => console.error(`Ошибка при обновлении профиля: ${error}`))
		.finally(() => renderLoading(false, submitButton))
}

function addCard(event) {
	event.preventDefault()
	const submitButton = event.target.querySelector('.popup__button')
	renderLoading(true, submitButton)
	postCards(cardNameInput.value, cardUrlInput.value)
		.then(cardContent => {
			const cardElement = createCard({
				cardContent,
				userInfo,
				removeCard,
				openImagePopup,
				likeCard,
			})
			placesList.prepend(cardElement)
			closePopup(popupNewCard)
			addForm.reset()
		})
		.catch(error => console.error(`Ошибка при добавлении карточки: ${error}`))
		.finally(() => renderLoading(false, submitButton))
	clearValidation(addForm, validationConfig)
}

function editAvatar(event) {
	event.preventDefault()
	const submitButton = event.target.querySelector('.popup__button')
	renderLoading(true, submitButton)
	patchAvatar(avatarUrlInput.value)
		.then(updatedUserInfo => {
			userInfo = updatedUserInfo
			profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`
			closePopup(popupAvatar)
		})
		.catch(error => console.error(`Ошибка при обновлении аватара: ${error}`))
		.finally(() => renderLoading(false, submitButton))
}

editButton.addEventListener('click', function () {
	clearValidation(profileForm, validationConfig)
	openPopup(popupEdit)
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

profileAvatar.addEventListener('click', function () {
	openPopup(popupAvatar)
})

enableValidation(validationConfig)
profileForm.addEventListener('submit', editProfile)
addForm.addEventListener('submit', addCard)
avatarForm.addEventListener('submit', editAvatar)
popups.forEach(popup =>
	popup.addEventListener('mousedown', closePopupByOverlay)
)
