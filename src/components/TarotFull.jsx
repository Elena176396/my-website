import { useState, useCallback } from "react";

/* ───── CARD DATA ───── */
const CARDS = [
  { name:"愚者",num:"0",s:"☽"},{ name:"魔术师",num:"I",s:"✦"},{ name:"女祭司",num:"II",s:"◈"},
  { name:"女皇",num:"III",s:"❋"},{ name:"皇帝",num:"IV",s:"♛"},{ name:"教皇",num:"V",s:"✝"},
  { name:"恋人",num:"VI",s:"♡"},{ name:"战车",num:"VII",s:"⚔"},{ name:"力量",num:"VIII",s:"☀"},
  { name:"隐士",num:"IX",s:"⚶"},{ name:"命运之轮",num:"X",s:"☸"},{ name:"正义",num:"XI",s:"⚖"},
  { name:"倒吊人",num:"XII",s:"⚓"},{ name:"死神",num:"XIII",s:"☾"},{ name:"节制",num:"XIV",s:"△"},
  { name:"恶魔",num:"XV",s:"⛧"},{ name:"塔",num:"XVI",s:"↯"},{ name:"星星",num:"XVII",s:"★"},
  { name:"月亮",num:"XVIII",s:"☽"},{ name:"太阳",num:"XIX",s:"☀"},{ name:"审判",num:"XX",s:"♆"},
  { name:"世界",num:"XXI",s:"◉"},
];

/* ───── CATEGORIES ───── */
const CATS = [
  { id:"career", name:"事业运势", icon:"⚔", color:"#c9a84c",
    desc:"职业方向与发展趋势", count:3,
    pos:["过去之因","现在之局","未来之势"],
    sub:["影响你走到此刻的因素","当前核心能量","即将展开的趋势"] },
  { id:"love", name:"恋爱感情", icon:"♡", color:"#e07a8f",
    desc:"情感关系与内心渴望", count:5,
    pos:["你的状态","对方能量","关系核心","暗涌挑战","发展走向"],
    sub:["你此刻的情感能量","对方的心理状态","关系的本质","需要面对的考验","感情的演变方向"] },
  { id:"wealth", name:"财富金运", icon:"◈", color:"#e0b44c",
    desc:"财务状况与理财方向", count:4,
    pos:["财源","阻力","转机","行动指引"],
    sub:["主要收入来源的能量","阻碍财富的因素","即将出现的机遇","最佳行动方向"] },
  { id:"study", name:"学业进修", icon:"✦", color:"#7ba4d4",
    desc:"学习深造与能力提升", count:3,
    pos:["根基","瓶颈","突破口"],
    sub:["你的学习基础和积累","当前最大的障碍","打开局面的关键"] },
  { id:"social", name:"人际关系", icon:"☸", color:"#81b29a",
    desc:"社交网络与关系质量", count:4,
    pos:["自我投射","他人镜像","关系盲区","调整指引"],
    sub:["你展现给外界的形象","他人真实的看法","你忽略的关系维度","改善关系的方向"] },
  { id:"energy", name:"身心能量", icon:"☀", color:"#d4956a",
    desc:"身体心理与精神状态", count:3,
    pos:["身","心","灵"],
    sub:["身体层面的能量信号","情绪心理的真实状态","精神层面的内在声音"] },
  { id:"decide", name:"重大抉择", icon:"⚖", color:"#a78bca",
    desc:"关键决策与路径选择", count:5,
    pos:["当前处境","路径 A","路径 B","深层渴望","指引"],
    sub:["你站在什么位置","第一个选择的能量","第二个选择的能量","内心真正想要的","综合给你的建议"] },
  { id:"annual", name:"年度总运", icon:"◉", color:"#c9845c",
    desc:"全年能量与关键节点", count:6,
    pos:["上半年","下半年","贵人","挑战","机遇","总基调"],
    sub:["1-6月的主旋律","7-12月的主旋律","助力你的人或事","年度最大考验","年度最佳窗口","贯穿全年的核心能量"] },
];

/* ───── LAYOUTS ───── */
const LAYOUTS = {
  career:  { cols:3, rows:1, areas:`"a b c"`, cells:["a","b","c"] },
  love:    { cols:3, rows:3, areas:`". d ." "a c b" ". e ."`, cells:["a","b","c","d","e"] },
  wealth:  { cols:3, rows:3, areas:`". a ." "d . b" ". c ."`, cells:["a","b","c","d"] },
  study:   { cols:3, rows:3, areas:`". . c" ". b ." "a . ."`, cells:["a","b","c"] },
  social:  { cols:2, rows:2, areas:`"a b" "c d"`, cells:["a","b","c","d"] },
  energy:  { cols:3, rows:2, areas:`". a ." "b . c"`, cells:["a","b","c"] },
  decide:  { cols:3, rows:3, areas:`"b . c" ". a ." "d . e"`, cells:["a","b","c","d","e"] },
  annual:  { cols:3, rows:2, areas:`"a b c" "d e f"`, cells:["a","b","c","d","e","f"] },
};

