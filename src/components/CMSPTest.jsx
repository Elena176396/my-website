import { useState, useEffect, useRef } from "react";

const QS = [
  {id:1,s:1,o:[{t:"富于冒险",k:"C"},{t:"适应力强",k:"P"},{t:"生动",k:"S"},{t:"善于分析",k:"M"}]},
  {id:2,s:1,o:[{t:"坚持不懈",k:"M"},{t:"喜好娱乐",k:"S"},{t:"善于说服",k:"C"},{t:"平和",k:"P"}]},
  {id:3,s:1,o:[{t:"顺服",k:"P"},{t:"自我牺牲",k:"M"},{t:"善于社交",k:"S"},{t:"意志坚定",k:"C"}]},
  {id:4,s:1,o:[{t:"体贴",k:"M"},{t:"自控性",k:"P"},{t:"竞争性",k:"C"},{t:"令人信服",k:"S"}]},
  {id:5,s:1,o:[{t:"使人振作",k:"S"},{t:"受尊重",k:"M"},{t:"含蓄",k:"P"},{t:"反应敏捷",k:"C"}]},
  {id:6,s:1,o:[{t:"满足",k:"P"},{t:"敏感",k:"M"},{t:"自立",k:"C"},{t:"生机勃勃",k:"S"}]},
  {id:7,s:1,o:[{t:"计划者",k:"M"},{t:"耐性",k:"P"},{t:"积极",k:"C"},{t:"推动者",k:"S"}]},
  {id:8,s:1,o:[{t:"肯定",k:"C"},{t:"无拘无束",k:"S"},{t:"按部就班",k:"M"},{t:"羞涩",k:"P"}]},
  {id:9,s:1,o:[{t:"井井有条",k:"M"},{t:"迁就",k:"P"},{t:"坦率",k:"C"},{t:"乐观",k:"S"}]},
  {id:10,s:1,o:[{t:"友善",k:"P"},{t:"忠诚",k:"M"},{t:"有趣",k:"S"},{t:"强迫性",k:"C"}]},
  {id:11,s:1,o:[{t:"勇敢",k:"C"},{t:"可爱",k:"S"},{t:"外交手腕",k:"P"},{t:"注重细节",k:"M"}]},
  {id:12,s:1,o:[{t:"令人高兴",k:"S"},{t:"贯彻始终",k:"P"},{t:"文化修养",k:"M"},{t:"自信",k:"C"}]},
  {id:13,s:1,o:[{t:"理想主义",k:"M"},{t:"独立",k:"C"},{t:"无攻击性",k:"P"},{t:"激励性",k:"S"}]},
  {id:14,s:1,o:[{t:"感情外露",k:"S"},{t:"果断",k:"C"},{t:"尖刻幽默",k:"P"},{t:"深沉",k:"M"}]},
  {id:15,s:1,o:[{t:"调解者",k:"P"},{t:"音乐性",k:"M"},{t:"发起者",k:"C"},{t:"喜交朋友",k:"S"}]},
  {id:16,s:1,o:[{t:"考虑周到",k:"M"},{t:"执着",k:"C"},{t:"多言",k:"S"},{t:"容忍",k:"P"}]},
  {id:17,s:1,o:[{t:"聆听者",k:"P"},{t:"忠心",k:"M"},{t:"领导者",k:"C"},{t:"活力充沛",k:"S"}]},
  {id:18,s:1,o:[{t:"知足",k:"P"},{t:"首领",k:"C"},{t:"制图者",k:"M"},{t:"惹人喜爱",k:"S"}]},
  {id:19,s:1,o:[{t:"完美主义者",k:"M"},{t:"和气",k:"P"},{t:"勤劳",k:"C"},{t:"受欢迎",k:"S"}]},
  {id:20,s:1,o:[{t:"跳跃型",k:"S"},{t:"无畏",k:"C"},{t:"规范型",k:"M"},{t:"平衡",k:"P"}]},
  {id:21,s:0,o:[{t:"乏味",k:"P"},{t:"忸怩",k:"M"},{t:"露骨",k:"S"},{t:"专横",k:"C"}]},
  {id:22,s:0,o:[{t:"散漫",k:"S"},{t:"无同情心",k:"C"},{t:"缺乏热情",k:"P"},{t:"不宽恕",k:"M"}]},
  {id:23,s:0,o:[{t:"保留",k:"P"},{t:"怨恨",k:"M"},{t:"逆反",k:"C"},{t:"唠叨",k:"S"}]},
  {id:24,s:0,o:[{t:"挑剔",k:"M"},{t:"胆小",k:"P"},{t:"健忘",k:"S"},{t:"率直",k:"C"}]},
  {id:25,s:0,o:[{t:"急躁",k:"C"},{t:"无安全感",k:"M"},{t:"优柔寡断",k:"P"},{t:"好插嘴",k:"S"}]},
  {id:26,s:0,o:[{t:"不受欢迎",k:"M"},{t:"不合群",k:"P"},{t:"难预测",k:"S"},{t:"不善表达",k:"C"}]},
  {id:27,s:0,o:[{t:"固执",k:"C"},{t:"即兴",k:"S"},{t:"难于取悦",k:"M"},{t:"犹豫不决",k:"P"}]},
  {id:28,s:0,o:[{t:"平乏",k:"P"},{t:"悲观",k:"M"},{t:"自负",k:"C"},{t:"放任",k:"S"}]},
  {id:29,s:0,o:[{t:"易怒",k:"S"},{t:"无目标",k:"P"},{t:"好争吵",k:"C"},{t:"不合群",k:"M"}]},
  {id:30,s:0,o:[{t:"幼稚",k:"S"},{t:"消极",k:"M"},{t:"鲁莽",k:"C"},{t:"冷漠",k:"P"}]},
  {id:31,s:0,o:[{t:"担忧",k:"P"},{t:"不善交际",k:"M"},{t:"工作狂",k:"C"},{t:"虚荣",k:"S"}]},
  {id:32,s:0,o:[{t:"过分敏感",k:"M"},{t:"不圆滑老练",k:"C"},{t:"胆怯",k:"P"},{t:"喋喋不休",k:"S"}]},
  {id:33,s:0,o:[{t:"多疑",k:"P"},{t:"生活紊乱",k:"S"},{t:"跋扈",k:"C"},{t:"抑郁",k:"M"}]},
  {id:34,s:0,o:[{t:"反复",k:"S"},{t:"内向",k:"M"},{t:"排斥异己",k:"C"},{t:"无异议",k:"P"}]},
  {id:35,s:0,o:[{t:"杂乱无章",k:"S"},{t:"情绪化",k:"M"},{t:"言语不清",k:"P"},{t:"喜操纵",k:"C"}]},
  {id:36,s:0,o:[{t:"缓慢",k:"P"},{t:"顽固",k:"C"},{t:"好表现",k:"S"},{t:"怀疑",k:"M"}]},
  {id:37,s:0,o:[{t:"孤僻",k:"M"},{t:"统治欲",k:"C"},{t:"懒惰",k:"P"},{t:"大嗓门",k:"S"}]},
  {id:38,s:0,o:[{t:"拖延",k:"P"},{t:"多疑",k:"M"},{t:"易怒",k:"C"},{t:"不专注",k:"S"}]},
  {id:39,s:0,o:[{t:"报复型",k:"S"},{t:"烦躁",k:"C"},{t:"勉强",k:"M"},{t:"轻率",k:"P"}]},
  {id:40,s:0,o:[{t:"妥协",k:"P"},{t:"好批评",k:"M"},{t:"狡猾",k:"C"},{t:"善变",k:"S"}]},
];

