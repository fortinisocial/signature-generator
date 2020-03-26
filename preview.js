document.addEventListener("DOMContentLoaded", function() {
  "use strict";

  window.addEventListener("keydown", function(e) {
    e = e || window.event;
    var key = e.which || e.keyCode;
    var ctrl = e.ctrlKey ? e.ctrlKey : key === 17 ? true : false;

    copyToClipboard();

    if (key == 67 && ctrl) {
      parent.postMessage(true, "*");
    }
  });

  const name = document.getElementById("name");
  const teamName = document.getElementById("teamName");
  const cellphone = document.getElementById("cellphone");

  function copyToClipboard() {
    document.designMode = "on";
    document.execCommand("selectAll", false, null);
    document.designMode = "off";
  }

  function updatePreview(evt) {
    if (evt && evt.data && evt.data.copy) {
      copyToClipboard();
      return;
    }

    document.designMode = "on";
    document.execCommand("unselectAll", false, null);
    document.designMode = "off";
    name.innerHTML = evt.data.name;
    teamName.innerHTML = evt.data.teamName;
    cellphone.innerHTML = evt.data.cellphone;
  }

  if (window.addEventListener) {
    window.addEventListener("message", updatePreview, false);
  } else {
    window.attachEvent("onmessage", updatePreview);
  }
});
