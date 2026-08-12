import { useState, useEffect } from "react";

const QUESTIONS = [
  { id: 1, text: "你做事是一个值得信赖的人吗？" },
  { id: 2, text: "你个性温和吗？" },
  { id: 3, text: "你有活力吗？" },
  { id: 4, text: "你善解人意吗？" },
  { id: 5, text: "你独立吗？" },
  { id: 6, text: "你受人爱戴吗？" },
  { id: 7, text: "做事认真且正直吗？" },
  { id: 8, text: "你富有同情心吗？" },
  { id: 9, text: "你有说服力吗？" },
  { id: 10, text: "你大胆吗？" },
  { id: 11, text: "你精确吗？" },
  { id: 12, text: "你适应能力强吗？" },
  { id: 13, text: "你组织能力好吗？" },
  { id: 14, text: "你是否积极主动？" },
  { id: 15, text: "你害羞吗？" },
  { id: 16, text: "你强势吗？" },
  { id: 17, text: "你镇定吗？" },
  { id: 18, text: "你勇于学习吗？" },
  { id: 19, text: "你反应快吗？" },
  { id: 20, text: "你外向吗？" },
  { id: 21, text: "你注意细节吗？" },
  { id: 22, text: "你爱说话吗？" },
  { id: 23, text: "你的协调能力好吗？" },
  { id: 24, text: "你勤劳吗？" },
  { id: 25, text: "你慷慨吗？" },
  { id: 26, text: "你小心翼翼吗？" },
  { id: 27, text: "你令人愉快吗？" },
  { id: 28, text: "你传统吗？" },
  { id: 29, text: "你亲切吗？" },
  { id: 30, text: "你工作足够有效率吗？" },
];

const SCALE_OPTIONS = [
  { value: 5, label: "非常同意", color: "#4F46E5" },
  { value: 4, label: "比较同意", color: "#6366F1" },
  { value: 3, label: "差不多同意", color: "#94A3B8" },
  { value: 2, label: "一点点同意", color: "#F59E0B" },
  { value: 1, label: "不同意", color: "#EF4444" },
];

const TYPES = {
  tiger: {
    name: "老虎型",
    sub: "支配型 Dominance",
    color: "#EA580C",
    lightBg: "#FFF7ED",
    gradient: "linear-gradient(135deg, #F97316, #EA580C)",
    icon: "\u{1F42F}",
    questions: [5, 10, 14, 18, 24, 30],
    traits: ["自信果断", "权威决断", "竞争力强", "胸怀大志", "行动力强"],
    desc: "企图心强烈，喜欢冒险，个性积极，凡事喜欢掌控全局。目标一经确立便会全力以赴，是天生的领导者和开拓者。",
    strength: "善于控制局面并能果断地作出决定，成就非凡。",
    weakness: "压力下容易忽视细节和他人情感，好胜天性有时会成为工作狂。",
  },
  peacock: {
    name: "孔雀型",
    sub: "表达型 Extroversion",
    color: "#7C3AED",
    lightBg: "#F5F3FF",
    gradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
    icon: "\u{1F99A}",
    questions: [3, 6, 13, 20, 22, 29],
    traits: ["热情洋溢", "口才流畅", "好交朋友", "风度翩翩", "表现欲强"],
    desc: "热情洋溢，好交朋友，擅于人际关系的建立。天生的鼓吹者，能感染他人，在团队中是最受欢迎的人。",
    strength: "生性活泼，善于建立同盟关系来实现目标，适合需要当众表现的工作。",
    weakness: "跳跃性思考，常无法顾及细节以及对事情的完成执着度。",
  },
  koala: {
    name: "考拉型",
    sub: "耐心型 Patience",
    color: "#16A34A",
    lightBg: "#F0FDF4",
    gradient: "linear-gradient(135deg, #22C55E, #16A34A)",
    icon: "\u{1F428}",
    questions: [2, 8, 15, 17, 25, 28],
    traits: ["温和善良", "稳健踏实", "耐力过人", "不好冲突", "敦厚随和"],
    desc: "行事稳健，性情平和，温和善良。只要决心投入，绝对是「路遥知马力」的最佳典型。",
    strength: "对他人感情敏感，在集体环境中左右逢源，是极佳的人事协调者。",
    weakness: "难以坚持自己的观点和迅速做出决定，不喜欢面对意见不和的局面。",
  },
  owl: {
    name: "猫头鹰型",
    sub: "精确型 Conformity",
    color: "#2563EB",
    lightBg: "#EFF6FF",
    gradient: "linear-gradient(135deg, #3B82F6, #2563EB)",
    icon: "\u{1F989}",
    questions: [1, 7, 11, 16, 21, 26],
    traits: ["分析力强", "精准度高", "条理分明", "责任感强", "重视纪律"],
    desc: "传统而保守，分析力强，精确度高，是最佳的品质保证者。清晰分析道理，处事客观合理。",
    strength: "天生爱找出事情真相，有耐心仔细考察所有细节并想出合乎逻辑的解决办法。",
    weakness: "把精确度置于感情之前，压力下有时会分析过度而避免做出结论。",
  },
  chameleon: {
    name: "变色龙型",
    sub: "整合型 Sigma",
    color: "#DB2777",
    lightBg: "#FDF2F8",
    gradient: "linear-gradient(135deg, #EC4899, #DB2777)",
    icon: "\u{1F98E}",
    questions: [4, 9, 12, 19, 23, 27],
    traits: ["善于沟通", "适应力强", "弹性极高", "中庸圆融", "天生谈判家"],
    desc: "中庸而不极端，韧性极强，擅于沟通，是天生的谈判家。能充分融入各种新环境，适应性极佳。",
    strength: "善于在工作中调整角色去适应环境，具有很好的沟通与整合能力。",
    weakness: "在别人眼中会觉得较无个性及原则，立场不够鲜明。",
  },
};

