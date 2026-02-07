let horses = {};

// JSON読み込み
fetch("horses.json")
  .then(response => response.json())
  .then(data => {
    horses = data;
  });

// 検索処理
function searchHorse() {
  const input = document.getElementById("searchInput").value.trim();
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "";

  if (!horses[input]) {
    resultDiv.textContent = "該当する馬が見つかりません";
    return;
  }

  const horse = horses[input];

  let html = `<h2>${horse.name}</h2>`;
  html += `<p>${horse.profile}</p>`;
  html += `<p>父：${horse.sire}</p>`;

  if (horse.related.length > 0) {
    html += "<h3>関連馬</h3><ul>";
    horse.related.forEach(r => {
      html += `<li>${r}</li>`;
    });
    html += "</ul>";
  }

  resultDiv.innerHTML = html;
}
