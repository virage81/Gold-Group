let topButton = document.querySelector("#top-button"),
	body = document.querySelector(".body"),
	popup = document.querySelector(".popup"),
	form_container = document.querySelectorAll(".popup, .form__content"),
	popup_response = document.querySelectorAll(".popup__form__text--response"),
	header = document.querySelector(".header"),
	headerBtn = document.querySelector("#header-button"),
	headerNav = document.querySelector(".header__nav"),
	headerLinks = document.querySelectorAll(".header__logo, .header__nav__link "),
	phone_inputs = document.querySelectorAll("#phone"),
	sections = document.querySelectorAll("section"),
	blocks = document.querySelectorAll(".about, .features, .form, .contacts"),
	forms = document.querySelectorAll("#form");

// фиксированная высота
window.onload = (e) => {
	sections[0].style.height = `${window.innerHeight}px`;

	for (let elem of blocks) {
		elem.style.height = `${window.innerHeight - 60}px`;
	}
};

// навигация на странице
for (let link of headerLinks) {
	link.onclick = function () {
		sections.forEach((elem) => {
			if (link.getAttribute("data-href") == elem.getAttribute("data-scroll")) {
				window.scrollTo({ left: 0, top: elem.offsetTop - 60, behavior: "smooth" });
			}
		});
	};
}

// Отправка формы
const CHAT_ID = -959048149;
const TOKEN = "5821700538:AAHKBJfWzvTB7F6SUHvSZQ9b8h1VI52vx68";
const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

let err_message = "Ошибка отправки заявки",
	suc_message = "Заявка отправлена";

forms.forEach(function (form) {
	form.addEventListener("submit", function (e) {
		e.preventDefault();

		let message = "<b>ФИО:</b>";
		message += `${this.last_name.value} ${this.first_name.value} ${this.surname.value != "" ? this.surname.value : ""}\n`;
		message += `<b>Телефон:</b> ${this.phone.value}`;

		axios.post(URL_API, {
			chat_id: CHAT_ID,
			text: message,
			parse_mode: "html",
			disable_notifications: true,
		})
			.then((res) => {
				form_container.forEach((item) => {
					item.classList.add("success");
				});

				popup_response.forEach(function (item) {
					item.innerHTML = suc_message;
				});

				e.target.reset();
			})
			.catch((error) => {
				popup_response.forEach(function (item) {
					item.innerHTML = err_message;
				});
				console.log(error);
			});
	});
});

// отображение формы
topButton.addEventListener("click", (e) => {
	popup.classList.add("popup--show");
	body.classList.add("body--blur");
});

let events = ["click", "touchstart"];

events.forEach((elem) => {
	window.addEventListener(elem, function (e) {
		if (e.target == popup) {
			popup.classList.remove("popup--show");
			body.classList.remove("body--blur");
		}
	});
});

// Маска номера телефона
var eventCalllback = function (e) {
	var el = e.target,
		clearVal = el.dataset.phoneClear,
		pattern = el.dataset.phonePattern,
		matrix_def = "+7(___) ___-__-__",
		matrix = pattern ? pattern : matrix_def,
		i = 0,
		def = matrix.replace(/\D/g, ""),
		val = e.target.value.replace(/\D/g, "");
	if (clearVal !== "false" && e.type === "blur") {
		if (val.length < matrix.match(/([\_\d])/g).length) {
			e.target.value = "";
			return;
		}
	}
	if (def.length >= val.length) val = def;
	e.target.value = matrix.replace(/./g, function (a) {
		return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
	});
};
for (let elem of phone_inputs) {
	for (let ev of ["input", "blur", "focus"]) {
		elem.addEventListener(ev, eventCalllback);
	}
}

// Переключение навигации в header
headerBtn.addEventListener("click", (e) => {
	if (headerNav.classList.contains("header__nav--show")) {
		headerBtn.classList.remove("header__button--close");
		headerNav.classList.remove("header__nav--show");
		header.classList.remove("header--blur");
	} else {
		headerBtn.classList.add("header__button--close");
		headerNav.classList.add("header__nav--show");
		header.classList.add("header--blur");
	}
});

window.addEventListener("click", (e) => {
	if (e.target == header) {
		headerBtn.classList.remove("header__button--close");
		headerNav.classList.remove("header__nav--show");
		header.classList.remove("header--blur");
	}
});

headerLinks.forEach((item) => {
	item.addEventListener("click", () => {
		headerBtn.classList.remove("header__button--close");
		headerNav.classList.remove("header__nav--show");
		header.classList.remove("header--blur");
	});
});

// yandex map
ymaps.ready(init);
function init() {
	// Создание карты.
	let myPlacemark = new ymaps.Placemark([56.89474833776704, 53.28482424174311]);
	let map = new ymaps.Map("map", {
		// Координаты центра карты.
		// Порядок по умолчанию: «широта, долгота».
		// Чтобы не определять координаты центра карты вручную,
		// воспользуйтесь инструментом Определение координат.
		center: [56.89474833776704, 53.28482424174311],
		// Уровень масштабирования. Допустимые значения:
		// от 0 (весь мир) до 19.
		zoom: 15,
		scroll: false,
	});
	map.geoObjects.add(myPlacemark);
}
