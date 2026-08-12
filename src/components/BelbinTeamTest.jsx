import { useState, useCallback, useMemo } from "react";

const SECTIONS = [
  {
    id: 1, title: "我相信我可以为团队做出积极的贡献，因为：",
    options: [
      { key: "A", text: "我的技术知识和经验通常是我的主要财富" },
      { key: "B", text: "我能与各种类型的人合作共事" },
      { key: "C", text: "我一贯是爱出主意的" },
      { key: "D", text: "我善于发现对实现集体目标有价值的人" },
      { key: "E", text: "我能靠个人的实力把事情办成" },
      { key: "F", text: "如果最终能导致有益的结果，我愿面对暂时的冷遇" },
      { key: "G", text: "我通常能意识到什么是现实的，什么是可能的" },
      { key: "H", text: "在选择行动方案时，我能不带倾向性，也不带偏见地从众多方案中选出一个合理的方案" },
      { key: "I", text: "我一般能够很快发现新机会并加以利用" },
    ],
  },
  {
    id: 2, title: "在团队中，我常常有这样的感觉或表现：",
    options: [
      { key: "A", text: "如果会议没有得到很好的组织、控制和主持，我会感到很不痛快" },
      { key: "B", text: "除非我对此事物比较了解，一般我不会随便提出我的看法" },
      { key: "C", text: "集体讨论新问题时，我属于说得多的" },
      { key: "D", text: "我的看法太客观，有时显得有些不近人情，使我与同事打成一片有困难" },
      { key: "E", text: "为了把事情办成，我有时使人感到强硬以至专断" },
      { key: "F", text: "我发现领导别人很困难，也许是因为我过多考虑别人情绪和团队和谐气氛" },
      { key: "G", text: "我有时过于沉湎于思考自己的主意和想法而忽略了事情的发展和变化" },
      { key: "H", text: "我不愿对不完整、细节不充分的方案发表意见" },
      { key: "I", text: "如果有人有合理的意见而没有充分的机会表达，我会非常倾向于给人家时间和机会" },
    ],
  },
  {
    id: 3, title: "当我与他人共同进行一项工作时：",
    options: [
      { key: "A", text: "我有不施加任何压力就可以影响其他人的能力" },
      { key: "B", text: "一般来讲，我能够有效地避免因大意而引起的错误或遗漏，从而避免给整个运作造成失败" },
      { key: "C", text: "我常在必要时采取行动以保证会议不浪费时间或偏离主题" },
      { key: "D", text: "我总是努力保持自己的行为准则" },
      { key: "E", text: "我乐于支持与大家共同利益有关的积极建议" },
      { key: "F", text: "我热衷寻求最新的思想和新的发展" },
      { key: "G", text: "我相信我的判断能力有助于做出正确的决策" },
      { key: "H", text: "我能使人放心的是，对那些最基本的工作，我都能做得井井有条" },
      { key: "I", text: "人可以信赖我的是我一定可以在会上提出一些有创意的新意见" },
    ],
  },
  {
    id: 4, title: "我在工作团队中的特征是：",
    options: [
      { key: "A", text: "我有兴趣更多地了解我的同事" },
      { key: "B", text: "我会自然地对于其他人的观点和看法提出异议，或个人保留少数意见" },
      { key: "C", text: "只有当我自己比较了解一个事物时，我才会就此事物提出我自己的观点" },
      { key: "D", text: "一旦一项计划被决定下来需要执行，我就有办法使其实施成功" },
      { key: "E", text: "我宁愿下功夫深入了解事物的本质，而不是对事物的了解停留在表面" },
      { key: "F", text: "对承担的任何工作，我都能做到尽善尽美" },
      { key: "G", text: "我乐于与工作团队以外的人进行联系" },
      { key: "H", text: "我善于倾听各方面的意见，但必要时我亦会毫不犹豫地当机立断" },
      { key: "I", text: "对于站不住脚的观点或方案，我通常会找到一系列论据对其加以批驳" },
    ],
  },
  {
    id: 5, title: "在工作中，我得到满足，因为：",
    options: [
      { key: "A", text: "我喜欢对事物进行分析并权衡所有的解决方案" },
      { key: "B", text: "我对寻找解决问题的可行方案感兴趣" },
      { key: "C", text: "我更倾向于建立和保护良好的团队工作关系" },
      { key: "D", text: "我能对决策有强烈的影响" },
      { key: "E", text: "我能适应那些有新意的人" },
      { key: "F", text: "我能使人们在某项必要的行动上达成一致意见" },
      { key: "G", text: "我感到我的身上有一种能使我全身心地投入到工作中去的气质" },
      { key: "H", text: "我很高兴能找到一块可以发挥我想象力的天地" },
      { key: "I", text: "我感觉在我的工作范围内我可以集中精力做好一项工作" },
    ],
  },
  {
    id: 6, title: "如果突然给我一件困难的工作，而且时间有限，人员不熟：",
    options: [
      { key: "A", text: "在有新方案之前，我宁愿先躲进角落，拟定出一个解脱困境的方案" },
      { key: "B", text: "我比较愿意与那些表现出积极态度的人一道工作" },
      { key: "C", text: "我会设法通过让每个成员都发挥长处来完成这项工作量很大的任务" },
      { key: "D", text: "我天生的紧迫感能确保我们按时完成任务" },
      { key: "E", text: "我认为我能保持头脑冷静，富有条理地思考问题" },
      { key: "F", text: "尽管困难重重，我也能保证目标始终如一" },
      { key: "G", text: "如果集体工作没有进展，我会采取积极措施去加以推动" },
      { key: "H", text: "我愿意展开广泛的讨论意在激发新思想，推动工作" },
      { key: "I", text: "我一般会尽量地收集和了解有关这一任务的情况" },
    ],
  },
  {
    id: 7, title: "对于那些在团队工作中或与周围人共事时所遇到的问题：",
    options: [
      { key: "A", text: "我很容易对那些阻碍前进的人表现出不耐烦" },
      { key: "B", text: "别人可能批评我太重理性分析而缺少直觉" },
      { key: "C", text: "有些人不喜欢我致力于检查重要细节以确保其准确的做法" },
      { key: "D", text: "我常常容易产生厌烦感，需要一、二个有激情的人使我振作起来" },
      { key: "E", text: "我经常认为在团队里工作是浪费时间，我想我独自做恐怕会做得更好" },
      { key: "F", text: "对于我遇到的复杂问题，我有时不善于加以解释和澄清" },
      { key: "G", text: "对于那些我不能做的事，我有意识地求助于他人" },
      { key: "H", text: "当我与真正的对立面发生冲突时，我没有把握使对方理解我的观点" },
      { key: "I", text: "当工作目标不明确时，我发现我很难开始工作" },
    ],
  },
];

