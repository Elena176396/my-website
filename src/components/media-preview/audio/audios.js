// 音频数据配置
// 添加音频：复制一个对象，改 title / src / category
// category 只能填：学习 | 音乐 | 播客
// src 填 R2 路径，会自动拼接 BASE_URL

export const R2_BASE = 'https://pub-7eb77f51ee5445219228c5c23a935a4a.r2.dev/audio';

export const audios = [
  // ── 学习 ──────────────────────────
  {
    title: '英语听力 Day1',
    src: '/english/listening-day1.mp3',
    category: '学习',
  },
  {
    title: '英语听力 Day2',
    src: '/english/listening-day2.mp3',
    category: '学习',
  },

  // ── 音乐 ──────────────────────────
  {
    title: '示例歌曲 01',
    src: '/music/song-01.mp3',
    category: '音乐',
  },
  {
    title: '示例歌曲 02',
    src: '/music/song-02.mp3',
    category: '音乐',
  },

  // ── 播客 ──────────────────────────
  {
    title: '播客第1期',
    src: '/podcast/ep-01.mp3',
    category: '播客',
  },
];
