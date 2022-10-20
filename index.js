const climas = [
  {
    brand: "tcl",
    type: "elite",
    kw: 2.6,
    price: 219900,
    heater: false,
    capacity: 22,
  },
  {
    brand: "tcl",
    type: "thermo - x",
    kw: 2.6,
    price: 249900,
    heater: true,
    capacity: 22,
  },
  {
    brand: "tcl",
    type: "fresh-in",
    kw: 2.7,
    price: 309900,
    heater: true,
    capacity: 22,
  },
  {
    brand: "cascade",
    type: "bora",
    kw: 3.2,
    price: 264900,
    heater: false,
    capacity: 35,
  },
  {
    brand: "cascade",
    type: "vision nordic",
    kw: 5.2,
    price: 436900,
    heater: true,
    capacity: 48,
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

functionSelect.addEventListener("focus", () => {
  if (listIsOpen) {
    document.querySelector(".clima-list").remove();
    listIsOpen = false;
  }
});
goalSelect.addEventListener("focus", () => {
  if (listIsOpen) {
    document.querySelector(".clima-list").remove();
    listIsOpen = false;
  }
});
sizeSelect.addEventListener("focus", () => {
  if (listIsOpen) {
    document.querySelector(".clima-list").remove();
    listIsOpen = false;
  }
});

functionSelect.addEventListener("change", (e) => {
  formValues.func = e.target.value;
});
goalSelect.addEventListener("change", (e) => {
  formValues.goal = e.target.value;
});
sizeSelect.addEventListener("input", (e) => {
  formValues.size = e.target.value;
});

const createList = (listDiv, item) => {
  let spanBrand = document.createElement("span");
  let spanPrice = document.createElement("span");
  let listElement = document.createElement("li");
  let icon = document.createElement("img");
  let typeContainer = document.createElement("div");
  icon.src = "./pics/pngegg.png";
  icon.className = "list-icon";
  spanBrand.textContent =
    item.brand.toUpperCase() + " " + item.type.toUpperCase();
  spanPrice.textContent = item.price + "Ft";
  typeContainer.append(icon, spanBrand);

  listDiv.append(listElement);
  listElement.append(typeContainer, spanPrice);
};

const calculateClima = () => {
  ascOrderList();
  if (formValues.size === "") {
    return alert("Kérem adja meg a szoba méretét!");
  }
  listIsOpen = true;
  let listDiv = document.createElement("div");
  listDiv.className = "clima-list";
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
        item.capacity > formValues.size
      ) {
        createList(listDiv, item);
      }
    });
  }
  if (formValues.func === "cooler") {
    return ascOrderedClimas?.map((item) => {
      if (!item.heater && item.capacity > formValues.size) {
        createList(listDiv, item);
      }
    });
  }
  if (formValues.func === "both") {
    return ascOrderedClimas?.map((item) => {
      if (item.capacity > formValues.size) createList(listDiv, item);
    });
  }
};

submit.addEventListener("click", () => {
  if (!listIsOpen) return calculateClima();
});
