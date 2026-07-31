/* ==========================================================================
   拾光读书会 · 应用逻辑
   纯前端渲染：hash 路由 + 数据驱动，无需构建工具
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- 工具 ---------- */

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function esc(str) {
    return String(str ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  /* 豆瓣图片可能拒绝外链；失败时隐藏破图，露出下方的彩色封面。 */
  document.addEventListener("error", (event) => {
    const image = event.target;
    if (image && image.matches && image.matches("img[data-cover-image]")) image.hidden = true;
  }, true);

  /* 从书名生成稳定的暖色系封面配色（同一本书永远同色） */
  const COVER_PALETTES = [
    ["#7E3B2C", "#5C2A1F"], ["#4E5D3A", "#37452A"], ["#3E5C6B", "#2B4350"],
    ["#8A6A2F", "#6B5122"], ["#5D4A66", "#453450"], ["#356057", "#254740"],
    ["#914D3A", "#6E3728"], ["#4A5568", "#353E4D"], ["#6B4226", "#4F2F1A"],
    ["#2F4858", "#223644"], ["#7A5230", "#5B3C21"], ["#584E7E", "#413963"]
  ];

  function coverPalette(title) {
    let hash = 0;
    for (let i = 0; i < title.length; i++) hash = (hash * 31 + title.charCodeAt(i)) >>> 0;
    return COVER_PALETTES[hash % COVER_PALETTES.length];
  }

  function coverStyle(title) {
    const [c1, c2] = coverPalette(title);
    return `background: linear-gradient(155deg, ${c1}, ${c2});`;
  }

  const AVATAR_COLORS = ["#A4441F", "#4E5D3A", "#3E5C6B", "#8A6A2F", "#5D4A66", "#356057", "#914D3A", "#584E7E"];
  function avatarColor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
    return AVATAR_COLORS[hash % AVATAR_COLORS.length];
  }
  function avatarHtml(name, extraClass = "") {
    const initial = esc(name.replace(/^特邀\s*·\s*/, "").slice(0, 1));
    return `<span class="avatar ${extraClass}" style="background:${avatarColor(name)}" title="${esc(name)}">${initial}</span>`;
  }

  function formatDate(iso) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${y} 年 ${Number(m)} 月 ${Number(d)} 日`;
  }

  const bookById = (id) => BOOKS.find((b) => b.id === id);
  const sessionByBook = (bookId) => SESSIONS.find((s) => s.bookId === bookId);

  /* ---------- 书籍卡片 ---------- */

  function bookCoverHtml(book, cls = "book-cover") {
    return `
      <div class="${cls}" style="${coverStyle(book.title)}">
        <span class="cover-title">${esc(book.title)}</span>
        <span class="cover-author">${esc(book.author)}</span>
        ${book.cover ? `<img data-cover-image src="${esc(book.cover)}" alt="《${esc(book.title)}》封面" loading="lazy" referrerpolicy="no-referrer">` : ""}
      </div>`;
  }

  const FILM_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>`;

  function bookCardHtml(book) {
    return `
      <button class="book-card reveal" data-book="${book.id}" aria-haspopup="dialog">
        ${bookCoverHtml(book)}
        <div class="book-meta">
          <h3 class="media-title" title="${esc(book.title)}">${esc(book.title)}</h3>
          <span class="book-author">${esc(book.author)}</span>
          <div class="book-tags">
            <span class="tag">${esc(book.category)}</span>
            ${book.rating ? `<span class="book-rating">${"★".repeat(book.rating)}</span>` : ""}
            ${book.session ? `<span class="tag tag-session">第 ${book.session} 期</span>` : ""}
            ${book.movie ? `<span class="tag tag-movie">${FILM_ICON}电影</span>` : ""}
          </div>
        </div>
      </button>`;
  }

  /* ---------- 首页滚动书墙 ---------- */

  const MARQUEE_MAX = 24; // 书太多时只取最近共读的 N 本，保证滚动流畅

  function marqueeBookHtml(book, isCopy) {
    const copyAttrs = isCopy ? `class="marquee-book marquee-copy" aria-hidden="true" tabindex="-1"` : `class="marquee-book"`;
    const inner = `<span class="mq-title">${esc(book.title)}</span><span class="mq-author">${esc(book.author)}</span>` +
      (book.cover ? `<img data-cover-image src="${esc(book.cover)}" alt="" loading="lazy" referrerpolicy="no-referrer">` : "");
    return `<button ${copyAttrs} data-book="${book.id}" style="${coverStyle(book.title)}"
              aria-label="《${esc(book.title)}》 ${esc(book.author)}">${inner}</button>`;
  }

  function renderMarquee() {
    const track = $("#marqueeTrack");
    if (!track) return;
    const books = [...BOOKS]
      .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
      .slice(0, MARQUEE_MAX);
    /* 两份完全相同的内容首尾相接，动画位移 -50% 时无缝回到起点 */
    track.innerHTML =
      books.map((b) => marqueeBookHtml(b, false)).join("") +
      books.map((b) => marqueeBookHtml(b, true)).join("");
    track.style.setProperty("--marquee-duration", `${Math.max(30, books.length * 2.6)}s`);
  }

  /* ---------- 首页 ---------- */

  function renderHome() {
    const movieCount = typeof MOVIES !== "undefined" ? MOVIES.length : 0;
    const stats = [
      { label: "读过的书", value: BOOKS.length, suffix: "本" },
      { label: "看过的影视", value: movieCount, suffix: "部" },
    ];
    if (SESSIONS.length > 0) stats.push({ label: "活动期数", value: SESSIONS.length, suffix: "期" });
    const years = new Date().getFullYear() - SITE_STATS.foundedYear;
    if (years > 0) stats.push({ label: "坚持年头", value: years, suffix: "年" });
    $("#heroStats").innerHTML = stats.map((s) => `
      <div><dd>${s.value}<span>${s.suffix}</span></dd><dt>${s.label}</dt></div>`).join("");

    /* 装饰书架：取最近 5 本书名 */
    const recent = [...BOOKS].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    $("#heroShelf").innerHTML = recent.slice(0, 5).map((b) => {
      const [c1, c2] = coverPalette(b.title);
      return `<span class="spine" style="background:linear-gradient(${c1},${c2})">${esc(b.title.slice(0, 6))}</span>`;
    }).join("");

    $("#homeBooks").innerHTML = recent.slice(0, 4).map(bookCardHtml).join("");

    /* 最近一期活动大卡 */
    const latest = SESSIONS.length ? [...SESSIONS].sort((a, b) => b.date.localeCompare(a.date))[0] : null;
    if (!latest) { const sec = $("#homeSessionSection"); if (sec) sec.style.display = "none"; return; }
    if (latest) {
      const book = bookById(latest.bookId);
      $("#homeSession").innerHTML = `
        <button class="feature-session" data-session="${latest.id}">
          <div class="fs-cover" style="background:${coverPalette(book.title)[1]}22">
            <div class="mini-book" style="${coverStyle(book.title)}"><span>${esc(book.title)}</span></div>
          </div>
          <div class="fs-body">
            <span class="fs-date">第 ${latest.no} 期 · ${formatDate(latest.date)}</span>
            <h3>${esc(latest.title)}</h3>
            <p class="fs-summary">${esc(latest.summary)}</p>
            <div class="attendee-row">
              <span class="avatar-stack">${latest.attendees.slice(0, 6).map((a) => avatarHtml(a.name)).join("")}</span>
              <span class="attendee-count">${latest.attendees.length} 位书友参与</span>
            </div>
          </div>
        </button>`;
    }
  }

  /* ---------- 书库：搜索 / 筛选 / 排序 / 分页 ---------- */

  const PAGE_SIZE = 12;
  const bookState = { query: "", category: "全部", sort: "date-desc", page: 1 };

  function filteredBooks() {
    let list = BOOKS.filter((b) => {
      const q = bookState.query.trim().toLowerCase();
      const matchQ = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
      const matchC = bookState.category === "全部" || b.category === bookState.category;
      return matchQ && matchC;
    });
    if (bookState.sort === "date-desc") list.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    if (bookState.sort === "date-asc") list.sort((a, b) => (a.date || "").localeCompare(b.date || ""));
    if (bookState.sort === "session-desc") list.sort((a, b) => (b.session || 0) - (a.session || 0));
    if (bookState.sort === "session-asc") list.sort((a, b) => (a.session || 0) - (b.session || 0));
    if (bookState.sort === "rating-desc") list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (bookState.sort === "title") list.sort((a, b) => a.title.localeCompare(b.title, "zh"));
    return list;
  }

  function renderCategoryChips() {
    const cats = ["全部", ...new Set(BOOKS.map((b) => b.category))];
    $("#categoryChips").innerHTML = cats.map((c) => `
      <button class="chip" data-cat="${esc(c)}" aria-pressed="${c === bookState.category}">${esc(c)}</button>`).join("");
  }

  function renderPager(total) {
    const pages = Math.ceil(total / PAGE_SIZE);
    const pager = $("#bookPager");
    if (pages <= 1) { pager.innerHTML = ""; return; }

    const cur = bookState.page;
    const nums = [];
    for (let p = 1; p <= pages; p++) {
      if (p === 1 || p === pages || Math.abs(p - cur) <= 1) nums.push(p);
      else if (nums[nums.length - 1] !== "…") nums.push("…");
    }
    pager.innerHTML = `
      <button data-page="${cur - 1}" ${cur === 1 ? "disabled" : ""} aria-label="上一页">‹</button>
      ${nums.map((p) => p === "…"
        ? `<span class="pager-ellipsis">…</span>`
        : `<button data-page="${p}" ${p === cur ? 'aria-current="page"' : ""}>${p}</button>`).join("")}
      <button data-page="${cur + 1}" ${cur === pages ? "disabled" : ""} aria-label="下一页">›</button>`;
  }

  function renderBooks() {
    const list = filteredBooks();
    const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
    if (bookState.page > pages) bookState.page = pages;

    const slice = list.slice((bookState.page - 1) * PAGE_SIZE, bookState.page * PAGE_SIZE);
    $("#bookGrid").innerHTML = slice.map(bookCardHtml).join("");
    $("#bookEmpty").hidden = list.length > 0;
    const years = new Date().getFullYear() - SITE_STATS.foundedYear;
    $("#booksCount").textContent = `${years} 年时光，${BOOKS.length} 本书的共同记忆 · 当前显示 ${list.length} 本`;
    renderPager(list.length);
    observeReveals();
  }

  /* ---------- 往期活动时间线 ---------- */

  function renderSessions() {
    const list = [...SESSIONS].sort((a, b) => b.date.localeCompare(a.date));
    $("#sessionsCount").textContent = `${list.length} 期活动记录 · 每一次相聚都值得被记住`;
    $("#sessionTimeline").innerHTML = list.map((s) => {
      const book = bookById(s.bookId);
      return `
        <div class="timeline-item reveal">
          <span class="timeline-dot" aria-hidden="true"></span>
          <p class="timeline-date">${formatDate(s.date)} · ${esc(s.location)}</p>
          <button class="session-card" data-session="${s.id}">
            <div class="session-card-head">
              <span class="session-no">第 ${s.no} 期</span>
              <h3>${esc(s.title)}</h3>
            </div>
            <p class="session-book">共读书目：《${esc(book ? book.title : "")}》 · ${esc(book ? book.author : "")}</p>
            <p class="session-summary">${esc(s.summary)}</p>
            <div class="attendee-row">
              <span class="avatar-stack">${s.attendees.slice(0, 7).map((a) => avatarHtml(a.name)).join("")}</span>
              <span class="attendee-count">${s.attendees.length} 位书友参与 · 领读：${esc(s.leader)}</span>
            </div>
          </button>
        </div>`;
    }).join("");
    observeReveals();
  }

  /* ---------- 富媒体内容块渲染 ---------- */

  const FILE_KIND_LABEL = { pdf: "PDF", ppt: "PPT", doc: "DOC", xls: "XLS", other: "文件" };

  function blockHtml(block) {
    switch (block.type) {
      case "heading":
        return `<h3 class="block-heading">${esc(block.text)}</h3>`;

      case "text":
        return `<div class="block-text">${block.text.split(/\n\n+/).map((p) => `<p>${esc(p)}</p>`).join("")}</div>`;

      case "quote":
        return `<blockquote class="block-quote">${esc(block.text)}${block.cite ? `<cite>—— ${esc(block.cite)}</cite>` : ""}</blockquote>`;

      case "image":
        return `
          <figure class="block-image">
            <img src="${esc(block.src)}" alt="${esc(block.caption || "活动照片")}" loading="lazy"
                 data-lightbox data-caption="${esc(block.caption || "")}">
            ${block.caption ? `<figcaption>${esc(block.caption)}</figcaption>` : ""}
          </figure>`;

      case "gallery":
        return `
          <div class="block-gallery">
            <div class="gallery-grid">
              ${block.images.map((img) => `
                <img src="${esc(img.src)}" alt="${esc(img.caption || "活动照片")}" loading="lazy"
                     data-lightbox data-caption="${esc(img.caption || "")}">`).join("")}
            </div>
          </div>`;

      case "video": {
        const isLocal = /\.(mp4|webm|mov)(\?|$)/i.test(block.src);
        const media = isLocal
          ? `<video src="${esc(block.src)}" controls preload="metadata"></video>`
          : `<iframe src="${esc(block.src)}" title="${esc(block.caption || "视频")}" allowfullscreen
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"></iframe>`;
        return `
          <figure class="block-video">
            <div class="video-frame">${media}</div>
            ${block.caption ? `<figcaption>${esc(block.caption)}</figcaption>` : ""}
          </figure>`;
      }

      case "link":
        return `
          <a class="block-link" href="${esc(block.url)}" target="_blank" rel="noopener noreferrer">
            <span class="link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            </span>
            <span>
              <span class="link-title">${esc(block.title)}</span>
              ${block.desc ? `<p class="link-desc">${esc(block.desc)}</p>` : ""}
            </span>
          </a>`;

      case "file": {
        const kind = FILE_KIND_LABEL[block.kind] ? block.kind : "other";
        const preview = block.preview && kind === "pdf"
          ? `<div class="file-preview"><iframe src="${esc(block.src)}" title="${esc(block.name)} 预览"></iframe></div>`
          : "";
        return `
          <div class="block-file">
            <div class="file-bar">
              <span class="file-icon ${kind}">${FILE_KIND_LABEL[kind]}</span>
              <span>
                <span class="file-name">${esc(block.name)}</span>
                ${block.size ? `<p class="file-info">${esc(block.size)}</p>` : ""}
              </span>
              <span class="file-actions">
                <a class="file-btn" href="${esc(block.src)}" target="_blank" rel="noopener">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  查看
                </a>
                <a class="file-btn" href="${esc(block.src)}" download>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  下载
                </a>
              </span>
            </div>
            ${preview}
          </div>`;
      }

      case "table":
        return `
          <div class="block-table">
            <table>
              ${block.caption ? `<caption>${esc(block.caption)}</caption>` : ""}
              <thead><tr>${block.headers.map((h) => `<th scope="col">${esc(h)}</th>`).join("")}</tr></thead>
              <tbody>${block.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>
            </table>
          </div>`;

      default:
        return "";
    }
  }

  /* ---------- 活动详情页 ---------- */

  function renderSessionDetail(id) {
    const s = SESSIONS.find((x) => x.id === id);
    const wrap = $("#sessionDetail");
    if (!s) {
      wrap.innerHTML = `<div class="empty-state"><p>没有找到这期活动</p><a class="btn btn-ghost" href="#/sessions">返回活动列表</a></div>`;
      return;
    }
    const book = bookById(s.bookId);
    wrap.innerHTML = `
      <a class="back-link" href="#/sessions">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        返回往期活动
      </a>
      <header class="detail-head">
        <span class="session-no">第 ${s.no} 期</span>
        <h1 class="detail-title">${esc(s.title)}</h1>
        <div class="detail-meta">
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            ${formatDate(s.date)}
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${esc(s.location)}
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            共读《${esc(book ? book.title : "")}》 · ${esc(book ? book.author : "")}
          </span>
        </div>
        <div class="detail-attendees">
          <h4>参与书友（${s.attendees.length} 人）</h4>
          <div class="attendee-chips">
            ${s.attendees.map((a) => `
              <span class="attendee-chip">
                ${avatarHtml(a.name)}
                ${esc(a.name)}
                ${a.role ? `<span class="attendee-role">${esc(a.role)}</span>` : ""}
              </span>`).join("")}
          </div>
        </div>
      </header>
      <div class="content-blocks">
        ${s.blocks.map(blockHtml).join("")}
      </div>`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  /* ---------- 书籍详情弹层 ---------- */

  const modal = $("#bookModal");
  let lastFocus = null;

  function openBookModal(id) {
    const book = bookById(id);
    if (!book) return;
    const session = sessionByBook(id);
    const coverInner = `<span>${esc(book.title)}</span>` +
      (book.cover ? `<img data-cover-image src="${esc(book.cover)}" alt="《${esc(book.title)}》封面" referrerpolicy="no-referrer">` : "");
    $("#bookModalBody").innerHTML = `
      <div class="modal-book">
        <div class="mb-cover">
          <div class="big-book" style="${coverStyle(book.title)}">${coverInner}</div>
        </div>
        <div class="mb-body">
          <div class="mb-tags">
            <span class="tag">${esc(book.category)}</span>
            ${book.session ? `<span class="tag tag-session">第 ${book.session} 期共读</span>` : ""}
            ${book.date ? `<span class="tag tag-session">${formatDate(book.date)}</span>` : ""}
          </div>
          <h2 id="bookModalTitle">${esc(book.title)}</h2>
          <p class="mb-author">${esc(book.author)}</p>
          ${book.rating ? `<p class="mb-rating">${"★".repeat(book.rating)}${"☆".repeat(5 - book.rating)}</p>` : ""}
          ${book.intro ? `<p class="mb-intro">${esc(book.intro)}</p>` : ""}
          <div class="mb-links">
            ${session ? `
              <a class="mb-session-link" href="#/session/${session.id}">
                查看这一期的活动记录
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>` : ""}
            ${book.doubanUrl ? `
              <a class="mb-douban-link" href="${esc(book.doubanUrl)}" target="_blank" rel="noopener noreferrer">
                📖 豆瓣页面
              </a>` : ""}
            ${book.movie ? `
              <a class="mb-movie-link" href="${esc(book.movie.url)}" target="_blank" rel="noopener noreferrer">
                ${FILM_ICON}
                ${esc(book.movie.title || "观看同名影视")}
              </a>` : ""}
          </div>
        </div>
      </div>`;
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $(".modal-close", modal).focus();
  }

  function closeBookModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  /* ---------- 影库：卡片 / 搜索 / 筛选 / 排序 / 分页 ---------- */

  function movieCoverHtml(movie, cls = "book-cover") {
    return `
      <div class="${cls}" style="${coverStyle(movie.title)}">
        <span class="cover-title">${esc(movie.title)}</span>
        <span class="cover-author">${esc(movie.director)}</span>
        ${movie.cover ? `<img data-cover-image src="${esc(movie.cover)}" alt="《${esc(movie.title)}》海报" loading="lazy" referrerpolicy="no-referrer">` : ""}
      </div>`;
  }

  function movieCardHtml(movie) {
    return `
      <button class="book-card reveal" data-movie="${movie.id}" aria-haspopup="dialog">
        ${movieCoverHtml(movie)}
        <div class="book-meta">
          <h3 class="media-title" title="${esc(movie.title)}">${esc(movie.title)}</h3>
          <span class="book-author">${esc(movie.director)}${movie.year ? ` · ${esc(movie.year)}` : ""}</span>
          <div class="book-tags">
            ${movie.genres && movie.genres[0] ? `<span class="tag">${esc(movie.genres[0])}</span>` : ""}
            ${movie.rating ? `<span class="book-rating">${"★".repeat(movie.rating)}</span>` : ""}
          </div>
        </div>
      </button>`;
  }

  const movieState = { query: "", genre: "全部", sort: "date-desc", page: 1 };

  function filteredMovies() {
    if (typeof MOVIES === "undefined") return [];
    let list = MOVIES.filter((m) => {
      const q = movieState.query.trim().toLowerCase();
      const matchQ = !q || m.title.toLowerCase().includes(q) || (m.director || "").toLowerCase().includes(q);
      const matchG = movieState.genre === "全部" || (m.genres && m.genres.includes(movieState.genre));
      return matchQ && matchG;
    });
    if (movieState.sort === "date-desc") list.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    if (movieState.sort === "rating-desc") list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (movieState.sort === "title") list.sort((a, b) => a.title.localeCompare(b.title, "zh"));
    return list;
  }

  function renderMovieGenreChips() {
    if (typeof MOVIES === "undefined") return;
    const genres = new Set();
    MOVIES.forEach((m) => { if (m.genres) m.genres.forEach((g) => genres.add(g)); });
    const all = ["全部", ...genres];
    const el = $("#movieGenreChips");
    if (!el) return;
    el.innerHTML = all.map((g) => `
      <button class="chip" data-mcat="${esc(g)}" aria-pressed="${g === movieState.genre}">${esc(g)}</button>`).join("");
  }

  function renderMoviePager(total) {
    const pages = Math.ceil(total / PAGE_SIZE);
    const pager = $("#moviePager");
    if (!pager) return;
    if (pages <= 1) { pager.innerHTML = ""; return; }
    const cur = movieState.page;
    const nums = [];
    for (let p = 1; p <= pages; p++) {
      if (p === 1 || p === pages || Math.abs(p - cur) <= 1) nums.push(p);
      else if (nums[nums.length - 1] !== "…") nums.push("…");
    }
    pager.innerHTML = `
      <button data-mpage="${cur - 1}" ${cur === 1 ? "disabled" : ""} aria-label="上一页">‹</button>
      ${nums.map((p) => p === "…"
        ? `<span class="pager-ellipsis">…</span>`
        : `<button data-mpage="${p}" ${p === cur ? 'aria-current="page"' : ""}>${p}</button>`).join("")}
      <button data-mpage="${cur + 1}" ${cur === pages ? "disabled" : ""} aria-label="下一页">›</button>`;
  }

  function renderMovies() {
    if (typeof MOVIES === "undefined") return;
    const list = filteredMovies();
    const slice = list.slice((movieState.page - 1) * PAGE_SIZE, movieState.page * PAGE_SIZE);
    const grid = $("#movieGrid");
    if (grid) grid.innerHTML = slice.map(movieCardHtml).join("");
    const empty = $("#movieEmpty");
    if (empty) empty.hidden = list.length > 0;
    const count = $("#moviesCount");
    if (count) count.textContent = `${MOVIES.length} 部影视 · 当前显示 ${list.length} 部`;
    renderMoviePager(list.length);
    observeReveals();
  }

  /* 影视详情弹层 */
  const movieModal = $("#movieModal");
  let movieLastFocus = null;

  function openMovieModal(id) {
    if (typeof MOVIES === "undefined") return;
    const movie = MOVIES.find((m) => m.id === id);
    if (!movie) return;
    const coverInner = `<span>${esc(movie.title)}</span>` +
      (movie.cover ? `<img data-cover-image src="${esc(movie.cover)}" alt="《${esc(movie.title)}》海报" referrerpolicy="no-referrer">` : "");
    $("#movieModalBody").innerHTML = `
      <div class="modal-book">
        <div class="mb-cover">
          <div class="big-book" style="${coverStyle(movie.title)}">${coverInner}</div>
        </div>
        <div class="mb-body">
          <div class="mb-tags">
            ${movie.genres ? movie.genres.map((g) => `<span class="tag">${esc(g)}</span>`).join("") : ""}
            ${movie.year ? `<span class="tag tag-session">${esc(movie.year)}</span>` : ""}
          </div>
          <h2 id="movieModalTitle">${esc(movie.title)}</h2>
          <p class="mb-author">${esc(movie.director)}</p>
          ${movie.rating ? `<p class="mb-rating">${"★".repeat(movie.rating)}${"☆".repeat(5 - movie.rating)}</p>` : ""}
          ${movie.comment ? `<p class="mb-intro">${esc(movie.comment)}</p>` : ""}
          ${movie.date ? `<p class="mb-date">观看于 ${formatDate(movie.date)}</p>` : ""}
          <div class="mb-links">
            ${movie.doubanUrl ? `
              <a class="mb-douban-link" href="${esc(movie.doubanUrl)}" target="_blank" rel="noopener noreferrer">
                🎬 豆瓣页面
              </a>` : ""}
          </div>
        </div>
      </div>`;
    movieLastFocus = document.activeElement;
    movieModal.hidden = false;
    document.body.style.overflow = "hidden";
    $(".modal-close", movieModal).focus();
  }

  function closeMovieModal() {
    movieModal.hidden = true;
    document.body.style.overflow = "";
    if (movieLastFocus) movieLastFocus.focus();
  }

  /* ---------- 灯箱 ---------- */

  const lightbox = $("#lightbox");

  function openLightbox(src, caption) {
    $("#lightboxImg").src = src;
    $("#lightboxImg").alt = caption || "活动照片";
    $("#lightboxCaption").textContent = caption || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  /* ---------- 入场动画 ---------- */

  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.08 })
    : null;

  function observeReveals() {
    $$(".reveal:not(.in)").forEach((el) => {
      if (io) io.observe(el);
      else el.classList.add("in");
    });
  }

  /* ---------- 路由 ---------- */

  const pages = {
    home: $("#page-home"),
    books: $("#page-books"),
    movies: $("#page-movies"),
    sessions: $("#page-sessions"),
    "session-detail": $("#page-session-detail"),
    about: $("#page-about")
  };

  function showPage(name) {
    Object.entries(pages).forEach(([key, el]) => { el.hidden = key !== name; });
    $$(".nav-links a[data-route]").forEach((a) => {
      if (a.dataset.route === name) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    $("#navLinks").classList.remove("open");
    $("#navToggle").setAttribute("aria-expanded", "false");
  }

  function route() {
    const hash = location.hash.replace(/^#/, "") || "/";
    closeBookModal();
    closeMovieModal();
    closeLightbox();

    const sessionMatch = hash.match(/^\/session\/(\d+)$/);
    if (sessionMatch) {
      showPage("session-detail");
      renderSessionDetail(Number(sessionMatch[1]));
      return;
    }
    if (hash === "/books") { showPage("books"); renderBooks(); }
    else if (hash === "/movies") { showPage("movies"); renderMovieGenreChips(); renderMovies(); }
    else if (hash === "/sessions") { showPage("sessions"); }
    else if (hash === "/about") { showPage("about"); }
    else { showPage("home"); }
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  /* ---------- 事件绑定 ---------- */

  function bindEvents() {
    /* 移动端菜单 */
    $("#navToggle").addEventListener("click", () => {
      const links = $("#navLinks");
      const open = links.classList.toggle("open");
      $("#navToggle").setAttribute("aria-expanded", String(open));
    });

    /* 书库搜索（防抖） */
    let searchTimer;
    $("#bookSearch").addEventListener("input", (e) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        bookState.query = e.target.value;
        bookState.page = 1;
        renderBooks();
      }, 200);
    });

    /* 分类 chips */
    $("#categoryChips").addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      bookState.category = chip.dataset.cat;
      bookState.page = 1;
      renderCategoryChips();
      renderBooks();
    });

    /* 排序 */
    $("#bookSort").addEventListener("change", (e) => {
      bookState.sort = e.target.value;
      bookState.page = 1;
      renderBooks();
    });

    /* 清除筛选 */
    $("#bookReset").addEventListener("click", () => {
      bookState.query = "";
      bookState.category = "全部";
      bookState.page = 1;
      $("#bookSearch").value = "";
      renderCategoryChips();
      renderBooks();
    });

    /* 分页 */
    $("#bookPager").addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-page]");
      if (!btn || btn.disabled) return;
      bookState.page = Number(btn.dataset.page);
      renderBooks();
      $("#page-books").scrollIntoView({ behavior: "smooth" });
    });

    /* ---------- 影库事件绑定 ---------- */

    if (typeof MOVIES !== "undefined" && $("#movieSearch")) {
      let movieSearchTimer;
      $("#movieSearch").addEventListener("input", (e) => {
        clearTimeout(movieSearchTimer);
        movieSearchTimer = setTimeout(() => {
          movieState.query = e.target.value;
          movieState.page = 1;
          renderMovies();
        }, 200);
      });

      $("#movieGenreChips").addEventListener("click", (e) => {
        const chip = e.target.closest("[data-mcat]");
        if (!chip) return;
        movieState.genre = chip.dataset.mcat;
        movieState.page = 1;
        renderMovieGenreChips();
        renderMovies();
      });

      $("#movieSort").addEventListener("change", (e) => {
        movieState.sort = e.target.value;
        movieState.page = 1;
        renderMovies();
      });

      $("#movieReset").addEventListener("click", () => {
        movieState.query = "";
        movieState.genre = "全部";
        movieState.page = 1;
        $("#movieSearch").value = "";
        renderMovieGenreChips();
        renderMovies();
      });

      $("#moviePager").addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-mpage]");
        if (!btn || btn.disabled) return;
        movieState.page = Number(btn.dataset.mpage);
        renderMovies();
        $("#page-movies").scrollIntoView({ behavior: "smooth" });
      });
    }

    /* 全局委托：书卡片 / 影卡片 / 活动卡片 / 灯箱图片 */
    document.addEventListener("click", (e) => {
      const bookBtn = e.target.closest("[data-book]");
      if (bookBtn) { openBookModal(Number(bookBtn.dataset.book)); return; }

      const movieBtn = e.target.closest("[data-movie]");
      if (movieBtn) { openMovieModal(Number(movieBtn.dataset.movie)); return; }

      const sessionBtn = e.target.closest("[data-session]");
      if (sessionBtn) { location.hash = `#/session/${sessionBtn.dataset.session}`; return; }

      const img = e.target.closest("[data-lightbox]");
      if (img) { openLightbox(img.src, img.dataset.caption); return; }
    });

    /* 弹层关闭 */
    modal.addEventListener("click", (e) => {
      if (e.target.closest("[data-close]")) closeBookModal();
    });
    if (movieModal) {
      movieModal.addEventListener("click", (e) => {
        if (e.target.closest("[data-mclose]")) closeMovieModal();
      });
    }
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target.closest(".lightbox-close")) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (!lightbox.hidden) closeLightbox();
      else if (movieModal && !movieModal.hidden) closeMovieModal();
      else if (!modal.hidden) closeBookModal();
    });

    window.addEventListener("hashchange", route);
  }

  /* ---------- 启动 ---------- */

  renderHome();
  renderMarquee();
  renderCategoryChips();
  renderBooks();
  renderSessions();

  const aboutStats = $("#aboutStats");
  const movieTotal = typeof MOVIES !== "undefined" ? MOVIES.length : 0;
  aboutStats.innerHTML = `
    <h3>书影档案</h3>
    <div class="stat-row"><span class="stat-label">记录起始</span><span class="stat-value">${SITE_STATS.foundedYear}</span></div>
    <div class="stat-row"><span class="stat-label">读过的书</span><span class="stat-value">${BOOKS.length} 本</span></div>
    <div class="stat-row"><span class="stat-label">看过的影视</span><span class="stat-value">${movieTotal} 部</span></div>
    ${SESSIONS.length ? `<div class="stat-row"><span class="stat-label">活动期数</span><span class="stat-value">${SESSIONS.length} 期</span></div>` : ""}`;

  /* 动态 footer */
  const fc = $("#footerCopy");
  if (fc) fc.textContent = `© ${SITE_STATS.foundedYear}–${new Date().getFullYear()} 拾光读书会 · 用心记录每一次阅读`;

  bindEvents();
  route();
  observeReveals();
})();
