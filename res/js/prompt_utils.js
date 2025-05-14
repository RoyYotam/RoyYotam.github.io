
function load_key() {
    const loadBtn = document.getElementById('load-btn');
    loadBtn.textContent = 'Loaded!';
    loadBtn.disabled = true;

    const apiKey = document.getElementById("apiKey");
    apiKey.disabled = true;

    keyLoaded = true; // allow game interaction
}

async function sendOpenAIMessage(apiKey, inputMessage) {
      const endpoint = "https://api.openai.com/v1/responses";
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      };

      const body = JSON.stringify({
          model: "gpt-4o",
          input: inputMessage,
          temperature: 0.2,
          // max_tokens: 10,
      });

      const response = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        body: body
      });

      if (!response.ok) {
          console.log(response.json());
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return [data.output[0].content[0].text, data.output[0].id];
    }

async function runTurn(userTurn) {
    const apiKey = document.getElementById("apiKey").value.trim();
    const output = document.getElementById("output");
    output.textContent = "Running...\n";

    let reply = '';

    try {
        reply = await sendOpenAIMessage(apiKey, userTurn);
        output.textContent += `\n=== Turn ===\n${reply[0]}\n`;
    } catch (err) {
        output.textContent += `\nError during turn: ${err.message}\n`;
    }

    return reply;
}