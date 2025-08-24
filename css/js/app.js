document.addEventListener("DOMContentLoaded", () => {
  const $ = s => document.querySelector(s);

  let accessToken = null;
  let refreshToken = null;
  let accExp = null;
  let skew = 1.5 * 1000;
  let autoRefreshEnabled = false;

  const log = (...a) => {
    const out = $('#logOut');
    out.textContent += "\n" + a.join(" ");
    out.scrollTop = out.scrollHeight;
  };

  const updateUI = () => {
    $('#accExp').textContent = accExp ? new Date(accExp).toLocaleTimeString() : "—";
    $('#hasRef').innerHTML = refreshToken 
      ? `<span class="dot ok"></span>Sí` 
      : `<span class="dot err"></span>No`;
    $('#tokenOut').textContent = JSON.stringify({accessToken, refreshToken}, null, 2);
    $('#btnToggleRefresh').textContent = autoRefreshEnabled 
      ? "Auto-refresh: ON" 
      : "Auto-refresh: OFF";
    $('#btnToggleRefresh').className = autoRefreshEnabled ? "ok" : "warn";
  };

  // Auto refresh con interval
  setInterval(() => {
    if (!autoRefreshEnabled || !accExp) return;
    if (Date.now() + skew > accExp) {
      log("🔄 Auto-refresh...");
      refresh();
    }
  }, 1000);

  async function login() {
    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: $('#username').value,
          password: $('#password').value,
          expiresInMins: parseInt($('#expMins').value) || 1
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || res.status);

      accessToken = data.accessToken;
      refreshToken = data.refreshToken;
      accExp = Date.now() + (data.expiresIn * 1000);
      $('#loginOut').textContent = JSON.stringify(data, null, 2);
      log("✔️ Login exitoso");
      updateUI();
    } catch (e) {
      $('#loginOut').textContent = "❌ Login error: " + e.message;
      log("❌ Login error", e.message);
    }
  }

  async function refresh() {
    try {
      const res = await fetch('https://dummyjson.com/auth/refresh', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({refreshToken, expiresInMins: 1})
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || res.status);

      accessToken = data.accessToken;
      accExp = Date.now() + (data.expiresIn * 1000);
      $('#tokenOut').textContent = JSON.stringify({accessToken, refreshToken}, null, 2);
      log("✔️ Token refrescado");
      updateUI();
    } catch (e) {
      log("❌ Refresh error", e.message);
    }
  }

  async function callMe() {
    try {
      const res = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {Authorization: 'Bearer ' + accessToken}
      });
      const data = await res.json();
      $('#meOut').textContent = JSON.stringify(data, null, 2);
      log(`➡️ /auth/me -> ${res.status}`);
    } catch (e) {
      $('#meOut').textContent = "❌ Error: " + e.message;
      log("❌ Error en /me", e.message);
    }
  }

  // 🔗 Listeners
  $('#btnLogin').addEventListener('click', login);
  $('#btnMe').addEventListener('click', callMe);
  $('#btnForceExpire').addEventListener('click', () => {
    accExp = Date.now() - 1000;
    updateUI();
    log("⚡ Access token marcado como expirado");
  });
  $('#btnToggleRefresh').addEventListener('click', () => {
    autoRefreshEnabled = !autoRefreshEnabled;
    updateUI();
    log(`Auto-refresh ${autoRefreshEnabled ? "activado" : "desactivado"}`);
  });

  updateUI();
});
