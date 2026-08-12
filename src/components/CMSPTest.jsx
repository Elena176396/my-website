import { useState, useEffect, useRef } from "react";

const QUESTIONS = [
  // 优点 1-20
  { id:1, section:"优点", options:[
    {text:"富于冒险",type:"C"},{text:"适应力强",type:"P"},{text:"生动",type:"S"},{text:"善于分析",type:"M"}
  ]},
  { id:2, section:"优点", options:[
    {text:"坚持不懈",type:"M"},{text:"喜好娱乐",type:"S"},{text:"善于说服",type:"C"},{text:"平和",type:"P"}
  ]},
  { id:3, section:"优点", options:[
    {text:"顺服",type:"P"},{text:"自我牺牲",type:"M"},{text:"善于社交",type:"S"},{text:"意志坚定",type:"C"}
  ]},
  { id:4, section:"优点", options:[
    {text:"体贴",type:"M"},{text:"自控性",type:"P"},{text:"竞争性",type:"C"},{text:"令人信服",type:"S"}
  ]},
  { id:5, section:"优点", options:[
    {text:"使人振作",type:"S"},{text:"受尊重",type:"M"},{text:"含蓄",type:"P"},{text:"反应敏捷",type:"C"}
  ]},
  { id:6, section:"优点", options:[
    {text:"满足",type:"P"},{text:"敏感",type:"M"},{text:"自立",type:"C"},{text:"生机勃勃",type:"S"}
  ]},
  { id:7, section:"优点", options:[
    {text:"计划者",type:"M"},{text:"耐性",type:"P"},{text:"积极",type:"C"},{text:"推动者",type:"S"}
  ]},
  { id:8, section:"优点", options:[
    {text:"肯定",type:"C"},{text:"无拘无束",type:"S"},{text:"按部就班",type:"M"},{text:"羞涩",type:"P"}
  ]},
  { id:9, section:"优点", options:[
    {text:"井井有条",type:"M"},{text:"迁就",type:"P"},{text:"坦率",type:"C"},{text:"乐观",type:"S"}
  ]},
  { id:10, section:"优点", options:[
    {text:"友善",type:"P"},{text:"忠诚",type:"M"},{text:"有趣",type:"S"},{text:"强迫性",type:"C"}
  ]},
  { id:11, section:"优点", options:[
    {text:"勇敢",type:"C"},{text:"可爱",type:"S"},{text:"外交手腕",type:"P"},{text:"注重细节",type:"M"}
  ]},
  { id:12, section:"优点", options:[
    {text:"令人高兴",type:"S"},{text:"贯彻始终",type:"P"},{text:"文化修养",type:"M"},{text:"自信",type:"C"}
  ]},
  { id:13, section:"优点", options:[
    {text:"理想主义",type:"M"},{text:"独立",type:"C"},{text:"无攻击性",type:"P"},{text:"激励性",type:"S"}
  ]},
  { id:14, section:"优点", options:[
    {text:"感情外露",type:"S"},{text:"果断",type:"C"},{text:"尖刻幽默",type:"P"},{text:"深沉",type:"M"}
  ]},
  { id:15, section:"优点", options:[
    {text:"调解者",type:"P"},{text:"音乐性",type:"M"},{text:"发起者",type:"C"},{text:"喜交朋友",type:"S"}
  ]},
  { id:16, section:"优点", options:[
    {text:"考虑周到",type:"M"},{text:"执着",type:"C"},{text:"多言",type:"S"},{text:"容忍",type:"P"}
  ]},
  { id:17, section:"优点", options:[
    {text:"聆听者",type:"P"},{text:"忠心",type:"M"},{text:"领导者",type:"C"},{text:"活力充沛",type:"S"}
  ]},
  { id:18, section:"优点", options:[
    {text:"知足",type:"P"},{text:"首领",type:"C"},{text:"制图者",type:"M"},{text:"惹人喜爱",type:"S"}
  ]},
  { id:19, section:"优点", options:[
    {text:"完美主义者",type:"M"},{text:"和气",type:"P"},{text:"勤劳",type:"C"},{text:"受欢迎",type:"S"}
  ]},
  { id:20, section:"优点", options:[
    {text:"跳跃型",type:"S"},{text:"无畏",type:"C"},{text:"规范型",type:"M"},{text:"平衡",type:"P"}
  ]},
  // 缺点 21-40
  { id:21, section:"缺点", options:[
    {text:"乏味",type:"P"},{text:"忸怩",type:"M"},{text:"露骨",type:"S"},{text:"专横",type:"C"}
  ]},
  { id:22, section:"缺点", options:[
    {text:"散漫",type:"S"},{text:"无同情心",type:"C"},{text:"缺乏热情",type:"P"},{text:"不宽恕",type:"M"}
  ]},
  { id:23, section:"缺点", options:[
    {text:"保留",type:"P"},{text:"怨恨",type:"M"},{text:"逆反",type:"C"},{text:"唠叨",type:"S"}
  ]},
  { id:24, section:"缺点", options:[
    {text:"挑剔",type:"M"},{text:"胆小",type:"P"},{text:"健忘",type:"S"},{text:"率直",type:"C"}
  ]},
  { id:25, section:"缺点", options:[
    {text:"急躁",type:"C"},{text:"无安全感",type:"M"},{text:"优柔寡断",type:"P"},{text:"好插嘴",type:"S"}
  ]},
  { id:26, section:"缺点", options:[
    {text:"不受欢迎",type:"M"},{text:"不合群",type:"P"},{text:"难预测",type:"S"},{text:"不善表达",type:"C"}
  ]},
  { id:27, section:"缺点", options:[
    {text:"固执",type:"C"},{text:"即兴",type:"S"},{text:"难于取悦",type:"M"},{text:"犹豫不决",type:"P"}
  ]},
  { id:28, section:"缺点", options:[
    {text:"平乏",type:"P"},{text:"悲观",type:"M"},{text:"自负",type:"C"},{text:"放任",type:"S"}
  ]},
  { id:29, section:"缺点", options:[
    {text:"易怒",type:"S"},{text:"无目标",type:"P"},{text:"好争吵",type:"C"},{text:"不合群",type:"M"}
  ]},
  { id:30, section:"缺点", options:[
    {text:"幼稚",type:"S"},{text:"消极",type:"M"},{text:"鲁莽",type:"C"},{text:"冷漠",type:"P"}
  ]},
  { id:31, section:"缺点", options:[
    {text:"担忧",type:"P"},{text:"不善交际",type:"M"},{text:"工作狂",type:"C"},{text:"虚荣",type:"S"}
  ]},
  { id:32, section:"缺点", options:[
    {text:"过分敏感",type:"M"},{text:"不圆滑老练",type:"C"},{text:"胆怯",type:"P"},{text:"喋喋不休",type:"S"}
  ]},
  { id:33, section:"缺点", options:[
    {text:"多疑",type:"P"},{text:"生活紊乱",type:"S"},{text:"跋扈",type:"C"},{text:"抑郁",type:"M"}
  ]},
  { id:34, section:"缺点", options:[
    {text:"反复",type:"S"},{text:"内向",type:"M"},{text:"排斥异已",type:"C"},{text:"无异议",type:"P"}
  ]},
  { id:35, section:"缺点", options:[
    {text:"杂乱无章",type:"S"},{text:"情绪化",type:"M"},{text:"言语不清",type:"P"},{text:"喜操纵",type:"C"}
  ]},
  { id:36, section:"缺点", options:[
    {text:"缓慢",type:"P"},{text:"顽固",type:"C"},{text:"好表现",type:"S"},{text:"怀疑",type:"M"}
  ]},
  { id:37, section:"缺点", options:[
    {text:"孤僻",type:"M"},{text:"统治欲",type:"C"},{text:"懒惰",type:"P"},{text:"大嗓门",type:"S"}
  ]},
  { id:38, section:"缺点", options:[
    {text:"拖延",type:"P"},{text:"多疑",type:"M"},{text:"易怒",type:"C"},{text:"不专注",type:"S"}
  ]},
  { id:39, section:"缺点", options:[
    {text:"报复型",type:"S"},{text:"烦躁",type:"C"},{text:"勉强",type:"M"},{text:"轻率",type:"P"}
  ]},
  { id:40, section:"缺点", options:[
    {text:"妥协",type:"P"},{text:"好批评",type:"M"},{text:"狡猾",type:"C"},{text:"善变",type:"S"}
  ]},
];

