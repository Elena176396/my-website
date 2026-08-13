import { useState, useEffect, useRef } from "react";

/* ═══════════════════ DATA ═══════════════════ */
const QS = [
  {id:1,s:1,o:[{t:"乐于尝试新挑战",k:"C"},{t:"很能适应变化",k:"P"},{t:"表达生动、有感染力",k:"S"},{t:"喜欢分析和思考",k:"M"}]},
  {id:2,s:1,o:[{t:"做事有耐心、能坚持",k:"M"},{t:"喜欢轻松有趣的氛围",k:"S"},{t:"能把想法讲清楚并说服别人",k:"C"},{t:"情绪比较平稳",k:"P"}]},
  {id:3,s:1,o:[{t:"愿意配合他人",k:"P"},{t:"愿意为重要的人或事多付出",k:"M"},{t:"和人相处比较自然",k:"S"},{t:"认定目标后不容易动摇",k:"C"}]},
  {id:4,s:1,o:[{t:"会留意别人的感受",k:"M"},{t:"能控制自己的情绪和节奏",k:"P"},{t:"有竞争心，喜欢争取更好",k:"C"},{t:"表达有感染力，容易让人认同",k:"S"}]},
  {id:5,s:1,o:[{t:"能带动大家的情绪",k:"S"},{t:"做事让人觉得可靠和值得尊重",k:"M"},{t:"表达比较含蓄内敛",k:"P"},{t:"遇到事情反应很快",k:"C"}]},
  {id:6,s:1,o:[{t:"比较容易知足",k:"P"},{t:"对细节和情绪变化比较敏锐",k:"M"},{t:"习惯靠自己解决问题",k:"C"},{t:"精力充沛，很有活力",k:"S"}]},
  {id:7,s:1,o:[{t:"喜欢提前规划",k:"M"},{t:"做事有耐心",k:"P"},{t:"会主动推进事情",k:"C"},{t:"擅长带动大家行动",k:"S"}]},
  {id:8,s:1,o:[{t:"表达立场很明确",k:"C"},{t:"比较自在，不太拘束",k:"S"},{t:"喜欢按步骤把事情做好",k:"M"},{t:"在陌生场合会比较慢热",k:"P"}]},
  {id:9,s:1,o:[{t:"做事有条理",k:"M"},{t:"愿意照顾和配合别人",k:"P"},{t:"说话比较直接坦诚",k:"C"},{t:"往往会看到事情积极的一面",k:"S"}]},
  {id:10,s:1,o:[{t:"待人友好",k:"P"},{t:"对人和承诺比较忠诚",k:"M"},{t:"相处起来轻松有趣",k:"S"},{t:"很有主见，喜欢把事情推进到底",k:"C"}]},
  {id:11,s:1,o:[{t:"面对挑战比较有勇气",k:"C"},{t:"亲切讨喜",k:"S"},{t:"很会照顾关系和分寸",k:"P"},{t:"会认真留意细节",k:"M"}]},
  {id:12,s:1,o:[{t:"容易给人带来好心情",k:"S"},{t:"答应的事会尽量做到底",k:"P"},{t:"重视知识和修养",k:"M"},{t:"对自己的判断比较有信心",k:"C"}]},
  {id:13,s:1,o:[{t:"对事情有自己的理想和标准",k:"M"},{t:"喜欢独立思考和做决定",k:"C"},{t:"不喜欢咄咄逼人",k:"P"},{t:"很会鼓励和带动别人",k:"S"}]},
  {id:14,s:1,o:[{t:"情绪和感受比较容易表达出来",k:"S"},{t:"需要决定时比较果断",k:"C"},{t:"说话幽默，有时带点犀利",k:"P"},{t:"想得比较深，也不轻易表露",k:"M"}]},
  {id:15,s:1,o:[{t:"遇到分歧时愿意从中协调",k:"P"},{t:"对音乐或艺术比较有感觉",k:"M"},{t:"常常是先行动、先发起的人",k:"C"},{t:"喜欢认识和结交新朋友",k:"S"}]},
  {id:16,s:1,o:[{t:"做决定前会考虑得比较周全",k:"M"},{t:"认定的事会坚持",k:"C"},{t:"比较健谈",k:"S"},{t:"对不同的人和做法比较包容",k:"P"}]},
  {id:17,s:1,o:[{t:"愿意耐心听别人说",k:"P"},{t:"对重要的人和关系很忠诚",k:"M"},{t:"自然会承担带头角色",k:"C"},{t:"精力旺盛，容易带动气氛",k:"S"}]},
  {id:18,s:1,o:[{t:"比较容易对现状感到满足",k:"P"},{t:"在团队里常会自然地带头",k:"C"},{t:"擅长把事情梳理成清楚的计划",k:"M"},{t:"容易让人觉得亲切、喜欢",k:"S"}]},
  {id:19,s:1,o:[{t:"对自己和事情的完成度要求较高",k:"M"},{t:"待人温和，不爱起冲突",k:"P"},{t:"愿意投入时间和精力把事做好",k:"C"},{t:"在人群中通常比较受欢迎",k:"S"}]},
  {id:20,s:1,o:[{t:"思维灵活，点子来得快",k:"S"},{t:"面对压力和挑战不容易退缩",k:"C"},{t:"喜欢有标准、有规则地做事",k:"M"},{t:"做事比较稳，能保持平衡",k:"P"}]},
  {id:21,s:0,o:[{t:"有时显得比较安静，不太会制造气氛",k:"P"},{t:"有时会因为顾虑较多而显得拘谨",k:"M"},{t:"说话有时会太直白",k:"S"},{t:"有时会太想按自己的方式推进",k:"C"}]},
  {id:22,s:0,o:[{t:"有时节奏比较随性，容易忽略安排",k:"S"},{t:"忙着解决问题时，可能顾不上别人的感受",k:"C"},{t:"有时不太容易表现出热情",k:"P"},{t:"受伤后可能需要较长时间才能放下",k:"M"}]},
  {id:23,s:0,o:[{t:"有时会把很多想法留在心里",k:"P"},{t:"对不愉快的事有时不容易释怀",k:"M"},{t:"被要求或限制时容易本能地反抗",k:"C"},{t:"关心一件事时可能会反复提醒",k:"S"}]},
  {id:24,s:0,o:[{t:"对细节和标准要求较高，容易看到不足",k:"M"},{t:"面对不确定时会比较谨慎",k:"P"},{t:"忙起来时偶尔会忘记一些细节",k:"S"},{t:"有时太直率，容易忽略表达方式",k:"C"}]},
  {id:25,s:0,o:[{t:"事情推进慢时容易着急",k:"C"},{t:"面对不确定时容易缺少安全感",k:"M"},{t:"需要快速选择时会犹豫久一点",k:"P"},{t:"想到事情时容易忍不住马上接话",k:"S"}]},
  {id:26,s:0,o:[{t:"有时给人距离感，不容易马上亲近",k:"M"},{t:"更喜欢独处或小范围相处",k:"P"},{t:"想法和节奏变化较快，让人不太容易预判",k:"S"},{t:"有想法时不一定能马上表达清楚",k:"C"}]},
  {id:27,s:0,o:[{t:"认定一件事后不太容易改变主意",k:"C"},{t:"更喜欢随机应变，有时准备不够充分",k:"S"},{t:"对人和事的标准比较高",k:"M"},{t:"做决定前会反复考虑",k:"P"}]},
  {id:28,s:0,o:[{t:"表现比较平稳，不太主动制造变化",k:"P"},{t:"容易先想到风险和不顺利的可能",k:"M"},{t:"对自己的判断有时会过于有把握",k:"C"},{t:"有时比较随性，不太想管太多",k:"S"}]},
  {id:29,s:0,o:[{t:"情绪上来时反应会比较明显",k:"S"},{t:"有时会随遇而安，目标感不太强",k:"P"},{t:"意见不同时容易进入争辩模式",k:"C"},{t:"有时更愿意自己待着",k:"M"}]},
  {id:30,s:0,o:[{t:"兴奋时偶尔会显得有点孩子气",k:"S"},{t:"状态不好时容易先看到困难",k:"M"},{t:"行动很快时偶尔会考虑不够周全",k:"C"},{t:"不熟悉时可能显得比较冷淡",k:"P"}]},
  {id:31,s:0,o:[{t:"容易为还没发生的事情提前担心",k:"P"},{t:"在陌生社交场合会比较慢热",k:"M"},{t:"一投入工作就容易忘了休息",k:"C"},{t:"比较在意别人怎么看自己",k:"S"}]},
  {id:32,s:0,o:[{t:"对评价和气氛变化比较敏感",k:"M"},{t:"说话做事比较直接，不太擅长圆场",k:"C"},{t:"遇到压力时容易先退一步",k:"P"},{t:"兴奋时可能会说得比较多",k:"S"}]},
  {id:33,s:0,o:[{t:"面对不确定时容易多想、反复确认",k:"P"},{t:"忙起来时生活节奏容易变乱",k:"S"},{t:"有时会不自觉地强势主导",k:"C"},{t:"情绪低落时容易沉在自己的想法里",k:"M"}]},
  {id:34,s:0,o:[{t:"兴趣或想法有时变化比较快",k:"S"},{t:"更习惯安静独处，不太主动表达",k:"M"},{t:"对不认同的观点有时比较难接纳",k:"C"},{t:"为了避免冲突，有时不太表达不同意见",k:"P"}]},
  {id:35,s:0,o:[{t:"忙起来时容易缺少条理",k:"S"},{t:"情绪变化时会比较影响状态",k:"M"},{t:"想法很多时，有时不容易说得很清楚",k:"P"},{t:"有时会希望别人按照自己的思路行动",k:"C"}]},
  {id:36,s:0,o:[{t:"做事更重稳妥，速度可能偏慢",k:"P"},{t:"对认定的方式不太容易调整",k:"C"},{t:"有机会时会很想展示自己",k:"S"},{t:"做决定前容易反复验证和确认",k:"M"}]},
  {id:37,s:0,o:[{t:"需要很多独处空间，不太主动融入",k:"M"},{t:"很自然地想掌握主导权",k:"C"},{t:"缺少动力时容易拖着不开始",k:"P"},{t:"情绪高涨时说话声音会比较大",k:"S"}]},
  {id:38,s:0,o:[{t:"遇到不想做的事容易往后放",k:"P"},{t:"不够确定时容易反复确认",k:"M"},{t:"压力大时容易变得急躁",k:"C"},{t:"兴趣被分散时容易跳到别的事情",k:"S"}]},
  {id:39,s:0,o:[{t:"被冒犯后有时很难马上放下",k:"S"},{t:"等待或受阻时容易烦躁",k:"C"},{t:"不太认同的事也可能先配合着做",k:"M"},{t:"有时会为了省事很快做决定",k:"P"}]},
  {id:40,s:0,o:[{t:"为了维持关系，有时会让步太多",k:"P"},{t:"很容易看见问题并直接指出",k:"M"},{t:"为达到目标有时会比较讲策略",k:"C"},{t:"兴趣和决定有时变化较快",k:"S"}]},
];