const RadarChart = ({ scores, size = 280 }) => {
  const center = size / 2;
  const radius = size * 0.36;
  const types = Object.keys(TYPES);
  const maxScore = 30;
  const angleStep = (2 * Math.PI) / 5;
  const startAngle = -Math.PI / 2;

  const getPoint = (index, value) => {
    const angle = startAngle + index * angleStep;
    const r = (value / maxScore) * radius;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
  };

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const dataPoints = types.map((t, i) => getPoint(i, scores[t]));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {gridLevels.map((level) => {
        const pts = types.map((_, i) => getPoint(i, maxScore * level));
        const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
        return <path key={level} d={path} fill="none" stroke="#E2E8F0" strokeWidth="1" />;
      })}
      {types.map((_, i) => {
        const end = getPoint(i, maxScore);
        return <line key={i} x1={center} y1={center} x2={end.x} y2={end.y} stroke="#E2E8F0" strokeWidth="1" />;
      })}
      <defs>
        <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <path d={dataPath} fill="url(#radarGrad)" stroke="#8B5CF6" strokeWidth="2" strokeOpacity="0.6" />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="5" fill={TYPES[types[i]].color} stroke="#fff" strokeWidth="2.5" />
      ))}
      {types.map((t, i) => {
        const labelR = radius + 30;
        const angle = startAngle + i * angleStep;
        const x = center + labelR * Math.cos(angle);
        const y = center + labelR * Math.sin(angle);
        return (
          <text key={t} x={x} y={y} textAnchor="middle" dominantBaseline="central" fill={TYPES[t].color} fontSize="12" fontWeight="700">
            {TYPES[t].icon} {scores[t]}
          </text>
        );
      })}
    </svg>
  );
};

const ScoreBar = ({ type, score, maxScore = 30, rank }) => {
  const info = TYPES[type];
  const pct = (score / maxScore) * 100;
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), rank * 120);
    return () => clearTimeout(t);
  }, [rank]);
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: info.color }}>
          {info.icon} {info.name}
        </span>
        <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>{score} / {maxScore}</span>
      </div>
      <div style={{ height: 10, borderRadius: 5, background: "#F1F5F9", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: animated ? `${pct}%` : "0%",
            background: info.gradient,
            borderRadius: 5,
            transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>
    </div>
  );
};

