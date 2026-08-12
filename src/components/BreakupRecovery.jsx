import { useState, useEffect, useRef } from "react";

const IMPULSE_OPTIONS = [
  { id: "message", label: "想发消息", emoji: "💬" },
  { id: "call", label: "想打电话", emoji: "📞" },
  { id: "visit", label: "想去找TA", emoji: "🚶" },
  { id: "give", label: "想给钱/送礼", emoji: "🎁" },
  { id: "forgive", label: "想说原谅", emoji: "💔" },
  { id: "stalk", label: "想看TA动态", emoji: "👀" },
  { id: "help", label: "想帮TA忙", emoji: "🤲" },
  { id: "explain", label: "想解释自己", emoji: "🗯️" },
];

const MOVE_SUGGESTIONS = [
  "出门走二十分钟，不带耳机",
  "洗个澡，水开热一点",
  "把手机放到另一个房间，十分钟",
  "运动。跑、跳、任何让心跳快起来的",
  "打给一个不会评价你的朋友",
  "找件需要用手的事做——洗碗、整理、做饭",
];

const K = {
  decisions: "br:decisions",
  facts: "br:facts",
  letters: "br:letters",
  log: "br:log",
};

const todayKey = () => new Date().toISOString().slice(0, 10);
const fmt = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

const C = {
  bg: "#12121f",
  bg2: "#1a1a2b",
  ink: "#e8e6f0",
  dim: "#8a87a8",
  faint: "#5d5a75",
  line: "rgba(255,255,255,0.07)",
  violet: "#7c6bb5",
  violetDim: "rgba(124,107,181,0.14)",
  rust: "#b5705f",
  rustDim: "rgba(181,112,95,0.14)",
  sageDim: "rgba(123,163,131,0.13)",
};

async function load(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}
async function save(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* best effort */
  }
}

