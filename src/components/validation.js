const showInputError = (inputElement, errorMessage, validationConfig) => {
	const formElement = inputElement.closest(validationConfig.formSelector)
	const errorElement = formElement.querySelector(
		`.popup__input_type_error-${inputElement.name}`
	)
	inputElement.classList.add(validationConfig.inputErrorClass)
	errorElement.textContent = errorMessage
}

const hideInputError = (inputElement, validationConfig) => {
	const formElement = inputElement.closest(validationConfig.formSelector)
	const errorElement = formElement.querySelector(
		`.popup__input_type_error-${inputElement.name}`
	)
	inputElement.classList.remove(validationConfig.inputErrorClass)
	errorElement.textContent = ''
}

const checkInputValidity = (inputElement, validationConfig) => {
	if (inputElement.validity.valueMissing) {
		showInputError(inputElement, 'Вы пропустили это поле.', validationConfig)
		return false
	}

	if (inputElement.validity.patternMismatch) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage)
	} else {
		inputElement.setCustomValidity('')
	}

	if (!inputElement.validity.valid) {
		showInputError(
			inputElement,
			inputElement.validationMessage,
			validationConfig
		)
		return false
	} else {
		hideInputError(inputElement, validationConfig)
	}
	return true
}

  function hasInvalidInput(inputList) {
	return inputList.some(inputElement => !inputElement.validity.valid)
}

  const toggleButtonState = (
	hasInvalidInput,
	inputList,
	buttonElement,
	validationConfig
) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add(validationConfig.inactiveButtonClass)
		buttonElement.disabled = true
	} else {
		buttonElement.disabled = false
		buttonElement.classList.remove(validationConfig.inactiveButtonClass)
	}
}

  const setEventListeners = (formElement, validationConfig) => {
	const inputList = Array.from(
		formElement.querySelectorAll(validationConfig.inputSelector)
	)
	const buttonElement = formElement.querySelector(
		validationConfig.submitButtonSelector
	)
	toggleButtonState(hasInvalidInput, inputList, buttonElement, validationConfig)

	inputList.forEach(inputElement => {
		inputElement.addEventListener('input', function () {
			checkInputValidity(inputElement, validationConfig)
			toggleButtonState(
				hasInvalidInput,
				inputList,
				buttonElement,
				validationConfig
			)
		})
	})
}

export const enableValidation = validationConfig => {
	const formList = Array.from(
		document.querySelectorAll(validationConfig.formSelector)
	)
	formList.forEach(formElement => {
		formElement.addEventListener('submit', evt => {
			evt.preventDefault()
		})
		setEventListeners(formElement, validationConfig)
	})
}

export const clearValidation = (formElement, validationConfig) => {
	const inputList = Array.from(
		formElement.querySelectorAll(validationConfig.inputSelector)
	)
	const buttonElement = formElement.querySelector(
		validationConfig.submitButtonSelector
	)

	inputList.forEach(inputElement =>
		hideInputError(inputElement, validationConfig)
	)

	toggleButtonState(() => true, inputList, buttonElement, validationConfig)
} 