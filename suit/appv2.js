/* THE SUIT — camera demo. Scripted for the take. No live API. */
(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const OBJECTS = {
    op: {
      name: "Wearer",
      sub: "Same American worker",
      tag: "WEAR",
      detail:
        "The suit is not me. Palantir around the fab-run job. The night operator is not shuffling boxes at 2 a.m. The same American worker. The suit does the judgment.",
    },
    oils: {
      name: "Night ERP window",
      sub: "Oils plants · floor did not wait",
      tag: "SCAR",
      detail:
        "I stood this watch on oils plants: ERP that had to run at night, twenty-plus warehouses, the floor already moving. Scar, not the pitch.",
    },
    dawn: {
      name: "Warehouse load",
      sub: "I have cut this job. Scar, not the pitch.",
      tag: "SCAR",
      detail:
        "I have taken a warehouse load from eight hours to under one — AS/400 journals, Dawn Foods, they used it. Scar. Not spoken as the video.",
    },
    micron: {
      name: "They kept extending",
      sub: "Micron fabs · the pipe grew",
      tag: "SCAR",
      detail:
        "I connected Micron fabs. Change data off SQL Server. Clones. Bulk loads into Teradata and Hadoop. They kept extending that pipe. We moved a lot of tables. We never put a Run on the floor.",
    },
    vw: {
      name: "Two weeks · day early",
      sub: "Complete Grid/HA · four shadowed",
      tag: "SCAR",
      detail:
        "Volkswagen Group of America wanted the complete Grid/HA stack. Two-week window. Live demo a day early. Four customer consultants shadowed. Scar, not the pitch.",
    },
    crisis: {
      name: "Shops on fire",
      sub: "19 of 20 · still the same constraint",
      tag: "SCAR",
      detail:
        "Nineteen of twenty crisis accounts recovered. Perfect specs never arrived then either. Scar, not the pitch.",
    },
    lab: {
      name: "Canonical Run",
      sub: "One view of the total run",
      tag: "OBJECT",
      detail:
        "Foundry makes Canonical Run a real object. One view of the total run. Every Informatica session judged against it. Point at it Tuesday. Still right Wednesday.",
    },
    erp: {
      name: "CDC Journal",
      sub: "Live change off SQL Server",
      tag: "LIVE",
      detail:
        "Change data coming off SQL Server. AIP scores live change against Canonical Run before anyone opens a mapping. The CDC either matches Canonical Run or it does not.",
    },
    timedim: {
      name: "Session",
      sub: "Informatica session · judged",
      tag: "LIVE",
      detail:
        "Every Informatica session judged against Canonical Run. Agents that judge a live session, stop a bad one, and leave Tuesday the notes.",
    },
    nightjob: {
      name: "Site",
      sub: "Four sites, four truths",
      tag: "ARENA",
      detail:
        "Four sites, four truths. Tuesday's extract and Wednesday's extract both looked right. We sat in a room rearranging mappings to pick a winner.",
    },
    whse: {
      name: "Mapping",
      sub: "Deck chairs · not the suit",
      tag: "CONSTRAINT",
      detail:
        "Rearranging mappings to pick a winner. Deck chairs. Palantir does not ask me to do that job harder. You put a suit on it.",
    },
    spec: {
      name: "Tuesday extract",
      sub: "Looked right · still not Canonical Run",
      tag: "GAP",
      detail:
        "Tuesday's extract looked right. So did Wednesday's. Both cannot be the Run. Canonical Run is the object that stays.",
    },
    goodpart: {
      name: "Wednesday extract",
      sub: "Looked right · still not Canonical Run",
      tag: "GAP",
      detail:
        "Wednesday's extract looked right. We sat in a room rearranging mappings to pick a winner. The argument dies when the object stays.",
    },
    shift: {
      name: "Tuesday notes",
      sub: "Same American worker",
      tag: "CREW",
      detail:
        "Agents leave Tuesday the notes. The night operator is not shuffling boxes at 2 a.m. The same American worker. The suit does the judgment.",
    },
    runbook: {
      name: "Runbook",
      sub: "Put Canonical Run on the floor",
      tag: "OUT",
      detail:
        "I have not shipped Foundry. I did not already build this ontology. I am asking you to put Canonical Run on the floor, and to put me on that deployment.",
    },
  };

  const MAP_ROWS = [
    { src: "cdc.journal (SQL Server)", wsdl: "session.change_set", ont: "CanonicalRun.cdc", status: "bad", label: "UNSCORED" },
    { src: "site.extract_tue", wsdl: "(four truths)", ont: "CanonicalRun.total", status: "gap", label: "FOUR TRUTHS" },
    { src: "site.extract_wed", wsdl: "(four truths)", ont: "CanonicalRun.total", status: "gap", label: "FOUR TRUTHS" },
    { src: "infa.session_id", wsdl: "session.id", ont: "Session.judged_against", status: "ok", label: "MATCH" },
    { src: "mapping.rearrange", wsdl: "mapping.winner", ont: "Mapping.deck_chairs", status: "bad", label: "DECK CHAIRS" },
    { src: "run.total", wsdl: "(absent — never an object)", ont: "CanonicalRun", status: "gap", label: "NO RUN" },
  ];

  const BEATS = [
    {
      id: "name",
      act: 1,
      title: "Who",
      view: "graph",
      speak:
        "I'm Jeremy Panasuk. New Auburn, Wisconsin. I'm not here to walk a fab. I'm here because Palantir is the suit around a job I already lived.",
      run() {
        setWrap(0);
        setIncident(false);
        setNode("op", "acting");
        setNode("lab", "live");
        selectObj("op");
        agent("op", "Palantir is the suit around a job I already lived.");
        agent("suit", "Not a plant tour. The suit around the fab-run job.");
      },
    },
    {
      id: "arena",
      act: 1,
      title: "Arena",
      view: "graph",
      speak:
        "I connected Micron fabs. Change data coming off SQL Server. Clones. Bulk loads into Teradata and Hadoop. They kept extending that pipe. We moved a lot of tables. We never put a Run on the floor. That's the arena.",
      run() {
        setWrap(0);
        setObj("nightjob", "live");
        setObj("erp", "live");
        setObj("lab", "live");
        ["erp", "timedim", "whse", "nightjob", "lab"].forEach((id) => setNode(id, "live"));
        setEdge("erp-nightjob", "live");
        setEdge("timedim-whse", "live");
        selectObj("nightjob");
        agent("suit", "Arena: Micron fabs. CDC, clones, bulk load. We never put a Run on the floor.");
      },
    },
    {
      id: "constraint",
      act: 2,
      title: "Constraint",
      view: "graph",
      speak:
        "The constraint was not more hardware. It was more journals. More sessions. Four sites, four truths. Tuesday's extract and Wednesday's extract both looked right, and we sat in a room rearranging mappings to pick a winner. Deck chairs. That's the job. Palantir doesn't ask me to do that job harder. You put a suit on it.",
      run() {
        setWrap(0);
        setIncident(true);
        ["nightjob", "spec", "goodpart", "whse"].forEach((id) => setObj(id, "broken"));
        ["nightjob", "spec", "goodpart", "whse"].forEach((id) => setNode(id, "broken"));
        setEdge("nightjob-spec", "broken");
        setEdge("spec-goodpart", "broken");
        setEdge("whse-goodpart", "broken");
        setObj("shift", "live");
        setNode("shift", "live");
        selectObj("whse");
        agent("op", "Four sites, four truths. Deck chairs.");
        agent("suit", "Constraint: more journals. More sessions. You put a suit on it.");
      },
    },
    {
      id: "theiradd",
      act: 3,
      title: "That's your add",
      view: "graph",
      speak:
        "That's your add. Canonical Run as a Foundry object. AIP scores live CDC. Agents stop the bad session. 100× the same American worker.",
      run() {
        setWrap(1);
        setIncident(false);
        setNode("op", "acting");
        setNode("lab", "acting");
        ["erp", "timedim", "nightjob", "whse"].forEach((id) => setNode(id, "acting"));
        ["aip-erp", "aip-timedim", "aip-nightjob", "aip-whse", "aip-lab"].forEach((id) => setEdge(id, "acting"));
        selectObj("lab");
        agent("op", "That's your add.");
        agent("suit", "Canonical Run as a Foundry object. AIP scores live CDC. Agents stop the bad session. 100× the same American worker.");
      },
    },
    {
      id: "object",
      act: 3,
      title: "Their add · Canonical Run",
      view: "graph",
      speak:
        "Foundry makes Canonical Run a real object. One view of the total run. Every Informatica session judged against it. Point at it Tuesday. Still right Wednesday.",
      run() {
        setWrap(1);
        setIncident(false);
        setNode("op", "acting");
        setNode("lab", "acting");
        ["erp", "timedim", "nightjob", "whse"].forEach((id) => setNode(id, "acting"));
        ["aip-erp", "aip-timedim", "aip-nightjob", "aip-whse", "aip-lab"].forEach((id) => setEdge(id, "acting"));
        selectObj("lab");
        agent("op", "Make Canonical Run a real object.");
        agent("suit", "Foundry: one view of the total run. Every session judged against it.");
      },
    },
    {
      id: "feelrun",
      act: 3,
      title: "Their add · one Run",
      view: "graph",
      speak:
        "Here is what that feels like on the floor. Four extracts. Four sites. Tuesday and Wednesday both look right. You get in a room and you pick a winner by rearranging mappings. The journals are just not the same object. When Canonical Run is a real Foundry object, the room changes. There is one view of the total run. You do not vote. You point. Tuesday can put a finger on it. Wednesday it is still that object. The argument is gone. That is the difference between four truths and one Run. The floor finally has something that stays. You stop rearranging chairs. You look at the object, and it is still the Run.",
      run() {
        setWrap(1);
        setIncident(false);
        ["nightjob", "spec", "goodpart", "whse"].forEach((id) => setNode(id, "broken"));
        setNode("lab", "acting");
        setNode("op", "acting");
        selectObj("lab");
        agent("op", "Four extracts in a room is not a Run.");
        agent("suit", "Canonical Run stays. Tuesday points. Wednesday it is still the object.");
      },
    },
    {
      id: "aip",
      act: 3,
      title: "Their add · AIP scores live",
      view: "graph",
      speak:
        "AIP scores live change before anyone opens a mapping. Matches or it doesn't. You know before the meeting. The argument dies. The object stays.",
      run() {
        setWrap(2);
        ["lab", "erp", "timedim"].forEach((id) => setNode(id, "acting"));
        ["aip-lab", "aip-erp", "aip-timedim"].forEach((id) => setEdge(id, "acting"));
        setObj("lab", "live");
        setObj("erp", "live");
        selectObj("erp");
        agent("suit", "AIP scores live CDC against Canonical Run. Match or it doesn't. Before the meeting.");
      },
    },
    {
      id: "nightscore",
      act: 3,
      title: "Their add · scored before the room",
      view: "graph",
      speak:
        "The night operator should not wait on a mapping to find out if the change is good. AIP scores the live CDC against Canonical Run while the session is still running. Matches or it does not. Nobody opens a mapping to start the fight. You know before anyone gets in a room. The operator is not sitting on a queue hoping the session lands. The score is already there. Live change against a live object. If it drifts, the suit sees it. The meeting never happens. That is how the night stays a night, not a mapping war. The mapping wait is the old job. This is scored before anyone sits down.",
      run() {
        setWrap(2);
        ["lab", "erp", "timedim"].forEach((id) => setNode(id, "acting"));
        ["aip-lab", "aip-erp", "aip-timedim"].forEach((id) => setEdge(id, "acting"));
        setObj("erp", "live");
        selectObj("erp");
        agent("suit", "Live CDC scored against Canonical Run. The operator is not waiting on a mapping.");
      },
    },
    {
      id: "agents",
      act: 3,
      title: "Their add · unleash the worker",
      view: "map",
      speak:
        "Agents judge a live session, stop a bad one, leave Tuesday the notes. The night operator is not shuffling boxes. The suit does the judgment.",
      run() {
        setWrap(3);
        bindGoodPart();
        enableAction("bind");
        enableAction("remap");
        enableAction("approve");
        renderMap(true);
        setBindCard(true);
        setNode("op", "acting");
        setNode("timedim", "acting");
        setNode("shift", "live");
        ["aip-spec", "aip-goodpart", "aip-timedim"].forEach((id) => setEdge(id, "bound"));
        agent("suit", "Agents judge a live session, stop a bad one, leave Tuesday the notes. 100 times the person.");
      },
    },
    {
      id: "sameworker",
      act: 3,
      title: "Their add · the worker stays",
      view: "runbook",
      speak:
        "The worker stays. I am not asking you to replace the night operator. I am asking you to put a suit on the same American worker. The suit does the judgment. Agents watch a live session. A bad one stops. Tuesday still has the notes. When I am not in the building, the floor is not borrowing my eyes. They have Canonical Run. They have the score. They have what Tuesday needs to run it. That is 100 times the person. Not a smarter mapping. The same worker, wearing your layer. Same person on the same floor. The judgment moved into the suit, and it stays there.",
      run() {
        setWrap(4);
        setObj("shift", "bound");
        setNode("shift", "bound");
        setNode("op", "acting");
        setNode("runbook", "live");
        setEdge("aip-shift", "bound");
        setEdge("shift-runbook", "bound");
        selectObj("shift");
        agent("suit", "The worker stays. The suit judges. Tuesday still has the notes.");
      },
    },
    {
      id: "ironman",
      act: 3,
      title: "Their add · the Iron Man suit",
      view: "runbook",
      speak:
        "Move data is table stakes. Make the Run real. Score it live. Stop the bad session before anyone gets in a room. Iron Man. Your layer.",
      run() {
        setWrap(5);
        shipRunbook();
        enableAction("ship");
        setObj("runbook", "done");
        setObj("shift", "bound");
        setObj("lab", "bound");
        setNode("runbook", "done");
        setNode("shift", "bound");
        setNode("lab", "bound");
        setNode("op", "acting");
        setEdge("aip-runbook", "bound");
        setEdge("aip-shift", "bound");
        setEdge("aip-lab", "bound");
        setEdge("shift-runbook", "bound");
        agent("suit", "Make the Run real. Score it live. Stop the bad session. Your layer.");
      },
    },
    {
      id: "close",
      act: 3,
      title: "Why I'm here",
      view: "measure",
      speak:
        "I have not shipped Foundry. I did not already build this ontology. Put Canonical Run on the floor. Put me on that deployment.",
      run() {
        setWrap(6);
        enableAction("measure");
        ["lab", "erp", "timedim", "nightjob", "whse"].forEach((id) => {
          setObj(id, "bound");
          setNode(id, "bound");
        });
        setNode("op", "done");
        setNode("lab", "done");
        setNode("shift", "done");
        setIncident(false);
        selectObj("op");
        agent("op", "Put Canonical Run on the floor. Put me on that deployment.");
        agent("suit", "I have not shipped Foundry. That is why I am here.");
      },
    },
  ];

  BEATS.forEach((b) => {
    const words = b.speak.trim().split(/\s+/).length;
    b.speakMs = words * 392;
    b.duration = b.speakMs + 500;
  });

  const canned = [
    {
      test: /want|why|suit for|wrap|here/i,
      reply:
        "Palantir is the suit around a job I already lived. Put Canonical Run on the floor, and put me on that deployment. That's why I'm here.",
    },
    {
      test: /canonical|run object|foundry/i,
      reply:
        "Foundry makes Canonical Run a real object. One view of the total run. Every Informatica session judged against it. I have not shipped Foundry. I did not already build this ontology.",
    },
    {
      test: /cdc|journal|sql server|change data/i,
      reply:
        "AIP scores live change against Canonical Run before anyone opens a mapping. The CDC either matches or it doesn't. You know before the meeting.",
    },
    {
      test: /session|agent|stop|2 a\.?m|night operator/i,
      reply:
        "Agents that judge a live session, stop a bad one, and leave Tuesday the notes. The same American worker. The suit does the judgment. 100 times the person, not a smarter mapping.",
    },
    {
      test: /mapping|deck|four truths|constraint/i,
      reply:
        "Four sites, four truths. Tuesday and Wednesday both looked right. Rearranging mappings to pick a winner is deck chairs. You put a suit on it.",
    },
    {
      test: /micron|fab|arena|hadoop|teradata|clone/i,
      reply:
        "I connected Micron fabs. CDC, clones, bulk loads into Teradata and Hadoop. They kept extending that pipe. We never put a Run on the floor. That's the arena.",
    },
    {
      test: /measure|speed|4070|garage|lab|tok/i,
      reply:
        "Move data is table stakes. I already know how to move data. This is not a garage pitch. Make the Run real. Score it live. Stop the bad session.",
    },
    {
      test: /runbook|tuesday|notes/i,
      reply:
        "Agents leave Tuesday the notes. If Canonical Run is not on the floor, it is a dashboard they clap for once.",
    },
    {
      test: /palantir|aip|iron/i,
      reply:
        "Foundry and AIP around the fab-run job. That is the Iron Man suit. Your layer. I have not shipped Foundry. Put me on that deployment.",
    },
    {
      test: /kohls|kohl|cargill|19|crisis|dawn|vw|volkswagen/i,
      reply:
        "Those are scars, not the pitch. The video is Canonical Run. Foundry. AIP. Put me on that deployment.",
    },
  ];

  let beat = -1;
  let autoTimer = null;
  let progTimer = null;
  let karaokeRaf = 0;
  let karaokeT0 = 0;
  let view = "graph";
  let bound = false;
  let shipped = false;
  const enabled = { bind: false, remap: false, approve: false, ship: false, measure: false };

  function setObj(id, state) {
    const el = $(`.obj[data-id="${id}"]`);
    if (!el) return;
    el.classList.remove("live", "broken", "bound", "done");
    if (state) el.classList.add(state);
  }
  function setNode(id, state) {
    const el = $(`.node[data-id="${id}"]`);
    if (!el) return;
    el.classList.remove("live", "broken", "bound", "acting", "done");
    if (state) el.classList.add(state);
  }
  function setEdge(id, state) {
    const el = $(`.edge[data-id="${id}"]`);
    if (!el) return;
    el.classList.remove("live", "broken", "bound", "acting");
    if (state) el.classList.add(state);
  }
  function setWrap(n) {
    document.body.dataset.wrap = String(n);
  }
  function selectObj(id) {
    $$(".obj").forEach((el) => el.classList.toggle("on", el.dataset.id === id));
    $$(".node").forEach((el) => el.classList.toggle("on", el.dataset.id === id));
    const o = OBJECTS[id];
    const box = $("#detail");
    if (o && box) box.innerHTML = `<strong>${o.name}</strong>${o.detail}`;
  }
  function setIncident(on) {
    const pill = $("#incident-pill");
    if (!pill) return;
    pill.className = on ? "pill alert" : "pill live";
    pill.innerHTML = on
      ? `<span class="dot alert"></span>SESSION DRIFT`
      : `<span class="dot"></span>RUN LIVE`;
  }
  function setView(name) {
    view = name;
    $$(".views button").forEach((b) => b.classList.toggle("on", b.dataset.view === name));
    $$(".panel-view").forEach((p) => p.classList.toggle("on", p.id === "view-" + name));
    $("#graph-wrap").style.display = name === "graph" ? "block" : "none";
    const h = $("#stage-title");
    const titles = {
      graph: "Canonical Run · one view of the total run",
      map: "The gap · four truths",
      runbook: "The wrap · Tuesday still has the notes",
      measure: "Canonical Run · not shipped yet",
    };
    if (document.body.dataset.act === "2" && name === "graph") {
      h.textContent = "Constraint · more journals, four truths";
    } else if (document.body.dataset.act === "3" && name === "graph") {
      h.textContent = "Iron Man · Foundry and AIP around the fab-run";
    } else {
      h.textContent = titles[name] || name;
    }
  }
  function enableAction(id) {
    enabled[id] = true;
    const b = $(`.actions button[data-act="${id}"]`);
    if (b) {
      b.disabled = false;
      if (id === "bind" || id === "ship") b.classList.add("go");
    }
  }
  function agent(who, text) {
    const log = $("#log");
    while (log.children.length > 8) log.removeChild(log.firstChild);
    const el = document.createElement("div");
    el.className = "msg " + who;
    el.innerHTML = `<div class="who">${who === "op" ? "Operator · Panasuk" : "AIP Logic · proposed"}</div><div class="body"></div>`;
    log.appendChild(el);
    const body = el.querySelector(".body");
    if (document.body.classList.contains("record")) {
      body.textContent = text;
      log.scrollTop = log.scrollHeight;
      return;
    }
    let i = 0;
    const tick = () => {
      i += 3;
      body.textContent = text.slice(0, i);
      log.scrollTop = log.scrollHeight;
      if (i < text.length) requestAnimationFrame(tick);
    };
    tick();
  }
  function renderMap(fixed) {
    const tb = $("#map-body");
    const sym = { bad: "≠", gap: "∅", ok: "=", fix: "→" };
    tb.innerHTML = MAP_ROWS.map((r) => {
      const st = fixed && (r.status === "bad" || r.status === "gap") ? "fix" : r.status;
      const lab = fixed && (r.status === "bad" || r.status === "gap") ? "BOUND" : r.label;
      return `<div class="drow ${st}">
        <div>${r.src}</div>
        <div class="op">${sym[st] || "·"}</div>
        <div>${r.wsdl}</div>
        <div>${r.ont}</div>
        <div class="status ${st}">${lab}</div>
      </div>`;
    }).join("");
  }
  function setBindCard(on) {
    const card = $("#bind-card");
    const kick = card.querySelector(".kicker");
    const copy = $("#bind-copy");
    card.classList.toggle("bound", on);
    kick.textContent = on ? "Object type · BOUND" : "Object type · not yet bound";
    copy.textContent = on
      ? "Canonical Run is a real object. Tuesday can point at it and still be right on Wednesday."
      : "CDC still has four truths. The mapping cannot see Canonical Run yet.";
  }
  function bindGoodPart() {
    bound = true;
    setObj("goodpart", "bound");
    setObj("spec", "bound");
    setNode("goodpart", "bound");
    setNode("spec", "bound");
    setEdge("spec-goodpart", "bound");
    setEdge("aip-goodpart", "bound");
    OBJECTS.goodpart.sub = "Bound to Canonical Run";
    OBJECTS.goodpart.tag = "BOUND";
    const sub = $(`.obj[data-id="goodpart"] .sub`);
    const tag = $(`.obj[data-id="goodpart"] .tag`);
    if (sub) sub.textContent = OBJECTS.goodpart.sub;
    if (tag) tag.textContent = OBJECTS.goodpart.tag;
  }
  function shipRunbook() {
    shipped = true;
    const d = new Date();
    const stamp = d.toISOString().slice(0, 16).replace("T", " ");
    $("#runbook-stamp").textContent = `Owner: Jeremy Panasuk · ${stamp} · Shift 2 · 4 shadowed`;
    OBJECTS.runbook.sub = "On the floor";
    OBJECTS.runbook.tag = "SHIPPED";
    const sub = $(`.obj[data-id="runbook"] .sub`);
    const tag = $(`.obj[data-id="runbook"] .tag`);
    if (sub) sub.textContent = OBJECTS.runbook.sub;
    if (tag) tag.textContent = OBJECTS.runbook.tag;
  }

  function wordCount(s) {
    return s.trim().split(/\s+/).length;
  }
  function fmt(ms) {
    const s = Math.max(0, Math.round(ms / 1000));
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  }
  function remainingMs(from) {
    let t = 0;
    for (let i = from; i < BEATS.length; i++) t += BEATS[i].duration;
    return t;
  }
  function stopKaraoke() {
    cancelAnimationFrame(karaokeRaf);
    karaokeRaf = 0;
  }
  function setSpeak(text, duration) {
    stopKaraoke();
    const el = $("#speak");
    const parts = text.split(/(\s+)/);
    el.innerHTML = parts
      .map((w) => (/^\s+$/.test(w) ? w : `<span class="w">${w.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</span>`))
      .join("");
    const spans = $$("#speak .w");
    if (!spans.length) return;
    karaokeT0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - karaokeT0) / Math.max(1, duration));
      const i = Math.min(spans.length - 1, Math.floor(p * spans.length));
      spans.forEach((s, n) => {
        s.classList.toggle("now", n === i);
        s.classList.toggle("said", n < i);
      });
      const nowWord = spans[i];
      const line = $("#speak");
      if (nowWord && line) {
        const top = nowWord.offsetTop - line.clientHeight / 2 + nowWord.offsetHeight / 2;
        line.scrollTop = Math.max(0, top);
      }
      if (p < 1) karaokeRaf = requestAnimationFrame(tick);
      else spans.forEach((s) => { s.classList.add("said"); s.classList.remove("now"); });
    };
    karaokeRaf = requestAnimationFrame(tick);
  }
  function setProg(p) {
    $("#prog-fill").style.width = Math.max(0, Math.min(100, p * 100)) + "%";
  }
  function stopProg() {
    if (progTimer) {
      clearInterval(progTimer);
      progTimer = null;
    }
    setProg(0);
  }
  function runProg(ms) {
    stopProg();
    const t0 = performance.now();
    progTimer = setInterval(() => {
      setProg((performance.now() - t0) / ms);
    }, 80);
  }

  function showBeat(i) {
    if (i < 0 || i >= BEATS.length) return;
    beat = i;
    const b = BEATS[i];
    document.body.dataset.act = String(b.act);
    setSpeak(b.speak, b.speakMs);
    const left = fmt(remainingMs(i));
    $("#beat-tag").textContent = `Beat ${i + 1} / ${BEATS.length} · ${b.title} · ${left} left · ${wordCount(b.speak)} words`;
    $$(".act").forEach((el, idx) => {
      const n = idx + 1;
      el.classList.toggle("on", n === b.act);
      el.classList.toggle("done", n < b.act);
    });
    setView(b.view);
    b.run();
    runProg(b.duration);
    $("#next-btn").textContent = i === BEATS.length - 1 ? "End" : "Next beat";
  }
  function next() {
    if (beat >= BEATS.length - 1) {
      stopAuto();
      stopProg();
      stopKaraoke();
      return;
    }
    showBeat(beat + 1);
  }
  function prev() {
    if (beat <= 0) return;
    stopAuto();
    resetWorld(false);
    const target = beat - 1;
    for (let i = 0; i <= target; i++) showBeat(i);
  }
  function jumpAct(n) {
    stopAuto();
    const idx = BEATS.findIndex((b) => b.act === n);
    if (idx < 0) return;
    resetWorld(false);
    for (let i = 0; i <= idx; i++) showBeat(i);
  }
  function stopAuto() {
    if (autoTimer) {
      clearTimeout(autoTimer);
      autoTimer = null;
    }
    $("#auto-btn").textContent = "Auto-demo";
  }
  function runAuto() {
    if (autoTimer) {
      stopAuto();
      return;
    }
    $("#auto-btn").textContent = "Pause";
    const step = () => {
      if (beat >= BEATS.length - 1) {
        stopAuto();
        return;
      }
      next();
      autoTimer = setTimeout(step, BEATS[beat].duration);
    };
    if (beat < 0) {
      showBeat(0);
      autoTimer = setTimeout(step, BEATS[0].duration);
    } else {
      autoTimer = setTimeout(step, BEATS[beat].duration);
    }
  }
  function resetWorld(splash) {
    stopAuto();
    stopKaraoke();
    stopProg();
    beat = -1;
    bound = false;
    shipped = false;
    setWrap(0);
    document.body.dataset.act = "0";
    Object.keys(enabled).forEach((k) => (enabled[k] = false));
    $$(".obj").forEach((el) => el.classList.remove("live", "broken", "bound", "done", "on"));
    $$(".node").forEach((el) => el.classList.remove("live", "broken", "bound", "acting", "done", "on"));
    $$(".edge").forEach((el) => el.classList.remove("live", "broken", "bound", "acting"));
    $$(".actions button").forEach((b) => {
      b.disabled = true;
      b.classList.remove("go");
    });
    $("#log").innerHTML = "";
    setIncident(false);
    OBJECTS.goodpart.sub = "Looked right · still not Canonical Run";
    OBJECTS.goodpart.tag = "BIND";
    OBJECTS.runbook.sub = "Put Canonical Run on the floor";
    OBJECTS.runbook.tag = "OUT";
    const gpSub = $(`.obj[data-id="goodpart"] .sub`);
    const gpTag = $(`.obj[data-id="goodpart"] .tag`);
    if (gpSub) gpSub.textContent = OBJECTS.goodpart.sub;
    if (gpTag) gpTag.textContent = OBJECTS.goodpart.tag;
    const rbSub = $(`.obj[data-id="runbook"] .sub`);
    const rbTag = $(`.obj[data-id="runbook"] .tag`);
    if (rbSub) rbSub.textContent = OBJECTS.runbook.sub;
    if (rbTag) rbTag.textContent = OBJECTS.runbook.tag;
    renderMap(false);
    setBindCard(false);
    $("#detail").innerHTML =
      "<strong>Canonical Run</strong>One view of the total run. Every Informatica session judged against it. Palantir AIP as the suit wrapping those objects. I have not shipped Foundry.";
    $("#speak").textContent = "Press Space to arm the first beat. D runs the whole take.";
    $("#beat-tag").textContent = "Armed · waiting";
    $$(".act").forEach((el) => el.classList.remove("on", "done"));
    setView("graph");
    $("#next-btn").textContent = "Arm";
    if (splash) $("#splash").classList.remove("hide");
  }

  function askSuit(q) {
    const text = (q || "").trim();
    if (!text) return;
    agent("op", text);
    const hit = canned.find((c) => c.test.test(text));
    const reply = hit
      ? hit.reply
      : "That's your add. Canonical Run. Score live CDC. Stop the bad session. Press D to run the wrap.";
    setTimeout(() => agent("suit", reply), 280);
  }

  function tickClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    $("#clock").textContent = `${hh}:${mm}:${ss}`;
  }

  function armFromSplash() {
    $("#splash").classList.add("hide");
    if (beat < 0) showBeat(0);
  }

  function onAction(id) {
    if (id === "bind") {
      bindGoodPart();
      enableAction("remap");
      setWrap(Math.max(Number(document.body.dataset.wrap) || 0, 2));
      agent("suit", "Canonical Run is a real object. One view of the total run.");
      setView("map");
      renderMap(true);
      setBindCard(true);
    } else if (id === "remap") {
      renderMap(true);
      setView("map");
      setObj("spec", "bound");
      setNode("spec", "bound");
      setWrap(Math.max(Number(document.body.dataset.wrap) || 0, 3));
      agent("suit", "AIP scores live CDC against Canonical Run. Matches or it doesn't.");
      enableAction("approve");
    } else if (id === "approve") {
      enableAction("ship");
      setWrap(Math.max(Number(document.body.dataset.wrap) || 0, 4));
      agent("op", "Approved. The argument dies. The object stays.");
      agent("suit", "Human in the loop. Acting.");
      ["nightjob", "whse"].forEach((id2) => {
        setObj(id2, "bound");
        setNode(id2, "bound");
      });
    } else if (id === "ship") {
      shipRunbook();
      setWrap(Math.max(Number(document.body.dataset.wrap) || 0, 5));
      setView("runbook");
      setObj("runbook", "done");
      setNode("runbook", "done");
      agent("suit", "Tuesday has the notes. Canonical Run is on the floor.");
      enableAction("measure");
    } else if (id === "measure") {
      setWrap(6);
      setView("measure");
      agent("suit", "I have not shipped Foundry. That is your add. That is why I am here.");
    }
  }

  function bindUi() {
    $$(".obj").forEach((el) => {
      el.addEventListener("click", () => selectObj(el.dataset.id));
    });
    $$(".node").forEach((el) => {
      el.addEventListener("click", () => {
        selectObj(el.dataset.id);
      });
    });
    $$(".views button").forEach((b) => b.addEventListener("click", () => setView(b.dataset.view)));
    $$(".actions button").forEach((b) =>
      b.addEventListener("click", () => {
        enableAction(b.dataset.act);
        onAction(b.dataset.act);
      })
    );
    $("#next-btn").addEventListener("click", () => {
      $("#splash").classList.add("hide");
      if (beat < 0) showBeat(0);
      else next();
    });
    $("#back-btn").addEventListener("click", prev);
    $("#auto-btn").addEventListener("click", () => {
      $("#splash").classList.add("hide");
      runAuto();
    });
    $("#reset-btn").addEventListener("click", () => resetWorld(true));
    $("#prompt-btn").addEventListener("click", () => document.body.classList.toggle("no-prompt"));
    $("#help-btn").addEventListener("click", () => $("#help").classList.toggle("on"));
    $("#help").addEventListener("click", (e) => {
      if (e.target.id === "help") $("#help").classList.remove("on");
    });
    $("#arm-btn").addEventListener("click", armFromSplash);
    $("#ask-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const input = $("#ask-q");
      askSuit(input.value);
      input.value = "";
    });
    document.addEventListener("keydown", (e) => {
      if (e.target.matches("input, textarea")) return;
      if (e.key === " " || e.key === "ArrowRight") {
        e.preventDefault();
        $("#splash").classList.add("hide");
        if (beat < 0) showBeat(0);
        else next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "d" || e.key === "D") {
        e.preventDefault();
        $("#splash").classList.add("hide");
        runAuto();
      } else if (e.key === "r" || e.key === "R") {
        resetWorld(true);
      } else if (e.key === "t" || e.key === "T") {
        document.body.classList.toggle("no-prompt");
      } else if (e.key === "h" || e.key === "H" || e.key === "?") {
        $("#help").classList.toggle("on");
      } else if (e.key === "1" || e.key === "2" || e.key === "3") {
        $("#splash").classList.add("hide");
        jumpAct(Number(e.key));
      } else if (e.key === "Escape") {
        stopAuto();
        $("#help").classList.remove("on");
      } else if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
        else document.exitFullscreen().catch(() => {});
      }
    });
  }

  function boot() {
    renderMap(false);
    setBindCard(false);
    bindUi();
    tickClock();
    setInterval(tickClock, 1000);
    const params = new URLSearchParams(location.search);
    if (params.get("record") === "1") {
      document.body.classList.add("record");
      $("#splash").classList.add("hide");
      showBeat(0);
      runAuto();
    } else if (params.get("beat") !== null) {
      $("#splash").classList.add("hide");
      const n = Math.max(0, Math.min(BEATS.length - 1, parseInt(params.get("beat"), 10) || 0));
      for (let i = 0; i <= n; i++) showBeat(i);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