/* ───── INTERPRETATIONS: [upright, reversed] per card per category ───── */
const I = {
career:[
["新的职业冒险即将开始，勇敢跳出舒适区，直觉会引导方向","决策过于冲动缺乏规划，需停下审视方向"],
["你已具备成功所需的一切，是时候主动出击展现实力","才华浪费在错误方向上，警惕职场中的信息不对称"],
["相信职业直觉，有些机会需要耐心等待才会显现","忽视了内心的警示信号，需更深入了解真实情况"],
["事业进入丰收期，创造力和领导力都在上升","工作与生活失衡，创造力枯竭，审视投入产出比"],
["建立系统和秩序的时机，适合制定长期职业规划","管理风格过于僵化，需学会灵活变通和授权"],
["寻找职业导师或加入专业圈子将带来突破","过于依赖传统路径，需探索非传统的发展方式"],
["面临重要的职业选择，需遵从内心价值观","职业选择中的价值观冲突，明确什么真正重要"],
["凭借坚定意志力突破障碍，事业即将重大进展","方向不明或动力不足，需集中精力在一个目标上"],
["用耐心和内在力量化解职场挑战，坚持终将突破","自我怀疑正在侵蚀职业信心，需重建自我认同"],
["退出喧嚣深度反思方向，独处和学习将带来洞察","过度封闭或逃避社交，错失重要机会"],
["职业运势正在转好，抓住即将到来的转折点","外部环境变化带来不确定性，在波动中找新立足点"],
["公平的回报即将到来，你的付出会得到认可","可能遭遇不公正待遇，注意合同细节据理力争"],
["换个角度看待职业困局，停滞期实为视角转换的契机","不必要的自我牺牲或拖延，及时止损才是智慧"],
["一个职业阶段正在结束，为新开始腾出空间","害怕改变而死守现状，拒绝转型只会让困境加深"],
["在多个职业目标间找到平衡，稳步前进更适合当前","失去平衡，极端工作方式不可持续"],
["审视束缚你的职业枷锁，认清限制才能真正自由","正在从职业困境中觉醒，解放的契机就在眼前"],
["突然的变化将打破格局，危机中蕴含重建的机会","变革冲击正在减弱，最坏阶段即将过去"],
["希望和灵感回归，职业愿景变得清晰","对职业前景感到迷茫，暂时低谷不代表方向错误"],
["职场中有隐藏信息或未被揭示的真相","困惑正在消散，之前看不清的局势开始明朗"],
["事业光明期到来，充满活力和成就感","成功来得比预期慢，不要否定整体向好的趋势"],
["职业生涯的重大觉醒，听从内心的召唤","逃避对自己职业选择的深度反思"],
["一个完整的职业周期圆满完成，准备更大的舞台","接近目标但尚未达成，最后一步需额外耐心"],
],
love:[
["敞开心扉迎接新的感情冒险，别害怕犯错","感情中过于随性，缺乏真正的投入和承诺"],
["你有足够的魅力去创造理想的关系","言行不一正在消耗对方的信任"],
["倾听内心深处关于感情的声音，答案已在心中","忽视了直觉发出的警告，被表面甜蜜迷惑"],
["充满爱和温柔的丰盛期，感情滋养万物","付出过度导致关系失衡，学会接受也是一种爱"],
["关系需要稳固的承诺和责任感来支撑","过度掌控让对方感到窒息，松开手试试"],
["传统的感情价值观在此刻带来安全感","世俗标准限制了你对爱的理解和表达"],
["灵魂层面的深层连接正在发生","感情选择中面临两难，回到初心去找答案"],
["主动追爱将获得突破性进展","两人方向不一致产生拉锯，需要坦诚沟通"],
["用耐心和温柔化解感情中的难题","不安全感正在蔓延，学会自我疗愈再去爱"],
["独处期有助于看清感情的真相和需要","封闭自己正在错过真正的连接"],
["感情运势的转折点即将到来，保持开放","情感波动期，顺其自然比强求更好"],
["感情中的付出终将得到公平的回应","关系中的不公平已无法忽视，需正面处理"],
["换个角度理解对方的立场和感受","为不值得的感情做着无谓的牺牲"],
["旧的感情模式正在终结，为真爱让路","放不下过去的执念阻碍了新的可能"],
["在热情与理性之间找到美好的平衡","极端的情感波动正在伤害这段关系"],
["审视束缚你的感情模式和深层执念","正在从不健康的关系模式中觉醒"],
["感情真相的揭露将带来意想不到的转机","情感冲击的最坏时刻已经过去"],
["对爱重燃希望，感情前景逐渐明朗","暂时的感情低谷不意味着永远"],
["感情中有未被说出的真话，留意弦外之音","迷雾散去，终于能看清感情的本质"],
["热烈而明亮的感情时刻正在降临","幸福虽比预期来得慢但确实在路上"],
["对过往感情的深刻反思将带来释然和成长","旧伤未愈正在阻碍你打开心门"],
["感情上的圆满和完整感终于到来","离幸福只差最后一步勇气"],
],
wealth:[
["大胆开辟新的收入来源，直觉指向财富","盲目投资或冲动消费，需冷静审视财务"],
["你有将想法变现的能力，行动起来","赚钱方式不可持续，需调整商业模式"],
["财运暗中积聚，耐心等待最佳入场时机","忽略了财务风险的信号，过度乐观"],
["物质丰盛期，收入渠道稳定增长","过度追求物质安全感，忽略了其他价值"],
["建立系统的理财计划，纪律带来财富","财务规划过于保守，错失增长机会"],
["跟随可信赖的财务建议，稳健为主","盲从他人的投资建议导致损失"],
["面临重要的财务选择，听从价值判断","金钱与价值观产生冲突，需重新评估"],
["果断的财务决策将带来丰厚回报","多线同时投入导致资源分散"],
["耐心持有，长期主义终将获得回报","对财务状况焦虑不安，信心动摇"],
["深入研究后再行动，知识就是财富","过度分析导致错失良机"],
["财运正在转折，注意即将出现的窗口","市场波动期，保守持有减少损失"],
["过去的投入将获得公平的财务回报","可能在财务交易中遇到不公正条款"],
["暂时的资金停滞酝酿着更大的回报","为沉没成本继续追加投入，及时止损"],
["旧的收入模式结束，新的财源正在打开","害怕财务变化而守着衰退的收入来源"],
["收支平衡是当前最重要的财务课题","财务状况走向极端，过度节俭或挥霍"],
["审视对金钱的执念，它可能限制了你","正在摆脱对财务的过度焦虑"],
["意外的财务变化打破旧格局，危中有机","最大的财务冲击正在过去"],
["财务前景明朗，值得为长远目标储蓄","对财务未来缺乏信心，但方向没有错"],
["有隐藏的财务信息需要核实","财务迷雾正在散去，真实状况逐渐清晰"],
["财运旺盛期，多个收入渠道同时开花","财务回报延迟但总体趋势向好"],
["重新评估财务目标，对齐你的真实需求","回避财务问题不会让它们消失"],
["一个财务周期圆满收官，成果丰厚","目标接近达成，坚持最后一段路"],
],
study:[
["以初学者心态开启新领域，好奇心是最好的老师","学习缺乏章法，东一榔头西一棒"],
["你有快速掌握新技能的天赋，系统地用起来","学习方法有问题，效率低下需调整"],
["深度阅读和独立思考将带来真正的理解","被碎片化信息淹没，失去了深度学习的能力"],
["知识正在融会贯通，输出和分享加速吸收","学了太多用得太少，知行脱节"],
["建立严格的学习纪律和计划，结构化推进","学习计划过于死板，扼杀了兴趣和创造力"],
["找到好的导师或学习社群事半功倍","过度依赖名师或课程，缺乏独立思考"],
["面临学习方向的选择，追随内心的热情","在多个学习方向间犹豫不决浪费时间"],
["高强度冲刺学习期，动力十足进展迅速","学习方向太多导致精力分散"],
["学习中遇到困难正是成长的标志，坚持","自信心不足影响学习效果，怀疑自己能力"],
["沉下心来独自深耕，这段积累无比重要","闭门造车效率低，需要交流和反馈"],
["学习上的转折点到来，抓住突破的契机","外部干扰打断学习节奏，需要重建规律"],
["努力终将得到公平的考核结果","考评中可能遇到不公，但实力说话"],
["换个学习方法，看似绕路实则是捷径","在低效的学习方式上死磕，换条路试试"],
["告别旧的知识体系，拥抱新的认知框架","害怕学新东西，守着过时的知识不放"],
["平衡学习与休息，持续性比强度重要","要么过度学习要么完全放弃，需找节奏"],
["警惕学习中的自欺欺人，假装努力最可怕","开始认清自己的真实水平，这是好事"],
["考试失利或学习计划被打断，从废墟中重来","学习低谷的最坏时期正在过去"],
["对学习重燃热情，目标变得清晰可及","暂时迷茫不代表选错了方向"],
["学习中有盲区未被发现，需查漏补缺","模糊地带正在清晰，薄弱环节浮出水面"],
["学有所成，知识带来真正的自信和快乐","进步比预期慢，但积累不会说谎"],
["深刻反思学习的初心和终极目标","逃避学习效果的真实检验"],
["一个学习阶段圆满完成，能力质的飞跃","差最后一口气，别在终点前松懈"],
],
social:[
["以真诚和开放姿态开启新的社交圈","社交中过于随意，给人不靠谱的印象"],
["你有整合社交资源的能力，主动连接","社交中的人设不真实，迟早会被看穿"],
["观察多于表达，安静中看透人际真相","过于被动退缩，错过了有价值的关系"],
["你的温暖和包容正在吸引贵人靠近","在关系中过度付出，被人当作理所当然"],
["在社交中建立清晰边界和合理秩序","社交中太强势，让人产生距离感"],
["融入有价值的社群或团体带来归属感","过度从众丧失了自己的立场和个性"],
["面临关系取舍的选择，质量胜过数量","在重要关系之间摇摆，两头都顾不好"],
["主动拓展人脉将取得突破性进展","社交攻势太强让人感到压力"],
["以柔和的方式处理人际冲突，化解矛盾","在社交中不敢表达真实想法"],
["适当远离社交，独处帮你看清谁是真朋友","过度自闭，把真正关心你的人也推远了"],
["人际关系即将迎来重要转折","社交圈的变动让你不安，接受流动性"],
["你在社交中的付出将得到公正的回报","人际关系中遭遇不公平对待"],
["试着理解让你不舒服的那个人的立场","在消耗你的关系中委曲求全"],
["告别不再适合的社交圈，为新关系腾位","不愿放手旧关系阻碍了成长"],
["在社交中找到给予和接受的平衡","社交投入过度或过度退缩都不健康"],
["审视哪些社交关系在消耗你的能量","正在识别和远离有毒的社交关系"],
["一段关系的突然变化带来新的社交格局","人际震荡的最严重阶段正在过去"],
["社交能量回升，吸引志趣相投的新朋友","对社交感到疲惫和失望，但这是暂时的"],
["有人对你的真实态度和表面不同","社交迷雾散去，终于看清谁真谁假"],
["社交中的温暖时刻，友情带来真正的快乐","社交收获比预期少，但真朋友正在来"],
["重新审视你在社交中的角色和定位","回避社交问题不会让关系自动变好"],
["社交关系达到和谐圆满的状态","差一步就能实现重要的社交突破"],
],
energy:[
["身体能量充沛，适合开启新的健康习惯","身体发出疲劳信号，别忽视休息的需要"],
["你有掌控身心状态的能力，行动起来","精力分散在太多事情上，身心俱疲"],
["倾听身体的安静信号，它在告诉你真相","忽视了身体深层的需求和预警"],
["身心处于滋养和恢复的好时期","过度消耗自己来照顾他人，需要自我关怀"],
["建立规律的作息和习惯，纪律带来能量","生活节奏过于刻板，身心失去弹性"],
["寻求专业指导来提升身心状态","过度依赖外部建议，忽略身体自身的智慧"],
["身心正在给你重要的选择信号，倾听它","身体和心灵的需求产生冲突"],
["充沛的意志力推动你突破身心限制","过度透支意志力，身体在抗议"],
["内在力量充足，以柔和方式善待自己","对自己的身心状态缺乏信心"],
["安静独处是当前最好的能量恢复方式","过度隔离导致能量循环中断"],
["身心能量的转折点，好的变化即将到来","能量波动期，顺应而非对抗身体节奏"],
["身心的投入和产出达到公平的平衡","长期的不平衡终于显现出后果"],
["换个角度看待身心的不适，它是信使","为了不值得的目标牺牲身心健康"],
["旧的生活模式结束，更健康的习惯开始","害怕改变生活方式，守着伤害你的习惯"],
["身心灵三者的平衡是当前最大的课题","极端的生活方式正在透支你的底线"],
["审视哪些习惯在暗中消耗你的能量","开始觉察并戒除消耗性的生活模式"],
["突然的身心变化迫使你重视健康","身心最紧张的阶段正在过去"],
["对健康生活重燃希望和动力","暂时的低能量期不代表长期趋势"],
["身心有隐藏的失衡需要关注","身心的困惑正在消散，感觉逐渐回归"],
["身心状态光明通透，充满生命力","恢复速度比预期慢，但方向正确"],
["深刻重新评估自己的生活方式和健康观","回避身心问题只会让积压更深"],
["身心灵达到和谐统一，能量圆满","差最后一步习惯调整就能质变"],
],
decide:[
["以初心面对选择，直觉比分析更准","在选择面前犹豫太久，错过了最佳窗口"],
["你有同时驾驭多个选项的能力","信息过载导致判断失误，简化思考"],
["静下来感受，答案在理性之下的直觉里","忽视了内心的声音，被外界意见牵着走"],
["选择能滋养你的那条路，丰盛会跟随","选了看起来安全但让你枯萎的选项"],
["建立清晰的决策框架和评估标准","过于依赖规则和框架，忽略了情境差异"],
["征求信任之人的意见，但最终你来决定","被他人的期望绑架了你的选择"],
["这个选择关乎价值观，而非利弊计算","试图两全其美反而两头落空"],
["果断行动，犹豫的成本比犯错更大","鲁莽推进而没有想清楚后果"],
["相信自己有承受选择后果的内在力量","恐惧在主导你的决策，而非理性"],
["给自己更多时间思考，不急于做决定","拖延决策本身就是一种选择"],
["关键转折点已到，时机不等人","外部变化打乱了你的决策节奏"],
["用公正客观的标准评估每个选项","决策中存在偏见或信息盲区"],
["换个角度看这个选择，也许第三条路存在","在两个都不理想的选项间硬选"],
["果断告别旧的可能性，为新选择全力投入","害怕关上任何一扇门"],
["在矛盾的选项间寻找中间道路","走极端只因为不愿面对复杂性"],
["警惕「沉没成本」对决策的绑架","正在看清那些表面诱人实则有害的选项"],
["意外事件将帮你做出一直犹豫的决定","被迫做出的选择反而可能是对的"],
["对未来的希望会帮你做出正确的选择","迷茫感暂时遮住了视线，但会散去"],
["决策中有隐藏的变量你还没看到","迷雾散去，该选什么正在变得清晰"],
["最佳选择已经呼之欲出，跟随光亮走","好的选择需要更多时间显现"],
["这是一个重新定义人生的选择时刻","逃避决策等于把命运交给别人"],
["所有选项最终都会通向你该去的地方","选择纠结的最后阶段，即将释然"],
],
annual:[
["充满可能性的开局之年，大胆尝试新事物","年初方向不明，容易在试错中消耗过多"],
["你今年有将愿景变为现实的核心能力","能力被分散在太多项目中，需要聚焦"],
["今年适合深度学习和内在积累","忽视了潜在的风险信号，需提高警觉"],
["丰收和创造力旺盛的一年","过度扩张导致能量透支，量力而行"],
["适合建立长期规划和系统框架的一年","过度依赖计划反而失去灵活应变能力"],
["今年贵人运旺，寻找可信赖的引路人","盲目跟从他人建议，需保持独立判断"],
["年度重大选择将深刻影响未来几年","在关键选择上犹豫不决贯穿全年"],
["意志力和行动力充沛的一年，冲劲十足","多条战线同时推进导致全线疲软"],
["今年的核心主题是耐心和内在力量","自我怀疑在关键时刻削弱执行力"],
["适合沉淀和反思的一年，蓄势待发","过度退缩导致错失年度重要机会"],
["今年运势曲线有明显转折，下半年看好","上半年波动较大，稳住阵脚最重要"],
["你的努力将在今年获得公正的回报","年内可能遭遇不公正事件需维护权益"],
["今年需要换个视角看待一切","为不值得的事投入过多时间和精力"],
["重大的结束和开始将在今年同时发生","抗拒必要的变化会让全年都困在原地"],
["平衡是贯穿今年的核心课题","全年节奏忽快忽慢，需建立稳定感"],
["今年需要认清并打破某个根深蒂固的模式","正在觉醒但过程不会太舒服"],
["突如其来的事件将重塑你的年度计划","年度最大冲击已过，重建正在进行"],
["今年是充满希望和灵感的疗愈之年","年度低谷期需要额外的自我关怀"],
["今年有些真相需要时间才会浮出水面","年末回看会理解年初的困惑"],
["光明、丰盛、成就感满满的一年","好事会来但需要比预期更多的耐心"],
["今年是深刻自我审视和蜕变的一年","逃避内心的拷问只会拖延成长"],
["圆满和完成感将在年底到来","还差最后的冲刺，别在年尾松懈"],
],
};

