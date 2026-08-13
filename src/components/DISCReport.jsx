import { useState, useRef, useCallback, useEffect } from "react";

const questions = [
  { id: 1, text: "当您和朋友一起用餐时，在选择餐厅或是吃什么时，您通常是：", options: ["决定者：意见不同时，通常都是决定者", "气氛制造者：吃什么，都很能带动情绪气氛", "附和者：随便，没意见", "意见提供者：常去否定别人的建议，自己却又没建议，不做决定"] },
  { id: 2, text: "当您买衣服时，您是：", options: ["不易受售货员的影响，心中自有定见", "售货员的亲切友好态度，常会促进您的购买", "只找熟悉的店购买", "品质与价格是否成正比？价格是否合适？"] },
  { id: 3, text: "您的消费习惯是：", options: ["找到要买的东西，付钱走人", "很随意地逛，不特定买什么", "有一定的消费习惯，时间固定不太喜欢变化", "较注意东西好不好，较有成本观念"] },
  { id: 4, text: "您的朋友用一句话来形容您，他们会说：", options: ["沉默寡言", "热情洋溢", "温和斯文", "追求完美"] },
  { id: 5, text: "您自认为哪种形容最能表现您的特色：", options: ["果敢的，能接受挑战", "生动活泼，不拘泥", "爱倾听，喜欢稳定", "处事谨慎小心，重数据分析"] },
  { id: 6, text: "您觉得做事的重点应该是：", options: ["做什么，重结果", "谁来做，重感受（过程）", "如何做，重执行", "为何做，重品质"] },
  { id: 7, text: "与同事有意见冲突（或不同）时，您是：", options: ["说服对方，坚持自己意见", "找其他同事或上司，寻找支持", "退让，以和为贵", "与冲突者协调，找寻最好的意见"] },
  { id: 8, text: "什么样的工作环境最能鼓舞您：", options: ["能让您决定事情，具领尊地位的", "同事相处愉快，处处受欢迎", "稳定中求发展", "讲品质，重效率的工作"] },
  { id: 9, text: "以下的沟通方式，哪一项最符合您？", options: ["直截了当，较权威式的", "表情丰富，肢体语言较多", "先听听别人意见，而后婉转地表达自己的意见", "不露感情的，理多于情，爱分析，较冷静"] },
  { id: 10, text: "在每一次会议中或公司决议提案时，您所扮演的角色是什么？", options: ["据理力争", "协调者", "赞同多数", "分析所有提案以供参考"] },
  { id: 11, text: "请选择最符合自己的一项：", options: ["我做事一向具体，能在短期达到目标，决定快速，立即得到结果", "在本性上我喜欢跟各式各样的人交往，甚至陌生人也可以", "我不喜欢强出头，宁可当后补", "我是一个自我约束能力强、守纪律的人，凡事依照目标行事"] },
  { id: 12, text: "请选择最符合自己的一项：", options: ["我喜欢有变化、激烈、有竞争的工作，是个能接受挑战的人", "我喜欢社交，也喜欢款待人", "我喜欢成为小组的一分子，固守一般性的程序", "我会花很多时间去研究事和人"] },
  { id: 13, text: "请选择最符合自己的一项：", options: ["我喜欢按自己的方式做事，不在乎别人对我的观感，只要成功", "有人跟我意见不一致时，我会很难过", "我知道做些改变是有必要的，但即使如此，我还是觉得少去冒险好", "我对自己以及他人的期望很高，这些都是为了符合我的高标准"] },
  { id: 14, text: "请选择最符合自己的一项：", options: ["我擅长处理棘手的问题", "我是个很热心的人，喜欢与他人一起工作", "我喜欢听，但不喜欢说话，即使开口讲话都会说得很委婉温和", "处理事情较理智，不把感情牵扯进来，也较少与人闲聊"] },
  { id: 15, text: "请选择最符合自己的一项：", options: ["我喜欢有竞争，有竞争才能把潜能完全发挥出来", "我较感性，与人相处不注重细节", "我是个天生的组员，顺着群众", "对事我喜欢去研究，寻求证据"] },
  { id: 16, text: "请选择最符合自己的一项：", options: ["我喜欢能力与权威，这是我想要的", "我有时候很情绪化，一生气会气过头，置身于有趣事物中，往往无法掌握时间", "我喜欢按部就班，稳扎稳打，喜欢慢慢地做事而不喜欢破釜沉舟", "我很注重事物与人的细节"] },
  { id: 17, text: "请选择最符合自己的一项：", options: ["我喜欢去掌握及支配他人", "在团队中我喜欢打成一片，活活泼泼有气氛，彼此有感情地相处", "我较遵守传统的思想，不喜欢有大的变化", "在没有掌握事实的真相之前，我宁可保持现状"] },
  { id: 18, text: "请选择最符合自己的一项：", options: ["我在与人沟通时，直截了当地说，不喜欢兜圈子", "我喜欢拥抱住他人，相亲相爱", "我不喜欢多变化的环境，喜欢稳定安全的生活方式", "凡事我要求的是准确无误，需要的是高品质、高标准的处事原则"] },
  { id: 19, text: "请选择最符合自己的一项：", options: ["我不喜欢别人逗我开心，不喜欢太多话的人", "我喜欢参加团体活动，因为与多数人一起娱乐会很好地带动氛围", "对事情我没有太多要求与建议，喜欢默默地去做", "我做事要有一套经过计划和设计的标准工作程序，以用来引导工作方向"] },
  { id: 20, text: "请选择最符合自己的一项：", options: ["我讨厌别人告诉我事情应该如何做，因为我自有想法，不喜欢被别人支配", "我是个生气勃勃、外向的人，别人喜欢与我共事，让彼此激起工作热情", "我喜欢独处，与他人生活在一起时会注意到要尽量不去打扰他人的居家生活", "我很少参与到别人的闲聊中，当话题有趣时，我会找更多的话题，小心地进行交谈"] },
];

