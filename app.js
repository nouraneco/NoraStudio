const STORAGE_KEY = "nora-studio-project-v1";

const screen = {
  mode: "setup",
  active: "概要",
  selectedCharacterId: "",
  selectedTimelineId: "",
  selectedInfoCardId: "",
  selectedPathId: "",
  selectedIssueId: "",
  selectedRoomId: "",
  infoFilter: "すべて",
  reasonZoom: 1,
  showReport: false,
};

const navBase = [
  "概要",
  "キャラクター",
  "真相",
  "タイムライン",
  "情報カード",
  "推理導線",
  "チェック",
];

const icons = {
  概要: "□",
  キャラクター: "◎",
  真相: "◆",
  タイムライン: "≡",
  地図: "⌖",
  情報カード: "▣",
  推理導線: "↔",
  チェック: "✓",
};

const defaultRoomLayouts = {
  "room-hall": { left: 236, top: 34, width: 150, height: 330 },
  "room-study": { left: 406, top: 34, width: 220, height: 150 },
  "room-guest": { left: 406, top: 214, width: 220, height: 150 },
  "room-dining": { left: 36, top: 174, width: 180, height: 140 },
};

const defaultReasonColumns = {
  question: 18,
  info: 250,
  mislead: 482,
  conclusion: 714,
};

let project = loadProject();

function defaultProject() {
  return {
    mapEnabled: false,
    scenario: {
      title: "未定の事件",
      players: 5,
      time: 120,
      setting: "閉ざされた洋館",
      tone: "推理重視",
      summary: "嵐の夜、館の主が書斎で発見される。",
      question: "誰が、なぜ、どのように犯行を行ったのか。",
      notes: "まずは真相と各人物の目的を分けて整理する。",
    },
    characters: [
      {
        id: "char-1",
        kind: "PC",
        name: "綾瀬 真琴",
        publicRole: "館の主の姪",
        privateGoal: "遺産の分配を有利にする",
        secret: "事件当夜、書斎の前を通った",
        winCondition: "真犯人を隠しながら遺産の権利を守る",
        knownFacts: "22時に言い争う声を聞いた",
        misunderstanding: "執事が犯人だと思い込んでいる",
        relationships: "人物3に借金を知られている",
      },
      {
        id: "char-2",
        kind: "PC",
        name: "人物2",
        publicRole: "館の主の古い友人",
        privateGoal: "過去の罪を隠す",
        secret: "時計を止めた",
        winCondition: "過去の罪と犯行を隠す",
        knownFacts: "館の主が過去の証拠を持っていた",
        misunderstanding: "",
        relationships: "館の主に弱みを握られている",
      },
      {
        id: "char-3",
        kind: "PC",
        name: "人物3",
        publicRole: "執事",
        privateGoal: "館を守る",
        secret: "人物1の借金を知っている",
        winCondition: "館の評判を守る",
        knownFacts: "22時15分に書斎近くにいた",
        misunderstanding: "人物1が何か隠していると思っている",
        relationships: "人物1に貸しがある",
      },
      {
        id: "char-4",
        kind: "PC",
        name: "人物4",
        publicRole: "医師",
        privateGoal: "事故説を通す",
        secret: "睡眠薬を持っていた",
        winCondition: "薬品管理の失敗を隠す",
        knownFacts: "館の主は酒を飲んでいた",
        misunderstanding: "事故だと思っている",
        relationships: "館の主の主治医",
      },
      {
        id: "char-5",
        kind: "PC",
        name: "人物5",
        publicRole: "記者",
        privateGoal: "",
        secret: "遺産分配の手紙を読んだ",
        winCondition: "",
        knownFacts: "館の主が誰かを脅していた",
        misunderstanding: "",
        relationships: "人物2を取材している",
      },
    ],
    truth: {
      culprit: "人物2",
      motive: "館の主に過去の罪を暴かれそうになった",
      method: "睡眠薬入りの酒と暖炉の火かき棒",
      opportunity: "22時から22時15分の空白",
      coverUp: "死亡推定時刻をずらすため時計を止めた",
      actualEvents: "22時05分、書斎で口論の末に犯行が起きた。",
      perceptions: "人物1は執事を疑っている。人物4は事故だと思っている。",
      conclusion: "犯人は人物2。決定的な根拠は酒杯の薬品痕と停止した時計。",
      notes: "証拠カードに時計と酒杯を必ず用意する。",
    },
    times: ["21:30", "22:00", "22:15", "22:30", "23:00"],
    locations: [
      { id: "room-hall", name: "廊下", color: "amber", layout: defaultRoomLayouts["room-hall"] },
      { id: "room-study", name: "書斎", color: "teal", layout: defaultRoomLayouts["room-study"] },
      { id: "room-guest", name: "客間", color: "coral", layout: defaultRoomLayouts["room-guest"] },
      { id: "room-dining", name: "食堂", color: "sage", layout: defaultRoomLayouts["room-dining"] },
    ],
    timelineEvents: [
      {
        id: "event-1",
        time: "21:30",
        characterId: "char-1",
        locationId: "room-hall",
        title: "廊下で物音を聞く",
        type: "証言",
        visibility: "公開",
        testimony: "廊下で足音を聞いた",
        misunderstanding: "執事の足音だと思い込む",
        evidenceIds: ["card-3"],
      },
      {
        id: "event-2",
        time: "21:30",
        characterId: "char-2",
        locationId: "room-study",
        title: "館の主と口論",
        type: "事実",
        visibility: "秘匿",
        testimony: "",
        misunderstanding: "",
        evidenceIds: [],
      },
      {
        id: "event-3",
        time: "22:00",
        characterId: "char-2",
        locationId: "room-study",
        title: "書斎へ入る",
        type: "事実",
        visibility: "秘匿",
        testimony: "",
        misunderstanding: "",
        evidenceIds: [],
      },
      {
        id: "event-4",
        time: "22:15",
        characterId: "char-2",
        locationId: "room-study",
        title: "時計を止める",
        type: "事実",
        visibility: "秘匿",
        testimony: "誰にも話していない",
        misunderstanding: "",
        evidenceIds: ["card-1"],
      },
      {
        id: "event-5",
        time: "22:15",
        characterId: "char-3",
        locationId: "room-study",
        title: "執事を疑う",
        type: "誤認",
        visibility: "秘匿",
        testimony: "書斎付近に人影を見た",
        misunderstanding: "人物2ではなく執事だと思う",
        evidenceIds: [],
      },
      {
        id: "event-6",
        time: "22:30",
        characterId: "char-4",
        locationId: "room-guest",
        title: "客間で待機",
        type: "事実",
        visibility: "公開",
        testimony: "自分は客間にいた",
        misunderstanding: "",
        evidenceIds: [],
      },
      {
        id: "event-7",
        time: "23:00",
        characterId: "char-1",
        locationId: "room-study",
        title: "遺体を発見",
        type: "事実",
        visibility: "公開",
        testimony: "書斎で館の主を発見した",
        misunderstanding: "",
        evidenceIds: ["card-1", "card-2"],
      },
    ],
    infoCards: [
      {
        id: "card-1",
        title: "停止した時計",
        type: "証拠",
        importance: "高",
        body: "書斎の時計は22時15分で止まっている。裏側に新しい傷がある。",
        initialHolders: ["char-2"],
        investigationHolders: ["char-1", "char-3"],
        revealScene: "書斎調査",
        question: "死亡推定時刻は正しいか",
        conclusion: "犯人が時刻を偽装した",
        locationId: "room-study",
      },
      {
        id: "card-2",
        title: "酒杯の薬品痕",
        type: "証拠",
        importance: "高",
        body: "酒杯から睡眠薬の痕跡が見つかる。",
        initialHolders: [],
        investigationHolders: ["char-1", "char-3"],
        revealScene: "書斎調査",
        question: "被害者は抵抗できたか",
        conclusion: "犯人は事前に薬を使った",
        locationId: "room-study",
      },
      {
        id: "card-3",
        title: "廊下の足音",
        type: "証言",
        importance: "中",
        body: "人物1が廊下で足音を聞いた。",
        initialHolders: ["char-1"],
        investigationHolders: [],
        revealScene: "会話",
        question: "22時台に誰が移動したか",
        conclusion: "",
        locationId: "room-hall",
      },
      {
        id: "card-4",
        title: "遺産分配の手紙",
        type: "噂",
        importance: "中",
        body: "遺産の条件が書き換えられていた。",
        initialHolders: ["char-5"],
        investigationHolders: [],
        revealScene: "人物5の秘密",
        question: "",
        conclusion: "",
        locationId: "",
      },
      {
        id: "card-5",
        title: "執事の証言",
        type: "証言",
        importance: "中",
        body: "22時には客間にいたと話す。",
        initialHolders: ["char-3"],
        investigationHolders: [],
        revealScene: "会話",
        question: "執事のアリバイは成立するか",
        conclusion: "",
        locationId: "room-guest",
      },
      {
        id: "card-6",
        title: "書斎の灰",
        type: "調査結果",
        importance: "低",
        body: "燃やされた紙の一部が残っている。",
        initialHolders: [],
        investigationHolders: [],
        revealScene: "",
        question: "",
        conclusion: "",
        locationId: "room-study",
      },
    ],
    reasoningPaths: [
      {
        id: "path-1",
        name: "死亡時刻の導線",
        question: "死亡推定時刻は正しいか",
        requiredCards: ["card-1", "card-2"],
        combinedInfo: "時計の傷と薬品痕",
        expectedReasoning: "死亡時刻が偽装された可能性に気づく",
        wrongInterpretation: "執事の足音だけで犯人と決めつける",
        conclusion: "人物2が時刻を偽装した",
        insight: "時計が自然に止まったのではないと考える",
        difficulty: "普通",
        isMislead: false,
      },
      {
        id: "path-2",
        name: "足音のミスリード",
        question: "廊下の足音は誰か",
        requiredCards: ["card-3", "card-5"],
        combinedInfo: "人物1の証言と執事の証言",
        expectedReasoning: "足音だけでは犯人を確定できない",
        wrongInterpretation: "執事が犯人だと決めつける",
        conclusion: "足音は決定打ではない",
        insight: "証言と時刻のズレを見る",
        difficulty: "易しい",
        isMislead: true,
      },
    ],
    reasoningLayout: {},
    dismissedIssues: [],
  };
}

