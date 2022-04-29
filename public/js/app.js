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
        const txHash = (await response.json()).txHash;
        const txUrl = `https://rinkeby.etherscan.io/tx/` + txHash;
        statusBar
            .addClass('alert-success')
            .html(`Success! Transaction hash: <a href="${txUrl}">${txHash}</a>`);
    }
}

$(document).ready(function () {
    addNewAdmin();
});
