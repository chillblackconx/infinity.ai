<textarea id="input"></textarea>
<button onclick="sendToAI()">Envoyer</button>
<div id="response"></div>

<script>
async function sendToAI() {
  const input = document.getElementById("input").value;
  const resDiv = document.getElementById("response");
  resDiv.innerText = "💬 Réflexion en cours...";

  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: input }] }]
      })
    });
    const data = await res.json();
    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || "❌ Aucune réponse";
    resDiv.innerText = output;
  } catch(e) {
    resDiv.innerText = "⚠️ Erreur de connexion";
  }
}
</script>