const TM = {
  C:{name:"力量型",en:"Choleric",sub:"胆汁质",humor:"黄胆汁",
    c:"#7B5EA7",g:"linear-gradient(135deg,#7B5EA7,#9B7EC8)",bg:"rgba(123,94,167,.07)",
    icon:"🔥",motto:"为目标而活",phrase:"绝对！100%！我告诉你的！",
    kw:["行动力强","意志坚定","天生领导者","不达目的不罢休"],
    str:["冒险性、说服力强","竞争性强，越挫越坚","意志坚强，复杂环境中迅速找到解决方法","自立、果断、独立","直言不讳，天生的行动者和领导者"],
    wk:["死不认错，做错事后容易原谅自己","不易看到别人的需求","强迫性工作狂，给周围人压力太大","控制欲强、专横","人际关系紧张"],
    grow:["减轻对别人的压力，学会放松","尝试接受别人的意见，学习耐心和低调","学习包容，学会道歉和坦然接受错误","当你学会承认错误，便真正成功了"],
    suit:"适合需要决策力、抗压力强的岗位。如项目负责人、创业团队核心、销售管理者。",
    team:"配合完美型(M)做执行规划，配合和平型(P)缓冲团队关系。",
    risk:"需关注其管理风格对团队士气的影响，避免过度强势导致人才流失。"
  },
  S:{name:"活泼型",en:"Sanguine",sub:"多血质",humor:"血液",
    c:"#5B8DB8",g:"linear-gradient(135deg,#5B8DB8,#7BAFD4)",bg:"rgba(91,141,184,.07)",
    icon:"☀️",motto:"快乐",phrase:"太好了！我太高兴了！",
    kw:["热情洋溢","注意力中心","精力充沛","好奇心强"],
    str:["生动活泼，讲故事专家","开朗、热情，天生社交者","朝气蓬勃、敏锐","朋友多，感染力强","决策来自情感，行动力强"],
    wk:["灵乱、无章法","多变，缺乏毅力，表面工作","自我中心主义","记忆力不好，经常迟到","爱好多却不精，轻许诺"],
    grow:["管住自己的嘴","控制表现欲望","对自己的评价不要过高","不要太善变，要脚踏实地做完一件事"],
    suit:"适合需要社交表达、创意激发的岗位。如市场营销、培训讲师、公关活动策划。",
    team:"配合力量型(C)提供方向聚焦，配合完美型(M)做细节把控。",
    risk:"需关注其承诺的落实程度，建议给予明确的deadline与阶段性检查点。"
  },
  M:{name:"完美型",en:"Melancholic",sub:"抑郁质",humor:"黑胆汁",
    c:"#706888",g:"linear-gradient(135deg,#706888,#8E85A6)",bg:"rgba(112,104,136,.07)",
    icon:"🌙",motto:"奉献",phrase:"万一不行……我就知道做不成……",
    kw:["深思熟虑","追求完美","艺术天分","情感丰富"],
    str:["分析性强，甘心牺牲，很有天分","持久忠诚，重承诺","敏感，注重细节","计划性强，井井有条","深沉，易受感动，理想主义"],
    wk:["矛盾体：自信+自卑，自负+自贬","总是从负面看问题","优柔寡断、易拖延","标准太高，好面子","易受环境影响，情绪化"],
    grow:["要快乐起来——没人喜欢郁闷的人","不要太容易受伤害，不要太敏感","不要把时间都用来规划而不去行动","放松下来，去发现别人的优点"],
    suit:"适合需要精确分析、标准制定的岗位。如质量管理、数据分析、财务审计、研发。",
    team:"配合活泼型(S)提升沟通活力，配合力量型(C)加速决策执行。",
    risk:"需关注其在高压环境下的情绪波动，建议给予充分的准备时间与独立空间。"
  },
  P:{name:"和平型",en:"Phlegmatic",sub:"粘液质",humor:"粘液",
    c:"#5A8A7A",g:"linear-gradient(135deg,#5A8A7A,#7AB0A0)",bg:"rgba(90,138,122,.07)",
    icon:"🌿",motto:"平淡而自在的生活",phrase:"随便",
    kw:["易相处","耐心","适应力强","好的聆听者"],
    str:["包容性、适应性极强","平和、旁观者视角","不会缺少朋友","记忆力强，优秀的模仿者","心地善良，有同情心"],
    wk:["拒绝改变，喜欢一成不变","惰性强，目标感不强","不轻易拒绝别人","不愿承担责任，回避压力","不善于做决定"],
    grow:["给自己尝试新鲜的事物和思想","明确生活的责任，不要得过且过","有意识接受督促","多表达，多沟通"],
    suit:"适合需要耐心协调、稳定执行的岗位。如行政支持、客服、人事事务、运营维护。",
    team:"配合力量型(C)获得方向驱动，配合活泼型(S)提升团队氛围。",
    risk:"需关注其主动性不足的问题，建议设定明确的目标和反馈机制激发积极性。"
  },
};

