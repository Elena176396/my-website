import React, { useState, useRef, useCallback, useEffect } from "react";

/* ══════════ DATA: QUOTES ══════════ */
var Q = [
{"t":"我喜欢温暖，而你恰好是太阳。","c":"情话"},{"t":"想你，是因为想把爱放在身边。","c":"情话"},{"t":"爱情有一千个动人的心弦而又各不相同的音符。","c":"情话"},{"t":"我不看月亮，不说想你，这样月亮和你都蒙在鼓里。","c":"情话"},{"t":"我的肩膀，就是你的电褥子。","c":"情话"},{"t":"你是阳光，所以我愿意等，因为我想抓住唯一的温暖。","c":"情话"},{"t":"天冷了，有什么事到我被窝里说。","c":"情话"},{"t":"没有树的地方叫沙漠，没有你的地方叫寂寞。","c":"情话"},{"t":"想和你，看遍世间风景。","c":"情话"},{"t":"我其实还不错，要不要试着爱上我。","c":"情话"},{"t":"我是嘴笨之人，但一遇到你就出口成章。","c":"情话"},{"t":"太阳射不进的地方，你可以。","c":"情话"},{"t":"人只应当忘记自己而爱别人，这样才能安静、幸福和高尚。","c":"情话"},{"t":"愿倾我毕生之幸，给你一世宠爱！","c":"情话"},{"t":"天给了我双眼，我用它来寻找你。","c":"情话"},{"t":"匆匆一眼误终身，在所有的怦然心动里你仍拔得头筹。","c":"情话"},{"t":"半途而废很不好，所以喜欢你到老。","c":"情话"},{"t":"越是无言的时候，我的思念其实更多！","c":"情话"},{"t":"遇到你的一生，便是奖赏。","c":"情话"},{"t":"如果地球没有地心引力，恐怕我的世界就是你。","c":"情话"},{"t":"从今天开始，你走你的路，我也走你的路。","c":"情话"},{"t":"我爱，不需要缘由，从始自终。","c":"情话"},{"t":"爱情，于我而言就是你的名字。","c":"情话"},{"t":"奈何许！天下人何限，谦谦只为汝。","c":"情话"},{"t":"我要陪你从，新鲜到归属感。","c":"情话"},{"t":"那一世，你为明月，我为清泉，三生华发，一生牵挂。","c":"情话"},{"t":"若你是山，我愿为水，倾心环绕，永远与你相依相偎。","c":"情话"},{"t":"你说我们还小，可爱情也会老。","c":"情话"},{"t":"就算终有一散，也别辜负相遇。好好相遇，好好告别。","c":"情话"},{"t":"分明眼前事，疑似意中人。","c":"情话"},{"t":"你既不能止风，又何必止我于你心动。","c":"情话"},{"t":"人生路上过客很多，他人向东向西向南向北，而我只向你。","c":"情话"},{"t":"千百年后重又想你，像旧雁还能识得故人，却不问归期。","c":"情话"},{"t":"随便一件关于你的事情，我都可以想很久很久。","c":"情话"},{"t":"你应该被抱紧，有风我来顶。","c":"情话"},{"t":"如果能回头，我愿陪你重新来过。","c":"情话"},{"t":"万般皆俗物，只君是上乘。","c":"情话"},{"t":"会当凌绝顶，一……一把抱住你。","c":"情话"},{"t":"你的眼里，我看到了我，我们，还有未来。","c":"情话"},{"t":"我踏遍千山万水，尝尽相思苦味，只想与你守着这份缘。","c":"情话"},
{"t":"传说一个人踩着另一个人的影子两人便会永远在一起","c":"电影台词","s":"七月与安生"},{"t":"人生本来就不公平。","c":"电影台词","s":"哈利波特"},{"t":"我一定会长大，但我不会长成你们这样的大人。","c":"电影台词","s":"小王子"},{"t":"你永远也不会知道，她因为爱你，在你看不到的地方做了什么事。","c":"电影台词","s":"合约男女"},{"t":"睁开眼只能看到世界，闭上眼才能看到心界。","c":"电影台词","s":"催眠大师"},{"t":"星星在哪里都是很亮的，就看你有没有抬头去看他们。","c":"电影台词","s":"玻璃樽"},{"t":"我们选择展现我们的哪一面，那才是真正的我们。","c":"电影台词","s":"哈利波特"},{"t":"她相信一辈子，我相信一句话，你只相信一刹那。","c":"电影台词","s":"相爱相亲"},{"t":"你上次说养我是不是真的？ 是的，等着你呢。","c":"电影台词","s":"喜剧之王"},{"t":"故事的开头总是这样，适逢其会，猝不及防。故事的结局总是这样，花开两朵，天各一方。","c":"电影台词","s":"从你的全世界路过"},{"t":"每个人只能陪你走一段路，迟早是要分开的。","c":"电影台词","s":"山河故人"},{"t":"怕她知道，怕她不知道，怕她知道装作不知道。","c":"电影台词","s":"陆垚知马俐"},{"t":"一次小小的偶遇，可能就是你苦候良久的邂逅。","c":"电影台词","s":"爱乐之城"},{"t":"打我有记忆起，妈妈就是个中年妇女的样子。所以我总忘记，妈妈曾经也是个花季少女。","c":"电影台词","s":"你好，李焕英"},{"t":"你才25岁，你可以成为任何你想成为的人。","c":"电影台词","s":"步履不停"},{"t":"真正的爱情，背后没有秘密。说这话的人，既不明白爱情，也不明白秘密。","c":"电影台词","s":"不能说的秘密"},{"t":"成年人的生活里没有容易二字。","c":"电影台词","s":"天气预报员"},{"t":"幸福不是故事，不幸才是。","c":"电影台词","s":"后来的我们"},{"t":"后来，我们什么都有了，却没有了我们。","c":"电影台词","s":"后来的我们"},{"t":"你唯一的对手，就是昨天的自己。","c":"电影台词","s":"寻梦环游记"},{"t":"我在最好的时候碰到你，是我的运气。","c":"电影台词","s":"一代宗师"},{"t":"愿意陪你长大的人已不多，何况还要陪你变老。","c":"电影台词","s":"春娇救志明"},{"t":"当太阳照耀海面的时候，我就想到你。","c":"电影台词","s":"假如爱有天意"},{"t":"一个始终不被善待的人，最能识别善良，也最珍惜善良。","c":"电影台词","s":"芳华"},{"t":"从来没有一节课教过我们如何变成大人。","c":"电影台词","s":"少年的你"},{"t":"我们一路奋战，不是为了改变世界，而是为了不让世界改变我们。","c":"电影台词","s":"熔炉"},{"t":"希望是一个好东西，也许是最好的东西，好东西是不会消亡的。","c":"电影台词","s":"肖申克的救赎"},{"t":"世界上有那么多的城镇，城镇有那么多的酒馆，而她偏偏走进了我的。","c":"电影台词","s":"卡萨布兰卡"},{"t":"不管前方的路有多苦，只要走的方向正确，都比站在原地更接近幸福。","c":"电影台词","s":"千与千寻"},{"t":"人生就是不断地放下，然而难过的是，我都没能好好的和他们道别。","c":"电影台词","s":"你好，李焕英"},
{"t":"你的一举一动牵动我的一喜一忧，在心中化为点点音符。这也许就是所谓的恋爱吧。","c":"动漫台词","s":"四月是你的谎言"},{"t":"当陪你的人要下车时，即使不舍，也该心存感激，然后挥手道别。","c":"动漫台词","s":"千与千寻"},{"t":"和他相遇的瞬间，我的人生就改变了。目之所及全都开始变得多姿多彩，全世界都开始发光发亮。","c":"动漫台词","s":"四月是你的谎言"},{"t":"有时候，你坚持了最不想做的事情之后，得到的会是你最想要的东西。","c":"动漫台词","s":"天空之城"},{"t":"挡在我们面前的是巨大庞然的人生，阻隔在我们中间的是广阔无际的时间，令我们无能为力。","c":"动漫台词","s":"秒速五厘米"},{"t":"只有阳光而无阴影，只有欢乐而无痛苦，那就不是人生。","c":"动漫台词","s":"岁月的童话"},{"t":"从今以后，生生世世。长相厮守，为你立誓。","c":"动漫台词","s":"银魂"},{"t":"因为你，我愿意成为一个更好的人，只是为了证明我足以与你相配。","c":"动漫台词","s":"侧耳倾听"},{"t":"我们的生命太短，来不及见证天长地久、海角天涯。所以，要活下去。","c":"动漫台词","s":"幽灵公主"},{"t":"我们永远不会知道，谁哪次不经意的跟你说了再见之后，就真的不会再见了。","c":"动漫台词","s":"千与千寻"},{"t":"我不记得你的名字，却还记得喜欢你。","c":"动漫台词","s":"你的名字"},{"t":"停留在手尖的温柔触感，连带着夏天的记忆，都将和我一起一直下去。","c":"动漫台词","s":"萤火之森"},{"t":"我到底要用怎么样的速度生活才能与你再次相遇。","c":"动漫台词","s":"秒速五厘米"},{"t":"时光终有一天会将我们分开，但在那日降临之前，让我们一直在一起吧。","c":"动漫台词","s":"萤火之森"},{"t":"人生就是一列开往坟墓的列车，很难有人可以至始至终陪着走完。","c":"动漫台词","s":"千与千寻"},{"t":"我喜欢了你十年，却用整个四月，编制了一个我不爱你的谎言。","c":"动漫台词","s":"四月是你的谎言"},{"t":"就算我不记得你的名字，我也会一直一直拼命的寻找你。","c":"动漫台词","s":"你的名字"},
{"t":"对于不可言说的东西，我们必须保持沉默。","c":"维特根斯坦","s":"逻辑哲学论"},{"t":"我的语言的界限意味着我的世界的界限。","c":"维特根斯坦","s":"逻辑哲学论"},{"t":"幸福的人的世界与不幸的人的世界是不同的。","c":"维特根斯坦","s":"逻辑哲学论"},{"t":"语言为思想穿上了伪装。","c":"维特根斯坦","s":"逻辑哲学论"},{"t":"人的身体是人的灵魂最好的画像。","c":"维特根斯坦","s":"哲学研究"},{"t":"想象一种语言就是想象一种生活形式。","c":"维特根斯坦","s":"哲学研究"},{"t":"永恒不是无限的时间长度，而是无时间性。","c":"维特根斯坦","s":"逻辑哲学论"},{"t":"告诉我你如何寻找，我便告诉你你在寻找什么。","c":"维特根斯坦","s":"哲学评论"},{"t":"一个真正的告白必须是困难的，否则就不需要了。","c":"维特根斯坦","s":"文化与价值"},{"t":"请记得有时候不说任何话也是一种好的思想。","c":"维特根斯坦","s":"文化与价值"},{"t":"不要想，而要看。","c":"维特根斯坦","s":"哲学研究"},{"t":"解释总会在某个地方终结。","c":"维特根斯坦","s":"哲学研究"},{"t":"梦的语言不是可翻译的。","c":"维特根斯坦","s":"文化与价值"},{"t":"我应该只是一面镜子，让读者在其中看到自己的思想。","c":"维特根斯坦","s":"文化与价值"},{"t":"怀疑只能存在于有问题的地方。","c":"维特根斯坦","s":"论确定性"},{"t":"天才就是勇气。","c":"维特根斯坦","s":"文化与价值"},{"t":"真正的忏悔必须痛苦。","c":"维特根斯坦","s":"文化与价值"},{"t":"信仰就是感到一件事实并非世界的终结。","c":"维特根斯坦","s":"文化与价值"},{"t":"死不是生命中的事件，人不会活着经历死亡。","c":"维特根斯坦","s":"逻辑哲学论"},{"t":"如果一头狮子能说话，我们也不能理解它。","c":"维特根斯坦","s":"哲学研究"},{"t":"如果人们从不做蠢事，就永远不会有聪明的事被做出来。","c":"维特根斯坦","s":"文化与价值"},{"t":"你不能蒙骗别人，如果别人愿意被蒙骗，那不算欺骗。","c":"维特根斯坦","s":"文化与价值"},{"t":"意义不在于世界中，而是在世界之外。","c":"维特根斯坦","s":"逻辑哲学论"},{"t":"即使一切科学问题都被解答了，我们的生命问题仍然没有被触及。","c":"维特根斯坦","s":"逻辑哲学论"},{"t":"世界是所有发生的事情。","c":"维特根斯坦","s":"逻辑哲学论"},
];