/* ───── HELPERS ───── */
function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}

/* ───── MAIN ───── */
export default function Tarot(){
  const [phase,setPhase]=useState("home");
  const [catIdx,setCatIdx]=useState(0);
  const [drawn,setDrawn]=useState([]);
  const [flipped,setFlipped]=useState([]);
  const [allRevealed,setAllRevealed]=useState(false);

  const cat=CATS[catIdx];

  const startReading=useCallback((ci)=>{
    setCatIdx(ci);
    const c=CATS[ci];
    const sh=shuffle(CARDS.map((_,i)=>i));
    const cards=sh.slice(0,c.count).map(id=>({id,rev:Math.random()<0.35}));
    setDrawn(cards);
    setFlipped(new Array(c.count).fill(false));
    setAllRevealed(false);
    setPhase("spread");
  },[]);

  const flip=useCallback((i)=>{
    setFlipped(p=>{
      const n=[...p];n[i]=true;
      if(n.every(Boolean)) setTimeout(()=>setAllRevealed(true),700);
      return n;
    });
  },[]);

  return(
    <div style={S.wrap}>
      <style>{CSS}</style>
      {phase==="home"&&<Home onPick={startReading}/>}
      {phase==="spread"&&<Spread cat={cat} catIdx={catIdx} drawn={drawn} flipped={flipped}
        allRevealed={allRevealed} onFlip={flip}
        onHome={()=>setPhase("home")}
        onRedraw={()=>startReading(catIdx)}/>}
    </div>
  );
}

