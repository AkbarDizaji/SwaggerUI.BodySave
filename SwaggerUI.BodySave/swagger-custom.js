document.addEventListener('DOMContentLoaded', () => {
    (function () {
        console.log('Custom Swagger UI script loaded');

        // Function to create or update the buttons
        function updateButtons() {
            const endpoints = document.querySelectorAll('.opblock');
            endpoints.forEach((endpoint, index) => {
                const tryOutButton = endpoint.querySelector('.btn.try-out__btn');
                const customButtons = endpoint.querySelectorAll('.btn.custom-copy, .btn.custom-paste');

                if (tryOutButton) {
                    if (tryOutButton.textContent.trim().toLowerCase() === 'cancel') {
                        // Show custom buttons if they exist, or create them if they don't
                        if (customButtons.length === 0) {
                            createCustomButtons(endpoint, index, tryOutButton);
                        } else {
                            customButtons.forEach(btn => btn.style.display = 'inline-block');
                        }
                    } else {
                        // Hide custom buttons
                        customButtons.forEach(btn => btn.style.display = 'none');
                    }
                }
            });
        }

        // Function to create the custom buttons
        function createCustomButtons(endpoint, index, tryOutButton) {
            // Create the "Copy to Storage" button
            const copyButton = document.createElement('button');
            copyButton.textContent = 'Copy to Storage';
            copyButton.className = 'btn custom-copy';
            copyButton.onclick = function () {
                const textArea = endpoint.querySelector('textarea.body-param__text');
                if (textArea) {
                    localStorage.setItem(`endpointText${index}`, textArea.value);
                    alert('Content copied to storage.');
                    console.log(`Copied content: ${textArea.value}`);
                } else {
                    console.error('Textarea not found for copying');
                }
            };

            // Create the "Paste from Storage" button
            const pasteButton = document.createElement('button');
            pasteButton.textContent = 'Paste from Storage';
            pasteButton.className = 'btn custom-paste';
            pasteButton.onclick = function () {
                const textArea = endpoint.querySelector('textarea.body-param__text');
                if (textArea) {
                    const storedValue = localStorage.getItem(`endpointText${index}`);
                    if (storedValue) {
                        textArea.value = storedValue;
                        textArea.textContent = storedValue;
                        textArea.innerHTML = storedValue;
                        textArea.storedValue = storedValue;
                        // Trigger input event to ensure the value is rendered properly
                        const event = new Event('input', {
                            bubbles: true,
                            cancelable: true,
                        });
                        textArea.dispatchEvent(event);
                        alert('Content pasted from Storage.');
                        console.log(`Pasted content: ${storedValue}`);
                    } else {
                        alert('No content found in storage.');
                    }
                } else {
                    console.error('Textarea not found for pasting');
                }
            };

            // Insert the buttons beside the "Cancel" button
            tryOutButton.parentNode.insertBefore(copyButton, tryOutButton.nextSibling);
            tryOutButton.parentNode.insertBefore(pasteButton, copyButton.nextSibling);
        }

        // Observe changes to the DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length || mutation.removedNodes.length) {
                    updateButtons();
                }
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });

        // Initial call to update buttons when the script loads
        updateButtons();
    })();
});
