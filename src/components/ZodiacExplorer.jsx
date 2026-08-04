import { useState, useEffect, useMemo, useCallback } from 'react';

const SIGNS = [
  {
    name: '白羊座', en: 'Aries', symbol: '♈', element: '火', elementEn: 'Fire',
    ruler: '火星 Mars', dateRange: '3.21 – 4.19',
    mainStar: 'Hamal (娄宿三)', magnitude: '2.0等',
    bestView: '12月', area: '441 平方度', rank: 39,
    personality: ['开拓者', '行动派', '直率', '好胜', '热情'],
    compatible: ['狮子座', '射手座', '双子座'],
    stars: [
      { x: 200, y: 140, r: 4, name: 'Hamal' },
      { x: 260, y: 120, r: 3, name: 'Sheratan' },
      { x: 300, y: 135, r: 2.5, name: 'Mesarthim' },
      { x: 160, y: 180, r: 2, name: '41 Ari' },
    ],
    lines: [[0,1],[1,2],[0,3]],
    lore: '黄道第一宫，春分点曾位于此。主星娄宿三是一颗K型橙巨星，距地球约66光年。'
  },
  {
    name: '金牛座', en: 'Taurus', symbol: '♉', element: '土', elementEn: 'Earth',
    ruler: '金星 Venus', dateRange: '4.20 – 5.20',
    mainStar: 'Aldebaran (毕宿五)', magnitude: '0.85等',
    bestView: '1月', area: '797 平方度', rank: 17,
    personality: ['稳重', '务实', '耐心', '固执', '感官敏锐'],
    compatible: ['处女座', '摩羯座', '巨蟹座'],
    stars: [
      { x: 180, y: 160, r: 5, name: 'Aldebaran' },
      { x: 220, y: 130, r: 3, name: 'Elnath' },
      { x: 200, y: 110, r: 2.5, name: 'θ Tau' },
      { x: 160, y: 120, r: 2.5, name: 'γ Tau' },
      { x: 240, y: 180, r: 2, name: 'ζ Tau' },
      { x: 130, y: 90, r: 2, name: 'Alcyone' },
      { x: 140, y: 100, r: 1.5, name: 'Atlas' },
    ],
    lines: [[0,1],[0,3],[3,2],[2,1],[1,4],[5,6]],
    lore: '含毕星团(V字形)和昴星团(七姐妹)两个肉眼可见疏散星团。毕宿五是一颗红巨星，视星等0.85，夜空第14亮恒星。'
  },
  {
    name: '双子座', en: 'Gemini', symbol: '♊', element: '风', elementEn: 'Air',
    ruler: '水星 Mercury', dateRange: '5.21 – 6.21',
    mainStar: 'Pollux (北河三)', magnitude: '1.14等',
    bestView: '2月', area: '514 平方度', rank: 30,
    personality: ['多变', '好奇', '机智', '健谈', '适应力强'],
    compatible: ['天秤座', '水瓶座', '白羊座'],
    stars: [
      { x: 160, y: 80, r: 4.5, name: 'Castor' },
      { x: 210, y: 90, r: 4.5, name: 'Pollux' },
      { x: 150, y: 140, r: 2.5, name: 'Mebsuta' },
      { x: 200, y: 150, r: 2.5, name: 'Wasat' },
      { x: 140, y: 210, r: 2, name: 'Tejat' },
      { x: 220, y: 220, r: 2, name: 'Alhena' },
    ],
    lines: [[0,2],[2,4],[1,3],[3,5],[0,1],[2,3]],
    lore: '北河二是六合星系统，肉眼看一颗实为六颗星。北河三是距地球最近的红巨星之一，约34光年，已确认有一颗系外行星。'
  },
  {
    name: '巨蟹座', en: 'Cancer', symbol: '♋', element: '水', elementEn: 'Water',
    ruler: '月亮 Moon', dateRange: '6.22 – 7.22',
    mainStar: 'Tarf (柳宿增十)', magnitude: '3.5等',
    bestView: '3月', area: '506 平方度', rank: 31,
    personality: ['敏感', '重情', '保护欲强', '念旧', '直觉强'],
    compatible: ['天蝎座', '双鱼座', '金牛座'],
    stars: [
      { x: 180, y: 120, r: 3, name: 'Acubens' },
      { x: 230, y: 140, r: 3.5, name: 'Tarf' },
      { x: 200, y: 170, r: 2.5, name: 'Asellus B.' },
      { x: 220, y: 190, r: 2.5, name: 'Asellus A.' },
      { x: 210, y: 175, r: 2, name: 'Praesepe' },
    ],
    lines: [[0,2],[2,3],[3,1],[0,1]],
    lore: '虽然星座本身暗淡，但包含鬼星团(M44/蜂巢星团)，肉眼可见的疏散星团，含约1000颗恒星，距地约577光年。'
  },
  {
    name: '狮子座', en: 'Leo', symbol: '♌', element: '火', elementEn: 'Fire',
    ruler: '太阳 Sun', dateRange: '7.23 – 8.22',
    mainStar: 'Regulus (轩辕十四)', magnitude: '1.4等',
    bestView: '4月', area: '947 平方度', rank: 12,
    personality: ['领袖', '自信', '慷慨', '戏剧化', '忠诚'],
    compatible: ['白羊座', '射手座', '天秤座'],
    stars: [
      { x: 140, y: 200, r: 5, name: 'Regulus' },
      { x: 160, y: 140, r: 3.5, name: 'η Leo' },
      { x: 190, y: 100, r: 3, name: 'Algieba' },
      { x: 230, y: 80, r: 2.5, name: 'Zosma' },
      { x: 280, y: 90, r: 3, name: 'Denebola' },
      { x: 250, y: 120, r: 2.5, name: 'θ Leo' },
      { x: 170, y: 80, r: 2, name: 'Adhafera' },
    ],
    lines: [[0,1],[1,2],[2,6],[2,3],[3,5],[5,4],[3,4]],
    lore: '轩辕十四位于黄道极近处，是"四大王星"之一。它实际是四颗星的系统，主星自转极快，赤道转速达光速的86%。'
  },
  {
    name: '处女座', en: 'Virgo', symbol: '♍', element: '土', elementEn: 'Earth',
    ruler: '水星 Mercury', dateRange: '8.23 – 9.22',
    mainStar: 'Spica (角宿一)', magnitude: '0.97等',
    bestView: '5月', area: '1294 平方度', rank: 2,
    personality: ['细致', '分析力强', '谦逊', '完美主义', '实际'],
    compatible: ['金牛座', '摩羯座', '天蝎座'],
    stars: [
      { x: 240, y: 240, r: 5, name: 'Spica' },
      { x: 200, y: 140, r: 3, name: 'Zavijava' },
      { x: 230, y: 110, r: 3, name: 'Porrima' },
      { x: 270, y: 100, r: 2.5, name: 'Auva' },
      { x: 300, y: 130, r: 2.5, name: 'Vindemiatrix' },
      { x: 180, y: 180, r: 2, name: 'η Vir' },
    ],
    lines: [[0,5],[5,1],[1,2],[2,3],[3,4],[2,0]],
    lore: '黄道星座中面积第二大。角宿一是一对相互潮汐变形的蓝巨星，总光度为太阳的12000倍。处女座星系团包含约2000个星系。'
  },
  {
    name: '天秤座', en: 'Libra', symbol: '♎', element: '风', elementEn: 'Air',
    ruler: '金星 Venus', dateRange: '9.23 – 10.23',
    mainStar: 'Zubeneschamali (氐宿四)', magnitude: '2.6等',
    bestView: '6月', area: '538 平方度', rank: 29,
    personality: ['公正', '优雅', '犹豫', '合作', '审美力强'],
    compatible: ['双子座', '水瓶座', '狮子座'],
    stars: [
      { x: 160, y: 100, r: 3.5, name: 'Zubenelgenubi' },
      { x: 250, y: 90, r: 3.5, name: 'Zubeneschamali' },
      { x: 180, y: 180, r: 2.5, name: 'σ Lib' },
      { x: 270, y: 170, r: 2.5, name: 'υ Lib' },
    ],
    lines: [[0,1],[0,2],[1,3],[2,3]],
    lore: '唯一以无生命物体命名的黄道星座。氐宿四是罕见的肉眼可见绿色恒星（存有争议）。秋分点曾位于此星座。'
  },
  {
    name: '天蝎座', en: 'Scorpius', symbol: '♏', element: '水', elementEn: 'Water',
    ruler: '冥王星 Pluto', dateRange: '10.24 – 11.22',
    mainStar: 'Antares (心宿二)', magnitude: '0.96等',
    bestView: '7月', area: '497 平方度', rank: 33,
    personality: ['深邃', '意志力强', '洞察力', '占有欲', '变革者'],
    compatible: ['巨蟹座', '双鱼座', '处女座'],
    stars: [
      { x: 200, y: 110, r: 5, name: 'Antares' },
      { x: 170, y: 80, r: 3, name: 'Graffias' },
      { x: 150, y: 90, r: 2.5, name: 'Dschubba' },
      { x: 220, y: 150, r: 2.5, name: 'τ Sco' },
      { x: 250, y: 190, r: 2.5, name: 'Sargas' },
      { x: 270, y: 220, r: 3, name: 'Shaula' },
      { x: 260, y: 230, r: 2.5, name: 'Lesath' },
    ],
    lines: [[2,1],[1,0],[0,3],[3,4],[4,5],[5,6]],
    lore: '心宿二意为"火星的对手"，是一颗红超巨星，直径约太阳的680倍。若置于太阳位置，其表面将延伸至火星轨道。'
  },
  {
    name: '射手座', en: 'Sagittarius', symbol: '♐', element: '火', elementEn: 'Fire',
    ruler: '木星 Jupiter', dateRange: '11.23 – 12.21',
    mainStar: 'Kaus Australis (箕宿三)', magnitude: '1.8等',
    bestView: '8月', area: '867 平方度', rank: 15,
    personality: ['乐观', '哲学家', '自由', '冒险', '坦诚'],
    compatible: ['白羊座', '狮子座', '水瓶座'],
    stars: [
      { x: 200, y: 160, r: 4, name: 'Kaus Australis' },
      { x: 190, y: 120, r: 3, name: 'Kaus Media' },
      { x: 170, y: 100, r: 3, name: 'Kaus Borealis' },
      { x: 230, y: 130, r: 3, name: 'Ascella' },
      { x: 250, y: 110, r: 2.5, name: 'Nunki' },
      { x: 220, y: 90, r: 2.5, name: 'φ Sgr' },
      { x: 160, y: 140, r: 2, name: 'Alnasl' },
    ],
    lines: [[0,1],[1,2],[0,3],[3,4],[4,5],[5,1],[1,6]],
    lore: '银河系中心方向位于射手座内。茶壶星群是其最易辨认的部分。该区域密布星云：礁湖星云(M8)、三裂星云(M20)等。'
  },
  {
    name: '摩羯座', en: 'Capricornus', symbol: '♑', element: '土', elementEn: 'Earth',
    ruler: '土星 Saturn', dateRange: '12.22 – 1.19',
    mainStar: 'Deneb Algedi (垒壁阵四)', magnitude: '2.9等',
    bestView: '9月', area: '414 平方度', rank: 40,
    personality: ['自律', '目标感', '责任心', '现实', '耐力强'],
    compatible: ['金牛座', '处女座', '双鱼座'],
    stars: [
      { x: 150, y: 130, r: 3.5, name: 'Algedi' },
      { x: 180, y: 100, r: 2.5, name: 'Dabih' },
      { x: 230, y: 110, r: 2.5, name: 'ψ Cap' },
      { x: 270, y: 140, r: 3.5, name: 'Deneb Algedi' },
      { x: 250, y: 170, r: 2.5, name: 'Nashira' },
      { x: 200, y: 180, r: 2, name: 'ζ Cap' },
    ],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]],
    lore: '冬至点曾位于此星座（故南回归线英文为Tropic of Capricorn）。牛郎星(α Aql)离此不远。主星牛宿二其实是肉眼双星。'
  },
  {
    name: '水瓶座', en: 'Aquarius', symbol: '♒', element: '风', elementEn: 'Air',
    ruler: '天王星 Uranus', dateRange: '1.20 – 2.18',
    mainStar: 'Sadalsuud (虚宿一)', magnitude: '2.9等',
    bestView: '10月', area: '980 平方度', rank: 10,
    personality: ['独立', '创新', '人道主义', '叛逆', '理想主义'],
    compatible: ['双子座', '天秤座', '射手座'],
    stars: [
      { x: 180, y: 80, r: 3.5, name: 'Sadalmelik' },
      { x: 220, y: 100, r: 3.5, name: 'Sadalsuud' },
      { x: 200, y: 140, r: 2.5, name: 'Sadachbia' },
      { x: 230, y: 170, r: 2, name: 'ι Aqr' },
      { x: 250, y: 200, r: 2, name: 'λ Aqr' },
      { x: 210, y: 210, r: 2.5, name: 'Skat' },
    ],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[2,5]],
    lore: '含土星星云(NGC 7009)和螺旋星云(NGC 7293)——最近的行星状星云之一，距地约650光年，被称为"上帝之眼"。'
  },
  {
    name: '双鱼座', en: 'Pisces', symbol: '♓', element: '水', elementEn: 'Water',
    ruler: '海王星 Neptune', dateRange: '2.19 – 3.20',
    mainStar: 'Alpherg (外屏七)', magnitude: '3.6等',
    bestView: '11月', area: '889 平方度', rank: 14,
    personality: ['共情力强', '浪漫', '直觉', '梦想家', '艺术感'],
    compatible: ['巨蟹座', '天蝎座', '摩羯座'],
    stars: [
      { x: 160, y: 100, r: 3, name: 'Alpherg' },
      { x: 130, y: 140, r: 2.5, name: 'ε Psc' },
      { x: 150, y: 180, r: 2, name: 'δ Psc' },
      { x: 200, y: 160, r: 2.5, name: 'ω Psc' },
      { x: 250, y: 130, r: 2.5, name: 'ι Psc' },
      { x: 270, y: 160, r: 2, name: 'λ Psc' },
      { x: 230, y: 180, r: 2, name: 'κ Psc' },
    ],
    lines: [[0,1],[1,2],[2,3],[3,6],[6,5],[5,4],[4,3]],
    lore: '春分点目前位于双鱼座（岁差导致已从白羊移来）。M74是一个正面朝向地球的完美旋涡星系，常被称为"幽灵星系"。'
  },
];

