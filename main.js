(() => {
    const sendBtn = document.getElementById('send');

    sendBtn.addEventListener('click', event => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const body = document.getElementById('body').value;
        const jsonData = JSON.stringify({ name, email, body });
    });

})();