/* ══════════ DATA: TRUTH OR DARE ══════════ */
var TOD = {
  duo: {
    truth: [
      "我们第一次见面时，你印象最深的是什么？",
      "我身上第一件真正吸引你的是什么（外表或内在）？",
      "到目前为止，我们之间你最珍贵的回忆是什么？",
      "如果现在可以马上一起去任何地方旅行，你会选哪里？为什么？",
      "我哪个小习惯/怪癖会让你偷偷笑（或有点无奈）？",
      "你第一次意识到自己开始喜欢我的那一刻是什么时候？",
      "有没有一件事是你一直想告诉我，但还没开口的？",
      "你觉得我为你做过最浪漫的事是什么？",
      "如果满分10分，你给\"我选恋爱对象的眼光\"打几分？为什么？",
      "我们之间有没有一件小事，你其实比我想象中更在意？",
      "你最喜欢我身上哪个让你觉得\"很安心\"的特质？",
      "如果可以重来一次我们的初吻/第一次约会，你会想怎么改？",
    ],
    dare: [
      "给我按摩肩膀（或脚）3分钟，计时开始。",
      "在我耳边小声说三件你今天特别喜欢我的事。",
      "重现我们的第一次接吻（或者想象中的初吻）。",
      "用最夸张的方式模仿我平时最有代表性的一个动作/表情。",
      "慢舞一分钟（可以放歌，也可以无音乐）。",
      "写\"我喜欢你因为……\"并完成至少5个句子，然后念出来。",
      "给我一个从背后抱住的拥抱，坚持30秒不松手。",
      "用假口音说一段\"为什么我喜欢你\"。",
      "让我挑一首歌，你必须跟着跳（哪怕很傻）。",
      "画一幅60秒内完成的\"我的肖像\"，然后展示。",
      "轻声在我耳边说一件你最近想尝试的、关于我们的小幻想。",
      "互相用对方手机拍一张最傻的自拍，不许重拍。",
    ],
  },
  group: {
    truth: [
      "你最近撒过的最大一个谎是什么？",
      "你一个人的时候做过最奇怪的事是什么？",
      "有没有假装很喜欢某个礼物？是哪个？",
      "你听过最离谱的绰号是什么？",
      "如果可以和在场某个人交换人生一天，你会选谁？为什么？",
      "你对父母隐瞒过的最大秘密是什么？",
      "如果可以隐形一天，你第一件会做的事是什么？",
      "你人生中最尴尬、最希望大家忘掉的事是什么？",
      "这里谁最有可能\"单身养猫终老\"？为什么？",
      "你最后一次对在场某个人说谎是什么时候？为什么？",
      "你做过最\"罪恶的快感\"是哪首歌/哪部剧？",
      "如果必须从在场的人里\"删除\"一个（只是玩笑），会是谁？",
      "你有没有偷偷翻过别人的手机/社交账号？",
      "你收到过最差、还要假装喜欢的礼物是什么？",
      "你觉得在场谁最有可能在紧急情况下先跑路？",
    ],
    dare: [
      "用抖音/微信给大家指定的人发一条私信（内容由大家定）。",
      "吃一勺纯芥末或很辣的酱。",
      "模仿在场某个人最标志性的动作/说话方式，直到大家满意。",
      "当众唱《青藏高原》最后一句（或任意高难度歌曲）。",
      "和左边的人十指相扣对视10秒。",
      "在房间里跳一段\"贪吃蛇\"舞，或做最夸张的猫步。",
      "让大家用你的手机发一条朋友圈（内容由大家投票决定）。",
      "用尤达大师的语气说话，直到下一轮。",
      "对在场指定的人连续\"爱的吐槽\"1分钟。",
      "蹲在凳子上做便秘状，边做边吃东西10秒。",
      "发起一场30秒集体跳舞，并尽量拉人加入。",
      "用非惯用手画在场某个人，并展示。",
      "打电话给通讯录里第N个人，唱生日快乐歌（即使不是生日）。",
      "做一次最夸张的\"假笑\"，并保持到下一轮。",
      "让两个人给你现场化妆/造型（用现有的东西）。",
    ],
  },
};

