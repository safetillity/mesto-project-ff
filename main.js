(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-19",headers:{authorization:"edc7862c-5164-4fa1-9961-78ec194f0d97","Content-Type":"application/json"}};function t(){return fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}function n(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}function o(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}function r(e,t){t.textContent=e?"Сохранение...":"Cохранить"}function c(e,n,o,r){var c=document.querySelector("#card-template").content.cloneNode(!0),u=c.querySelector(".card__image"),a=c.querySelector(".card__title"),i=c.querySelector(".card__delete-button"),s=c.querySelector(".card__like-button"),l=c.querySelector(".card__like-quantity");return u.src=e.link,u.alt=e.name,a.textContent=e.name,l.textContent=e.likes.length,t().then((function(t){e.likes.some((function(e){return e._id===t._id}))&&s.classList.add("card__like-button_is-active"),t._id===e.owner._id?i.addEventListener("click",(function(t){return n(t,e)})):i.style.display="none"})),u.addEventListener("click",(function(){return o(e)})),s.addEventListener("click",(function(t){return r(t,e._id)})),c}function u(n,o){t().then((function(t){if(o.owner._id===t._id){var r=n.target.closest(".card");(c=o._id,fetch("".concat(e.baseUrl,"/cards/").concat(c),{method:"DELETE",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){r.remove()})).catch((function(e){return console.error("Ошибка удаления карточки: ".concat(e))}))}else console.error("Это не ваша карточка, вы не можете ее удалить");var c}))}function a(e,t){var r=e.target;(r.classList.contains("card__like-button_is-active")?o:n)(t).then((function(e){r.classList.toggle("card__like-button_is-active"),r.closest(".card").querySelector(".card__like-quantity").textContent=e.likes.length})).catch((function(e){return console.error("Ошибка обработки лайка: ".concat(e))}))}var i=function(e,t,n){var o=e.closest(n.formSelector).querySelector(".popup__input_type_error-".concat(e.name));e.classList.add(n.inputErrorClass),o.textContent=t},s=function(e,t){var n=e.closest(t.formSelector).querySelector(".popup__input_type_error-".concat(e.name));e.classList.remove(t.inputErrorClass),n.textContent=""};function l(e){return e.some((function(e){return!e.validity.valid}))}var p=function(e,t,n,o){e(t)?(n.classList.add(o.inactiveButtonClass),n.disabled=!0):(n.disabled=!1,n.classList.remove(o.inactiveButtonClass))},d=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(e){s(e,t)})),p((function(){return!0}),n,o,t)};function _(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",m)}function f(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",m)}var m=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&f(t)}},y={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},v=document.querySelector(".profile__edit-button"),h=document.querySelector(".profile__add-button"),S=document.querySelectorAll(".popup__close"),q=document.querySelector(".popup_type_edit"),b=document.querySelector(".popup_type_new-card"),k=document.querySelector(".popup_type_image"),E=k.querySelector(".popup__image"),C=k.querySelector(".popup__caption"),L=document.querySelector(".places__list"),g=document.querySelector(".popup_type_edit .popup__form"),j=g.querySelector(".popup__input_type_name"),x=g.querySelector(".popup__input_type_description"),P=document.querySelector(".profile__title"),U=document.querySelector(".profile__description"),A=document.querySelector(".profile__image"),w=document.querySelector(".popup_type_new-card .popup__form"),T=w.querySelector(".popup__input_type_card-name"),B=w.querySelector(".popup__input_type_url"),M=document.querySelector(".popup_type_new-avatar"),N=M.querySelector(".popup__form"),O=N.querySelector(".popup__input_type_url");function D(e){E.src=e.link,E.alt=e.name,C.textContent=e.name,_(k)}fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){return e.forEach((function(e){var t=c(e,u,D,a);L.append(t)}))})).catch((function(e){return console.error("ошибка при загрузки карточек : ".concat(e))})),t().then((function(e){P.textContent=e.name,U.textContent=e.about,A.style.backgroundImage="url(\\".concat(e.avatar,")")})).catch((function(e){return console.error("ошибка при загрузки данных пользователя : ".concat(e))})),v.addEventListener("click",(function(){d(g,y),_(q),j.value=P.textContent,x.value=U.textContent})),h.addEventListener("click",(function(){_(b)})),S.forEach((function(e){e.addEventListener("click",(function(){f(e.closest(".popup"))}))})),A.addEventListener("click",(function(){_(M)})),document.addEventListener("click",(function(e){e.target.classList.contains("popup")&&f(e.target)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);p(l,n,o,t),n.forEach((function(e){e.addEventListener("input",(function(){!function(e,t){e.validity.valueMissing?i(e,"Вы пропустили это поле.",t):(e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?s(e,t):i(e,e.validationMessage,t))}(e,t),p(l,n,o,t)}))}))}(t,e)}))}(y),g.addEventListener("submit",(function(t){var n,o,c=t.target.querySelector(".popup__button");r(!0,c),P.textContent=j.value,U.textContent=x.value,(n=P.textContent,o=U.textContent,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:n,about:o})})).then((function(){f(q)})).catch((function(e){return console.error("ошибка при загрузки данных пользователя : ".concat(e))})).finally((function(){return r(!1,c)}))})),w.addEventListener("submit",(function(t){var n,o,i=t.target.querySelector(".popup__button");r(!0,i),(n=T.value,o=B.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:n,link:o})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){var t=c(e,u,D,a);L.prepend(t),f(b),w.reset(),d(w,y)})).catch((function(e){return console.error("ошибка при загрузки данных пользователя : ".concat(e))})).finally((function(){return r(!1,i)}))})),N.addEventListener("submit",(function(){var t;(t=O.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){A.style.backgroundImage="url(\\".concat(e.avatar,")")})).then((function(){f(M)})).catch((function(e){return console.error("ошибка при загрузки данных пользователя : ".concat(e))}))}))})();