function loadProject() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return normalizeProject(defaultProject());
    return normalizeProject(mergeProject(defaultProject(), JSON.parse(raw)));
  } catch {
    return normalizeProject(defaultProject());
  }
}

function mergeProject(base, saved) {
  return {
    ...base,
    ...saved,
    scenario: { ...base.scenario, ...saved.scenario },
    truth: { ...base.truth, ...saved.truth },
    characters: saved.characters?.length ? saved.characters : base.characters,
    times: saved.times?.length ? saved.times : base.times,
    locations: saved.locations?.length ? saved.locations : base.locations,
    timelineEvents: saved.timelineEvents?.length ? saved.timelineEvents : base.timelineEvents,
    infoCards: saved.infoCards?.length ? saved.infoCards : base.infoCards,
    reasoningPaths: saved.reasoningPaths?.length ? saved.reasoningPaths : base.reasoningPaths,
    reasoningLayout: saved.reasoningLayout ?? base.reasoningLayout,
    dismissedIssues: saved.dismissedIssues ?? base.dismissedIssues,
  };
}

function normalizeProject(source) {
  const projectCopy = source;
  projectCopy.characters.forEach((character, index) => {
    character.kind ??= index < Number(projectCopy.scenario.players || 0) ? "PC" : "NPC";
  });
  projectCopy.locations.forEach((location, index) => {
    location.layout ??=
      defaultRoomLayouts[location.id] ?? {
        left: 36 + (index % 3) * 190,
        top: 34 + Math.floor(index / 3) * 150,
        width: 170,
        height: 110,
      };
  });
  projectCopy.reasoningLayout ??= {};
  projectCopy.dismissedIssues ??= [];
  syncPlayerCount(projectCopy);
  return projectCopy;
}

function syncPlayerCount(target = project) {
  target.scenario.players = target.characters.filter((character) => character.kind !== "NPC").length;
}

function saveProject() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
  showToast("保存しました");
}

function exportProject() {
  saveProject();
  const payload = {
    app: "Nora Studio",
    version: 1,
    exportedAt: new Date().toISOString(),
    project,
  };
  downloadTextFile(
    `${safeFileName(project.scenario.title || "nora-studio")}.json`,
    JSON.stringify(payload, null, 2),
    "application/json;charset=utf-8",
  );
  showToast("シナリオを書き出しました");
}

function importProject(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"));
      const imported = parsed.project ?? parsed;
      project = normalizeProject(mergeProject(defaultProject(), imported));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
      Object.assign(screen, {
        mode: "app",
        active: "概要",
        selectedCharacterId: "",
        selectedTimelineId: "",
        selectedInfoCardId: "",
        selectedPathId: "",
        selectedIssueId: "",
        selectedRoomId: "",
        showReport: false,
      });
      render();
      showToast("シナリオを読み込みました");
    } catch {
      showToast("読み込みに失敗しました");
    }
  });
  reader.readAsText(file, "utf-8");
}

