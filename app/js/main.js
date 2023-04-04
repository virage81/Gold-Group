// swiper slider
let slider = document.querySelector(".slider"),
	topButton = document.querySelector("#form-button"),
	popup = document.querySelector(".popup__container"),
	headerBtn = document.querySelector("#header-button"),
	headerNav = document.querySelector(".header__nav"),
	headerLinks = document.querySelectorAll(".header__link, .header__logo");

let swiper = new Swiper(slider, {
	direction: "vertical",
	slidesPerView: 1,
	hashNavigation: {
		watchState: true,
	},

	effect: "fade",
	fadeEffect: {
		crossFade: true,
	},

	keyboard: {
		enabled: true,
		pageUpDown: true,
	},
	mousewheel: true,
});

// если курсор на карте, слайдер отключается
addEventListener("mouseover", (e) => turnMapOff(e));
addEventListener("touchstart", (e) => turnMapOff(e));

function turnMapOff(evt) {
	if (evt.target.className == "ymaps-2-1-79-events-pane ymaps-2-1-79-user-selection-none") {
		swiper.enabled = false;
	} else swiper.enabled = true;
}

// отображение модального окна
topButton.addEventListener("click", () => {
	popup.classList.add("popup--show");
});

window.addEventListener("click", function (e) {
	if (e.target == popup) popup.classList.remove("popup--show");
});

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
