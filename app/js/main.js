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

topButton.addEventListener("click", () => {
	popup.classList.add("show");
});

window.addEventListener("click", function (e) {
	if (e.target == popup) popup.classList.remove("show");
});
