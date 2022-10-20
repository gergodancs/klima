const climas = [
  {
    brand: "tcl",
    type: "elite",
    kw: 2.6,
    price: "219900",
    cooler: true,
    heater: false,
    both: false,
    capacity: 22,
  },
  {
    brand: "tcl",
    type: "thermo - x",
    kw: 2.6,
    price: 249900,
    cooler: true,
    heater: true,
    both: true,
    capacity: 22,
  },
  {
    brand: "tcl",
    type: "fresh-in",
    kw: 2.7,
    price: 309900,
    cooler: true,
    heater: true,
    both: true,
    capacity: 22,
  },
];

let listIsOpen = false;

let formValues = {
  func: "",
  goal: "",
  size: "",
};

const functionSelect = document.getElementById("function");
const goalSelect = document.getElementById("goal");
const sizeSelect = document.getElementById("place");
const submit = document.getElementById("submit");
const calculatorContainer = document.getElementById("calculator");

functionSelect.addEventListener("focus", () => {
  if (listIsOpen) {
    document.querySelector(".clima-list").remove();
    listIsOpen = false;
  }
});

functionSelect.addEventListener("change", (e) => {
  if (listIsOpen) document.getElementsByClassName("clima-list").remove();
  formValues.func = e.target.value;
  console.log({ formValues });
});
goalSelect.addEventListener("change", (e) => {
  formValues.goal = e.target.value;
  console.log({ formValues });
});
sizeSelect.addEventListener("input", (e) => {
  formValues.size = e.target.value;
  console.log({ formValues });
});

const createList = (listDiv, item) => {
  let spanBrand = document.createElement("span");
  let spanPrice = document.createElement("span");
  let listElement = document.createElement("li");
  let icon = document.createElement("img");
  let typeContainer = document.createElement("div");
  icon.src = "/pics/pngegg.png";
  icon.className = "list-icon";
  spanBrand.textContent =
    item.brand.toUpperCase() + " " + item.type.toUpperCase();
  spanPrice.textContent = item.price + "Ft";
  typeContainer.append(icon, spanBrand);

  listDiv.append(listElement);
  listElement.append(typeContainer, spanPrice);
};

const calculateClima = () => {
  listIsOpen = true;
  let listDiv = document.createElement("div");
  listDiv.className = "clima-list";
  calculatorContainer.append(listDiv);
  if (formValues.func === "cooler") {
    listIsOpen = true;
    return climas.map((item) => {
      if (item.cooler === true) {
        createList(listDiv, item);
      }
    });
  }
  if (formValues.func === "both") {
    listIsOpen = true;
    return climas.map((item) => {
      if (item.both === true) {
        createList(calculatorContainer, item);
      }
    });
  }
};

submit.addEventListener("click", () => {
  if (!listIsOpen) return calculateClima();
});
