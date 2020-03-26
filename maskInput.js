"use strict";
//https://pt.stackoverflow.com/questions/348030/como-fazer-um-mask-em-javascript-puro
document.addEventListener("DOMContentLoaded", function() {
  var celMask = "99 99999-9999";
  const cellphone = document.querySelector("#cellphone");
  VMasker(cellphone).maskPattern(celMask);
  cellphone.addEventListener(
    "input",
    inputHandler.bind(undefined, celMask),
    false
  );
});

function inputHandler(mask, event) {
  const target = event.target;
  const rawValue = target.value.replace(/\D/g, "");
  VMasker(target).unMask();
  VMasker(target).maskPattern(mask);
  target.value = VMasker.toPattern(rawValue, mask);
}