// Each section maps option key → role code (9 roles, 1 per option)
const SCORE_MAP = [
  { A:"SP", B:"TW", C:"PL", D:"CO", E:"CF", F:"SH", G:"IMP", H:"ME", I:"RI" },
  { A:"IMP", B:"SP", C:"RI", D:"ME", E:"SH", F:"TW", G:"PL", H:"CF", I:"CO" },
  { A:"CO", B:"CF", C:"SH", D:"SP", E:"TW", F:"RI", G:"ME", H:"IMP", I:"PL" },
  { A:"TW", B:"SH", C:"SP", D:"IMP", E:"PL", F:"CF", G:"RI", H:"CO", I:"ME" },
  { A:"ME", B:"IMP", C:"TW", D:"SH", E:"RI", F:"CO", G:"CF", H:"PL", I:"SP" },
  { A:"PL", B:"TW", C:"CO", D:"CF", E:"ME", F:"IMP", G:"SH", H:"RI", I:"SP" },
  { A:"SH", B:"ME", C:"CF", D:"RI", E:"SP", F:"PL", G:"CO", H:"TW", I:"IMP" },
];

const ROLE_ORDER = ["SH","IMP","CF","RI","CO","TW","PL","ME","SP"];

const CATEGORIES = [
  { name: "行动导向", icon: "⚡", color: "#f59e0b", roles: ["SH","IMP","CF"], desc: "任务推进与落地执行" },
  { name: "人际导向", icon: "🤝", color: "#10b981", roles: ["RI","CO","TW"], desc: "团队沟通与人际协调" },
  { name: "思考导向", icon: "🧠", color: "#8b5cf6", roles: ["PL","ME","SP"], desc: "创意、判断与专业深度" },
];

