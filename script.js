const list = document.querySelector("ul");
const showAll = document.querySelector(".showAll-forEach");
const descontALL = document.querySelector(".descount-map");
const totalSum = document.querySelector(".total-reduce");
const veganAll = document.querySelector(".vegan-filter");
const drinkAll = document.querySelector(".drinks-filter");

// botão utilizando a função ForEach, para mostrar todo o Menu de hamburguers

function formatCurrency(value) {
  const formatBr = value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  return formatBr;
}

function buttonShowAll(controller) {
  let myLi = "";
  controller.forEach((product) => {
    myLi += `
    <li>
        <img src="${product.src}" />
        <p>${product.name}</p>
        <p class="price"> ${formatCurrency(product.price)}</p>
    </li>
  `;
  });

  list.innerHTML = myLi;
}

// botão utlizando a função Map, para aplicar desconto de 10% em cada produto.

function buttonDescount() {
  const newValue = menuOptions.map((descount) => ({
    ...descount,
    price: Number((descount.price * 0.9).toFixed(2)),
  }));

  buttonShowAll(newValue);
}

// Botão utilizando a função Reduce, serão aplicadas funções de soma, com descontos e sem

function buttonTotalSum() {
  // função usada para somar todos os produtos, sem desconto

  const result = menuOptions.reduce((cc, curr) => cc + curr.price, 0);

  // função usada para aplicar desconto nos produtos

  const totalWithDescount = menuOptions.reduce(
    (cc, curr) => cc + curr.price * 0.9,
    0,
  );

  // função usada para somar todos os veganos, sem desconto

  const totalVegan = menuOptions.reduce(
    (cc, curr) => (curr.vegan === true ? cc + curr.price : cc),
    0,
  );

  // const que possui os h4 que serão mostrado para o usuário, aplicando todas as funções acima:

  list.innerHTML = `
  <h4> O valor total sem desconto é: <br/> ${formatCurrency(result)} </h4>

  <h4> O valor total com desconto é: ${formatCurrency(totalWithDescount)} </h4>

   <h4> O valor total dos veganos sem desconto é: ${formatCurrency(totalVegan)} </h4>
   `;
}

// Button utilizando a função filter, para exibir somente os produtos veganos

function buttonVegan() {
  const vegan = menuOptions.filter((productVegan) => productVegan.vegan);

  buttonShowAll(vegan);
}

// Button utilizando a função filter, para exibir somente as bebidas

function buttonDrinks() {
  const drinks = menuOptions.filter((product) => product.refreshment);
  buttonShowAll(drinks);
}

showAll.addEventListener("click", () => buttonShowAll(menuOptions));
descontALL.addEventListener("click", buttonDescount);
totalSum.addEventListener("click", buttonTotalSum);
veganAll.addEventListener("click", buttonVegan);
drinkAll.addEventListener("click", buttonDrinks);
