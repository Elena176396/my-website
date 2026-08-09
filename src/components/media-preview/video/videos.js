// 视频数据配置
// 添加视频：复制一个对象，改 title / src / category
// category 只能填：学习 | 影视 | 收藏
// src 填 R2 路径，会自动拼接 BASE_URL

export const R2_BASE = 'https://pub-7eb77f51ee5445219228c5c23a935a4a.r2.dev/videos';

export const videos = [
  // ── 学习 ──────────────────────────
  {
    title: '朗文日常生活英语 · Lesson 01',
    src: '/longman/lesson-01.mp4',
    category: '学习',
  },

  // ── 影视 ──────────────────────────
  {
    title: '测试卡1',
    src: '/drama/erta-ep01.mp4',
    category: '影视',
  },
  {
    title: '测试卡2',
    src: '/drama/erta-ep02.mp4',
    category: '影视',
  },

  // ── 收藏 ──────────────────────────
  {
    title: '测试卡3',
    src: '/saved/clip-01.mp4',
    category: '收藏',
  },
];