const COMBOS={
  CM:{l:"互补型",d:"力量与完美的结合——既有目标驱动力又有执行标准。外在果断，内在严谨。"},
  MC:{l:"互补型",d:"完美与力量的结合——先思考再行动，但行动时雷厉风行。"},
  SP:{l:"互补型",d:"活泼与和平的结合——热情中带着温和，社交达人但不咄咄逼人。"},
  PS:{l:"互补型",d:"和平与活泼的结合——温和中带着热情，内心柔软但外在活跃。"},
  CS:{l:"外向型",d:"力量与活泼的外向组合——行动力强又有感染力，容易成为领袖。"},
  SC:{l:"外向型",d:"活泼与力量的外向组合——热情洋溢且目标明确，天生的推动者。"},
  MP:{l:"内向型",d:"完美与和平的内向组合——深思熟虑且平和，内心世界丰富。"},
  PM:{l:"内向型",d:"和平与完美的内向组合——温和且有标准，安静但有原则。"},
  MS:{l:"情感矛盾型",d:"完美与活泼——内心深沉却外在活跃。两种情感力量在拉扯。"},
  SM:{l:"情感矛盾型",d:"活泼与完美——外在热情却内心严苛。既有感染力又有深度。"},
  CP:{l:"行为矛盾型",d:"力量与和平——有时强势有时退让。行动模式在主导与包容之间切换。"},
  PC:{l:"行为矛盾型",d:"和平与力量——看起来温和，但关键时刻爆发力惊人。"},
};