const TYPE_META = {
  C: {
    name: "力量型", sub: "Choleric · 胆汁质", humor: "黄胆汁",
    color: "#C0392B", light: "#FDEDEC", accent: "#E74C3C",
    icon: "🔥",
    motto: "为目标而活",
    catchphrase: "绝对！100%！我告诉你的！",
    keywords: ["行动力强","意志坚定","天生领导者","不达目的不罢休"],
    strengths: [
      "冒险性、说服力强",
      "竞争性强，越挫越坚",
      "意志坚强，复杂环境中迅速找到解决方法",
      "自立、果断、独立",
      "直言不讳，天生的行动者和领导者",
    ],
    weaknesses: [
      "死不认错，做错事后容易原谅自己",
      "不易看到别人的需求",
      "强迫性工作狂，给周围人压力太大",
      "控制欲强、专横",
      "人际关系紧张，处理人际关系的低能儿",
    ],
    growth: [
      "减轻对别人的压力，学会放松",
      "尝试接受别人的意见，学习耐心和低调",
      "学习包容，学会道歉和坦然接受错误",
      "当你学会承认错误，便真正成功了",
    ],
  },
  S: {
    name: "活泼型", sub: "Sanguine · 多血质", humor: "血液",
    color: "#E67E22", light: "#FEF5E7", accent: "#F39C12",
    icon: "☀️",
    motto: "快乐",
    catchphrase: "太好了！我太高兴了！",
    keywords: ["热情洋溢","注意力中心","精力充沛","好奇心强"],
    strengths: [
      "生动活泼，讲故事专家",
      "开朗、热情，天生社交者",
      "朝气蓬勃、敏锐",
      "朋友多，感染力强",
      "决策来自情感，行动力强",
    ],
    weaknesses: [
      "灵乱、无章法",
      "多变，缺乏毅力，表面工作",
      "自我中心主义",
      "记忆力不好，经常迟到",
      "爱好多却不精，轻许诺",
    ],
    growth: [
      "管住自己的嘴",
      "控制表现欲望",
      "对自己的评价不要过高",
      "不要太善变，要脚踏实地做完一件事",
    ],
  },
  M: {
    name: "完美型", sub: "Melancholic · 抑郁质", humor: "黑胆汁",
    color: "#2C3E90", light: "#EBF0FA", accent: "#3498DB",
    icon: "🌙",
    motto: "奉献",
    catchphrase: "万一不行……我就知道做不成……",
    keywords: ["深思熟虑","追求完美","艺术天分","情感丰富"],
    strengths: [
      "分析性强，甘心牺牲，很有天分",
      "持久忠诚，重承诺",
      "敏感，注重细节",
      "计划性强，井井有条",
      "深沉，易受感动，理想主义",
    ],
    weaknesses: [
      "矛盾体：自信+自卑，自负+自贬",
      "总是从负面看问题",
      "优柔寡断、易拖延",
      "标准太高，好面子",
      "易受环境影响，情绪化",
    ],
    growth: [
      "要快乐起来——没人喜欢郁闷的人",
      "不要太容易受伤害，不要太敏感",
      "不要把时间都用来规划而不去行动",
      "放松下来，去发现别人的优点",
    ],
  },
  P: {
    name: "和平型", sub: "Phlegmatic · 粘液质", humor: "粘液",
    color: "#16A085", light: "#E8F8F5", accent: "#1ABC9C",
    icon: "🌿",
    motto: "平淡而自在的生活",
    catchphrase: "随便",
    keywords: ["易相处","耐心","适应力强","好的聆听者"],
    strengths: [
      "包容性、适应性极强",
      "平和、旁观者视角",
      "不会缺少朋友",
      "记忆力强，优秀的模仿者",
      "心地善良，有同情心",
    ],
    weaknesses: [
      "拒绝改变，喜欢一成不变",
      "惰性强，目标感不强",
      "不轻易拒绝别人",
      "不愿承担责任，回避压力",
      "不善于做决定",
    ],
    growth: [
      "给自己尝试新鲜的事物和思想",
      "明确生活的责任，不要得过且过",
      "有意识接受督促",
      "多表达，多沟通",
    ],
  },
};

