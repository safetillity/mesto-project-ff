export function closePopup() {
	const popups = document.querySelectorAll('.popup')
	popups.forEach(popup => {
		popup.classList.remove('popup_is-opened')
	})
}

export function openImagePopup(cardContent) {
	const popupImage = document.querySelector('.popup_type_image')
	const popupImagePicture = popupImage.querySelector('.popup__image')
	const popupCaption = popupImage.querySelector('.popup__caption')

	popupImagePicture.src = cardContent.link
	popupImagePicture.alt = cardContent.name
	popupCaption.textContent = cardContent.name

	popupImage.classList.add('popup_is-opened')
}
