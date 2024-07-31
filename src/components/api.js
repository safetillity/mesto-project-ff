const config = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-19',
	headers: {
		authorization: 'edc7862c-5164-4fa1-9961-78ec194f0d97',
		'Content-Type': 'application/json',
	},
}

export function getUserInfo() {
	return fetch(`${config.baseUrl}/users/me`, { headers: config.headers }).then(
		res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
	)
}

export function getCards() {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers,
	}).then(res =>
		res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
	)
}

export function patchProfile(name, about) {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			about: about,
		}),
	})
}

export function postCards(name, link) {
	return fetch(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			link: link,
		}),
	}).then(res =>
		res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
	)
}

export function deleteCard(cardID) {
	return fetch(`${config.baseUrl}/cards/${cardID}`, {
		method: 'DELETE',
		headers: config.headers,
	}).then(res =>
		res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
	)
}

export function putLike(cardID) {
	return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
		method: 'PUT',
		headers: config.headers,
	}).then(res =>
		res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
	)
}

export function deleteLike(cardID) {
	return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
		method: 'DELETE',
		headers: config.headers,
	}).then(res =>
		res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
	)
}

export function patchAvatar(avatar) {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			avatar: avatar,
		}),
	}).then(res =>
		res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
	)
}

export function renderLoading(isLoading, submitButton) {

	if (isLoading) {
		submitButton.textContent = 'Сохранение...'
	} else {
		submitButton.textContent = 'Cохранить'
	}
}
