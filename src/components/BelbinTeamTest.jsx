import { useState, useCallback, useMemo, useRef } from "react";

// ════════════════════════════════════════
// DATA
// ════════════════════════════════════════
const SECTIONS = [
  { id:1, title:"我相信我可以为团队做出积极的贡献，因为：",
    options:[
      {key:"A",text:"我的技术知识和经验通常是我的主要财富"},
      {key:"B",text:"我能与各种类型的人合作共事"},
      {key:"C",text:"我一贯是爱出主意的"},
      {key:"D",text:"我善于发现对实现集体目标有价值的人"},
      {key:"E",text:"我能靠个人的实力把事情办成"},
      {key:"F",text:"如果最终能导致有益的结果，我愿面对暂时的冷遇"},
      {key:"G",text:"我通常能意识到什么是现实的，什么是可能的"},
      {key:"H",text:"在选择行动方案时，我能不带倾向性，也不带偏见地从众多方案中选出一个合理的方案"},
      {key:"I",text:"我一般能够很快发现新机会并加以利用"},
    ]},
  { id:2, title:"在团队中，我常常有这样的感觉或表现：",
    options:[
      {key:"A",text:"如果会议没有得到很好的组织、控制和主持，我会感到很不痛快"},
      {key:"B",text:"除非我对此事物比较了解，一般我不会随便提出我的看法"},
      {key:"C",text:"集体讨论新问题时，我属于说得多的"},
      {key:"D",text:"我的看法太客观，有时显得有些不近人情，使我与同事打成一片有困难"},
      {key:"E",text:"为了把事情办成，我有时使人感到强硬以至专断"},
      {key:"F",text:"我发现领导别人很困难，也许是因为我过多考虑别人情绪和团队和谐气氛"},
      {key:"G",text:"我有时过于沉湎于思考自己的主意和想法而忽略了事情的发展和变化"},
      {key:"H",text:"我不愿对不完整、细节不充分的方案发表意见"},
      {key:"I",text:"如果有人有合理的意见而没有充分的机会表达，我会非常倾向于给人家时间和机会"},
    ]},
  { id:3, title:"当我与他人共同进行一项工作时：",
    options:[
      {key:"A",text:"我有不施加任何压力就可以影响其他人的能力"},
      {key:"B",text:"一般来讲，我能够有效地避免因大意而引起的错误或遗漏，从而避免给整个运作造成失败"},
      {key:"C",text:"我常在必要时采取行动以保证会议不浪费时间或偏离主题"},
      {key:"D",text:"我总是努力保持自己的行为准则"},
      {key:"E",text:"我乐于支持与大家共同利益有关的积极建议"},
      {key:"F",text:"我热衷寻求最新的思想和新的发展"},
      {key:"G",text:"我相信我的判断能力有助于做出正确的决策"},
      {key:"H",text:"我能使人放心的是，对那些最基本的工作，我都能做得井井有条"},
      {key:"I",text:"人可以信赖我的是我一定可以在会上提出一些有创意的新意见"},
    ]},
  { id:4, title:"我在工作团队中的特征是：",
    options:[
      {key:"A",text:"我有兴趣更多地了解我的同事"},
      {key:"B",text:"我会自然地对于其他人的观点和看法提出异议，或个人保留少数意见"},
      {key:"C",text:"只有当我自己比较了解一个事物时，我才会就此事物提出我自己的观点"},
      {key:"D",text:"一旦一项计划被决定下来需要执行，我就有办法使其实施成功"},
      {key:"E",text:"我宁愿下功夫深入了解事物的本质，而不是对事物的了解停留在表面"},
      {key:"F",text:"对承担的任何工作，我都能做到尽善尽美"},
      {key:"G",text:"我乐于与工作团队以外的人进行联系"},
      {key:"H",text:"我善于倾听各方面的意见，但必要时我亦会毫不犹豫地当机立断"},
      {key:"I",text:"对于站不住脚的观点或方案，我通常会找到一系列论据对其加以批驳"},
    ]},
  { id:5, title:"在工作中，我得到满足，因为：",
    options:[
      {key:"A",text:"我喜欢对事物进行分析并权衡所有的解决方案"},
      {key:"B",text:"我对寻找解决问题的可行方案感兴趣"},
      {key:"C",text:"我更倾向于建立和保护良好的团队工作关系"},
      {key:"D",text:"我能对决策有强烈的影响"},
      {key:"E",text:"我能适应那些有新意的人"},
      {key:"F",text:"我能使人们在某项必要的行动上达成一致意见"},
      {key:"G",text:"我感到我的身上有一种能使我全身心地投入到工作中去的气质"},
      {key:"H",text:"我很高兴能找到一块可以发挥我想象力的天地"},
      {key:"I",text:"我感觉在我的工作范围内我可以集中精力做好一项工作"},
    ]},
  { id:6, title:"如果突然给我一件困难的工作，而且时间有限，人员不熟：",
    options:[
      {key:"A",text:"在有新方案之前，我宁愿先躲进角落，拟定出一个解脱困境的方案"},
      {key:"B",text:"我比较愿意与那些表现出积极态度的人一道工作"},
      {key:"C",text:"我会设法通过让每个成员都发挥长处来完成这项工作量很大的任务"},
      {key:"D",text:"我天生的紧迫感能确保我们按时完成任务"},
      {key:"E",text:"我认为我能保持头脑冷静，富有条理地思考问题"},
      {key:"F",text:"尽管困难重重，我也能保证目标始终如一"},
      {key:"G",text:"如果集体工作没有进展，我会采取积极措施去加以推动"},
      {key:"H",text:"我愿意展开广泛的讨论意在激发新思想，推动工作"},
      {key:"I",text:"我一般会尽量地收集和了解有关这一任务的情况"},
    ]},
  { id:7, title:"对于那些在团队工作中或与周围人共事时所遇到的问题：",
    options:[
      {key:"A",text:"我很容易对那些阻碍前进的人表现出不耐烦"},
      {key:"B",text:"别人可能批评我太重理性分析而缺少直觉"},
      {key:"C",text:"有些人不喜欢我致力于检查重要细节以确保其准确的做法"},
      {key:"D",text:"我常常容易产生厌烦感，需要一、二个有激情的人使我振作起来"},
      {key:"E",text:"我经常认为在团队里工作是浪费时间，我想我独自做恐怕会做得更好"},
      {key:"F",text:"对于我遇到的复杂问题，我有时不善于加以解释和澄清"},
      {key:"G",text:"对于那些我不能做的事，我有意识地求助于他人"},
      {key:"H",text:"当我与真正的对立面发生冲突时，我没有把握使对方理解我的观点"},
      {key:"I",text:"当工作目标不明确时，我发现我很难开始工作"},
    ]},
];