function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}

/* ═══ STYLES ═══ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{
    background:linear-gradient(160deg,#EEEDF2 0%,#E8E6EE 40%,#E6E9EE 100%);
    font-family:'Inter',system-ui,-apple-system,sans-serif;
    color:#2D2B33;-webkit-font-smoothing:antialiased;
  }
  .glass{
    background:rgba(255,255,255,.55);
    backdrop-filter:blur(24px) saturate(1.4);
    -webkit-backdrop-filter:blur(24px) saturate(1.4);
    border:1px solid rgba(255,255,255,.6);
    box-shadow:0 2px 16px rgba(100,90,120,.06);
  }
  .opt-btn{
    position:relative;display:flex;align-items:center;gap:14px;
    width:100%;padding:16px 18px;border-radius:14px;cursor:pointer;
    background:rgba(255,255,255,.5);
    backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
    border:1.5px solid rgba(255,255,255,.6);
    font-size:15px;font-weight:500;color:#2D2B33;text-align:left;
    transition:all .2s cubic-bezier(.4,0,.2,1);
    box-shadow:0 1px 8px rgba(100,90,120,.04);
  }
  .opt-btn:hover{border-color:rgba(112,104,136,.25);transform:translateY(-1px);box-shadow:0 4px 16px rgba(100,90,120,.1);}
  .opt-btn:active{transform:scale(.98);}
  .opt-btn.sel{border-color:transparent;color:#fff;box-shadow:0 4px 20px rgba(100,90,120,.18);transform:scale(1.02);backdrop-filter:none;-webkit-backdrop-filter:none;}
  .opt-btn.sel .idx{background:rgba(255,255,255,.25);color:#fff;border-color:transparent;}
  .idx{
    width:30px;height:30px;border-radius:9px;display:flex;align-items:center;justify-content:center;
    font-size:12px;font-weight:700;flex-shrink:0;
    border:1.5px solid rgba(112,104,136,.15);color:#9C96A8;
    transition:all .2s;background:rgba(255,255,255,.4);
  }
  .fade{animation:fadeUp .3s ease;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}

  /* ═══ REPORT PRINT ═══ */
  @media print {
    body{background:#fff!important;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    .no-print{display:none!important;}
    .report{box-shadow:none!important;border:none!important;max-width:100%!important;padding:0!important;}
    .report-page{page-break-after:always;page-break-inside:avoid;padding:40px 48px!important;border:none!important;box-shadow:none!important;border-radius:0!important;margin-bottom:0!important;background:#fff!important;}
    .report-page:last-child{page-break-after:auto;}
    .radar-wrap{page-break-inside:avoid;}
  }

  /* ═══ REPORT SCREEN ═══ */
  .report{max-width:800px;margin:0 auto;padding:20px;}
  .report-page{
    background:#fff;border-radius:12px;padding:48px 52px;margin-bottom:16px;
    box-shadow:0 2px 20px rgba(100,90,120,.07);border:1px solid rgba(112,104,136,.06);
    position:relative;overflow:hidden;
  }
  .rp-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:32px;}
  .rp-line{height:3px;border-radius:99px;margin-bottom:24px;}
  .rp-section{margin-bottom:24px;}
  .rp-section-title{
    font-size:14px;font-weight:800;color:#2D2B33;margin-bottom:12px;
    padding-bottom:6px;border-bottom:1.5px solid rgba(112,104,136,.1);
    display:flex;align-items:center;gap:8px;letter-spacing:.5px;
  }
  .rp-label{font-size:11px;font-weight:700;color:#9C96A8;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px;}
  .rp-kv{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(112,104,136,.05);font-size:13px;}
  .rp-kv-k{color:#6B667A;font-weight:500;} .rp-kv-v{color:#2D2B33;font-weight:700;}
  .rp-item{font-size:13px;color:#4A4656;line-height:1.8;padding:4px 0 4px 14px;border-left:2px solid rgba(112,104,136,.12);margin-bottom:4px;}
  .rp-tag{display:inline-block;padding:4px 12px;border-radius:99px;font-size:12px;font-weight:600;margin:0 6px 6px 0;}
  .rp-score-bar{display:flex;align-items:center;gap:12px;margin-bottom:8px;}
  .rp-score-track{flex:1;height:8px;border-radius:99px;background:rgba(112,104,136,.06);overflow:hidden;}
  .rp-score-fill{height:100%;border-radius:99px;}
`;

/* ═══ RADAR CHART ═══ */
function Radar({scores,total}){
  const keys=["C","S","P","M"];
  const labels=[TM.C.name,TM.S.name,TM.P.name,TM.M.name];
  const colors=[TM.C.c,TM.S.c,TM.P.c,TM.M.c];
  const cx=150,cy=150,R=110;
  const angles=keys.map((_,i)=>(-Math.PI/2)+(2*Math.PI*i/4));
  const toXY=(angle,r)=>[cx+r*Math.cos(angle),cy+r*Math.sin(angle)];

  const gridLevels=[0.25,0.5,0.75,1];
  const values=keys.map(k=>(scores[k]||0)/total);
  const pts=values.map((v,i)=>toXY(angles[i],v*R));
  const polyStr=pts.map(p=>p.join(",")).join(" ");

  return(
    <svg viewBox="0 0 300 300" style={{width:"100%",maxWidth:280,margin:"0 auto",display:"block"}}>
      {gridLevels.map(lv=>(
        <polygon key={lv} points={angles.map(a=>toXY(a,R*lv).join(",")).join(" ")}
          fill="none" stroke="rgba(112,104,136,.1)" strokeWidth={lv===1?1.5:0.8}/>
      ))}
      {angles.map((a,i)=>{
        const [x2,y2]=toXY(a,R);
        return <line key={i} x1={cx} y1={cy} x2={x2} y2={y2} stroke="rgba(112,104,136,.08)" strokeWidth={1}/>;
      })}
      <polygon points={polyStr} fill="rgba(112,104,136,.1)" stroke="#706888" strokeWidth={2}/>
      {pts.map((p,i)=><circle key={i} cx={p[0]} cy={p[1]} r={5} fill={colors[i]} stroke="#fff" strokeWidth={2}/>)}
      {angles.map((a,i)=>{
        const [x,y]=toXY(a,R+22);
        return(
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
            fontSize="12" fontWeight="700" fill={colors[i]}>
            {labels[i]} {scores[keys[i]]}
          </text>
        );
      })}
    </svg>
  );
}

/* ═══ SCREENS ═══ */
function Start({go}){
  return(
    <div className="fade" style={{textAlign:"center",padding:"48px 24px 40px"}}>
      <div style={{width:72,height:72,borderRadius:20,margin:"0 auto 20px",
        background:"linear-gradient(135deg,#6e7488,#706888)",
        display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:32,boxShadow:"0 6px 24px rgba(110,116,136,.2)"}}>🏛️</div>
      <h1 style={{fontSize:28,fontWeight:800,color:"#2D2B33",letterSpacing:"-0.5px"}}>CMSP-希波克拉底性格测试</h1>
      <p style={{fontSize:12,color:"#9C96A8",letterSpacing:"3px",margin:"4px 0 24px",fontWeight:600}}>古希腊体液学说 · 性格测试</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,maxWidth:300,margin:"0 auto 28px"}}>
        {["C","S","M","P"].map(k=>{const m=TM[k];return(
          <div key={k} className="glass" style={{borderRadius:14,padding:"14px 12px",textAlign:"center"}}>
            <div style={{fontSize:22,marginBottom:4}}>{m.icon}</div>
            <div style={{fontSize:14,fontWeight:700,color:m.c}}>{m.name}</div>
            <div style={{fontSize:10,color:"#9C96A8",marginTop:2}}>{m.humor}</div>
          </div>
        );})}
      </div>
      <div className="glass" style={{borderRadius:14,padding:"16px 18px",maxWidth:340,margin:"0 auto 28px",textAlign:"left",fontSize:13,color:"#6B667A",lineHeight:1.8}}>
        <div style={{fontWeight:700,marginBottom:4,color:"#2D2B33",fontSize:13}}>测试说明</div>
        共 40 题，每题选最适合的 1 个词。前 20 题描述优点，后 20 题描述缺点。
        <div style={{marginTop:8,fontSize:11,color:"#9C96A8",display:"flex",gap:14}}>
          <span>⏱ 约 5 分钟</span><span>🎯 性格无好坏</span>
        </div>
      </div>
      <button onClick={go} style={{background:"linear-gradient(135deg,#6e7488,#706888)",color:"#fff",
        border:"none",borderRadius:99,padding:"14px 52px",fontSize:15,fontWeight:700,cursor:"pointer",
        boxShadow:"0 4px 20px rgba(110,116,136,.25)"}}>开始测试</button>
    </div>
  );
}

function Question({q,idx,total,ans,onAns,onPrev,onNext}){
  const secC=q.s===1?"#5A8A7A":"#7B5EA7";
  const secL=q.s===1?"优点":"缺点";
  const pct=((idx+1)/total)*100;
  const isLast=idx===total-1;
  const shRef=useRef(null);const pidRef=useRef(null);
  if(pidRef.current!==q.id){shRef.current=shuffle(q.o);pidRef.current=q.id;}
  const opts=shRef.current;
  const tmr=useRef(null);
  useEffect(()=>()=>clearTimeout(tmr.current),[]);
  const pick=(t,k)=>{clearTimeout(tmr.current);onAns(t,k);if(!isLast)tmr.current=setTimeout(()=>onNext(),320);};

  return(
    <div className="fade" style={{padding:"20px 20px 32px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
        <span style={{fontSize:11,fontWeight:700,color:secC,background:secC+"14",padding:"3px 10px",borderRadius:99,letterSpacing:"1px"}}>{secL}</span>
        <span style={{fontSize:13,color:"#9C96A8",fontWeight:600}}><span style={{color:"#2D2B33",fontWeight:800,fontSize:15}}>{idx+1}</span> / {total}</span>
      </div>
      <div style={{height:4,borderRadius:99,background:"rgba(112,104,136,.1)",marginBottom:28,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${secC},${secC}aa)`,borderRadius:99,transition:"width .4s cubic-bezier(.4,0,.2,1)"}}/>
      </div>
      <div style={{marginBottom:24}}>
        <div style={{fontSize:11,color:"#9C96A8",fontWeight:600,letterSpacing:"2px",marginBottom:6}}>Q{String(q.id).padStart(2,"0")}</div>
        <div style={{fontSize:17,fontWeight:700,color:"#2D2B33"}}>选择最符合你的一个词</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:28}}>
        {opts.map((o,i)=>{const sel=ans===o.t;return(
          <button key={o.t} className={`opt-btn${sel?" sel":""}`}
            style={sel?{background:TM[o.k].g}:{}} onClick={()=>pick(o.t,o.k)}>
            <span className="idx">{sel?"✓":String.fromCharCode(65+i)}</span>
            <span style={{fontWeight:sel?700:500}}>{o.t}</span>
          </button>
        );})}
      </div>
      <div style={{display:"flex",gap:8}}>
        {idx>0&&<button onClick={onPrev} style={{flex:1,padding:"12px 0",borderRadius:12,
          border:"1.5px solid rgba(112,104,136,.12)",background:"rgba(255,255,255,.4)",
          color:"#6B667A",fontSize:13,fontWeight:600,cursor:"pointer"}}>← 上一题</button>}
        {isLast&&<button onClick={onNext} disabled={!ans} style={{flex:2,padding:"12px 0",borderRadius:12,border:"none",
          background:ans?"linear-gradient(135deg,#6e7488,#706888)":"rgba(112,104,136,.1)",
          color:ans?"#fff":"#9C96A8",fontSize:14,fontWeight:700,cursor:ans?"pointer":"default"}}>查看结果 →</button>}
      </div>
    </div>
  );
}