const TM = {
  C:{name:"力量型",sub:"Choleric · 胆汁质",humor:"黄胆汁",
    c:"#7B5EA7",g:"linear-gradient(135deg,#7B5EA7,#9B7EC8)",bg:"rgba(123,94,167,.08)",
    icon:"🔥",motto:"为目标而活",phrase:"绝对！100%！我告诉你的！",
    kw:["行动力强","意志坚定","天生领导者","不达目的不罢休"],
    str:["冒险性、说服力强","竞争性强，越挫越坚","意志坚强，复杂环境中迅速找到解决方法","自立、果断、独立","直言不讳，天生的行动者和领导者"],
    wk:["死不认错，做错事后容易原谅自己","不易看到别人的需求","强迫性工作狂，给周围人压力太大","控制欲强、专横","人际关系紧张"],
    grow:["减轻对别人的压力，学会放松","尝试接受别人的意见，学习耐心和低调","学习包容，学会道歉和坦然接受错误","当你学会承认错误，便真正成功了"]},
  S:{name:"活泼型",sub:"Sanguine · 多血质",humor:"血液",
    c:"#5B8DB8",g:"linear-gradient(135deg,#5B8DB8,#7BAFD4)",bg:"rgba(91,141,184,.08)",
    icon:"☀️",motto:"快乐",phrase:"太好了！我太高兴了！",
    kw:["热情洋溢","注意力中心","精力充沛","好奇心强"],
    str:["生动活泼，讲故事专家","开朗、热情，天生社交者","朝气蓬勃、敏锐","朋友多，感染力强","决策来自情感，行动力强"],
    wk:["灵乱、无章法","多变，缺乏毅力，表面工作","自我中心主义","记忆力不好，经常迟到","爱好多却不精，轻许诺"],
    grow:["管住自己的嘴","控制表现欲望","对自己的评价不要过高","不要太善变，要脚踏实地做完一件事"]},
  M:{name:"完美型",sub:"Melancholic · 抑郁质",humor:"黑胆汁",
    c:"#706888",g:"linear-gradient(135deg,#706888,#8E85A6)",bg:"rgba(112,104,136,.08)",
    icon:"🌙",motto:"奉献",phrase:"万一不行……我就知道做不成……",
    kw:["深思熟虑","追求完美","艺术天分","情感丰富"],
    str:["分析性强，甘心牺牲，很有天分","持久忠诚，重承诺","敏感，注重细节","计划性强，井井有条","深沉，易受感动，理想主义"],
    wk:["矛盾体：自信+自卑，自负+自贬","总是从负面看问题","优柔寡断、易拖延","标准太高，好面子","易受环境影响，情绪化"],
    grow:["要快乐起来——没人喜欢郁闷的人","不要太容易受伤害，不要太敏感","不要把时间都用来规划而不去行动","放松下来，去发现别人的优点"]},
  P:{name:"和平型",sub:"Phlegmatic · 粘液质",humor:"粘液",
    c:"#5A8A7A",g:"linear-gradient(135deg,#5A8A7A,#7AB0A0)",bg:"rgba(90,138,122,.08)",
    icon:"🌿",motto:"平淡而自在的生活",phrase:"随便",
    kw:["易相处","耐心","适应力强","好的聆听者"],
    str:["包容性、适应性极强","平和、旁观者视角","不会缺少朋友","记忆力强，优秀的模仿者","心地善良，有同情心"],
    wk:["拒绝改变，喜欢一成不变","惰性强，目标感不强","不轻易拒绝别人","不愿承担责任，回避压力","不善于做决定"],
    grow:["给自己尝试新鲜的事物和思想","明确生活的责任，不要得过且过","有意识接受督促","多表达，多沟通"]},
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
    min-height:100vh;
  }

  .glass{
    background:rgba(255,255,255,.55);
    backdrop-filter:blur(24px) saturate(1.4);
    -webkit-backdrop-filter:blur(24px) saturate(1.4);
    border:1px solid rgba(255,255,255,.6);
    box-shadow:0 2px 16px rgba(100,90,120,.06);
  }
  .glass-strong{
    background:rgba(255,255,255,.72);
    backdrop-filter:blur(32px) saturate(1.5);
    -webkit-backdrop-filter:blur(32px) saturate(1.5);
    border:1px solid rgba(255,255,255,.7);
    box-shadow:0 4px 24px rgba(100,90,120,.08);
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
  .opt-btn:hover{
    border-color:rgba(112,104,136,.25);
    transform:translateY(-1px);
    box-shadow:0 4px 16px rgba(100,90,120,.1);
  }
  .opt-btn:active{transform:scale(.98);}
  .opt-btn.sel{
    border-color:transparent;color:#fff;
    box-shadow:0 4px 20px rgba(100,90,120,.18);
    transform:scale(1.02);
    backdrop-filter:none;-webkit-backdrop-filter:none;
  }
  .opt-btn.sel .idx{background:rgba(255,255,255,.25);color:#fff;border-color:transparent;}

  .idx{
    width:30px;height:30px;border-radius:9px;
    display:flex;align-items:center;justify-content:center;
    font-size:12px;font-weight:700;flex-shrink:0;
    border:1.5px solid rgba(112,104,136,.15);color:#9C96A8;
    transition:all .2s;background:rgba(255,255,255,.4);
  }

  .tab-btn{
    flex:1;padding:8px 4px;border-radius:10px;border:none;
    font-size:12px;font-weight:600;cursor:pointer;
    background:transparent;color:#9C96A8;transition:all .15s;
  }
  .tab-btn.on{
    background:rgba(255,255,255,.7);color:#2D2B33;
    box-shadow:0 1px 6px rgba(100,90,120,.08);
  }

  .fade{animation:fadeUp .3s ease;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
`;

/* ═══ SCREENS ═══ */

function Start({go}){
  return(
    <div className="fade" style={{textAlign:"center",padding:"48px 24px 40px"}}>
      <div style={{
        width:72,height:72,borderRadius:20,margin:"0 auto 20px",
        background:"linear-gradient(135deg,#6e7488,#706888)",
        display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:32,boxShadow:"0 6px 24px rgba(110,116,136,.2)"
      }}>🏛️</div>

      <h1 style={{fontSize:28,fontWeight:800,color:"#2D2B33",letterSpacing:"-0.5px"}}>
        CMSP-希波克拉底性格测试
      </h1>
      <p style={{fontSize:12,color:"#9C96A8",letterSpacing:"3px",margin:"4px 0 24px",fontWeight:600}}>
        古希腊体液学说 · 性格测试
      </p>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,maxWidth:300,margin:"0 auto 28px"}}>
        {["C","S","M","P"].map(k=>{
          const m=TM[k];
          return(
            <div key={k} className="glass" style={{borderRadius:14,padding:"14px 12px",textAlign:"center"}}>
              <div style={{fontSize:22,marginBottom:4}}>{m.icon}</div>
              <div style={{fontSize:14,fontWeight:700,color:m.c}}>{m.name}</div>
              <div style={{fontSize:10,color:"#9C96A8",marginTop:2}}>{m.humor}</div>
            </div>
          );
        })}
      </div>

      <div className="glass" style={{
        borderRadius:14,padding:"16px 18px",maxWidth:340,margin:"0 auto 28px",
        textAlign:"left",fontSize:13,color:"#6B667A",lineHeight:1.8,
      }}>
        <div style={{fontWeight:700,marginBottom:4,color:"#2D2B33",fontSize:13}}>测试说明</div>
        共 40 题，每题选最适合的 1 个词。<br/>
        前 20 题描述优点，后 20 题描述缺点。
        <div style={{marginTop:8,fontSize:11,color:"#9C96A8",display:"flex",gap:14}}>
          <span>⏱ 约 5 分钟</span><span>🎯 性格无好坏</span>
        </div>
      </div>

      <button onClick={go} style={{
        background:"linear-gradient(135deg,#6e7488,#706888)",color:"#fff",
        border:"none",borderRadius:99,padding:"14px 52px",
        fontSize:15,fontWeight:700,cursor:"pointer",
        boxShadow:"0 4px 20px rgba(110,116,136,.25)",transition:"all .2s",
      }}
        onMouseEnter={e=>{e.target.style.transform="translateY(-2px)";e.target.style.boxShadow="0 8px 28px rgba(110,116,136,.3)";}}
        onMouseLeave={e=>{e.target.style.transform="";e.target.style.boxShadow="0 4px 20px rgba(110,116,136,.25)";}}
      >开始测试</button>
    </div>
  );
}

function Question({q,idx,total,ans,onAns,onPrev,onNext}){
  const secC = q.s===1?"#5A8A7A":"#7B5EA7";
  const secL = q.s===1?"优点":"缺点";
  const pct = ((idx+1)/total)*100;
  const isLast = idx===total-1;

  const shRef = useRef(null);
  const pidRef = useRef(null);
  if(pidRef.current!==q.id){shRef.current=shuffle(q.o);pidRef.current=q.id;}
  const opts = shRef.current;

  const tmr = useRef(null);
  useEffect(()=>()=>clearTimeout(tmr.current),[]);

  const pick=(t,k)=>{
    clearTimeout(tmr.current);
    onAns(t,k);
    if(!isLast) tmr.current=setTimeout(()=>onNext(),320);
  };

  return(
    <div className="fade" style={{padding:"20px 20px 32px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
        <span style={{
          fontSize:11,fontWeight:700,color:secC,
          background:secC+"14",padding:"3px 10px",borderRadius:99,letterSpacing:"1px"
        }}>{secL}</span>
        <span style={{fontSize:13,color:"#9C96A8",fontWeight:600}}>
          <span style={{color:"#2D2B33",fontWeight:800,fontSize:15}}>{idx+1}</span> / {total}
        </span>
      </div>

      {/* Progress */}
      <div style={{height:4,borderRadius:99,background:"rgba(112,104,136,.1)",marginBottom:28,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${secC},${secC}aa)`,
          borderRadius:99,transition:"width .4s cubic-bezier(.4,0,.2,1)"}}/>
      </div>

      <div style={{marginBottom:24}}>
        <div style={{fontSize:11,color:"#9C96A8",fontWeight:600,letterSpacing:"2px",marginBottom:6}}>
          Q{String(q.id).padStart(2,"0")}
        </div>
        <div style={{fontSize:17,fontWeight:700,color:"#2D2B33"}}>选择最符合你的一个词</div>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:28}}>
        {opts.map((o,i)=>{
          const sel=ans===o.t;
          return(
            <button key={o.t} className={`opt-btn${sel?" sel":""}`}
              style={sel?{background:TM[o.k].g}:{}} onClick={()=>pick(o.t,o.k)}>
              <span className="idx">{sel?"✓":String.fromCharCode(65+i)}</span>
              <span style={{fontWeight:sel?700:500}}>{o.t}</span>
            </button>
          );
        })}
      </div>

      <div style={{display:"flex",gap:8}}>
        {idx>0&&(
          <button onClick={onPrev} style={{
            flex:1,padding:"12px 0",borderRadius:12,
            border:"1.5px solid rgba(112,104,136,.12)",background:"rgba(255,255,255,.4)",
            color:"#6B667A",fontSize:13,fontWeight:600,cursor:"pointer",
            backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",
          }}>← 上一题</button>
        )}
        {isLast&&(
          <button onClick={onNext} disabled={!ans} style={{
            flex:2,padding:"12px 0",borderRadius:12,border:"none",
            background:ans?"linear-gradient(135deg,#6e7488,#706888)":"rgba(112,104,136,.1)",
            color:ans?"#fff":"#9C96A8",fontSize:14,fontWeight:700,
            cursor:ans?"pointer":"default",
            boxShadow:ans?"0 4px 16px rgba(110,116,136,.2)":"none",
          }}>查看结果 →</button>
        )}
      </div>
    </div>
  );
}