const SCORE_MAP = [
  {A:"SP",B:"TW",C:"PL",D:"CO",E:"CF",F:"SH",G:"IMP",H:"ME",I:"RI"},
  {A:"IMP",B:"SP",C:"RI",D:"ME",E:"SH",F:"TW",G:"PL",H:"CF",I:"CO"},
  {A:"CO",B:"CF",C:"SH",D:"SP",E:"TW",F:"RI",G:"ME",H:"IMP",I:"PL"},
  {A:"TW",B:"SH",C:"SP",D:"IMP",E:"PL",F:"CF",G:"RI",H:"CO",I:"ME"},
  {A:"ME",B:"IMP",C:"TW",D:"SH",E:"RI",F:"CO",G:"CF",H:"PL",I:"SP"},
  {A:"PL",B:"TW",C:"CO",D:"CF",E:"ME",F:"IMP",G:"SH",H:"RI",I:"SP"},
  {A:"SH",B:"ME",C:"CF",D:"RI",E:"SP",F:"PL",G:"CO",H:"TW",I:"IMP"},
];

const ROLE_ORDER=["SH","IMP","CF","RI","CO","TW","PL","ME","SP"];

const CATS=[
  {name:"行动导向",icon:"⚡",color:"#d97706",accent:"#fef3c7",roles:["SH","IMP","CF"],desc:"关注任务推进与落地执行"},
  {name:"人际导向",icon:"🤝",color:"#059669",accent:"#d1fae5",roles:["RI","CO","TW"],desc:"关注团队沟通与人际协调"},
  {name:"思考导向",icon:"🧠",color:"#7c3aed",accent:"#ede9fe",roles:["PL","ME","SP"],desc:"关注创意、判断与专业深度"},
];