export default function PDPTest() {
  const [phase, setPhase] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);

  const progress = (Object.keys(answers).length / 30) * 100;

  const handleAnswer = (value) => {
    if (animating) return;
    setAnimating(true);
    setDirection(1);
    const newAnswers = { ...answers, [current]: value };
    setAnswers(newAnswers);
    setTimeout(() => {
      if (current < 29) setCurrent(current + 1);
      else if (Object.keys(newAnswers).length === 30) setPhase("result");
      setAnimating(false);
    }, 300);
  };

  const goBack = () => {
    if (current > 0 && !animating) {
      setAnimating(true);
      setDirection(-1);
      setTimeout(() => { setCurrent(current - 1); setAnimating(false); }, 250);
    }
  };

  const calcScores = () => {
    const scores = {};
    Object.entries(TYPES).forEach(([key, info]) => {
      scores[key] = info.questions.reduce((sum, qNum) => sum + (answers[qNum - 1] || 0), 0);
    });
    return scores;
  };

  const getDominant = (scores) => {
    let max = 0, dominant = "tiger";
    Object.entries(scores).forEach(([k, v]) => { if (v > max) { max = v; dominant = k; } });
    return dominant;
  };

  const getSorted = (scores) => Object.entries(scores).sort((a, b) => b[1] - a[1]);

  const restart = () => { setPhase("intro"); setCurrent(0); setAnswers({}); setDirection(1); setAnimating(false); };

  const base = {
    minHeight: "100vh",
    fontFamily: '-apple-system, "SF Pro Display", "PingFang SC", "Noto Sans SC", sans-serif',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px 16px",
    boxSizing: "border-box",
  };

  // ── INTRO ──
  if (phase === "intro") {
    return (
      <div style={{ ...base, background: "linear-gradient(180deg, #EEF2FF 0%, #FFFFFF 50%)", justifyContent: "center", color: "#1E293B" }}>
        <div style={{ textAlign: "center", maxWidth: 480, animation: "fadeUp 0.6s ease" }}>
          <div style={{ fontSize: 56, marginBottom: 12, lineHeight: 1.2 }}>{"\u{1F42F}\u{1F99A}\u{1F428}\u{1F989}\u{1F98E}"}</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 6, color: "#1E293B" }}>
            PDP-行为风格测试
          </h1>
          <p style={{ fontSize: 14, color: "#94A3B8", marginBottom: 36, lineHeight: 1.7 }}>
            Professional Dynamometric Programs<br />
            30 道题 · 约 3 分钟 · 发现你的行为风格
          </p>
          <button
            onClick={() => setPhase("test")}
            style={{
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              border: "none",
              color: "#fff",
              padding: "16px 52px",
              borderRadius: 50,
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 24px rgba(99,102,241,0.3)",
            }}
            onMouseEnter={(e) => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 6px 32px rgba(99,102,241,0.4)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 24px rgba(99,102,241,0.3)"; }}
          >
            开始测试
          </button>
          <div style={{ marginTop: 48, display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {Object.values(TYPES).map((t) => (
              <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#94A3B8" }}>
                <span style={{ fontSize: 16 }}>{t.icon}</span>
                <span>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </div>
    );
  }

  // ── TEST ──
  if (phase === "test") {
    const q = QUESTIONS[current];
    const selectedValue = answers[current];
    return (
      <div style={{ ...base, background: "#FAFBFE", color: "#1E293B" }}>
        {/* Progress */}
        <div style={{ width: "100%", maxWidth: 520, marginBottom: 40, marginTop: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>{current + 1} / 30</span>
            <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: "#E2E8F0" }}>
            <div style={{ height: "100%", width: `${progress}%`, borderRadius: 3, background: "linear-gradient(90deg, #6366F1, #8B5CF6)", transition: "width 0.4s ease" }} />
          </div>
        </div>

        {/* Question Card */}
        <div
          key={current}
          style={{
            width: "100%",
            maxWidth: 520,
            animation: direction > 0 ? "slideRight 0.3s ease" : "slideLeft 0.3s ease",
          }}
        >
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 36, lineHeight: 1.6, textAlign: "center", color: "#1E293B" }}>
            {q.text}
          </h2>

          {/* Scale buttons — horizontal bar style */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SCALE_OPTIONS.map((opt) => {
              const isSelected = selectedValue === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "15px 20px",
                    borderRadius: 12,
                    border: isSelected ? `2px solid ${opt.color}` : "2px solid #E2E8F0",
                    background: isSelected ? `${opt.color}0A` : "#fff",
                    color: isSelected ? opt.color : "#475569",
                    cursor: "pointer",
                    fontSize: 15,
                    fontWeight: isSelected ? 600 : 500,
                    transition: "all 0.15s ease",
                    width: "100%",
                    boxShadow: isSelected ? `0 2px 12px ${opt.color}20` : "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => { if (!isSelected) { e.currentTarget.style.borderColor = "#CBD5E1"; e.currentTarget.style.background = "#F8FAFC"; }}}
                  onMouseLeave={(e) => { if (!isSelected) { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.background = "#fff"; }}}
                >
                  <span>{opt.label}</span>
                  <div style={{ display: "flex", gap: 5 }}>
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <div
                        key={dot}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: dot <= opt.value ? (isSelected ? opt.color : "#CBD5E1") : "#F1F5F9",
                          transition: "background 0.15s",
                        }}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Nav */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, alignItems: "center" }}>
            <button
              onClick={goBack}
              disabled={current === 0}
              style={{ background: "none", border: "none", color: current === 0 ? "#CBD5E1" : "#94A3B8", cursor: current === 0 ? "default" : "pointer", fontSize: 14, padding: "8px 16px", fontWeight: 500 }}
            >
              {"←"} 上一题
            </button>
            {selectedValue && current < 29 && (
              <button
                onClick={() => { if (!animating) { setAnimating(true); setDirection(1); setTimeout(() => { setCurrent(current + 1); setAnimating(false); }, 250); }}}
                style={{ background: "none", border: "none", color: "#6366F1", cursor: "pointer", fontSize: 14, padding: "8px 16px", fontWeight: 600 }}
              >
                下一题 {"→"}
              </button>
            )}
            {Object.keys(answers).length === 30 && (
              <button
                onClick={() => setPhase("result")}
                style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", border: "none", color: "#fff", padding: "10px 28px", borderRadius: 50, fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(99,102,241,0.25)" }}
              >
                查看结果 {"✨"}
              </button>
            )}
          </div>
        </div>
        <style>{`
          @keyframes slideRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes slideLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        `}</style>
      </div>
    );
  }

  // ── RESULT ──
  const scores = calcScores();
  const dominant = getDominant(scores);
  const domInfo = TYPES[dominant];
  const sorted = getSorted(scores);

  return (
    <div style={{ ...base, background: `linear-gradient(180deg, ${domInfo.lightBg} 0%, #FFFFFF 40%)`, justifyContent: "flex-start", paddingTop: 36, color: "#1E293B" }}>
      <div style={{ maxWidth: 520, width: "100%", animation: "fadeUp 0.5s ease" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 72, marginBottom: 8 }}>{domInfo.icon}</div>
          <div style={{ fontSize: 12, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 3, marginBottom: 8, fontWeight: 600 }}>
            你的主导类型
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: domInfo.color, marginBottom: 4 }}>
            {domInfo.name}
          </h1>
          <p style={{ fontSize: 14, color: "#94A3B8" }}>{domInfo.sub}</p>
        </div>

        {/* Radar */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
          <RadarChart scores={scores} size={280} />
        </div>

        {/* Score Bars */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, marginBottom: 20, border: "1px solid #E2E8F0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          {sorted.map(([type, score], i) => (
            <ScoreBar key={type} type={type} score={score} rank={i} />
          ))}
        </div>

        {/* Traits Card */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, marginBottom: 20, border: "1px solid #E2E8F0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: domInfo.color }}>
            {domInfo.icon} 核心特质
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {domInfo.traits.map((t) => (
              <span key={t} style={{ padding: "6px 14px", borderRadius: 20, background: domInfo.lightBg, color: domInfo.color, fontSize: 13, fontWeight: 600, border: `1px solid ${domInfo.color}25` }}>
                {t}
              </span>
            ))}
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#475569", marginBottom: 20 }}>{domInfo.desc}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ padding: 16, borderRadius: 12, background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
              <div style={{ fontSize: 12, color: "#16A34A", fontWeight: 700, marginBottom: 6 }}>{"✦"} 优势</div>
              <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, margin: 0 }}>{domInfo.strength}</p>
            </div>
            <div style={{ padding: 16, borderRadius: 12, background: "#FEF2F2", border: "1px solid #FECACA" }}>
              <div style={{ fontSize: 12, color: "#DC2626", fontWeight: 700, marginBottom: 6 }}>{"⚡"} 盲区</div>
              <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, margin: 0 }}>{domInfo.weakness}</p>
            </div>
          </div>
        </div>

        {/* Secondary */}
        {sorted.length > 1 && sorted[1][1] > 0 && (() => {
          const secInfo = TYPES[sorted[1][0]];
          return (
            <div style={{ background: "#fff", borderRadius: 16, padding: 24, marginBottom: 20, border: "1px solid #E2E8F0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: secInfo.color }}>
                {secInfo.icon} 辅助类型 · {secInfo.name}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "#64748B", margin: 0 }}>{secInfo.desc}</p>
            </div>
          );
        })()}

        {/* Restart */}
        <div style={{ textAlign: "center", paddingBottom: 40 }}>
          <button
            onClick={restart}
            style={{ background: "#F1F5F9", border: "1px solid #E2E8F0", color: "#64748B", padding: "12px 32px", borderRadius: 50, fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.target.style.background = "#E2E8F0"; e.target.style.color = "#334155"; }}
            onMouseLeave={(e) => { e.target.style.background = "#F1F5F9"; e.target.style.color = "#64748B"; }}
          >
            重新测试
          </button>
        </div>
      </div>
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
