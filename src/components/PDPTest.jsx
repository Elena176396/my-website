import { useState, useEffect, useRef } from "react";

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
  { value: 5, label: "非常符合我", color: "#4F46E5" },
  { value: 4, label: "比较符合我", color: "#6366F1" },
  { value: 3, label: "有些符合我", color: "#94A3B8" },
  { value: 2, label: "不太符合我", color: "#F59E0B" },
  { value: 1, label: "很少符合我", color: "#EF4444" },
];

const TYPES = {
  tiger: {
    name: "老虎型", sub: "支配型 Dominance", color: "#EA580C", lightBg: "#FFF7ED",
    gradient: "linear-gradient(135deg, #F97316, #EA580C)", icon: "🐯",
    questions: [5, 10, 14, 18, 24, 30],
    traits: ["自信果断", "权威决断", "竞争力强", "胸怀大志", "行动力强"],
    desc: "企图心强烈，喜欢冒险，个性积极，凡事喜欢掌控全局。目标一经确立便会全力以赴，是天生的领导者和开拓者。",
    strength: "善于控制局面并能果断地作出决定，成就非凡。",
    weakness: "压力下容易忽视细节和他人情感，好胜天性有时会成为工作狂。",
    fitRoles: "总经理、项目负责人、业务开拓、变革推动者",
    fitEnv: "开创性与改革性工作环境，需要快速决策与执行力的场景",
    mgtTip: "给予更多责任与自主权，布置工作注重结果导向，避免在公众场合与其正面对抗",
    teamTip: "搭配考拉型或猫头鹰型副手，弥补细节与人际和谐的盲区",
  },
  peacock: {
    name: "孔雀型", sub: "表达型 Extroversion", color: "#7C3AED", lightBg: "#F5F3FF",
    gradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)", icon: "🦚",
    questions: [3, 6, 13, 20, 22, 29],
    traits: ["热情洋溢", "口才流畅", "好交朋友", "风度翩翩", "表现欲强"],
    desc: "热情洋溢，好交朋友，擅于人际关系的建立。天生的鼓吹者，能感染他人，在团队中是最受欢迎的人。",
    strength: "生性活泼，善于建立同盟关系来实现目标，适合需要当众表现的工作。",
    weakness: "跳跃性思考，常无法顾及细节以及对事情的完成执着度。",
    fitRoles: "市场推广、公关经理、培训讲师、客户关系管理",
    fitEnv: "团队协作型环境，需要宣传推动、文化建设的场景",
    mgtTip: "以鼓励为主，给予表现机会以保持工作激情，同时注意防止细节失误",
    teamTip: "搭配猫头鹰型执行者确保细节落地，避免与老虎型领导者形成竞争关系",
  },
  koala: {
    name: "考拉型", sub: "耐心型 Patience", color: "#16A34A", lightBg: "#F0FDF4",
    gradient: "linear-gradient(135deg, #22C55E, #16A34A)", icon: "🐨",
    questions: [2, 8, 15, 17, 25, 28],
    traits: ["温和善良", "稳健踏实", "耐力过人", "不好冲突", "敦厚随和"],
    desc: "行事稳健，性情平和，温和善良。只要决心投入，绝对是「路遥知马力」的最佳典型。",
    strength: "对他人感情敏感，在集体环境中左右逢源，是极佳的人事协调者。",
    weakness: "难以坚持自己的观点和迅速做出决定，不喜欢面对意见不和的局面。",
    fitRoles: "人事管理、客服主管、行政后勤、质量管控",
    fitEnv: "气氛和谐、制度完善、不赶迫时间表的稳定型组织",
    mgtTip: "多给予关注和温柔，想方设法挖掘其内在潜力，避免高压催促",
    teamTip: "适合作为老虎型领导者的副手，为团队重建互信、稳定军心",
  },
  owl: {
    name: "猫头鹰型", sub: "精确型 Conformity", color: "#2563EB", lightBg: "#EFF6FF",
    gradient: "linear-gradient(135deg, #3B82F6, #2563EB)", icon: "🦉",
    questions: [1, 7, 11, 16, 21, 26],
    traits: ["分析力强", "精准度高", "条理分明", "责任感强", "重视纪律"],
    desc: "传统而保守，分析力强，精确度高，是最佳的品质保证者。清晰分析道理，处事客观合理。",
    strength: "天生爱找出事情真相，有耐心仔细考察所有细节并想出合乎逻辑的解决办法。",
    weakness: "把精确度置于感情之前，压力下有时会分析过度而避免做出结论。",
    fitRoles: "财务分析、质检主管、数据分析师、流程审计",
    fitEnv: "架构稳定、制度健全的组织，重视标准化与精确性的岗位",
    mgtTip: "给予清晰的规则与依据，尊重其对细节的追求，避免频繁变动目标",
    teamTip: "与孔雀型搭配可互补沟通短板，为团队提供品质保障",
  },
  chameleon: {
    name: "变色龙型", sub: "整合型 Sigma", color: "#DB2777", lightBg: "#FDF2F8",
    gradient: "linear-gradient(135deg, #EC4899, #DB2777)", icon: "🦎",
    questions: [4, 9, 12, 19, 23, 27],
    traits: ["善于沟通", "适应力强", "弹性极高", "中庸圆融", "天生谈判家"],
    desc: "中庸而不极端，韧性极强，擅于沟通，是天生的谈判家。能充分融入各种新环境，适应性极佳。",
    strength: "善于在工作中调整角色去适应环境，具有很好的沟通与整合能力。",
    weakness: "在别人眼中会觉得较无个性及原则，立场不够鲜明。",
    fitRoles: "商务谈判、跨部门协调、外联公关、项目整合经理",
    fitEnv: "多变化、需要频繁沟通协调、跨文化或跨部门的工作场景",
    mgtTip: "明确任务目标，给予清晰边界，利用其沟通优势处理内外关系",
    teamTip: "在冲突环境中充当调解者，适合承接对内对外的各种交涉任务",
  },
};

