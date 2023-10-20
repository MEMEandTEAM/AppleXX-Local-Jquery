const prompt = 'Hello, GPT-4!';
const api_key = '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';

fetch('https://api.openai.com/v1/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${api_key}`,
  },
  body: JSON.stringify({
    prompt: prompt,
    max_tokens: 60,
    n: 1,
    stop: '\n',
    model: 'text-davinci-002',
  })
})
.then(response => response.json())
.then(data => {
  const responseText = data.choices[0].text.trim();
  console.log(responseText);
})
.catch(error => console.error(error));