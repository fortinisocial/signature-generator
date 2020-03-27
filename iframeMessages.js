"use strict";
let iframePreview;
let copy;

function copyToClipboard() {
  iframePreview.focus();
  iframePreview.click();
  iframePreview.contentWindow.postMessage(
    {
      copy: true
    },
    "*"
  );

  copy = document.getElementById("copy");
  copy.setAttribute("class", "selected");
  copy.innerHTML = "Pressione CTRL + C para copiar sua assinatura";
  document.querySelector("body").setAttribute("class", "blocked");
}

function validateInputs(name, cellphone) {
  if (name && typeof name === "string") {
    setTimeout(() => {
      const nameSpaces = name.split(" ");
      const error = document.getElementById("nameError");

      if (nameSpaces.length < 2 || !nameSpaces[1]) {
        return (error.innerHTML =
          "É necessário informar o sobrenome. Ex.: Bruno Carvalho");
      }

      return (error.innerHTML = "");
    }, 400);
  }

  if (cellphone && typeof cellphone === "string") {
    setTimeout(() => {
      const error = document.getElementById("cellError");

      if (cellphone.length !== 13) {
        return (error.innerHTML =
          "O número de celular parece incorreto. Ex.: 31 98661-0770");
      }

      return (error.innerHTML = "");
    }, 400);
  }
}

function updatePreview() {
  const name = document.getElementById("name").value;
  const teamName = document.getElementById("teamName");
  const cellphone = document.getElementById("cellphone").value;

  validateInputs(name, cellphone);

  iframePreview.contentWindow.postMessage(
    {
      name: name,
      teamName: name.match(/Maiara Wenceslau/i)
        ? "Diretora Presidente"
        : teamName.options[teamName.selectedIndex].value,
      cellphone
    },
    "*"
  );
}

function isCopied() {
  const copiedContainer = document.getElementById("copied-container");

  copiedContainer.setAttribute("class", "active");

  setTimeout(() => {
    copy.setAttribute("class", "copied");
    copiedContainer.setAttribute("class", "");
    copy.innerHTML = "Copiado!";
  }, 400);

  setTimeout(() => {
    copy.innerHTML = "Concluir";
    copy.setAttribute("class", "");
  }, 1000);
}

document.addEventListener("DOMContentLoaded", function() {
  if (window.addEventListener) {
    window.addEventListener("message", isCopied, false);
  } else {
    window.attachEvent("onmessage", isCopied);
  }

  iframePreview = document.getElementById("iframePreview");

  document.getElementById("copy").addEventListener("click", function() {
    copyToClipboard();
  });

  document.getElementById("name").addEventListener("input", function() {
    updatePreview();
  });

  document.getElementById("name").addEventListener("focus", function() {
    const name = document.getElementById("name");

    if (!!name.value.match(/Bruno Carvalho/i)) {
      name.value = "";
    }
  });

  document.getElementById("cellphone").addEventListener("focus", function() {
    const cellphone = document.getElementById("cellphone");

    if (!!cellphone.value.match(/31 98661-0770/i)) {
      cellphone.value = "";
    }
  });

  document.getElementById("name").value;

  document.getElementById("cellphone").addEventListener("input", function() {
    const isValidCellphone =
      document.getElementById("cellphone").value.length > 13;
    const formattedValue = document
      .getElementById("cellphone")
      .value.substr(0, 13);

    if (isValidCellphone) {
      document.getElementById("cellphone").value = formattedValue;
    }

    updatePreview();
  });
});
