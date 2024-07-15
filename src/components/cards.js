export const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
	},
]

export function createCard(cardContent, removeCard, openImagePopup, likeCard) {
	const cardTemplate = document.querySelector('#card-template').content
	const cardElement = cardTemplate.cloneNode(true)
	const cardImage = cardElement.querySelector('.card__image')
	const cardTitle = cardElement.querySelector('.card__title')
	const cardDeleteButton = cardElement.querySelector('.card__delete-button')
	const likeButton = cardElement.querySelector('.card__like-button')

	cardImage.src = cardContent.link
	cardImage.alt = cardContent.name
	cardTitle.textContent = cardContent.name

	cardDeleteButton.addEventListener('click', removeCard)
	cardImage.addEventListener('click', () => openImagePopup(cardContent))
	likeButton.addEventListener('click', likeCard)
	return cardElement
}

export function removeCard(event) {
	const card = event.target.closest('.card')
	card.remove()
}

export function likeCard(event) {
	event.target.classList.toggle('card__like-button_is-active')
}
