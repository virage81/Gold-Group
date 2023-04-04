// swiper slider
let slider = document.querySelector(".slider");
let topButton = document.querySelector("#form-button");
let popup = document.querySelector(".popup__container");
let headerBtn = document.querySelector("#header-button");
let headerNav = document.querySelector(".header__nav");

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
addEventListener("mouseover", (e) => {
	if (e.target.className == "ymaps-2-1-79-events-pane ymaps-2-1-79-user-selection-none") {
		swiper.enabled = false;
	} else swiper.enabled = true;
});

// отображение модального окна
topButton.addEventListener("click", () => {
	popup.classList.add("popup--show");
});

window.addEventListener("click", function (e) {
	if (e.target == popup) popup.classList.remove("popup--show");
});

// Переключение навигации в header
headerBtn.addEventListener("click", (e) => {
	headerNav.classList.contains("header__nav--show") ? headerNav.classList.remove("header__nav--show") : headerNav.classList.add("header__nav--show");
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