/* ══════════ SHARED ══════════ */
var CATS = ["情话","电影台词","动漫台词","维特根斯坦"];
var TH = {
  "情话":     {a:"#E8849E",b:"#FFF0F3",g:"linear-gradient(135deg,#FFF0F3,#FFE4EC)",i:"\u2665"},
  "电影台词": {a:"#D4A24C",b:"#FFF8E8",g:"linear-gradient(135deg,#FFF8E8,#FFF0D0)",i:"\uD83C\uDFAC"},
  "动漫台词": {a:"#5BB8A6",b:"#EEFAF5",g:"linear-gradient(135deg,#EEFAF5,#D8F5EC)",i:"\u2726"},
  "维特根斯坦":{a:"#9B82C0",b:"#F3EFF8",g:"linear-gradient(135deg,#F3EFF8,#E8E0F5)",i:"\u25C8"},
};
var WC=["#F7CAD0","#FFEEAD","#B5EAD7","#D4C5F0","#FDCFCF","#FFF3C4","#C8F0E2","#DDD1F5","#F7CAD0","#FFEEAD","#B5EAD7","#D4C5F0"];

function shuf(a){var b=a.slice();for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=b[i];b[i]=b[j];b[j]=t;}return b;}
function rnd(a){return a[Math.floor(Math.random()*a.length)];}

