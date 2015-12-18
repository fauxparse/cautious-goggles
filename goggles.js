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
    /discov/,
    /decid/,
    /ambush/,
    /surpris/,
    /intend/,
    /trap/,
    /persuad/,
    /shoot/,
    /shot/,
    /find/,
    /forc/,
    /announc/,
    /tell/
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

  function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

  function getKeywords(phrase) {
    var tokenise = /[\w'‘’]+/g, match, results = [];

    while (match = tokenise.exec(phrase)) results.push(match[0]);
    return results;
  }

  function censorPageFor(phrase, text) {
    var keywords = getKeywords(phrase),
        regexp = new RegExp(keywords.join('\\W+'), 'i');

    if (regexp.test(text)) {
      console.log('[Cautious Goggles] Page contains possible spoilers for “' + phrase + '”');
      censorElements(document.querySelectorAll("p"));
      return true;
    }
  }

  chrome.storage.sync.get({
    watchlist: 'star wars episode 7\nthe force awakens'
  }, function(items) {
    var phrases = items.watchlist.split('\n'),
        text = document.body.innerText;

    for (var i = 0; i < phrases.length; i++) {
      if (censorPageFor(phrases[i], text)) break;
    }
  });
})();
