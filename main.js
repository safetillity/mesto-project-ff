(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-19",headers:{authorization:"edc7862c-5164-4fa1-9961-78ec194f0d97","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function n(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))}function r(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))}function o(e){var t=e.cardContent,n=e.userInfo,r=e.removeCard,o=e.openImagePopup,c=e.likeCard,u=document.querySelector("#card-template").content.cloneNode(!0),a=u.querySelector(".card__image"),i=u.querySelector(".card__title"),l=u.querySelector(".card__delete-button"),s=u.querySelector(".card__like-button"),p=u.querySelector(".card__like-quantity");return a.src=t.link,a.alt=t.name,i.textContent=t.name,p.textContent=t.likes.length,t.likes.some((function(e){return e._id===n._id}))&&s.classList.add("card__like-button_is-active"),n._id===t.owner._id?l.addEventListener("click",(function(e){return r(e,n,t)})):l.remove(),a.addEventListener("click",(function(){return o(t)})),s.addEventListener("click",(function(){return c(t._id,s,p)})),u}function c(n,r,o){if(o.owner._id===r._id){var c=n.target.closest(".card");(u=o._id,fetch("".concat(e.baseUrl,"/cards/").concat(u),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(){c.remove()})).catch((function(e){return console.error("Ошибка удаления карточки: ".concat(e))}))}else console.error("Это не ваша карточка, вы не можете ее удалить");var u}function u(e,t,o){(t.classList.contains("card__like-button_is-active")?r:n)(e).then((function(e){t.classList.toggle("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){return console.error("Ошибка обработки лайка: ".concat(e))}))}var a=function(e,t,n){var r=e.closest(n.formSelector).querySelector(".".concat(n.inputErrorClass,"-").concat(e.name));e.classList.add(n.inputErrorClass),r.textContent=t},i=function(e,t){var n=e.closest(t.formSelector).querySelector(".".concat(t.inputErrorClass,"-").concat(e.name));e.classList.remove(t.inputErrorClass),n.textContent="",e.setCustomValidity("")};function l(e){return e.some((function(e){return!e.validity.valid}))}var s=function(e,t,n,r){e(t)?(n.classList.add(r.inactiveButtonClass),n.disabled=!0):(n.disabled=!1,n.classList.remove(r.inactiveButtonClass))},p=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(e){i(e,t)})),s((function(){return!0}),n,r,t)};function d(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",_)}function f(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",_)}var _=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&f(t)}},m=function(e){var t=document.querySelector(".popup_is-opened");e.target.classList.contains("popup")&&f(t)};function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var v,h={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},S=document.querySelector(".profile__edit-button"),b=document.querySelector(".profile__add-button"),q=document.querySelectorAll(".popup__close"),C=document.querySelector(".popup_type_edit"),E=document.querySelector(".popup_type_new-card"),g=document.querySelector(".popup_type_image"),k=g.querySelector(".popup__image"),L=g.querySelector(".popup__caption"),A=document.querySelector(".places__list"),x=document.querySelector(".popup_type_edit .popup__form"),w=x.querySelector(".popup__input_type_name"),I=x.querySelector(".popup__input_type_description"),U=document.querySelector(".profile__title"),P=document.querySelector(".profile__description"),T=document.querySelector(".profile__image"),j=document.querySelector(".popup_type_new-card .popup__form"),O=j.querySelector(".popup__input_type_card-name"),B=j.querySelector(".popup__input_type_url"),D=document.querySelector(".popup_type_new-avatar"),M=D.querySelector(".popup__form"),N=M.querySelector(".popup__input_type_url"),J=document.querySelectorAll(".popup");function H(e){k.src=e.link,k.alt=e.name,L.textContent=e.name,d(g)}function V(e,t){t.textContent=e?"Сохранение...":"Сохранить"}Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return t(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=r[0],i=r[1];v=a,U.textContent=v.name,P.textContent=v.about,T.style.backgroundImage="url(".concat(v.avatar,")"),i.forEach((function(e){var t=o({cardContent:e,userInfo:v,removeCard:c,openImagePopup:H,likeCard:u});A.append(t)}))})).catch((function(e){return console.error("Ошибка при загрузке данных: ".concat(e))})),S.addEventListener("click",(function(){p(x,h),d(C),w.value=U.textContent,I.value=P.textContent})),b.addEventListener("click",(function(){d(E)})),q.forEach((function(e){e.addEventListener("click",(function(){f(e.closest(".popup"))}))})),T.addEventListener("click",(function(){d(D)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);s(l,n,r,t),n.forEach((function(e){e.addEventListener("input",(function(){!function(e,t){e.validity.valueMissing?a(e,"Вы пропустили это поле.",t):(e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):i(e,t),e.validity.valid?i(e,t):a(e,e.validationMessage,t))}(e,t),s(l,n,r,t)}))}))}(t,e)}))}(h),x.addEventListener("submit",(function(n){n.preventDefault();var r,o,c=n.target.querySelector(".popup__button");V(!0,c),(r=w.value,o=I.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then((function(e){return t(e)}))).then((function(e){v=e,U.textContent=v.name,P.textContent=v.about,f(C)})).catch((function(e){return console.error("Ошибка при обновлении профиля: ".concat(e))})).finally((function(){return V(!1,c)}))})),j.addEventListener("submit",(function(n){n.preventDefault();var r,a,i=n.target.querySelector(".popup__button");V(!0,i),(r=O.value,a=B.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:r,link:a})}).then((function(e){return t(e)}))).then((function(e){var t=o({cardContent:e,userInfo:v,removeCard:c,openImagePopup:H,likeCard:u});A.prepend(t),f(E),j.reset()})).catch((function(e){return console.error("Ошибка при добавлении карточки: ".concat(e))})).finally((function(){return V(!1,i)})),p(j,h)})),M.addEventListener("submit",(function(n){n.preventDefault();var r,o=n.target.querySelector(".popup__button");V(!0,o),(r=N.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then((function(e){return t(e)}))).then((function(e){v=e,T.style.backgroundImage="url(".concat(v.avatar,")"),f(D)})).catch((function(e){return console.error("Ошибка при обновлении аватара: ".concat(e))})).finally((function(){return V(!1,o)}))})),J.forEach((function(e){return e.addEventListener("mousedown",m)}))})();