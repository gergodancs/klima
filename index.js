const form = document.querySelector("form");
const askofferBtn = document.getElementById("ask-offer");
const closeFormBtn = document.querySelector("form > div");

askofferBtn.addEventListener("click", () => form.classList.remove("hidden"));

closeFormBtn.addEventListener("click", () => form.classList.add("hidden"));
