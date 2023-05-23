
const inputBox = document.querySelector(".inputBox");
const resultBox = document.querySelector(".result");
const loader = document.querySelector(".typewriter");
const clear = window.getComputedStyle(resultBox, '::before');

const setInput = (response) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = response.data.generations[0].text;
    resultBox.innerHTML = "";
    resultBox.appendChild(div);
}

const loading = () => {
    resultBox.innerHTML = `<div class="typewriter">
    <div class="slide"><i></i></div>
    <div class="paper"></div>
    <div class="keyboard"></div>
</div>`
}

inputBox.onkeyup = (e) => {
    if (inputBox.value != "") {
        if (e.key == 'Enter') {
            const options = {
                method: 'POST',
                url: 'https://api.cohere.ai/v1/generate',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    authorization: 'Bearer 9sE26H8FzyK8ipHeYGuB844dXvHh5DLYpI2vzkEk'
                },
                data: { max_tokens: 650, temperature: 0.9, return_likelihoods: 'NONE', truncate: 'END', prompt: inputBox.value }
            };

            inputBox.value = "";
            loading();

            axios
                .request(options)
                .then(function (response) {
                    console.log(response.data);
                    setInput(response);
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    }

}

resultBox.onclick = () => {
    resultBox.innerHTML = "";
}