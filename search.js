let horses = {};
let loaded = false;

// JSON読み込み
fetch("horses.json")
  .then(res => res.json())
  .then(data => {
    horses = data;
    loaded = true;
    console.log("JSON読込完了:", Object.keys(horses));
  })
  .catch(err => {
    console.error("JSON読み込み失敗", err);
  });

function searchHorse() {
  if (!loaded) {
    alert("データ読込中です。少し待ってください。");
    return;
  }

  const input = document.getElementById("searchInput").value.trim();
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "";

  if (!input) {
    resultDiv.textContent = "馬名を入力してください";
    return;
  }

  const matches = Object.keys(horses).filter(name =>
    name.includes(input)
  );

  if (matches.length === 0) {
    resultDiv.textContent = "該当する馬が見つかりません";
    return;
  }

  if (matches.length === 1) {
    showHorseDetail(matches[0]);
    return;
  }

  let html = "<h3>候補</h3><ul>";
  matches.forEach(name => {
    html += `
      <li style="cursor:pointer;color:blue"
          onclick="jumpToHorse(${JSON.stringify(name)})">
        ${name}
      </li>`;
  });
  html += "</ul>";

  resultDiv.innerHTML = html;
}

function jumpToHorse(name) {
  const input = document.getElementById("searchInput");
  input.value = name;
  searchHorse();
}

function showHorseDetail(name) {
  const horse = horses[name];
  const resultDiv = document.getElementById("result");

  let html = `<h2>${name}</h2>`;

  if (!horse) {
    html += `<p>この馬の情報はまだ登録されていません。</p>`;
    resultDiv.innerHTML = html;
    return;
  }

  html += "<h3>配合・スキル一覧</h3><ul>";

  horse.combinations.forEach(c => {
    html += `
      <li>
        配合ランク：${c["名馬配合ランク"]}<br>
        母馬：
        <span style="color:blue; cursor:pointer; text-decoration:underline"
              onclick="jumpToHorse(${JSON.stringify(c["母馬"])})">
          ${c["母馬"]}
        </span><br>
        スキル：${c["名馬スキル"]}
      </li>
      <hr>
    `;
  });

  html += "</ul>";
  resultDiv.innerHTML = html;
}
