// Injects an event listener for content script to communicate with loaded Toastr library

window.addEventListener('message', function(event) {
    // If the message is a toastr message, show the toastr
    if (event.data.type === 'toastr') {
        switch (event.data.message_type) {
            case 'success':
                toastr.success(event.data.message, event.data.title);
                break;
            case 'error':
                toastr.error(event.data.message, event.data.title);
                break;
            case 'warning':
                toastr.warning(event.data.message, event.data.title);
                break;
            case 'info':
                toastr.info(event.data.message, event.data.title);
                break;
            default:
                toastr.info(event.data.message, event.data.title);
        }
    }
});