const COMBOS = {
  "CM": { label: "互补型", desc: "力量与完美的结合——你既有目标驱动力又有执行标准。外在果断，内在严谨。" },
  "MC": { label: "互补型", desc: "完美与力量的结合——你先思考再行动，但行动时雷厉风行。" },
  "SP": { label: "互补型", desc: "活泼与和平的结合——热情中带着温和，社交达人但不咄咄逼人。" },
  "PS": { label: "互补型", desc: "和平与活泼的结合——温和中带着热情，内心柔软但外在活跃。" },
  "CS": { label: "外向型", desc: "力量与活泼的外向自由组合——你行动力强又有感染力，容易成为领袖。" },
  "SC": { label: "外向型", desc: "活泼与力量的外向组合——热情洋溢且目标明确，天生的推动者。" },
  "MP": { label: "内向型", desc: "完美与和平的内向组合——深思熟虑且平和，内心世界丰富。" },
  "PM": { label: "内向型", desc: "和平与完美的内向组合——温和且有标准，安静但有原则。" },
  "MS": { label: "情感矛盾型", desc: "完美与活泼——你内心深沉却外在活跃。两种矛盾的情感力量在你体内拉扯。" },
  "SM": { label: "情感矛盾型", desc: "活泼与完美——你外在热情却内心严苛。这种矛盾让你既有感染力又有深度。" },
  "CP": { label: "行为矛盾型", desc: "力量与和平——你有时强势有时退让。行动模式在主导与包容之间切换。" },
  "PC": { label: "行为矛盾型", desc: "和平与力量——你看起来温和，但关键时刻爆发力惊人。" },
};

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Screens ───

