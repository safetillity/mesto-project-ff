export function openPopup(popup) {
	popup.classList.add('popup_is-opened')
	document.addEventListener('keydown', closePopupByEsc)
}
export function closePopup(popup) {
	popup.classList.remove('popup_is-opened')
	document.removeEventListener('keydown', closePopupByEsc)
}

export const closePopupByEsc = evt => {
	if (evt.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_is-opened')
		if (openedPopup) {
			closePopup(openedPopup)
		}
	}
}