var YAY=["准确 \u2713","没骗到你","火眼金睛","段位不低","一眼真"];
var NAH=["翻车了","被骗到了","有点意外吧"];

/* ══════════ COMPONENTS ══════════ */

function QCard(props) {
  var q = props.quote;
  var show = props.showSource;
  var ac = props.accent;
  var ex = props.style || {};
  var long = q.t.length > 45;
  return React.createElement("div", {style: Object.assign({
    padding:"36px 28px 28px",background:"rgba(255,255,255,0.72)",
    backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",
    borderRadius:20,border:"1px solid rgba(255,255,255,0.6)",
    boxShadow:"0 8px 32px "+ac+"18, 0 1px 3px rgba(0,0,0,0.04)",
    textAlign:"center",position:"relative",overflow:"hidden",
  },ex)},
    React.createElement("div",{style:{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:40,height:3,borderRadius:2,background:ac,opacity:0.5}}),
    React.createElement("p",{style:{fontSize:long?17:21,lineHeight:2,color:"#3a2e4a",fontWeight:300,letterSpacing:"0.02em"}},
      "\u300C"+q.t+"\u300D"),
    show && q.s ? React.createElement("p",{style:{marginTop:14,fontSize:13,color:ac,fontFamily:"system-ui,sans-serif",fontWeight:500,opacity:0.8}},
      "\u2014\u2014\u300A"+q.s+"\u300B") : null
  );
}

function Tabs(props) {
  var items = [["guess","盲猜来源"],["browse","随机抽取"],["tod","真心话大冒险"]];
  return React.createElement("div",{style:{
    display:"flex",background:"rgba(255,255,255,0.5)",borderRadius:14,
    padding:3,gap:2,backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.6)",marginBottom:24,
  }},
    items.map(function(it){
      var active = props.mode === it[0];
      return React.createElement("button",{key:it[0],onClick:function(){props.set(it[0]);},style:{
        flex:1,padding:"9px 10px",borderRadius:12,border:"none",fontSize:13,
        fontFamily:"'Noto Serif SC',serif",cursor:"pointer",transition:"all .25s",
        background:active?"#fff":"transparent",color:active?"#5a4478":"#b0a0c0",
        boxShadow:active?"0 2px 8px rgba(100,80,140,0.1)":"none",fontWeight:active?600:400,
      }},it[1]);
    })
  );
}

function Btn(props) {
  return React.createElement("button",{onClick:props.onClick,style:Object.assign({
    background:"#fff",border:"1.5px solid #e0d5ec",color:"#9B82C0",
    padding:"8px 32px",borderRadius:24,fontSize:14,cursor:"pointer",
    fontFamily:"'Noto Serif SC',serif",fontWeight:500,
    boxShadow:"0 2px 8px rgba(155,130,192,0.08)",transition:"all .2s",
  },props.style||{})},props.children);
}

