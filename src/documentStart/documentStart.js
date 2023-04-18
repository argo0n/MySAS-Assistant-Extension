var jquery_element = document.createElement('script');
jquery_element.src = chrome.runtime.getURL("external/jquery-3.6.4.min.js");
jquery_element.onload = function() {
    this.remove();
};

// Create Toastr JS Element
var toastr_element = document.createElement('script');
toastr_element.src = chrome.runtime.getURL('external/toastr.min.js');
toastr_element.onload = function() {
    this.remove();
};

var eventlistener = document.createElement('script');
eventlistener.src = chrome.runtime.getURL('src/contentScript/InjectEventListener.js');
eventlistener.onload = function() {
    this.remove;
}

// Create Toastr CSS Element
var toastr_css = document.createElement("link");
toastr_css.href = chrome.runtime.getURL("external/toastr.css");
toastr_css.type = "text/css";
toastr_css.rel = "stylesheet";

// Append the link element to the head or root element
(document.head || document.documentElement).appendChild(toastr_css);
(document.head || document.documentElement).appendChild(jquery_element);
(document.head || document.documentElement).appendChild(toastr_element);
(document.head || document.documentElement).appendChild(eventlistener);