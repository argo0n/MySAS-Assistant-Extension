function sendToastrMessage(title, message, message_type) {
    window.postMessage({ type: 'toastr', title: title, message: message, message_type: message_type}, '*');
}


let captchaImage = document.getElementById('ImgCaptcha');
if (captchaImage === null) {
    console.log("A text captcha image was not detected on this webpage. If this is an error, submit an issue on GitHub.")
} else {
    chrome.storage.sync.get("autofill", function(result) {
        const autofill_is_enabled = result.autofill;
        chrome.storage.sync.get("notifications", function(result) {
            const notifications = result.notifications;
            if (autofill_is_enabled === true) {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                canvas.width = captchaImage.width;
                canvas.height = captchaImage.height;
                ctx.drawImage(captchaImage, 0, 0);
                // Get base64 data of image to send to API
                let imageData = canvas.toDataURL('image/jpeg')
                if (notifications === true) {
                    sendToastrMessage("SP MySAS Captcha Autosolve", "Sending captcha to API to be solved...", "info");
                }
                const currentDomain = window.location.hostname;
                fetch(`https://ocr-api.nogra.xyz/read/${currentDomain}`, {
                    method: 'POST',
                    body: JSON.stringify({image_data: imageData}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error ${response.status}`);
                    }
                    return response.json();
                }).then(data => {
                    let title;
                    let message_type;
                    const confidence = data.confidence ? `${data.confidence}%` : 'unknown';
                    const message = `Captcha solved with a confidence of ${confidence}.`;
                    if (data.confidence >= 75) {
                        message_type = "success";
                        title = "Success";
                    } else {
                        message_type = "warning";
                        title = "Might be inaccurate";
                    }
                    if (notifications === true) {
                        sendToastrMessage(title, message, message_type);
                    }
                    const captchaInput = document.getElementById('captchaText');
                    captchaInput.value = data.result;
                }).catch(error => {
                    let message;
                    if (error instanceof TypeError) {
                        message = 'Could not connect to the server.';
                    } else if (error instanceof SyntaxError) {
                        message = 'Received invalid JSON from the server.';
                    } else {
                        message = error.message;
                    }
                    if (notifications === true) {
                        sendToastrMessage('Captcha solve error', message, 'error');
                    }
                    console.error(error);
                });
            } else {
                if (notifications === true) {
                    sendToastrMessage("Auto-solving is disabled", "Enable solving of captchas through the popup menu when you click on the extension.", 'error');
                }
            }
        })
    });
}