function StartScreen({ onStart }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 24px" }}>
      <div style={{ fontSize: 48, marginBottom: 8 }}>🏛️</div>
      <h1 style={{
        fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px",
        color: "var(--text-primary)", margin: "0 0 6px"
      }}>CMSP-希波克拉底性格测试</h1>
      <p style={{
        fontSize: 13, color: "var(--text-tertiary)", margin: "0 0 32px",
        letterSpacing: "2px", textTransform: "uppercase"
      }}>源自古希腊希波克拉底体液学说</p>

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10,
        maxWidth: 340, margin: "0 auto 36px",
      }}>
        {["C","S","M","P"].map(k => {
          const t = TYPE_META[k];
          return (
            <div key={k} style={{
              background: t.light, borderRadius: 12, padding: "14px 12px",
              border: `1px solid ${t.color}22`,
            }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{t.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.color }}>{t.name}</div>
              <div style={{ fontSize: 11, color: t.color+"aa" }}>{t.humor}</div>
            </div>
          );
        })}
      </div>

      <div style={{
        background: "var(--bg-secondary)", borderRadius: 12, padding: "16px 20px",
        maxWidth: 380, margin: "0 auto 32px", textAlign: "left",
        fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7,
      }}>
        <div style={{ fontWeight: 700, marginBottom: 6, color: "var(--text-primary)" }}>测试说明</div>
        共 40 题，每题选择最适合你的 1 个词。
        前 20 题描述优点，后 20 题描述缺点。
        如果不确定，想想小时候的自己。
        <div style={{ marginTop: 8, fontSize: 12, color: "var(--text-tertiary)" }}>
          ⏱ 约 5-8 分钟 · 性格无好坏之分
        </div>
      </div>

      <button onClick={onStart} style={{
        background: "var(--text-primary)", color: "var(--bg-primary)",
        border: "none", borderRadius: 99, padding: "14px 48px",
        fontSize: 16, fontWeight: 700, cursor: "pointer",
        transition: "opacity .15s",
      }}
        onMouseEnter={e => e.target.style.opacity = "0.85"}
        onMouseLeave={e => e.target.style.opacity = "1"}
      >开始测试</button>
    </div>
  );
}