const CITIES = [
  { name: '北京', lat: 39.904, lng: 116.407, region: '华北' },
  { name: '天津', lat: 39.084, lng: 117.201, region: '华北' },
  { name: '石家庄', lat: 38.042, lng: 114.515, region: '华北' },
  { name: '太原', lat: 37.870, lng: 112.549, region: '华北' },
  { name: '呼和浩特', lat: 40.842, lng: 111.750, region: '华北' },
  { name: '哈尔滨', lat: 45.803, lng: 126.535, region: '东北' },
  { name: '长春', lat: 43.817, lng: 125.324, region: '东北' },
  { name: '沈阳', lat: 41.806, lng: 123.431, region: '东北' },
  { name: '大连', lat: 38.914, lng: 121.615, region: '东北' },
  { name: '上海', lat: 31.230, lng: 121.474, region: '华东' },
  { name: '南京', lat: 32.060, lng: 118.797, region: '华东' },
  { name: '杭州', lat: 30.274, lng: 120.156, region: '华东' },
  { name: '合肥', lat: 31.821, lng: 117.227, region: '华东' },
  { name: '福州', lat: 26.075, lng: 119.306, region: '华东' },
  { name: '南昌', lat: 28.682, lng: 115.858, region: '华东' },
  { name: '济南', lat: 36.651, lng: 116.995, region: '华东' },
  { name: '青岛', lat: 36.067, lng: 120.383, region: '华东' },
  { name: '苏州', lat: 31.299, lng: 120.585, region: '华东' },
  { name: '宁波', lat: 29.868, lng: 121.544, region: '华东' },
  { name: '无锡', lat: 31.491, lng: 120.312, region: '华东' },
  { name: '厦门', lat: 24.480, lng: 118.089, region: '华东' },
  { name: '温州', lat: 27.994, lng: 120.699, region: '华东' },
  { name: '武汉', lat: 30.593, lng: 114.305, region: '华中' },
  { name: '长沙', lat: 28.228, lng: 112.939, region: '华中' },
  { name: '郑州', lat: 34.747, lng: 113.625, region: '华中' },
  { name: '广州', lat: 23.130, lng: 113.264, region: '华南' },
  { name: '深圳', lat: 22.543, lng: 114.058, region: '华南' },
  { name: '东莞', lat: 23.021, lng: 113.752, region: '华南' },
  { name: '佛山', lat: 23.022, lng: 113.122, region: '华南' },
  { name: '珠海', lat: 22.271, lng: 113.577, region: '华南' },
  { name: '南宁', lat: 22.817, lng: 108.366, region: '华南' },
  { name: '海口', lat: 20.044, lng: 110.199, region: '华南' },
  { name: '三亚', lat: 18.253, lng: 109.512, region: '华南' },
  { name: '成都', lat: 30.573, lng: 104.066, region: '西南' },
  { name: '重庆', lat: 29.563, lng: 106.551, region: '西南' },
  { name: '昆明', lat: 25.042, lng: 102.712, region: '西南' },
  { name: '贵阳', lat: 26.647, lng: 106.630, region: '西南' },
  { name: '拉萨', lat: 29.645, lng: 91.117, region: '西南' },
  { name: '西安', lat: 34.264, lng: 108.944, region: '西北' },
  { name: '兰州', lat: 36.061, lng: 103.834, region: '西北' },
  { name: '西宁', lat: 36.617, lng: 101.778, region: '西北' },
  { name: '银川', lat: 38.487, lng: 106.230, region: '西北' },
  { name: '乌鲁木齐', lat: 43.826, lng: 87.617, region: '西北' },
  { name: '香港', lat: 22.320, lng: 114.169, region: '特别' },
  { name: '澳门', lat: 22.199, lng: 113.544, region: '特别' },
  { name: '台北', lat: 25.033, lng: 121.565, region: '特别' },
];