const R={
  SH:{code:"SH",name:"鞭策者",en:"Shaper",color:"#dc2626",
    traits:"思维敏捷、坦荡、主动探索、精力充沛",
    str:"积极主动，有干劲，随时准备向传统、低效率、自满自足挑战。有紧迫感，视成功为目标，追求高效率。勇于挑战他人，喜欢领导并激励他人采取行动。",
    weak:"好激起争端，爱冲动，易急躁，容易给别人压力。说话太直接——总是就事论事，却经常伤人不伤己。对人际关系不敏感。",
    role:"寻找和发现团队讨论中可能的方案；使任务和目标成形；推动团队达成一致意见并朝决策行动。",
    note:"SH是团队中最具竞争性的角色。驱动力是「紧迫感」而非焦虑——遇困难会积极找解决办法。"},
  IMP:{code:"IMP",name:"执行者",en:"Implementer",color:"#2563eb",
    traits:"保守、有责任感、务实可靠、守纪律",
    str:"有组织能力、实践经验，工作勤奋，有自我约束力。能把想法转化为实际行动，将自身利益和忠诚与团队紧密相连。",
    weak:"缺乏灵活性，应变能力弱。对未被证实的主意不感兴趣，可能阻碍变革。",
    role:"把谈话与建议转换为实际步骤；考虑什么行得通；整理建议使之与已有计划和系统相配合。",
    note:"能可靠地执行既定计划，但未必擅长制定新计划。朝目标执行到底的精神帮助团队不忘初心。"},
  CF:{code:"CF",name:"完成者",en:"Completer Finisher",color:"#ea580c",
    traits:"勤奋有序、认真、尽职尽责",
    str:"坚持不懈，精益求精，追求完美。擅长检查工作纰漏，确保成果尽善尽美。动力来自内在对确保不出差错的渴望。",
    weak:"常拘泥于细节，容易为小事焦虑。与SH的区别——SH有「紧迫感」，CF是「焦虑感」。不愿放手。",
    role:"强调任务目标要求和日程表；寻找并指出方案中的错误、遗漏；促使团队产生时间紧迫的感觉。",
    note:"被内部焦虑所激励，但表面看起来很从容。大多性格内向，不太需要外部激励。"},
  RI:{code:"RI",name:"外交家",en:"Resource Investigator",color:"#059669",
    traits:"性格外向、开朗、热情、好奇心强、联系广泛",
    str:"有广泛联系人的能力，不断探索新事物，勇于迎接挑战。与生俱来是谈判高手，善于挖掘新机遇。在听取和发展别人想法时效率极高。",
    weak:"事过境迁，见异思迁，兴趣马上转移。当最初的兴奋消逝后，容易对工作失去兴趣。",
    role:"提出建议并引入外部信息；接触持有其他观点的群体；参加磋商性质的活动。",
    note:"RI是「外界信息的敏感者」。与TW的区别：RI感知外部信息，TW感知人际关系。"},
  CO:{code:"CO",name:"协调者",en:"Coordinator",color:"#7c3aed",
    traits:"沉着、自信、有控制局面的能力",
    str:"对各种有价值的意见不带偏见地兼容并蓄。能快速识别对方长处，通过知人善用达成目标。沉稳自信，拥有高情商和责任心。",
    weak:"在智能以及创造力方面并非超常。可能将团队努力的成果归于自己。",
    role:"明确团队目标和方向；选择需要决策的问题并明确优先级；帮助确定角色分工；综合团队建议。",
    note:"不一定是团队中最聪明的，但拥有远见卓识。最大价值是发挥团队潜力，认识成员才能并鼓励发挥。"},
  TW:{code:"TW",name:"凝聚者",en:"Team Worker",color:"#db2777",
    traits:"擅长人际交往、温和、敏感、合作性强",
    str:"有适应周围环境以及人的能力，能促进团队合作。倾听能力最强。灵活性强，善于化解各种矛盾，促进团队精神。",
    weak:"在危急时刻往往优柔寡断，一般很中庸。不愿承担压力，当别人反对时容易犹豫退让。",
    role:"给予他人支持并帮助别人；打破讨论中的沉默；采取行动扭转或克服团队中的分歧。",
    note:"TW是「人际关系的敏感者」——团队的黏合剂，精神力量可以将所有人凝聚在一起。"},
  PL:{code:"PL",name:"智多星",en:"Plant",color:"#ca8a04",
    traits:"有个性、思想深刻、不拘一格、个人主义",
    str:"才华横溢，富有想象力，智慧，知识面广。创造力强，能充当创新者和发明者。充满原创思想。",
    weak:"高高在上，不重细节，不拘礼仪。好高骛远，可能忽略实施的可能性。过分强调自己的观点。",
    role:"提供建议；提出批评并引出相反意见；对已有方案提出新的看法。",
    note:"倾向于与团队保持距离，运用想象力独立完成任务。对外界批判和赞扬反应强烈。"},
  ME:{code:"ME",name:"审议员",en:"Monitor Evaluator",color:"#4f46e5",
    traits:"清醒、理智、谨慎、不易激动",
    str:"判断力强，分辨力强，讲求实际。有着与生俱来的对过分热情的免疫力。倾向三思而后行，善于考虑周全后做出明智决定。",
    weak:"缺乏鼓动和激发他人的能力，自己也不容易被激发。缺乏想象力和热情，做决定较慢。",
    role:"分析问题和情景；对繁杂材料予以简化并澄清模糊问题；对他人的判断和作用做出评价。",
    note:"靠强大的分析判断能力，敢于直言不讳地提出和坚持异议。所做出的决定基本不会错。"},
  SP:{code:"SP",name:"专业师",en:"Specialist",color:"#0d9488",
    traits:"诚心诚意、主动性强、甘于奉献、专注",
    str:"具有奉献精神，拥有丰富的专业技能，致力于维护专业标准。为自己获得专业技能和知识感到骄傲。",
    weak:"局限于狭窄的领域，专注于技术而忽略大局。个性强，常独来独往，不喜欢团队合作。",
    role:"在关键知识领域提供专业支撑；维持专业标准和深度；为团队带来稀缺的专业能力。",
    note:"首要专注于维持专业度以及对专业知识的不断探究。注意力集中在自己领域，对其他领域所知甚少。"},
};

const EMPTY=()=>({A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,I:0});

const printCSS = `
@media print {
  body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  .no-print { display: none !important; }
  .report-page { break-inside: avoid; }
  .page-break { break-before: page; }
}
`;

// ════════════════════════════════════════
// COMPONENTS
// ════════════════════════════════════════

