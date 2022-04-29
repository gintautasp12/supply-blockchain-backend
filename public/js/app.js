function addNewAdmin() {
    const addAdminButton = $('#add-admin-btn');
    const emailInput = $('#email');
    const businessInput = $('#business');
    const spinner = $('button .spinner-grow');
    const buttonSpan = $('.button-text')
    const statusBar = $('#status-bar');

    if (addAdminButton) {
        addAdminButton.click(addAdminClickHandler);
    }

    async function addAdminClickHandler(e) {
        spinner.removeClass('d-none');
        buttonSpan.text('Adding...');
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
        buttonSpan.text('Add');
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

async function getTxHashSuccessMessage(response) {
    const txHash = (await response.json()).txHash;
    const txUrl = `https://rinkeby.etherscan.io/tx/` + txHash;

    return `Success! Transaction hash: <a href="${txUrl}">${txHash}</a>`;
}

$(document).ready(function () {
    addNewAdmin();
    generateKeypair();
});