function safeFileName(value) {
  return String(value)
    .trim()
    .replace(/[\\/:*?"<>|]/g, "_")
    .replace(/\s+/g, "_")
    .slice(0, 80) || "nora-studio";
}

function downloadTextFile(filename, text, type) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function resetProject() {
  localStorage.removeItem(STORAGE_KEY);
  project = defaultProject();
  Object.assign(screen, {
    mode: "setup",
    active: "概要",
    selectedCharacterId: "",
    selectedTimelineId: "",
    selectedInfoCardId: "",
    selectedPathId: "",
    selectedRoomId: "",
  });
  render();
}

function navItems() {
  const items = [...navBase];
  if (project.mapEnabled) items.splice(4, 0, "地図");
  return items;
}

function id(prefix) {
  if (crypto?.randomUUID) return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 999)}`;
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function selectedCharacter() {
  return project.characters.find((character) => character.id === screen.selectedCharacterId);
}

function selectedTimelineEvent() {
  return project.timelineEvents.find((event) => event.id === screen.selectedTimelineId);
}

function selectedInfoCard() {
  return project.infoCards.find((card) => card.id === screen.selectedInfoCardId);
}

function selectedPath() {
  return project.reasoningPaths.find((path) => path.id === screen.selectedPathId);
}

function selectedRoom() {
  return project.locations.find((location) => location.id === screen.selectedRoomId);
}

function characterName(characterId) {
  return project.characters.find((character) => character.id === characterId)?.name || "未設定";
}

function locationName(locationId) {
  return project.locations.find((location) => location.id === locationId)?.name || "未設定";
}

function locationColor(locationId) {
  return project.locations.find((location) => location.id === locationId)?.color || "teal";
}

function cardTitle(cardId) {
  return project.infoCards.find((card) => card.id === cardId)?.title || "未設定";
}

function setByPath(path, value) {
  const parts = path.split(".");
  let target = project;
  for (const part of parts.slice(0, -1)) {
    if (!target[part]) target[part] = {};
    target = target[part];
  }
  target[parts.at(-1)] = value;
}

function updateEntity(collection, idValue, key, value) {
  const entity = project[collection].find((item) => item.id === idValue);
  if (entity) entity[key] = value;
}

function ensureCharacterCount(count) {
  while (project.characters.filter((character) => character.kind !== "NPC").length < count) {
    const next = project.characters.length + 1;
    project.characters.push({
      id: id("char"),
      kind: "PC",
      name: `人物${next}`,
      publicRole: "",
      privateGoal: "",
      secret: "",
      winCondition: "",
      knownFacts: "",
      misunderstanding: "",
      relationships: "",
    });
  }
  const pcCharacters = project.characters.filter((character) => character.kind !== "NPC");
  if (pcCharacters.length > count) {
    pcCharacters.slice(count).forEach((character) => {
      character.kind = "NPC";
    });
  }
  if (screen.selectedCharacterId && !project.characters.some((character) => character.id === screen.selectedCharacterId)) {
    screen.selectedCharacterId = "";
  }
  syncPlayerCount();
}

function render() {
  const app = document.querySelector("#app");
  if (screen.mode === "setup") {
    app.innerHTML = setupScreen();
    bindCommon();
    return;
  }
  app.innerHTML = shell(renderPage()) + toastMarkup();
  bindCommon();
}

function setupScreen() {
  return `
    <main class="setup">
      <section class="panel setup-card">
        <div class="page-head">
          <div>
            <div class="brand"><span class="brand-mark">N</span>Nora Studio</div>
            <h1 class="page-title">シナリオ概要</h1>
            <p class="page-subtitle">人数を決めて、作品の骨格を作り始めます。</p>
          </div>
          <button class="button ghost" data-open-saved type="button">既存の作品を開く</button>
        </div>
        <div class="form-grid">
          ${inputField("作品タイトル", "scenario.title", project.scenario.title, "full")}
          ${inputField("プレイ人数", "scenario.players", project.scenario.players, "", "number")}
          ${inputField("想定時間", "scenario.time", project.scenario.time, "", "number")}
          ${inputField("舞台", "scenario.setting", project.scenario.setting)}
          ${selectField("体験方針", "scenario.tone", project.scenario.tone, [
            "推理重視",
            "感情重視",
            "駆け引き重視",
            "初心者向け",
          ])}
        </div>
        <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:18px;">
          <button class="button" data-reset type="button">新しい作品を作成</button>
          <button class="button" data-import-button type="button">シナリオを読み込む</button>
          <button class="button primary" data-start type="button">この人数で始める</button>
        </div>
        <input class="visually-hidden" data-import-file type="file" accept="application/json,.json" />
      </section>
    </main>
  `;
}

function shell(page) {
  return `
    <div class="app">
      <aside class="sidebar">
        <div class="brand"><span class="brand-mark">N</span>Nora Studio</div>
        <nav class="nav">
          ${navItems()
            .map(
              (item) => `
                <button class="nav-button ${screen.active === item ? "active" : ""}" data-nav="${item}" type="button">
                  <span class="nav-icon">${icons[item] || "□"}</span><span>${item}</span>
                </button>
              `,
            )
            .join("")}
        </nav>
        <div class="sidebar-foot">事実、認識、情報の所在を分けて管理します。</div>
      </aside>
      <main class="main">
        <header class="topbar">
          <div class="project-name">${esc(project.scenario.title)}<span class="status-pill teal">編集中</span></div>
          <div class="top-actions">
            <button class="button" data-save type="button">ブラウザ保存</button>
            <button class="button" data-export-project type="button">ファイル保存</button>
            <button class="button" data-import-button type="button">読み込み</button>
            <button class="button" data-report-toggle type="button">プレビュー</button>
            <input class="visually-hidden" data-import-file type="file" accept="application/json,.json" />
          </div>
        </header>
        <section class="content">${page}</section>
      </main>
    </div>
  `;
}

function renderPage() {
  const pages = {
    概要: overviewPage,
    キャラクター: characterPage,
    真相: truthPage,
    タイムライン: timelinePage,
    地図: mapPage,
    情報カード: infoPage,
    推理導線: reasoningPage,
    チェック: checkPage,
  };
  return (pages[screen.active] || overviewPage)();
}

function pageHeader(title, subtitle) {
  return `
    <div class="page-head">
      <div>
        <h1 class="page-title">${title}</h1>
        <p class="page-subtitle">${subtitle}</p>
      </div>
    </div>
  `;
}

function overviewPage() {
  return `
    ${pageHeader("シナリオ概要", "作品の基本情報と制作方針を整理します。")}
    <div class="grid two-col">
      <section class="panel">
        <h2 class="panel-title">基本情報 <span class="status-pill teal">人数からキャラ枠を作成済み</span></h2>
        <div class="form-grid">
          ${inputField("作品タイトル", "scenario.title", project.scenario.title)}
          ${inputField("プレイ人数", "scenario.players", project.scenario.players, "", "number")}
          ${inputField("想定時間", "scenario.time", project.scenario.time, "", "number")}
          ${inputField("舞台", "scenario.setting", project.scenario.setting)}
          ${selectField("体験方針", "scenario.tone", project.scenario.tone, [
            "推理重視",
            "感情重視",
            "駆け引き重視",
            "初心者向け",
          ], "full")}
          ${textareaField("事件の概要", "scenario.summary", project.scenario.summary, "full")}
          ${textareaField("今回の問い", "scenario.question", project.scenario.question, "full")}
          ${textareaField("制作メモ", "scenario.notes", project.scenario.notes, "full")}
        </div>
      </section>
      <aside class="panel">
        <h2 class="panel-title">オプション</h2>
        <div class="toggle-row">
          <div>
            <strong>地図機能を使う</strong>
            <p class="page-subtitle">見取り図、人物位置、証拠配置を管理します。</p>
          </div>
          <button class="switch ${project.mapEnabled ? "on" : ""}" data-toggle-map aria-pressed="${project.mapEnabled}" type="button"></button>
        </div>
        <div style="display:grid; gap:10px; margin-top:16px;">
          <span class="chip teal">事実と認識を分ける</span>
          <span class="chip amber">重要情報の所在を確認</span>
          <span class="chip sage">全員に目的を持たせる</span>
        </div>
        <div style="display:flex; justify-content:flex-end; margin-top:18px;">
          <button class="button primary" data-go="キャラクター" type="button">キャラクター設計へ</button>
        </div>
      </aside>
    </div>
    ${screen.showReport ? previewPanel() : ""}
  `;
}

function characterPage() {
  const selected = selectedCharacter();
  return `
    ${pageHeader("キャラクター設計", "人数分のキャラ枠を作り、目的・秘密・情報を整えます。")}
    <div class="grid ${selected ? "two-col" : ""}">
      <section class="panel">
        <h2 class="panel-title">${project.scenario.players}PC / ${project.characters.filter((character) => character.kind === "NPC").length}NPC <button class="button" data-add="character" type="button">キャラを追加</button></h2>
        <div class="character-list">
          ${project.characters
            .map(
              (character, index) => `
                <button class="mini-card ${character.id === selected?.id ? "selected" : ""}" data-select-character="${character.id}" type="button">
                  <span class="mini-card-title">${esc(character.name || `人物${index + 1}`)}</span>
                  <span class="chip ${character.kind === "NPC" ? "sage" : "teal"}">${esc(character.kind || "PC")}</span>
                  <span class="chip teal">表の顔</span><span>${esc(character.publicRole || "未設定")}</span>
                  <span class="chip amber">裏の目的</span><span>${esc(character.privateGoal || "未設定")}</span>
                  <span class="chip ${character.secret ? "coral" : "amber"}">${character.secret ? "秘密あり" : "秘密未設定"}</span>
                </button>
              `,
            )
            .join("")}
        </div>
      </section>
      ${
        selected
          ? `
      <aside class="panel">
        <h2 class="panel-title">選択中のキャラクター <span class="chip amber">${characterStatus(selected)}</span></h2>
        <div class="form-grid">
          ${entityField("名前", "characters", selected.id, "name", selected.name)}
          ${entitySelect("区分", "characters", selected.id, "kind", selected.kind || "PC", [["PC", "PC"], ["NPC", "NPC"]])}
          ${entityField("表向きの立場", "characters", selected.id, "publicRole", selected.publicRole)}
          ${entityField("裏の目的", "characters", selected.id, "privateGoal", selected.privateGoal, true)}
          ${entityField("秘密", "characters", selected.id, "secret", selected.secret, true)}
          ${entityField("勝利条件", "characters", selected.id, "winCondition", selected.winCondition, true)}
          ${entityField("知っている事実", "characters", selected.id, "knownFacts", selected.knownFacts, true)}
          ${entityField("誤解していること", "characters", selected.id, "misunderstanding", selected.misunderstanding, true)}
          ${entityField("他キャラとの関係", "characters", selected.id, "relationships", selected.relationships, true)}
        </div>
        <div style="display:flex; justify-content:space-between; gap:8px; margin-top:16px;">
          <button class="button danger" data-delete="character" type="button">このキャラを削除</button>
          <button class="button primary" data-go="真相" type="button">真相設計へ</button>
        </div>
      </aside>
      `
          : ""
      }
    </div>
  `;
}

function truthPage() {
  return `
    ${pageHeader("真相設計", "実際に起きたことと、キャラクターの認識差を分けて管理します。")}
    <div class="grid">
      <section class="panel">
        <h2 class="panel-title">事件の核心 <span><span class="chip teal">核心入力済み</span> <span class="chip coral">証拠未接続 ${unconnectedInfoCards().length}件</span></span></h2>
        <div class="form-grid">
          ${inputField("犯人", "truth.culprit", project.truth.culprit)}
          ${inputField("動機", "truth.motive", project.truth.motive)}
          ${inputField("手段", "truth.method", project.truth.method)}
          ${inputField("機会", "truth.opportunity", project.truth.opportunity)}
          ${inputField("隠蔽", "truth.coverUp", project.truth.coverUp, "full")}
          ${textareaField("到達すべき結論", "truth.conclusion", project.truth.conclusion, "full")}
        </div>
      </section>
      <section class="compare">
        <div class="panel">${textareaField("実際に起きたこと", "truth.actualEvents", project.truth.actualEvents, "full tall")}</div>
        <div class="panel">${textareaField("キャラクターの認識", "truth.perceptions", project.truth.perceptions, "full tall")}</div>
      </section>
      <section class="panel">${textareaField("真相メモ", "truth.notes", project.truth.notes, "full")}</section>
      <div style="display:flex; justify-content:flex-end;">
        <button class="button primary" data-go="タイムライン" type="button">タイムラインへ</button>
      </div>
    </div>
  `;
}

function timelinePage() {
  const selected = selectedTimelineEvent();
  const samePlace = samePlaceCharacters(selected);
  const gridStyle = `grid-template-columns: 70px repeat(${project.characters.length}, minmax(150px, 1fr));`;
  return `
    ${pageHeader("タイムライン", "全員の動きをカードで並べ、同じ時間・同じ場所の人物を確認します。")}
    <div class="grid ${selected ? "two-col" : ""}">
      <section class="panel">
        <h2 class="panel-title">全員の動き <span class="chip teal">同じ場所: ${esc(samePlace || "なし")}</span></h2>
        <div class="toolbar">
          <button class="button" data-add="timeline" type="button">カードを追加</button>
          <button class="button" data-add="time" type="button">時間を追加</button>
          <button class="button" data-save type="button">保存</button>
        </div>
        <div class="location-legend">${project.locations
          .map((location) => `<span class="chip ${location.color}">${esc(location.name)}</span>`)
          .join("")}</div>
        <div class="timeline-shell">
          <div class="timeline-grid" style="${gridStyle}">
            <div class="timeline-head">時刻</div>
            ${project.characters.map((character) => `<div class="timeline-head">${esc(character.name)}</div>`).join("")}
            ${project.times
              .map(
                (time) => `
                  <div class="time-cell">${esc(time)}</div>
                  ${project.characters.map((character) => timelineCell(time, character.id)).join("")}
                `,
              )
              .join("")}
          </div>
        </div>
      </section>
      ${
        selected
          ? `
      <aside class="panel">
        <h2 class="panel-title">選択中のカード</h2>
        ${timelineEditor(selected, samePlace)}
        <div style="display:flex; justify-content:flex-end; margin-top:16px;">
          <button class="button primary" data-go="${project.mapEnabled ? "地図" : "情報カード"}" type="button">${project.mapEnabled ? "地図へ" : "情報カードへ"}</button>
        </div>
      </aside>
      `
          : ""
      }
    </div>
  `;
}

function timelineCell(time, characterId) {
  const events = project.timelineEvents.filter(
    (event) => event.time === time && event.characterId === characterId,
  );
  const bandClass = events[0] ? `place-${locationColor(events[0].locationId)}` : "";
  return `
    <div class="timeline-cell ${bandClass}" data-drop-time="${esc(time)}" data-drop-character="${esc(characterId)}">
      ${events.map(timelineCard).join("")}
    </div>
  `;
}

function timelineCard(event) {
  const selected = event.id === screen.selectedTimelineId;
  const tone = event.type === "誤認" || event.visibility === "秘匿" ? "coral" : "amber";
  return `
    <article class="timeline-card ${selected ? "selected" : ""}" draggable="true" data-event-id="${event.id}" data-select-timeline="${event.id}">
      <div class="timeline-card-title">⋮⋮ ${esc(event.title || "未設定")}</div>
      <div class="timeline-card-meta">
        <span class="chip ${locationColor(event.locationId)}">${esc(locationName(event.locationId))}</span>
        <span class="chip ${tone}">${esc(event.type)}</span>
      </div>
    </article>
  `;
}

function timelineEditor(event, samePlace) {
  return `
    <div class="form-grid">
      ${entitySelect("時刻", "timelineEvents", event.id, "time", event.time, project.times.map((time) => [time, time]))}
      ${entitySelect("人物", "timelineEvents", event.id, "characterId", event.characterId, project.characters.map((character) => [character.id, character.name]))}
      ${entitySelect("場所", "timelineEvents", event.id, "locationId", event.locationId, project.locations.map((location) => [location.id, location.name]))}
      ${entityField("同じ場所にいた人物", "timelineEvents", event.id, "samePlace", samePlace || "なし")}
      ${entityField("出来事", "timelineEvents", event.id, "title", event.title, true)}
      ${entitySelect("種類", "timelineEvents", event.id, "type", event.type, ["事実", "証言", "誤認"].map((value) => [value, value]))}
      ${entitySelect("公開範囲", "timelineEvents", event.id, "visibility", event.visibility, ["公開", "秘匿"].map((value) => [value, value]))}
      ${entityField("証言", "timelineEvents", event.id, "testimony", event.testimony, true)}
      ${entityField("誤認", "timelineEvents", event.id, "misunderstanding", event.misunderstanding, true)}
      ${entityField("関連する証拠", "timelineEvents", event.id, "evidenceIdsText", event.evidenceIds.map(cardTitle).join("・"), true)}
    </div>
    <div style="display:flex; justify-content:flex-start; margin-top:12px;">
      <button class="button danger" data-delete="timeline" type="button">このカードを削除</button>
    </div>
  `;
}

function mapPage() {
  const selected = selectedRoom();
  const people = selected
    ? project.timelineEvents
        .filter((event) => event.time === "22:15" && event.locationId === selected.id)
        .map((event) => characterName(event.characterId))
    : [];
  const evidence = selected
    ? project.infoCards.filter((card) => card.locationId === selected.id).map((card) => card.title)
    : [];
  return `
    ${pageHeader("地図", "場所、人物位置、証拠配置を必要な作品だけで管理します。")}
    <div class="grid ${selected ? "two-col" : ""}">
      <section class="panel">
        <h2 class="panel-title">館の見取り図 <span><span class="chip amber">22:15</span> <span class="chip coral">未配置カード ${project.infoCards.filter((card) => !card.locationId).length}件</span></span></h2>
        <div class="toolbar">
          <button class="button" data-add="room" type="button">部屋を追加</button>
          <button class="button" data-go="情報カード" type="button">証拠を配置</button>
          <button class="button" data-go="タイムライン" type="button">経路を確認</button>
        </div>
        <div class="map-canvas" data-map-canvas>
          ${mapRooms()}
          ${mapPins()}
          <div class="route" style="left:308px; top:112px; width:132px;"></div>
        </div>
      </section>
      ${
        selected
          ? `
      <aside class="panel">
        <h2 class="panel-title">選択中の場所 <span class="chip teal">${people.length ? "同席あり" : "単独"}</span></h2>
        <div class="form-grid">
          ${entityField("場所名", "locations", selected.id, "name", selected.name)}
          ${entitySelect("表示色", "locations", selected.id, "color", selected.color, [
            ["teal", "書斎色"],
            ["amber", "廊下色"],
            ["coral", "客間色"],
            ["sage", "食堂色"],
          ])}
          ${readOnlyField("この場所にいた人物", people.join("・") || "なし", true)}
          ${readOnlyField("見つかる証拠", evidence.join("・") || "なし", true)}
          ${readOnlyField("関連タイムライン", project.timelineEvents.filter((event) => event.locationId === selected.id).map((event) => `${event.time} ${characterName(event.characterId)}`).join(" / ") || "なし", true)}
          ${textareaField("配置メモ", "", "犯行と偽装の中心になる場所", "full")}
        </div>
        <div style="display:flex; justify-content:space-between; gap:8px; margin-top:16px;">
          <button class="button danger" data-delete="room" type="button">この場所を削除</button>
          <button class="button primary" data-go="情報カード" type="button">情報カードへ</button>
        </div>
      </aside>
      `
          : ""
      }
    </div>
  `;
}

function mapRooms() {
  return project.locations
    .map((room) => {
      const layout = room.layout ?? { left: 40, top: 40, width: 170, height: 110 };
      return `<button class="room ${room.id === screen.selectedRoomId ? "selected" : ""}" draggable="true" data-map-room="${room.id}" data-select-room="${room.id}" style="left:${layout.left}px; top:${layout.top}px; width:${layout.width}px; height:${layout.height}px;" type="button">${esc(room.name)}</button>`;
    })
    .join("");
}

function mapPins() {
  const peoplePins = project.timelineEvents
    .filter((event) => event.time === "22:15")
    .map((event, index) => {
      const layout = project.locations.find((location) => location.id === event.locationId)?.layout ?? {
        left: 40,
        top: 40,
      };
      return `<span class="pin" style="left:${layout.left + 18 + (index % 3) * 66}px; top:${layout.top + 58 + Math.floor(index / 3) * 30}px;">${esc(characterName(event.characterId))}</span>`;
    })
    .join("");
  const evidencePins = project.infoCards
    .filter((card) => card.locationId)
    .slice(0, 6)
    .map((card, index) => {
      const layout = project.locations.find((location) => location.id === card.locationId)?.layout ?? {
        left: 40,
        top: 40,
      };
      return `<span class="pin evidence" style="left:${layout.left + 18 + (index % 3) * 74}px; top:${layout.top + 100 + Math.floor(index / 3) * 30}px;">${esc(card.title.slice(0, 4))}</span>`;
    })
    .join("");
  return `${peoplePins}${evidencePins}`;
}

function infoPage() {
  const selected = selectedInfoCard();
  const filtered = project.infoCards.filter(
    (card) => screen.infoFilter === "すべて" || card.type === screen.infoFilter || card.importance === screen.infoFilter,
  );
  return `
    ${pageHeader("情報カード", "証拠、証言、噂、調査結果をカードとして管理します。")}
    <div class="grid ${selected ? "two-col" : ""}">
      <section class="panel">
        <h2 class="panel-title">カード一覧 <button class="button" data-add="info" type="button">カードを追加</button></h2>
        <div class="toolbar">
          ${["すべて", "証拠", "証言", "噂", "調査結果", "高"].map((filter) => `<button class="button ${screen.infoFilter === filter ? "primary" : ""}" data-info-filter="${filter}" type="button">${filter}</button>`).join("")}
        </div>
        <div class="card-grid">
          ${filtered.map(infoCard).join("") || `<p class="muted">該当するカードがありません。</p>`}
        </div>
      </section>
      ${
        selected
          ? `
      <aside class="panel">
        <h2 class="panel-title">選択中の情報</h2>
        ${infoEditor(selected)}
        <div style="display:flex; justify-content:flex-end; margin-top:16px;">
          <button class="button primary" data-go="推理導線" type="button">推理導線へ</button>
        </div>
      </aside>
      `
          : ""
      }
    </div>
  `;
}

function infoCard(card) {
  const tone = card.type === "証拠" ? "teal" : card.importance === "高" ? "coral" : "amber";
  return `
    <button class="info-card ${card.id === screen.selectedInfoCardId ? "selected" : ""}" data-select-info="${card.id}" type="button">
      <span><span class="chip ${tone}">${esc(card.type)}</span> <span class="chip">${esc(card.importance)}</span></span>
      <span class="info-card-title">${esc(card.title || "未設定")}</span>
      <span class="muted">${esc(card.body || "本文未設定")}</span>
      <span class="chip teal">接続: ${esc(card.question || "未接続")}</span>
    </button>
  `;
}

function infoEditor(card) {
  return `
    <div class="form-grid">
      ${entityField("カード名", "infoCards", card.id, "title", card.title)}
      ${entitySelect("種類", "infoCards", card.id, "type", card.type, ["証拠", "証言", "噂", "調査結果"].map((value) => [value, value]))}
      ${entitySelect("重要度", "infoCards", card.id, "importance", card.importance, ["高", "中", "低"].map((value) => [value, value]))}
      ${entityField("本文", "infoCards", card.id, "body", card.body, true)}
      ${multiChoiceField("最初から知っている人物", "infoCards", card.id, "initialHolders", card.initialHolders, project.characters.map((character) => [character.id, character.name]), true)}
      ${multiChoiceField("調査で得る人物", "infoCards", card.id, "investigationHolders", card.investigationHolders, project.characters.map((character) => [character.id, character.name]), true)}
      ${entityField("公開される場面", "infoCards", card.id, "revealScene", card.revealScene, true)}
      ${entityField("繋がる問い", "infoCards", card.id, "question", card.question, true)}
      ${entityField("補強する結論", "infoCards", card.id, "conclusion", card.conclusion, true)}
      ${entitySelect("配置場所", "infoCards", card.id, "locationId", card.locationId, [["", "未配置"], ...project.locations.map((location) => [location.id, location.name])])}
    </div>
    <div style="display:flex; justify-content:flex-start; margin-top:12px;">
      <button class="button danger" data-delete="info" type="button">このカードを削除</button>
    </div>
  `;
}

function reasoningPage() {
  const selected = selectedPath();
  return `
    ${pageHeader("推理導線", "問い、必要情報、ミスリード、結論をつなぎます。")}
    <div class="grid ${selected ? "two-col" : ""}">
      <section class="panel">
        <h2 class="panel-title">導線マップ <span><span class="chip teal">正解導線 ${project.reasoningPaths.filter((path) => !path.isMislead).length}本</span> <span class="chip coral">ミスリード ${project.reasoningPaths.filter((path) => path.isMislead).length}本</span></span></h2>
        <div class="toolbar">
          <button class="button" data-add="path" type="button">導線を追加</button>
          <button class="button" data-zoom="out" type="button">縮小</button>
          <span class="chip teal">${Math.round(screen.reasonZoom * 100)}%</span>
          <button class="button" data-zoom="in" type="button">拡大</button>
          <button class="button" data-zoom="reset" type="button">等倍</button>
        </div>
        <div class="reason-map-scroll">
          <div class="reason-map" data-reason-canvas style="width:${reasonCanvasSize().width}px; height:${reasonCanvasSize().height}px;">
            <div class="reason-map-scale" style="transform:scale(${screen.reasonZoom}); width:${reasonCanvasBaseSize().width}px; height:${reasonCanvasBaseSize().height}px;">
              ${reasonMapNodes()}
            </div>
          </div>
        </div>
      </section>
      ${
        selected
          ? `
      <aside class="panel">
        <h2 class="panel-title">選択中の導線</h2>
        ${pathEditor(selected)}
        <div style="display:flex; justify-content:flex-end; margin-top:16px;">
          <button class="button primary" data-go="チェック" type="button">チェックへ</button>
        </div>
      </aside>
      `
          : ""
      }
    </div>
  `;
}

function reasonMapNodes() {
  const nodes = [
    ...project.reasoningPaths.map((path, index) => ({
      key: `question:${path.id}`,
      id: path.id,
      type: "question",
      label: "問い",
      text: path.question,
      index,
      tone: "teal",
      pathId: path.id,
    })),
    ...project.infoCards.map((card, index) => ({
      key: `info:${card.id}`,
      id: card.id,
      type: "info",
      label: "必要情報",
      text: card.title,
      index,
      tone: "amber",
      infoId: card.id,
    })),
    ...project.reasoningPaths.filter((path) => path.isMislead).map((path, index) => ({
      key: `mislead:${path.id}`,
      id: path.id,
      type: "mislead",
      label: "ミスリード",
      text: path.wrongInterpretation,
      index,
      tone: "coral",
      pathId: path.id,
    })),
    ...project.reasoningPaths.map((path, index) => ({
      key: `conclusion:${path.id}`,
      id: path.id,
      type: "conclusion",
      label: "結論",
      text: path.conclusion,
      index,
      tone: "sage",
      pathId: path.id,
    })),
  ];
  return `
    ${reasonLaneLabels()}
    ${nodes.map(reasonNode).join("")}
  `;
}

function reasonCanvasBaseSize() {
  return { width: 1120, height: Math.max(700, 120 + project.infoCards.length * 112) };
}

function reasonCanvasSize() {
  const base = reasonCanvasBaseSize();
  return {
    width: Math.round(base.width * screen.reasonZoom),
    height: Math.round(base.height * screen.reasonZoom),
  };
}

function reasonLaneLabels() {
  return [
    ["question", "問い"],
    ["info", "必要情報"],
    ["mislead", "ミスリード"],
    ["conclusion", "結論"],
  ]
    .map(([type, label]) => `<span class="reason-lane-label" style="left:${defaultReasonColumns[type]}px;">${label}</span>`)
    .join("");
}

function reasonNode(node) {
  const position = project.reasoningLayout[node.key] ?? defaultReasonNodePosition(node.type, node.index);
  const selected = node.pathId && node.pathId === screen.selectedPathId;
  return `
    <button
      class="node movable-node ${node.type === "mislead" ? "mislead" : ""} ${selected ? "selected" : ""}"
      draggable="true"
      data-reason-node="${node.key}"
      ${node.pathId ? `data-select-path="${node.pathId}"` : ""}
      ${node.infoId ? `data-select-info="${node.infoId}"` : ""}
      style="left:${position.x}px; top:${position.y}px;"
      type="button"
    >
      <strong>${esc(node.text || "未設定")}</strong>
      <div style="margin-top:8px;"><span class="chip ${node.tone}">${node.label}</span></div>
    </button>
  `;
}

function defaultReasonNodePosition(type, index) {
  return {
    x: defaultReasonColumns[type] ?? 18,
    y: 52 + index * 112,
  };
}

function pathEditor(path) {
  return `
    <div class="form-grid">
      ${entityField("導線名", "reasoningPaths", path.id, "name", path.name)}
      ${entityField("起点", "reasoningPaths", path.id, "question", path.question)}
      ${multiChoiceField("必要なカード", "reasoningPaths", path.id, "requiredCards", path.requiredCards, project.infoCards.map((card) => [card.id, card.title]), true)}
      ${entityField("組み合わせる情報", "reasoningPaths", path.id, "combinedInfo", path.combinedInfo, true)}
      ${entityField("想定される推理", "reasoningPaths", path.id, "expectedReasoning", path.expectedReasoning, true)}
      ${entityField("誤った解釈", "reasoningPaths", path.id, "wrongInterpretation", path.wrongInterpretation, true)}
      ${entityField("最終結論", "reasoningPaths", path.id, "conclusion", path.conclusion, true)}
      ${entityField("プレイヤーに必要な気づき", "reasoningPaths", path.id, "insight", path.insight, true)}
      ${entitySelect("難易度", "reasoningPaths", path.id, "difficulty", path.difficulty, ["易しい", "普通", "難しい"].map((value) => [value, value]))}
      ${entitySelect("種類", "reasoningPaths", path.id, "isMislead", String(path.isMislead), [["false", "正解導線"], ["true", "ミスリード"]])}
    </div>
    <div style="display:flex; justify-content:flex-start; margin-top:12px;">
      <button class="button danger" data-delete="path" type="button">この導線を削除</button>
    </div>
  `;
}

function checkPage() {
  const issues = buildIssues();
  const selected = issues.find((issueItem) => issueItem.id === screen.selectedIssueId);
  const major = issues.filter((issueItem) => issueItem.level === "重大").length;
  const warn = issues.filter((issueItem) => issueItem.level === "注意").length;
  const check = issues.filter((issueItem) => issueItem.level === "確認").length;
  return `
    ${pageHeader("チェック", "矛盾、情報不足、キャラ格差、導線不足をまとめて確認します。")}
    <div class="check-summary">
      ${summary("重大", `${major}件`, "coral")}
      ${summary("注意", `${warn}件`, "amber")}
      ${summary("確認", `${check}件`, "teal")}
      ${summary("完了", `${Math.max(0, 18 - issues.length)}件`, "sage")}
    </div>
    <div class="grid ${selected ? "two-col" : ""}">
      <section class="panel">
        <h2 class="panel-title">検出された項目 <button class="button" data-download-report type="button">レポート出力</button></h2>
        <div class="issue-list">
          ${issues.map(issueCard).join("") || `<p class="muted">大きな問題は見つかりませんでした。</p>`}
        </div>
      </section>
      ${
        selected
          ? `
      <aside class="panel">
        <h2 class="panel-title">選択中の問題</h2>
        ${issueDetail(selected)}
        <h3 class="panel-title" style="margin-top:18px;">キャラ別バランス</h3>
        <div class="balance-list">
          ${project.characters.map(characterBalance).join("")}
        </div>
      </aside>
      `
          : ""
      }
    </div>
    ${screen.showReport ? previewPanel() : ""}
  `;
}

function buildIssues() {
  const issues = [];
  project.timelineEvents.forEach((event) => {
    const conflict = project.timelineEvents.find(
      (other) =>
        other.id !== event.id &&
        other.characterId === event.characterId &&
        other.time === event.time &&
        other.locationId !== event.locationId,
    );
    if (conflict) {
      issues.push({
        id: `conflict-${event.id}`,
        level: "重大",
        type: "矛盾",
        title: `${event.time}に${characterName(event.characterId)}が複数の場所にいる`,
        body: `対象: ${locationName(event.locationId)} / ${locationName(conflict.locationId)}`,
        fixes: ["片方のカード時刻を変更する", "片方の場所を修正する", "どちらかを証言・誤認として分離する"],
      });
    }
  });

  project.characters.forEach((character) => {
    if (!character.privateGoal || !character.winCondition) {
      issues.push({
        id: `character-${character.id}`,
        level: "注意",
        type: "キャラ格差",
        title: `${character.name}の目的または勝利条件が不足`,
        body: "会話中の行動理由が弱くなる可能性があります。",
        fixes: ["裏の目的を追加する", "勝利条件を明確にする", "他キャラとの利害関係を足す"],
      });
    }
  });

  unconnectedInfoCards().forEach((card) => {
    issues.push({
      id: `card-${card.id}`,
      level: card.importance === "高" ? "重大" : "注意",
      type: "未接続カード",
      title: `${card.title}が推理導線に未接続`,
      body: "情報カードが問いや結論に繋がっていません。",
      fixes: ["繋がる問いを設定する", "補強する結論を設定する", "不要ならカードを削除する"],
    });
  });

  project.reasoningPaths.forEach((path) => {
    if (!path.conclusion || !path.requiredCards.length) {
      issues.push({
        id: `path-${path.id}`,
        level: "注意",
        type: "導線不足",
        title: `${path.name}の到達条件が弱い`,
        body: "必要情報または最終結論が不足しています。",
        fixes: ["必要カードを増やす", "最終結論を明確にする", "ミスリードと正解導線を分ける"],
      });
    }
  });

  if (project.mapEnabled) {
    project.infoCards
      .filter((card) => !card.locationId)
      .forEach((card) => {
        issues.push({
          id: `map-${card.id}`,
          level: "確認",
          type: "公開タイミング",
          title: `${card.title}の配置場所が未設定`,
          body: "地図機能が有効なため、証拠の置き場所を確認してください。",
          fixes: ["配置場所を設定する", "会話で得る情報なら未配置のままにする"],
        });
      });
  }

  return dedupeIssues(issues).filter((issueItem) => !project.dismissedIssues.includes(issueItem.id));
}

function dedupeIssues(issues) {
  const seen = new Set();
  return issues.filter((issueItem) => {
    const key = `${issueItem.type}-${issueItem.title}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function issueCard(issueItem) {
  const tone = issueItem.level === "重大" ? "coral" : issueItem.level === "注意" ? "amber" : "teal";
  return `
    <button class="issue-card ${issueItem.id === screen.selectedIssueId ? "selected" : ""}" data-select-issue="${issueItem.id}" type="button">
      <span><span class="chip ${tone}">${issueItem.level}</span> <span class="chip">${issueItem.type}</span></span>
      <span class="issue-title">${esc(issueItem.title)}</span>
    </button>
  `;
}

function issueDetail(issueItem) {
  return `
    <p>${esc(issueItem.body)}</p>
    <h3 class="panel-title">修正候補</h3>
    <div class="issue-list">
      ${issueItem.fixes.map((fix) => `<span class="chip amber">${esc(fix)}</span>`).join("")}
    </div>
    <div style="display:flex; gap:8px; margin-top:16px;">
      <button class="button primary" data-open-related="${issueItem.type}" type="button">該当画面を開く</button>
      <button class="button" data-dismiss-issue="${issueItem.id}" type="button">確認済みにする</button>
    </div>
  `;
}

function characterBalance(character) {
  const score =
    countText(character.privateGoal) +
    countText(character.secret) +
    countText(character.winCondition) +
    countText(character.knownFacts) +
    countText(character.relationships);
  const width = Math.min(100, Math.max(18, score * 10));
  const label = width < 45 ? "薄め" : width > 80 ? "多め" : "標準";
  return `
    <div class="balance-row">
      <strong>${esc(character.name)}</strong>
      <div class="bar"><span style="width:${width}%"></span></div>
      <span class="chip ${width < 45 ? "coral" : width > 80 ? "amber" : "teal"}">${label}</span>
    </div>
  `;
}

function countText(value) {
  return value ? Math.min(3, Math.ceil(String(value).length / 18)) : 0;
}

function unconnectedInfoCards() {
  const used = new Set(project.reasoningPaths.flatMap((path) => path.requiredCards));
  return project.infoCards.filter((card) => !used.has(card.id) && (!card.question || !card.conclusion));
}

function samePlaceCharacters(event) {
  if (!event) return "";
  return project.timelineEvents
    .filter(
      (other) =>
        other.id !== event.id &&
        other.time === event.time &&
        other.locationId === event.locationId,
    )
    .map((other) => characterName(other.characterId))
    .join("・");
}

function characterStatus(character) {
  if (!character.privateGoal) return "目的未設定";
  if (!character.secret) return "秘密未設定";
  if (!character.winCondition) return "勝利条件未設定";
  return "入力済み";
}

function addItem(kind) {
  if (kind === "character") {
    const next = project.characters.length + 1;
    const character = {
      id: id("char"),
      kind: "NPC",
      name: `人物${next}`,
      publicRole: "",
      privateGoal: "",
      secret: "",
      winCondition: "",
      knownFacts: "",
      misunderstanding: "",
      relationships: "",
    };
    project.characters.push(character);
    syncPlayerCount();
    screen.selectedCharacterId = character.id;
  }
  if (kind === "timeline") {
    const event = {
      id: id("event"),
      time: project.times[0] || "21:00",
      characterId: project.characters[0]?.id || "",
      locationId: project.locations[0]?.id || "",
      title: "新しい出来事",
      type: "事実",
      visibility: "秘匿",
      testimony: "",
      misunderstanding: "",
      evidenceIds: [],
    };
    project.timelineEvents.push(event);
    screen.selectedTimelineId = event.id;
  }
  if (kind === "time") {
    const newTime = nextTimelineTime();
    project.times.push(newTime);
    project.times = [...new Set(project.times)].sort((a, b) => timeToMinutes(a) - timeToMinutes(b));
    showToast(`${newTime}を追加しました`);
  }
  if (kind === "info") {
    const card = {
      id: id("card"),
      title: "新しい情報カード",
      type: "証拠",
      importance: "中",
      body: "",
      initialHolders: [],
      investigationHolders: [],
      revealScene: "",
      question: "",
      conclusion: "",
      locationId: "",
    };
    project.infoCards.push(card);
    screen.selectedInfoCardId = card.id;
  }
  if (kind === "path") {
    const path = {
      id: id("path"),
      name: "新しい導線",
      question: "",
      requiredCards: [],
      combinedInfo: "",
      expectedReasoning: "",
      wrongInterpretation: "",
      conclusion: "",
      insight: "",
      difficulty: "普通",
      isMislead: false,
    };
    project.reasoningPaths.push(path);
    screen.selectedPathId = path.id;
  }
  if (kind === "room") {
    const room = {
      id: id("room"),
      name: "新しい場所",
      color: "sage",
      layout: { left: 48, top: 420, width: 170, height: 110 },
    };
    project.locations.push(room);
    screen.selectedRoomId = room.id;
  }
  render();
}

function nextTimelineTime() {
  const latest = project.times
    .map(timeToMinutes)
    .filter((minutes) => Number.isFinite(minutes))
    .sort((a, b) => b - a)[0];
  let next = Number.isFinite(latest) ? latest + 30 : 21 * 60;
  let nextLabel = minutesToTime(next);
  while (project.times.includes(nextLabel)) {
    next += 30;
    nextLabel = minutesToTime(next);
  }
  return nextLabel;
}

function timeToMinutes(value) {
  const match = String(value).match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return Number.NaN;
  return Number(match[1]) * 60 + Number(match[2]);
}

function minutesToTime(value) {
  const normalized = Math.max(0, value);
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function deleteItem(kind) {
  if (!confirmDelete()) return;
  if (kind === "character") {
    if (project.characters.length <= 1) return;
    const characterId = screen.selectedCharacterId;
    project.characters = project.characters.filter((character) => character.id !== characterId);
    project.timelineEvents = project.timelineEvents.filter((event) => event.characterId !== characterId);
    project.infoCards.forEach((card) => {
      card.initialHolders = card.initialHolders.filter((idValue) => idValue !== characterId);
      card.investigationHolders = card.investigationHolders.filter((idValue) => idValue !== characterId);
    });
    screen.selectedCharacterId = "";
    syncPlayerCount();
  }
  if (kind === "timeline") {
    project.timelineEvents = project.timelineEvents.filter((event) => event.id !== screen.selectedTimelineId);
    screen.selectedTimelineId = "";
  }
  if (kind === "info") {
    const cardId = screen.selectedInfoCardId;
    project.infoCards = project.infoCards.filter((card) => card.id !== cardId);
    project.timelineEvents.forEach((event) => {
      event.evidenceIds = event.evidenceIds.filter((idValue) => idValue !== cardId);
    });
    project.reasoningPaths.forEach((path) => {
      path.requiredCards = path.requiredCards.filter((idValue) => idValue !== cardId);
    });
    Object.keys(project.reasoningLayout).forEach((key) => {
      if (key.includes(cardId)) delete project.reasoningLayout[key];
    });
    screen.selectedInfoCardId = "";
  }
  if (kind === "path") {
    const pathId = screen.selectedPathId;
    project.reasoningPaths = project.reasoningPaths.filter((path) => path.id !== pathId);
    Object.keys(project.reasoningLayout).forEach((key) => {
      if (key.includes(pathId)) delete project.reasoningLayout[key];
    });
    screen.selectedPathId = "";
  }
  if (kind === "room") {
    if (project.locations.length <= 1) return;
    const roomId = screen.selectedRoomId;
    project.locations = project.locations.filter((location) => location.id !== roomId);
    project.timelineEvents.forEach((event) => {
      if (event.locationId === roomId) event.locationId = project.locations[0]?.id || "";
    });
    project.infoCards.forEach((card) => {
      if (card.locationId === roomId) card.locationId = "";
    });
    screen.selectedRoomId = "";
  }
  project.dismissedIssues = [];
  render();
}

function confirmDelete() {
  if (typeof window === "undefined" || typeof window.confirm !== "function") return true;
  return window.confirm("選択中の項目を削除します。よろしいですか？");
}

function bindCommon() {
  document.querySelectorAll("[data-bind]").forEach((field) => {
    field.addEventListener("input", () => {
      const value = field.type === "number" ? Number(field.value) : field.value;
      setByPath(field.dataset.bind, value);
    });
    field.addEventListener("change", () => {
      const value = field.type === "number" ? Number(field.value) : field.value;
      setByPath(field.dataset.bind, value);
      if (field.dataset.bind === "scenario.players") ensureCharacterCount(Number(value || 1));
      render();
    });
  });

  document.querySelectorAll("[data-entity]").forEach((field) => {
    field.addEventListener("input", () => {
      updateEntityValue(field);
    });
    field.addEventListener("change", () => {
      updateEntityValue(field);
      render();
    });
  });

  document.querySelectorAll("[data-array-toggle]").forEach((field) => {
    field.addEventListener("change", () => {
      const entity = project[field.dataset.arrayCollection].find((item) => item.id === field.dataset.arrayId);
      if (!entity) return;
      const key = field.dataset.arrayKey;
      const value = field.dataset.arrayValue;
      if (!Array.isArray(entity[key])) entity[key] = [];
      if (field.checked && !entity[key].includes(value)) entity[key].push(value);
      if (!field.checked) entity[key] = entity[key].filter((item) => item !== value);
      render();
    });
  });

  document.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      screen.active = button.dataset.nav;
      screen.mode = "app";
      screen.showReport = false;
      render();
    });
  });

  document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => {
      screen.active = button.dataset.go;
      screen.mode = "app";
      render();
    });
  });

  document.querySelectorAll("[data-add]").forEach((button) => {
    button.addEventListener("click", () => addItem(button.dataset.add));
  });

  document.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", () => deleteItem(button.dataset.delete));
  });

  document.querySelector("[data-start]")?.addEventListener("click", () => {
    ensureCharacterCount(Number(project.scenario.players || 5));
    screen.mode = "app";
    screen.active = "概要";
    render();
  });

  document.querySelector("[data-open-saved]")?.addEventListener("click", () => {
    screen.mode = "app";
    render();
  });

  document.querySelector("[data-reset]")?.addEventListener("click", resetProject);
  document.querySelectorAll("[data-save]").forEach((button) => button.addEventListener("click", saveProject));
  document
    .querySelectorAll("[data-export-project]")
    .forEach((button) => button.addEventListener("click", exportProject));
  document.querySelectorAll("[data-import-button]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector("[data-import-file]")?.click();
    });
  });
  document.querySelectorAll("[data-import-file]").forEach((input) => {
    input.addEventListener("change", () => {
      importProject(input.files?.[0]);
      input.value = "";
    });
  });

  document.querySelector("[data-toggle-map]")?.addEventListener("click", () => {
    project.mapEnabled = !project.mapEnabled;
    if (!project.mapEnabled && screen.active === "地図") screen.active = "概要";
    render();
  });

  document.querySelectorAll("[data-select-character]").forEach((button) => {
    button.addEventListener("click", () => {
      screen.selectedCharacterId =
        screen.selectedCharacterId === button.dataset.selectCharacter ? "" : button.dataset.selectCharacter;
      render();
    });
  });

  document.querySelectorAll("[data-select-timeline]").forEach((card) => {
    card.addEventListener("click", () => {
      screen.selectedTimelineId =
        screen.selectedTimelineId === card.dataset.selectTimeline ? "" : card.dataset.selectTimeline;
      render();
    });
  });

  document.querySelectorAll("[data-select-info]").forEach((button) => {
    button.addEventListener("click", () => {
      screen.selectedInfoCardId =
        screen.selectedInfoCardId === button.dataset.selectInfo ? "" : button.dataset.selectInfo;
      render();
    });
  });

  document.querySelectorAll("[data-select-path]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = project.reasoningPaths.find((path) => path.id === button.dataset.selectPath);
      if (target) screen.selectedPathId = screen.selectedPathId === target.id ? "" : target.id;
      render();
    });
  });

  document.querySelectorAll("[data-select-room]").forEach((button) => {
    button.addEventListener("click", () => {
      screen.selectedRoomId = screen.selectedRoomId === button.dataset.selectRoom ? "" : button.dataset.selectRoom;
      render();
    });
  });

  document.querySelectorAll("[data-select-issue]").forEach((button) => {
    button.addEventListener("click", () => {
      screen.selectedIssueId = screen.selectedIssueId === button.dataset.selectIssue ? "" : button.dataset.selectIssue;
      render();
    });
  });

  document.querySelectorAll("[data-info-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      screen.infoFilter = button.dataset.infoFilter;
      render();
    });
  });

  document.querySelectorAll("[data-zoom]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.zoom === "in") screen.reasonZoom = Math.min(1.6, screen.reasonZoom + 0.1);
      if (button.dataset.zoom === "out") screen.reasonZoom = Math.max(0.55, screen.reasonZoom - 0.1);
      if (button.dataset.zoom === "reset") screen.reasonZoom = 1;
      screen.reasonZoom = Math.round(screen.reasonZoom * 100) / 100;
      render();
    });
  });

  document.querySelectorAll("[data-event-id]").forEach((card) => {
    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", `timeline:${card.dataset.eventId}`);
    });
  });

  document.querySelectorAll("[data-drop-time]").forEach((cell) => {
    cell.addEventListener("dragover", (event) => event.preventDefault());
    cell.addEventListener("drop", (event) => {
      event.preventDefault();
      const payload = event.dataTransfer.getData("text/plain");
      if (!payload.startsWith("timeline:")) return;
      const eventId = payload.replace("timeline:", "");
      const timelineEvent = project.timelineEvents.find((item) => item.id === eventId);
      if (timelineEvent) {
        timelineEvent.time = cell.dataset.dropTime;
        timelineEvent.characterId = cell.dataset.dropCharacter;
        screen.selectedTimelineId = timelineEvent.id;
        render();
      }
    });
  });

  document.querySelectorAll("[data-reason-node]").forEach((node) => {
    node.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", `reason:${node.dataset.reasonNode}`);
    });
  });

  document.querySelector("[data-reason-canvas]")?.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  document.querySelector("[data-reason-canvas]")?.addEventListener("drop", (event) => {
    event.preventDefault();
    const payload = event.dataTransfer.getData("text/plain");
    if (!payload.startsWith("reason:")) return;
    const key = payload.replace("reason:", "");
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const base = reasonCanvasBaseSize();
    const rawX = (event.clientX - rect.left) / screen.reasonZoom - 95;
    const rawY = (event.clientY - rect.top) / screen.reasonZoom - 42;
    const x = Math.max(8, Math.min(base.width - 205, rawX));
    const y = Math.max(36, Math.min(base.height - 96, rawY));
    project.reasoningLayout[key] = { x: Math.round(x), y: Math.round(y) };
    render();
  });

  document.querySelectorAll("[data-map-room]").forEach((room) => {
    room.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", `room:${room.dataset.mapRoom}`);
    });
  });

  document.querySelector("[data-map-canvas]")?.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  document.querySelector("[data-map-canvas]")?.addEventListener("drop", (event) => {
    event.preventDefault();
    const payload = event.dataTransfer.getData("text/plain");
    if (!payload.startsWith("room:")) return;
    const roomId = payload.replace("room:", "");
    const room = project.locations.find((location) => location.id === roomId);
    if (!room) return;
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const layout = room.layout ?? { width: 170, height: 110 };
    room.layout = {
      ...layout,
      left: Math.round(Math.max(4, Math.min(rect.width - layout.width - 4, event.clientX - rect.left - layout.width / 2))),
      top: Math.round(Math.max(4, Math.min(rect.height - layout.height - 4, event.clientY - rect.top - layout.height / 2))),
    };
    screen.selectedRoomId = room.id;
    render();
  });

  document.querySelector("[data-report-toggle]")?.addEventListener("click", () => {
    screen.showReport = !screen.showReport;
    render();
  });

  document.querySelector("[data-download-report]")?.addEventListener("click", downloadReport);

  document.querySelectorAll("[data-dismiss-issue]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!project.dismissedIssues.includes(button.dataset.dismissIssue)) {
        project.dismissedIssues.push(button.dataset.dismissIssue);
      }
      screen.selectedIssueId = "";
      render();
    });
  });

  document.querySelectorAll("[data-open-related]").forEach((button) => {
    button.addEventListener("click", () => {
      const map = {
        矛盾: "タイムライン",
        キャラ格差: "キャラクター",
        未接続カード: "情報カード",
        導線不足: "推理導線",
        公開タイミング: project.mapEnabled ? "地図" : "情報カード",
      };
      screen.active = map[button.dataset.openRelated] || "チェック";
      render();
    });
  });
}