function Result({scores,answers,onRestart}){
  const total=Object.values(scores).reduce((a,b)=>a+b,0);
  const sorted=Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  const [pk,pv]=sorted[0];const [sk,sv]=sorted[1];
  const pm=TM[pk],sm=TM[sk];
  const combo=COMBOS[pk+sk];

  const strS={C:0,S:0,M:0,P:0},wkS={C:0,S:0,M:0,P:0};
  answers.forEach(a=>{const q=QS.find(q=>q.id===a.qId);if(q.s===1)strS[a.k]++;else wkS[a.k]++;});

  const [tab,setTab]=useState("overview");
  const tabs=[{k:"overview",l:"总览"},{k:"primary",l:pm.name},{k:"secondary",l:sm.name},{k:"growth",l:"成长"}];

  const Section=({title,items,color,dotC})=>(
    <div style={{marginBottom:16}}>
      <div style={{fontSize:13,fontWeight:700,color:"#2D2B33",marginBottom:8,display:"flex",alignItems:"center",gap:6}}>
        <span style={{width:5,height:5,borderRadius:99,background:dotC||color,display:"inline-block"}}/>
        {title}
      </div>
      {items.map((s,i)=>(
        <div key={i} style={{fontSize:13,color:"#6B667A",lineHeight:1.7,
          padding:"6px 0 6px 14px",borderLeft:`2px solid ${color}25`,marginBottom:1}}>{s}</div>
      ))}
    </div>
  );

  return(
    <div className="fade" style={{padding:"0 20px 40px"}}>
      {/* Hero */}
      <div style={{
        background:pm.g,borderRadius:"0 0 28px 28px",
        padding:"36px 24px 28px",margin:"0 -20px 20px",
        textAlign:"center",color:"#fff",position:"relative",overflow:"hidden"
      }}>
        <div style={{position:"absolute",inset:0,opacity:.1,
          background:"radial-gradient(circle at 25% 20%,#fff,transparent 55%)"}}/>
        <div style={{fontSize:48,marginBottom:6,position:"relative"}}>{pm.icon}</div>
        <h1 style={{fontSize:30,fontWeight:800,margin:"0 0 4px",position:"relative",letterSpacing:"-0.5px"}}>
          {pm.name}
        </h1>
        <p style={{fontSize:13,opacity:.75,margin:0,position:"relative"}}>{pm.sub}</p>
        <div style={{
          display:"inline-flex",gap:8,marginTop:12,position:"relative",
          background:"rgba(255,255,255,.18)",borderRadius:99,padding:"5px 16px"
        }}>
          {sorted.map(([t,s])=>(
            <span key={t} style={{fontSize:14,fontWeight:700}}>{s}{t}</span>
          ))}
        </div>
      </div>

      {/* Score Bars */}
      <div className="glass-strong" style={{borderRadius:18,padding:"18px",marginBottom:12}}>
        {sorted.map(([type,score],i)=>{
          const pct=Math.round((score/total)*100);const m=TM[type];
          return(
            <div key={type} style={{marginBottom:i<sorted.length-1?10:0}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                <span style={{fontSize:12,fontWeight:700,color:m.c,display:"flex",alignItems:"center",gap:5}}>
                  {m.icon} {type} · {m.name}
                </span>
                <span style={{fontSize:12,fontWeight:800,color:m.c}}>{score}
                  <span style={{fontWeight:500,color:"#9C96A8"}}> / {total}</span>
                </span>
              </div>
              <div style={{height:6,borderRadius:99,background:"rgba(112,104,136,.08)",overflow:"hidden"}}>
                <div style={{height:"100%",width:`${pct}%`,background:m.g,borderRadius:99,
                  transition:"width .8s cubic-bezier(.4,0,.2,1)"}}/>
              </div>
            </div>
          );
        })}
      </div>

      {combo&&(
        <div className="glass" style={{borderRadius:14,padding:"14px 16px",marginBottom:12,
          borderLeft:`3px solid ${pm.c}`}}>
          <div style={{fontSize:13,fontWeight:700,color:pm.c,marginBottom:3}}>{pk}{sk} · {combo.l}</div>
          <div style={{fontSize:12,color:"#6B667A",lineHeight:1.7}}>{combo.d}</div>
        </div>
      )}

      {/* Str vs Wk */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
        {[{l:"优点倾向",d:strS,co:"#5A8A7A"},{l:"缺点倾向",d:wkS,co:"#7B5EA7"}].map(sec=>(
          <div key={sec.l} className="glass" style={{borderRadius:14,padding:"12px 14px"}}>
            <div style={{fontSize:11,fontWeight:700,color:sec.co,marginBottom:8}}>{sec.l}</div>
            {Object.entries(sec.d).sort((a,b)=>b[1]-a[1]).map(([t,s])=>(
              <div key={t} style={{display:"flex",justifyContent:"space-between",
                fontSize:11,color:"#6B667A",marginBottom:3}}>
                <span>{TM[t].icon} {t}</span>
                <span style={{fontWeight:700,color:s>=5?TM[t].c:"#9C96A8"}}>{s}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:3,marginBottom:12,
        background:"rgba(112,104,136,.08)",borderRadius:12,padding:3}}>
        {tabs.map(t=>(
          <button key={t.k} className={`tab-btn${tab===t.k?" on":""}`}
            onClick={()=>setTab(t.k)}>{t.l}</button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="glass-strong" style={{borderRadius:18,padding:"20px 18px",marginBottom:20,minHeight:180}}>
        {tab==="overview"&&(
          <div className="fade">
            <div style={{marginBottom:18}}>
              <div style={{fontSize:11,fontWeight:700,color:"#9C96A8",letterSpacing:"1.5px",marginBottom:10}}>性格公式</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {sorted.map(([t,s])=>(
                  <span key={t} style={{background:TM[t].g,color:"#fff",borderRadius:9,padding:"7px 13px",
                    fontSize:15,fontWeight:800,boxShadow:`0 2px 8px ${TM[t].c}25`}}>{s}{t}</span>
                ))}
              </div>
            </div>
            <div style={{marginBottom:18}}>
              <div style={{fontSize:11,fontWeight:700,color:"#9C96A8",letterSpacing:"1.5px",marginBottom:8}}>口头禅</div>
              <div style={{fontSize:16,color:pm.c,fontWeight:600,fontStyle:"italic",lineHeight:1.5}}>
                "{pm.phrase}"
              </div>
            </div>
            <div style={{marginBottom:18}}>
              <div style={{fontSize:11,fontWeight:700,color:"#9C96A8",letterSpacing:"1.5px",marginBottom:6}}>生命意义</div>
              <div style={{fontSize:22,fontWeight:800,color:pm.c}}>{pm.motto}</div>
            </div>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:"#9C96A8",letterSpacing:"1.5px",marginBottom:8}}>关键词</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {pm.kw.map(k=>(
                  <span key={k} style={{background:pm.bg,color:pm.c,border:`1px solid ${pm.c}18`,
                    borderRadius:99,padding:"5px 12px",fontSize:12,fontWeight:600}}>{k}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {(tab==="primary"||tab==="secondary")&&(()=>{
          const m=tab==="primary"?pm:sm;const label=tab==="primary"?"主性格":"副性格";
          return(
            <div className="fade">
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,
                padding:"10px 14px",borderRadius:12,background:m.bg}}>
                <span style={{fontSize:26}}>{m.icon}</span>
                <div>
                  <div style={{fontSize:15,fontWeight:800,color:m.c}}>{label} · {m.name}</div>
                  <div style={{fontSize:11,color:m.c+"88"}}>{m.sub}</div>
                </div>
              </div>
              <Section title="优势" items={m.str} color={m.c} dotC="#5A8A7A"/>
              <Section title="短板" items={m.wk} color={m.c} dotC="#7B5EA7"/>
            </div>
          );
        })()}

        {tab==="growth"&&(
          <div className="fade">
            {[{m:pm,l:"主性格"},{m:sm,l:"副性格"}].map(({m,l})=>(
              <div key={l} style={{marginBottom:20}}>
                <div style={{fontSize:13,fontWeight:700,color:m.c,marginBottom:10,
                  display:"flex",alignItems:"center",gap:6}}>{m.icon} {m.name}</div>
                {m.grow.map((g,i)=>(
                  <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:8}}>
                    <span style={{width:22,height:22,borderRadius:7,flexShrink:0,
                      background:m.bg,color:m.c,display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:11,fontWeight:800,marginTop:1}}>{i+1}</span>
                    <span style={{fontSize:13,color:"#6B667A",lineHeight:1.7}}>{g}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="glass" style={{borderRadius:12,padding:"12px 14px",marginBottom:16,
        fontSize:11,color:"#9C96A8",lineHeight:1.7}}>
        <span style={{fontWeight:700,color:"#6B667A"}}>关于结果</span> · 此测试结果多为显性性格。没有人是单一性格，你是四种的独特组合。
      </div>

      <button onClick={onRestart} style={{
        width:"100%",padding:"14px 0",borderRadius:99,border:"none",
        background:"linear-gradient(135deg,#6e7488,#706888)",
        color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",
        boxShadow:"0 4px 16px rgba(110,116,136,.2)",
      }}>重新测试</button>
    </div>
  );
}

/* ═══ APP ═══ */
export default function CMSPTest(){
  const [phase,setPhase]=useState("start");
  const [cur,setCur]=useState(0);
  const [ans,setAns]=useState({});

  const doAns=(t,k)=>setAns(p=>({...p,[QS[cur].id]:{t,k,qId:QS[cur].id}}));
  const next=()=>{if(cur<QS.length-1)setCur(cur+1);else setPhase("result");};
  const prev=()=>{if(cur>0)setCur(cur-1);};

  const scores={C:0,S:0,M:0,P:0};const list=[];
  Object.values(ans).forEach(a=>{scores[a.k]++;list.push(a);});

  return(
    <>
      <style>{css}</style>
      <div style={{maxWidth:480,margin:"0 auto",minHeight:"100vh"}}>
        {phase==="start"&&<Start go={()=>setPhase("test")}/>}
        {phase==="test"&&<Question q={QS[cur]} idx={cur} total={QS.length}
          ans={ans[QS[cur]?.id]?.t} onAns={doAns} onPrev={prev} onNext={next}/>}
        {phase==="result"&&<Result scores={scores} answers={list}
          onRestart={()=>{setPhase("start");setCur(0);setAns({});}}/>}
      </div>
    </>
  );
}