const TK = ["D", "I", "S", "C"];
const TL = { D: "支配型", I: "影响型", S: "稳定型", C: "服从型" };
const TC = {
  D: { m: "#D95550", l: "#FFF0EF", mid: "#FCDBD9", g: "linear-gradient(135deg,#D95550,#E8736C)" },
  I: { m: "#E89B2D", l: "#FFF8EC", mid: "#FDEBC8", g: "linear-gradient(135deg,#E89B2D,#F5B94E)" },
  S: { m: "#3BA68C", l: "#EDF8F5", mid: "#C8EDE5", g: "linear-gradient(135deg,#3BA68C,#5CC4AA)" },
  C: { m: "#5474B4", l: "#EEF2FB", mid: "#CEDAF5", g: "linear-gradient(135deg,#5474B4,#6B8DD6)" },
};

const typeData = {
  D: {
    title: "支配型 · Dominance", sub: "决策者 · 驱动者",
    kw: ["果断", "直接", "竞争", "结果导向", "行动力"],
    desc: "外向理性型人格。果敢积极、直截了当，喜欢领导而非追随。执行力极强，重视结果与效率，擅长把握时机和创造机会。",
    str: ["天生的领导者与问题解决者", "决策迅速，执行力强", "敢于挑战，抗压能力突出", "善于在混乱中找到方向", "目标导向，推动力十足"],
    risk: ["可能过于强势，标准太高", "缺乏耐心和变通，不善妥协", "容易忽略他人感受和团队情绪", "承担过多责任，易导致过劳", "在压力下可能表现出攻击性"],
    team: "问题解决者、基层组织者、创新型人才",
    env: "不受控制、监督和琐事困扰的环境；具有创新性和挑战性的工作；能够自主决策和表达观点的空间",
    comm: "与 D 型沟通：直接切入重点，用数据和结果说话；给予充分的自主决策权；避免过多铺垫和情感表达",
    manage: "给予挑战性目标和自主空间；以结果为导向进行考核；提供晋升通道和竞争激励；私下沟通问题，避免公开批评",
    stress: "高要求、紧张、具备攻击性、自负",
    emotion: "愤怒",
    pos: ["CEO / 总经理", "项目经理", "创业者", "销售总监", "运营负责人"],
  },
  I: {
    title: "影响型 · Influence", sub: "激励者 · 连接者",
    kw: ["热情", "乐观", "社交", "感染力", "创意"],
    desc: "外向感性型人格。充满热情和乐观态度，擅长交际与协调。通过人际关系推动目标实现，语言富有说服力，善于激励团队。",
    str: ["卓越的沟通者和团队激励者", "创造性地解决问题", "通过人际协商缓解冲突", "充满正能量，感染力强", "善于发现和鼓励他人优势"],
    risk: ["不注重细节，执行力可能不足", "过分乐观，承诺易超出实际能力", "不加区分地信任他人", "多变且容易分散注意力", "情绪化，可能影响决策质量"],
    team: "激励型人才、团队合作者、协调者",
    env: "人际密切、氛围活跃的环境；有自由活动和表达空间；不受控制和琐事困扰；有民主型的监督者",
    comm: "与 I 型沟通：用热情和认同回应；多用鼓励和欣赏的语言；给予社交和表达机会；避免过于冷淡或否定",
    manage: "提供展示才华和社交的平台；用认同感和成就感激励；安排需要协作和创意的任务；配备注重细节的协作伙伴",
    stress: "自我提高、过分乐观、言语过多、不现实",
    emotion: "乐观",
    pos: ["市场营销", "公共关系", "培训讲师", "客户经理", "品牌策划"],
  },
  S: {
    title: "稳定型 · Steadiness", sub: "支持者 · 协作者",
    kw: ["耐心", "可靠", "忠诚", "善解人意", "稳健"],
    desc: "内向感性型人格。友善、亲切，是优秀的倾听者和团队合作者。有耐心和同理心，做事稳健可靠，是组织中不可或缺的稳定力量。",
    str: ["最可靠的团队合作者", "有耐心和同情心的倾听者", "逻辑性思维，服务取向", "忠诚度高，执行力稳定", "善于维护长期合作关系"],
    risk: ["倾向回避争论和冲突", "在确定优先级时容易困难", "不喜欢变化，适应新环境较慢", "不善于表达自己的需求", "可能因过于迁就而失去立场"],
    team: "可靠的团队执行者、服务型人才",
    env: "稳定的、可预测的环境；变化较慢的工作节奏；长期的团队合作关系；人际冲突较少的氛围",
    comm: "与 S 型沟通：耐心倾听，给予充分时间表达；循序渐进地提出变化；提供具体的支持和引导；多给予欣赏和认可",
    manage: "提供稳定的工作环境和明确的流程；给予充足的适应时间和耐心引导；用欣赏和鼓励激发信心；避免突然的大幅度变革",
    stress: "非情绪表露、冷漠、犹豫不决、固执",
    emotion: "平和",
    pos: ["行政管理", "客户服务", "人力资源", "财务会计", "质量管理"],
  },
  C: {
    title: "服从型 · Compliance", sub: "分析者 · 思考者",
    kw: ["严谨", "分析", "高标准", "追求精确", "逻辑"],
    desc: "内向理性型人格。实事求是，逻辑清晰，对质量和细节有极高要求。善于分析和研究，崇尚规则，是团队中的「现实之锚」。",
    str: ["保持高标准，有责任心", "善于获取信息并分析处理", "综合性问题解决者", "客观、冷静的决策参考", "对专业领域有深入钻研"],
    risk: ["受批评时容易采取防御措施", "常陷入细节而忽视全局", "过度追求完美导致效率降低", "可能显得冷漠和疏远", "在压力下容易悲观和焦虑"],
    team: "信息分析者、质量把关者、标准制定者",
    env: "需要批判性思维的专业技术领域；有私人办公空间；注重品质和标准的文化；小团体的亲密合作关系",
    comm: "与 C 型沟通：提供详实的数据和事实依据；给予充足的思考和准备时间；尊重其专业判断；深入而非广泛地讨论",
    manage: "做到比他们还细致才能让其信服；提供专业发展和深入研究机会；用事实和逻辑进行沟通；尊重其对隐私和独立空间的需求",
    stress: "悲观、挑剔、紧张、过分批评",
    emotion: "害怕",
    pos: ["数据分析师", "审计师", "研发工程师", "法务专员", "技术专家"],
  },
};