function Pt({k,text,val,onChange,avail}){
  const mx=Math.min(10,val+avail);
  const b={width:28,height:28,borderRadius:6,border:"1px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,background:"#fff",cursor:"pointer"};
  return(
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:"1px solid #f3f4f6"}}>
      <span style={{
        width:26,height:26,borderRadius:6,flexShrink:0,
        background:val>0?"#eef2ff":"#f9fafb",border:val>0?"1.5px solid #818cf8":"1px solid #e5e7eb",
        display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:12,fontWeight:700,color:val>0?"#4f46e5":"#9ca3af",
      }}>{k}</span>
      <span style={{flex:1,fontSize:14,lineHeight:1.6,color:"#374151"}}>{text}</span>
      <div style={{display:"flex",alignItems:"center",gap:4,flexShrink:0}}>
        <button onClick={()=>val>0&&onChange(val-1)} disabled={val===0}
          style={{...b,color:val>0?"#374151":"#d1d5db",borderColor:val>0?"#d1d5db":"#e5e7eb",cursor:val>0?"pointer":"default"}}>−</button>
        <span style={{width:28,textAlign:"center",fontSize:18,fontWeight:800,fontVariantNumeric:"tabular-nums",color:val>0?"#1e1b4b":"#d1d5db"}}>{val}</span>
        <button onClick={()=>mx>val&&onChange(val+1)} disabled={mx<=val}
          style={{...b,color:mx>val?"#4f46e5":"#d1d5db",background:mx>val?"#eef2ff":"#fff",borderColor:mx>val?"#c7d2fe":"#e5e7eb",cursor:mx>val?"pointer":"default"}}>+</button>
      </div>
    </div>
  );
}