// ─── Radar Chart ───
const RadarChart = ({ scores, size = 300, printMode = false }) => {
  const center = size / 2;
  const radius = size * 0.34;
  const types = Object.keys(TYPES);
  const maxScore = 30;
  const step = (2 * Math.PI) / 5;
  const start = -Math.PI / 2;
  const pt = (i, v) => {
    const a = start + i * step;
    const r = (v / maxScore) * radius;
    return { x: center + r * Math.cos(a), y: center + r * Math.sin(a) };
  };
  const dp = types.map((t, i) => pt(i, scores[t]));
  const path = dp.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
  const gridStroke = printMode ? "#D1D5DB" : "#E2E8F0";
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
      {[0.2, 0.4, 0.6, 0.8, 1.0].map((lv) => {
        const pts = types.map((_, i) => pt(i, maxScore * lv));
        const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
        return <path key={lv} d={d} fill="none" stroke={gridStroke} strokeWidth="1" />;
      })}
      {types.map((_, i) => {
        const e = pt(i, maxScore);
        return <line key={i} x1={center} y1={center} x2={e.x} y2={e.y} stroke={gridStroke} strokeWidth="1" />;
      })}
      <path d={path} fill="rgba(99,102,241,0.12)" stroke="#6366F1" strokeWidth="2.5" />
      {dp.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="5" fill={TYPES[types[i]].color} stroke="#fff" strokeWidth="2.5" />
      ))}
      {types.map((t, i) => {
        const lr = radius + 32;
        const a = start + i * step;
        return (
          <g key={t}>
            <text x={center + lr * Math.cos(a)} y={center + lr * Math.sin(a) - 8} textAnchor="middle" fill={TYPES[t].color} fontSize="13" fontWeight="700">{TYPES[t].icon} {TYPES[t].name}</text>
            <text x={center + lr * Math.cos(a)} y={center + lr * Math.sin(a) + 8} textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="600">{scores[t]}分</text>
          </g>
        );
      })}
    </svg>
  );
};

// ─── Score Bar ───
const ScoreBar = ({ type, score, maxScore = 30, rank, animate = true }) => {
  const info = TYPES[type];
  const pct = (score / maxScore) * 100;
  const [show, setShow] = useState(!animate);
  useEffect(() => { if (animate) { const t = setTimeout(() => setShow(true), rank * 120); return () => clearTimeout(t); } }, [rank, animate]);
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: info.color }}>{info.icon} {info.name}</span>
        <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500 }}>{score} / {maxScore}</span>
      </div>
      <div style={{ height: 10, borderRadius: 5, background: "#F1F5F9", overflow: "hidden" }}>
        <div style={{ height: "100%", width: show ? `${pct}%` : "0%", background: info.gradient, borderRadius: 5, transition: animate ? "width 0.8s cubic-bezier(0.16,1,0.3,1)" : "none" }} />
      </div>
    </div>
  );
};