const ROLES = {
  SH: {
    code:"SH", name:"鞭策者", en:"Shaper", color:"#EF4444", icon:"🚀",
    traits:"思维敏捷、坦荡、主动探索、精力充沛",
    strengths:"积极主动，有干劲，随时准备向传统、低效率、自满自足挑战。有紧迫感，视成功为目标，追求高效率。勇于挑战他人，喜欢领导并激励他人采取行动",
    weaknesses:"好激起争端，爱冲动，易急躁，容易给别人压力。说话太直接——总是就事论事，却经常伤人不伤己。对人际关系不敏感，好争辩，不会用幽默或道歉来缓和局势",
    teamRole:"寻找和发现团队讨论中可能的方案；使团队内的任务和目标成形；推动团队达成一致意见并朝决策行动",
    insight:"SH是团队中最具竞争性的角色，通常是领军人物。注意：SH的驱动力是「紧迫感」而非焦虑——遇到困难时会积极找解决办法而不是回避。",
  },
  IMP: {
    code:"IMP", name:"执行者", en:"Implementer", color:"#3B82F6", icon:"⚙️",
    traits:"保守、有责任感、务实可靠、守纪律",
    strengths:"有组织能力、实践经验，工作勤奋，有自我约束力。能把想法转化为实际行动，将自身利益和忠诚与团队紧密相连",
    weaknesses:"缺乏灵活性，应变能力弱。对没有把握的、未被证实的主意不感兴趣，可能阻碍变革",
    teamRole:"把谈话与建议转换为实际步骤；考虑什么行得通、什么行不通；整理建议使之与已有计划和系统相配合",
    insight:"执行者能可靠地执行一个既定计划，但未必擅长制定新计划。朝着目标执行到底的精神，帮助团队不忘初心、更快达成目标。",
  },
  CF: {
    code:"CF", name:"完成者", en:"Completer Finisher", color:"#F97316", icon:"✨",
    traits:"勤奋有序、认真、尽职尽责、易焦虑",
    strengths:"坚持不懈，精益求精，追求完美。擅长检查工作中的纰漏，确保成果尽善尽美。动力来自内在对确保不出差错的渴望",
    weaknesses:"常拘泥于细节，容易为小事焦虑。注意与SH的区别——SH有「紧迫感」，CF是「焦虑感」。不愿放手，甚至吹毛求疵",
    teamRole:"强调任务的目标要求和活动日程表；在方案中寻找并指出错误、遗漏和被忽视的内容；促使团队成员产生时间紧迫的感觉",
    insight:"完成者被内部焦虑所激励，但表面看起来很从容。大多完成者性格内向，不太需要外部激励，更偏好自己来完成所有任务。",
  },
  RI: {
    code:"RI", name:"外交家", en:"Resource Investigator", color:"#10B981", icon:"🌐",
    traits:"性格外向、开朗、热情、好奇心强、联系广泛、消息灵通",
    strengths:"有广泛联系人的能力，不断探索新事物，勇于迎接挑战。与生俱来是谈判高手，善于挖掘新机遇。在听取和发展别人想法时效率极高",
    weaknesses:"事过境迁，见异思迁，兴趣马上转移。当最初的兴奋消逝后，容易对工作失去兴趣",
    teamRole:"提出建议并引入外部信息；接触持有其他观点的个体或群体；参加磋商性质的活动",
    insight:"RI是「外界信息的敏感者」——善于发掘可获得和利用的资源。虽然没有很多原创想法，但擅长把外部资源引入团队。与TW的区别：RI感知外部信息，TW感知人际关系。",
  },
  CO: {
    code:"CO", name:"协调者", en:"Coordinator", color:"#8B5CF6", icon:"🎯",
    traits:"沉着、自信、有控制局面的能力",
    strengths:"对各种有价值的意见不带偏见地兼容并蓄，看问题比较客观。能很快识别对方长处，通过知人善用达成团队目标。沉稳自信，拥有高情商和责任心",
    weaknesses:"在智能以及创造力方面并非超常。可能将团队努力的成果归于自己",
    teamRole:"时刻想着团队大目标，明确目标和方向；选择需要决策的问题并明确优先级；帮助确定角色分工；综合团队的建议",
    insight:"协调者不一定是团队中最聪明的，但拥有远见卓识，能获得成员尊重。最大价值是发挥团队潜力，认识成员的才能并鼓励他们发挥。",
  },
  TW: {
    code:"TW", name:"凝聚者", en:"Team Worker", color:"#EC4899", icon:"💗",
    traits:"擅长人际交往、温和、敏感、合作性强",
    strengths:"有适应周围环境以及人的能力，能促进团队合作。倾听能力最强。灵活性强，善于化解各种矛盾，促进团队精神",
    weaknesses:"在危急时刻往往优柔寡断，一般很中庸。不愿承担压力，当别人反对时容易犹豫退让",
    teamRole:"给予他人支持并帮助别人；打破讨论中的沉默；采取行动扭转或克服团队中的分歧",
    insight:"TW是「人际关系的敏感者」——如果团队在组建之初是一盘散沙，凝聚者就是那个「黏合剂」，精神力量可以将所有人凝聚在一起。",
  },
  PL: {
    code:"PL", name:"智多星", en:"Plant", color:"#FBBF24", icon:"💡",
    traits:"有个性、思想深刻、不拘一格、个人主义",
    strengths:"才华横溢，富有想象力，智慧，知识面广。创造力强，能充当创新者和发明者。充满原创思想",
    weaknesses:"高高在上，不重细节，不拘礼仪。好高骛远，可能忽略实施的可能性。过分强调自己的观点，不善于与气场不合的人交流",
    teamRole:"提供建议；提出批评并引出相反意见；对已有方案提出新的看法",
    insight:"智多星倾向于与团队保持距离，运用想象力独立完成任务。对外界的批判和赞扬反应强烈，想法总是很激进。",
  },
  ME: {
    code:"ME", name:"审议员", en:"Monitor Evaluator", color:"#6366F1", icon:"🔍",
    traits:"清醒、理智、谨慎、不易激动、精确判断",
    strengths:"判断力强，分辨力强，讲求实际。有着与生俱来的对过分热情的免疫力。倾向三思而后行，善于考虑周全后做出明智决定",
    weaknesses:"缺乏鼓动和激发他人的能力，自己也不容易被激发。缺乏想象力和热情，做决定较慢",
    teamRole:"分析问题和情景；对繁杂的材料予以简化并澄清模糊问题；对他人的判断和作用做出评价",
    insight:"ME靠着强大的分析判断能力，敢于直言不讳地提出和坚持异议。具有审议者特征的人所做出的决定，基本上是不会错的。",
  },
  SP: {
    code:"SP", name:"专业师", en:"Specialist", color:"#14B8A6", icon:"🎓",
    traits:"诚心诚意、主动性强、甘于奉献、专注",
    strengths:"具有奉献精神，拥有丰富的专业技能，致力于维护专业标准。为自己获得专业技能和知识感到骄傲。愿意与别人分享知识",
    weaknesses:"局限于狭窄的领域，专注于技术而忽略大局。个性强，常独来独往，不喜欢团队合作。忽视能力之外的因素",
    teamRole:"在关键知识领域提供专业支撑；维持专业标准和深度；为团队带来稀缺的专业能力",
    insight:"专业师首要专注于维持自己的专业度以及对专业知识的不断探究。由于注意力都集中在自己的领域，对其他领域所知甚少。很少有人能一心一意钻研并成为一流专家。",
  },
};