function RadarSVG({ scores, size = 240 }) {
  const c = size / 2, r = size * 0.36, max = 20;
  const axes = [
    { k: "D", a: -Math.PI / 2 }, { k: "I", a: 0 },
    { k: "S", a: Math.PI / 2 }, { k: "C", a: Math.PI },
  ];
  const pt = (angle, val) => ({ x: c + (r * val / max) * Math.cos(angle), y: c + (r * val / max) * Math.sin(angle) });
  const grids = [0.25, 0.5, 0.75, 1];
  const dp = axes.map(a => pt(a.a, scores[a.k]));
  const path = dp.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {grids.map((lv, i) => {
        const ps = axes.map(a => pt(a.a, max * lv));
        return <path key={i} d={ps.map((p, j) => `${j === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z"} fill="none" stroke="#ddd" strokeWidth="0.8" />;
      })}
      {axes.map((a, i) => { const e = pt(a.a, max); return <line key={i} x1={c} y1={c} x2={e.x} y2={e.y} stroke="#ddd" strokeWidth="0.8" />; })}
      <path d={path} fill="rgba(84,116,180,0.12)" stroke="#5474B4" strokeWidth="2" />
      {dp.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="4" fill={TC[axes[i].k].m} stroke="#fff" strokeWidth="1.5" />)}
      {axes.map((a, i) => {
        const lp = pt(a.a, max + 6);
        return (
          <g key={`l${i}`}>
            <text x={lp.x} y={lp.y - 6} textAnchor="middle" fill={TC[a.k].m} fontSize="11" fontWeight="700">{a.k}</text>
            <text x={lp.x} y={lp.y + 8} textAnchor="middle" fill="#888" fontSize="10">{scores[a.k]}</text>
          </g>
        );
      })}
    </svg>
  );
}

function BarSVG({ scores, width = 320, height = 120 }) {
  const max = 20, barW = 40, gap = (width - barW * 4) / 5;
  return (
    <svg width={width} height={height + 30} viewBox={`0 0 ${width} ${height + 30}`}>
      {TK.map((k, i) => {
        const x = gap + i * (barW + gap), h = (scores[k] / max) * (height - 20), y = height - h;
        return (
          <g key={k}>
            <rect x={x} y={y} width={barW} height={h} rx="4" fill={TC[k].m} opacity="0.85" />
            <text x={x + barW / 2} y={y - 6} textAnchor="middle" fill={TC[k].m} fontSize="12" fontWeight="700">{scores[k]}</text>
            <text x={x + barW / 2} y={height + 16} textAnchor="middle" fill="#666" fontSize="11" fontWeight="600">{k}</text>
          </g>
        );
      })}
    </svg>
  );
}

const printStyles = `
@media print {
  body, html { margin:0 !important; padding:0 !important; background:#fff !important; -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; }
  .no-print { display:none !important; }
  .report-wrap { max-width:100% !important; padding:0 !important; }
  .report-page { box-shadow:none !important; margin:0 !important; border-radius:0 !important; }
  .page-break { page-break-before:always; }
  .report-section { break-inside:avoid; }
}
`;

export default function DISCApp() {
  const [phase, setPhase] = useState("welcome");
  const [cur, setCur] = useState(0);
  const [ans, setAns] = useState({});
  const [fade, setFade] = useState("fi");
  const [sel, setSel] = useState(null);
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [evalDate] = useState(new Date().toLocaleDateString("zh-CN"));

  const scores = { D: 0, I: 0, S: 0, C: 0 };
  Object.values(ans).forEach(v => { if (v === 0) scores.D++; if (v === 1) scores.I++; if (v === 2) scores.S++; if (v === 3) scores.C++; });
  const sorted = [...TK].sort((a, b) => scores[b] - scores[a]);
  const pri = sorted[0], sec = sorted[1];

  const comboLabel = () => {
    const s = scores[pri] + scores[sec];
    if (scores[pri] === scores[sec] && scores[sec] === scores[sorted[2]]) return "平衡型";
    if (s > 16) return "超级组合";
    if (s >= 12) return "典型组合";
    return "偏重组合";
  };

  const go = (idx) => {
    if (sel !== null) return;
    setSel(idx);
    const na = { ...ans, [cur]: idx };
    setAns(na);
    setTimeout(() => {
      if (cur < 19) {
        setFade("fo");
        setTimeout(() => { setCur(cur + 1); setSel(null); setFade("fi"); }, 220);
      } else {
        setFade("fo");
        setTimeout(() => { setPhase("result"); setFade("fi"); }, 280);
      }
    }, 350);
  };

  const back = () => {
    if (cur > 0) {
      setFade("fo");
      setTimeout(() => {
        const na = { ...ans }; delete na[cur - 1]; setAns(na);
        setCur(cur - 1); setSel(null); setFade("fi");
      }, 220);
    }
  };

  const restart = () => {
    setFade("fo");
    setTimeout(() => { setAns({}); setCur(0); setSel(null); setPhase("welcome"); setFade("fi"); }, 280);
  };

  const handlePrint = () => window.print();

  const prog = ((cur + (sel !== null ? 1 : 0)) / 20) * 100;

  const S = {
    wrap: { minHeight: "100vh", background: "linear-gradient(160deg,#f8f6ff 0%,#f0f7ff 40%,#f5faf7 70%,#fef9f3 100%)", fontFamily: "'PingFang SC','Hiragino Sans GB','Microsoft YaHei',system-ui,sans-serif" },
    inner: { maxWidth: 600, margin: "0 auto", padding: "20px 16px 40px" },
  };

  return (
    <div style={S.wrap}>
      <style>{`
        .fi{animation:fin .3s ease forwards}.fo{animation:fout .2s ease forwards}
        @keyframes fin{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fout{from{opacity:1}to{opacity:0;transform:translateY(-6px)}}
        .ob{width:100%;text-align:left;padding:15px 18px;border:1.5px solid #e8e5f0;border-radius:13px;background:#fff;cursor:pointer;font-size:14.5px;line-height:1.55;color:#3a3a4a;transition:all .18s;position:relative}
        .ob:hover{border-color:#c4bdd8;background:#faf8ff;transform:translateX(3px)}
        .ob.on{border-color:#7c6bc4;background:linear-gradient(135deg,#f3f0ff,#ece7ff);color:#4a3a8a;font-weight:500}
        .ol{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:7px;background:#f0edf8;color:#7c6bc4;font-size:11px;font-weight:700;margin-right:10px;flex-shrink:0}
        .ob.on .ol{background:#7c6bc4;color:#fff}
        ${printStyles}
        .rs{background:#fff;border-radius:16px;padding:24px 28px;margin-bottom:14px;box-shadow:0 1px 8px rgba(0,0,0,.04)}
        .rs h3{font-size:15px;font-weight:700;color:#2a2a3a;margin:0 0 12px;padding-bottom:8px;border-bottom:1px solid #f0f0f0}
        .tag{display:inline-block;padding:3px 10px;border-radius:16px;font-size:11.5px;font-weight:600}
        .dot{width:7px;height:7px;border-radius:50%;display:inline-block;margin-right:8px;flex-shrink:0}
        @media(max-width:500px){.rs{padding:18px 16px;border-radius:14px}.ob{padding:13px 14px;font-size:13.5px}}
        @media print{.rs{box-shadow:none;border:1px solid #eee;margin-bottom:10px;padding:18px 22px}}
      `}</style>

      <div style={S.inner} className="report-wrap">

        {/* ===== WELCOME ===== */}
        {phase === "welcome" && (
          <div className={fade} style={{ paddingTop: 50, textAlign: "center" }}>
            <div style={{ width: 72, height: 72, margin: "0 auto 20px", borderRadius: 20, background: "linear-gradient(135deg,#e8e0ff,#d4e8ff,#d4f0e8,#ffe8d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>🎯</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#2a2a3a", margin: "0 0 6px" }}>DISC 人格测评</h1>
            <p style={{ fontSize: 13, color: "#999", margin: "0 0 28px" }}>企业人才评估参考工具</p>

            <div style={{ background: "#fff", borderRadius: 18, padding: 22, textAlign: "left", boxShadow: "0 2px 10px rgba(0,0,0,.04)", marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#666", display: "block", marginBottom: 6 }}>被测评人姓名</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="请输入姓名" style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #e8e5f0", fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 14 }} />
              <label style={{ fontSize: 13, fontWeight: 600, color: "#666", display: "block", marginBottom: 6 }}>部门 / 岗位</label>
              <input value={dept} onChange={e => setDept(e.target.value)} placeholder="请输入部门或岗位" style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #e8e5f0", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
              {TK.map(k => (
                <div key={k} style={{ padding: "12px 14px", borderRadius: 12, background: TC[k].l, borderLeft: `3px solid ${TC[k].m}` }}>
                  <div style={{ fontSize: 17, fontWeight: 800, color: TC[k].m }}>{k}</div>
                  <div style={{ fontSize: 12, color: "#777" }}>{TL[k]}</div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 12, color: "#aaa", marginBottom: 24, lineHeight: 1.7 }}>共 20 题 · 约 5 分钟 · 按第一直觉选择 · 没有对错</p>

            <button onClick={() => { setFade("fo"); setTimeout(() => { setPhase("quiz"); setFade("fi"); }, 280); }}
              style={{ padding: "14px 44px", borderRadius: 14, border: "none", background: "linear-gradient(135deg,#7c6bc4,#6B8DD6)", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 18px rgba(107,141,214,.3)" }}>
              开始测评
            </button>
          </div>
        )}

        {/* ===== QUIZ ===== */}
        {phase === "quiz" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <button onClick={back} disabled={cur === 0} style={{ padding: "5px 10px", borderRadius: 8, border: "1px solid #e0dce8", background: cur === 0 ? "#f5f5f5" : "#fff", color: cur === 0 ? "#ccc" : "#7c6bc4", fontSize: 12, fontWeight: 600, cursor: cur === 0 ? "default" : "pointer" }}>← 上一题</button>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#7c6bc4" }}>{cur + 1}/20</span>
              </div>
              <div style={{ height: 5, borderRadius: 3, background: "#ece7ff", overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 3, background: "linear-gradient(90deg,#7c6bc4,#6B8DD6)", width: `${prog}%`, transition: "width .4s ease" }} />
              </div>
            </div>
            <div className={fade}>
              <div style={{ background: "#fff", borderRadius: 18, padding: "24px 22px", marginBottom: 14, boxShadow: "0 2px 10px rgba(0,0,0,.04)" }}>
                <h2 style={{ fontSize: 15.5, fontWeight: 700, color: "#2a2a3a", margin: "0 0 16px", lineHeight: 1.55 }}>{questions[cur].text}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {questions[cur].options.map((o, i) => (
                    <button key={i} className={`ob ${sel === i ? "on" : ""}`} onClick={() => go(i)}>
                      <div style={{ display: "flex", alignItems: "flex-start" }}>
                        <span className="ol">{String.fromCharCode(65 + i)}</span><span>{o}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                {TK.map(k => (
                  <div key={k} style={{ padding: "4px 12px", borderRadius: 8, background: scores[k] > 0 ? TC[k].l : "#f5f5f5", border: `1px solid ${scores[k] > 0 ? TC[k].mid : "#eee"}`, fontSize: 11, fontWeight: 700, color: scores[k] > 0 ? TC[k].m : "#ccc" }}>{k}:{scores[k]}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== REPORT ===== */}
        {phase === "result" && (
          <div className={fade}>
            {/* Action bar */}
            <div className="no-print" style={{ display: "flex", gap: 10, marginBottom: 16, justifyContent: "flex-end" }}>
              <button onClick={restart} style={{ padding: "8px 18px", borderRadius: 10, border: "1.5px solid #e0dce8", background: "#fff", color: "#7c6bc4", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>重新测评</button>
              <button onClick={handlePrint} style={{ padding: "8px 18px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#7c6bc4,#6B8DD6)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 10px rgba(107,141,214,.25)" }}>🖨 导出 / 打印</button>
            </div>

            {/* ── Page 1: Cover ── */}
            <div className="report-page" style={{ background: "#fff", borderRadius: 18, overflow: "hidden", marginBottom: 16, boxShadow: "0 2px 16px rgba(0,0,0,.06)" }}>
              {/* Header band */}
              <div style={{ background: "linear-gradient(135deg,#4a3a8a,#6B8DD6)", padding: "36px 28px 30px", color: "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, opacity: .7, letterSpacing: 3, marginBottom: 6 }}>DISC PERSONALITY ASSESSMENT</div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>DISC 人格特质测评报告</h1>
                    <p style={{ fontSize: 13, opacity: .8, margin: 0 }}>企业人才评估参考</p>
                  </div>
                  <div style={{ textAlign: "right", fontSize: 12, opacity: .75, lineHeight: 1.8 }}>
                    <div>测评日期：{evalDate}</div>
                    <div>编号：DISC-{Date.now().toString(36).toUpperCase().slice(-6)}</div>
                  </div>
                </div>
              </div>
              {/* Info row */}
              <div style={{ padding: "18px 28px", display: "flex", gap: 24, borderBottom: "1px solid #f0f0f0", flexWrap: "wrap" }}>
                <div><span style={{ fontSize: 12, color: "#999" }}>姓名</span><div style={{ fontSize: 15, fontWeight: 700, color: "#2a2a3a", marginTop: 2 }}>{name || "未填写"}</div></div>
                <div><span style={{ fontSize: 12, color: "#999" }}>部门/岗位</span><div style={{ fontSize: 15, fontWeight: 700, color: "#2a2a3a", marginTop: 2 }}>{dept || "未填写"}</div></div>
                <div><span style={{ fontSize: 12, color: "#999" }}>主导特质</span><div style={{ fontSize: 15, fontWeight: 700, color: TC[pri].m, marginTop: 2 }}>{pri} {TL[pri]}</div></div>
                <div><span style={{ fontSize: 12, color: "#999" }}>组合类型</span><div style={{ fontSize: 15, fontWeight: 700, color: "#2a2a3a", marginTop: 2 }}>{pri}{sec} · {comboLabel()}</div></div>
              </div>
              {/* Primary result */}
              <div style={{ padding: "24px 28px" }}>
                <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
                  <RadarSVG scores={scores} />
                  <BarSVG scores={scores} />
                </div>
                {/* Score table */}
                <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
                  {TK.map(k => {
                    const pct = Math.round((scores[k] / 20) * 100);
                    return (
                      <div key={k} style={{ textAlign: "center", padding: "14px 8px", borderRadius: 12, background: TC[k].l, border: k === pri ? `2px solid ${TC[k].m}` : "2px solid transparent" }}>
                        <div style={{ fontSize: 24, fontWeight: 800, color: TC[k].m }}>{scores[k]}</div>
                        <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{k} · {TL[k]}</div>
                        <div style={{ fontSize: 11, color: "#aaa" }}>{pct}%</div>
                        {k === pri && <div className="tag" style={{ background: TC[k].mid, color: TC[k].m, marginTop: 6 }}>主导</div>}
                        {k === sec && scores[k] > 0 && <div className="tag" style={{ background: "#f0f0f0", color: "#888", marginTop: 6 }}>辅助</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Page 2: Profile ── */}
            <div className="page-break" />

            <div className="rs report-section">
              <h3>一、人格概述</h3>
              <p style={{ fontSize: 14, color: "#444", lineHeight: 1.85, margin: 0 }}>{typeData[pri].desc}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                {typeData[pri].kw.map((w, i) => <span key={i} className="tag" style={{ background: TC[pri].l, color: TC[pri].m }}>{w}</span>)}
              </div>
            </div>

            <div className="rs report-section">
              <h3>二、核心优势</h3>
              {typeData[pri].str.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", marginBottom: i < typeData[pri].str.length - 1 ? 8 : 0 }}>
                  <span className="dot" style={{ background: TC[pri].m, marginTop: 7 }} />
                  <span style={{ fontSize: 13.5, color: "#444", lineHeight: 1.7 }}>{s}</span>
                </div>
              ))}
            </div>

            <div className="rs report-section">
              <h3>三、潜在风险</h3>
              {typeData[pri].risk.map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", marginBottom: i < typeData[pri].risk.length - 1 ? 8 : 0 }}>
                  <span className="dot" style={{ background: "#e0a030", marginTop: 7 }} />
                  <span style={{ fontSize: 13.5, color: "#444", lineHeight: 1.7 }}>{r}</span>
                </div>
              ))}
            </div>

            <div className="rs report-section">
              <h3>四、团队角色定位</h3>
              <p style={{ fontSize: 14, color: "#444", lineHeight: 1.85, margin: 0 }}>{typeData[pri].team}</p>
            </div>

            <div className="rs report-section">
              <h3>五、理想工作环境</h3>
              <p style={{ fontSize: 14, color: "#444", lineHeight: 1.85, margin: 0 }}>{typeData[pri].env}</p>
            </div>

            <div className="page-break" />

            <div className="rs report-section">
              <h3>六、压力行为模式</h3>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 200, padding: "14px 16px", borderRadius: 12, background: "#FFF8EC", borderLeft: "3px solid #E89B2D" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#E89B2D", marginBottom: 4 }}>压力下的行为倾向</div>
                  <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>{typeData[pri].stress}</div>
                </div>
                <div style={{ flex: 1, minWidth: 200, padding: "14px 16px", borderRadius: 12, background: TC[pri].l, borderLeft: `3px solid ${TC[pri].m}` }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: TC[pri].m, marginBottom: 4 }}>核心情绪特征</div>
                  <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>{typeData[pri].emotion}</div>
                </div>
              </div>
            </div>

            <div className="rs report-section">
              <h3>七、沟通策略建议</h3>
              <p style={{ fontSize: 14, color: "#444", lineHeight: 1.85, margin: 0 }}>{typeData[pri].comm}</p>
            </div>

            <div className="rs report-section">
              <h3>八、管理与激励建议</h3>
              <p style={{ fontSize: 14, color: "#444", lineHeight: 1.85, margin: 0 }}>{typeData[pri].manage}</p>
            </div>

            <div className="rs report-section">
              <h3>九、适配岗位参考</h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {typeData[pri].pos.map((p, i) => <span key={i} className="tag" style={{ background: TC[pri].l, color: TC[pri].m, fontSize: 13, padding: "5px 14px" }}>{p}</span>)}
              </div>
            </div>

            {/* ── Page 3: Full Comparison ── */}
            <div className="page-break" />

            <div className="rs report-section">
              <h3>十、四维特质全景对比</h3>
              {sorted.map((k, i) => {
                const pct = Math.round((scores[k] / 20) * 100);
                return (
                  <div key={k} style={{ marginBottom: i < 3 ? 16 : 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                      <span style={{ fontSize: 13.5, fontWeight: 600, color: TC[k].m }}>{k} {TL[k]} {k === pri ? "（主导）" : k === sec ? "（辅助）" : ""}</span>
                      <span style={{ fontSize: 12, color: "#999" }}>{scores[k]} 分 · {pct}%</span>
                    </div>
                    <div style={{ height: 8, borderRadius: 4, background: TC[k].l, overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 4, background: TC[k].g, width: `${pct}%`, transition: "width .8s ease" }} />
                    </div>
                    <p style={{ fontSize: 12, color: "#888", margin: "4px 0 0", lineHeight: 1.6 }}>{typeData[k].desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="rs report-section">
              <h3>十一、组合类型解读</h3>
              <div style={{ padding: "16px 18px", borderRadius: 12, background: "linear-gradient(135deg,#f8f6ff,#f0f7ff)", border: "1px solid #e8e5f0" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#4a3a8a", marginBottom: 8 }}>{pri}{sec} 组合 · {comboLabel()}</div>
                <p style={{ fontSize: 13.5, color: "#555", lineHeight: 1.8, margin: 0 }}>
                  主导特质 <strong style={{ color: TC[pri].m }}>{pri}（{TL[pri]}）</strong>占比 {Math.round((scores[pri] / 20) * 100)}%，
                  辅助特质 <strong style={{ color: TC[sec].m }}>{sec}（{TL[sec]}）</strong>占比 {Math.round((scores[sec] / 20) * 100)}%。
                  {pri === "D" && sec === "I" && "这是典型的外向行动型组合，兼具决策力和感染力，适合带团队冲锋。"}
                  {pri === "D" && sec === "C" && "这是目标与质量并重的组合，既追求效率又注重标准，适合需要高执行力的管理岗位。"}
                  {pri === "D" && sec === "S" && "果断决策的同时保有稳定性，是能带团队稳步推进的务实型领导。"}
                  {pri === "I" && sec === "D" && "热情驱动型组合，善于激励他人并推动行动，是天生的销售和市场人才。"}
                  {pri === "I" && sec === "S" && "兼具社交能力和稳定性，善于维护关系和团队氛围，适合客户关系管理。"}
                  {pri === "I" && sec === "C" && "热情与严谨并存，既能激励团队又关注品质，适合需要平衡创意和规范的角色。"}
                  {pri === "S" && sec === "I" && "稳重又不失亲和力，是团队中最受欢迎的协作者，适合服务导向岗位。"}
                  {pri === "S" && sec === "C" && "稳健且注重细节，是高度可靠的执行者，适合需要精确和持续性的岗位。"}
                  {pri === "S" && sec === "D" && "稳定中具备推动力，能在保持秩序的同时推进目标，适合运营管理。"}
                  {pri === "C" && sec === "S" && "严谨且稳重，追求高质量的同时保持可靠性，适合技术和专业领域。"}
                  {pri === "C" && sec === "D" && "分析力与决断力兼备，善于基于数据做出果断决策，适合战略分析岗位。"}
                  {pri === "C" && sec === "I" && "专业深度与表达能力并存，适合需要对外输出专业内容的角色。"}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="rs report-section" style={{ textAlign: "center", background: "#fafafa" }}>
              <p style={{ fontSize: 11.5, color: "#aaa", margin: 0, lineHeight: 1.8 }}>
                本报告基于 DISC 行为风格理论生成，仅作为人才评估的参考工具之一。<br />
                测评结果反映行为倾向，不代表能力高低或价值判断。建议结合面试、工作表现等多维度综合评估。<br />
                报告生成时间：{evalDate}
              </p>
            </div>

            {/* Bottom actions */}
            <div className="no-print" style={{ textAlign: "center", padding: "20px 0 10px" }}>
              <button onClick={handlePrint} style={{ padding: "13px 36px", borderRadius: 13, border: "none", background: "linear-gradient(135deg,#7c6bc4,#6B8DD6)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(107,141,214,.3)", marginRight: 12 }}>🖨 导出 / 打印报告</button>
              <button onClick={restart} style={{ padding: "13px 28px", borderRadius: 13, border: "1.5px solid #e0dce8", background: "#fff", color: "#7c6bc4", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>重新测评</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