/* ───── HOME ───── */
function Home({onPick}){
  return(
    <div style={S.home}>
      <a href="/tools/#mystic" style={S.toolBack}>← 返回工具集</a>
      <div style={{fontSize:44,marginBottom:4,color:"#c9a84c"}}>✦</div>
      <h1 style={S.title}>塔罗占卜</h1>
      <p style={S.sub}>大阿尔卡纳 · 八大牌阵</p>
      <div style={S.divider}/>
      <p style={{fontSize:14,color:"rgba(232,224,208,0.5)",marginBottom:28,textAlign:"center"}}>
        选择你想占卜的领域
      </p>
      <div style={S.catGrid}>
        {CATS.map((c,i)=>(
          <button key={c.id} style={{...S.catBtn,borderColor:c.color+"66"}} onClick={()=>onPick(i)}>
            <span style={{fontSize:26,display:"block",marginBottom:6,color:c.color}}>{c.icon}</span>
            <span style={{fontSize:15,fontWeight:700,color:"#e8e0d0",letterSpacing:2}}>{c.name}</span>
            <span style={{fontSize:11,color:"rgba(232,224,208,0.4)",marginTop:4,display:"block"}}>{c.count}牌 · {c.desc}</span>
          </button>
        ))}
      </div>
      <p style={{fontSize:11,color:"rgba(232,224,208,0.25)",marginTop:28}}>仅供娱乐，不构成任何决策建议</p>
    </div>
  );
}