function BudgetBar({used}){
  return(
    <div style={{marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,fontSize:12}}>
        <span style={{color:"#9ca3af"}}>分配分数</span>
        <span style={{fontWeight:700,fontVariantNumeric:"tabular-nums",color:used===10?"#059669":used>10?"#dc2626":"#d97706"}}>{used}/10</span>
      </div>
      <div style={{height:4,borderRadius:2,background:"#f3f4f6",overflow:"hidden"}}>
        <div style={{height:"100%",borderRadius:2,transition:"width .25s",width:`${Math.min(100,used*10)}%`,
          background:used===10?"#059669":used>10?"#dc2626":"linear-gradient(90deg,#6366f1,#a78bfa)"}}/>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// REPORT
// ════════════════════════════════════════
function Report({scores,sorted,ans,onReset}){
  const [name,setName]=useState("");
  const [dept,setDept]=useState("");
  const maxS=Math.max(...Object.values(scores),1);
  const today=new Date().toLocaleDateString("zh-CN",{year:"numeric",month:"long",day:"numeric"});

  const radarData=ROLE_ORDER.map(r=>({role:R[r].name,score:scores[r],fullMark:70}));
  const barData=ROLE_ORDER.map(r=>({name:R[r].name,score:scores[r],color:R[r].color}));

  const catScores=CATS.map(c=>({...c,total:c.roles.reduce((s,r)=>s+(scores[r]||0),0)}));
  const maxCat=Math.max(...catScores.map(c=>c.total));

  const top3=sorted.slice(0,3);
  const low2=sorted.slice(-2).reverse();

  return(
    <div style={{fontFamily:"-apple-system,'Noto Sans SC','Helvetica Neue',sans-serif",maxWidth:780,margin:"0 auto",background:"#fff",color:"#1e1b4b"}}>
      <style>{printCSS}</style>

      {/* ─── Input bar ─── */}
      <div className="no-print" style={{background:"#f8fafc",borderBottom:"1px solid #e2e8f0",padding:"14px 32px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <label style={{fontSize:12,color:"#64748b",fontWeight:600}}>姓名</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="测评人"
            style={{border:"1px solid #e2e8f0",borderRadius:6,padding:"5px 10px",fontSize:13,width:120,outline:"none",background:"#fff"}}/>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <label style={{fontSize:12,color:"#64748b",fontWeight:600}}>部门/岗位</label>
          <input value={dept} onChange={e=>setDept(e.target.value)} placeholder="选填"
            style={{border:"1px solid #e2e8f0",borderRadius:6,padding:"5px 10px",fontSize:13,width:140,outline:"none",background:"#fff"}}/>
        </div>
        <div style={{marginLeft:"auto",display:"flex",gap:8}}>
          <button onClick={onReset} style={{padding:"6px 14px",borderRadius:6,border:"1px solid #e2e8f0",background:"#fff",fontSize:12,fontWeight:600,color:"#64748b",cursor:"pointer"}}>重新测试</button>
          <button onClick={()=>window.print()} style={{padding:"6px 14px",borderRadius:6,border:"none",background:"#4f46e5",fontSize:12,fontWeight:600,color:"#fff",cursor:"pointer"}}>导出 / 打印</button>
          <button onClick={()=>{
            const t=sorted.map((r,i)=>`${i+1}. ${R[r].name}(${r}): ${scores[r]}分`).join("\n");
            const c=CATS.map(cat=>`${cat.name}${cat.roles.reduce((s,r)=>s+(scores[r]||0),0)}分`).join("，");
            navigator.clipboard?.writeText(`我的团队测评-贝尔宾结果（9角色版）：\n${t}\n\n导向分布：${c}\n\n请帮我深度解读，包括角色组合分析、团队适配建议、个人发展方向`);
          }} style={{padding:"6px 14px",borderRadius:6,border:"none",background:"#059669",fontSize:12,fontWeight:600,color:"#fff",cursor:"pointer"}}>复制结果用于解读</button>
        </div>
      </div>

      <div style={{padding:"0 36px 40px"}}>

        {/* ─── Cover header ─── */}
        <div style={{borderBottom:"3px solid #1e1b4b",paddingTop:40,paddingBottom:24,marginBottom:32}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:"#6366f1",letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>BELBIN TEAM ROLE</div>
              <h1 style={{fontSize:28,fontWeight:800,margin:0,letterSpacing:"-0.02em",lineHeight:1.2}}>团队角色测评报告</h1>
              <p style={{fontSize:13,color:"#64748b",margin:"6px 0 0"}}>贝尔宾团队角色自评问卷 · 9角色完整版</p>
            </div>
            <div style={{textAlign:"right",fontSize:13,color:"#64748b",lineHeight:1.8}}>
              {name&&<div style={{fontSize:16,fontWeight:700,color:"#1e1b4b"}}>{name}</div>}
              {dept&&<div>{dept}</div>}
              <div>{today}</div>
            </div>
          </div>
        </div>

        {/* ─── Executive Summary ─── */}
        <div className="report-page" style={{marginBottom:36}}>
          <div style={{fontSize:11,fontWeight:700,color:"#6366f1",letterSpacing:1.5,marginBottom:8}}>EXECUTIVE SUMMARY</div>
          <h2 style={{fontSize:18,fontWeight:700,margin:"0 0 16px",color:"#1e1b4b"}}>角色概览</h2>

          <div style={{display:"flex",gap:12,marginBottom:20,flexWrap:"wrap"}}>
            {top3.map((rc,i)=>{
              const r=R[rc];
              return(
                <div key={rc} style={{flex:"1 1 180px",border:`2px solid ${r.color}`,borderRadius:12,padding:16,position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",top:8,right:10,fontSize:9,fontWeight:800,color:r.color,background:`${r.color}12`,padding:"2px 8px",borderRadius:10}}>
                    {["主导角色","次要角色","第三角色"][i]}
                  </div>
                  <div style={{fontSize:13,fontWeight:800,color:r.color,marginBottom:2}}>{r.name}</div>
                  <div style={{fontSize:11,color:"#94a3b8",marginBottom:8}}>{r.en} · {r.code}</div>
                  <div style={{fontSize:28,fontWeight:800,color:"#1e1b4b",marginBottom:4,fontVariantNumeric:"tabular-nums"}}>{scores[rc]}<span style={{fontSize:13,fontWeight:400,color:"#94a3b8"}}> 分</span></div>
                  <div style={{fontSize:12,color:"#64748b",lineHeight:1.6}}>{r.traits}</div>
                </div>
              );
            })}
          </div>

          {/* Orientation bars */}
          <div style={{background:"#f8fafc",borderRadius:10,padding:16,border:"1px solid #e2e8f0"}}>
            <div style={{fontSize:12,fontWeight:700,color:"#475569",marginBottom:10}}>三大导向分布</div>
            {catScores.map(c=>(
              <div key={c.name} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <span style={{fontSize:14,width:20,textAlign:"center"}}>{c.icon}</span>
                <span style={{fontSize:13,fontWeight:700,color:c.color,width:70}}>{c.name}</span>
                <div style={{flex:1,height:20,borderRadius:6,background:"#e2e8f0",overflow:"hidden",position:"relative"}}>
                  <div style={{height:"100%",borderRadius:6,background:c.color,width:`${maxCat>0?(c.total/maxCat)*100:0}%`,transition:"width .5s",opacity:.75}}/>
                  <span style={{position:"absolute",right:8,top:2,fontSize:11,fontWeight:700,color:"#1e1b4b"}}>{c.total} 分</span>
                </div>
              </div>
            ))}
            <div style={{fontSize:11,color:"#94a3b8",marginTop:6}}>{catScores.map(c=>`${c.name} = ${c.roles.map(r=>R[r].name).join("+")}`).join(" ｜ ")}</div>
          </div>
        </div>

        {/* ─── Charts ─── */}
        <div className="report-page page-break" style={{marginBottom:36}}>
          <div style={{fontSize:11,fontWeight:700,color:"#6366f1",letterSpacing:1.5,marginBottom:8}}>SCORE DISTRIBUTION</div>
          <h2 style={{fontSize:18,fontWeight:700,margin:"0 0 16px",color:"#1e1b4b"}}>得分分布</h2>
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            <div style={{flex:"1 1 300px",background:"#f8fafc",borderRadius:12,border:"1px solid #e2e8f0",padding:16}}>
              <div style={{fontSize:12,fontWeight:600,color:"#64748b",marginBottom:8}}>雷达图</div>
              <div style={{height:260,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,alignContent:"center"}}>
                {radarData.map(d=><div key={d.role} style={{textAlign:"center",padding:9,borderRadius:8,background:"#fff",border:"1px solid #e2e8f0"}}><div style={{fontSize:11,color:"#64748b"}}>{d.role}</div><div style={{fontSize:20,fontWeight:800,color:"#4f46e5"}}>{d.score}</div></div>)}
              </div>
            </div>
            <div style={{flex:"1 1 300px",background:"#f8fafc",borderRadius:12,border:"1px solid #e2e8f0",padding:16}}>
              <div style={{fontSize:12,fontWeight:600,color:"#64748b",marginBottom:8}}>柱状图</div>
              <div style={{height:260,display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
                {barData.map(d=><div key={d.name} style={{display:"flex",alignItems:"center",gap:8}}><span style={{width:55,fontSize:11,color:"#475569"}}>{d.name}</span><div style={{flex:1,height:14,borderRadius:5,background:"#e2e8f0",overflow:"hidden"}}><div style={{height:"100%",width:`${maxS?d.score/maxS*100:0}%`,background:d.color,opacity:.7}}/></div><b style={{width:24,fontSize:11,color:"#475569"}}>{d.score}</b></div>)}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Category detail ─── */}
        <div className="report-page page-break" style={{marginBottom:36}}>
          <div style={{fontSize:11,fontWeight:700,color:"#6366f1",letterSpacing:1.5,marginBottom:8}}>DETAILED ANALYSIS</div>
          <h2 style={{fontSize:18,fontWeight:700,margin:"0 0 16px",color:"#1e1b4b"}}>分类角色详解</h2>

          {CATS.map(cat=>(
            <div key={cat.name} style={{marginBottom:24}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,padding:"8px 12px",borderRadius:8,background:cat.accent,border:`1px solid ${cat.color}30`}}>
                <span style={{fontSize:14}}>{cat.icon}</span>
                <span style={{fontSize:14,fontWeight:700,color:cat.color}}>{cat.name}</span>
                <span style={{fontSize:12,color:"#64748b"}}>{cat.desc}</span>
                <span style={{marginLeft:"auto",fontSize:14,fontWeight:800,color:cat.color}}>{cat.roles.reduce((s,r)=>s+(scores[r]||0),0)} 分</span>
              </div>
              {cat.roles.sort((a,b)=>scores[b]-scores[a]).map(rc=>{
                const r=R[rc],sc=scores[rc],gR=sorted.indexOf(rc)+1;
                return(
                  <div key={rc} style={{border:"1px solid #e2e8f0",borderRadius:10,padding:16,marginBottom:8,borderLeft:`4px solid ${r.color}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                      <span style={{fontSize:16,fontWeight:800,color:r.color}}>{r.name}</span>
                      <span style={{fontSize:11,color:"#94a3b8"}}>{r.code} · {r.en}</span>
                      {gR<=3&&<span style={{fontSize:10,fontWeight:700,padding:"1px 8px",borderRadius:10,background:`${r.color}15`,color:r.color}}>{["主导","次要","第三"][gR-1]}角色</span>}
                      <span style={{marginLeft:"auto",fontSize:22,fontWeight:800,color:r.color}}>{sc}</span>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 20px",fontSize:12.5,lineHeight:1.7,color:"#475569"}}>
                      <div><span style={{fontWeight:700,color:"#1e1b4b",fontSize:11}}>典型特征</span><br/>{r.traits}</div>
                      <div><span style={{fontWeight:700,color:"#1e1b4b",fontSize:11}}>积极特性</span><br/>{r.str}</div>
                      <div><span style={{fontWeight:700,color:"#1e1b4b",fontSize:11}}>容忍的弱点</span><br/>{r.weak}</div>
                      <div><span style={{fontWeight:700,color:"#1e1b4b",fontSize:11}}>团队作用</span><br/>{r.role}</div>
                    </div>
                    <div style={{marginTop:8,padding:"6px 10px",borderRadius:6,background:"#f8fafc",fontSize:11.5,color:"#64748b",lineHeight:1.6}}>
                      💡 {r.note}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* ─── Score table ─── */}
        <div className="report-page page-break" style={{marginBottom:36}}>
          <div style={{fontSize:11,fontWeight:700,color:"#6366f1",letterSpacing:1.5,marginBottom:8}}>SCORE MATRIX</div>
          <h2 style={{fontSize:18,fontWeight:700,margin:"0 0 16px",color:"#1e1b4b"}}>各部分得分明细</h2>
          <div style={{overflowX:"auto",border:"1px solid #e2e8f0",borderRadius:10}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead>
                <tr style={{background:"#f8fafc"}}>
                  <th style={{padding:"8px 10px",textAlign:"left",fontWeight:700,color:"#475569",borderBottom:"2px solid #e2e8f0"}}>部分</th>
                  {ROLE_ORDER.map(rc=><th key={rc} style={{padding:"8px 4px",textAlign:"center",fontWeight:700,color:R[rc].color,borderBottom:"2px solid #e2e8f0",fontSize:11}}>{R[rc].name}</th>)}
                </tr>
              </thead>
              <tbody>
                {SECTIONS.map((_,si)=>(
                  <tr key={si} style={{background:si%2?"#fafbfc":"#fff"}}>
                    <td style={{padding:"6px 10px",color:"#64748b",fontWeight:600,borderBottom:"1px solid #f1f5f9"}}>{si+1}</td>
                    {ROLE_ORDER.map(role=>{
                      const ok=Object.entries(SCORE_MAP[si]).find(([,v])=>v===role)?.[0];
                      const val=ok?ans[si][ok]:0;
                      return <td key={role} style={{padding:"6px 4px",textAlign:"center",fontVariantNumeric:"tabular-nums",
                        color:val>0?"#1e1b4b":"#d1d5db",fontWeight:val>0?700:400,borderBottom:"1px solid #f1f5f9",
                        background:val>=4?`${R[role].color}10`:""}}>{val}</td>;
                    })}
                  </tr>
                ))}
                <tr style={{background:"#f0f0ff"}}>
                  <td style={{padding:"10px 10px",fontWeight:800,color:"#1e1b4b"}}>合计</td>
                  {ROLE_ORDER.map(rc=><td key={rc} style={{padding:"10px 4px",textAlign:"center",fontWeight:800,color:R[rc].color,fontSize:14}}>{scores[rc]}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ─── Development Guide ─── */}
        <div className="report-page page-break" style={{marginBottom:36}}>
          <div style={{fontSize:11,fontWeight:700,color:"#6366f1",letterSpacing:1.5,marginBottom:8}}>DEVELOPMENT GUIDE</div>
          <h2 style={{fontSize:18,fontWeight:700,margin:"0 0 16px",color:"#1e1b4b"}}>发展建议参考</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div style={{border:"1px solid #d1fae5",borderRadius:10,padding:16,background:"#f0fdf4"}}>
              <div style={{fontSize:13,fontWeight:700,color:"#059669",marginBottom:10}}>🟢 核心优势（发挥区）</div>
              {top3.map(rc=>(
                <div key={rc} style={{marginBottom:8,fontSize:12.5,lineHeight:1.6,color:"#374151"}}>
                  <span style={{fontWeight:700,color:R[rc].color}}>{R[rc].name}</span>：{R[rc].str.split("。")[0]}。
                </div>
              ))}
              <div style={{fontSize:11.5,color:"#64748b",marginTop:8,lineHeight:1.6,borderTop:"1px solid #bbf7d0",paddingTop:8}}>
                优先在团队中承担与这些角色匹配的任务，最大化个人贡献。同时注意管理对应的弱点，避免过度发挥变成短板。
              </div>
            </div>
            <div style={{border:"1px solid #fef3c7",borderRadius:10,padding:16,background:"#fffbeb"}}>
              <div style={{fontSize:13,fontWeight:700,color:"#d97706",marginBottom:10}}>🟡 发展空间（关注区）</div>
              {low2.map(rc=>(
                <div key={rc} style={{marginBottom:8,fontSize:12.5,lineHeight:1.6,color:"#374151"}}>
                  <span style={{fontWeight:700,color:R[rc].color}}>{R[rc].name}</span>（{scores[rc]}分）：{R[rc].role.split("；")[0]}。
                </div>
              ))}
              <div style={{fontSize:11.5,color:"#64748b",marginTop:8,lineHeight:1.6,borderTop:"1px solid #fde68a",paddingTop:8}}>
                低分不代表缺陷——说明这些行为模式不是你的自然倾向。在团队组建时，可以寻找互补角色的伙伴来覆盖这些功能。
              </div>
            </div>
          </div>
        </div>

        {/* ─── Footer ─── */}
        <div style={{borderTop:"2px solid #1e1b4b",paddingTop:16,marginTop:40,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div style={{fontSize:11,color:"#94a3b8",lineHeight:1.7,maxWidth:"65%"}}>
            <div style={{fontWeight:700,color:"#64748b",marginBottom:4}}>关于本报告</div>
            本报告基于贝尔宾团队角色自评问卷（SPI）生成，仅反映个人自我认知，不代表完整的行为评估。完整的贝尔宾测评还需结合他评问卷（Observer Assessment）进行 360° 评鉴。大多数人在 2-3 种角色上表现突出，角色分布会因环境和团队而变化。
          </div>
          <div style={{textAlign:"right",fontSize:11,color:"#94a3b8"}}>
            <div style={{fontWeight:700,color:"#64748b"}}>Belbin Team Role</div>
            <div>Self-Perception Inventory</div>
            <div style={{marginTop:4}}>{today}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// MAIN APP
// ════════════════════════════════════════
export default function App(){
  const [phase,setPhase]=useState("intro");
  const [sec,setSec]=useState(0);
  const [ans,setAns]=useState(()=>SECTIONS.map(EMPTY));

  const used=useMemo(()=>Object.values(ans[sec]).reduce((a,b)=>a+b,0),[ans,sec]);
  const allDone=useMemo(()=>ans.every(s=>Object.values(s).reduce((a,b)=>a+b,0)===10),[ans]);
  const scores=useMemo(()=>{
    const t={};ROLE_ORDER.forEach(r=>t[r]=0);
    ans.forEach((sa,si)=>{const m=SCORE_MAP[si];Object.entries(sa).forEach(([k,v])=>{if(m[k])t[m[k]]+=v;});});
    return t;
  },[ans]);
  const sorted=useMemo(()=>[...ROLE_ORDER].sort((a,b)=>scores[b]-scores[a]),[scores]);
  const setP=useCallback((k,v)=>setAns(p=>{const n=[...p];n[sec]={...n[sec],[k]:v};return n;}),[sec]);
  const reset=()=>{setPhase("intro");setSec(0);setAns(SECTIONS.map(EMPTY));};

  const btn={border:"none",borderRadius:10,fontSize:15,fontWeight:700,cursor:"pointer",padding:"13px 0"};

  if(phase==="intro") return(
    <div style={{fontFamily:"-apple-system,'Noto Sans SC',sans-serif",maxWidth:560,margin:"0 auto",padding:"36px 24px",color:"#1e1b4b",background:"#fff",minHeight:"100vh"}}>
      <div style={{textAlign:"center",marginBottom:36}}>
        <div style={{fontSize:11,fontWeight:700,color:"#6366f1",letterSpacing:2,marginBottom:8}}>BELBIN TEAM ROLE</div>
        <h1 style={{fontSize:24,fontWeight:800,margin:"0 0 6px",letterSpacing:"-0.02em"}}>团队测评-贝尔宾</h1>
        <p style={{fontSize:13,color:"#94a3b8",margin:0}}>9 角色完整版 · 自评问卷</p>
      </div>
      <div style={{background:"#f8fafc",borderRadius:12,border:"1px solid #e2e8f0",padding:20,marginBottom:20}}>
        <h2 style={{fontSize:14,fontWeight:700,margin:"0 0 10px",color:"#1e1b4b"}}>测试说明</h2>
        <div style={{fontSize:13.5,lineHeight:1.8,color:"#475569"}}>
          共 <b style={{color:"#4f46e5"}}>7 个部分</b>，每部分 <b style={{color:"#4f46e5"}}>9 个描述（A-I）</b>。将 <b style={{color:"#d97706"}}>10 分</b> 分配给最符合你实际行为的描述——可集中也可分散，每部分总分必须为 10。
        </div>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {CATS.map(c=>(
          <div key={c.name} style={{flex:"1 1 140px",padding:"10px 12px",borderRadius:8,background:c.accent,border:`1px solid ${c.color}25`,fontSize:12,lineHeight:1.5}}>
            <span style={{marginRight:4}}>{c.icon}</span><span style={{color:c.color,fontWeight:700}}>{c.name}</span>
            <div style={{color:"#64748b",marginTop:2}}>{c.roles.map(r=>R[r]?.name).join("、")}</div>
          </div>
        ))}
      </div>
      <div style={{background:"#eef2ff",borderRadius:10,border:"1px solid #c7d2fe",padding:14,marginBottom:28,fontSize:12.5,lineHeight:1.7,color:"#4338ca"}}>
        💡 根据实际行为打分，不是理想中的自己。没有好坏之分。完成后将生成专业测评报告，可导出打印。
      </div>
      <button onClick={()=>setPhase("test")} style={{...btn,width:"100%",background:"linear-gradient(135deg,#4f46e5,#6366f1)",color:"#fff"}}>开始测试</button>
    </div>
  );

  if(phase==="test"){
    const s=SECTIONS[sec],ok=used===10,last=sec===6;
    return(
      <div style={{fontFamily:"-apple-system,'Noto Sans SC',sans-serif",maxWidth:560,margin:"0 auto",padding:"20px 24px",color:"#1e1b4b",background:"#fff",minHeight:"100vh"}}>
        <div style={{display:"flex",gap:3,marginBottom:20}}>
          {SECTIONS.map((_,i)=>{
            const d=Object.values(ans[i]).reduce((a,b)=>a+b,0)===10;
            return <div key={i} onClick={()=>setSec(i)} style={{flex:1,height:4,borderRadius:2,cursor:"pointer",
              background:i===sec?"linear-gradient(90deg,#4f46e5,#818cf8)":d?"#34d399":"#e5e7eb"}}/>;
          })}
        </div>
        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,color:"#94a3b8",marginBottom:3,letterSpacing:1,fontWeight:600}}>第 {s.id} / 7 部分</div>
          <h2 style={{fontSize:17,fontWeight:700,margin:0,lineHeight:1.4}}>{s.title}</h2>
        </div>
        <BudgetBar used={used}/>
        <div style={{background:"#fafbfc",borderRadius:10,border:"1px solid #e5e7eb",padding:"2px 16px",marginBottom:20}}>
          {s.options.map(o=><Pt key={o.key} k={o.key} text={o.text} val={ans[sec][o.key]} onChange={v=>setP(o.key,v)} avail={10-used}/>)}
        </div>
        <div style={{display:"flex",gap:10}}>
          {sec>0&&<button onClick={()=>setSec(s=>s-1)} style={{...btn,flex:1,background:"#f1f5f9",color:"#475569",border:"1px solid #e2e8f0"}}>上一部分</button>}
          <button onClick={()=>{if(last&&allDone)setPhase("result");else if(!last&&ok)setSec(s=>s+1);}} disabled={!ok}
            style={{...btn,flex:1,background:ok?"linear-gradient(135deg,#4f46e5,#6366f1)":"#f1f5f9",color:ok?"#fff":"#d1d5db",cursor:ok?"pointer":"default"}}>
            {last?(allDone?"生成测评报告":"还有未完成"):"下一部分"}
          </button>
        </div>
        {!allDone&&last&&<div style={{marginTop:10,textAlign:"center",fontSize:11,color:"#94a3b8"}}>点击顶部进度条可跳转到任一部分</div>}
      </div>
    );
  }

  return <Report scores={scores} sorted={sorted} ans={ans} onReset={reset}/>;
}