const REGIONS = ['华北','东北','华东','华中','华南','西南','西北','特别'];

const ELEMENTS = {
  '火': { color: '#ff6b35', bg: 'rgba(255,107,53,0.12)', label: 'Fire 🔥' },
  '土': { color: '#8B7355', bg: 'rgba(139,115,85,0.12)', label: 'Earth 🌍' },
  '风': { color: '#64b5f6', bg: 'rgba(100,181,246,0.12)', label: 'Air 💨' },
  '水': { color: '#26c6da', bg: 'rgba(38,198,218,0.12)', label: 'Water 🌊' },
};

/* ── Astronomical Engine ── */

function getSunSign(month, day) {
  const dates = [
    [1,20,10],[2,19,11],[3,21,0],[4,20,1],[5,21,2],[6,22,3],
    [7,23,4],[8,23,5],[9,23,6],[10,24,7],[11,23,8],[12,22,9]
  ];
  for (let i = 11; i >= 0; i--) {
    const [m, d, sign] = dates[i];
    if (month > m || (month === m && day >= d)) return sign;
  }
  return 9;
}

function calcAscendant(year, month, day, hourLocal, lngDeg, latDeg) {
  // 1. Convert Beijing time (UTC+8) to UTC
  let h = hourLocal - 8;
  let y = year, m = month, d = day;
  if (h < 0) {
    h += 24; d -= 1;
    if (d < 1) {
      m -= 1;
      if (m < 1) { m = 12; y -= 1; }
      d = new Date(y, m, 0).getDate();
    }
  } else if (h >= 24) {
    h -= 24; d += 1;
    const dim = new Date(y, m, 0).getDate();
    if (d > dim) { d = 1; m += 1; if (m > 12) { m = 1; y += 1; } }
  }

  // 2. Julian Date
  let jy = y, jm = m;
  if (jm <= 2) { jy--; jm += 12; }
  const A = Math.floor(jy / 100);
  const B = 2 - A + Math.floor(A / 4);
  const JD = Math.floor(365.25 * (jy + 4716))
           + Math.floor(30.6001 * (jm + 1))
           + d + h / 24.0 + B - 1524.5;

  // 3. Greenwich Mean Sidereal Time (degrees)
  const T = (JD - 2451545.0) / 36525.0;
  let gmst = 280.46061837
           + 360.98564736629 * (JD - 2451545.0)
           + 0.000387933 * T * T
           - T * T * T / 38710000.0;
  gmst = ((gmst % 360) + 360) % 360;

  // 4. Local Sidereal Time (degrees)
  const lst = ((gmst + lngDeg) % 360 + 360) % 360;

  // 5. Obliquity of ecliptic (Meeus)
  const eps = (23.4393 - 0.013004167 * T) * Math.PI / 180;

  // 6. Ascendant (ecliptic longitude)
  const lstRad = lst * Math.PI / 180;
  const latRad = latDeg * Math.PI / 180;
  let asc = Math.atan2(
    -Math.cos(lstRad),
    Math.sin(lstRad) * Math.cos(eps) + Math.tan(latRad) * Math.sin(eps)
  );
  asc = ((asc * 180 / Math.PI) % 360 + 360) % 360;

  // 7. Degree → zodiac sign (Aries=0 ... Pisces=11)
  return { sign: Math.floor(asc / 30), degree: asc };
}

