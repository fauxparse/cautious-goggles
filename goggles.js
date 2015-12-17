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
      censorBlock.addEventListener("click", function(e) {
        uncensor(e.target);
      });
      parent.insertBefore(censorBlock, el);
    }

    censorBlock.appendChild(el);
  }

  var SPOILERS = [
    /show/,
    /finale/,
    /kill/,
    /die/,
    /death/,
    /murder/,
    /turn out/,
    /find out/,
    /reveal/,
    /dead/,
    /discover/,
    /decide/,
    /ambush/,
    /surprise/,
    /intend/,
    /trap/,
    /persuade/,
    /shoot/,
    /shot/,
    /find/
  ];

  function containsSpoilers(element) {
    var stemmed = Porter2.stemAll(element.innerText);

    for (var i = 0; i < SPOILERS.length; i++) {
      if (stemmed.match(SPOILERS[i])) return true;
    }

    return false;
  }

  function censorElements(elements) {
    for (var i = 0; i < elements.length; i++) {
      if (containsSpoilers(elements[i])) censor(elements[i]);
    }
  }

  function uncensor(el) {
    while (el.childNodes.length) {
      el.parentNode.insertBefore(el.firstChild, el);
    }
    el.parentNode.removeChild(el);
  }

  censorElements(document.querySelectorAll("p"));
})();
