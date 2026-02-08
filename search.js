let horses = {};

// JSON読み込み（変更なし）
fetch("horses.json")
  .then(res => res.json())
  .then(data => {
    horses = data;
  });

// ★ここを書き換える
function searchHorse() {
  const input = document.getElementById("searchInput").value.trim();
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "";

  if (!input) {
    resultDiv.textContent = "馬名を入力してください";
    return;
  }

  // 部分一致検索
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

  // 複数ヒット時
  let html = "<h3>候補</h3><ul>";
  matches.forEach(name => {
    html += `<li style="cursor:pointer;color:blue"
              onclick="showHorseDetail('${name}')">
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

// ★新しく追加
function showHorseDetail(name) {
  const horse = horses[name];
  const resultDiv = document.getElementById("result");

  let html = `<h2>${name}</h2>`;

  if (!horse) {
    html += `<p>この馬の情報はまだ登録されていません。</p>`;
    resultDiv.innerHTML = html;
    return;
  }

  if (horse.combinations && horse.combinations.length > 0) {
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
  }

  resultDiv.innerHTML = html;
}