const EMPTY = () => ({A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,I:0});

// ─── Sub-components ───
function Pt({k,text,val,onChange,avail}) {
  const mx = Math.min(10, val + avail);
  const bs = {width:24,height:24,borderRadius:6,border:"none",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,transition:"all .12s"};
  return (
    <div style={{display:"flex",alignItems:"center",gap:8,padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
      <span style={{
        width:24,height:24,borderRadius:5,flexShrink:0,
        background:val>0?"rgba(99,102,241,.2)":"rgba(255,255,255,.03)",
        border:val>0?"1px solid rgba(99,102,241,.4)":"1px solid rgba(255,255,255,.07)",
        display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:11,fontWeight:700,color:val>0?"#a5b4fc":"rgba(255,255,255,.2)",
      }}>{k}</span>
      <span style={{flex:1,fontSize:13.5,lineHeight:1.55,color:"rgba(255,255,255,.72)"}}>{text}</span>
      <div style={{display:"flex",alignItems:"center",gap:3,flexShrink:0}}>
        <button onClick={()=>val>0&&onChange(val-1)} disabled={val===0}
          style={{...bs,background:val>0?"rgba(255,255,255,.07)":"transparent",color:val>0?"rgba(255,255,255,.55)":"rgba(255,255,255,.08)",cursor:val>0?"pointer":"default"}}>−</button>
        <span style={{width:26,textAlign:"center",fontSize:16,fontWeight:800,fontVariantNumeric:"tabular-nums",color:val>0?"#fff":"rgba(255,255,255,.12)"}}>{val}</span>
        <button onClick={()=>mx>val&&onChange(val+1)} disabled={mx<=val}
          style={{...bs,background:mx>val?"rgba(99,102,241,.18)":"transparent",color:mx>val?"#a5b4fc":"rgba(255,255,255,.08)",cursor:mx>val?"pointer":"default"}}>+</button>
      </div>
    </div>
  );
}

function Bar({used}) {
  return (
    <div style={{marginBottom:12}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:12}}>
        <span style={{color:"rgba(255,255,255,.38)"}}>分配分数</span>
        <span style={{fontWeight:700,fontVariantNumeric:"tabular-nums",color:used===10?"#34d399":used>10?"#f87171":"#fbbf24"}}>{used}/10</span>
      </div>
      <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,.05)",overflow:"hidden"}}>
        <div style={{height:"100%",borderRadius:2,transition:"width .25s,background .25s",width:`${Math.min(100,used*10)}%`,
          background:used===10?"#34d399":used>10?"#f87171":"linear-gradient(90deg,#6366f1,#a78bfa)"}}/>
      </div>
    </div>
  );
}