function QuestionScreen({ question, index, total, answer, onAnswer, onPrev, onNext, canGoNext }) {
  const sectionLabel = question.section === "优点" ? "优点" : "缺点";
  const sectionColor = question.section === "优点" ? "#16A085" : "#E67E22";
  const progress = ((index) / total) * 100;

  const shuffled = useRef(null);
  const prevId = useRef(null);
  if (prevId.current !== question.id) {
    shuffled.current = shuffleArray(question.options);
    prevId.current = question.id;
  }
  const opts = shuffled.current;

  return (
    <div style={{ padding: "24px 20px 32px" }}>
      {/* Progress */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 8,
        }}>
          <span style={{
            fontSize: 12, fontWeight: 600, color: sectionColor,
            background: sectionColor + "15", padding: "3px 10px", borderRadius: 99,
          }}>{sectionLabel}</span>
          <span style={{ fontSize: 13, color: "var(--text-tertiary)", fontWeight: 600 }}>
            {index + 1} / {total}
          </span>
        </div>
        <div style={{
          height: 4, background: "var(--border-primary)", borderRadius: 99, overflow: "hidden",
        }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: `linear-gradient(90deg, ${sectionColor}, ${sectionColor}cc)`,
            borderRadius: 99, transition: "width .3s ease",
          }} />
        </div>
      </div>

      {/* Question */}
      <h2 style={{
        fontSize: 20, fontWeight: 800, color: "var(--text-primary)",
        margin: "0 0 6px", lineHeight: 1.3,
      }}>第 {question.id} 题</h2>
      <p style={{
        fontSize: 14, color: "var(--text-tertiary)", margin: "0 0 24px",
      }}>选择最符合你的一个词</p>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
        {opts.map((opt, i) => {
          const selected = answer === opt.text;
          return (
            <button
              key={opt.text}
              onClick={() => onAnswer(opt.text, opt.type)}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                background: selected ? "var(--text-primary)" : "var(--bg-primary)",
                color: selected ? "var(--bg-primary)" : "var(--text-primary)",
                border: selected ? "none" : "1.5px solid var(--border-primary)",
                borderRadius: 14, padding: "16px 18px",
                fontSize: 16, fontWeight: selected ? 700 : 500,
                cursor: "pointer", textAlign: "left",
                transition: "all .15s ease",
                transform: selected ? "scale(1.02)" : "scale(1)",
              }}
            >
              <span style={{
                width: 28, height: 28, borderRadius: 99,
                border: selected ? "none" : "2px solid var(--border-primary)",
                background: selected ? "var(--bg-primary)" : "transparent",
                color: selected ? "var(--text-primary)" : "var(--text-tertiary)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, flexShrink: 0,
              }}>
                {selected ? "✓" : String.fromCharCode(65 + i)}
              </span>
              {opt.text}
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
        <button
          onClick={onPrev}
          disabled={index === 0}
          style={{
            flex: 1, padding: "12px 0", borderRadius: 12,
            border: "1.5px solid var(--border-primary)",
            background: "transparent", color: "var(--text-secondary)",
            fontSize: 14, fontWeight: 600, cursor: index === 0 ? "default" : "pointer",
            opacity: index === 0 ? 0.3 : 1,
          }}
        >上一题</button>
        <button
          onClick={onNext}
          disabled={!canGoNext}
          style={{
            flex: 1, padding: "12px 0", borderRadius: 12,
            border: "none",
            background: canGoNext ? "var(--text-primary)" : "var(--border-primary)",
            color: canGoNext ? "var(--bg-primary)" : "var(--text-tertiary)",
            fontSize: 14, fontWeight: 700, cursor: canGoNext ? "pointer" : "default",
          }}
        >{index === total - 1 ? "查看结果" : "下一题"}</button>
      </div>
    </div>
  );
}

