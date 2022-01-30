document.addEventListener("DOMContentLoaded", () => {
  getBitcoinPrice();
  getKurs();
});

function updatNewData(newValue) {
  document.getElementById(
    "bitcoin"
  ).innerHTML = `1 Bitcion Narxi ${newValue} USD`;
  setTimeout(getBitcoinPrice, 10000);
}

function getBitcoinPrice() {
  fetch("https://blockchain.info/q/24hrprice")
    .then((response) => response.json())
    .then((data) => updatNewData(data))
    .catch(
      (error) =>
        (document.getElementById(
          "bitcoin"
        ).innerHTML = `Xatolik yoz berdi ${error}`)
    );
}

//Valyuta Kursi GET

function updateKurs(data) {
  document.getElementById("uzs").innerHTML = `${data.rates.UZS.toFixed(
    2
  )} So'm`;
  document.getElementById("rubil").innerHTML = `${data.rates.RUB.toFixed(
    2
  )} Rubil`;
  document.getElementById("usd").innerHTML = `${data.rates.USD.toFixed(2)} Usd`;
  document.getElementById("pln").innerHTML = `${data.rates.PLN.toFixed(
    2
  )} złoty`;
  document.getElementById("czk").innerHTML = `${data.rates.CZK.toFixed(
    2
  )} Koruna`;

  const searchFunc = () => {
    let inputValue = document.getElementById("SearchOne").value.toUpperCase();
    let inputResult = data.rates[inputValue];

    if (inputResult == "") {
      document.querySelector(".SearchNarx").innerHTML = ``;
    } else if (inputResult == undefined) {
      document.querySelector(".SearchNarx").innerHTML =
        "Bunday Valyuta topilmadi!!!";
    } else {
      document.querySelector(
        ".SearchNarx"
      ).innerHTML = `1 EUR ${inputResult.toFixed(2)} ${inputValue}`;
    }
  };
  document
    .querySelector(".waves-effect.waves-light.btn")
    .addEventListener("click", () => {
      searchFunc();
    });

  document.querySelector(".vaqt").innerHTML = `Vaqt: ${data.date}`;
}

function getKurs() {
  fetch(
    "http://api.exchangeratesapi.io/v1/latest?access_key=6fe86cec62ff198c5f3a34e53d123e3b"
  )
    .then((response) => response.json())
    .then((data) => updateKurs(data))
    .catch((e) => console.log(`Xatolik yuz berdi ${e}`));
}