function CatBlock({cat,scores,sorted,maxS,exp,setExp}) {
  return (
    <div style={{marginBottom:18}}>
      <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:8,padding:"7px 10px",borderRadius:7,background:`${cat.color}0d`,border:`1px solid ${cat.color}20`}}>
        <span style={{fontSize:15}}>{cat.icon}</span>
        <span style={{fontSize:13,fontWeight:700,color:cat.color}}>{cat.name}</span>
        <span style={{fontSize:11,color:"rgba(255,255,255,.3)",marginLeft:2}}>{cat.desc}</span>
        <span style={{marginLeft:"auto",fontSize:13,fontWeight:800,color:cat.color,fontVariantNumeric:"tabular-nums"}}>
          {cat.roles.reduce((s,r)=>s+(scores[r]||0),0)}
        </span>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {cat.roles.sort((a,b)=>scores[b]-scores[a]).map(rc=>{
          const r=ROLES[rc],sc=scores[rc],pct=maxS>0?(sc/maxS)*100:0,isE=exp===rc,gR=sorted.indexOf(rc)+1;
          return (
            <div key={rc} onClick={()=>setExp(isE?null:rc)} style={{
              background:"rgba(255,255,255,.025)",borderRadius:9,
              border:gR<=3?`1px solid ${r.color}30`:"1px solid rgba(255,255,255,.04)",
              padding:12,cursor:"pointer",transition:"all .12s",
            }}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:6}}>
                <span style={{fontSize:16}}>{r.icon}</span>
                <span style={{fontSize:14,fontWeight:700,color:"#fff"}}>{r.name}</span>
                <span style={{fontSize:10,color:"rgba(255,255,255,.28)",marginLeft:2}}>{r.code}·{r.en}</span>
                <span style={{flex:1}}/>
                {gR<=3&&<span style={{fontSize:9,fontWeight:700,padding:"1px 7px",borderRadius:9,
                  background:gR===1?`${r.color}22`:"rgba(255,255,255,.05)",
                  color:gR===1?r.color:"rgba(255,255,255,.45)",
                }}>{gR===1?"主导":gR===2?"次要":"第三"}</span>}
                <span style={{fontSize:20,fontWeight:800,color:r.color,fontVariantNumeric:"tabular-nums"}}>{sc}</span>
              </div>
              <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,.04)",marginBottom:isE?10:0,overflow:"hidden"}}>
                <div style={{height:"100%",borderRadius:2,background:r.color,width:`${pct}%`,opacity:.55,transition:"width .4s"}}/>
              </div>
              {isE&&(
                <div style={{fontSize:12.5,lineHeight:1.75,color:"rgba(255,255,255,.55)"}}>
                  {[["典型特征",r.traits],["积极特性",r.strengths],["容忍的弱点",r.weaknesses],["团队作用",r.teamRole]].map(([l,v])=>(
                    <div key={l} style={{marginBottom:5}}>
                      <span style={{color:"rgba(255,255,255,.28)",fontSize:10,fontWeight:600,letterSpacing:.5}}>{l}</span>
                      <div>{v}</div>
                    </div>
                  ))}
                  <div style={{marginTop:6,padding:"7px 10px",borderRadius:7,background:`${r.color}08`,borderLeft:`3px solid ${r.color}35`,fontSize:11.5,lineHeight:1.7,color:"rgba(255,255,255,.5)"}}>
                    💡 {r.insight}
                  </div>
                </div>
              )}
              {!isE&&<div style={{fontSize:10,color:"rgba(255,255,255,.2)",marginTop:3,textAlign:"center"}}>点击展开</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RoleRadar({data}) {
  const size=280,c=size/2,r=92,max=Math.max(...data.map(d=>d.score),1);
  const point=(i,value,extra=0)=>{const a=-Math.PI/2+i*Math.PI*2/data.length,rr=(value/max)*r+extra;return [c+Math.cos(a)*rr,c+Math.sin(a)*rr];};
  const polygon=(value)=>data.map((_,i)=>point(i,value).join(",")).join(" ");
  const values=data.map((d,i)=>point(i,d.score).join(",")).join(" ");
  return <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="280" role="img" aria-label="贝尔宾九角色雷达图">
    {[.25,.5,.75,1].map(v=><polygon key={v} points={polygon(max*v)} fill="none" stroke="rgba(255,255,255,.07)"/>)}
    {data.map((_,i)=>{const [x,y]=point(i,max);return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="rgba(255,255,255,.05)"/>;})}
    <polygon points={values} fill="rgba(99,102,241,.18)" stroke="#6366f1" strokeWidth="2"/>
    {data.map((d,i)=>{const [x,y]=point(i,max,22);return <text key={d.role} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,.55)" fontSize="10">{d.role}</text>;})}
  </svg>;
}

// ─── Main ───
export default function App() {
  const [phase,setPhase]=useState("intro");
  const [sec,setSec]=useState(0);
  const [ans,setAns]=useState(()=>SECTIONS.map(EMPTY));
  const [exp,setExp]=useState(null);

  const used=useMemo(()=>Object.values(ans[sec]).reduce((a,b)=>a+b,0),[ans,sec]);
  const allDone=useMemo(()=>ans.every(s=>Object.values(s).reduce((a,b)=>a+b,0)===10),[ans]);
  const scores=useMemo(()=>{
    const t={};ROLE_ORDER.forEach(r=>t[r]=0);
    ans.forEach((sa,si)=>{const m=SCORE_MAP[si];Object.entries(sa).forEach(([k,v])=>{if(m[k])t[m[k]]+=v;});});
    return t;
  },[ans]);
  const sorted=useMemo(()=>[...ROLE_ORDER].sort((a,b)=>scores[b]-scores[a]),[scores]);
  const maxS=useMemo(()=>Math.max(...Object.values(scores),1),[scores]);
  const setP=useCallback((k,v)=>setAns(p=>{const n=[...p];n[sec]={...n[sec],[k]:v};return n;}),[sec]);
  const reset=()=>{setPhase("intro");setSec(0);setExp(null);setAns(SECTIONS.map(EMPTY));};
  const radarData=ROLE_ORDER.map(r=>({role:ROLES[r].name,score:scores[r],fullMark:70}));
  const btn={border:"none",borderRadius:9,fontSize:14,fontWeight:700,cursor:"pointer",padding:"12px 0",transition:"opacity .12s"};

  // INTRO
  if(phase==="intro") return (
    <div style={{fontFamily:"-apple-system,'Noto Sans SC',sans-serif",maxWidth:520,margin:"0 auto",padding:"32px 18px",color:"#fff",background:"#0c0c1d",minHeight:"100vh"}}>
      <div style={{textAlign:"center",marginBottom:32}}>
        <div style={{fontSize:38,marginBottom:8}}>🧩</div>
        <h1 style={{fontSize:21,fontWeight:800,margin:"0 0 5px",letterSpacing:"-.02em"}}>团队测试-贝尔宾</h1>
        <p style={{fontSize:12,color:"rgba(255,255,255,.38)",margin:0}}>Belbin Team Role · 9 角色完整版</p>
      </div>
      <div style={{background:"rgba(255,255,255,.03)",borderRadius:11,border:"1px solid rgba(255,255,255,.06)",padding:18,marginBottom:16}}>
        <h2 style={{fontSize:13,fontWeight:700,margin:"0 0 8px",color:"rgba(255,255,255,.8)"}}>测试说明</h2>
        <div style={{fontSize:12.5,lineHeight:1.8,color:"rgba(255,255,255,.5)"}}>
          共 <b style={{color:"#a5b4fc"}}>7 部分</b>，每部分 <b style={{color:"#a5b4fc"}}>9 个描述（A-I）</b>。将 <b style={{color:"#fbbf24"}}>10 分</b> 分配给最符合你行为的描述——可以集中也可以分散，每部分总分必须为 10。
        </div>
      </div>
      <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
        {CATEGORIES.map(c=>(
          <div key={c.name} style={{flex:"1 1 130px",padding:"8px 10px",borderRadius:7,background:`${c.color}08`,border:`1px solid ${c.color}15`,fontSize:11,lineHeight:1.5}}>
            <span style={{marginRight:3}}>{c.icon}</span><span style={{color:c.color,fontWeight:700}}>{c.name}</span>
            <div style={{color:"rgba(255,255,255,.3)",marginTop:1}}>{c.roles.map(r=>ROLES[r]?.name).join("、")}</div>
          </div>
        ))}
      </div>
      <div style={{background:"rgba(99,102,241,.05)",borderRadius:9,border:"1px solid rgba(99,102,241,.12)",padding:12,marginBottom:24,fontSize:11.5,lineHeight:1.7,color:"rgba(255,255,255,.42)"}}>
        💡 根据实际行为打分，不是理想中的自己。没有好坏之分。大多数人在 2-3 种角色上表现突出。
      </div>
      <button onClick={()=>setPhase("test")} style={{...btn,width:"100%",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",fontSize:15}}>开始测试</button>
    </div>
  );

  // TEST
  if(phase==="test"){
    const s=SECTIONS[sec],ok=used===10,last=sec===6;
    return (
      <div style={{fontFamily:"-apple-system,'Noto Sans SC',sans-serif",maxWidth:520,margin:"0 auto",padding:"18px 18px",color:"#fff",background:"#0c0c1d",minHeight:"100vh"}}>
        <div style={{display:"flex",gap:2,marginBottom:18}}>
          {SECTIONS.map((_,i)=>{
            const d=Object.values(ans[i]).reduce((a,b)=>a+b,0)===10;
            return <div key={i} onClick={()=>setSec(i)} style={{flex:1,height:3,borderRadius:2,cursor:"pointer",
              background:i===sec?"linear-gradient(90deg,#6366f1,#a78bfa)":d?"#34d399":"rgba(255,255,255,.07)"}}/>;
          })}
        </div>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:10,color:"rgba(255,255,255,.28)",marginBottom:2,letterSpacing:1}}>第 {s.id}/7 部分</div>
          <h2 style={{fontSize:16,fontWeight:700,margin:0,lineHeight:1.4}}>{s.title}</h2>
        </div>
        <Bar used={used}/>
        <div style={{background:"rgba(255,255,255,.015)",borderRadius:9,border:"1px solid rgba(255,255,255,.04)",padding:"1px 12px",marginBottom:18}}>
          {s.options.map(o=><Pt key={o.key} k={o.key} text={o.text} val={ans[sec][o.key]} onChange={v=>setP(o.key,v)} avail={10-used}/>)}
        </div>
        <div style={{display:"flex",gap:8}}>
          {sec>0&&<button onClick={()=>setSec(s=>s-1)} style={{...btn,flex:1,background:"rgba(255,255,255,.05)",color:"rgba(255,255,255,.55)"}}>上一部分</button>}
          <button onClick={()=>{if(last&&allDone)setPhase("result");else if(!last&&ok)setSec(s=>s+1);}} disabled={!ok}
            style={{...btn,flex:1,background:ok?"linear-gradient(135deg,#6366f1,#8b5cf6)":"rgba(255,255,255,.02)",
              color:ok?"#fff":"rgba(255,255,255,.12)",cursor:ok?"pointer":"default"}}>
            {last?(allDone?"查看结果":"还有未完成"):"下一部分"}
          </button>
        </div>
        {!allDone&&last&&<div style={{marginTop:8,textAlign:"center",fontSize:10,color:"rgba(255,255,255,.22)"}}>点击顶部进度条跳转</div>}
      </div>
    );
  }

  // RESULT
  return (
    <div style={{fontFamily:"-apple-system,'Noto Sans SC',sans-serif",maxWidth:580,margin:"0 auto",padding:"24px 18px",color:"#fff",background:"#0c0c1d",minHeight:"100vh"}}>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{fontSize:30,marginBottom:5}}>📊</div>
        <h1 style={{fontSize:19,fontWeight:800,margin:"0 0 3px"}}>测试结果</h1>
        <p style={{fontSize:11,color:"rgba(255,255,255,.32)",margin:0}}>贝尔宾 9 角色分布 · 三大导向归组</p>
      </div>

      {/* Top 3 */}
      <div style={{display:"flex",gap:8,marginBottom:22,justifyContent:"center",flexWrap:"wrap"}}>
        {sorted.slice(0,3).map((r,i)=>(
          <div key={r} style={{background:`${ROLES[r].color}10`,border:`1px solid ${ROLES[r].color}30`,borderRadius:9,padding:"7px 14px",textAlign:"center",minWidth:85}}>
            <div style={{fontSize:9,color:"rgba(255,255,255,.38)"}}>{["主导角色","次要角色","第三角色"][i]}</div>
            <div style={{fontSize:16,margin:"2px 0"}}>{ROLES[r].icon}</div>
            <div style={{fontSize:13,fontWeight:700,color:ROLES[r].color}}>{ROLES[r].name}</div>
            <div style={{fontSize:17,fontWeight:800,color:"#fff",fontVariantNumeric:"tabular-nums"}}>{scores[r]}</div>
          </div>
        ))}
      </div>

      {/* Radar */}
      <div style={{background:"rgba(255,255,255,.02)",borderRadius:12,border:"1px solid rgba(255,255,255,.04)",padding:"14px 2px",marginBottom:22}}>
        <RoleRadar data={radarData}/>
      </div>

      {/* Category sections */}
      {CATEGORIES.map(c=><CatBlock key={c.name} cat={c} scores={scores} sorted={sorted} maxS={maxS} exp={exp} setExp={setExp}/>)}

      {/* Score detail */}
      <details style={{marginBottom:22}}>
        <summary style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,.45)",cursor:"pointer",marginBottom:8}}>📋 各部分得分明细</summary>
        <div style={{background:"rgba(255,255,255,.02)",borderRadius:9,border:"1px solid rgba(255,255,255,.04)",padding:12,overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
            <thead><tr>
              <th style={{padding:"4px 5px",textAlign:"left",color:"rgba(255,255,255,.25)",fontWeight:600,borderBottom:"1px solid rgba(255,255,255,.05)"}}>部分</th>
              {ROLE_ORDER.map(r=><th key={r} style={{padding:"4px 2px",textAlign:"center",fontWeight:600,color:ROLES[r].color,borderBottom:"1px solid rgba(255,255,255,.05)",fontSize:9}}>{ROLES[r].name}</th>)}
            </tr></thead>
            <tbody>
              {SECTIONS.map((_,si)=>(
                <tr key={si}>
                  <td style={{padding:"3px 5px",color:"rgba(255,255,255,.3)",borderBottom:"1px solid rgba(255,255,255,.02)"}}>{si+1}</td>
                  {ROLE_ORDER.map(role=>{
                    const ok=Object.entries(SCORE_MAP[si]).find(([,v])=>v===role)?.[0];
                    const val=ok?ans[si][ok]:0;
                    return <td key={role} style={{padding:"3px 2px",textAlign:"center",fontVariantNumeric:"tabular-nums",
                      color:val>0?"rgba(255,255,255,.65)":"rgba(255,255,255,.08)",fontWeight:val>0?600:400,
                      borderBottom:"1px solid rgba(255,255,255,.02)"}}>{val}</td>;
                  })}
                </tr>
              ))}
              <tr>
                <td style={{padding:"5px 5px",fontWeight:700,color:"rgba(255,255,255,.55)"}}>合计</td>
                {ROLE_ORDER.map(r=><td key={r} style={{padding:"5px 2px",textAlign:"center",fontWeight:800,
                  color:scores[r]>0?ROLES[r].color:"rgba(255,255,255,.08)",fontSize:12,fontVariantNumeric:"tabular-nums"}}>{scores[r]}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      {/* Theory note */}
      <div style={{background:"rgba(99,102,241,.04)",borderRadius:9,border:"1px solid rgba(99,102,241,.1)",padding:12,marginBottom:22,fontSize:11.5,lineHeight:1.8,color:"rgba(255,255,255,.4)"}}>
        <div style={{fontWeight:700,color:"rgba(255,255,255,.55)",marginBottom:3}}>📖 如何看待结果</div>
        <div>大多数人同时具有多种角色特性，一般在 2-3 种方面表现突出。不要过于强调报告结果而忽视个体的可塑性和灵活性。成功团队的关键是成员之间相互了解彼此角色，知道如何弥补不足、借力发挥组合优势。</div>
        <div style={{marginTop:4}}>本问卷为自评问卷（SPI）。完整的贝尔宾测评还包括他评问卷（Observer Assessment），两者结合属于 360° 人才评鉴工具。</div>
      </div>

      {/* Actions */}
      <div style={{display:"flex",gap:8}}>
        <button onClick={reset} style={{...btn,flex:1,background:"rgba(255,255,255,.04)",color:"rgba(255,255,255,.55)"}}>重新测试</button>
        <button onClick={()=>{
          const t=sorted.map((r,i)=>`${i+1}. ${ROLES[r].name}(${r}): ${scores[r]}分`).join("\n");
          const c=CATEGORIES.map(cat=>`${cat.name}${cat.roles.reduce((s,r)=>s+(scores[r]||0),0)}分`).join("，");
          navigator.clipboard?.writeText(`我的团队测试-贝尔宾结果（9角色版）：\n${t}\n\n导向分布：${c}\n\n请帮我解读`);
        }} style={{...btn,flex:1,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff"}}>复制结果用于解读</button>
      </div>
    </div>
  );
}