function ResultScreen({ scores, answers, onRestart }) {
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [primary, primaryScore] = sorted[0];
  const [secondary, secondaryScore] = sorted[1];
  const comboKey = primary + secondary;
  const combo = COMBOS[comboKey];
  const pm = TYPE_META[primary];
  const sm = TYPE_META[secondary];

  // Calculate strengths vs weaknesses breakdown
  const strengthScores = { C: 0, S: 0, M: 0, P: 0 };
  const weaknessScores = { C: 0, S: 0, M: 0, P: 0 };
  answers.forEach(a => {
    const q = QUESTIONS.find(q => q.id === a.qId);
    if (q.section === "优点") strengthScores[a.type]++;
    else weaknessScores[a.type]++;
  });

  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { key: "overview", label: "总览" },
    { key: "primary", label: pm.name },
    { key: "secondary", label: sm.name },
    { key: "growth", label: "成长建议" },
  ];

  return (
    <div style={{ padding: "32px 20px 40px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 48, marginBottom: 4 }}>{pm.icon}</div>
        <h1 style={{
          fontSize: 30, fontWeight: 800, color: pm.color,
          margin: "0 0 4px", letterSpacing: "-0.5px",
        }}>{pm.name}</h1>
        <p style={{ fontSize: 14, color: "var(--text-tertiary)", margin: "0 0 4px" }}>
          {pm.sub}
        </p>
        <p style={{ fontSize: 13, color: "var(--text-tertiary)", margin: 0 }}>
          {primaryScore}C · {secondaryScore}{secondary === primary ? "" : secondary} · 共 {total} 题
        </p>
      </div>

      {/* Score bars */}
      <div style={{
        background: "var(--bg-secondary)", borderRadius: 16, padding: "18px 18px 14px",
        marginBottom: 20,
      }}>
        {sorted.map(([type, score]) => {
          const pct = Math.round((score / total) * 100);
          const meta = TYPE_META[type];
          return (
            <div key={type} style={{ marginBottom: 10 }}>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "baseline",
                marginBottom: 5,
              }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: meta.color }}>
                  {meta.icon} {type} {meta.name}
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: meta.color }}>
                  {score} 分 · {pct}%
                </span>
              </div>
              <div style={{
                height: 10, background: meta.light, borderRadius: 99, overflow: "hidden",
              }}>
                <div style={{
                  height: "100%", width: `${pct}%`, background: meta.color,
                  borderRadius: 99, transition: "width .5s ease",
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Combo label */}
      {combo && (
        <div style={{
          background: pm.light, border: `1px solid ${pm.color}22`,
          borderRadius: 14, padding: "14px 16px", marginBottom: 20,
        }}>
          <div style={{
            fontSize: 13, fontWeight: 700, color: pm.color, marginBottom: 4,
          }}>
            {primary}{secondary} · {combo.label}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
            {combo.desc}
          </div>
        </div>
      )}

      {/* Strengths vs Weaknesses breakdown */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10,
        marginBottom: 20,
      }}>
        <div style={{
          background: "#16A08510", borderRadius: 12, padding: "14px 14px",
          border: "1px solid #16A08520",
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#16A085", marginBottom: 8 }}>
            优点倾向
          </div>
          {Object.entries(strengthScores).sort((a, b) => b[1] - a[1]).map(([t, s]) => (
            <div key={t} style={{
              display: "flex", justifyContent: "space-between",
              fontSize: 12, color: "var(--text-secondary)", marginBottom: 3,
            }}>
              <span>{TYPE_META[t].icon} {t}</span>
              <span style={{ fontWeight: 600 }}>{s}</span>
            </div>
          ))}
        </div>
        <div style={{
          background: "#E67E2210", borderRadius: 12, padding: "14px 14px",
          border: "1px solid #E67E2220",
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#E67E22", marginBottom: 8 }}>
            缺点倾向
          </div>
          {Object.entries(weaknessScores).sort((a, b) => b[1] - a[1]).map(([t, s]) => (
            <div key={t} style={{
              display: "flex", justifyContent: "space-between",
              fontSize: 12, color: "var(--text-secondary)", marginBottom: 3,
            }}>
              <span>{TYPE_META[t].icon} {t}</span>
              <span style={{ fontWeight: 600 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: 4, marginBottom: 18,
        background: "var(--bg-secondary)", borderRadius: 12, padding: 4,
      }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1, padding: "8px 4px", borderRadius: 10,
              border: "none", fontSize: 12.5, fontWeight: 600,
              cursor: "pointer",
              background: activeTab === tab.key ? "var(--bg-primary)" : "transparent",
              color: activeTab === tab.key ? "var(--text-primary)" : "var(--text-tertiary)",
              boxShadow: activeTab === tab.key ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              transition: "all .15s",
            }}
          >{tab.label}</button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{
        background: "var(--bg-secondary)", borderRadius: 16, padding: "20px 18px",
        marginBottom: 28, minHeight: 200,
      }}>
        {activeTab === "overview" && (
          <div>
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 10 }}>
                你的性格公式
              </div>
              <div style={{
                display: "flex", gap: 8, flexWrap: "wrap",
              }}>
                {sorted.map(([t, s]) => (
                  <span key={t} style={{
                    background: TYPE_META[t].color, color: "#fff",
                    borderRadius: 8, padding: "6px 12px",
                    fontSize: 16, fontWeight: 800,
                  }}>{s}{t}</span>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
                核心口头禅
              </div>
              <div style={{
                fontSize: 15, color: pm.color, fontWeight: 600,
                fontStyle: "italic", lineHeight: 1.5,
              }}>"{pm.catchphrase}"</div>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
                生命意义
              </div>
              <div style={{
                fontSize: 18, fontWeight: 800, color: pm.color,
              }}>{pm.motto}</div>
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
                关键词
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {pm.keywords.map(k => (
                  <span key={k} style={{
                    background: pm.light, color: pm.color,
                    borderRadius: 99, padding: "4px 12px",
                    fontSize: 12, fontWeight: 600,
                  }}>{k}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "primary" && (
          <div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: pm.color, marginBottom: 14,
              display: "flex", alignItems: "center", gap: 8,
            }}>{pm.icon} 主性格 · {pm.name} ({pm.sub})</div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>优势</div>
              {pm.strengths.map((s, i) => (
                <div key={i} style={{
                  fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7,
                  paddingLeft: 12, borderLeft: `2px solid ${pm.color}33`, marginBottom: 6,
                }}>{s}</div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>短板</div>
              {pm.weaknesses.map((w, i) => (
                <div key={i} style={{
                  fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7,
                  paddingLeft: 12, borderLeft: `2px solid #E74C3C33`, marginBottom: 6,
                }}>{w}</div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "secondary" && (
          <div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: sm.color, marginBottom: 14,
              display: "flex", alignItems: "center", gap: 8,
            }}>{sm.icon} 副性格 · {sm.name} ({sm.sub})</div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>优势</div>
              {sm.strengths.map((s, i) => (
                <div key={i} style={{
                  fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7,
                  paddingLeft: 12, borderLeft: `2px solid ${sm.color}33`, marginBottom: 6,
                }}>{s}</div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>短板</div>
              {sm.weaknesses.map((w, i) => (
                <div key={i} style={{
                  fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7,
                  paddingLeft: 12, borderLeft: `2px solid #E74C3C33`, marginBottom: 6,
                }}>{w}</div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "growth" && (
          <div>
            <div style={{ marginBottom: 18 }}>
              <div style={{
                fontSize: 14, fontWeight: 700, color: pm.color, marginBottom: 10,
                display: "flex", alignItems: "center", gap: 6,
              }}>{pm.icon} {pm.name}的成长方向</div>
              {pm.growth.map((g, i) => (
                <div key={i} style={{
                  display: "flex", gap: 10, alignItems: "flex-start",
                  fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 8,
                }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: 6,
                    background: pm.light, color: pm.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1,
                  }}>{i + 1}</span>
                  {g}
                </div>
              ))}
            </div>
            <div>
              <div style={{
                fontSize: 14, fontWeight: 700, color: sm.color, marginBottom: 10,
                display: "flex", alignItems: "center", gap: 6,
              }}>{sm.icon} {sm.name}的成长方向</div>
              {sm.growth.map((g, i) => (
                <div key={i} style={{
                  display: "flex", gap: 10, alignItems: "flex-start",
                  fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 8,
                }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: 6,
                    background: sm.light, color: sm.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1,
                  }}>{i + 1}</span>
                  {g}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Notes */}
      <div style={{
        background: "var(--bg-secondary)", borderRadius: 12, padding: "14px 16px",
        marginBottom: 24, fontSize: 12, color: "var(--text-tertiary)", lineHeight: 1.7,
      }}>
        <div style={{ fontWeight: 700, color: "var(--text-secondary)", marginBottom: 4 }}>关于结果</div>
        性格分为显性和隐性。此测试结果多为显性性格（受教育、家庭、社会环境影响的"面具"）。
        没有人是单一性格，你是四种的独特组合。性格无好坏之分，关键是提高情商。
      </div>

      <button onClick={onRestart} style={{
        width: "100%", padding: "14px 0", borderRadius: 99,
        border: "none", background: "var(--text-primary)",
        color: "var(--bg-primary)", fontSize: 15, fontWeight: 700,
        cursor: "pointer",
      }}>重新测试</button>
    </div>
  );
}

// ─── Main App ───

export default function CMSPTest() {
  const [phase, setPhase] = useState("start");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({}); // { qId: { text, type } }

  const handleAnswer = (text, type) => {
    setAnswers(prev => ({ ...prev, [QUESTIONS[currentQ].id]: { text, type, qId: QUESTIONS[currentQ].id } }));
  };

  const handleNext = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setPhase("result");
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const scores = { C: 0, S: 0, M: 0, P: 0 };
  const answerList = [];
  Object.values(answers).forEach(a => {
    scores[a.type]++;
    answerList.push(a);
  });

  const currentAnswer = answers[QUESTIONS[currentQ]?.id];

  return (
    <div style={{
      maxWidth: 480, margin: "0 auto",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      minHeight: "100vh",
    }}>
      {phase === "start" && <StartScreen onStart={() => setPhase("test")} />}
      {phase === "test" && (
        <QuestionScreen
          question={QUESTIONS[currentQ]}
          index={currentQ}
          total={QUESTIONS.length}
          answer={currentAnswer?.text}
          onAnswer={handleAnswer}
          onPrev={handlePrev}
          onNext={handleNext}
          canGoNext={!!currentAnswer}
        />
      )}
      {phase === "result" && (
        <ResultScreen
          scores={scores}
          answers={answerList}
          onRestart={() => { setPhase("start"); setCurrentQ(0); setAnswers({}); }}
        />
      )}
    </div>
  );
}
