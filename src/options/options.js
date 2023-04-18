document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.sync.get(["autofill", "notifications"], function(items) {
        document.getElementById("autofill-toggle").checked = items.autofill;
        document.getElementById("notifications-toggle").checked = items.notifications;
    });

    document.getElementById("autofill-toggle").addEventListener("change", function() {
        chrome.storage.sync.set({ autofill: this.checked });
    });

    document.getElementById("notifications-toggle").addEventListener("change", function() {
        chrome.storage.sync.set({ notifications: this.checked });
    });
});