/* ══════════ WHEEL (shared) ══════════ */
function Wheel(props) {
  var rot = props.rot;
  var spinning = props.spinning;
  var label = props.label || "转";
  var colors = props.colors || WC;
  var segs = colors.length;
  var paths = [];
  var dots = [];
  var angleEach = 360 / segs;
  for (var i = 0; i < segs; i++) {
    var a1 = (i * angleEach - 90) * Math.PI / 180;
    var a2 = ((i + 1) * angleEach - 90) * Math.PI / 180;
    paths.push(React.createElement("path",{key:i,
      d:"M100,100 L"+(100+90*Math.cos(a1))+","+(100+90*Math.sin(a1))+" A90,90 0 0,1 "+(100+90*Math.cos(a2))+","+(100+90*Math.sin(a2))+" Z",
      fill:colors[i],stroke:"#fff",strokeWidth:1.8,opacity:0.85}));
    var ma = ((i + 0.5) * angleEach - 90) * Math.PI / 180;
    dots.push(React.createElement("circle",{key:"d"+i,cx:100+58*Math.cos(ma),cy:100+58*Math.sin(ma),r:2.5,fill:"#fff",opacity:0.45}));
  }
  return React.createElement("div",{style:{position:"relative",width:200,height:200}},
    React.createElement("div",{style:{position:"absolute",top:-6,left:"50%",transform:"translateX(-50%)",width:0,height:0,borderLeft:"8px solid transparent",borderRight:"8px solid transparent",borderTop:"14px solid #9B82C0",zIndex:10,filter:"drop-shadow(0 1px 2px rgba(100,70,140,0.25))"}}),
    React.createElement("svg",{viewBox:"0 0 200 200",width:200,height:200,style:{
      transform:"rotate("+rot+"deg)",
      transition:spinning?"transform 3s cubic-bezier(0.17,0.67,0.12,0.99)":"none",
      filter:"drop-shadow(0 3px 10px rgba(180,160,200,0.2))",
    }},
      paths, dots,
      React.createElement("circle",{cx:100,cy:100,r:24,fill:"#fff",stroke:"#ede5f5",strokeWidth:1.5}),
      React.createElement("text",{x:100,y:103,textAnchor:"middle",fill:"#9B82C0",fontSize:11,fontWeight:600,style:{fontFamily:"system-ui,sans-serif"}},label)
    )
  );
}