/* ═══ INFO FORM ═══ */
function InfoForm({onSubmit}){
  const [name,setName]=useState("");
  const [dept,setDept]=useState("");
  const [pos,setPos]=useState("");
  const today=new Date().toLocaleDateString("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit"});
  const inp={width:"100%",padding:"10px 14px",borderRadius:10,border:"1.5px solid rgba(112,104,136,.15)",
    background:"rgba(255,255,255,.5)",fontSize:14,color:"#2D2B33",outline:"none"};
  return(
    <div className="fade" style={{padding:"32px 24px",maxWidth:400,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontSize:36,marginBottom:8}}>📋</div>
        <h2 style={{fontSize:20,fontWeight:800,color:"#2D2B33"}}>生成测评报告</h2>
        <p style={{fontSize:13,color:"#9C96A8",marginTop:4}}>填写基本信息，将生成可打印的专业报告</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:24}}>
        <div>
          <label style={{fontSize:12,fontWeight:600,color:"#6B667A",marginBottom:4,display:"block"}}>姓名 *</label>
          <input style={inp} value={name} onChange={e=>setName(e.target.value)} placeholder="受测人姓名"/>
        </div>
        <div>
          <label style={{fontSize:12,fontWeight:600,color:"#6B667A",marginBottom:4,display:"block"}}>部门</label>
          <input style={inp} value={dept} onChange={e=>setDept(e.target.value)} placeholder="可选"/>
        </div>
        <div>
          <label style={{fontSize:12,fontWeight:600,color:"#6B667A",marginBottom:4,display:"block"}}>应聘/在职岗位</label>
          <input style={inp} value={pos} onChange={e=>setPos(e.target.value)} placeholder="可选"/>
        </div>
      </div>
      <button onClick={()=>onSubmit({name:name||"未填写",dept,pos,date:today})} disabled={!name.trim()}
        style={{width:"100%",padding:"14px",borderRadius:99,border:"none",
          background:name.trim()?"linear-gradient(135deg,#6e7488,#706888)":"rgba(112,104,136,.15)",
          color:name.trim()?"#fff":"#9C96A8",fontSize:15,fontWeight:700,cursor:name.trim()?"pointer":"default",
          boxShadow:name.trim()?"0 4px 16px rgba(110,116,136,.2)":"none"}}>生成报告</button>
    </div>
  );
}

