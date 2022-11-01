import { climas } from "./climas.js";

let listIsOpen = false;
let detailsIsOpen = false;
let closeListBtn = document.getElementById("close-list");

let formValues = {
  func: "cooler",
  goal: "",
  size: "",
  phone: "",
  type: "",
};

const functionSelect = document.getElementById("function");
const goalSelect = document.getElementById("goal");
const sizeSelect = document.getElementById("place");
const submit = document.getElementById("submit");
const calculatorContainer = document.getElementById("calculator");

let ascOrderedClimas = [];

const ascOrderList = () => {
  ascOrderedClimas = climas.sort((a, b) => a.price - b.price);
};

const calculateAveragePrice = () => {
  let sumOfPrices = 0;
  for (let climas of ascOrderedClimas) {
    sumOfPrices += climas.price;
  }
  return sumOfPrices / ascOrderedClimas.length;
};

const removeClimalist = () => {
  if (listIsOpen) {
    document.querySelector(".clima-list").remove();
    listIsOpen = false;
    detailsIsOpen = false;
  }
};

functionSelect.addEventListener("focus", removeClimalist);
goalSelect.addEventListener("focus", removeClimalist);
sizeSelect.addEventListener("focus", removeClimalist);

functionSelect.addEventListener(
  "change",
  (e) => (formValues.func = e.target.value)
);
goalSelect.addEventListener(
  "change",
  (e) => (formValues.goal = e.target.value)
);
sizeSelect.addEventListener("input", (e) => (formValues.size = e.target.value));

const createDetailsPage = (item, listElement) => {
  let detailsContainer = document.createElement("div");
  detailsContainer.className = "details-container";
  detailsContainer.id = "remove";
  listElement?.append(detailsContainer);
  let detailsImg = document.createElement("img");
  detailsImg.src = item.src;
  detailsImg.alt = "klima";
  detailsContainer.append(detailsImg);
  let listContainer = document.createElement("div");
  listContainer.className = "details-list";
  detailsContainer.append(listContainer);
  let energy = document.createElement("span");
  energy.innerText = `Energia osztály: ${item.energy} `;
  let guarntie = document.createElement("span");
  guarntie.innerText = `Garancia: ${item.guarntie} `;
  let description = document.createElement("p");
  description.innerHTML = item.description;
  description.className = "description";

  let interestDiv = document.createElement("div");
  interestDiv.className = "order-container";
  let price = document.createElement("span");
  price.innerText = `Ára: ${item.price}Ft`;
  let interestBtn = document.createElement("button");
  interestBtn.className = "order-btn";
  interestBtn.innerHTML = "Érdekel!";
  let closeBtn = document.createElement("button");
  closeBtn.innerHTML = "Bezár";
  interestDiv.append(interestBtn, closeBtn);
  listContainer.append(energy, guarntie, price, description, interestDiv);
  interestBtn.addEventListener("click", () => {
    createOrderForm(detailsContainer, item);
  });
  closeBtn.addEventListener("click", () => {
    let detailsContainer = document.getElementById("remove");
    detailsContainer.remove();
    detailsIsOpen = false;
  });
};

const createOrderForm = (detailsContainer, item) => {
  const phoneContainer = document.createElement("form");
  phoneContainer.className = "phone-container";
  phoneContainer.addEventListener("submit", (e) => handleSubmit(e, item));
  const phoneInput = document.createElement("input");
  phoneInput.setAttribute("placeholder", "Kérem adja meg telefonszámát:");
  phoneInput.setAttribute("type", "text");
  phoneInput.setAttribute("name", "phone");
  productInput.value = item;
  const submitOrderBtn = document.createElement("button");
  submitOrderBtn.setAttribute("type", "submit");
  submitOrderBtn.innerHTML = "Visszahívást kérek!";
  phoneInput.addEventListener("input", (e) => {
    formValues.phone = e.target.value;
    formValues.type = `${item.brand} ${item.type}`;
  });
  phoneContainer.append(phoneInput, submitOrderBtn);
  detailsContainer.append(phoneContainer);
};

const createList = (listDiv, item) => {
  let smContainer = document.createElement("div");
  smContainer.className = "sm-container";
  let spanBrand = document.createElement("span");

  let spanPrice = document.createElement("span");
  let listElement = document.createElement("li");
  listElement.className = `${(item.brand, item.type)}`;
  let icon = document.createElement("img");
  let typeContainer = document.createElement("div");
  icon.src = "./pics/pngegg.png";
  icon.className = "list-icon";
  spanBrand.textContent =
    item.brand.toUpperCase() +
    " " +
    item.type.toUpperCase() +
    " " +
    item.kw +
    "kw";
  spanPrice.textContent = item.price + "Ft";
  typeContainer.append(icon, spanBrand);

  listDiv.append(listElement);
  smContainer.append(typeContainer, spanPrice);
  listElement.append(smContainer);
  typeContainer.addEventListener("click", () => {
    if (detailsIsOpen === true) {
      let detailsContainer = document.getElementById("remove");
      detailsContainer.remove();
      detailsIsOpen = false;
      createDetailsPage(item, listElement);
      detailsIsOpen = true;
    } else {
      createDetailsPage(item, listElement);
      detailsIsOpen = true;
    }
  });
};

const calculateClima = () => {
  ascOrderList();
  if (formValues.size === "") alert("Kérem adja meg a szoba méretét!");
  if (formValues.func === "") alert("Kérem adja meg a felhasználási módját");

  listIsOpen = true;
  let listDiv = document.createElement("div");
  listDiv.className = "clima-list";
  listDiv.id = "clima-list";
  calculatorContainer.append(listDiv);

  if (formValues.goal === "cheap") {
    return ascOrderedClimas.map((item) => {
      if (
        item.price <= calculateAveragePrice() &&
        item.capacity > formValues.size
      ) {
        createList(listDiv, item);
      }
    });
  }
  if (formValues.goal === "quality") {
    return ascOrderedClimas.map((item) => {
      if (
        item.price >= calculateAveragePrice() &&
        item.capacity >= formValues.size
      ) {
        createList(listDiv, item);
      }
    });
  }
  if (formValues.func === "cooler") {
    return ascOrderedClimas?.map((item) =>
      item.capacity >= formValues.size ? createList(listDiv, item) : null
    );
  }
  if (formValues.func === "both") {
    return ascOrderedClimas?.map((item) =>
      !item.heater && item.capacity >= formValues.size
        ? createList(listDiv, item)
        : null
    );
  }
};

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const handleSubmit = (event, item) => {
  event.preventDefault();
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode({
      "form-name": "contact",
      product: item,
    }),
  })
    .then(() => console.log("successful"))
    .catch((error) => alert(error));
};

closeListBtn.addEventListener("click", () => removeClimalist());

submit.addEventListener("click", () => (!listIsOpen ? calculateClima() : null));