export default function BreakupRecovery() {
  const [ready, setReady] = useState(false);
  const [view, setView] = useState("calm");
  const [decisions, setDecisions] = useState([]);
  const [facts, setFacts] = useState([]);
  const [letters, setLetters] = useState([]);
  const [log, setLog] = useState([]);

  const [impulse, setImpulse] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [breath, setBreath] = useState("in");
  const [panel, setPanel] = useState("decisions");
  const [draft, setDraft] = useState("");
  const [letterText, setLetterText] = useState("");
  const [chain, setChain] = useState([]);
  const [chainInput, setChainInput] = useState("");

  const tRef = useRef(null);
  const bRef = useRef(null);

  useEffect(() => {
    (async () => {
      const [d, f, l, g] = await Promise.all([
        load(K.decisions, []),
        load(K.facts, []),
        load(K.letters, []),
        load(K.log, []),
      ]);
      setDecisions(d);
      setFacts(f);
      setLetters(l);
      setLog(g);
      setReady(true);
    })();
    return () => {
      clearInterval(tRef.current);
      clearInterval(bRef.current);
    };
  }, []);

  const finish = (opt) => {
    const entry = { label: opt?.label ?? "冲动", day: todayKey(), at: Date.now() };
    setLog((g) => {
      const next = [...g, entry];
      save(K.log, next);
      return next;
    });
    setView("survived");
  };

  const start = (opt) => {
    setImpulse(opt);
    setTimeLeft(300);
    setBreath("in");
    setChain([]);
    setChainInput("");
    setPanel("decisions");
    setView("timer");
    clearInterval(tRef.current);
    clearInterval(bRef.current);
    tRef.current = setInterval(() => {
      setTimeLeft((p) => {
        if (p <= 1) {
          clearInterval(tRef.current);
          clearInterval(bRef.current);
          finish(opt);
          return 0;
        }
        return p - 1;
      });
    }, 1000);
    bRef.current = setInterval(
      () => setBreath((p) => (p === "in" ? "hold" : p === "hold" ? "out" : "in")),
      4000
    );
  };

  const stop = () => {
    clearInterval(tRef.current);
    clearInterval(bRef.current);
    finish(impulse);
  };

  const addTo = (arr, setter, key) => {
    if (!draft.trim()) return;
    const next = [...arr, draft.trim()];
    setter(next);
    save(key, next);
    setDraft("");
  };
  const drop = (arr, setter, key, i) => {
    const next = arr.filter((_, x) => x !== i);
    setter(next);
    save(key, next);
  };
  const fileLetter = () => {
    if (!letterText.trim()) return;
    const next = [...letters, { text: letterText.trim(), at: Date.now() }];
    setLetters(next);
    save(K.letters, next);
    setLetterText("");
    setView("filed");
  };

  const today = log.filter((e) => e.day === todayKey());
  const days = [...new Set(log.map((e) => e.day))].sort();
  const byDay = days.map((d) => ({ d, n: log.filter((e) => e.day === d).length }));
  const maxN = Math.max(1, ...byDay.map((x) => x.n));
  const recentShapes = [...new Set(today.slice(-6).map((e) => e.label))];
  const move = MOVE_SUGGESTIONS[Math.floor(Date.now() / 60000) % MOVE_SUGGESTIONS.length];

  const S = {
    page: {
      minHeight: "100vh",
      background: `linear-gradient(170deg, ${C.bg} 0%, ${C.bg2} 55%, ${C.bg} 100%)`,
      color: C.ink,
      fontFamily: '-apple-system, "Noto Sans SC", "PingFang SC", sans-serif',
      display: "flex",
      justifyContent: "center",
      padding: "0 0 40px",
    },
    wrap: { width: "100%", maxWidth: 440, padding: "40px 22px" },
    h: { fontSize: 21, fontWeight: 400, margin: "0 0 6px", letterSpacing: 0.5 },
    sub: { fontSize: 13.5, color: C.dim, lineHeight: 1.75, margin: "0 0 28px" },
    card: {
      background: "rgba(255,255,255,0.04)",
      border: `1px solid ${C.line}`,
      borderRadius: 14,
      padding: "13px 15px",
      marginBottom: 8,
      fontSize: 14.5,
      lineHeight: 1.6,
      display: "flex",
      gap: 10,
      alignItems: "flex-start",
    },
    input: {
      width: "100%",
      background: "rgba(255,255,255,0.05)",
      border: `1px solid ${C.line}`,
      borderRadius: 14,
      padding: "13px 15px",
      color: C.ink,
      fontSize: 14.5,
      lineHeight: 1.6,
      resize: "none",
      boxSizing: "border-box",
      fontFamily: "inherit",
      outline: "none",
    },
    btn: (bg, fg) => ({
      background: bg,
      color: fg,
      border: "none",
      borderRadius: 14,
      padding: "15px 24px",
      fontSize: 15,
      cursor: "pointer",
      letterSpacing: 0.5,
      width: "100%",
    }),
    ghost: {
      background: "transparent",
      color: C.faint,
      border: `1px solid ${C.line}`,
      borderRadius: 12,
      padding: "12px 18px",
      fontSize: 13.5,
      cursor: "pointer",
      width: "100%",
    },
    x: {
      background: "none",
      border: "none",
      color: C.faint,
      fontSize: 17,
      cursor: "pointer",
      lineHeight: 1,
      padding: 0,
      marginLeft: "auto",
    },
    tab: (on) => ({
      flex: 1,
      background: on ? C.violetDim : "transparent",
      color: on ? C.ink : C.faint,
      border: "none",
      borderRadius: 10,
      padding: "9px 0",
      fontSize: 13,
      cursor: "pointer",
    }),
  };

  if (!ready)
    return (
      <div style={S.page}>
        <p style={{ color: C.faint, marginTop: 120, fontSize: 14 }}>正在打开…</p>
      </div>
    );

  return (
    <div style={S.page}>
      <div style={S.wrap}>
        {/* CALM */}
        {view === "calm" && (
          <div style={{ textAlign: "center", paddingTop: 24 }}>
            <div style={{ fontSize: 12, letterSpacing: 3, color: C.faint, marginBottom: 40 }}>
              {log.length ? `已扛过 ${log.length} 次` : "平静状态"}
            </div>
            <div
              style={{
                width: 110,
                height: 110,
                borderRadius: "50%",
                margin: "0 auto 34px",
                background: "radial-gradient(circle at 38% 32%, #383054, #221d38)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 42,
                boxShadow: "0 0 70px rgba(110,95,170,0.18)",
              }}
            >
              🌙
            </div>
            <p style={{ fontSize: 16, color: C.dim, lineHeight: 1.8, marginBottom: 44 }}>
              现在是清醒的时候。
              <br />
              趁现在，把话留给冲动的你。
            </p>
            <button
              onClick={() => setView("sos")}
              style={{
                ...S.btn(`linear-gradient(135deg, ${C.rust}, #8a5344)`, "#ffe4dd"),
                padding: "20px 24px",
                fontSize: 17,
                boxShadow: "0 6px 30px rgba(181,112,95,0.22)",
                marginBottom: 30,
              }}
            >
              我被附体了
            </button>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                ["decisions", "我的决定", decisions.length],
                ["facts", "事实墙", facts.length],
                ["letters", "不发的话", letters.length],
                ["trend", "趋势", log.length],
              ].map(([v, label, n]) => (
                <button
                  key={v}
                  onClick={() => {
                    setDraft("");
                    setView(v);
                  }}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${C.line}`,
                    borderRadius: 14,
                    padding: "16px 10px",
                    color: C.dim,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  {label}
                  <div style={{ fontSize: 12, color: C.faint, marginTop: 4 }}>{n}</div>
                </button>
              ))}
            </div>
            <p
              style={{
                fontSize: 11.5,
                color: "rgba(255,255,255,0.2)",
                marginTop: 44,
                lineHeight: 1.9,
              }}
            >
              如果什么时候撑不住了，找个人说说话。
              <br />
              心理援助热线 400-161-9995（24小时）
            </p>
          </div>
        )}

        {/* SOS */}
        {view === "sos" && (
          <>
            <h2 style={{ ...S.h, color: "#e8b8ac", textAlign: "center" }}>你现在想做什么？</h2>
            <p style={{ ...S.sub, textAlign: "center" }}>选一个。说出来，别说给TA听。</p>

            {recentShapes.length > 1 && (
              <div
                style={{
                  background: C.rustDim,
                  border: "1px solid rgba(181,112,95,0.2)",
                  borderRadius: 14,
                  padding: "13px 15px",
                  marginBottom: 16,
                  fontSize: 13.5,
                  color: "#d6a698",
                  lineHeight: 1.75,
                }}
              >
                今天它换过 {recentShapes.length} 个样子：{recentShapes.join(" → ")}
                <br />
                <span style={{ color: C.faint }}>是同一个冲动在换衣服。</span>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
              {IMPULSE_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  onClick={() => start(o)}
                  style={{
                    background: C.rustDim,
                    border: "1px solid rgba(181,112,95,0.18)",
                    borderRadius: 14,
                    padding: "18px 8px",
                    color: "#dcb3a7",
                    fontSize: 14,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: 7,
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 25 }}>{o.emoji}</span>
                  {o.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setView("calm")}
              style={{ ...S.btn("transparent", C.faint), marginTop: 18 }}
            >
              其实过去了，回去
            </button>
          </>
        )}

        {/* TIMER */}
        {view === "timer" && (
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 13.5, color: "#c39a8d", letterSpacing: 1.5 }}>
              {impulse?.emoji} {impulse?.label}
            </p>
            <p style={{ fontSize: 12.5, color: C.faint, margin: "6px 0 30px" }}>
              让它闹。你不动就行。
            </p>

            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: "50%",
                margin: "0 auto 8px",
                background: `radial-gradient(circle at 38% 32%, rgba(120,100,165,${
                  breath === "out" ? 0.45 : 0.85
                }), rgba(52,44,80,0.6))`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${breath === "out" ? 1 : 1.22})`,
                transition: "all 4s ease-in-out",
                boxShadow: `0 0 ${breath === "hold" ? 65 : 28}px rgba(120,100,170,0.3)`,
              }}
            >
              <span style={{ fontSize: 21, color: "#cfc3e2", fontWeight: 300 }}>
                {breath === "in" ? "吸气" : breath === "hold" ? "屏住" : "呼气"}
              </span>
            </div>
            <p style={{ fontSize: 11.5, color: C.faint, marginBottom: 26 }}>跟着呼吸</p>

            <div
              style={{
                fontSize: 44,
                fontWeight: 200,
                letterSpacing: 4,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {fmt(timeLeft)}
            </div>
            <div
              style={{
                width: 190,
                height: 3,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 2,
                margin: "14px auto 30px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${((300 - timeLeft) / 300) * 100}%`,
                  height: "100%",
                  background: `linear-gradient(90deg, ${C.violet}, #a596d8)`,
                  transition: "width 1s linear",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: 6,
                background: "rgba(255,255,255,0.03)",
                borderRadius: 12,
                padding: 4,
                marginBottom: 14,
              }}
            >
              <button onClick={() => setPanel("decisions")} style={S.tab(panel === "decisions")}>
                我的决定
              </button>
              <button onClick={() => setPanel("facts")} style={S.tab(panel === "facts")}>
                事实墙
              </button>
              <button onClick={() => setPanel("then")} style={S.tab(panel === "then")}>
                然后呢
              </button>
            </div>

            {panel === "decisions" && (
              <div style={{ textAlign: "left", marginBottom: 22 }}>
                {decisions.length ? (
                  decisions.map((d, i) => (
                    <div
                      key={i}
                      style={{
                        background: C.violetDim,
                        border: "1px solid rgba(124,107,181,0.18)",
                        borderRadius: 13,
                        padding: "13px 15px",
                        marginBottom: 7,
                        fontSize: 14.5,
                        color: "#c5bede",
                        lineHeight: 1.65,
                      }}
                    >
                      {d}
                    </div>
                  ))
                ) : (
                  <p style={{ color: C.faint, fontSize: 13.5, textAlign: "center" }}>
                    还没写过决定。等平静了再补。
                  </p>
                )}
              </div>
            )}

            {panel === "facts" && (
              <div style={{ textAlign: "left", marginBottom: 22 }}>
                {facts.length ? (
                  facts.map((f, i) => (
                    <div
                      key={i}
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: `1px solid ${C.line}`,
                        borderRadius: 13,
                        padding: "13px 15px",
                        marginBottom: 7,
                        fontSize: 14,
                        color: C.dim,
                        lineHeight: 1.7,
                      }}
                    >
                      {f}
                    </div>
                  ))
                ) : (
                  <p style={{ color: C.faint, fontSize: 13.5, textAlign: "center" }}>
                    事实墙是空的。平静的时候写下真实发生过的事。
                  </p>
                )}
              </div>
            )}

            {panel === "then" && (
              <div style={{ textAlign: "left", marginBottom: 22 }}>
                <p style={{ fontSize: 13.5, color: C.dim, marginBottom: 12, lineHeight: 1.7 }}>
                  假设你现在真的做了。往下推三步。
                </p>
                {chain.map((c, i) => (
                  <div key={i} style={{ ...S.card, color: C.dim }}>
                    <span style={{ color: C.faint, fontSize: 12, flexShrink: 0 }}>然后</span>
                    <span style={{ flex: 1 }}>{c}</span>
                  </div>
                ))}
                {chain.length < 3 && (
                  <>
                    <textarea
                      value={chainInput}
                      onChange={(e) => setChainInput(e.target.value)}
                      placeholder={
                        chain.length === 0
                          ? "TA会怎么回应？"
                          : chain.length === 1
                          ? "然后你会怎样？"
                          : "一周之后呢？"
                      }
                      style={{ ...S.input, minHeight: 56 }}
                    />
                    <button
                      onClick={() => {
                        if (chainInput.trim()) {
                          setChain([...chain, chainInput.trim()]);
                          setChainInput("");
                        }
                      }}
                      style={{ ...S.ghost, marginTop: 8 }}
                    >
                      推下一步
                    </button>
                  </>
                )}
                {chain.length === 3 && (
                  <p style={{ fontSize: 13.5, color: "#c39a8d", marginTop: 12, lineHeight: 1.75 }}>
                    这就是你要付的账。现在还想做吗？
                  </p>
                )}
              </div>
            )}

            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 13,
                padding: "13px 15px",
                fontSize: 13.5,
                color: C.dim,
                marginBottom: 20,
                lineHeight: 1.7,
                textAlign: "left",
              }}
            >
              手闲着就出事。试试：{move}
            </div>

            <button
              onClick={() => {
                clearInterval(tRef.current);
                clearInterval(bRef.current);
                setView("letter");
              }}
              style={{ ...S.ghost, marginBottom: 8 }}
            >
              我一定要说点什么 →
            </button>
            <button onClick={stop} style={S.btn("transparent", C.faint)}>
              已经过去了，不用等了
            </button>
          </div>
        )}

        {/* LETTER */}
        {view === "letter" && (
          <>
            <h2 style={S.h}>写给TA，但不发出去</h2>
            <p style={S.sub}>
              想说的都写。写完存在这里，TA收不到。
              <br />
              你需要的是说出来，不是让TA听见。
            </p>
            <textarea
              value={letterText}
              onChange={(e) => setLetterText(e.target.value)}
              autoFocus
              placeholder="我想说……"
              style={{ ...S.input, minHeight: 220, marginBottom: 12 }}
            />
            <button
              onClick={fileLetter}
              style={S.btn(`linear-gradient(135deg, ${C.violet}, #5f5292)`, "#fff")}
            >
              存进抽屉
            </button>
            <button
              onClick={() => {
                setLetterText("");
                setView("sos");
              }}
              style={{ ...S.btn("transparent", C.faint), marginTop: 6 }}
            >
              算了
            </button>
          </>
        )}

        {view === "filed" && (
          <div style={{ textAlign: "center", paddingTop: 60 }}>
            <div style={{ fontSize: 40, marginBottom: 24 }}>🗄️</div>
            <h2 style={{ ...S.h, color: "#c5bede" }}>已经收好了</h2>
            <p style={{ ...S.sub, marginBottom: 40 }}>
              这些话你说出来了。TA没收到，但你不用再憋着。
            </p>
            <button onClick={() => finish(impulse)} style={S.btn(C.violetDim, "#c5bede")}>
              继续
            </button>
          </div>
        )}

        {/* SURVIVED */}
        {view === "survived" && (
          <div style={{ textAlign: "center", paddingTop: 40 }}>
            <div
              style={{
                width: 92,
                height: 92,
                borderRadius: "50%",
                margin: "0 auto 28px",
                background: "radial-gradient(circle at 35% 30%, #3d5c44, #253a2b)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 38,
                color: "#bcdcc2",
                boxShadow: "0 0 55px rgba(90,150,105,0.16)",
              }}
            >
              ✓
            </div>
            <h2 style={{ ...S.h, color: "#bcdcc2" }}>你扛过来了</h2>
            <p style={{ ...S.sub, marginBottom: 8 }}>
              {impulse?.label}——它来过了，你没有动。
            </p>
            <p style={{ fontSize: 13, color: C.faint, marginBottom: 36 }}>
              今天第 {today.length} 次 · 总计 {log.length} 次
            </p>
            <p
              style={{
                fontSize: 15.5,
                color: "#96b09b",
                fontStyle: "italic",
                lineHeight: 1.8,
                marginBottom: 40,
              }}
            >
              想TA可以。
              <br />
              别把想变成做。
            </p>
            <button onClick={() => setView("calm")} style={S.btn(C.sageDim, "#bcdcc2")}>
              回到平静
            </button>
          </div>
        )}

        {/* DECISIONS */}
        {view === "decisions" && (
          <>
            <h2 style={S.h}>清醒的你，说过的话</h2>
            <p style={S.sub}>
              冲动来的时候会看到这些。
              <br />
              这是清醒的你，替未来的你挡的一道墙。
            </p>
            {decisions.map((d, i) => (
              <div key={i} style={S.card}>
                <span style={{ flex: 1 }}>{d}</span>
                <button onClick={() => drop(decisions, setDecisions, K.decisions, i)} style={S.x}>
                  ×
                </button>
              </div>
            ))}
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="例如：该收的钱收，不送礼物，不主动找"
              style={{ ...S.input, minHeight: 76, marginTop: 6 }}
            />
            <button
              onClick={() => addTo(decisions, setDecisions, K.decisions)}
              style={{ ...S.ghost, margin: "8px 0 24px" }}
            >
              记下来
            </button>
            <button onClick={() => setView("calm")} style={S.btn("rgba(255,255,255,0.05)", C.dim)}>
              返回
            </button>
          </>
        )}

        {/* FACTS */}
        {view === "facts" && (
          <>
            <h2 style={S.h}>事实墙</h2>
            <p style={S.sub}>
              想念会把人美化。这里放真实发生过的事——
              <br />
              TA说过的话、做过的事、你当时的感受。
              <br />
              不是为了恨，是为了记得完整。
            </p>
            {facts.map((f, i) => (
              <div key={i} style={S.card}>
                <span style={{ flex: 1, color: C.dim }}>{f}</span>
                <button onClick={() => drop(facts, setFacts, K.facts, i)} style={S.x}>
                  ×
                </button>
              </div>
            ))}
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="写下一件真实发生过的、让你疼的事"
              style={{ ...S.input, minHeight: 76, marginTop: 6 }}
            />
            <button
              onClick={() => addTo(facts, setFacts, K.facts)}
              style={{ ...S.ghost, margin: "8px 0 24px" }}
            >
              钉上去
            </button>
            <button onClick={() => setView("calm")} style={S.btn("rgba(255,255,255,0.05)", C.dim)}>
              返回
            </button>
          </>
        )}

        {/* LETTERS */}
        {view === "letters" && (
          <>
            <h2 style={S.h}>不发出去的话</h2>
            <p style={S.sub}>你说过的，TA没听到的。都在这。</p>
            {letters.length === 0 && <p style={{ color: C.faint, fontSize: 13.5 }}>还是空的。</p>}
            {letters
              .slice()
              .reverse()
              .map((l, i) => (
                <div key={i} style={{ ...S.card, flexDirection: "column", gap: 8 }}>
                  <span style={{ fontSize: 11.5, color: C.faint }}>
                    {new Date(l.at).toLocaleString("zh-CN")}
                  </span>
                  <span style={{ color: C.dim, whiteSpace: "pre-wrap" }}>{l.text}</span>
                </div>
              ))}
            <button
              onClick={() => setView("calm")}
              style={{ ...S.btn("rgba(255,255,255,0.05)", C.dim), marginTop: 20 }}
            >
              返回
            </button>
          </>
        )}

        {/* TREND */}
        {view === "trend" && (
          <>
            <h2 style={S.h}>它在变小</h2>
            <p style={S.sub}>
              第一天最多。往后会越来越少——
              <br />
              不是匀速的，会反弹，但方向是往下的。
            </p>

            {byDay.length === 0 ? (
              <p style={{ color: C.faint, fontSize: 13.5 }}>还没有记录。</p>
            ) : (
              <div style={{ marginBottom: 28 }}>
                {byDay.map(({ d, n }) => (
                  <div
                    key={d}
                    style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9 }}
                  >
                    <span
                      style={{
                        fontSize: 11.5,
                        color: C.faint,
                        width: 46,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {d.slice(5)}
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: 22,
                        background: "rgba(255,255,255,0.04)",
                        borderRadius: 6,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${(n / maxN) * 100}%`,
                          height: "100%",
                          background: `linear-gradient(90deg, ${C.violet}, #a596d8)`,
                          borderRadius: 6,
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 12.5,
                        color: C.dim,
                        width: 22,
                        textAlign: "right",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {n}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {log.length > 0 && (
              <div
                style={{
                  background: C.sageDim,
                  border: "1px solid rgba(123,163,131,0.18)",
                  borderRadius: 14,
                  padding: "15px 16px",
                  fontSize: 14,
                  color: "#a8c4ad",
                  lineHeight: 1.75,
                  marginBottom: 24,
                }}
              >
                你已经扛过 {log.length} 次。
                <br />
                每一次没行动，都是一次证明——它真的会过去。
              </div>
            )}

            <button onClick={() => setView("calm")} style={S.btn("rgba(255,255,255,0.05)", C.dim)}>
              返回
            </button>
          </>
        )}
      </div>
    </div>
  );
}