/* ── SVG sub-components ── */

function BackgroundStars({ count = 200 }) {
  const stars = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      x: ((i * 47) % 101), y: ((i * 73 + 17) % 101),
      r: ((i * 13) % 15) / 10 + 0.3,
      delay: ((i * 19) % 50) / 10, dur: ((i * 23) % 30) / 10 + 2,
    })), [count]
  );
  return stars.map((s, i) => (
    <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r}
      fill="#c8c0e8" opacity={0.4}
      style={{ animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite alternate` }}
    />
  ));
}

function ConstellationSVG({ sign }) {
  const ox = 100, oy = 40;
  return (
    <g>
      {sign.lines.map(([a, b], i) => (
        <line key={`l${i}`}
          x1={sign.stars[a].x + ox} y1={sign.stars[a].y + oy}
          x2={sign.stars[b].x + ox} y2={sign.stars[b].y + oy}
          stroke="rgba(120,160,255,0.35)" strokeWidth="1.2"
          strokeDasharray="300"
          style={{ animation: `drawLine 1.5s ease-out ${i * 0.15}s forwards`, strokeDashoffset: 300 }}
        />
      ))}
      {sign.stars.map((s, i) => (
        <g key={`s${i}`}>
          <circle cx={s.x + ox} cy={s.y + oy} r={s.r * 3} fill="rgba(200,220,255,0.06)" />
          <circle cx={s.x + ox} cy={s.y + oy} r={s.r * 1.5} fill="rgba(220,230,255,0.15)" />
          <circle cx={s.x + ox} cy={s.y + oy} r={s.r} fill="#e8e4f0"
            style={{ animation: `pulse ${2 + (i % 10) / 10}s ease-in-out ${(i % 8) / 4}s infinite alternate` }}
          />
          <text x={s.x + ox + s.r + 5} y={s.y + oy + 3}
            fill="rgba(180,190,220,0.6)" fontSize="9" fontFamily="monospace"
          >{s.name}</text>
        </g>
      ))}
    </g>
  );
}

/* ── Main ── */

export default function ZodiacExplorer() {
  const [selected, setSelected] = useState(0);
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [hour, setHour] = useState('');
  const [cityIdx, setCityIdx] = useState(-1);
  const [result, setResult] = useState(null);
  const [animKey, setAnimKey] = useState(0);
  const [showPanel, setShowPanel] = useState(false);
  const [inputOpen, setInputOpen] = useState(false);

  const sign = SIGNS[selected];
  const elem = ELEMENTS[sign.element];

  const handleSelect = useCallback((i) => {
    setSelected(i);
    setAnimKey(k => k + 1);
    setShowPanel(false);
  }, []);

  const calculate = () => {
    const m = parseInt(month), d = parseInt(day);
    if (!m || !d || m < 1 || m > 12 || d < 1 || d > 31) return;
    const sunIdx = getSunSign(m, d);

    let risingData = null;
    const h = parseInt(hour);
    const y = parseInt(year);
    if (!isNaN(h) && h >= 0 && h <= 23 && !isNaN(y) && y > 0 && cityIdx >= 0) {
      const city = CITIES[cityIdx];
      risingData = calcAscendant(y, m, d, h, city.lng, city.lat);
    }

    setResult({ sun: sunIdx, rising: risingData, city: cityIdx >= 0 ? CITIES[cityIdx].name : null });
    setSelected(sunIdx);
    setAnimKey(k => k + 1);
    setShowPanel(true);
    setInputOpen(false);
  };

  const canCalcRising = year && hour !== '' && cityIdx >= 0;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(170deg, #06081a 0%, #0d1133 40%, #15103a 70%, #0a0e27 100%)',
      color: '#d0cce8',
      fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`,
      overflow: 'hidden', position: 'relative',
    }}>
      <style>{`
        @keyframes twinkle { 0%{opacity:.2} 100%{opacity:.8} }
        @keyframes pulse { 0%{opacity:.7;transform:scale(1)} 100%{opacity:1;transform:scale(1.3)} }
        @keyframes drawLine { to{stroke-dashoffset:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        .nav-btn{transition:all .2s;cursor:pointer;border:none;background:none;padding:0}
        .nav-btn:hover{transform:scale(1.15)}
        .glass{background:rgba(15,15,40,.65);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(100,120,200,.15);border-radius:14px}
        .inp{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:8px;color:#d0cce8;padding:7px 10px;font-size:13px;outline:none;transition:border-color .2s}
        .inp:focus{border-color:rgba(120,160,255,.5)}
        .sel{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:8px;color:#d0cce8;padding:7px 8px;font-size:13px;outline:none;appearance:none;-webkit-appearance:none}
        .sel option{background:#1a1840;color:#d0cce8}
        .cbtn{background:linear-gradient(135deg,rgba(100,140,255,.3),rgba(140,100,255,.3));border:1px solid rgba(120,140,255,.3);border-radius:8px;color:#d0cce8;padding:8px 18px;font-size:13px;cursor:pointer;transition:all .2s;white-space:nowrap}
        .cbtn:hover{background:linear-gradient(135deg,rgba(100,140,255,.5),rgba(140,100,255,.5))}
        .cbtn:disabled{opacity:.35;cursor:default}
        .tag{display:inline-block;padding:3px 10px;border-radius:20px;font-size:12px;margin:2px 3px}
      `}</style>

      {/* ── Header bar ── */}
      <div style={{ padding: '14px 16px 0', display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 10, flexWrap: 'wrap' }}>
        <a href="/tools/#mystic" style={{ color: '#a9a2c8', textDecoration: 'none', fontSize: 13 }}>← 工具集</a>
        <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: .5 }}>✦ 星座星图</div>
        <div style={{ marginLeft: 'auto' }}>
          <button className="cbtn" onClick={() => setInputOpen(!inputOpen)}
            style={{ fontSize: 12, padding: '6px 14px' }}>
            {inputOpen ? '收起 ▴' : '🔭 查我的星座'}
          </button>
        </div>
      </div>

      {/* ── Input panel ── */}
      {inputOpen && (
        <div className="glass" style={{
          margin: '10px 16px', padding: '16px', animation: 'fadeUp .3s ease-out',
          display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', zIndex: 10,
        }}>
          {/* Row 1: date & time */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <label style={{ fontSize: 12, opacity: .5, minWidth: 48 }}>出生日期</label>
            <input className="inp" placeholder="年" style={{ width: 68 }}
              value={year} onChange={e => setYear(e.target.value.replace(/\D/g,'').slice(0,4))} />
            <span style={{ opacity: .3 }}>-</span>
            <input className="inp" placeholder="月" style={{ width: 50 }}
              value={month} onChange={e => setMonth(e.target.value.replace(/\D/g,'').slice(0,2))} />
            <span style={{ opacity: .3 }}>-</span>
            <input className="inp" placeholder="日" style={{ width: 50 }}
              value={day} onChange={e => setDay(e.target.value.replace(/\D/g,'').slice(0,2))} />
            <span style={{ opacity: .3, margin: '0 4px' }}>|</span>
            <input className="inp" placeholder="时 (0-23)" style={{ width: 76 }}
              value={hour} onChange={e => setHour(e.target.value.replace(/\D/g,'').slice(0,2))} />
          </div>
          {/* Row 2: city */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <label style={{ fontSize: 12, opacity: .5, minWidth: 48 }}>出生城市</label>
            <select className="sel" style={{ flex: '1 1 180px', maxWidth: 220 }}
              value={cityIdx} onChange={e => setCityIdx(parseInt(e.target.value))}>
              <option value={-1}>选择城市…</option>
              {REGIONS.map(r => (
                <optgroup key={r} label={r}>
                  {CITIES.map((c, i) => c.region === r && (
                    <option key={i} value={i}>{c.name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
            {cityIdx >= 0 && (
              <span style={{ fontSize: 11, opacity: .4, fontFamily: 'monospace' }}>
                {CITIES[cityIdx].lat.toFixed(1)}°N {CITIES[cityIdx].lng.toFixed(1)}°E
              </span>
            )}
          </div>
          {/* Hint + button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, opacity: .4, flex: 1 }}>
              {canCalcRising
                ? '✓ 可计算太阳星座 + 上升星座'
                : '仅月/日 → 太阳星座　|　补全年份+时辰+城市 → 精确上升星座'}
            </span>
            <button className="cbtn" onClick={calculate}
              disabled={!month || !day}>
              查询
            </button>
          </div>
        </div>
      )}

      {/* ── Result banner ── */}
      {result && (
        <div style={{
          padding: '6px 16px', display: 'flex', gap: 16, flexWrap: 'wrap',
          animation: 'fadeUp .4s ease-out', fontSize: 13, zIndex: 5, position: 'relative',
        }}>
          <span>☀️ 太阳星座：<strong style={{ color: ELEMENTS[SIGNS[result.sun].element].color }}>{SIGNS[result.sun].name}</strong></span>
          {result.rising && (
            <span>
              ⬆ 上升星座：<strong style={{ color: ELEMENTS[SIGNS[result.rising.sign].element].color }}>
                {SIGNS[result.rising.sign].name}
              </strong>
              <span style={{ opacity: .4, marginLeft: 4, fontSize: 11 }}>
                ({result.rising.degree.toFixed(1)}° · {result.city})
              </span>
            </span>
          )}
          {!result.rising && <span style={{ opacity: .4 }}>补全年份/时辰/城市可算上升星座</span>}
        </div>
      )}

      {/* ── Main content ── */}
      <div style={{
        display: 'flex', gap: 0, padding: '4px 12px',
        minHeight: 'calc(100vh - 170px)', flexWrap: 'wrap',
      }}>
        {/* Constellation display */}
        <div style={{
          flex: '1 1 400px', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: 340,
        }}>
          <div key={`t-${selected}`} style={{ textAlign: 'center', marginBottom: 6, animation: 'fadeUp .5s ease-out' }}>
            <div style={{ fontSize: 40, lineHeight: 1 }}>{sign.symbol}</div>
            <div style={{
              fontSize: 26, fontWeight: 700, letterSpacing: 2, marginTop: 2,
              background: `linear-gradient(135deg, ${elem.color}, #b0a0e0)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{sign.name}</div>
            <div style={{ fontSize: 12, opacity: .5, marginTop: 2, letterSpacing: 1 }}>
              {sign.en} · {sign.dateRange}
            </div>
          </div>

          <svg key={`svg-${animKey}`} viewBox="0 0 500 320" width="100%" style={{ maxWidth: 520, overflow: 'visible' }}>
            <BackgroundStars count={120} />
            <ConstellationSVG sign={sign} />
          </svg>

          <div key={`q-${selected}`} style={{
            display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginTop: 6,
            animation: 'fadeUp .5s ease-out .2s both', fontSize: 12,
          }}>
            <span className="tag" style={{ background: elem.bg, color: elem.color }}>{sign.element} · {sign.elementEn}</span>
            <span className="tag" style={{ background: 'rgba(255,255,255,.06)' }}>{sign.ruler}</span>
            <span className="tag" style={{ background: 'rgba(255,255,255,.06)' }}>主星 {sign.mainStar}</span>
          </div>

          <button onClick={() => setShowPanel(!showPanel)} style={{
            marginTop: 10, background: 'rgba(255,255,255,.06)',
            border: '1px solid rgba(255,255,255,.1)', borderRadius: 8,
            color: '#b0a8d0', padding: '5px 16px', fontSize: 12, cursor: 'pointer', transition: 'all .2s',
          }}>
            {showPanel ? '收起详情 ▴' : '展开详情 ▾'}
          </button>
          <p style={{ margin: '8px 16px 58px', maxWidth: 560, textAlign: 'center', fontSize: 11, lineHeight: 1.6, opacity: .38 }}>
            星图和天文数据用于科普；星座性格与配对内容仅供娱乐参考。上升星座为简化算法结果，不替代专业星盘。
          </p>
        </div>

        {/* Info panel */}
        {showPanel && (
          <div className="glass" key={`p-${selected}`} style={{
            flex: '0 0 310px', maxWidth: '100%', padding: '18px',
            animation: 'slideIn .4s ease-out', fontSize: 13, lineHeight: 1.7,
            maxHeight: 'calc(100vh - 180px)', overflowY: 'auto', alignSelf: 'flex-start',
          }}>
            <Section title="天文数据">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px 14px' }}>
                <span style={{ opacity: .5 }}>视星等</span><span>{sign.magnitude}</span>
                <span style={{ opacity: .5 }}>天区面积</span><span>{sign.area}</span>
                <span style={{ opacity: .5 }}>面积排名</span><span>第{sign.rank}位 / 88</span>
                <span style={{ opacity: .5 }}>最佳观测</span><span>{sign.bestView}</span>
              </div>
              <p style={{ marginTop: 8, opacity: .65, fontSize: 12 }}>{sign.lore}</p>
            </Section>
            <Section title="性格特质">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {sign.personality.map((p, i) => (
                  <span key={i} className="tag" style={{ background: elem.bg, color: elem.color }}>{p}</span>
                ))}
              </div>
            </Section>
            <Section title="高配对星座">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {sign.compatible.map((c, i) => {
                  const ci = SIGNS.findIndex(s => s.name === c);
                  const ce = ci >= 0 ? ELEMENTS[SIGNS[ci].element] : null;
                  return (
                    <span key={i} className="tag"
                      style={{ background: ce?.bg, color: ce?.color, cursor: 'pointer' }}
                      onClick={() => ci >= 0 && handleSelect(ci)}>
                      {ci >= 0 && SIGNS[ci].symbol} {c}
                    </span>
                  );
                })}
              </div>
            </Section>
            <Section title="上升星座算法">
              <p style={{ opacity: .55, fontSize: 11, lineHeight: 1.6, margin: 0 }}>
                出生日期时间 → 儒略日 → 格林尼治恒星时(GMST) → 本地恒星时(LST = GMST + 经度)
                → 上升点 = arctan(−cos RAMC / (sin RAMC · cos ε + tan φ · sin ε))。
                其中 ε 为黄赤交角(~23.44°)，φ 为出生地纬度。公式来源：Jean Meeus《Astronomical Algorithms》。
              </p>
            </Section>
          </div>
        )}
      </div>

      {/* ── Bottom nav ── */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, padding: '6px 6px 10px',
        background: 'linear-gradient(transparent, rgba(6,8,26,.95) 30%)',
        display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap', zIndex: 20,
      }}>
        {SIGNS.map((s, i) => {
          const isA = i === selected;
          const isSun = result?.sun === i;
          const isR = result?.rising?.sign === i;
          const e = ELEMENTS[s.element];
          return (
            <button key={i} className="nav-btn" onClick={() => handleSelect(i)}
              title={`${s.name} ${s.dateRange}`}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '3px 5px', borderRadius: 10, minWidth: 36,
                background: isA ? 'rgba(100,140,255,.15)' : 'transparent',
                outline: isA ? '1px solid rgba(100,140,255,.3)' : 'none',
              }}>
              <span style={{
                fontSize: isA ? 21 : 17,
                filter: isA ? `drop-shadow(0 0 6px ${e.color})` : 'none',
                transition: 'all .2s',
              }}>{s.symbol}</span>
              <span style={{ fontSize: 9, opacity: isA ? .9 : .4, color: isA ? e.color : '#888', whiteSpace: 'nowrap' }}>
                {s.name.replace('座','')}
              </span>
              {(isSun || isR) && (
                <div style={{ display: 'flex', gap: 2, marginTop: 1 }}>
                  {isSun && <span style={{ fontSize: 8 }}>☀️</span>}
                  {isR && <span style={{ fontSize: 8 }}>⬆</span>}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, opacity: .4, marginBottom: 6 }}>{title}</div>
      {children}
    </div>
  );
}