function updateEntityValue(field) {
  const collection = field.dataset.entity;
  const entityId = field.dataset.id;
  const key = field.dataset.key;
  let value = field.value;
  if (value === "true") value = true;
  if (value === "false") value = false;
  const entity = project[collection]?.find((item) => item.id === entityId);
  const previousValue = entity?.[key];
  updateEntity(collection, entityId, key, value);
  if (collection === "characters" && key === "name" && previousValue && value && previousValue !== value) {
    replaceCharacterNameReferences(previousValue, value);
  }
  if (collection === "characters" && key === "kind") {
    syncPlayerCount();
  }
}

function replaceCharacterNameReferences(oldName, newName) {
  const replaceInValue = (value, parentKey = "") => {
    if (typeof value === "string") {
      if (parentKey === "id") return value;
      return value.replaceAll(oldName, newName);
    }
    if (Array.isArray(value)) return value.map((item) => replaceInValue(item, parentKey));
    if (value && typeof value === "object") {
      Object.entries(value).forEach(([key, child]) => {
        value[key] = replaceInValue(child, key);
      });
    }
    return value;
  };
  replaceInValue(project);
}

function inputField(label, path, value, size = "", type = "text") {
  return `
    <label class="field ${size}">
      <span class="label">${label}</span>
      <input class="input" data-bind="${path}" type="${type}" value="${esc(value)}" />
    </label>
  `;
}

