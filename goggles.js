(function () {
  var CLASS_NAME = "cautious-goggles-censored";
  
  function censor(el) {
    var parent = el.parentNode,
        censorBlock = el.previousSibling;
        
    while (censorBlock && censorBlock.nodeType != Node.ELEMENT_NODE) {
      censorBlock = censorBlock.previousSibling;
    }

    if (!censorBlock || !censorBlock.classList.contains(CLASS_NAME)) {
      censorBlock = document.createElement("div");
      censorBlock.classList.add(CLASS_NAME);
      parent.insertBefore(censorBlock, el);
    }

    censorBlock.appendChild(el);
  }

  function censorElements(elements) {
    for (var i = 0; i < elements.length; i++) {
      censor(elements[i]);
    }
  }
  
  function uncensor(el) {
    while (el.childNodes.length) {
      el.parentNode.insertBefore(el.firstChild, el);
    }
    el.parentNode.removeChild(el);
  }

  censorElements(document.querySelectorAll("p"));
  
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains(CLASS_NAME)) {
      uncensor(e.target);
    }
  });
})();