/* ───── SPREAD ───── */
function Spread({cat,catIdx,drawn,flipped,allRevealed,onFlip,onHome,onRedraw}){
  const allFlipped=flipped.every(Boolean);
  const L=LAYOUTS[cat.id];

  return(
    <div style={S.spreadWrap}>
      <button onClick={onHome} style={S.backBtn}>← 返回</button>
      <div style={{textAlign:"center",marginBottom:20}}>
        <span style={{fontSize:28,color:cat.color}}>{cat.icon}</span>
        <h2 style={{fontSize:20,color:cat.color,letterSpacing:6,margin:"6px 0 2px",fontWeight:700}}>{cat.name}</h2>
        {!allFlipped&&<p style={{fontSize:13,color:"rgba(232,224,208,0.45)",letterSpacing:2}}>点击卡牌逐张翻开</p>}
      </div>

      <div className="tarot-grid" style={{
        display:"grid",
        gridTemplateAreas:L.areas,
        gridTemplateColumns:`repeat(${L.cols},minmax(96px,140px))`,
        gridTemplateRows:`repeat(${L.rows},auto)`,
        gap:"16px 16px",
        justifyContent:"center",
        alignItems:"start",
        justifyItems:"center",
      }}>
        {drawn.map((d,i)=>(
          <div key={i} style={{gridArea:L.cells[i],textAlign:"center"}}>
            <p style={{fontSize:12,color:cat.color,letterSpacing:3,marginBottom:2,fontWeight:700}}>{cat.pos[i]}</p>
            <p style={{fontSize:10,color:"rgba(232,224,208,0.3)",marginBottom:8,lineHeight:1.3,maxWidth:130}}>{cat.sub[i]}</p>
            {!allRevealed?(
              <div className="tw" onClick={()=>!flipped[i]&&onFlip(i)}>
                <div className={`ti${flipped[i]?" fl":""}`}>
                  <div className="cf cb">
                    <div className="cbp"><span className={`cbs${!flipped[i]?" pulse":""}`} style={{color:cat.color}}>✦</span></div>
                  </div>
                  <div className={`cf cff${d.rev?" rev":""}`} style={{borderColor:cat.color}}>
                    <CardFace card={CARDS[d.id]} color={cat.color}/>
                  </div>
                </div>
              </div>
            ):(
              <div className={`rc${d.rev?" rev":""}`} style={{borderColor:cat.color}}>
                <div className="rci"><CardFace card={CARDS[d.id]} color={cat.color}/></div>
              </div>
            )}
            {flipped[i]&&!allRevealed&&(
              <p className="fu" style={{marginTop:8,fontSize:12,color:cat.color+"cc",letterSpacing:1}}>
                {CARDS[d.id].name} {d.rev?"逆位":"正位"}
              </p>
            )}
          </div>
        ))}
      </div>

      {!allFlipped&&!allRevealed&&(
        <p className="fh" style={{textAlign:"center",marginTop:24,fontSize:13,color:"rgba(201,168,76,0.45)",letterSpacing:2}}>
          {flipped.filter(Boolean).length===0?"选择第一张牌":`还有 ${flipped.filter(f=>!f).length} 张未翻开`}
        </p>
      )}

      {allRevealed&&<Reading cat={cat} catIdx={catIdx} drawn={drawn} onHome={onHome} onRedraw={onRedraw}/>}
    </div>
  );
}