function textareaField(label, path, value, size = "") {
  const bind = path ? `data-bind="${path}"` : "";
  return `
    <label class="field ${size}">
      <span class="label">${label}</span>
      <textarea class="textarea" ${bind}>${esc(value)}</textarea>
    </label>
  `;
}

function selectField(label, path, value, options, size = "") {
  return `
    <label class="field ${size}">
      <span class="label">${label}</span>
      <select class="select" data-bind="${path}">
        ${options.map((option) => `<option ${option === value ? "selected" : ""}>${esc(option)}</option>`).join("")}
      </select>
    </label>
  `;
}

function entityField(label, collection, entityId, key, value, full = false) {
  const readOnly = key.endsWith("Text") || key === "samePlace";
  if (full && !readOnly) {
    return `
      <label class="field full">
        <span class="label">${label}</span>
        <textarea class="textarea" data-entity="${collection}" data-id="${entityId}" data-key="${key}">${esc(value)}</textarea>
      </label>
    `;
  }
  return `
    <label class="field ${full ? "full" : ""}">
      <span class="label">${label}</span>
      <input class="input" ${readOnly ? "readonly" : ""} data-entity="${collection}" data-id="${entityId}" data-key="${key}" value="${esc(value)}" />
    </label>
  `;
}

function entitySelect(label, collection, entityId, key, value, options, full = false) {
  return `
    <label class="field ${full ? "full" : ""}">
      <span class="label">${label}</span>
      <select class="select" data-entity="${collection}" data-id="${entityId}" data-key="${key}">
        ${options
          .map(([optionValue, labelText]) => `<option value="${esc(optionValue)}" ${String(optionValue) === String(value) ? "selected" : ""}>${esc(labelText)}</option>`)
          .join("")}
      </select>
    </label>
  `;
}

