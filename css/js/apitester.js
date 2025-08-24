document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
});

const safeJSON = txt => {
  try { return JSON.parse(txt); } catch { return txt; }
};

$('#btnSend').addEventListener('click', async () => {
  const url = $('#reqUrl').value.trim();
  const method = $('#reqMethod').value;
  let headers = {};
  try {
    headers = $('#reqHeaders').value ? JSON.parse($('#reqHeaders').value) : {};
  } catch (e) {
    $('#reqOut').textContent = '❌ Error en headers JSON';
    return;
  }

  let body = null;
  try {
    body = $('#reqBody').value ? JSON.parse($('#reqBody').value) : null;
  } catch (e) {
    $('#reqOut').textContent = '❌ Error en body JSON';
    return;
  }

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: method !== 'GET' && body ? JSON.stringify(body) : undefined
    });

    const text = await res.text();
    const output = {
      status: res.status,
      headers: Object.fromEntries(res.headers.entries()),
      body: safeJSON(text)
    };
    $('#reqOut').textContent = JSON.stringify(output, null, 2);
    log(`➡️ ${method} ${url} -> ${res.status}`);
  } catch (e) {
    $('#reqOut').textContent = 'ERROR: ' + e.message;
    log('❌ Error API Tester:', e.message);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const $ = s => document.querySelector(s);

  const safeJSON = txt => {
    try { return JSON.parse(txt); } catch { return txt; }
  };

  $('#btnSend').addEventListener('click', async () => {
    const url = $('#reqUrl').value.trim();
    const method = $('#reqMethod').value;
    let headers = {};
    try {
      headers = $('#reqHeaders').value ? JSON.parse($('#reqHeaders').value) : {};
    } catch (e) {
      $('#reqOut').textContent = '❌ Error en headers JSON';
      return;
    }

    let body = null;
    try {
      body = $('#reqBody').value ? JSON.parse($('#reqBody').value) : null;
    } catch (e) {
      $('#reqOut').textContent = '❌ Error en body JSON';
      return;
    }

    try {
      const res = await fetch(url, {
        method,
        headers,
        body: method !== 'GET' && body ? JSON.stringify(body) : undefined
      });

      const text = await res.text();
      const output = {
        status: res.status,
        headers: Object.fromEntries(res.headers.entries()),
        body: safeJSON(text)
      };
      $('#reqOut').textContent = JSON.stringify(output, null, 2);
    } catch (e) {
      $('#reqOut').textContent = '❌ ERROR: ' + e.message;
    }
  });
});