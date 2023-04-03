// swiper slider
let slider = document.querySelector(".slider");
let topButton = document.querySelector("#form-button");
let popup = document.querySelector(".popup__container");

const swiper = new Swiper(slider, {
	direction: "vertical",
	slidesPerView: 1,
	hashNavigation: true,

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

addEventListener("mouseover", (e) => {
	if (e.target.className == "ymaps-2-1-79-events-pane ymaps-2-1-79-user-selection-none") {
		swiper.mousewheel = false;
		console.log(true);
	}
});

topButton.addEventListener("click", () => {
	popup.classList.add("show");
});

window.addEventListener("click", function (e) {
	if (e.target == popup) popup.classList.remove("show");
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