function readOnlyField(label, value, full = false) {
  return `
    <label class="field ${full ? "full" : ""}">
      <span class="label">${label}</span>
      <input class="input" value="${esc(value)}" readonly />
    </label>
  `;
}

function multiChoiceField(label, collection, entityId, key, selectedValues, options, full = false) {
  const selected = new Set(selectedValues);
  return `
    <fieldset class="field ${full ? "full" : ""}">
      <legend class="label">${label}</legend>
      <div class="check-list">
        ${options
          .map(
            ([optionValue, labelText]) => `
              <label class="check-option">
                <input
                  type="checkbox"
                  data-array-toggle
                  data-array-collection="${collection}"
                  data-array-id="${entityId}"
                  data-array-key="${key}"
                  data-array-value="${esc(optionValue)}"
                  ${selected.has(optionValue) ? "checked" : ""}
                />
                <span>${esc(labelText)}</span>
              </label>
            `,
          )
          .join("")}
      </div>
    </fieldset>
  `;
}

function summary(label, value, tone) {
  return `<div class="summary-box"><span class="chip ${tone}">${label}</span><div class="summary-number">${value}</div></div>`;
}

function previewPanel() {
  return `
    <section class="panel report-panel">
      <h2 class="panel-title">プレビュー</h2>
      <pre class="report-text">${esc(reportText())}</pre>
    </section>
  `;
}

function reportText() {
  const issues = buildIssues();
  return [
    `作品: ${project.scenario.title}`,
    `人数: ${project.scenario.players}人`,
    `舞台: ${project.scenario.setting}`,
    "",
    "シナリオ概要",
    project.scenario.summary,
    "",
    "真相",
    project.truth.conclusion,
    "",
    "検出された項目",
    issues.length ? issues.map((issueItem) => `- [${issueItem.level}] ${issueItem.title}`).join("\n") : "- なし",
  ].join("\n");
}

function downloadReport() {
  downloadTextFile("nora-studio-report.txt", reportText(), "text/plain;charset=utf-8");
}

function toastMarkup() {
  return `<div class="toast" id="toast" hidden></div>`;
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  setTimeout(() => {
    toast.hidden = true;
  }, 1600);
}

render();
