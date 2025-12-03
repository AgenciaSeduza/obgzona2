exports.handler = async (event) => {

  // ✅ Tratamento do CORS
  const headers = {
    "Access-Control-Allow-Origin": "https://zonaoculta.shop", // sua pressel
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  // ✅ Pré-verificação de segurança do navegador (preflight)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "Preflight OK"
    };
  }

  try {
    const data = JSON.parse(event.body);

    const response = await fetch("https://business-api.tiktok.com/open_api/v1.3/event/track/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": "COLE_AQUI_SEU_ACCESS_TOKEN" // depois substitui
      },
      body: JSON.stringify(data)
    });

    const result = await response.text();

    return {
      statusCode: 200,
      headers,
      body: result
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
