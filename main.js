const URL = "https://";

(() => {
    const sendBtn = document.getElementById('send');
    const resultOk = document.getElementById('result-ok');
    const resultNg = document.getElementById('result-ng');
    resultOk.hidden = true;
    resultNg.hidden = true;

    sendBtn.addEventListener('click', async event => {
        event.preventDefault();
        resultOk.hidden = true;
        resultNg.hidden = true;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const body = document.getElementById('body').value;
        const jsonData = JSON.stringify({ name, email, body });
        
        try {
            const res = await fetch(URL, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                body: jsonData,
                headers:{
                  'Content-Type': 'application/json; charset=utf-8'
                }
            });
            console.log('Response!!', res.status);
            resultOk.hidden = false;
        } catch (error) {
            console.log(error);
            resultNg.hidden = false;
        }
    });
})();