/* ══════════ GUESS MODE ══════════ */
function GuessMode() {
  var _p = useState("idle"), phase = _p[0], setPhase = _p[1];
  var _r = useState(0), rot = _r[0], setRot = _r[1];
  var _c = useState(null), cur = _c[0], setCur = _c[1];
  var _g = useState(null), guess = _g[0], setGuess = _g[1];
  var _m = useState(""), msg = _m[0], setMsg = _m[1];
  var _s = useState({c:0,t:0,s:0,b:0}), sc = _s[0], setSc = _s[1];
  var _h = useState([]), hist = _h[0], setHist = _h[1];
  var _pool = useState(function(){return shuf(Q);}), pool = _pool[0], setPool = _pool[1];
  var _pi = useState(0), pi = _pi[0], setPi = _pi[1];
  var tr = useRef(null);

  var spin = useCallback(function(){
    if(phase==="spinning")return;
    var i=pi,p=pool;
    if(i>=p.length){p=shuf(Q);setPool(p);i=0;}
    setCur(p[i]);setPi(i+1);setGuess(null);setPhase("spinning");
    setRot(function(r){return r+(5+Math.random()*5)*360+Math.random()*360;});
    tr.current=setTimeout(function(){setPhase("guessing");},3000);
  },[phase,pool,pi]);

  var pick = function(cat){
    if(phase!=="guessing")return;
    var ok=cat===cur.c;
    setGuess(cat);setPhase("result");
    setMsg(ok?rnd(YAY):rnd(NAH));
    setSc(function(s){return{c:s.c+(ok?1:0),t:s.t+1,s:ok?s.s+1:0,b:ok?Math.max(s.b,s.s+1):s.b};});
    setHist(function(h){return[{t:cur.t,c:cur.c,s:cur.s,guess:cat,ok:ok}].concat(h).slice(0,50);});
  };

  useEffect(function(){return function(){if(tr.current)clearTimeout(tr.current);};});
  var ok=guess===(cur&&cur.c);
  var acc=sc.t>0?Math.round(sc.c/sc.t*100):0;

  return React.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}},
    React.createElement("div",{style:{display:"flex",gap:14,marginBottom:22,fontSize:13,fontFamily:"'SF Mono','Menlo',monospace",color:"#b0a0c0",background:"rgba(255,255,255,0.45)",borderRadius:20,padding:"7px 22px",border:"1px solid rgba(255,255,255,0.5)"}},
      React.createElement("span",{style:{color:"#7a6898"}},sc.c,React.createElement("span",{style:{opacity:0.4}},"/"+sc.t)),
      React.createElement("span",{style:{color:acc>=60?"#5BB8A6":acc>=40?"#D4A24C":"#E8849E"}},acc+"%"),
      sc.s>0?React.createElement("span",{style:{color:"#E8849E"}},"\uD83D\uDD25"+sc.s):null,
      sc.b>0?React.createElement("span",{style:{color:"#c0b0d8",fontSize:11}},"best "+sc.b):null
    ),
    React.createElement("div",{style:{marginBottom:16}},
      React.createElement(Wheel,{rot:rot,spinning:phase==="spinning",label:phase==="idle"?"转":phase==="spinning"?"···":"?"}),
      (phase==="idle"||phase==="result")?React.createElement("div",{onClick:spin,style:{position:"absolute",top:0,left:0,width:200,height:200,borderRadius:"50%",cursor:"pointer",zIndex:5}}):null
    ),
    (phase==="idle"||phase==="result")?React.createElement(Btn,{onClick:spin,style:{marginBottom:22}},phase==="idle"?"开始":"下一题"):null,
    phase==="spinning"?React.createElement("p",{style:{fontSize:13,color:"#c0b0d0",fontFamily:"system-ui,sans-serif",marginBottom:20}},"转动中…"):null,
    cur&&(phase==="guessing"||phase==="result")?React.createElement("div",{style:{maxWidth:420,width:"100%",marginBottom:20}},
      React.createElement(QCard,{quote:cur,showSource:false,accent:TH[cur.c].a}),
      phase==="result"?React.createElement("div",{style:{textAlign:"center",marginTop:14}},
        React.createElement("span",{style:{display:"inline-block",padding:"5px 18px",borderRadius:20,fontSize:13,fontFamily:"system-ui,sans-serif",background:TH[cur.c].b,color:TH[cur.c].a,fontWeight:600,border:"1px solid "+TH[cur.c].a+"25"}},
          TH[cur.c].i+" "+cur.c+(cur.s?(" \u00B7 \u300A"+cur.s+"\u300B"):"")),
        React.createElement("p",{style:{marginTop:8,fontSize:14,fontFamily:"system-ui,sans-serif",color:ok?"#5BB8A6":"#E8849E",fontWeight:500}},
          ok?msg:(msg+"\u3000\u4F60\u9009\u4E86 "+guess))
      ):null
    ):null,
    phase==="guessing"?React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,maxWidth:320,width:"100%"}},
      CATS.map(function(cat){return React.createElement("button",{key:cat,onClick:function(){pick(cat);},style:{
        padding:"13px 6px",borderRadius:14,border:"1.5px solid "+TH[cat].a+"40",
        background:"rgba(255,255,255,0.65)",color:TH[cat].a,fontSize:15,
        fontFamily:"'Noto Serif SC',serif",fontWeight:500,cursor:"pointer",transition:"all .15s",
      }},TH[cat].i+" "+cat);})
    ):null,
    hist.length>0?React.createElement("div",{style:{marginTop:28,maxWidth:420,width:"100%"}},
      React.createElement("p",{style:{fontSize:11,color:"#c0b0d0",fontFamily:"system-ui,sans-serif",marginBottom:8}},"历史"),
      hist.slice(0,6).map(function(h,i){
        return React.createElement("div",{key:i,style:{display:"flex",alignItems:"center",gap:8,padding:"7px 12px",marginBottom:4,background:"rgba(255,255,255,0.4)",borderRadius:10,borderLeft:"3px solid "+(h.ok?"#a8dcc0":"#f0b0b8"),fontSize:13}},
          React.createElement("span",{style:{flex:1,color:"#7a6898",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},h.t),
          React.createElement("span",{style:{fontSize:11,fontFamily:"system-ui,sans-serif",color:TH[h.c].a,whiteSpace:"nowrap",background:TH[h.c].b,padding:"2px 8px",borderRadius:8}},h.s?("\u300A"+h.s+"\u300B"):TH[h.c].i)
        );
      })
    ):null
  );
}

/* ══════════ BROWSE MODE ══════════ */
function BrowseMode() {
  var _c = useState(null), cat = _c[0], setCat = _c[1];
  var _q = useState(null), cur = _q[0], setCur = _q[1];
  var _t = useState(0), tick = _t[0], setTick = _t[1];
  var pools = useRef({});
  function draw(c) {
    if(!pools.current[c]) pools.current[c]={items:shuf(Q.filter(function(x){return x.c===c;})),idx:0};
    var p = pools.current[c];
    if(p.idx>=p.items.length){p.items=shuf(p.items);p.idx=0;}
    setCat(c); setCur(p.items[p.idx]); p.idx++; setTick(function(t){return t+1;});
  }
  return React.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}},
    React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,maxWidth:320,width:"100%",marginBottom:28}},
      CATS.map(function(c){var active=cat===c;var th=TH[c];
        return React.createElement("button",{key:c,onClick:function(){draw(c);},style:{
          padding:"16px 8px",borderRadius:16,cursor:"pointer",fontSize:15,fontFamily:"'Noto Serif SC',serif",
          fontWeight:active?600:400,transition:"all .25s",border:"1.5px solid "+(active?th.a+"30":"rgba(255,255,255,0.6)"),
          background:active?th.g:"rgba(255,255,255,0.55)",color:active?th.a:"#b0a0c0",
          boxShadow:active?"0 4px 16px "+th.a+"20":"0 1px 4px rgba(0,0,0,0.03)",
        }},th.i+" "+c);
      })
    ),
    cur?React.createElement("div",{key:tick,style:{maxWidth:400,width:"100%"}},
      React.createElement(QCard,{quote:cur,showSource:true,accent:TH[cat].a,style:{background:TH[cat].g,border:"1px solid "+TH[cat].a+"18"}}),
      React.createElement("div",{style:{textAlign:"center",marginTop:16}},
        React.createElement("span",{style:{fontSize:12,fontFamily:"system-ui,sans-serif",color:TH[cat].a,background:"rgba(255,255,255,0.6)",padding:"4px 14px",borderRadius:12,fontWeight:500}},TH[cat].i+" "+cat)
      )
    ):React.createElement("div",{style:{marginTop:20,padding:"40px 20px",textAlign:"center",color:"#c0b0d0",fontSize:14,fontFamily:"system-ui,sans-serif"}},"\u2191 \u9009\u4E00\u4E2A\u5206\u7C7B"),
    cat?React.createElement(Btn,{onClick:function(){draw(cat);},style:{marginTop:24,borderColor:TH[cat].a+"35",color:TH[cat].a}},"换一句"):null
  );
}

