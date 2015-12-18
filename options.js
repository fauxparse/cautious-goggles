function saveOptions() {
  var watchlist = document.getElementById('watchlist').value;
  chrome.storage.sync.set({
    watchlist: watchlist
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    watchlist: 'star wars episode 7\nthe force awakens'
  }, function(items) {
    document.getElementById('watchlist').value = items.watchlist;
  });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
