const climas = [
  {
    brand: "tcl",
    type: "elite",
    kw: 2.6,
    price: 219900,
    heater: false,
    capacity: 22,
    energy: "A++",
    guarntie: "3év",
    src: "./pics/1.png",
    description: `Matt panelje kiemeli a többi klíma közül.
    A légbefúvás olyan egyneletes, mint egy lágy fuvallat, a 4 irányú légtereléssel együtt kiemelkedö a komfortérzet akár hüt akár fűt. 4in1 szürö gondoskodik a levegö tisztaságáról. A beépített wifi-nek a köszönhetöen akár okos otthonba is kapcsolható.`,
  },
  {
    brand: "tcl",
    type: "thermo - x",
    kw: 2.6,
    price: 249900,
    heater: true,
    capacity: 22,
    src: "./pics/2.png",
    energy: "A++",
    guarntie: "3év",
    description: `Matt panelje kiemeli a többi klíma közül.
    A légbefúvás olyan egyneletes, mint egy lágy fuvallat, a 4 irányú légtereléssel együtt kiemelkedö a komfortérzet akár hüt akár fűt. 4in1 szürö gondoskodik a levegö tisztaságáról. A beépített wifi-nek a köszönhetöen akár okos otthonba is kapcsolható.`,
  },
  {
    brand: "tcl",
    type: "fresh-in",
    kw: 2.7,
    price: 309900,
    heater: true,
    capacity: 22,
    src: "./pics/3.png",
    energy: "A++",
    guarntie: "3év",
    description: `Matt panelje kiemeli a többi klyma közül.
    A légbefúvás olyan egyneletes, mint egy lágy fuvallat, a 4 irányú légtereléssel együtt kiemelkedö a komfortérzet akár hüt akár fűt. 4in1 szürö gondoskodik a levegö tisztaságáról. A beépített wifi-nek a köszönhetöen akár okos otthonba is kapcsolható.`,
  },
  {
    brand: "cascade",
    type: "bora",
    kw: 3.2,
    price: 264900,
    heater: false,
    capacity: 35,
    src: "./pics/1.png",
    energy: "A++",
    guarntie: "3év",
    description: `Matt panelje kiemeli a többi klíma közül.
    A légbefúvás olyan egyneletes, mint egy lágy fuvallat, a 4 irányú légtereléssel együtt kiemelkedö a komfortérzet akár hüt akár fűt. 4in1 szürö gondoskodik a levegö tisztaságáról. A beépített wifi-nek a köszönhetöen akár okos otthonba is kapcsolható.`,
  },
  {
    brand: "cascade",
    type: "vision nordic",
    kw: 5.2,
    price: 436900,
    heater: true,
    capacity: 48,
    src: "./pics/2.png",
    energy: "A++",
    guarntie: "3év",
    description: `Matt panelje kiemeli a többi klima közül.
    A légbefúvás olyan egyneletes, mint egy lágy fuvallat, a 4 irányú légtereléssel együtt kiemelkedö a komfortérzet akár hüt akár fűt. 4in1 szürö gondoskodik a levegö tisztaságáról. A beépített wifi-nek a köszönhetöen akár okos otthonba is kapcsolható.`,
  },
];

let listIsOpen = false;
let detailsIsOpen = false;

let formValues = {
  func: "cooler",
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
  let orderDiv = document.createElement("div");
  orderDiv.className = "order-container";
  let price = document.createElement("span");
  price.innerText = `Ára: ${item.price}Ft`;
  let orderBtn = document.createElement("button");
  orderBtn.className = "order-btn";
  orderBtn.innerHTML = "Érdekel!";
  let closeBtn = document.createElement("button");
  closeBtn.innerHTML = "Bezár";
  orderDiv.append(orderBtn, closeBtn);
  listContainer.append(energy, guarntie, price, description, orderDiv);
  closeBtn.addEventListener("click", () => {
    let detailsContainer = document.getElementById("remove");
    detailsContainer.remove();
    console.log("works");
    detailsIsOpen = false;
  });
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
    item.brand.toUpperCase() + " " + item.type.toUpperCase();
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

submit.addEventListener("click", () => (!listIsOpen ? calculateClima() : null));
