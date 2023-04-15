// swiper slider
let topButton = document.querySelector("#form-button"),
	popup = document.querySelector(".popup__container"),
	headerBtn = document.querySelector("#header-button"),
	headerNav = document.querySelector(".header__nav"),
	headerLinks = document.querySelectorAll(".header__link, .header__logo"),
	phone_inputs = document.querySelectorAll("#phone");

// отображение модального окна
topButton.addEventListener("click", () => {
	popup.classList.add("popup--show");
	document.querySelector("body").style.overflow = "hidden";
});

window.addEventListener("click", function (e) {
	if (e.target == popup) popup.classList.remove("popup--show");
	document.querySelector("body").style.overflow = "visible";
});

// Маска номера телефона
var eventCalllback = function (e) {
	console.log(e);
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
	} else {
		headerBtn.classList.add("header__button--close");
		headerNav.classList.add("header__nav--show");
	}
});

headerLinks.forEach((item) => {
	item.addEventListener("click", () => {
		headerBtn.classList.remove("header__button--close");
		headerNav.classList.remove("header__nav--show");
	});
});

// yandex map
ymaps.ready(init);
function init() {
	// Создание карты.
	let myPlacemark = new ymaps.Placemark([56.861243, 53.209738]);
	let map = new ymaps.Map("map", {
		// Координаты центра карты.
		// Порядок по умолчанию: «широта, долгота».
		// Чтобы не определять координаты центра карты вручную,
		// воспользуйтесь инструментом Определение координат.
		center: [56.861243, 53.209738],
		// Уровень масштабирования. Допустимые значения:
		// от 0 (весь мир) до 19.
		zoom: 17,
		scroll: false,
	});
	map.geoObjects.add(myPlacemark);
}
