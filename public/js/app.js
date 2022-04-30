function addNewAdmin() {
    const addAdminButton = $('#add-admin-btn');
    const emailInput = $('#email');
    const businessInput = $('#business');
    const spinner = $('button .spinner-grow');
    const buttonText = $('.button-text')
    const statusBar = $('#status-bar');

    if (addAdminButton) {
        addAdminButton.click(addAdminClickHandler);
    }

    async function addAdminClickHandler(e) {
        spinner.removeClass('d-none');
        buttonText.text('Adding...');
        addAdminButton.attr('disabled', 1);
        statusBar.addClass('invisible').removeClass('alert-success').removeClass('alert-danger');

        const response = await fetch('/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: emailInput.val(),
                businessId: Number(businessInput.val()),
            }),
        });

        spinner.addClass('d-none');
        buttonText.text('Add');
        addAdminButton.attr('disabled', false);
        statusBar.removeClass('invisible').addClass('visible');

        if (response.status !== 200) {
            statusBar.addClass('alert-danger').html('Request failed with status code ' + response.status);

            return;
        }

        emailInput.val('');
        businessInput.val('Select business');
        statusBar.addClass('alert-success').html(await getTxHashSuccessMessage(response));
    }
}

function generateKeypair() {
    const generateKeyButton = $('#generate-key-btn');
    const spinner = $('#generate-key-btn .spinner-grow');
    const buttonText = $('#generate-key-btn .button-text')
    const statusBar = $('#status-bar');
    const keypairContent = $('#keypair');

    if (generateKeyButton) {
        generateKeyButton.click(generateClickHandler);
    }

    async function generateClickHandler(e) {
        spinner.removeClass('d-none');
        buttonText.text('Generating...');
        generateKeyButton.attr('disabled', 1);
        statusBar.addClass('invisible').removeClass('alert-success').removeClass('alert-danger');
        keypairContent.html('');

        const response = await fetch('/device/generate-keypair', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        spinner.addClass('d-none');
        buttonText.text('Generate');
        generateKeyButton.attr('disabled', false);
        statusBar.removeClass('invisible').addClass('visible');

        if (response.status !== 200) {
            statusBar.addClass('alert-danger').html('Request failed with status code ' + response.status);

            return;
        }

        const json = await response.json();

        statusBar.addClass('alert-success').html('Key generated successfully! Do NOT share it with anyone.');
        keypairContent.html(
            `<p>Address: ${json.address}</p>
            <hr/>
            <p>Private key: ${json.privateKey}</p>`
        );
    }
}

function addNewDevice() {
    const addDeviceButton = $('#add-device-btn');
    const addressInput = $('#device-address');
    const spinner = $('#add-device-btn .spinner-grow');
    const buttonText = $('#add-device-btn .button-text')
    const statusBar = $('#status-bar');

    if (addDeviceButton) {
        addDeviceButton.click(addDeviceClickHandler);
    }

    async function addDeviceClickHandler(e) {
        spinner.removeClass('d-none');
        buttonText.text('Adding...');
        addDeviceButton.attr('disabled', 1);
        statusBar.addClass('invisible').removeClass('alert-success').removeClass('alert-danger');

        const response = await fetch('/device', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address: addressInput.val(),
            }),
        });

        spinner.addClass('d-none');
        buttonText.text('Add');
        addDeviceButton.attr('disabled', false);
        statusBar.removeClass('invisible').addClass('visible');

        if (response.status !== 200) {
            statusBar.addClass('alert-danger').html('Request failed with status code ' + response.status);

            return;
        }

        addressInput.val('');
        statusBar.addClass('alert-success').html(await getTxHashSuccessMessage(response));
    }
}

function addNewEvent() {
    const sendEventButton = $('#send-event-btn');
    const objectInput = $('#object-id');
    const valueInput = $('#value');
    const eventTypeInput = $('#event-type');
    const spinner = $('#send-event-btn .spinner-grow');
    const buttonText = $('#send-event-btn .button-text')
    const statusBar = $('#status-bar');

    if (sendEventButton) {
        sendEventButton.click(sendEventClickHandler);
    }

    async function sendEventClickHandler(e) {
        spinner.removeClass('d-none');
        buttonText.text('Sending...');
        sendEventButton.attr('disabled', 1);
        statusBar.addClass('invisible').removeClass('alert-success').removeClass('alert-danger');

        const response = await fetch('/iot/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                objectId: objectInput.val(),
                eventType: Number(eventTypeInput.val()),
                value: valueInput.val(),
            }),
        });

        spinner.addClass('d-none');
        buttonText.text('Add');
        sendEventButton.attr('disabled', false);
        statusBar.removeClass('invisible').addClass('visible');

        if (response.status !== 200) {
            statusBar.addClass('alert-danger').html('Request failed with status code ' + response.status);

            return;
        }

        objectInput.val('');
        valueInput.val('');
        eventTypeInput.val('Select event type');
        statusBar.addClass('alert-success').html(await getTxHashSuccessMessage(response));
    }
}

async function getTxHashSuccessMessage(response) {
    const txHash = (await response.json()).txHash;
    const txUrl = `https://rinkeby.etherscan.io/tx/` + txHash;

    return `Success! Transaction hash: <a href="${txUrl}">${txHash}</a>`;
}

$(document).ready(function () {
    addNewAdmin();
    generateKeypair();
    addNewDevice();
    addNewEvent();
});
