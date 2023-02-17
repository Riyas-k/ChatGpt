let prompt = document.getElementById('prompt');
let ask = document.getElementById('ask');
let results = document.getElementById('results');

ask.addEventListener('click',async()=>{
    let question = prompt.value;
    let responseDiv = document.createElement('div');
    responseDiv.classList.add('response');
    let question_text = `<p> ${question} </p>`;
    responseDiv.innerHTML+=question_text;
    responseDiv.innerHTML+='<p> Loading... </p>'
    results.appendChild(responseDiv);

    try {
       let res = await fetch('http://localhost:4000/ask',{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify({prompt:question})
        });
        let response_data = await res.json();
        responseDiv.innerHTML = `${question_text} <p> ${response_data.data}</p>`
       
    } catch (error) {
        responseDiv.innerHTML = `${question_text} <p> Sorry  </p>`
    }
})