/* ══════════ TRUTH OR DARE MODE ══════════ */
function TodMode() {
  var _m = useState(null), todMode = _m[0], setTodMode = _m[1];
  var _p = useState("idle"), phase = _p[0], setPhase = _p[1];
  var _r = useState(0), rot = _r[0], setRot = _r[1];
  var _type = useState(null), todType = _type[0], setTodType = _type[1];
  var _q = useState(null), cur = _q[0], setCur = _q[1];
  var _t = useState(0), tick = _t[0], setTick = _t[1];
  var tr = useRef(null);
  var usedRef = useRef({duo:{truth:[],dare:[]},group:{truth:[],dare:[]}});

  function getNextQ(mode, type) {
    var pool = TOD[mode][type];
    var used = usedRef.current[mode][type];
    var avail = pool.filter(function(x){return used.indexOf(x) === -1;});
    if (avail.length === 0) { usedRef.current[mode][type] = []; avail = pool.slice(); }
    var q = rnd(avail);
    usedRef.current[mode][type].push(q);
    return q;
  }

  function spin() {
    if (phase === "spinning") return;
    setPhase("spinning");
    setCur(null);
    setRot(function(r) { return r + (4 + Math.random() * 4) * 360 + Math.random() * 360; });
    tr.current = setTimeout(function() {
      var finalRot = rot + (4 + Math.random() * 4) * 360 + Math.random() * 360;
      var norm = ((finalRot % 360) + 360) % 360;
      var type = (norm >= 0 && norm < 180) ? "dare" : "truth";
      if (Math.random() > 0.5) type = type === "truth" ? "dare" : "truth";
      setTodType(type);
      setCur(getNextQ(todMode, type));
      setTick(function(t) { return t + 1; });
      setPhase("showing");
    }, 3000);
  }

  useEffect(function() { return function() { if (tr.current) clearTimeout(tr.current); }; }, []);

  var truthColor = "#E8849E";
  var dareColor = "#D4A24C";
  var todWheelColors = [truthColor+"30",dareColor+"30",truthColor+"30",dareColor+"30",truthColor+"30",dareColor+"30",truthColor+"30",dareColor+"30",truthColor+"30",dareColor+"30",truthColor+"30",dareColor+"30"];
  var todWheelFill = ["#FFE4EC","#FFF0D0","#FFE4EC","#FFF0D0","#FFE4EC","#FFF0D0","#FFE4EC","#FFF0D0","#FFE4EC","#FFF0D0","#FFE4EC","#FFF0D0"];

  // Mode selection
  if (!todMode) {
    return React.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",width:"100%",gap:12}},
      React.createElement("p",{style:{fontSize:14,color:"#8a7aa0",marginBottom:8}},"选择玩法"),
      React.createElement("button",{onClick:function(){setTodMode("duo");},style:{
        width:"100%",maxWidth:320,padding:"20px",borderRadius:16,border:"1.5px solid #E8849E30",
        background:"linear-gradient(135deg,#FFF0F3,#FFE4EC)",color:"#9E3A56",fontSize:16,
        fontFamily:"'Noto Serif SC',serif",fontWeight:600,cursor:"pointer",transition:"all .2s",
      }},"\u2665 \u4E24\u4EBA\u73A9\u0020\u00B7\u0020\u60C5\u4FA3\u7248"),
      React.createElement("button",{onClick:function(){setTodMode("group");},style:{
        width:"100%",maxWidth:320,padding:"20px",borderRadius:16,border:"1.5px solid #D4A24C30",
        background:"linear-gradient(135deg,#FFF8E8,#FFF0D0)",color:"#9A7428",fontSize:16,
        fontFamily:"'Noto Serif SC',serif",fontWeight:600,cursor:"pointer",transition:"all .2s",
      }},"\uD83C\uDF89 \u56E2\u4F53\u73A9\u0020\u00B7\u0020\u6D3E\u5BF9\u7248"),
      React.createElement("p",{style:{fontSize:12,color:"#c0b0d0",marginTop:12,textAlign:"center",maxWidth:280,lineHeight:1.6,fontFamily:"system-ui,sans-serif"}},
        "转盘随机决定真心话或大冒险，跳过的惩罚自己约定")
    );
  }

  var isTruth = todType === "truth";
  var typeColor = isTruth ? truthColor : dareColor;
  var typeBg = isTruth ? "#FFF0F3" : "#FFF8E8";
  var typeGrad = isTruth ? "linear-gradient(135deg,#FFF0F3,#FFE4EC)" : "linear-gradient(135deg,#FFF8E8,#FFF0D0)";

  return React.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}},
    // Mode badge + back
    React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:20}},
      React.createElement("button",{onClick:function(){setTodMode(null);setPhase("idle");setCur(null);setTodType(null);},style:{
        background:"none",border:"none",color:"#c0b0d0",cursor:"pointer",fontSize:13,fontFamily:"system-ui,sans-serif",
      }},"\u2190 \u8FD4\u56DE"),
      React.createElement("span",{style:{fontSize:13,color:"#8a7aa0",fontFamily:"system-ui,sans-serif",fontWeight:500}},
        todMode==="duo"?"\u2665 \u4E24\u4EBA\u73A9":"\uD83C\uDF89 \u56E2\u4F53\u73A9")
    ),
    // Wheel
    React.createElement("div",{style:{marginBottom:16}},
      React.createElement(Wheel,{rot:rot,spinning:phase==="spinning",label:phase==="idle"?"转":phase==="spinning"?"···":(isTruth?"真":"冒"),colors:todWheelFill})
    ),
    // Spin button
    (phase==="idle"||phase==="showing")?React.createElement(Btn,{onClick:spin,style:{marginBottom:22}},
      phase==="idle"?"开始转":"\u518D\u8F6C\u4E00\u6B21"
    ):null,
    phase==="spinning"?React.createElement("p",{style:{fontSize:13,color:"#c0b0d0",fontFamily:"system-ui,sans-serif",marginBottom:20}},"命运抉择中…"):null,
    // Result card
    cur?React.createElement("div",{key:tick,style:{maxWidth:420,width:"100%",marginBottom:16}},
      React.createElement("div",{style:{
        padding:"32px 24px 24px",background:typeGrad,borderRadius:20,
        border:"1px solid "+typeColor+"20",textAlign:"center",position:"relative",overflow:"hidden",
        boxShadow:"0 8px 32px "+typeColor+"15",
      }},
        // Type badge at top
        React.createElement("div",{style:{
          display:"inline-block",padding:"4px 16px",borderRadius:20,fontSize:12,fontWeight:600,
          fontFamily:"system-ui,sans-serif",background:"rgba(255,255,255,0.7)",color:typeColor,
          marginBottom:16,border:"1px solid "+typeColor+"25",
        }},isTruth?"\u2764\uFE0F \u771F\u5FC3\u8BDD":"\uD83C\uDFAF \u5927\u5192\u9669"),
        // Question text
        React.createElement("p",{style:{
          fontSize:cur.length>30?17:19,lineHeight:2,color:"#3a2e4a",fontWeight:400,
        }},cur)
      )
    ):null,
    // Skip / next from same type
    cur?React.createElement("div",{style:{display:"flex",gap:10}},
      React.createElement("button",{onClick:function(){setCur(getNextQ(todMode,todType));setTick(function(t){return t+1;});},style:{
        background:"rgba(255,255,255,0.6)",border:"1px solid "+typeColor+"30",color:typeColor,
        padding:"6px 20px",borderRadius:20,fontSize:13,cursor:"pointer",fontFamily:"'Noto Serif SC',serif",fontWeight:500,
      }},"\u6362\u4E00\u9898")
    ):null
  );
}