/* ───── CARD FACE ───── */
function CardFace({card,color}){
  return(<>
    <span style={{fontSize:12,color:color+"aa",alignSelf:"flex-start",marginLeft:2,fontWeight:700}}>{card.num}</span>
    <span style={{fontSize:40,color,flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}>{card.s}</span>
    <span style={{fontSize:16,color:"#e8e0d0",letterSpacing:4,fontWeight:700}}>{card.name}</span>
    <span style={{fontSize:12,color:color+"aa",alignSelf:"flex-end",marginRight:2,fontWeight:700,transform:"rotate(180deg)"}}>{card.num}</span>
  </>);
}

/* ───── READING ───── */
function Reading({cat,catIdx,drawn,onHome,onRedraw}){
  const interps=I[cat.id];
  return(
    <div className="fu" style={{width:"100%",maxWidth:560,margin:"12px auto 0"}}>
      <div style={S.rdiv}/>
      <h3 style={{fontSize:18,color:cat.color,textAlign:"center",letterSpacing:6,marginBottom:24,fontWeight:700}}>牌阵解读</h3>
      {drawn.map((d,i)=>(
        <div key={i} style={{...S.ri,borderLeftColor:cat.color+"55"}}>
          <div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:8}}>
            <span style={{fontSize:11,color:cat.color+"99",letterSpacing:3,flexShrink:0}}>{cat.pos[i]}</span>
            <span style={{fontSize:16,color:"#e8e0d0",fontWeight:700,letterSpacing:2}}>
              {CARDS[d.id].name}
              <span style={{fontSize:12,fontWeight:400,marginLeft:6,color:d.rev?"#e07a5f":"#81b29a"}}>
                {d.rev?"逆位 ↓":"正位 ↑"}
              </span>
            </span>
          </div>
          <p style={{fontSize:14,lineHeight:1.85,color:"rgba(232,224,208,0.8)"}}>
            {d.rev?interps[d.id][1]:interps[d.id][0]}
          </p>
        </div>
      ))}
      <div style={{display:"flex",gap:14,justifyContent:"center",marginTop:28,paddingBottom:36,flexWrap:"wrap"}}>
        <button style={S.secBtn} onClick={onHome}>换个牌阵</button>
        <button style={{...S.priBtn,background:`linear-gradient(135deg,${cat.color},${cat.color}99)`}} onClick={onRedraw}>重新占卜</button>
      </div>
    </div>
  );
}