// ─── Report Page ───
const ReportPage = ({ scores, sorted, dominant, userName, testDate, onRestart }) => {
  const domInfo = TYPES[dominant];
  const secType = sorted[1]?.[0];
  const secInfo = secType ? TYPES[secType] : null;
  const reportRef = useRef(null);

  const handlePrint = () => window.print();

  const s = {
    page: { maxWidth: 800, margin: "0 auto", padding: "40px 48px", fontFamily: '-apple-system,"SF Pro Display","PingFang SC","Noto Sans SC",sans-serif', color: "#1E293B", background: "#fff" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "3px solid #6366F1", paddingBottom: 20, marginBottom: 32 },
    section: { marginBottom: 28, pageBreakInside: "avoid" },
    sTitle: { fontSize: 16, fontWeight: 700, color: "#4F46E5", marginBottom: 14, paddingBottom: 8, borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: 8 },
    card: { background: "#FAFBFE", borderRadius: 10, padding: "16px 20px", border: "1px solid #E8ECF4" },
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
    grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 },
    label: { fontSize: 11, color: "#94A3B8", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
    val: { fontSize: 14, color: "#1E293B", fontWeight: 500, lineHeight: 1.6 },
    tag: (c, bg) => ({ display: "inline-block", padding: "4px 12px", borderRadius: 16, background: bg, color: c, fontSize: 12, fontWeight: 600, marginRight: 6, marginBottom: 6 }),
    footer: { textAlign: "center", borderTop: "1px solid #E2E8F0", paddingTop: 20, marginTop: 32, fontSize: 11, color: "#94A3B8" },
  };

  return (
    <div>
      {/* Action bar — hidden in print */}
      <div className="no-print" style={{ maxWidth: 800, margin: "0 auto", padding: "16px 48px", display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <button onClick={onRestart} style={{ padding: "10px 24px", borderRadius: 8, border: "1px solid #E2E8F0", background: "#fff", color: "#64748B", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
          重新测试
        </button>
        <button onClick={handlePrint} style={{ padding: "10px 24px", borderRadius: 8, border: "none", background: "linear-gradient(135deg,#6366F1,#8B5CF6)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 8px rgba(99,102,241,0.25)" }}>
          导出 / 打印
        </button>
      </div>

      <div ref={reportRef} style={s.page}>
        {/* ── Header ── */}
        <div style={s.header}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#1E293B", letterSpacing: "-0.01em" }}>PDP 行为风格测评报告</div>
            <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>Professional Dynamometric Programs Assessment Report</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#94A3B8" }}>报告编号</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#475569", fontFamily: "monospace" }}>PDP-{testDate.replace(/-/g, "")}-{Math.random().toString(36).slice(2, 6).toUpperCase()}</div>
          </div>
        </div>

        {/* ── Basic Info ── */}
        <div style={s.section}>
          <div style={s.sTitle}>
            <span style={{ fontSize: 18 }}>📋</span> 基本信息
          </div>
          <div style={s.grid3}>
            <div style={s.card}>
              <div style={s.label}>测评人</div>
              <div style={s.val}>{userName || "未填写"}</div>
            </div>
            <div style={s.card}>
              <div style={s.label}>测评日期</div>
              <div style={s.val}>{testDate}</div>
            </div>
            <div style={s.card}>
              <div style={s.label}>测评工具</div>
              <div style={s.val}>PDP 行为风格量表（30题）</div>
            </div>
          </div>
        </div>

        {/* ── Overview ── */}
        <div style={s.section}>
          <div style={s.sTitle}>
            <span style={{ fontSize: 18 }}>🎯</span> 测评概览
          </div>
          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: "0 0 auto" }}>
              <RadarChart scores={scores} size={260} printMode />
            </div>
            <div style={{ flex: 1, minWidth: 240 }}>
              {sorted.map(([type, score], i) => (
                <ScoreBar key={type} type={type} score={score} rank={i} animate={false} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Dominant Type ── */}
        <div style={s.section}>
          <div style={s.sTitle}>
            <span style={{ fontSize: 18 }}>{domInfo.icon}</span> 主导类型：{domInfo.name}
            <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 400, marginLeft: 8 }}>{domInfo.sub} · {scores[dominant]}分</span>
          </div>
          <div style={{ ...s.card, marginBottom: 16 }}>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "#334155", margin: 0 }}>{domInfo.desc}</p>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={s.label}>核心特质标签</div>
            <div style={{ marginTop: 6 }}>
              {domInfo.traits.map((t) => (
                <span key={t} style={s.tag(domInfo.color, domInfo.lightBg)}>{t}</span>
              ))}
            </div>
          </div>
          <div style={s.grid2}>
            <div style={{ ...s.card, borderLeft: "3px solid #22C55E" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#16A34A", marginBottom: 6 }}>核心优势</div>
              <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, margin: 0 }}>{domInfo.strength}</p>
            </div>
            <div style={{ ...s.card, borderLeft: "3px solid #F59E0B" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#D97706", marginBottom: 6 }}>潜在盲区</div>
              <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, margin: 0 }}>{domInfo.weakness}</p>
            </div>
          </div>
        </div>

        {/* ── Secondary Type ── */}
        {secInfo && (
          <div style={s.section}>
            <div style={s.sTitle}>
              <span style={{ fontSize: 18 }}>{secInfo.icon}</span> 辅助类型：{secInfo.name}
              <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 400, marginLeft: 8 }}>{secInfo.sub} · {sorted[1][1]}分</span>
            </div>
            <div style={s.card}>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "#334155", margin: 0 }}>{secInfo.desc}</p>
              <div style={{ marginTop: 10 }}>
                {secInfo.traits.map((t) => (
                  <span key={t} style={s.tag(secInfo.color, secInfo.lightBg)}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Fit Analysis ── */}
        <div style={s.section}>
          <div style={s.sTitle}>
            <span style={{ fontSize: 18 }}>💼</span> 用人参考建议
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={s.card}>
              <div style={s.label}>适配岗位方向</div>
              <div style={{ ...s.val, marginTop: 4 }}>{domInfo.fitRoles}</div>
            </div>
            <div style={s.card}>
              <div style={s.label}>适配工作环境</div>
              <div style={{ ...s.val, marginTop: 4 }}>{domInfo.fitEnv}</div>
            </div>
            <div style={s.card}>
              <div style={s.label}>管理策略建议</div>
              <div style={{ ...s.val, marginTop: 4 }}>{domInfo.mgtTip}</div>
            </div>
            <div style={s.card}>
              <div style={s.label}>团队搭配建议</div>
              <div style={{ ...s.val, marginTop: 4 }}>{domInfo.teamTip}</div>
            </div>
          </div>
        </div>

        {/* ── Five-type comparison ── */}
        <div style={s.section}>
          <div style={s.sTitle}>
            <span style={{ fontSize: 18 }}>📊</span> 五维得分明细
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#F8FAFC" }}>
                {["类型", "得分", "占比", "强度等级"].map((h) => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: "#64748B", borderBottom: "2px solid #E2E8F0", fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map(([type, score], i) => {
                const info = TYPES[type];
                const pct = Math.round((score / 30) * 100);
                const level = pct >= 80 ? "极强" : pct >= 60 ? "较强" : pct >= 40 ? "中等" : pct >= 20 ? "较弱" : "极弱";
                const lvColor = pct >= 80 ? "#16A34A" : pct >= 60 ? "#2563EB" : pct >= 40 ? "#94A3B8" : pct >= 20 ? "#F59E0B" : "#EF4444";
                return (
                  <tr key={type} style={{ background: i === 0 ? `${info.lightBg}` : "transparent" }}>
                    <td style={{ padding: "10px 14px", borderBottom: "1px solid #F1F5F9", fontWeight: i === 0 ? 700 : 500, color: i === 0 ? info.color : "#334155" }}>
                      {info.icon} {info.name}{i === 0 ? "  ★" : ""}
                    </td>
                    <td style={{ padding: "10px 14px", borderBottom: "1px solid #F1F5F9", fontWeight: 600 }}>{score}</td>
                    <td style={{ padding: "10px 14px", borderBottom: "1px solid #F1F5F9" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 80, height: 6, borderRadius: 3, background: "#F1F5F9", overflow: "hidden" }}>
                          <div style={{ width: `${pct}%`, height: "100%", background: info.gradient, borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: 12, color: "#64748B" }}>{pct}%</span>
                      </div>
                    </td>
                    <td style={{ padding: "10px 14px", borderBottom: "1px solid #F1F5F9" }}>
                      <span style={{ padding: "2px 10px", borderRadius: 10, fontSize: 11, fontWeight: 600, color: lvColor, background: `${lvColor}12` }}>{level}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── Disclaimer ── */}
        <div style={s.section}>
          <div style={{ ...s.card, background: "#FFFBEB", borderColor: "#FDE68A" }}>
            <p style={{ fontSize: 12, color: "#92400E", lineHeight: 1.7, margin: 0 }}>
              <strong>声明：</strong>本报告基于 PDP 行为风格量表的自评数据生成，仅作为人才选拔、团队组建、岗位匹配的辅助参考工具。测评结果不代表能力高低，不构成任何录用或淘汰决策的唯一依据。建议结合面试、工作实绩及360度评估等多维度信息综合判断。
            </p>
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={s.footer}>
          <div>PDP Professional Dynamometric Programs Assessment Report</div>
          <div style={{ marginTop: 4 }}>Generated on {testDate} · Confidential</div>
        </div>
      </div>
    </div>
  );
};

// ─── Main App ───
export default function PDPTest() {
  const [phase, setPhase] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [userName, setUserName] = useState("");

  const progress = (Object.keys(answers).length / 30) * 100;
  const today = new Date().toISOString().slice(0, 10);

  const handleAnswer = (value) => {
    if (animating) return;
    setAnimating(true);
    setDirection(1);
    const na = { ...answers, [current]: value };
    setAnswers(na);
    setTimeout(() => {
      if (current < 29) setCurrent(current + 1);
      else if (Object.keys(na).length === 30) setPhase("info");
      setAnimating(false);
    }, 300);
  };

  const goBack = () => {
    if (current > 0 && !animating) {
      setAnimating(true); setDirection(-1);
      setTimeout(() => { setCurrent(current - 1); setAnimating(false); }, 250);
    }
  };

  const calcScores = () => {
    const sc = {};
    Object.entries(TYPES).forEach(([k, v]) => { sc[k] = v.questions.reduce((s, q) => s + (answers[q - 1] || 0), 0); });
    return sc;
  };
  const getDominant = (sc) => { let m = 0, d = "tiger"; Object.entries(sc).forEach(([k, v]) => { if (v > m) { m = v; d = k; } }); return d; };
  const getSorted = (sc) => Object.entries(sc).sort((a, b) => b[1] - a[1]);
  const restart = () => { setPhase("intro"); setCurrent(0); setAnswers({}); setDirection(1); setAnimating(false); setUserName(""); };

  const base = {
    minHeight: "100vh",
    fontFamily: '-apple-system,"SF Pro Display","PingFang SC","Noto Sans SC",sans-serif',
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "24px 16px", boxSizing: "border-box",
  };

  // ── INTRO ──
  if (phase === "intro") {
    return (
      <div style={{ ...base, background: "linear-gradient(180deg,#EEF2FF 0%,#FFFFFF 50%)", justifyContent: "center", color: "#1E293B" }}>
        <div style={{ textAlign: "center", maxWidth: 480, animation: "fadeUp .6s ease" }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🐯🦚🐨🦉🦎</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 6 }}>PDP-行为风格测试</h1>
          <p style={{ fontSize: 14, color: "#94A3B8", marginBottom: 36, lineHeight: 1.7 }}>
            Professional Dynamometric Programs<br />30 道题 · 约 3 分钟 · 生成企业用人参考报告
          </p>
          <button onClick={() => setPhase("test")} style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)", border: "none", color: "#fff", padding: "16px 52px", borderRadius: 50, fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 24px rgba(99,102,241,.3)", transition: "transform .2s" }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.04)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >开始测试</button>
          <div style={{ marginTop: 48, display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {Object.values(TYPES).map((t) => (
              <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#94A3B8" }}>
                <span style={{ fontSize: 16 }}>{t.icon}</span><span>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </div>
    );
  }

  // ── TEST ──
  if (phase === "test") {
    const q = QUESTIONS[current];
    const sel = answers[current];
    return (
      <div style={{ ...base, background: "#FAFBFE", color: "#1E293B" }}>
        <div style={{ width: "100%", maxWidth: 520, marginBottom: 40, marginTop: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>{current + 1} / 30</span>
            <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: "#E2E8F0" }}>
            <div style={{ height: "100%", width: `${progress}%`, borderRadius: 3, background: "linear-gradient(90deg,#6366F1,#8B5CF6)", transition: "width .4s ease" }} />
          </div>
        </div>
        <div key={current} style={{ width: "100%", maxWidth: 520, animation: direction > 0 ? "slideR .3s ease" : "slideL .3s ease" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 36, lineHeight: 1.6, textAlign: "center" }}>{q.text}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SCALE_OPTIONS.map((opt) => {
              const isSel = sel === opt.value;
              return (
                <button key={opt.value} onClick={() => handleAnswer(opt.value)} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "15px 20px", borderRadius: 12,
                  border: isSel ? `2px solid ${opt.color}` : "2px solid #E2E8F0",
                  background: isSel ? `${opt.color}0A` : "#fff",
                  color: isSel ? opt.color : "#475569",
                  cursor: "pointer", fontSize: 15, fontWeight: isSel ? 600 : 500,
                  transition: "all .15s", width: "100%",
                  boxShadow: isSel ? `0 2px 12px ${opt.color}20` : "0 1px 3px rgba(0,0,0,.04)",
                }}
                  onMouseEnter={(e) => { if (!isSel) { e.currentTarget.style.borderColor = "#CBD5E1"; e.currentTarget.style.background = "#F8FAFC"; } }}
                  onMouseLeave={(e) => { if (!isSel) { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.background = "#fff"; } }}
                >
                  <span>{opt.label}</span>
                  <div style={{ display: "flex", gap: 5 }}>
                    {[1, 2, 3, 4, 5].map((d) => (
                      <div key={d} style={{ width: 8, height: 8, borderRadius: "50%", background: d <= opt.value ? (isSel ? opt.color : "#CBD5E1") : "#F1F5F9" }} />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
            <button onClick={goBack} disabled={current === 0} style={{ background: "none", border: "none", color: current === 0 ? "#CBD5E1" : "#94A3B8", cursor: current === 0 ? "default" : "pointer", fontSize: 14, padding: "8px 16px", fontWeight: 500 }}>
              {"← 上一题"}
            </button>
            {sel && current < 29 && (
              <button onClick={() => { if (!animating) { setAnimating(true); setDirection(1); setTimeout(() => { setCurrent(current + 1); setAnimating(false); }, 250); } }}
                style={{ background: "none", border: "none", color: "#6366F1", cursor: "pointer", fontSize: 14, padding: "8px 16px", fontWeight: 600 }}>
                {"下一题 →"}
              </button>
            )}
            {Object.keys(answers).length === 30 && (
              <button onClick={() => setPhase("info")} style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)", border: "none", color: "#fff", padding: "10px 28px", borderRadius: 50, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                {"查看结果 ✨"}
              </button>
            )}
          </div>
        </div>
        <style>{`
          @keyframes slideR{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
          @keyframes slideL{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
        `}</style>
      </div>
    );
  }

  // ── INFO (name input before report) ──
  if (phase === "info") {
    return (
      <div style={{ ...base, background: "linear-gradient(180deg,#EEF2FF 0%,#FFFFFF 50%)", justifyContent: "center", color: "#1E293B" }}>
        <div style={{ textAlign: "center", maxWidth: 400, animation: "fadeUp .5s ease" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>测评完成！</h2>
          <p style={{ fontSize: 14, color: "#64748B", marginBottom: 28, lineHeight: 1.7 }}>填写姓名以生成正式报告，也可留空直接查看</p>
          <input
            type="text" placeholder="请输入测评人姓名" value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{ width: "100%", padding: "14px 18px", borderRadius: 12, border: "2px solid #E2E8F0", fontSize: 15, outline: "none", boxSizing: "border-box", textAlign: "center", color: "#1E293B", transition: "border-color .2s" }}
            onFocus={(e) => e.target.style.borderColor = "#6366F1"}
            onBlur={(e) => e.target.style.borderColor = "#E2E8F0"}
          />
          <button onClick={() => setPhase("result")} style={{ marginTop: 20, background: "linear-gradient(135deg,#6366F1,#8B5CF6)", border: "none", color: "#fff", padding: "14px 48px", borderRadius: 50, fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px rgba(99,102,241,.3)", width: "100%" }}>
            生成报告
          </button>
        </div>
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </div>
    );
  }

  // ── RESULT ──
  const scores = calcScores();
  const dominant = getDominant(scores);
  const sorted = getSorted(scores);

  return (
    <div style={{ background: "#F1F5F9", minHeight: "100vh", paddingTop: 8, paddingBottom: 40 }}>
      <ReportPage scores={scores} sorted={sorted} dominant={dominant} userName={userName} testDate={today} onRestart={restart} />
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </div>
  );
}