/* ══════════ APP ══════════ */
export default function App() {
  var _m = useState("guess"), mode = _m[0], setMode = _m[1];
  var titles = {guess:"盲猜来源",browse:"随机抽取",tod:"真心话大冒险"};

  return React.createElement("div",{style:{
    minHeight:"100vh",
    background:"linear-gradient(165deg,#FFFBF5 0%,#FEF5F8 30%,#F5F2FC 65%,#F2FAF7 100%)",
    fontFamily:"'Noto Serif SC','Source Han Serif SC',Georgia,serif",
    display:"flex",flexDirection:"column",alignItems:"center",padding:"32px 16px",
  }},
    React.createElement("a",{href:"/tools/#spark",style:{
      alignSelf:"flex-start",maxWidth:480,width:"100%",margin:"0 auto 18px",color:"#9b8baa",
      fontSize:13,fontFamily:"system-ui,sans-serif",fontWeight:600,textDecoration:"none",
    }},"← 返回工具集"),
    React.createElement("style",null,
      "@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;600;700&display=swap');* { box-sizing: border-box; margin: 0; padding: 0; }"
    ),
    React.createElement("p",{style:{fontSize:11,letterSpacing:"0.35em",color:"#c0b0d0",fontFamily:"system-ui,sans-serif",fontWeight:500,marginBottom:6}},
      "\u60C5\u8BDD \u00B7 \u7535\u5F71 \u00B7 \u52A8\u6F2B \u00B7 \u54F2\u5B66 \u00B7 \u6E38\u620F"),
    React.createElement("h1",{style:{fontSize:24,fontWeight:700,color:"#4a3860",letterSpacing:"0.12em",marginBottom:22}},
      titles[mode]),
    React.createElement(Tabs,{mode:mode,set:setMode}),
    React.createElement("div",{style:{maxWidth:480,width:"100%"}},
      mode==="guess"?React.createElement(GuessMode):
      mode==="browse"?React.createElement(BrowseMode):
      React.createElement(TodMode)
    )
  );
}