/* ───── STYLES ───── */
const S={
  wrap:{minHeight:"100vh",background:"linear-gradient(180deg,#080520 0%,#0f0a26 50%,#080520 100%)",color:"#e8e0d0",fontFamily:"'Noto Serif SC','Georgia',serif",display:"flex",flexDirection:"column",alignItems:"center",padding:"20px 12px"},
  home:{display:"flex",flexDirection:"column",alignItems:"center",maxWidth:520,width:"100%",paddingTop:40},
  toolBack:{alignSelf:"flex-start",color:"rgba(201,168,76,0.55)",fontSize:13,textDecoration:"none",marginBottom:12},
  title:{fontSize:32,fontWeight:900,color:"#c9a84c",letterSpacing:10,margin:0},
  sub:{fontSize:13,color:"rgba(201,168,76,0.5)",letterSpacing:5,marginTop:6},
  divider:{width:50,height:1,background:"linear-gradient(90deg,transparent,#c9a84c,transparent)",margin:"24px 0"},
  catGrid:{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,width:"100%",maxWidth:400},
  catBtn:{background:"rgba(255,255,255,0.03)",border:"1px solid",borderRadius:12,padding:"18px 12px",cursor:"pointer",textAlign:"center",fontFamily:"inherit",transition:"background 0.2s"},
  spreadWrap:{display:"flex",flexDirection:"column",alignItems:"center",width:"100%",maxWidth:700},
  backBtn:{alignSelf:"flex-start",background:"none",border:"none",color:"rgba(201,168,76,0.5)",fontSize:13,cursor:"pointer",fontFamily:"inherit",marginBottom:8,padding:0},
  rdiv:{width:"100%",height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,0.25),transparent)",marginBottom:24},
  ri:{marginBottom:20,padding:"14px 18px",background:"rgba(201,168,76,0.03)",borderRadius:10,borderLeft:"3px solid"},
  priBtn:{color:"#0f0a26",border:"none",padding:"13px 32px",borderRadius:8,fontSize:15,fontWeight:700,fontFamily:"inherit",cursor:"pointer",letterSpacing:3},
  secBtn:{background:"transparent",color:"#c9a84c",border:"1px solid rgba(201,168,76,0.35)",padding:"13px 28px",borderRadius:8,fontSize:14,fontFamily:"inherit",cursor:"pointer",letterSpacing:2},
};

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
.tw{perspective:800px;cursor:pointer;width:130px;margin:0 auto}
.ti{position:relative;width:130px;height:200px;transition:transform .8s cubic-bezier(.4,0,.2,1);transform-style:preserve-3d}
.ti.fl{transform:rotateY(180deg)}
.cf{position:absolute;inset:0;backface-visibility:hidden;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center}
.cb{background:linear-gradient(135deg,#1a1040,#2d1b69,#1a1040);border:2px solid #c9a84c;box-shadow:0 0 16px rgba(201,168,76,.12)}
.cbp{width:100px;height:160px;border:1px solid rgba(201,168,76,.25);border-radius:6px;display:flex;align-items:center;justify-content:center;background:repeating-conic-gradient(rgba(201,168,76,.05) 0% 25%,transparent 0% 50%) 0 0/16px 16px}
.cbs{font-size:32px}
.cff{background:linear-gradient(170deg,#0f0a26,#1c1245,#0f0a26);border:2px solid;transform:rotateY(180deg);padding:12px;box-shadow:0 0 24px rgba(201,168,76,.15)}
.cff.rev{transform:rotateY(180deg) rotate(180deg)}
.rc{background:linear-gradient(170deg,#0f0a26,#1c1245,#0f0a26);border:2px solid;border-radius:10px;padding:14px 10px;box-shadow:0 0 24px rgba(201,168,76,.15);display:flex;flex-direction:column;align-items:center;width:130px;min-height:200px;margin:0 auto}
.rc.rev .rci{transform:rotate(180deg)}
.rci{display:flex;flex-direction:column;align-items:center;width:100%;flex:1}
.pulse{animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:.45}50%{opacity:1}}
.fu{animation:fu .6s ease-out forwards}
@keyframes fu{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.fh{animation:fh 2s ease-in-out infinite}
@keyframes fh{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@media(max-width:520px){
  .tarot-grid{gap:14px 8px!important}
  .tw,.ti,.rc{width:96px!important}
  .ti{height:150px!important}
  .rc{min-height:150px!important;padding:9px 6px!important}
  .cbp{width:74px!important;height:118px!important}
  .cff{padding:8px 5px!important}
}
`;