/* ═══ REPORT ═══ */
function Report({scores,answers,info,onRestart}){
  const total=Object.values(scores).reduce((a,b)=>a+b,0);
  const sorted=Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  const [pk]=sorted[0];const [sk]=sorted[1];
  const pm=TM[pk],sm=TM[sk];
  const combo=COMBOS[pk+sk];

  const strS={C:0,S:0,M:0,P:0},wkS={C:0,S:0,M:0,P:0};
  answers.forEach(a=>{const q=QS.find(q=>q.id===a.qId);if(q.s===1)strS[a.k]++;else wkS[a.k]++;});

  const doPrint=()=>window.print();

  const Watermark=({text})=>(
    <div style={{position:"absolute",top:16,right:20,fontSize:10,fontWeight:600,color:"rgba(112,104,136,.15)",letterSpacing:"1px"}}>{text}</div>
  );

  return(
    <div className="report fade">
      {/* Action bar */}
      <div className="no-print" style={{display:"flex",gap:8,marginBottom:16,justifyContent:"flex-end",flexWrap:"wrap"}}>
        <button onClick={onRestart} style={{padding:"10px 20px",borderRadius:10,border:"1.5px solid rgba(112,104,136,.15)",
          background:"rgba(255,255,255,.6)",color:"#6B667A",fontSize:13,fontWeight:600,cursor:"pointer"}}>重新测试</button>
        <button onClick={doPrint} style={{padding:"10px 24px",borderRadius:10,border:"none",
          background:"linear-gradient(135deg,#6e7488,#706888)",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",
          boxShadow:"0 2px 12px rgba(110,116,136,.2)"}}>📄 导出 / 打印</button>
      </div>

      {/* PAGE 1: Cover + Overview */}
      <div className="report-page">
        <Watermark text="CMSP Assessment"/>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontSize:11,fontWeight:700,color:"#9C96A8",letterSpacing:"3px",marginBottom:8}}>PERSONALITY ASSESSMENT</div>
          <div className="rp-line" style={{background:pm.g,maxWidth:80,margin:"0 auto 16px"}}/>
          <h1 style={{fontSize:28,fontWeight:800,color:"#2D2B33",letterSpacing:"-0.5px",marginBottom:4}}>CMSP 性格测评报告</h1>
          <p style={{fontSize:13,color:"#9C96A8"}}>基于古希腊希波克拉底体液学说 · 四型人格理论</p>
        </div>

        {/* Info */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,marginBottom:32,
          border:"1px solid rgba(112,104,136,.1)",borderRadius:10,overflow:"hidden"}}>
          {[["受测人",info.name],["测评日期",info.date],["部门",info.dept||"—"],["岗位",info.pos||"—"]].map(([k,v],i)=>(
            <div key={k} style={{padding:"10px 16px",borderBottom:i<2?"1px solid rgba(112,104,136,.06)":"none",
              borderRight:i%2===0?"1px solid rgba(112,104,136,.06)":"none"}}>
              <div style={{fontSize:10,fontWeight:700,color:"#9C96A8",letterSpacing:"1px",marginBottom:2}}>{k}</div>
              <div style={{fontSize:14,fontWeight:700,color:"#2D2B33"}}>{v}</div>
            </div>
          ))}
        </div>

        {/* Result summary */}
        <div style={{display:"flex",gap:20,alignItems:"center",padding:"20px 24px",borderRadius:14,background:pm.bg,marginBottom:28}}>
          <div style={{fontSize:48}}>{pm.icon}</div>
          <div>
            <div style={{fontSize:22,fontWeight:800,color:pm.c}}>{pm.name}<span style={{fontWeight:500,fontSize:14,color:"#9C96A8",marginLeft:8}}>{pm.en}</span></div>
            <div style={{fontSize:13,color:"#6B667A",marginTop:2}}>副型: {sm.icon} {sm.name}（{sm.en}）· 组合类型: {combo?.l||"—"}</div>
            <div style={{display:"flex",gap:6,marginTop:8}}>
              {sorted.map(([t,s])=>(
                <span key={t} style={{background:TM[t].c,color:"#fff",borderRadius:6,padding:"3px 10px",fontSize:12,fontWeight:700}}>{s}{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Radar */}
        <div className="rp-section radar-wrap">
          <div className="rp-section-title"><span style={{color:pm.c}}>◆</span> 四维得分分布</div>
          <Radar scores={scores} total={20}/>
        </div>

        {/* Score detail */}
        <div className="rp-section">
          <div className="rp-section-title"><span style={{color:pm.c}}>◆</span> 得分明细</div>
          {sorted.map(([type,score])=>{
            const m=TM[type];const pct=Math.round((score/total)*100);
            return(
              <div key={type} className="rp-score-bar">
                <span style={{fontSize:12,fontWeight:700,color:m.c,width:70,flexShrink:0}}>{m.icon} {type} {m.name}</span>
                <div className="rp-score-track"><div className="rp-score-fill" style={{width:`${pct}%`,background:m.g}}/></div>
                <span style={{fontSize:12,fontWeight:800,color:m.c,width:50,textAlign:"right",flexShrink:0}}>{score}/{total}</span>
              </div>
            );
          })}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginTop:16}}>
            {[{l:"优点维度",d:strS,co:"#5A8A7A"},{l:"缺点维度",d:wkS,co:"#7B5EA7"}].map(sec=>(
              <div key={sec.l}>
                <div style={{fontSize:11,fontWeight:700,color:sec.co,marginBottom:6}}>{sec.l}（满分 20）</div>
                {Object.entries(sec.d).sort((a,b)=>b[1]-a[1]).map(([t,s])=>(
                  <div key={t} className="rp-kv"><span className="rp-kv-k">{TM[t].icon} {t} {TM[t].name}</span><span className="rp-kv-v">{s}</span></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PAGE 2: Primary + Secondary */}
      <div className="report-page">
        <Watermark text="CMSP Assessment"/>
        <div className="rp-header">
          <div><div className="rp-label">详细分析</div><h2 style={{fontSize:20,fontWeight:800,color:"#2D2B33"}}>性格特质解读</h2></div>
          <div style={{fontSize:12,color:"#9C96A8",fontWeight:600}}>{info.name}</div>
        </div>
        <div className="rp-line" style={{background:pm.g}}/>

        {[{m:pm,k:pk,label:"主性格",score:sorted[0][1]},{m:sm,k:sk,label:"副性格",score:sorted[1][1]}].map(({m,k,label,score})=>(
          <div key={label} className="rp-section" style={{marginBottom:32}}>
            <div className="rp-section-title"><span style={{color:m.c}}>◆</span> {label}：{m.icon} {m.name}（{m.en} · {m.sub}）— {score} 分</div>
            <div style={{fontSize:13,color:"#6B667A",lineHeight:1.7,marginBottom:12}}>
              生命动机：<strong style={{color:m.c}}>{m.motto}</strong> · 口头禅：<em>"{m.phrase}"</em>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:14}}>
              {m.kw.map(k2=><span key={k2} className="rp-tag" style={{background:m.bg,color:m.c}}>{k2}</span>)}
            </div>
            <div className="rp-label" style={{marginTop:12}}>核心优势</div>
            {m.str.map((s,i)=><div key={i} className="rp-item" style={{borderColor:m.c+"30"}}>{s}</div>)}
            <div className="rp-label" style={{marginTop:14}}>潜在短板</div>
            {m.wk.map((w,i)=><div key={i} className="rp-item" style={{borderColor:"#DC262620"}}>{w}</div>)}
          </div>
        ))}

        {combo&&(
          <div className="rp-section">
            <div className="rp-section-title"><span style={{color:pm.c}}>◆</span> 组合类型：{pk}{sk} · {combo.l}</div>
            <div style={{fontSize:13,color:"#4A4656",lineHeight:1.8,padding:"12px 16px",background:"rgba(112,104,136,.04)",borderRadius:10}}>{combo.d}</div>
          </div>
        )}
      </div>

      {/* PAGE 3: Growth + HR Reference */}
      <div className="report-page">
        <Watermark text="CMSP Assessment"/>
        <div className="rp-header">
          <div><div className="rp-label">发展建议</div><h2 style={{fontSize:20,fontWeight:800,color:"#2D2B33"}}>成长方向与用人参考</h2></div>
          <div style={{fontSize:12,color:"#9C96A8",fontWeight:600}}>{info.name}</div>
        </div>
        <div className="rp-line" style={{background:pm.g}}/>

        {[pm,sm].map(m=>(
          <div key={m.name} className="rp-section">
            <div className="rp-section-title"><span style={{color:m.c}}>◆</span> {m.icon} {m.name}成长方向</div>
            {m.grow.map((g,i)=>(
              <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:6}}>
                <span style={{width:20,height:20,borderRadius:6,flexShrink:0,background:m.bg,color:m.c,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,marginTop:2}}>{i+1}</span>
                <span style={{fontSize:13,color:"#4A4656",lineHeight:1.7}}>{g}</span>
              </div>
            ))}
          </div>
        ))}

        {/* HR Reference */}
        <div className="rp-section" style={{marginTop:8}}>
          <div className="rp-section-title"><span style={{color:"#6e7488"}}>◆</span> 企业用人参考</div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
            {[{m:pm,label:"主型"},{m:sm,label:"副型"}].map(({m,label})=>(
              <div key={label} style={{padding:"14px 16px",borderRadius:10,border:"1px solid rgba(112,104,136,.08)",background:"rgba(112,104,136,.02)"}}>
                <div style={{fontSize:12,fontWeight:700,color:m.c,marginBottom:6}}>{m.icon} {label} · {m.name}</div>
                <div className="rp-label">适配岗位</div>
                <div style={{fontSize:12,color:"#4A4656",lineHeight:1.7,marginBottom:8}}>{m.suit}</div>
                <div className="rp-label">团队搭配</div>
                <div style={{fontSize:12,color:"#4A4656",lineHeight:1.7,marginBottom:8}}>{m.team}</div>
                <div className="rp-label">管理风险提示</div>
                <div style={{fontSize:12,color:"#4A4656",lineHeight:1.7}}>{m.risk}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{marginTop:24,padding:"14px 16px",borderRadius:8,background:"rgba(112,104,136,.04)",
          fontSize:11,color:"#9C96A8",lineHeight:1.8}}>
          <strong style={{color:"#6B667A"}}>声明</strong>
          <br/>本报告基于 CMSP 四型人格理论（古希腊希波克拉底体液学说）生成，仅作为人才评估的参考维度之一。
          性格测评结果受测评环境、受测人状态等因素影响，不应作为录用、晋升的唯一依据。
          建议结合面试表现、工作实绩、360度评估等多维度信息综合判断。
          <div style={{marginTop:8,borderTop:"1px solid rgba(112,104,136,.08)",paddingTop:8}}>
            测评工具：CMSP 四型性格测试 · 测评日期：{info.date}
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="no-print" style={{display:"flex",gap:8,marginTop:8,justifyContent:"center"}}>
        <button onClick={onRestart} style={{padding:"12px 28px",borderRadius:99,border:"1.5px solid rgba(112,104,136,.15)",
          background:"rgba(255,255,255,.6)",color:"#6B667A",fontSize:13,fontWeight:600,cursor:"pointer"}}>重新测试</button>
        <button onClick={doPrint} style={{padding:"12px 28px",borderRadius:99,border:"none",
          background:"linear-gradient(135deg,#6e7488,#706888)",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",
          boxShadow:"0 2px 12px rgba(110,116,136,.2)"}}>📄 导出 / 打印</button>
      </div>
    </div>
  );
}

/* ═══ APP ═══ */
export default function CMSPTest(){
  const [phase,setPhase]=useState("start"); // start | test | info | report
  const [cur,setCur]=useState(0);
  const [ans,setAns]=useState({});
  const [info,setInfo]=useState(null);

  const doAns=(t,k)=>setAns(p=>({...p,[QS[cur].id]:{t,k,qId:QS[cur].id}}));
  const next=()=>{if(cur<QS.length-1)setCur(cur+1);else setPhase("info");};
  const prev=()=>{if(cur>0)setCur(cur-1);};

  const scores={C:0,S:0,M:0,P:0};const list=[];
  Object.values(ans).forEach(a=>{scores[a.k]++;list.push(a);});

  const reset=()=>{setPhase("start");setCur(0);setAns({});setInfo(null);};

  return(
    <>
      <style>{css}</style>
      <div style={{minHeight:"100vh"}}>
        {phase==="start"&&<div style={{maxWidth:480,margin:"0 auto"}}><Start go={()=>setPhase("test")}/></div>}
        {phase==="test"&&<div style={{maxWidth:480,margin:"0 auto"}}>
          <Question q={QS[cur]} idx={cur} total={QS.length}
            ans={ans[QS[cur]?.id]?.t} onAns={doAns} onPrev={prev} onNext={next}/></div>}
        {phase==="info"&&<div style={{maxWidth:480,margin:"0 auto"}}>
          <InfoForm onSubmit={d=>{setInfo(d);setPhase("report");}}/></div>}
        {phase==="report"&&<Report scores={scores} answers={list} info={info} onRestart={reset}/>}
      </div>
    </>
  );
}
