// 馬データ
const horsesData = {
  "アグネスタキオン": {
    "combinations": [
      {
        "名馬配合ランク": "1",
        "母馬": "エリモピクシー",
        "名馬スキル": "逆襲"
      },
      {
        "名馬配合ランク": "1",
        "母馬": "オースミハルカ",
        "名馬スキル": "逃亡者"
      },
      {
        "名馬配合ランク": "3",
        "母馬": "スカーレットブーケ",
        "名馬スキル": "真紅の輝き(逃亡者)"
      },
      {
        "名馬配合ランク": "1",
        "母馬": "ビワハイジ",
        "名馬スキル": "勝負根性アップ"
      }
    ]
  },
  "エリモピクシー": {
    "combinations": [
      {
        "名馬配合ランク": "1",
        "母馬": "ウインドインハーヘア",
        "名馬スキル": "究極進化"
      }
    ]
  },
  "ビワハイジ": {
    "combinations": [
      {
        "名馬配合ランク": "2",
        "母馬": "オリエンタルアート",
        "名馬スキル": "暴君"
      }
    ]
  }
};

// 検索機能
function searchHorse() {
  const input = document.getElementById("searchInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!input) {
    resultDiv.innerHTML = "<p>馬名を入力してください</p>";
    return;
  }

  // 部分一致検索
  const matches = Object.keys(horsesData).filter(name =>
    name.includes(input)
  );

  if (matches.length === 0) {
    resultDiv.innerHTML = "<p>該当する馬が見つかりません</p>";
    return;
  }

  // 1件のみヒット → 詳細表示
  if (matches.length === 1) {
    showHorseDetail(matches[0]);
    return;
  }

  // 複数ヒット → 候補表示
  let html = "<h3>候補</h3><ul>";
  matches.forEach(name => {
    html += `<li><span class="horse-name" onclick="selectHorse('${name}')">${name}</span></li>`;
  });
  html += "</ul>";
  resultDiv.innerHTML = html;
}

// 候補から馬を選択
function selectHorse(name) {
  document.getElementById("searchInput").value = name;
  showHorseDetail(name);
}

// 馬の詳細表示
function showHorseDetail(name) {
  const horse = horsesData[name];
  const resultDiv = document.getElementById("result");

  if (!horse) {
    resultDiv.innerHTML = `
      <h2>${name}</h2>
      <p style="color:red">この馬の配合情報はまだ登録されていません</p>
    `;
    return;
  }

  let html = `<h2>${name}</h2>`;
  html += "<h3>配合・スキル一覧</h3>";

  horse.combinations.forEach(combo => {
    html += `
      <div class="combination-item">
        <div>配合ランク：<span class="rank">${combo["名馬配合ランク"]}</span></div>
        <div>母馬：<span class="horse-name" onclick="selectHorse('${combo["母馬"]}')">${combo["母馬"]}</span></div>
        <div>スキル：<span class="skill">${combo["名馬スキル"]}</span></div>
      </div>
    `;
  });

  resultDiv.innerHTML = html;
}

// Enterキーでも検索できるように
document.getElementById("searchInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    searchHorse();
  }
});
