import {
	deleteCard,
	putLike,
	deleteLike,
	getUserInfo,
} from '../components/api.js'

export function createCard(cardContent, removeCard, openImagePopup, likeCard) {
	const cardTemplate = document.querySelector('#card-template').content
	const cardElement = cardTemplate.cloneNode(true)
	const cardImage = cardElement.querySelector('.card__image')
	const cardTitle = cardElement.querySelector('.card__title')
	const cardDeleteButton = cardElement.querySelector('.card__delete-button')
	const likeButton = cardElement.querySelector('.card__like-button')
	const likeQuantity = cardElement.querySelector('.card__like-quantity')

	cardImage.src = cardContent.link
	cardImage.alt = cardContent.name
	cardTitle.textContent = cardContent.name
	likeQuantity.textContent = cardContent.likes.length

	getUserInfo().then(userInfo => {
		const userLiked = cardContent.likes.some(like => like._id === userInfo._id)
		if (userLiked) {
			likeButton.classList.add('card__like-button_is-active')
		}

		if (userInfo._id === cardContent.owner._id) {
			cardDeleteButton.addEventListener('click', event =>
				removeCard(event, cardContent)
			)
		} else {
			cardDeleteButton.style.display = 'none'
		}
	})

	cardImage.addEventListener('click', () => openImagePopup(cardContent))

	likeButton.addEventListener('click', event =>
		likeCard(event, cardContent._id)
	)

	return cardElement
}

export function removeCard(event, cardContent) {
	getUserInfo().then(userInfo => {
		if (cardContent.owner._id === userInfo._id) {
			const card = event.target.closest('.card')
			deleteCard(cardContent._id)
				.then(() => {
					card.remove()
				})
				.catch(error => console.error(`Ошибка удаления карточки: ${error}`))
		} else {
			console.error('Это не ваша карточка, вы не можете ее удалить')
		}
	})
}

export function likeCard(event, cardID) {
	const likeButton = event.target
	const toggleLike = likeButton.classList.contains(
		'card__like-button_is-active'
	)
		? deleteLike
		: putLike

	toggleLike(cardID)
		.then(updatedCard => {
			likeButton.classList.toggle('card__like-button_is-active')
			const likeQuantity = likeButton
				.closest('.card')
				.querySelector('.card__like-quantity')
			likeQuantity.textContent = updatedCard.likes.length
		})
		.catch(error => console.error(`Ошибка обработки лайка: ${error}`))
}
