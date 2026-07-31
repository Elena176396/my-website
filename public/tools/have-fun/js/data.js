/* ==========================================================================
   书影数据（从豆瓣记录自动生成）
   ========================================================================== */

const BOOKS = [
  {
    "id": 1,
    "title": "咸的玩笑",
    "author": "刘震云",
    "category": "文学",
    "session": null,
    "date": "2026-04-27",
    "intro": "",
    "cover": "files/covers/books/book-001.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/37833272/"
  },
  {
    "id": 2,
    "title": "我的人生样样稀松照样赢",
    "author": "[美]史考特·亚当斯",
    "category": "传记",
    "session": null,
    "date": "2025-02-13",
    "intro": "",
    "cover": "files/covers/books/book-002.jpg",
    "rating": 3,
    "doubanUrl": "https://book.douban.com/subject/26990679/"
  },
  {
    "id": 3,
    "title": "我看见的世界",
    "author": "[美] 李飞飞",
    "category": "文学",
    "session": null,
    "date": "2025-02-13",
    "intro": "",
    "cover": "files/covers/books/book-003.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/36672955/"
  },
  {
    "id": 4,
    "title": "暗处的女儿",
    "author": "[意大利] 埃莱娜·费兰特",
    "category": "文学",
    "session": null,
    "date": "2025-02-13",
    "intro": "",
    "cover": "files/covers/books/book-004.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/36721763/",
    "movie": {
      "title": "影视《暗处的女儿》(2021)",
      "url": "https://movie.douban.com/subject/30344474/"
    }
  },
  {
    "id": 5,
    "title": "所谓命运，其实就是潜意识",
    "author": "（瑞典）卡琳·泰恩",
    "category": "心理",
    "session": null,
    "date": "2024-06-28",
    "intro": "",
    "cover": "files/covers/books/book-005.jpg",
    "rating": 2,
    "doubanUrl": "https://book.douban.com/subject/36853535/"
  },
  {
    "id": 6,
    "title": "博尔赫斯全集I",
    "author": "[阿根廷] 豪·路·博尔赫斯",
    "category": "文学",
    "session": null,
    "date": "2024-06-28",
    "intro": "",
    "cover": "files/covers/books/book-006.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/26841615/"
  },
  {
    "id": 7,
    "title": "我们生活在巨大的差距里",
    "author": "余华",
    "category": "文学",
    "session": null,
    "date": "2024-03-29",
    "intro": "",
    "cover": "files/covers/books/book-007.jpg",
    "rating": 3,
    "doubanUrl": "https://book.douban.com/subject/26291216/"
  },
  {
    "id": 8,
    "title": "我该走了吗",
    "author": "[美] 李翊云",
    "category": "文学",
    "session": null,
    "date": "2024-03-29",
    "intro": "",
    "cover": "files/covers/books/book-008.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/36625151/"
  },
  {
    "id": 9,
    "title": "手把手教你做顶尖企业内训师",
    "author": "熊亚柱",
    "category": "心理",
    "session": null,
    "date": "2024-02-26",
    "intro": "",
    "cover": "files/covers/books/book-009.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/27102251/"
  },
  {
    "id": 10,
    "title": "为什么伟大不能被计划",
    "author": "[美] 肯尼斯·斯坦利",
    "category": "心理",
    "session": null,
    "date": "2024-02-26",
    "intro": "",
    "cover": "files/covers/books/book-010.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/36357804/"
  },
  {
    "id": 11,
    "title": "运营思维",
    "author": "张沐",
    "category": "心理",
    "session": null,
    "date": "2024-01-19",
    "intro": "一般，广而浅薄",
    "cover": "files/covers/books/book-011.jpg",
    "rating": 3,
    "doubanUrl": "https://book.douban.com/subject/35289158/"
  },
  {
    "id": 12,
    "title": "东京一年",
    "author": "蒋方舟",
    "category": "文学",
    "session": null,
    "date": "2024-01-04",
    "intro": "支持一下吧，虽然被骂的很惨",
    "cover": "files/covers/books/book-012.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/27074861/"
  },
  {
    "id": 13,
    "title": "未来算法",
    "author": "诸葛越",
    "category": "心理",
    "session": null,
    "date": "2024-01-04",
    "intro": "",
    "cover": "files/covers/books/book-013.jpg",
    "rating": 3,
    "doubanUrl": "https://book.douban.com/subject/35498194/"
  },
  {
    "id": 14,
    "title": "成长树家庭教育法",
    "author": "诸葛越",
    "category": "科技",
    "session": null,
    "date": "2024-01-04",
    "intro": "一般，有点啰嗦，基本看完两个序就够了",
    "cover": "files/covers/books/book-014.jpg",
    "rating": 2,
    "doubanUrl": "https://book.douban.com/subject/36645397/"
  },
  {
    "id": 15,
    "title": "纳瓦尔宝典",
    "author": "[美] 埃里克·乔根森",
    "category": "商业",
    "session": null,
    "date": "2023-08-11",
    "intro": "很多理论和《穷爸爸富爸爸》如出一辙",
    "cover": "files/covers/books/book-015.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/35876121/"
  },
  {
    "id": 16,
    "title": "富爸爸，穷爸爸",
    "author": "（美）罗伯特·T·清崎",
    "category": "文学",
    "session": null,
    "date": "2023-07-03",
    "intro": "",
    "cover": "files/covers/books/book-016.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/1033778/"
  },
  {
    "id": 17,
    "title": "失踪的孩子",
    "author": "[意] 埃莱娜·费兰特",
    "category": "文学",
    "session": null,
    "date": "2023-04-24",
    "intro": "",
    "cover": "files/covers/books/book-017.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/30172069/"
  },
  {
    "id": 18,
    "title": "离开的，留下的",
    "author": "[意] 埃莱娜·费兰特",
    "category": "文学",
    "session": null,
    "date": "2023-04-24",
    "intro": "",
    "cover": "files/covers/books/book-018.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/27104959/"
  },
  {
    "id": 19,
    "title": "底层逻辑2",
    "author": "刘润",
    "category": "商业",
    "session": null,
    "date": "2023-01-01",
    "intro": "讲道理的空话太多，没啥营养",
    "cover": "files/covers/books/book-019.jpg",
    "rating": 2,
    "doubanUrl": "https://book.douban.com/subject/36122558/"
  },
  {
    "id": 20,
    "title": "无人旁观时我们是谁：大数据下的人类真实面目",
    "author": "[美]克里斯蒂安·鲁德尔",
    "category": "心理",
    "session": null,
    "date": "2022-11-27",
    "intro": "和人性的弱点、乌合之众的观点一致，切入点不同",
    "cover": "files/covers/books/book-020.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/35257329/"
  },
  {
    "id": 21,
    "title": "当我们不再理解世界",
    "author": "[智利]本哈明·拉巴图特",
    "category": "文学",
    "session": null,
    "date": "2022-11-27",
    "intro": "",
    "cover": "files/covers/books/book-021.jpg",
    "rating": 3,
    "doubanUrl": "https://book.douban.com/subject/36073906/"
  },
  {
    "id": 22,
    "title": "一生的旅程",
    "author": "[美] 罗伯特·艾格",
    "category": "传记",
    "session": null,
    "date": "2022-11-27",
    "intro": "和近期职场的感受一致",
    "cover": "files/covers/books/book-022.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/35009826/"
  },
  {
    "id": 23,
    "title": "暮色将尽",
    "author": "[英] 戴安娜·阿西尔",
    "category": "文学",
    "session": null,
    "date": "2022-11-27",
    "intro": "",
    "cover": "files/covers/books/book-023.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/36020007/"
  },
  {
    "id": 24,
    "title": "静静的山",
    "author": "王静",
    "category": "文学",
    "session": null,
    "date": "2022-10-25",
    "intro": "",
    "cover": "files/covers/books/book-024.jpg",
    "rating": 3,
    "doubanUrl": "https://book.douban.com/subject/24698006/"
  },
  {
    "id": 25,
    "title": "底层逻辑",
    "author": "刘润",
    "category": "心理",
    "session": null,
    "date": "2022-10-25",
    "intro": "",
    "cover": "files/covers/books/book-025.jpg",
    "rating": 3,
    "doubanUrl": "https://book.douban.com/subject/35620025/"
  },
  {
    "id": 26,
    "title": "第五项修炼①",
    "author": "[美] 彼得·圣吉",
    "category": "心理",
    "session": null,
    "date": "2022-10-25",
    "intro": "",
    "cover": "files/covers/books/book-026.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/30133649/"
  },
  {
    "id": 27,
    "title": "背叛",
    "author": "豆豆",
    "category": "文学",
    "session": null,
    "date": "2022-09-11",
    "intro": "",
    "cover": "files/covers/books/book-027.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/1578545/"
  },
  {
    "id": 28,
    "title": "天幕红尘",
    "author": "豆豆",
    "category": "文学",
    "session": null,
    "date": "2022-09-11",
    "intro": "",
    "cover": "files/covers/books/book-028.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/24748615/"
  },
  {
    "id": 29,
    "title": "遥远的救世主",
    "author": "豆豆",
    "category": "文学",
    "session": null,
    "date": "2022-09-11",
    "intro": "",
    "cover": "files/covers/books/book-029.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/1322455/"
  },
  {
    "id": 30,
    "title": "无尽攀登",
    "author": "夏伯渝",
    "category": "文学",
    "session": null,
    "date": "2022-09-11",
    "intro": "",
    "cover": "files/covers/books/book-030.jpg",
    "rating": 2,
    "doubanUrl": "https://book.douban.com/subject/35505949/"
  },
  {
    "id": 31,
    "title": "我听见这世界缤纷",
    "author": "吴晶",
    "category": "文学",
    "session": null,
    "date": "2022-09-11",
    "intro": "",
    "cover": "files/covers/books/book-031.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/35899547/"
  },
  {
    "id": 32,
    "title": "谈谈方法",
    "author": "[法] 笛卡尔",
    "category": "传记",
    "session": null,
    "date": "2022-04-02",
    "intro": "",
    "cover": "files/covers/books/book-032.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/1071023/"
  },
  {
    "id": 33,
    "title": "岁月凶猛",
    "author": "冯仑",
    "category": "文学",
    "session": null,
    "date": "2022-04-02",
    "intro": "",
    "cover": "files/covers/books/book-033.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/26959159/"
  },
  {
    "id": 34,
    "title": "我只想和你说说话",
    "author": "张超",
    "category": "文学",
    "session": null,
    "date": "2021-12-21",
    "intro": "",
    "cover": "files/covers/books/book-034.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/26252929/"
  },
  {
    "id": 35,
    "title": "白夜行",
    "author": "[日] 东野圭吾",
    "category": "文学",
    "session": null,
    "date": "2021-12-10",
    "intro": "",
    "cover": "files/covers/books/book-035.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/3259440/"
  },
  {
    "id": 36,
    "title": "蛤蟆先生去看心理医生",
    "author": "[英] 罗伯特·戴博德",
    "category": "心理",
    "session": null,
    "date": "2021-12-10",
    "intro": "",
    "cover": "files/covers/books/book-036.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/35143790/"
  },
  {
    "id": 37,
    "title": "思辨与立场",
    "author": "[美] 理查德·保罗（Richard Paul）",
    "category": "思维",
    "session": null,
    "date": "2021-12-10",
    "intro": "",
    "cover": "files/covers/books/book-037.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/26872634/"
  },
  {
    "id": 38,
    "title": "心力",
    "author": "邓亚萍",
    "category": "自我成长",
    "session": null,
    "date": "2021-12-10",
    "intro": "",
    "cover": "files/covers/books/book-038.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/35575845/"
  },
  {
    "id": 39,
    "title": "零边际成本社会",
    "author": "[美] 杰里米·里夫金（Jeremy Rifkin）",
    "category": "商业",
    "session": null,
    "date": "2021-12-10",
    "intro": "",
    "cover": "files/covers/books/book-039.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/27126686/"
  },
  {
    "id": 40,
    "title": "我的经济学思维课",
    "author": "张军",
    "category": "商业",
    "session": null,
    "date": "2021-12-10",
    "intro": "",
    "cover": "files/covers/books/book-040.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/35088493/"
  },
  {
    "id": 41,
    "title": "爱是什么",
    "author": "[美] 芭芭拉·弗雷德里克森",
    "category": "心理",
    "session": null,
    "date": "2021-12-10",
    "intro": "",
    "cover": "files/covers/books/book-041.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/30345423/"
  },
  {
    "id": 42,
    "title": "批判性思维（原书第5版）",
    "author": "[美]格雷戈里•巴沙姆（Gregory Bassham）",
    "category": "思维",
    "session": null,
    "date": "2021-10-12",
    "intro": "",
    "cover": "files/covers/books/book-042.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/33405075/"
  },
  {
    "id": 43,
    "title": "终身成长",
    "author": "[美] 卡罗尔·德韦克",
    "category": "思维",
    "session": null,
    "date": "2021-10-12",
    "intro": "",
    "cover": "files/covers/books/book-043.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/27154533/"
  },
  {
    "id": 44,
    "title": "把自己作为方法",
    "author": "项飙",
    "category": "心理",
    "session": null,
    "date": "2021-10-02",
    "intro": "",
    "cover": "files/covers/books/book-044.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/35092383/"
  },
  {
    "id": 45,
    "title": "改变提问，改变人生（原书第3版）",
    "author": "[美]梅若李·亚当斯（Marilee Ada",
    "category": "文学",
    "session": null,
    "date": "2021-10-02",
    "intro": "",
    "cover": "files/covers/books/book-045.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/30289868/"
  },
  {
    "id": 46,
    "title": "成年人的谎言生活",
    "author": "[意大利] 埃莱娜·费兰特",
    "category": "文学",
    "session": null,
    "date": "2021-09-04",
    "intro": "成长",
    "cover": "files/covers/books/book-046.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/35467795/"
  },
  {
    "id": 47,
    "title": "斯通纳",
    "author": "[美] 约翰·威廉斯",
    "category": "文学",
    "session": null,
    "date": "2021-08-14",
    "intro": "",
    "cover": "files/covers/books/book-047.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/26425831/"
  },
  {
    "id": 48,
    "title": "反脆弱",
    "author": "[美] 纳西姆·尼古拉斯·塔勒布",
    "category": "商业",
    "session": null,
    "date": "2021-08-13",
    "intro": "最好跟黑天鹅一起看了",
    "cover": "files/covers/books/book-048.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/25782902/"
  },
  {
    "id": 49,
    "title": "莎乐美",
    "author": "[英] 奥斯卡·王尔德",
    "category": "文学",
    "session": null,
    "date": "2021-08-13",
    "intro": "",
    "cover": "files/covers/books/book-049.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/34845977/"
  },
  {
    "id": 50,
    "title": "心是孤独的猎手",
    "author": "[美] 卡森·麦卡勒斯",
    "category": "文学",
    "session": null,
    "date": "2021-08-13",
    "intro": "",
    "cover": "files/covers/books/book-050.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/1424741/"
  },
  {
    "id": 51,
    "title": "我的一个世纪",
    "author": "董竹君",
    "category": "历史",
    "session": null,
    "date": "2021-08-13",
    "intro": "",
    "cover": "files/covers/books/book-051.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/2604801/"
  },
  {
    "id": 52,
    "title": "只工作，不上班",
    "author": "林安",
    "category": "心理",
    "session": null,
    "date": "2021-08-13",
    "intro": "",
    "cover": "files/covers/books/book-052.jpg",
    "rating": 3,
    "doubanUrl": "https://book.douban.com/subject/34839849/"
  },
  {
    "id": 53,
    "title": "驻京办主任",
    "author": "王晓方",
    "category": "文学",
    "session": null,
    "date": "2021-08-13",
    "intro": "长见识",
    "cover": "files/covers/books/book-053.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/1988741/"
  },
  {
    "id": 54,
    "title": "光荣与梦想（套装共4册）",
    "author": "[美]威廉·曼彻斯特（William Manchester）",
    "category": "历史",
    "session": null,
    "date": "2021-08-13",
    "intro": "读了两本了，暂停了两年，什么时候能续上",
    "cover": "files/covers/books/book-054.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/26314954/"
  },
  {
    "id": 55,
    "title": "蔡康永的情商课",
    "author": "蔡康永",
    "category": "心理",
    "session": null,
    "date": "2021-08-13",
    "intro": "学过心理学再看，过于简单了",
    "cover": "files/covers/books/book-055.jpg",
    "rating": 3,
    "doubanUrl": "https://book.douban.com/subject/30371583/"
  },
  {
    "id": 56,
    "title": "没有不散的筵席",
    "author": "黄蕙兰",
    "category": "历史",
    "session": null,
    "date": "2021-08-13",
    "intro": "",
    "cover": "files/covers/books/book-056.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/1945073/"
  },
  {
    "id": 57,
    "title": "那不勒斯故事四部曲",
    "author": "艾琳娜.斐蘭德",
    "category": "文学",
    "session": null,
    "date": "2021-08-13",
    "intro": "",
    "cover": "files/covers/books/book-057.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/27204805/"
  },
  {
    "id": 58,
    "title": "如何在30秒内说出关键点",
    "author": "米罗•弗兰克 (Milo O.Frank)",
    "category": "商业",
    "session": null,
    "date": "2021-08-13",
    "intro": "",
    "cover": "files/covers/books/book-058.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/26771105/"
  },
  {
    "id": 59,
    "title": "夏日终曲",
    "author": "[美] 安德烈·艾席蒙",
    "category": "心理",
    "session": null,
    "date": "2021-07-01",
    "intro": "",
    "cover": "files/covers/books/book-059.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/28659562/"
  },
  {
    "id": 60,
    "title": "贫穷的本质 (修订版)",
    "author": "[印度] 阿比吉特·班纳吉",
    "category": "思维",
    "session": null,
    "date": "2021-03-31",
    "intro": "",
    "cover": "files/covers/books/book-060.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/30161884/"
  },
  {
    "id": 61,
    "title": "樊登讲论语",
    "author": "樊登",
    "category": "其他",
    "session": null,
    "date": "2021-03-31",
    "intro": "",
    "cover": "files/covers/books/book-061.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/35301819/"
  },
  {
    "id": 62,
    "title": "巴黎：现代城市的发明",
    "author": "[美] 若昂·德让",
    "category": "历史",
    "session": null,
    "date": "2021-03-31",
    "intro": "",
    "cover": "files/covers/books/book-062.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/27085768/"
  },
  {
    "id": 63,
    "title": "薇娅：人生是用来改变的",
    "author": "薇娅",
    "category": "传记",
    "session": null,
    "date": "2021-03-31",
    "intro": "",
    "cover": "files/covers/books/book-063.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/35319742/"
  },
  {
    "id": 64,
    "title": "曾国藩的正面与侧面3",
    "author": "张宏杰",
    "category": "历史",
    "session": null,
    "date": "2021-03-31",
    "intro": "",
    "cover": "files/covers/books/book-064.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/30198658/"
  },
  {
    "id": 65,
    "title": "意志力",
    "author": "[美] 罗伊·鲍迈斯特",
    "category": "自我成长",
    "session": null,
    "date": "2021-03-31",
    "intro": "",
    "cover": "files/covers/books/book-065.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/10773358/"
  },
  {
    "id": 66,
    "title": "逆商",
    "author": "[美] 保罗•史托兹",
    "category": "思维",
    "session": null,
    "date": "2021-03-31",
    "intro": "",
    "cover": "files/covers/books/book-066.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/30458408/"
  },
  {
    "id": 67,
    "title": "把时间当作朋友",
    "author": "李笑来",
    "category": "自我成长",
    "session": null,
    "date": "2021-03-04",
    "intro": "",
    "cover": "files/covers/books/book-067.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/3609132/"
  },
  {
    "id": 68,
    "title": "完美妻子",
    "author": "[澳]妮琪·珍麦尔",
    "category": "文学",
    "session": null,
    "date": "2021-02-07",
    "intro": "",
    "cover": "files/covers/books/book-068.jpg",
    "rating": 3,
    "doubanUrl": "https://book.douban.com/subject/25869090/"
  },
  {
    "id": 69,
    "title": "挪威的森林",
    "author": "[日] 村上春树",
    "category": "自我成长",
    "session": null,
    "date": "2021-02-07",
    "intro": "",
    "cover": "files/covers/books/book-069.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/1046265/"
  },
  {
    "id": 70,
    "title": "我的天才女友",
    "author": "[意] 埃莱娜·费兰特",
    "category": "文学",
    "session": null,
    "date": "2021-02-07",
    "intro": "",
    "cover": "files/covers/books/book-070.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/34661936/"
  },
  {
    "id": 71,
    "title": "我的天才女友",
    "author": "[意] 埃莱娜·费兰特",
    "category": "文学",
    "session": null,
    "date": "2021-02-07",
    "intro": "",
    "cover": "files/covers/books/book-071.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/26878124/"
  },
  {
    "id": 72,
    "title": "推开红酒的门",
    "author": "王胜寒（醉鹅娘）",
    "category": "科普",
    "session": null,
    "date": "2021-02-07",
    "intro": "",
    "cover": "files/covers/books/book-072.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/35300454/"
  },
  {
    "id": 73,
    "title": "人生由我",
    "author": "[加] 梅耶·马斯克",
    "category": "文学",
    "session": null,
    "date": "2021-02-07",
    "intro": "",
    "cover": "files/covers/books/book-073.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/35097551/"
  },
  {
    "id": 74,
    "title": "如何想到又做到",
    "author": "[美] Sean Young",
    "category": "自我成长",
    "session": null,
    "date": "2021-02-07",
    "intro": "",
    "cover": "files/covers/books/book-074.jpg",
    "rating": 3,
    "doubanUrl": "https://book.douban.com/subject/30348435/"
  },
  {
    "id": 75,
    "title": "人生十二法则",
    "author": "乔丹·彼得森",
    "category": "哲学",
    "session": null,
    "date": "2021-02-07",
    "intro": "",
    "cover": "files/covers/books/book-075.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/34870933/"
  },
  {
    "id": 76,
    "title": "无知",
    "author": "[捷克] 米兰·昆德拉",
    "category": "哲学",
    "session": null,
    "date": "2020-07-03",
    "intro": "",
    "cover": "files/covers/books/book-076.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/1057197/"
  },
  {
    "id": 77,
    "title": "查泰莱夫人的情人",
    "author": "[英] D. H. 劳伦斯",
    "category": "文学",
    "session": null,
    "date": "2020-06-14",
    "intro": "",
    "cover": "files/covers/books/book-077.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/25852235/",
    "movie": {
      "title": "影视《查泰莱夫人的情人》(1981)",
      "url": "https://movie.douban.com/subject/1302013/"
    }
  },
  {
    "id": 78,
    "title": "我的一个世纪（增订版）",
    "author": "董竹君",
    "category": "传记",
    "session": null,
    "date": "2020-05-18",
    "intro": "",
    "cover": "files/covers/books/book-078.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/24722817/"
  },
  {
    "id": 79,
    "title": "子弹笔记",
    "author": "[美] 赖德·卡罗尔",
    "category": "思维",
    "session": null,
    "date": "2020-05-13",
    "intro": "",
    "cover": "files/covers/books/book-079.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/30395230/"
  },
  {
    "id": 80,
    "title": "只爱陌生人",
    "author": "[英] 伊恩·麦克尤恩",
    "category": "文学",
    "session": null,
    "date": "2020-05-13",
    "intro": "",
    "cover": "files/covers/books/book-080.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/4151134/"
  },
  {
    "id": 81,
    "title": "没有女人的男人们",
    "author": "[日] 村上春树",
    "category": "文学",
    "session": null,
    "date": "2020-05-11",
    "intro": "",
    "cover": "files/covers/books/book-081.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/26286208/"
  },
  {
    "id": 82,
    "title": "不朽",
    "author": "[捷克] 米兰·昆德拉",
    "category": "文学",
    "session": null,
    "date": "2020-05-10",
    "intro": "",
    "cover": "files/covers/books/book-082.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/25902728/"
  },
  {
    "id": 83,
    "title": "蔡康永的说话之道2",
    "author": "蔡康永 著",
    "category": "自我成长",
    "session": null,
    "date": "2020-05-07",
    "intro": "2比1好看点。1太简单了，看的没味道",
    "cover": "files/covers/books/book-083.jpg",
    "rating": 3,
    "doubanUrl": "https://book.douban.com/subject/25933841/"
  },
  {
    "id": 84,
    "title": "萨宁",
    "author": "[俄] 阿尔志跋绥夫",
    "category": "文学",
    "session": null,
    "date": "2020-05-07",
    "intro": "",
    "cover": "files/covers/books/book-084.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/34845998/"
  },
  {
    "id": 85,
    "title": "品味四讲",
    "author": "蒋勋",
    "category": "文学",
    "session": null,
    "date": "2020-05-07",
    "intro": "看了几本他的书，没有波澜，看多了没新鲜感",
    "cover": "files/covers/books/book-085.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/27085587/"
  },
  {
    "id": 86,
    "title": "给青年艺术家的信",
    "author": "蒋勋",
    "category": "文学",
    "session": null,
    "date": "2020-05-07",
    "intro": "写的很好，但略啰嗦",
    "cover": "files/covers/books/book-086.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/3410833/"
  },
  {
    "id": 87,
    "title": "自在独行",
    "author": "贾平凹",
    "category": "文学",
    "session": null,
    "date": "2020-05-07",
    "intro": "",
    "cover": "files/covers/books/book-087.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/26802388/"
  },
  {
    "id": 88,
    "title": "富兰克林自传",
    "author": "[美] 本杰明·富兰克林",
    "category": "传记",
    "session": null,
    "date": "2020-05-07",
    "intro": "出差的时候在酒店借的，还没还回去，有时间去还一下",
    "cover": "files/covers/books/book-088.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/4007097/"
  },
  {
    "id": 89,
    "title": "景恒街",
    "author": "笛安",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-089.jpg",
    "rating": 3,
    "doubanUrl": "https://book.douban.com/subject/30338153/"
  },
  {
    "id": 90,
    "title": "阿里传",
    "author": "波特·埃里斯曼",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-090.jpg",
    "rating": 3,
    "doubanUrl": "https://book.douban.com/subject/26599526/"
  },
  {
    "id": 91,
    "title": "哭泣的骆驼",
    "author": "三毛",
    "category": "其他",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-091.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/1029111/"
  },
  {
    "id": 92,
    "title": "鲁滨孙历险记",
    "author": "笛福",
    "category": "哲学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-092.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/1893466/"
  },
  {
    "id": 93,
    "title": "红玫瑰与白玫瑰",
    "author": "张爱玲",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-093.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/1014278/"
  },
  {
    "id": 94,
    "title": "三国演义",
    "author": "罗贯中",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-094.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/1483894/"
  },
  {
    "id": 95,
    "title": "少有人走的路",
    "author": "[美] M·斯科特·派克",
    "category": "心理",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-095.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/1775691/"
  },
  {
    "id": 96,
    "title": "三国演义（全二册）",
    "author": "[明] 罗贯中",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-096.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/1019568/"
  },
  {
    "id": 97,
    "title": "狂人日记",
    "author": "鲁迅",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-097.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/1398395/"
  },
  {
    "id": 98,
    "title": "阿Q正传",
    "author": "鲁迅 著",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-098.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/1088065/"
  },
  {
    "id": 99,
    "title": "故事新编",
    "author": "鲁迅",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-099.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/2046909/"
  },
  {
    "id": 100,
    "title": "社会心理学（第11版，精装彩印）",
    "author": "[美] 戴维·迈尔斯",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-100.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/25982198/"
  },
  {
    "id": 101,
    "title": "四世同堂",
    "author": "老舍",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-101.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/3183775/"
  },
  {
    "id": 102,
    "title": "呐喊",
    "author": "鲁迅",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-102.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/1449351/"
  },
  {
    "id": 103,
    "title": "那些年，我们一起追的女孩",
    "author": "九把刀",
    "category": "教育",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-103.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/1958227/"
  },
  {
    "id": 104,
    "title": "海子的诗",
    "author": "海子",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-104.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/1011754/"
  },
  {
    "id": 105,
    "title": "巴黎圣母院",
    "author": "雨果",
    "category": "哲学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-105.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/2253413/"
  },
  {
    "id": 106,
    "title": "家",
    "author": "巴金",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-106.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/1082522/"
  },
  {
    "id": 107,
    "title": "史玉柱自述",
    "author": "优米网",
    "category": "商业",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-107.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/24541955/"
  },
  {
    "id": 108,
    "title": "悲惨世界（上中下）",
    "author": "[法] 雨果",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-108.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/1205054/"
  },
  {
    "id": 109,
    "title": "人间失格",
    "author": "太宰治",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-109.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/4011670/"
  },
  {
    "id": 110,
    "title": "月亮和六便士",
    "author": "[英] 毛姆",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-110.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/4123116/"
  },
  {
    "id": 111,
    "title": "钱锺书",
    "author": "汤晏",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-111.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/30406493/"
  },
  {
    "id": 112,
    "title": "孤独六讲",
    "author": "蒋勋",
    "category": "心理",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-112.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/4124727/"
  },
  {
    "id": 113,
    "title": "了不起的盖茨比",
    "author": "[美] 菲茨杰拉德",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-113.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/1008988/"
  },
  {
    "id": 114,
    "title": "杀死一只知更鸟",
    "author": "[美] 哈珀·李",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-114.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/6781808/"
  },
  {
    "id": 115,
    "title": "带上她的眼睛",
    "author": "刘慈欣",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-115.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/1195590/"
  },
  {
    "id": 116,
    "title": "写给大家的西方美术史",
    "author": "蒋勋",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-116.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/26417490/"
  },
  {
    "id": 117,
    "title": "1Q84 BOOK 2",
    "author": "[日] 村上春树",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-117.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/4885241/"
  },
  {
    "id": 118,
    "title": "飘",
    "author": "[美国] 玛格丽特·米切尔",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-118.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/1068920/"
  },
  {
    "id": 119,
    "title": "半生缘",
    "author": "张爱玲",
    "category": "传记",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-119.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/1963684/"
  },
  {
    "id": 120,
    "title": "百年孤独",
    "author": "[哥伦比亚] 加西亚·马尔克斯",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-120.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/6082808/"
  },
  {
    "id": 121,
    "title": "赎罪",
    "author": "[英] 伊恩·麦克尤恩(Ian McEwan)",
    "category": "自我成长",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-121.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/6440022/"
  },
  {
    "id": 122,
    "title": "异禀",
    "author": "不有",
    "category": "文学",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-122.jpg",
    "rating": 0,
    "doubanUrl": "https://book.douban.com/subject/26323149/"
  },
  {
    "id": 123,
    "title": "腾讯传",
    "author": "吴晓波",
    "category": "商业",
    "session": null,
    "date": "2020-02-27",
    "intro": "",
    "cover": "files/covers/books/book-123.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/26929955/"
  },
  {
    "id": 124,
    "title": "活着",
    "author": "余华",
    "category": "文学",
    "session": null,
    "date": "2019-09-26",
    "intro": "每次看的感觉都不一样，但是故事都像真的一样发生在脑海里",
    "cover": "files/covers/books/book-124.jpg",
    "rating": 5,
    "doubanUrl": "https://book.douban.com/subject/4913064/"
  },
  {
    "id": 125,
    "title": "小王子",
    "author": "[法国] 安东尼·德·圣-埃克苏佩里",
    "category": "文学",
    "session": null,
    "date": "2019-09-26",
    "intro": "看书和看电影的感觉很不一样",
    "cover": "files/covers/books/book-125.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/1084336/"
  },
  {
    "id": 126,
    "title": "独居的一年",
    "author": "[美] 约翰·欧文",
    "category": "文学",
    "session": null,
    "date": "2019-07-17",
    "intro": "",
    "cover": "files/covers/books/book-126.jpg",
    "rating": 4,
    "doubanUrl": "https://book.douban.com/subject/27036317/"
  }
];

const MOVIES = [
  {
    "id": 1,
    "title": "还有明天",
    "director": "宝拉·柯特莱西",
    "genres": [
      "剧情",
      "喜剧",
      "历史"
    ],
    "year": "2023",
    "rating": 3,
    "date": "2026-07-13",
    "comment": "很压抑",
    "cover": "files/covers/movies/movie-001.jpg",
    "doubanUrl": "https://movie.douban.com/subject/36445098/"
  },
  {
    "id": 2,
    "title": "功夫女足",
    "director": "周星驰",
    "genres": [
      "剧情",
      "喜剧",
      "运动"
    ],
    "year": "2026",
    "rating": 1,
    "date": "2026-07-13",
    "comment": "Laji",
    "cover": "files/covers/movies/movie-002.jpg",
    "doubanUrl": "https://movie.douban.com/subject/36452545/"
  },
  {
    "id": 3,
    "title": "我，许可",
    "director": "杨荔钠",
    "genres": [
      "剧情",
      "喜剧"
    ],
    "year": "2026",
    "rating": 5,
    "date": "2026-05-28",
    "comment": "",
    "cover": "files/covers/movies/movie-003.jpg",
    "doubanUrl": "https://movie.douban.com/subject/37332784/"
  },
  {
    "id": 4,
    "title": "机器人之梦",
    "director": "巴勃罗·贝格尔",
    "genres": [
      "剧情",
      "动画",
      "音乐"
    ],
    "year": "2023",
    "rating": 5,
    "date": "2026-05-14",
    "comment": "",
    "cover": "files/covers/movies/movie-004.jpg",
    "doubanUrl": "https://movie.douban.com/subject/35426925/"
  },
  {
    "id": 5,
    "title": "晨时空虚的我",
    "director": "石桥夕帆",
    "genres": [
      "剧情"
    ],
    "year": "2023",
    "rating": 5,
    "date": "2026-05-06",
    "comment": "",
    "cover": "files/covers/movies/movie-005.jpg",
    "doubanUrl": "https://movie.douban.com/subject/36118686/"
  },
  {
    "id": 6,
    "title": "我啊，走自己的路",
    "director": "冲田修一",
    "genres": [
      "剧情"
    ],
    "year": "2020",
    "rating": 4,
    "date": "2026-05-06",
    "comment": "",
    "cover": "files/covers/movies/movie-006.jpg",
    "doubanUrl": "https://movie.douban.com/subject/34954088/"
  },
  {
    "id": 7,
    "title": "婚姻生活",
    "director": "海加·李维",
    "genres": [
      "剧情"
    ],
    "year": "2021",
    "rating": 4,
    "date": "2026-05-06",
    "comment": "",
    "cover": "files/covers/movies/movie-007.jpg",
    "doubanUrl": "https://movie.douban.com/subject/35136700/"
  },
  {
    "id": 8,
    "title": "暗处的女儿",
    "director": "玛吉·吉伦哈尔",
    "genres": [
      "剧情"
    ],
    "year": "2021",
    "rating": 5,
    "date": "2026-04-27",
    "comment": "",
    "cover": "files/covers/movies/movie-008.jpg",
    "doubanUrl": "https://movie.douban.com/subject/30344474/"
  },
  {
    "id": 9,
    "title": "外出偷马",
    "director": "汉斯·皮特·莫朗",
    "genres": [
      "剧情",
      "悬疑"
    ],
    "year": "2019",
    "rating": 5,
    "date": "2026-04-27",
    "comment": "",
    "cover": "files/covers/movies/movie-009.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26756220/"
  },
  {
    "id": 10,
    "title": "完美的日子",
    "director": "维姆·文德斯",
    "genres": [
      "剧情"
    ],
    "year": "2023",
    "rating": 5,
    "date": "2026-04-27",
    "comment": "",
    "cover": "files/covers/movies/movie-010.jpg",
    "doubanUrl": "https://movie.douban.com/subject/35902857/"
  },
  {
    "id": 11,
    "title": "涉过愤怒的海",
    "director": "曹保平",
    "genres": [
      "剧情",
      "悬疑",
      "犯罪"
    ],
    "year": "2023",
    "rating": 4,
    "date": "2026-04-27",
    "comment": "",
    "cover": "files/covers/movies/movie-011.jpg",
    "doubanUrl": "https://movie.douban.com/subject/33456512/"
  },
  {
    "id": 12,
    "title": "我的家里空无一物",
    "director": "新井友香",
    "genres": [
      "剧情",
      "喜剧"
    ],
    "year": "2016",
    "rating": 4,
    "date": "2026-04-08",
    "comment": "",
    "cover": "files/covers/movies/movie-012.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26689409/"
  },
  {
    "id": 13,
    "title": "海蒂和爷爷",
    "director": "阿兰·葛斯彭纳",
    "genres": [
      "剧情",
      "家庭",
      "冒险"
    ],
    "year": "2015",
    "rating": 5,
    "date": "2026-04-03",
    "comment": "治愈",
    "cover": "files/covers/movies/movie-013.jpg",
    "doubanUrl": "https://movie.douban.com/subject/25958717/"
  },
  {
    "id": 14,
    "title": "慢行列车",
    "director": "土井裕泰",
    "genres": [
      "剧情",
      "喜剧",
      "家庭"
    ],
    "year": "2025",
    "rating": 4,
    "date": "2025-10-05",
    "comment": "",
    "cover": "files/covers/movies/movie-014.jpg",
    "doubanUrl": "https://movie.douban.com/subject/37090455/"
  },
  {
    "id": 15,
    "title": "名侦探柯南特典：怪盗基德诞生的秘密",
    "director": "青山刚昌",
    "genres": [
      "剧情",
      "悬疑",
      "犯罪"
    ],
    "year": "2010",
    "rating": 5,
    "date": "2025-01-05",
    "comment": "",
    "cover": "files/covers/movies/movie-015.jpg",
    "doubanUrl": "https://movie.douban.com/subject/5948606/"
  },
  {
    "id": 16,
    "title": "小小的我",
    "director": "杨荔钠",
    "genres": [
      "剧情",
      "家庭"
    ],
    "year": "2024",
    "rating": 3,
    "date": "2025-01-04",
    "comment": "",
    "cover": "files/covers/movies/movie-016.jpg",
    "doubanUrl": "https://movie.douban.com/subject/36498717/"
  },
  {
    "id": 17,
    "title": "名侦探柯南：计时引爆摩天楼",
    "director": "儿玉兼嗣",
    "genres": [
      "动画",
      "悬疑"
    ],
    "year": "1997",
    "rating": 0,
    "date": "2025-01-03",
    "comment": "",
    "cover": "files/covers/movies/movie-017.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1439579/"
  },
  {
    "id": 18,
    "title": "名侦探柯南：迷宫的十字路口",
    "director": "儿玉兼嗣",
    "genres": [
      "动画",
      "悬疑",
      "冒险"
    ],
    "year": "2003",
    "rating": 4,
    "date": "2025-01-03",
    "comment": "",
    "cover": "files/covers/movies/movie-018.jpg",
    "doubanUrl": "https://movie.douban.com/subject/2357707/"
  },
  {
    "id": 19,
    "title": "好东西",
    "director": "邵艺辉",
    "genres": [
      "剧情",
      "爱情"
    ],
    "year": "2024",
    "rating": 5,
    "date": "2024-11-24",
    "comment": "",
    "cover": "files/covers/movies/movie-019.jpg",
    "doubanUrl": "https://movie.douban.com/subject/36154853/"
  },
  {
    "id": 20,
    "title": "坠落的审判",
    "director": "茹斯汀·特里耶",
    "genres": [
      "剧情",
      "家庭"
    ],
    "year": "2023",
    "rating": 5,
    "date": "2024-11-23",
    "comment": "",
    "cover": "files/covers/movies/movie-020.jpg",
    "doubanUrl": "https://movie.douban.com/subject/35633650/"
  },
  {
    "id": 21,
    "title": "楚门的世界",
    "director": "彼得·威尔",
    "genres": [
      "剧情",
      "科幻"
    ],
    "year": "1998",
    "rating": 4,
    "date": "2024-11-23",
    "comment": "",
    "cover": "files/covers/movies/movie-021.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1292064/"
  },
  {
    "id": 22,
    "title": "本杰明·巴顿奇事",
    "director": "大卫·芬奇",
    "genres": [
      "剧情",
      "爱情",
      "奇幻"
    ],
    "year": "2008",
    "rating": 5,
    "date": "2024-11-22",
    "comment": "",
    "cover": "files/covers/movies/movie-022.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1485260/"
  },
  {
    "id": 23,
    "title": "莉亚的7重人生",
    "director": "Charlotte Sanson",
    "genres": [
      "剧情",
      "悬疑",
      "惊悚"
    ],
    "year": "2022",
    "rating": 5,
    "date": "2024-10-13",
    "comment": "",
    "cover": "files/covers/movies/movie-023.jpg",
    "doubanUrl": "https://movie.douban.com/subject/35840285/"
  },
  {
    "id": 24,
    "title": "出走的决心",
    "director": "尹丽川 ",
    "genres": [
      "剧情",
      "家庭"
    ],
    "year": "2024",
    "rating": 3,
    "date": "2024-09-29",
    "comment": "压抑",
    "cover": "files/covers/movies/movie-024.jpg",
    "doubanUrl": "https://movie.douban.com/subject/36587974/"
  },
  {
    "id": 25,
    "title": "西游记之孙悟空三打白骨精",
    "director": "郑保瑞",
    "genres": [
      "喜剧",
      "动作",
      "奇幻"
    ],
    "year": "2016",
    "rating": 5,
    "date": "2024-09-15",
    "comment": "复看第二遍，发现还是有深意的",
    "cover": "files/covers/movies/movie-025.jpg",
    "doubanUrl": "https://movie.douban.com/subject/25827963/"
  },
  {
    "id": 26,
    "title": "泳者之心",
    "director": "乔阿吉姆·罗恩尼",
    "genres": [
      "剧情",
      "传记",
      "运动"
    ],
    "year": "2024",
    "rating": 4,
    "date": "2024-09-15",
    "comment": "剧情有点慢",
    "cover": "files/covers/movies/movie-026.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26656728/"
  },
  {
    "id": 27,
    "title": "荒野机器人",
    "director": "克里斯·桑德斯",
    "genres": [
      "科幻",
      "动画",
      "冒险"
    ],
    "year": "2024",
    "rating": 4,
    "date": "2024-09-13",
    "comment": "",
    "cover": "files/covers/movies/movie-027.jpg",
    "doubanUrl": "https://movie.douban.com/subject/36689857/"
  },
  {
    "id": 28,
    "title": "神偷奶爸4",
    "director": "克里斯·雷纳德 /  帕特里克·德拉吉",
    "genres": [
      "喜剧",
      "动画",
      "冒险"
    ],
    "year": "2024",
    "rating": 3,
    "date": "2024-09-09",
    "comment": "",
    "cover": "files/covers/movies/movie-028.jpg",
    "doubanUrl": "https://movie.douban.com/subject/30170847/"
  },
  {
    "id": 29,
    "title": "头脑特工队2",
    "director": "凯尔西·曼",
    "genres": [
      "剧情",
      "喜剧",
      "动画"
    ],
    "year": "2024",
    "rating": 4,
    "date": "2024-09-09",
    "comment": "",
    "cover": "files/covers/movies/movie-029.jpg",
    "doubanUrl": "https://movie.douban.com/subject/36090457/"
  },
  {
    "id": 30,
    "title": "你的名字。",
    "director": "新海诚",
    "genres": [
      "剧情",
      "爱情",
      "动画"
    ],
    "year": "2016",
    "rating": 5,
    "date": "2024-08-17",
    "comment": "",
    "cover": "files/covers/movies/movie-030.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26683290/"
  },
  {
    "id": 31,
    "title": "铃芽之旅",
    "director": "新海诚",
    "genres": [
      "爱情",
      "动画",
      "奇幻"
    ],
    "year": "2022",
    "rating": 4,
    "date": "2024-08-17",
    "comment": "",
    "cover": "files/covers/movies/movie-031.jpg",
    "doubanUrl": "https://movie.douban.com/subject/35371261/"
  },
  {
    "id": 32,
    "title": "名侦探柯南：百万美元的五棱星",
    "director": "永冈智佳",
    "genres": [
      "动画",
      "悬疑",
      "犯罪"
    ],
    "year": "2024",
    "rating": 4,
    "date": "2024-08-17",
    "comment": "",
    "cover": "files/covers/movies/movie-032.jpg",
    "doubanUrl": "https://movie.douban.com/subject/36363001/"
  },
  {
    "id": 33,
    "title": "拉字至上  第六季",
    "director": "厄内斯特·R·迪克森",
    "genres": [
      "剧情",
      "爱情",
      "同性"
    ],
    "year": "2009",
    "rating": 5,
    "date": "2024-07-20",
    "comment": "",
    "cover": "files/covers/movies/movie-033.jpg",
    "doubanUrl": "https://movie.douban.com/subject/3676753/"
  },
  {
    "id": 34,
    "title": "拉字至上  第五季",
    "director": "安吉拉·罗宾森 / 詹米·巴比特",
    "genres": [
      "剧情",
      "爱情"
    ],
    "year": "2008",
    "rating": 5,
    "date": "2024-07-19",
    "comment": "",
    "cover": "files/covers/movies/movie-034.jpg",
    "doubanUrl": "https://movie.douban.com/subject/3676748/"
  },
  {
    "id": 35,
    "title": "拉字至上  第四季",
    "director": "布朗温·休斯 / 约翰·斯托克韦尔",
    "genres": [
      "剧情",
      "爱情",
      "同性"
    ],
    "year": "2007",
    "rating": 5,
    "date": "2024-07-15",
    "comment": "",
    "cover": "files/covers/movies/movie-035.jpg",
    "doubanUrl": "https://movie.douban.com/subject/3676719/"
  },
  {
    "id": 36,
    "title": "拉字至上  第三季",
    "director": "Rose Troche / Bille Eltringham",
    "genres": [
      "剧情",
      "爱情",
      "同性"
    ],
    "year": "2006",
    "rating": 3,
    "date": "2024-07-01",
    "comment": "",
    "cover": "files/covers/movies/movie-036.jpg",
    "doubanUrl": "https://movie.douban.com/subject/3676702/"
  },
  {
    "id": 37,
    "title": "拉字至上  第二季",
    "director": "Rose Troche / Lynne Stopkewich",
    "genres": [
      "剧情",
      "爱情",
      "同性"
    ],
    "year": "2005",
    "rating": 4,
    "date": "2024-07-01",
    "comment": "",
    "cover": "files/covers/movies/movie-037.jpg",
    "doubanUrl": "https://movie.douban.com/subject/3676686/"
  },
  {
    "id": 38,
    "title": "拉字至上  第一季",
    "director": "厄内斯特·R·迪克森",
    "genres": [
      "剧情",
      "爱情",
      "同性"
    ],
    "year": "2004",
    "rating": 4,
    "date": "2024-06-28",
    "comment": "",
    "cover": "files/covers/movies/movie-038.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1397345/"
  },
  {
    "id": 39,
    "title": "珍的不一样 第一季",
    "director": "托比·麦克唐纳 / 詹妮弗·谢里丹",
    "genres": [
      "喜剧",
      "动作",
      "科幻"
    ],
    "year": "2023",
    "rating": 4,
    "date": "2024-06-02",
    "comment": "",
    "cover": "files/covers/movies/movie-039.jpg",
    "doubanUrl": "https://movie.douban.com/subject/36059104/"
  },
  {
    "id": 40,
    "title": "爱填满空白 第二季",
    "director": "Siriphan Wongsawan",
    "genres": [
      "剧情",
      "爱情",
      "同性"
    ],
    "year": "2024",
    "rating": 5,
    "date": "2024-06-02",
    "comment": "第一集好看，后面不太行",
    "cover": "files/covers/movies/movie-040.jpg",
    "doubanUrl": "https://movie.douban.com/subject/36901628/"
  },
  {
    "id": 41,
    "title": "爱填满空白",
    "director": "卡沙玛·尼塞潘 / Siriphan Wongsawan",
    "genres": [
      "剧情",
      "爱情",
      "同性"
    ],
    "year": "2024",
    "rating": 4,
    "date": "2024-06-02",
    "comment": "绿茶太婊",
    "cover": "files/covers/movies/movie-041.jpg",
    "doubanUrl": "https://movie.douban.com/subject/36787778/"
  },
  {
    "id": 42,
    "title": "红色天空",
    "director": "克里斯蒂安·佩措尔德",
    "genres": [
      "剧情",
      "爱情"
    ],
    "year": "2023",
    "rating": 5,
    "date": "2024-05-06",
    "comment": "",
    "cover": "files/covers/movies/movie-042.jpg",
    "doubanUrl": "https://movie.douban.com/subject/35221425/"
  },
  {
    "id": 43,
    "title": "不能说的夏天",
    "director": "王维明",
    "genres": [
      "剧情"
    ],
    "year": "2014",
    "rating": 4,
    "date": "2024-04-10",
    "comment": "",
    "cover": "files/covers/movies/movie-043.jpg",
    "doubanUrl": "https://movie.douban.com/subject/25743833/"
  },
  {
    "id": 44,
    "title": "羞耻 第四季",
    "director": "尤莉娅·安德姆",
    "genres": [
      "剧情",
      "爱情"
    ],
    "year": "2017",
    "rating": 4,
    "date": "2024-03-29",
    "comment": "",
    "cover": "files/covers/movies/movie-044.jpg",
    "doubanUrl": "https://movie.douban.com/subject/27012497/"
  },
  {
    "id": 45,
    "title": "羞耻 第二季",
    "director": "尤莉娅·安德姆",
    "genres": [
      "剧情",
      "爱情"
    ],
    "year": "2016",
    "rating": 5,
    "date": "2024-03-29",
    "comment": "",
    "cover": "files/covers/movies/movie-045.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26910854/"
  },
  {
    "id": 46,
    "title": "羞耻 第一季",
    "director": "尤莉娅·安德姆",
    "genres": [
      "剧情",
      "爱情"
    ],
    "year": "2015",
    "rating": 5,
    "date": "2024-03-29",
    "comment": "",
    "cover": "files/covers/movies/movie-046.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26811831/"
  },
  {
    "id": 47,
    "title": "羞耻 法国版 第三季",
    "director": "大卫·霍雷格",
    "genres": [
      "剧情",
      "爱情",
      "同性"
    ],
    "year": "2019",
    "rating": 4,
    "date": "2024-02-02",
    "comment": "",
    "cover": "files/covers/movies/movie-047.jpg",
    "doubanUrl": "https://movie.douban.com/subject/30331451/"
  },
  {
    "id": 48,
    "title": "羞耻 法国版 第一季",
    "director": "大卫·霍雷格",
    "genres": [
      "剧情",
      "爱情"
    ],
    "year": "2018",
    "rating": 3,
    "date": "2024-02-02",
    "comment": "",
    "cover": "files/covers/movies/movie-048.jpg",
    "doubanUrl": "https://movie.douban.com/subject/30129005/"
  },
  {
    "id": 49,
    "title": "色，戒",
    "director": "李安",
    "genres": [
      "剧情",
      "爱情",
      "情色"
    ],
    "year": "2007",
    "rating": 3,
    "date": "2024-01-23",
    "comment": "",
    "cover": "files/covers/movies/movie-049.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1828115/"
  },
  {
    "id": 50,
    "title": "蓝白红三部曲之白",
    "director": "克日什托夫·基耶斯洛夫斯基",
    "genres": [
      "剧情",
      "喜剧",
      "爱情"
    ],
    "year": "1994",
    "rating": 4,
    "date": "2024-01-22",
    "comment": "",
    "cover": "files/covers/movies/movie-050.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1292049/"
  },
  {
    "id": 51,
    "title": "蓝白红三部曲之红",
    "director": "克日什托夫·基耶斯洛夫斯基",
    "genres": [
      "剧情",
      "爱情",
      "悬疑"
    ],
    "year": "1994",
    "rating": 5,
    "date": "2024-01-22",
    "comment": "",
    "cover": "files/covers/movies/movie-051.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1292047/"
  },
  {
    "id": 52,
    "title": "蓝白红三部曲之蓝",
    "director": "克日什托夫·基耶斯洛夫斯基",
    "genres": [
      "剧情",
      "爱情",
      "音乐"
    ],
    "year": "1993",
    "rating": 5,
    "date": "2024-01-22",
    "comment": "",
    "cover": "files/covers/movies/movie-052.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1292048/"
  },
  {
    "id": 53,
    "title": "前任4：英年早婚",
    "director": "田羽生",
    "genres": [
      "喜剧",
      "爱情"
    ],
    "year": "2023",
    "rating": 2,
    "date": "2023-12-14",
    "comment": "烂片",
    "cover": "files/covers/movies/movie-053.jpg",
    "doubanUrl": "https://movie.douban.com/subject/35358443/"
  },
  {
    "id": 54,
    "title": "照明商店",
    "director": "蔡耳朵",
    "genres": [
      "剧情",
      "悬疑",
      "奇幻"
    ],
    "year": "2023",
    "rating": 3,
    "date": "2023-12-14",
    "comment": "只能给三星",
    "cover": "files/covers/movies/movie-054.jpg",
    "doubanUrl": "https://movie.douban.com/subject/36086210/"
  },
  {
    "id": 55,
    "title": "何以为家",
    "director": "娜丁·拉巴基",
    "genres": [
      "剧情"
    ],
    "year": "2018",
    "rating": 5,
    "date": "2023-12-02",
    "comment": "",
    "cover": "files/covers/movies/movie-055.jpg",
    "doubanUrl": "https://movie.douban.com/subject/30170448/"
  },
  {
    "id": 56,
    "title": "查泰莱夫人的情人",
    "director": "贾斯特·杰克金",
    "genres": [
      "剧情",
      "爱情",
      "情色"
    ],
    "year": "1981",
    "rating": 3,
    "date": "2023-12-02",
    "comment": "",
    "cover": "files/covers/movies/movie-056.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1302013/"
  },
  {
    "id": 57,
    "title": "花与爱丽丝杀人事件",
    "director": "岩井俊二",
    "genres": [
      "喜剧",
      "动画"
    ],
    "year": "2015",
    "rating": 5,
    "date": "2023-12-02",
    "comment": "",
    "cover": "files/covers/movies/movie-057.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26147706/"
  },
  {
    "id": 58,
    "title": "花与爱丽丝",
    "director": "岩井俊二",
    "genres": [
      "剧情",
      "喜剧",
      "爱情"
    ],
    "year": "2004",
    "rating": 5,
    "date": "2023-12-02",
    "comment": "",
    "cover": "files/covers/movies/movie-058.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1308820/"
  },
  {
    "id": 59,
    "title": "夜以继日",
    "director": "滨口龙介",
    "genres": [
      "剧情",
      "爱情"
    ],
    "year": "2018",
    "rating": 4,
    "date": "2023-11-30",
    "comment": "",
    "cover": "files/covers/movies/movie-059.jpg",
    "doubanUrl": "https://movie.douban.com/subject/27037053/"
  },
  {
    "id": 60,
    "title": "半梦半醒的人生",
    "director": "理查德·林克莱特",
    "genres": [
      "剧情",
      "动画",
      "悬疑"
    ],
    "year": "2001",
    "rating": 4,
    "date": "2023-11-29",
    "comment": "",
    "cover": "files/covers/movies/movie-060.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1304981/"
  },
  {
    "id": 61,
    "title": "珍品",
    "director": "卢·热内",
    "genres": [
      "剧情",
      "情色",
      "历史"
    ],
    "year": "2019",
    "rating": 4,
    "date": "2023-09-03",
    "comment": "",
    "cover": "files/covers/movies/movie-061.jpg",
    "doubanUrl": "https://movie.douban.com/subject/30188253/"
  },
  {
    "id": 62,
    "title": "幻灭 第四季",
    "director": "",
    "genres": [
      "喜剧",
      "动画",
      "奇幻"
    ],
    "year": "2022",
    "rating": 5,
    "date": "2023-08-21",
    "comment": "",
    "cover": "files/covers/movies/movie-062.jpg",
    "doubanUrl": "https://movie.douban.com/subject/35068571/"
  },
  {
    "id": 63,
    "title": "幻灭 第三季",
    "director": "",
    "genres": [
      "喜剧",
      "动作",
      "动画"
    ],
    "year": "2021",
    "rating": 5,
    "date": "2023-08-21",
    "comment": "",
    "cover": "files/covers/movies/movie-063.jpg",
    "doubanUrl": "https://movie.douban.com/subject/34912205/"
  },
  {
    "id": 64,
    "title": "幻灭 第二季",
    "director": "Albert Calleros",
    "genres": [
      "动画"
    ],
    "year": "2019",
    "rating": 5,
    "date": "2023-08-21",
    "comment": "",
    "cover": "files/covers/movies/movie-064.jpg",
    "doubanUrl": "https://movie.douban.com/subject/34847404/"
  },
  {
    "id": 65,
    "title": "幻灭 第一季",
    "director": "韦斯利·阿彻 / 皮特·阿凡季诺",
    "genres": [
      "动画",
      "奇幻",
      "冒险"
    ],
    "year": "2018",
    "rating": 0,
    "date": "2023-08-21",
    "comment": "公主寻找自我这么迪士尼的故事，按美剧套路一定要反其道而行之，何况还加上蓝精灵版的elf呢，可它保持了一个很好的度，唯美画风（配色太惊艳了）、中世纪背景设置、莎士比亚台词、各种细节抖包袱，保持了一种另类迪士尼的风格。Elfo那种正能量爱心爆棚的样子看着就像踢几脚，烟枪Luci跟酗酒公主，亦正亦邪领着Bean原地扑腾。舍弃了同类作品大量「闪回」的梗，都融进剧情里，细节都很搞笑。之前播宣传片以为会Shrek老婆那种公主，看完很佩服。把中世纪调侃了一把（各种类似多嘴奶袋这种道具展示到位），很过瘾，期待s2填坑。elfo在dreamland放飞自我后变可爱了。--姜小白评论",
    "cover": "files/covers/movies/movie-065.jpg",
    "doubanUrl": "https://movie.douban.com/subject/27008112/"
  },
  {
    "id": 66,
    "title": "爱，死亡和机器人 第二季",
    "director": "蒂姆·米勒 / 肉食部门",
    "genres": [
      "喜剧",
      "科幻",
      "动画"
    ],
    "year": "2021",
    "rating": 4,
    "date": "2023-04-16",
    "comment": "",
    "cover": "files/covers/movies/movie-066.jpg",
    "doubanUrl": "https://movie.douban.com/subject/34418203/"
  },
  {
    "id": 67,
    "title": "爱，死亡和机器人 第三季",
    "director": "帕特里克·奥斯本 / 大卫·芬奇",
    "genres": [
      "喜剧",
      "科幻",
      "动画"
    ],
    "year": "2022",
    "rating": 4,
    "date": "2023-04-16",
    "comment": "",
    "cover": "files/covers/movies/movie-067.jpg",
    "doubanUrl": "https://movie.douban.com/subject/35436582/"
  },
  {
    "id": 68,
    "title": "幸运汉克",
    "director": "丹尼尔·艾提奥斯 / 彼得·法雷里",
    "genres": [
      "剧情",
      "喜剧"
    ],
    "year": "2023",
    "rating": 5,
    "date": "2023-04-16",
    "comment": "愤青",
    "cover": "files/covers/movies/movie-068.jpg",
    "doubanUrl": "https://movie.douban.com/subject/35861233/"
  },
  {
    "id": 69,
    "title": "艾米丽在巴黎 第二季",
    "director": "安德鲁·弗莱明 / 彼得·劳尔",
    "genres": [
      "剧情",
      "喜剧",
      "爱情"
    ],
    "year": "2021",
    "rating": 4,
    "date": "2023-04-16",
    "comment": "",
    "cover": "files/covers/movies/movie-069.jpg",
    "doubanUrl": "https://movie.douban.com/subject/35250268/"
  },
  {
    "id": 70,
    "title": "艾米丽在巴黎 第三季",
    "director": "安德鲁·弗莱明",
    "genres": [
      "剧情",
      "喜剧",
      "爱情"
    ],
    "year": "2022",
    "rating": 3,
    "date": "2023-04-16",
    "comment": "",
    "cover": "files/covers/movies/movie-070.jpg",
    "doubanUrl": "https://movie.douban.com/subject/35730811/"
  },
  {
    "id": 71,
    "title": "致命女人 第二季",
    "director": "大卫·沃伦 / 詹妮弗·盖辛格",
    "genres": [
      "剧情",
      "喜剧",
      "犯罪"
    ],
    "year": "2021",
    "rating": 4,
    "date": "2023-04-16",
    "comment": "复仇",
    "cover": "files/covers/movies/movie-071.jpg",
    "doubanUrl": "https://movie.douban.com/subject/34859070/"
  },
  {
    "id": 72,
    "title": "咆哮",
    "director": "钱宁·戈德弗雷·皮普尔斯 / 金·格里格",
    "genres": [
      "剧情",
      "喜剧"
    ],
    "year": "2022",
    "rating": 5,
    "date": "2023-04-16",
    "comment": "独立意识觉醒",
    "cover": "files/covers/movies/movie-072.jpg",
    "doubanUrl": "https://movie.douban.com/subject/35382944/"
  },
  {
    "id": 73,
    "title": "种群",
    "director": "菲利普·施特尔茨尔 / 卢克·沃森",
    "genres": [
      "剧情",
      "惊悚"
    ],
    "year": "2023",
    "rating": 4,
    "date": "2023-04-16",
    "comment": "",
    "cover": "files/covers/movies/movie-073.jpg",
    "doubanUrl": "https://movie.douban.com/subject/2072475/"
  },
  {
    "id": 74,
    "title": "蜂群",
    "director": "唐纳德·格洛弗",
    "genres": [
      "剧情",
      "喜剧",
      "惊悚"
    ],
    "year": "2023",
    "rating": 0,
    "date": "2023-04-16",
    "comment": "",
    "cover": "files/covers/movies/movie-074.jpg",
    "doubanUrl": "https://movie.douban.com/subject/36242553/"
  },
  {
    "id": 75,
    "title": "流浪地球2",
    "director": "郭帆",
    "genres": [
      "科幻",
      "冒险",
      "灾难"
    ],
    "year": "2023",
    "rating": 3,
    "date": "2023-02-13",
    "comment": "故事性不明确，内容表达不深刻，情感表达冗余",
    "cover": "files/covers/movies/movie-075.jpg",
    "doubanUrl": "https://movie.douban.com/subject/35267208/"
  },
  {
    "id": 76,
    "title": "阿凡达：水之道",
    "director": "詹姆斯·卡梅隆",
    "genres": [
      "动作",
      "科幻",
      "冒险"
    ],
    "year": "2022",
    "rating": 5,
    "date": "2022-12-18",
    "comment": "",
    "cover": "files/covers/movies/movie-076.jpg",
    "doubanUrl": "https://movie.douban.com/subject/4811774/"
  },
  {
    "id": 77,
    "title": "东京教父",
    "director": "今敏",
    "genres": [
      "剧情",
      "喜剧",
      "动画"
    ],
    "year": "2003",
    "rating": 5,
    "date": "2022-11-06",
    "comment": "",
    "cover": "files/covers/movies/movie-077.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1310177/"
  },
  {
    "id": 78,
    "title": "千年女优",
    "director": "今敏",
    "genres": [
      "剧情",
      "爱情",
      "动画"
    ],
    "year": "2001",
    "rating": 5,
    "date": "2022-11-06",
    "comment": "",
    "cover": "files/covers/movies/movie-078.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1307394/"
  },
  {
    "id": 79,
    "title": "红辣椒",
    "director": "今敏",
    "genres": [
      "科幻",
      "动画",
      "悬疑"
    ],
    "year": "2006",
    "rating": 5,
    "date": "2022-11-06",
    "comment": "",
    "cover": "files/covers/movies/movie-079.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1865703/"
  },
  {
    "id": 80,
    "title": "未麻的部屋",
    "director": "今敏",
    "genres": [
      "剧情",
      "动画",
      "悬疑"
    ],
    "year": "1997",
    "rating": 5,
    "date": "2022-11-06",
    "comment": "",
    "cover": "files/covers/movies/movie-080.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1395091/"
  },
  {
    "id": 81,
    "title": "意大利制造",
    "director": "阿戈·帕尼尼 / 卢卡·卢奇尼",
    "genres": [
      "剧情",
      "喜剧"
    ],
    "year": "2019",
    "rating": 5,
    "date": "2022-03-07",
    "comment": "",
    "cover": "files/covers/movies/movie-081.jpg",
    "doubanUrl": "https://movie.douban.com/subject/34909362/"
  },
  {
    "id": 82,
    "title": "疼痛难免",
    "director": "露西·福布斯 / 汤姆·金斯利",
    "genres": [
      "剧情",
      "喜剧",
      "同性"
    ],
    "year": "2022",
    "rating": 5,
    "date": "2022-02-17",
    "comment": "",
    "cover": "files/covers/movies/movie-082.jpg",
    "doubanUrl": "https://movie.douban.com/subject/30267255/"
  },
  {
    "id": 83,
    "title": "复仇者联盟3：无限战争",
    "director": "安东尼·罗素 / 乔·罗素",
    "genres": [
      "动作",
      "科幻",
      "奇幻"
    ],
    "year": "2018",
    "rating": 4,
    "date": "2021-12-31",
    "comment": "",
    "cover": "files/covers/movies/movie-083.jpg",
    "doubanUrl": "https://movie.douban.com/subject/24773958/"
  },
  {
    "id": 84,
    "title": "复仇者联盟4：终局之战",
    "director": "安东尼·罗素 / 乔·罗素",
    "genres": [
      "剧情",
      "动作",
      "科幻"
    ],
    "year": "2019",
    "rating": 4,
    "date": "2021-12-31",
    "comment": "",
    "cover": "files/covers/movies/movie-084.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26100958/"
  },
  {
    "id": 85,
    "title": "南方车站的聚会",
    "director": "刁亦男",
    "genres": [
      "剧情",
      "犯罪"
    ],
    "year": "2019",
    "rating": 4,
    "date": "2021-12-10",
    "comment": "",
    "cover": "files/covers/movies/movie-085.jpg",
    "doubanUrl": "https://movie.douban.com/subject/27668250/"
  },
  {
    "id": 86,
    "title": "黑洞频率",
    "director": "格里高利·霍布里特",
    "genres": [
      "科幻",
      "悬疑",
      "犯罪"
    ],
    "year": "2000",
    "rating": 5,
    "date": "2021-12-04",
    "comment": "",
    "cover": "files/covers/movies/movie-086.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1294183/"
  },
  {
    "id": 87,
    "title": "黑暗面",
    "director": "安德烈斯·拜斯",
    "genres": [
      "剧情",
      "悬疑",
      "惊悚"
    ],
    "year": "2011",
    "rating": 5,
    "date": "2021-10-02",
    "comment": "",
    "cover": "files/covers/movies/movie-087.jpg",
    "doubanUrl": "https://movie.douban.com/subject/6536180/"
  },
  {
    "id": 88,
    "title": "请以你的名字呼唤我",
    "director": "卢卡·瓜达尼诺",
    "genres": [
      "剧情",
      "爱情",
      "同性"
    ],
    "year": "2017",
    "rating": 5,
    "date": "2021-07-01",
    "comment": "",
    "cover": "files/covers/movies/movie-088.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26799731/"
  },
  {
    "id": 89,
    "title": "我的姐姐",
    "director": "殷若昕",
    "genres": [
      "剧情",
      "家庭"
    ],
    "year": "2021",
    "rating": 4,
    "date": "2021-04-03",
    "comment": "比《你好，李焕英》好看点",
    "cover": "files/covers/movies/movie-089.jpg",
    "doubanUrl": "https://movie.douban.com/subject/35158160/"
  },
  {
    "id": 90,
    "title": "纽约纽约",
    "director": "罗冬",
    "genres": [
      "剧情",
      "爱情"
    ],
    "year": "2016",
    "rating": 3,
    "date": "2021-03-04",
    "comment": "",
    "cover": "files/covers/movies/movie-090.jpg",
    "doubanUrl": "https://movie.douban.com/subject/25881781/"
  },
  {
    "id": 91,
    "title": "刺杀小说家",
    "director": "路阳",
    "genres": [
      "动作",
      "奇幻",
      "冒险"
    ],
    "year": "2021",
    "rating": 2,
    "date": "2021-02-27",
    "comment": "",
    "cover": "files/covers/movies/movie-091.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26826330/"
  },
  {
    "id": 92,
    "title": "你好，李焕英",
    "director": "贾玲",
    "genres": [
      "剧情",
      "喜剧",
      "奇幻"
    ],
    "year": "2021",
    "rating": 4,
    "date": "2021-02-27",
    "comment": "",
    "cover": "files/covers/movies/movie-092.jpg",
    "doubanUrl": "https://movie.douban.com/subject/34841067/"
  },
  {
    "id": 93,
    "title": "爱之谷",
    "director": "纪尧姆·尼克卢",
    "genres": [
      "剧情"
    ],
    "year": "2015",
    "rating": 4,
    "date": "2021-02-27",
    "comment": "",
    "cover": "files/covers/movies/movie-093.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26312158/"
  },
  {
    "id": 94,
    "title": "将来的事",
    "director": "米娅·汉森-洛夫",
    "genres": [
      "剧情"
    ],
    "year": "2016",
    "rating": 5,
    "date": "2021-02-20",
    "comment": "",
    "cover": "files/covers/movies/movie-094.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26215216/"
  },
  {
    "id": 95,
    "title": "爱",
    "director": "迈克尔·哈内克",
    "genres": [
      "剧情",
      "爱情"
    ],
    "year": "2012",
    "rating": 4,
    "date": "2021-02-17",
    "comment": "",
    "cover": "files/covers/movies/movie-095.jpg",
    "doubanUrl": "https://movie.douban.com/subject/4798707/"
  },
  {
    "id": 96,
    "title": "流浪猫鲍勃",
    "director": "罗杰·斯波蒂斯伍德",
    "genres": [
      "剧情",
      "喜剧",
      "传记"
    ],
    "year": "2016",
    "rating": 4,
    "date": "2021-02-13",
    "comment": "",
    "cover": "files/covers/movies/movie-096.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26685451/"
  },
  {
    "id": 97,
    "title": "布兰卡和弹吉他的人",
    "director": "长谷井宏纪",
    "genres": [
      "剧情",
      "音乐"
    ],
    "year": "2015",
    "rating": 5,
    "date": "2021-02-10",
    "comment": "",
    "cover": "files/covers/movies/movie-097.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26596361/"
  },
  {
    "id": 98,
    "title": "婚姻故事",
    "director": "诺亚·鲍姆巴赫",
    "genres": [
      "剧情",
      "爱情"
    ],
    "year": "2019",
    "rating": 5,
    "date": "2021-02-09",
    "comment": "",
    "cover": "files/covers/movies/movie-098.jpg",
    "doubanUrl": "https://movie.douban.com/subject/27202818/"
  },
  {
    "id": 99,
    "title": "漫长的婚约",
    "director": "让-皮埃尔·热内",
    "genres": [
      "剧情",
      "爱情",
      "悬疑"
    ],
    "year": "2004",
    "rating": 4,
    "date": "2021-02-07",
    "comment": "",
    "cover": "files/covers/movies/movie-099.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1292234/"
  },
  {
    "id": 100,
    "title": "我的天才女友 第二季",
    "director": "萨维里奥·科斯坦佐 / 阿莉切·罗尔瓦赫尔",
    "genres": [
      "剧情"
    ],
    "year": "2020",
    "rating": 4,
    "date": "2021-02-07",
    "comment": "",
    "cover": "files/covers/movies/movie-100.jpg",
    "doubanUrl": "https://movie.douban.com/subject/30395843/"
  },
  {
    "id": 101,
    "title": "我的天才女友 第一季",
    "director": "萨维里奥·科斯坦佐",
    "genres": [
      "剧情"
    ],
    "year": "2018",
    "rating": 4,
    "date": "2021-02-07",
    "comment": "",
    "cover": "files/covers/movies/movie-101.jpg",
    "doubanUrl": "https://movie.douban.com/subject/28427782/"
  },
  {
    "id": 102,
    "title": "婚姻生活",
    "director": "英格玛·伯格曼",
    "genres": [
      "剧情",
      "爱情"
    ],
    "year": "1973",
    "rating": 5,
    "date": "2021-02-07",
    "comment": "",
    "cover": "files/covers/movies/movie-102.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1292981/"
  },
  {
    "id": 103,
    "title": "精疲力尽",
    "director": "让-吕克·戈达尔",
    "genres": [
      "剧情",
      "爱情",
      "犯罪"
    ],
    "year": "1960",
    "rating": 5,
    "date": "2021-02-07",
    "comment": "",
    "cover": "files/covers/movies/movie-103.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1353745/"
  },
  {
    "id": 104,
    "title": "乐队的夏天 第二季",
    "director": "王雪 / 陈雨璇",
    "genres": [
      "音乐",
      "真人秀"
    ],
    "year": "2020",
    "rating": 4,
    "date": "2021-02-07",
    "comment": "",
    "cover": "files/covers/movies/movie-104.jpg",
    "doubanUrl": "https://movie.douban.com/subject/34660591/"
  },
  {
    "id": 105,
    "title": "除暴",
    "director": "刘浩良",
    "genres": [
      "剧情",
      "动作",
      "犯罪"
    ],
    "year": "2020",
    "rating": 3,
    "date": "2021-02-07",
    "comment": "",
    "cover": "files/covers/movies/movie-105.jpg",
    "doubanUrl": "https://movie.douban.com/subject/30373723/"
  },
  {
    "id": 106,
    "title": "永不妥协",
    "director": "史蒂文·索德伯格",
    "genres": [
      "剧情",
      "传记"
    ],
    "year": "2000",
    "rating": 4,
    "date": "2021-02-07",
    "comment": "",
    "cover": "files/covers/movies/movie-106.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1293050/"
  },
  {
    "id": 107,
    "title": "易时间 第一季",
    "director": "",
    "genres": [
      "脱口秀"
    ],
    "year": "2015",
    "rating": 4,
    "date": "2021-02-07",
    "comment": "",
    "cover": "files/covers/movies/movie-107.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26433386/"
  },
  {
    "id": 108,
    "title": "易时间 第二季",
    "director": "易立竞",
    "genres": [
      "脱口秀"
    ],
    "year": "2017",
    "rating": 4,
    "date": "2021-02-07",
    "comment": "",
    "cover": "files/covers/movies/movie-108.jpg",
    "doubanUrl": "https://movie.douban.com/subject/27145073/"
  },
  {
    "id": 109,
    "title": "立场",
    "director": "冯键",
    "genres": [
      "脱口秀"
    ],
    "year": "2019",
    "rating": 4,
    "date": "2021-02-07",
    "comment": "",
    "cover": "files/covers/movies/movie-109.jpg",
    "doubanUrl": "https://movie.douban.com/subject/30464579/"
  },
  {
    "id": 110,
    "title": "三十而已",
    "director": "张晓波",
    "genres": [
      "剧情",
      "家庭"
    ],
    "year": "2020",
    "rating": 4,
    "date": "2021-02-07",
    "comment": "",
    "cover": "files/covers/movies/movie-110.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26608230/"
  },
  {
    "id": 111,
    "title": "艾米丽在巴黎 第一季",
    "director": "安德鲁·弗莱明 / Zoe Cassavetes",
    "genres": [
      "剧情",
      "喜剧",
      "爱情"
    ],
    "year": "2020",
    "rating": 5,
    "date": "2021-02-07",
    "comment": "",
    "cover": "files/covers/movies/movie-111.jpg",
    "doubanUrl": "https://movie.douban.com/subject/30319440/"
  },
  {
    "id": 112,
    "title": "时尚先锋香奈儿",
    "director": "安妮·芳婷",
    "genres": [
      "剧情",
      "传记"
    ],
    "year": "2009",
    "rating": 3,
    "date": "2021-02-07",
    "comment": "",
    "cover": "files/covers/movies/movie-112.jpg",
    "doubanUrl": "https://movie.douban.com/subject/2148257/"
  },
  {
    "id": 113,
    "title": "遭遇陌生人",
    "director": "伍迪·艾伦",
    "genres": [
      "剧情",
      "喜剧",
      "爱情"
    ],
    "year": "2010",
    "rating": 5,
    "date": "2021-02-06",
    "comment": "",
    "cover": "files/covers/movies/movie-113.jpg",
    "doubanUrl": "https://movie.douban.com/subject/2997063/"
  },
  {
    "id": 114,
    "title": "午夜巴塞罗那",
    "director": "伍迪·艾伦",
    "genres": [
      "剧情",
      "爱情"
    ],
    "year": "2008",
    "rating": 5,
    "date": "2021-02-06",
    "comment": "",
    "cover": "files/covers/movies/movie-114.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1981242/"
  },
  {
    "id": 115,
    "title": "沐浴之王",
    "director": "易小星",
    "genres": [
      "喜剧"
    ],
    "year": "2020",
    "rating": 3,
    "date": "2021-02-06",
    "comment": "",
    "cover": "files/covers/movies/movie-115.jpg",
    "doubanUrl": "https://movie.douban.com/subject/34894753/"
  },
  {
    "id": 116,
    "title": "送你一朵小红花",
    "director": "韩延",
    "genres": [
      "剧情"
    ],
    "year": "2020",
    "rating": 3,
    "date": "2021-02-06",
    "comment": "",
    "cover": "files/covers/movies/movie-116.jpg",
    "doubanUrl": "https://movie.douban.com/subject/35096844/"
  },
  {
    "id": 117,
    "title": "嫉妒",
    "director": "菲利普·加瑞尔",
    "genres": [
      "剧情"
    ],
    "year": "2013",
    "rating": 5,
    "date": "2021-02-06",
    "comment": "",
    "cover": "files/covers/movies/movie-117.jpg",
    "doubanUrl": "https://movie.douban.com/subject/20468389/"
  },
  {
    "id": 118,
    "title": "无耻之徒  第三季",
    "director": "Catherine Morshead",
    "genres": [
      "剧情",
      "喜剧"
    ],
    "year": "2006",
    "rating": 4,
    "date": "2020-05-13",
    "comment": "",
    "cover": "files/covers/movies/movie-118.jpg",
    "doubanUrl": "https://movie.douban.com/subject/6082799/"
  },
  {
    "id": 119,
    "title": "正常人",
    "director": "伦尼·阿伯拉罕森 / 希提·麦克唐纳",
    "genres": [
      "剧情",
      "爱情"
    ],
    "year": "2020",
    "rating": 4,
    "date": "2020-05-13",
    "comment": "自卑、清高、羞耻心、面子",
    "cover": "files/covers/movies/movie-119.jpg",
    "doubanUrl": "https://movie.douban.com/subject/33477335/"
  },
  {
    "id": 120,
    "title": "羞耻",
    "director": "英格玛·伯格曼",
    "genres": [
      "剧情",
      "战争"
    ],
    "year": "1968",
    "rating": 4,
    "date": "2020-05-12",
    "comment": "为了生存逐渐失去羞耻心",
    "cover": "files/covers/movies/movie-120.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1293677/"
  },
  {
    "id": 121,
    "title": "狗镇",
    "director": "拉斯·冯·提尔",
    "genres": [
      "剧情",
      "悬疑",
      "惊悚"
    ],
    "year": "2003",
    "rating": 5,
    "date": "2020-05-10",
    "comment": "",
    "cover": "files/covers/movies/movie-121.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1298759/"
  },
  {
    "id": 122,
    "title": "解剖",
    "director": "斯戴芬·卢佐维茨基",
    "genres": [
      "惊悚",
      "恐怖"
    ],
    "year": "2000",
    "rating": 5,
    "date": "2020-05-10",
    "comment": "",
    "cover": "files/covers/movies/movie-122.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1307913/"
  },
  {
    "id": 123,
    "title": "完美陌生人",
    "director": "保罗·杰诺维塞",
    "genres": [
      "剧情",
      "喜剧"
    ],
    "year": "2016",
    "rating": 5,
    "date": "2020-05-07",
    "comment": "",
    "cover": "files/covers/movies/movie-123.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26614893/"
  },
  {
    "id": 124,
    "title": "她",
    "director": "保罗·范霍文",
    "genres": [
      "剧情",
      "惊悚"
    ],
    "year": "2016",
    "rating": 5,
    "date": "2020-05-07",
    "comment": "超级超级喜欢。女主内心太强大。",
    "cover": "files/covers/movies/movie-124.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26022182/"
  },
  {
    "id": 125,
    "title": "阿黛尔的生活",
    "director": "阿布戴·柯西胥",
    "genres": [
      "剧情",
      "爱情",
      "同性"
    ],
    "year": "2013",
    "rating": 5,
    "date": "2020-05-07",
    "comment": "",
    "cover": "files/covers/movies/movie-125.jpg",
    "doubanUrl": "https://movie.douban.com/subject/10535568/"
  },
  {
    "id": 126,
    "title": "我脑中的橡皮擦",
    "director": "李宰汉",
    "genres": [
      "剧情",
      "爱情"
    ],
    "year": "2004",
    "rating": 5,
    "date": "2020-05-07",
    "comment": "",
    "cover": "files/covers/movies/movie-126.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1308804/"
  },
  {
    "id": 127,
    "title": "喜欢，轻吻，快跑",
    "director": "克里斯托夫·奥诺雷",
    "genres": [
      "剧情",
      "爱情",
      "同性"
    ],
    "year": "2018",
    "rating": 5,
    "date": "2020-05-07",
    "comment": "",
    "cover": "files/covers/movies/movie-127.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26979199/"
  },
  {
    "id": 128,
    "title": "远方",
    "director": "努里·比格·锡兰",
    "genres": [
      "剧情"
    ],
    "year": "2002",
    "rating": 3,
    "date": "2020-02-27",
    "comment": "",
    "cover": "files/covers/movies/movie-128.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1307921/"
  },
  {
    "id": 129,
    "title": "你好，德古拉",
    "director": "金多礼",
    "genres": [
      "剧情",
      "同性"
    ],
    "year": "2020",
    "rating": 4,
    "date": "2020-02-27",
    "comment": "",
    "cover": "files/covers/movies/movie-129.jpg",
    "doubanUrl": "https://movie.douban.com/subject/34925495/"
  },
  {
    "id": 130,
    "title": "寄生虫",
    "director": "奉俊昊",
    "genres": [
      "剧情"
    ],
    "year": "2019",
    "rating": 5,
    "date": "2020-02-13",
    "comment": "",
    "cover": "files/covers/movies/movie-130.jpg",
    "doubanUrl": "https://movie.douban.com/subject/27010768/"
  },
  {
    "id": 131,
    "title": "无耻之徒(美版) 第八季",
    "director": "伊恩·B·麦克唐纳 / 安东尼·海明威",
    "genres": [
      "剧情",
      "喜剧"
    ],
    "year": "2017",
    "rating": 3,
    "date": "2020-02-09",
    "comment": "",
    "cover": "files/covers/movies/movie-131.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26938395/"
  },
  {
    "id": 132,
    "title": "无耻之徒(美版) 第六季",
    "director": "伊恩·B·麦克唐纳 / 尼萨·加纳特",
    "genres": [
      "剧情",
      "喜剧"
    ],
    "year": "2016",
    "rating": 3,
    "date": "2020-02-09",
    "comment": "",
    "cover": "files/covers/movies/movie-132.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26302882/"
  },
  {
    "id": 133,
    "title": "无耻之徒(美版) 第七季",
    "director": "克里斯托弗·查莱克 / 伊恩·B·麦克唐纳",
    "genres": [
      "剧情",
      "喜剧"
    ],
    "year": "2016",
    "rating": 3,
    "date": "2020-02-09",
    "comment": "",
    "cover": "files/covers/movies/movie-133.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26707767/"
  },
  {
    "id": 134,
    "title": "无耻之徒(美版) 第九季",
    "director": "马克·梅罗德 / 伊恩·B·麦克唐纳",
    "genres": [
      "剧情",
      "喜剧"
    ],
    "year": "2018",
    "rating": 3,
    "date": "2020-02-09",
    "comment": "",
    "cover": "files/covers/movies/movie-134.jpg",
    "doubanUrl": "https://movie.douban.com/subject/27194302/"
  },
  {
    "id": 135,
    "title": "无耻之徒(美版) 第五季",
    "director": "萨娜·哈姆里 / 亚历克斯·格雷夫斯",
    "genres": [
      "剧情",
      "喜剧"
    ],
    "year": "2015",
    "rating": 0,
    "date": "2020-02-09",
    "comment": "",
    "cover": "files/covers/movies/movie-135.jpg",
    "doubanUrl": "https://movie.douban.com/subject/25831924/"
  },
  {
    "id": 136,
    "title": "无耻之徒(美版) 第十季",
    "director": "伊恩·B·麦克唐纳 / 约翰·威尔斯",
    "genres": [
      "剧情",
      "喜剧"
    ],
    "year": "2019",
    "rating": 3,
    "date": "2020-02-09",
    "comment": "",
    "cover": "files/covers/movies/movie-136.jpg",
    "doubanUrl": "https://movie.douban.com/subject/30450209/"
  },
  {
    "id": 137,
    "title": "死亡漫画 2",
    "director": "福田是久 / 田尻裕司",
    "genres": [
      "惊悚",
      "恐怖"
    ],
    "year": "2009",
    "rating": 5,
    "date": "2020-01-23",
    "comment": "",
    "cover": "files/covers/movies/movie-137.jpg",
    "doubanUrl": "https://movie.douban.com/subject/33454994/"
  },
  {
    "id": 138,
    "title": "杀人漫画",
    "director": "金容钧",
    "genres": [
      "悬疑",
      "惊悚",
      "恐怖"
    ],
    "year": "2013",
    "rating": 5,
    "date": "2020-01-23",
    "comment": "",
    "cover": "files/covers/movies/movie-138.jpg",
    "doubanUrl": "https://movie.douban.com/subject/24695966/"
  },
  {
    "id": 139,
    "title": "釜山行",
    "director": "延尚昊",
    "genres": [
      "动作",
      "惊悚",
      "灾难"
    ],
    "year": "2016",
    "rating": 4,
    "date": "2020-01-23",
    "comment": "",
    "cover": "files/covers/movies/movie-139.jpg",
    "doubanUrl": "https://movie.douban.com/subject/25986180/"
  },
  {
    "id": 140,
    "title": "两小无猜",
    "director": "杨·塞谬尔",
    "genres": [
      "剧情",
      "喜剧",
      "爱情"
    ],
    "year": "2003",
    "rating": 3,
    "date": "2020-01-23",
    "comment": "",
    "cover": "files/covers/movies/movie-140.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1308817/"
  },
  {
    "id": 141,
    "title": "无耻之徒  第二季",
    "director": "大卫·埃文斯",
    "genres": [
      "剧情",
      "喜剧"
    ],
    "year": "2005",
    "rating": 3,
    "date": "2020-01-23",
    "comment": "",
    "cover": "files/covers/movies/movie-141.jpg",
    "doubanUrl": "https://movie.douban.com/subject/6058995/"
  },
  {
    "id": 142,
    "title": "无耻之徒 第一季",
    "director": "保罗·艾伯特",
    "genres": [
      "剧情",
      "喜剧"
    ],
    "year": "2004",
    "rating": 3,
    "date": "2020-01-23",
    "comment": "",
    "cover": "files/covers/movies/movie-142.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1474087/"
  },
  {
    "id": 143,
    "title": "新女友",
    "director": "弗朗索瓦·欧容",
    "genres": [
      "剧情",
      "悬疑",
      "同性"
    ],
    "year": "2014",
    "rating": 4,
    "date": "2020-01-16",
    "comment": "",
    "cover": "files/covers/movies/movie-143.jpg",
    "doubanUrl": "https://movie.douban.com/subject/25755608/"
  },
  {
    "id": 144,
    "title": "她在路上",
    "director": "埃马纽埃尔·贝克特",
    "genres": [
      "剧情",
      "喜剧"
    ],
    "year": "2013",
    "rating": 0,
    "date": "2020-01-16",
    "comment": "",
    "cover": "files/covers/movies/movie-144.jpg",
    "doubanUrl": "https://movie.douban.com/subject/20494548/"
  },
  {
    "id": 145,
    "title": "玩具总动员4",
    "director": "乔什·库雷",
    "genres": [
      "喜剧",
      "动画",
      "奇幻"
    ],
    "year": "2019",
    "rating": 5,
    "date": "2020-01-05",
    "comment": "",
    "cover": "files/covers/movies/movie-145.jpg",
    "doubanUrl": "https://movie.douban.com/subject/6850547/"
  },
  {
    "id": 146,
    "title": "沉睡魔咒2",
    "director": "乔阿吉姆·罗恩尼",
    "genres": [
      "奇幻",
      "冒险"
    ],
    "year": "2019",
    "rating": 0,
    "date": "2020-01-05",
    "comment": "",
    "cover": "files/covers/movies/movie-146.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26426056/"
  },
  {
    "id": 147,
    "title": "误杀",
    "director": "柯汶利",
    "genres": [
      "剧情",
      "悬疑",
      "犯罪"
    ],
    "year": "2019",
    "rating": 3,
    "date": "2020-01-04",
    "comment": "",
    "cover": "files/covers/movies/movie-147.jpg",
    "doubanUrl": "https://movie.douban.com/subject/30176393/"
  },
  {
    "id": 148,
    "title": "少年的你",
    "director": "曾国祥",
    "genres": [
      "剧情",
      "爱情",
      "犯罪"
    ],
    "year": "2019",
    "rating": 4,
    "date": "2019-12-22",
    "comment": "拉低警察的智商和行动",
    "cover": "files/covers/movies/movie-148.jpg",
    "doubanUrl": "https://movie.douban.com/subject/30166972/"
  },
  {
    "id": 149,
    "title": "致命女人 第一季",
    "director": "大卫·格罗斯曼 / 刘玉玲",
    "genres": [
      "剧情",
      "喜剧",
      "犯罪"
    ],
    "year": "2019",
    "rating": 5,
    "date": "2019-12-04",
    "comment": "",
    "cover": "files/covers/movies/movie-149.jpg",
    "doubanUrl": "https://movie.douban.com/subject/30401122/"
  },
  {
    "id": 150,
    "title": "伦敦生活 第一季",
    "director": "哈利·布拉德比尔 / 蒂姆·柯比",
    "genres": [
      "剧情",
      "喜剧"
    ],
    "year": "2016",
    "rating": 5,
    "date": "2019-12-04",
    "comment": "",
    "cover": "files/covers/movies/movie-150.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26838164/"
  },
  {
    "id": 151,
    "title": "大小谎言 第一季",
    "director": "让-马克·瓦雷",
    "genres": [
      "剧情",
      "悬疑",
      "犯罪"
    ],
    "year": "2017",
    "rating": 5,
    "date": "2019-12-04",
    "comment": "",
    "cover": "files/covers/movies/movie-151.jpg",
    "doubanUrl": "https://movie.douban.com/subject/25953429/"
  },
  {
    "id": 152,
    "title": "海街日记",
    "director": "是枝裕和",
    "genres": [
      "剧情",
      "家庭"
    ],
    "year": "2015",
    "rating": 4,
    "date": "2019-11-30",
    "comment": "",
    "cover": "files/covers/movies/movie-152.jpg",
    "doubanUrl": "https://movie.douban.com/subject/25895901/"
  },
  {
    "id": 153,
    "title": "零零后",
    "director": "张同道",
    "genres": [
      "纪录片"
    ],
    "year": "2019",
    "rating": 4,
    "date": "2019-09-04",
    "comment": "中国的教育太单一，孩子像工业化生产流水线上的产品，这个片子带给人更多思考",
    "cover": "files/covers/movies/movie-153.jpg",
    "doubanUrl": "https://movie.douban.com/subject/30459575/"
  },
  {
    "id": 154,
    "title": "伦敦生活 第二季",
    "director": "哈利·布拉德比尔",
    "genres": [
      "喜剧"
    ],
    "year": "2019",
    "rating": 5,
    "date": "2019-08-21",
    "comment": "",
    "cover": "files/covers/movies/movie-154.jpg",
    "doubanUrl": "https://movie.douban.com/subject/27053768/"
  },
  {
    "id": 155,
    "title": "大小谎言 第二季",
    "director": "安德里亚·阿诺德",
    "genres": [
      "剧情",
      "悬疑",
      "犯罪"
    ],
    "year": "2019",
    "rating": 5,
    "date": "2019-08-21",
    "comment": "",
    "cover": "files/covers/movies/movie-155.jpg",
    "doubanUrl": "https://movie.douban.com/subject/27195401/"
  },
  {
    "id": 156,
    "title": "乐队的夏天 第一季",
    "director": "李楠楠 / 王雪",
    "genres": [
      "音乐",
      "真人秀"
    ],
    "year": "2019",
    "rating": 5,
    "date": "2019-07-22",
    "comment": "彭磊讲话好逗，彭氏幽默",
    "cover": "files/covers/movies/movie-156.jpg",
    "doubanUrl": "https://movie.douban.com/subject/30357990/"
  },
  {
    "id": 157,
    "title": "幻乐之城",
    "director": "安德胜 / 梁翘柏",
    "genres": [
      "真人秀"
    ],
    "year": "2018",
    "rating": 4,
    "date": "2019-06-26",
    "comment": "",
    "cover": "files/covers/movies/movie-157.jpg",
    "doubanUrl": "https://movie.douban.com/subject/30201000/"
  },
  {
    "id": 158,
    "title": "心动的感觉",
    "director": "克洛德·皮诺托",
    "genres": [
      "喜剧",
      "爱情"
    ],
    "year": "1988",
    "rating": 5,
    "date": "2019-06-25",
    "comment": "",
    "cover": "files/covers/movies/movie-158.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1298999/"
  },
  {
    "id": 159,
    "title": "阿德尔曼夫妇",
    "director": "尼古拉斯·贝多斯",
    "genres": [
      "喜剧",
      "爱情"
    ],
    "year": "2017",
    "rating": 5,
    "date": "2019-06-25",
    "comment": "当时看完就二刷了",
    "cover": "files/covers/movies/movie-159.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26951692/"
  },
  {
    "id": 160,
    "title": "风中有朵雨做的云",
    "director": "娄烨",
    "genres": [
      "剧情",
      "悬疑",
      "犯罪"
    ],
    "year": "2018",
    "rating": 5,
    "date": "2019-06-22",
    "comment": "",
    "cover": "files/covers/movies/movie-160.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26728669/"
  },
  {
    "id": 161,
    "title": "第一夫人",
    "director": "帕布罗·拉雷恩",
    "genres": [
      "剧情",
      "传记",
      "历史"
    ],
    "year": "2016",
    "rating": 4,
    "date": "2019-06-22",
    "comment": "",
    "cover": "files/covers/movies/movie-161.jpg",
    "doubanUrl": "https://movie.douban.com/subject/4849728/"
  },
  {
    "id": 162,
    "title": "德雷尔一家 第四季",
    "director": "罗杰·戈比",
    "genres": [
      "剧情",
      "喜剧",
      "爱情"
    ],
    "year": "2019",
    "rating": 4,
    "date": "2019-05-10",
    "comment": "",
    "cover": "files/covers/movies/movie-162.jpg",
    "doubanUrl": "https://movie.douban.com/subject/30234228/"
  },
  {
    "id": 163,
    "title": "等待",
    "director": "皮耶罗·梅西纳",
    "genres": [
      "剧情"
    ],
    "year": "2015",
    "rating": 2,
    "date": "2019-05-04",
    "comment": "没意思",
    "cover": "files/covers/movies/movie-163.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26312145/"
  },
  {
    "id": 164,
    "title": "绿皮书",
    "director": "彼得·法雷里",
    "genres": [
      "剧情",
      "喜剧",
      "音乐"
    ],
    "year": "2018",
    "rating": 5,
    "date": "2019-05-02",
    "comment": "值得二刷的电影，很多生活习惯的细节",
    "cover": "files/covers/movies/movie-164.jpg",
    "doubanUrl": "https://movie.douban.com/subject/27060077/"
  },
  {
    "id": 165,
    "title": "海王",
    "director": "温子仁",
    "genres": [
      "动作",
      "奇幻",
      "冒险"
    ],
    "year": "2018",
    "rating": 3,
    "date": "2019-04-07",
    "comment": "很一般",
    "cover": "files/covers/movies/movie-165.jpg",
    "doubanUrl": "https://movie.douban.com/subject/3878007/"
  },
  {
    "id": 166,
    "title": "假小子",
    "director": "瑟琳·席安玛",
    "genres": [
      "剧情"
    ],
    "year": "2011",
    "rating": 5,
    "date": "2019-04-04",
    "comment": "",
    "cover": "files/covers/movies/movie-166.jpg",
    "doubanUrl": "https://movie.douban.com/subject/6006087/"
  },
  {
    "id": 167,
    "title": "调音师",
    "director": "斯里兰姆·拉格万",
    "genres": [
      "喜剧",
      "悬疑",
      "惊悚"
    ],
    "year": "2018",
    "rating": 5,
    "date": "2019-04-04",
    "comment": "看的很过瘾，里面的歌曲都很好听",
    "cover": "files/covers/movies/movie-167.jpg",
    "doubanUrl": "https://movie.douban.com/subject/30334073/"
  },
  {
    "id": 168,
    "title": "波西米亚狂想曲",
    "director": "布莱恩·辛格",
    "genres": [
      "剧情",
      "同性",
      "音乐"
    ],
    "year": "2018",
    "rating": 5,
    "date": "2019-03-24",
    "comment": "据说是根据皇后乐队真实故事改编，拍了8年。看的过程总是想跟着音乐扭动。在电影院坐在我身边的左右都是男士，不知道是哪一位身上散发着浓浓的香烟味加香水味加咖啡的味道，电影让我忘掉了这些，证明还是很好看的，有时间你就去看看吧",
    "cover": "files/covers/movies/movie-168.jpg",
    "doubanUrl": "https://movie.douban.com/subject/5300054/"
  },
  {
    "id": 169,
    "title": "六尺之下 第一季",
    "director": "艾伦·鲍尔 Alan Ball / 丹尼尔·艾提奥斯",
    "genres": [
      "剧情",
      "家庭"
    ],
    "year": "2001",
    "rating": 5,
    "date": "2019-03-21",
    "comment": "有点丧",
    "cover": "files/covers/movies/movie-169.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1353727/"
  },
  {
    "id": 170,
    "title": "父子大变身",
    "director": "乔尔·苏扎",
    "genres": [
      "喜剧",
      "家庭"
    ],
    "year": "2015",
    "rating": 4,
    "date": "2019-02-28",
    "comment": "",
    "cover": "files/covers/movies/movie-170.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26828499/"
  },
  {
    "id": 171,
    "title": "撒娇女人最好命",
    "director": "彭浩翔",
    "genres": [
      "喜剧",
      "爱情"
    ],
    "year": "2014",
    "rating": 4,
    "date": "2019-02-28",
    "comment": "",
    "cover": "files/covers/movies/movie-171.jpg",
    "doubanUrl": "https://movie.douban.com/subject/4881607/"
  },
  {
    "id": 172,
    "title": "流浪巴黎",
    "director": "多米尼克·阿贝尔 / 菲奥娜·戈登",
    "genres": [
      "喜剧",
      "爱情"
    ],
    "year": "2016",
    "rating": 4,
    "date": "2019-02-28",
    "comment": "",
    "cover": "files/covers/movies/movie-172.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26457368/"
  },
  {
    "id": 173,
    "title": "生存家族",
    "director": "矢口史靖",
    "genres": [
      "喜剧",
      "家庭"
    ],
    "year": "2016",
    "rating": 4,
    "date": "2018-09-13",
    "comment": "停电让我们戒掉了网瘾",
    "cover": "files/covers/movies/movie-173.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26815162/"
  },
  {
    "id": 174,
    "title": "荒野生存",
    "director": "西恩·潘",
    "genres": [
      "剧情",
      "传记",
      "冒险"
    ],
    "year": "2007",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-174.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1905462/"
  },
  {
    "id": 175,
    "title": "末路狂花",
    "director": "雷德利·斯科特",
    "genres": [
      "剧情",
      "惊悚",
      "犯罪"
    ],
    "year": "1991",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-175.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1291992/"
  },
  {
    "id": 176,
    "title": "达拉斯买家俱乐部",
    "director": "让-马克·瓦雷",
    "genres": [
      "剧情",
      "同性",
      "传记"
    ],
    "year": "2013",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-176.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1793929/"
  },
  {
    "id": 177,
    "title": "阿飞正传",
    "director": "王家卫",
    "genres": [
      "剧情",
      "爱情",
      "犯罪"
    ],
    "year": "1990",
    "rating": 3,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-177.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1305690/"
  },
  {
    "id": 178,
    "title": "恐怖游轮",
    "director": "克里斯托弗·史密斯",
    "genres": [
      "科幻",
      "悬疑",
      "惊悚"
    ],
    "year": "2009",
    "rating": 3,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-178.jpg",
    "doubanUrl": "https://movie.douban.com/subject/3011051/"
  },
  {
    "id": 179,
    "title": "战争之王",
    "director": "安德鲁·尼科尔",
    "genres": [
      "剧情",
      "犯罪"
    ],
    "year": "2005",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-179.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1419936/"
  },
  {
    "id": 180,
    "title": "小森林 冬春篇",
    "director": "森淳一",
    "genres": [
      "剧情"
    ],
    "year": "2015",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-180.jpg",
    "doubanUrl": "https://movie.douban.com/subject/25814707/"
  },
  {
    "id": 181,
    "title": "冰川时代",
    "director": "卡洛斯·沙尔丹哈 / 克里斯·韦奇",
    "genres": [
      "喜剧",
      "动画",
      "冒险"
    ],
    "year": "2002",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-181.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1291578/"
  },
  {
    "id": 182,
    "title": "香水",
    "director": "汤姆·提克威",
    "genres": [
      "剧情",
      "犯罪",
      "奇幻"
    ],
    "year": "2006",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-182.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1760622/"
  },
  {
    "id": 183,
    "title": "荒蛮故事",
    "director": "达米安·斯兹弗隆",
    "genres": [
      "剧情",
      "喜剧",
      "犯罪"
    ],
    "year": "2014",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-183.jpg",
    "doubanUrl": "https://movie.douban.com/subject/24750126/"
  },
  {
    "id": 184,
    "title": "浪潮",
    "director": "丹尼斯·甘塞尔",
    "genres": [
      "剧情",
      "惊悚"
    ],
    "year": "2008",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-184.jpg",
    "doubanUrl": "https://movie.douban.com/subject/2297265/"
  },
  {
    "id": 185,
    "title": "海边的曼彻斯特",
    "director": "肯尼思·洛纳根",
    "genres": [
      "剧情",
      "家庭"
    ],
    "year": "2016",
    "rating": 3,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-185.jpg",
    "doubanUrl": "https://movie.douban.com/subject/25980443/"
  },
  {
    "id": 186,
    "title": "花样年华",
    "director": "王家卫",
    "genres": [
      "剧情",
      "爱情"
    ],
    "year": "2000",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-186.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1291557/"
  },
  {
    "id": 187,
    "title": "哈利·波特与死亡圣器(下)",
    "director": "大卫·叶茨",
    "genres": [
      "奇幻",
      "冒险"
    ],
    "year": "2011",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-187.jpg",
    "doubanUrl": "https://movie.douban.com/subject/3011235/"
  },
  {
    "id": 188,
    "title": "傲慢与偏见",
    "director": "乔·赖特",
    "genres": [
      "剧情",
      "爱情"
    ],
    "year": "2005",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-188.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1418200/"
  },
  {
    "id": 189,
    "title": "黑天鹅",
    "director": "达伦·阿伦诺夫斯基",
    "genres": [
      "剧情",
      "惊悚"
    ],
    "year": "2010",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-189.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1978709/"
  },
  {
    "id": 190,
    "title": "喜剧之王",
    "director": "周星驰 / 李力持",
    "genres": [
      "剧情",
      "喜剧",
      "爱情"
    ],
    "year": "1999",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-190.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1302425/"
  },
  {
    "id": 191,
    "title": "小森林 夏秋篇",
    "director": "森淳一",
    "genres": [
      "剧情"
    ],
    "year": "2014",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-191.jpg",
    "doubanUrl": "https://movie.douban.com/subject/25814705/"
  },
  {
    "id": 192,
    "title": "记忆碎片",
    "director": "克里斯托弗·诺兰",
    "genres": [
      "剧情",
      "悬疑",
      "惊悚"
    ],
    "year": "2000",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-192.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1304447/"
  },
  {
    "id": 193,
    "title": "东邪西毒",
    "director": "王家卫",
    "genres": [
      "剧情",
      "动作",
      "爱情"
    ],
    "year": "1994",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-193.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1292328/"
  },
  {
    "id": 194,
    "title": "杀人回忆",
    "director": "奉俊昊",
    "genres": [
      "剧情",
      "动作",
      "悬疑"
    ],
    "year": "2003",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-194.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1300299/"
  },
  {
    "id": 195,
    "title": "电锯惊魂",
    "director": "温子仁",
    "genres": [
      "悬疑",
      "惊悚",
      "恐怖"
    ],
    "year": "2004",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-195.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1417598/"
  },
  {
    "id": 196,
    "title": "神偷奶爸",
    "director": "皮埃尔·柯芬 / 克里斯·雷纳德",
    "genres": [
      "喜剧",
      "动画",
      "冒险"
    ],
    "year": "2010",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-196.jpg",
    "doubanUrl": "https://movie.douban.com/subject/3287562/"
  },
  {
    "id": 197,
    "title": "恐怖直播",
    "director": "金秉祐",
    "genres": [
      "剧情",
      "悬疑",
      "犯罪"
    ],
    "year": "2013",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-197.jpg",
    "doubanUrl": "https://movie.douban.com/subject/21360417/"
  },
  {
    "id": 198,
    "title": "倩女幽魂",
    "director": "程小东",
    "genres": [
      "爱情",
      "奇幻",
      "武侠"
    ],
    "year": "1987",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-198.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1297447/"
  },
  {
    "id": 199,
    "title": "消失的爱人",
    "director": "大卫·芬奇",
    "genres": [
      "剧情",
      "悬疑",
      "惊悚"
    ],
    "year": "2014",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-199.jpg",
    "doubanUrl": "https://movie.douban.com/subject/21318488/"
  },
  {
    "id": 200,
    "title": "风之谷",
    "director": "宫崎骏",
    "genres": [
      "动画",
      "奇幻",
      "冒险"
    ],
    "year": "1984",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-200.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1291585/"
  },
  {
    "id": 201,
    "title": "哈利·波特与魔法石",
    "director": "克里斯·哥伦布",
    "genres": [
      "奇幻",
      "冒险"
    ],
    "year": "2001",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-201.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1295038/"
  },
  {
    "id": 202,
    "title": "阿凡达",
    "director": "詹姆斯·卡梅隆",
    "genres": [
      "动作",
      "科幻",
      "冒险"
    ],
    "year": "2009",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-202.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1652587/"
  },
  {
    "id": 203,
    "title": "布达佩斯大饭店",
    "director": "韦斯·安德森",
    "genres": [
      "剧情",
      "喜剧",
      "冒险"
    ],
    "year": "2014",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-203.jpg",
    "doubanUrl": "https://movie.douban.com/subject/11525673/"
  },
  {
    "id": 204,
    "title": "狩猎",
    "director": "托马斯·温特伯格",
    "genres": [
      "剧情"
    ],
    "year": "2012",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-204.jpg",
    "doubanUrl": "https://movie.douban.com/subject/6985810/"
  },
  {
    "id": 205,
    "title": "重庆森林",
    "director": "王家卫",
    "genres": [
      "剧情",
      "爱情"
    ],
    "year": "1994",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-205.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1291999/"
  },
  {
    "id": 206,
    "title": "让子弹飞",
    "director": "姜文",
    "genres": [
      "剧情",
      "喜剧",
      "动作"
    ],
    "year": "2010",
    "rating": 3,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-206.jpg",
    "doubanUrl": "https://movie.douban.com/subject/3742360/"
  },
  {
    "id": 207,
    "title": "春光乍泄",
    "director": "王家卫",
    "genres": [
      "剧情",
      "爱情",
      "同性"
    ],
    "year": "1997",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-207.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1292679/"
  },
  {
    "id": 208,
    "title": "勇敢的心",
    "director": "梅尔·吉布森",
    "genres": [
      "剧情",
      "动作",
      "传记"
    ],
    "year": "1995",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-208.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1294639/"
  },
  {
    "id": 209,
    "title": "疯狂动物城",
    "director": "拜伦·霍华德 / 瑞奇·摩尔",
    "genres": [
      "喜剧",
      "动画",
      "冒险"
    ],
    "year": "2016",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-209.jpg",
    "doubanUrl": "https://movie.douban.com/subject/25662329/"
  },
  {
    "id": 210,
    "title": "闻香识女人",
    "director": "马丁·布莱斯特",
    "genres": [
      "剧情"
    ],
    "year": "1992",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-210.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1298624/"
  },
  {
    "id": 211,
    "title": "飞屋环游记",
    "director": "彼特·道格特 / 鲍勃·彼德森",
    "genres": [
      "剧情",
      "喜剧",
      "动画"
    ],
    "year": "2009",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-211.jpg",
    "doubanUrl": "https://movie.douban.com/subject/2129039/"
  },
  {
    "id": 212,
    "title": "大话西游之月光宝盒",
    "director": "刘镇伟",
    "genres": [
      "喜剧",
      "爱情",
      "奇幻"
    ],
    "year": "1995",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-212.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1299398/"
  },
  {
    "id": 213,
    "title": "罗马假日",
    "director": "威廉·惠勒",
    "genres": [
      "剧情",
      "喜剧",
      "爱情"
    ],
    "year": "1953",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-213.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1293839/"
  },
  {
    "id": 214,
    "title": "天空之城",
    "director": "宫崎骏",
    "genres": [
      "动画",
      "奇幻",
      "冒险"
    ],
    "year": "1986",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-214.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1291583/"
  },
  {
    "id": 215,
    "title": "无间道",
    "director": "刘伟强 / 麦兆辉",
    "genres": [
      "剧情",
      "惊悚",
      "犯罪"
    ],
    "year": "2002",
    "rating": 3,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-215.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1307914/"
  },
  {
    "id": 216,
    "title": "乱世佳人",
    "director": "维克多·弗莱明 / 乔治·库克",
    "genres": [
      "剧情",
      "爱情",
      "历史"
    ],
    "year": "1939",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-216.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1300267/"
  },
  {
    "id": 217,
    "title": "放牛班的春天",
    "director": "克里斯托夫·巴哈蒂",
    "genres": [
      "剧情",
      "音乐"
    ],
    "year": "2004",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-217.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1291549/"
  },
  {
    "id": 218,
    "title": "忠犬八公的故事",
    "director": "拉斯·霍尔斯道姆",
    "genres": [
      "剧情"
    ],
    "year": "2009",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-218.jpg",
    "doubanUrl": "https://movie.douban.com/subject/3011091/"
  },
  {
    "id": 219,
    "title": "三傻大闹宝莱坞",
    "director": "拉吉库马尔·希拉尼",
    "genres": [
      "剧情",
      "喜剧",
      "爱情"
    ],
    "year": "2009",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-219.jpg",
    "doubanUrl": "https://movie.douban.com/subject/3793023/"
  },
  {
    "id": 220,
    "title": "泰坦尼克号",
    "director": "詹姆斯·卡梅隆",
    "genres": [
      "剧情",
      "爱情",
      "灾难"
    ],
    "year": "1997",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-220.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1292722/"
  },
  {
    "id": 221,
    "title": "盗梦空间",
    "director": "克里斯托弗·诺兰",
    "genres": [
      "剧情",
      "科幻",
      "悬疑"
    ],
    "year": "2010",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-221.jpg",
    "doubanUrl": "https://movie.douban.com/subject/3541415/"
  },
  {
    "id": 222,
    "title": "千与千寻",
    "director": "宫崎骏",
    "genres": [
      "剧情",
      "动画",
      "奇幻"
    ],
    "year": "2001",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-222.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1291561/"
  },
  {
    "id": 223,
    "title": "阿甘正传",
    "director": "罗伯特·泽米吉斯",
    "genres": [
      "剧情",
      "爱情"
    ],
    "year": "1994",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-223.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1292720/"
  },
  {
    "id": 224,
    "title": "这个杀手不太冷",
    "director": "吕克·贝松",
    "genres": [
      "剧情",
      "动作",
      "犯罪"
    ],
    "year": "1994",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-224.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1295644/"
  },
  {
    "id": 225,
    "title": "霸王别姬",
    "director": "陈凯歌",
    "genres": [
      "剧情",
      "爱情",
      "同性"
    ],
    "year": "1993",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-225.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1291546/"
  },
  {
    "id": 226,
    "title": "猩球崛起3：终极之战",
    "director": "马特·里夫斯",
    "genres": [
      "剧情",
      "动作",
      "科幻"
    ],
    "year": "2017",
    "rating": 3,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-226.jpg",
    "doubanUrl": "https://movie.douban.com/subject/25808075/"
  },
  {
    "id": 227,
    "title": "伪装者",
    "director": "李雪",
    "genres": [
      "剧情",
      "悬疑"
    ],
    "year": "2015",
    "rating": 4,
    "date": "2017-11-09",
    "comment": "一般",
    "cover": "files/covers/movies/movie-227.jpg",
    "doubanUrl": "https://movie.douban.com/subject/25994712/"
  },
  {
    "id": 228,
    "title": "我的恐怖妻子",
    "director": "三宅喜重 / 国本雅广",
    "genres": [
      "剧情",
      "悬疑"
    ],
    "year": "2016",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "没有消失的爱人好看",
    "cover": "files/covers/movies/movie-228.jpg",
    "doubanUrl": "https://movie.douban.com/subject/26741568/"
  },
  {
    "id": 229,
    "title": "权力的游戏 第三季",
    "director": "丹尼尔·米纳汉 / 戴维·贝尼奥夫",
    "genres": [
      "剧情",
      "奇幻",
      "冒险"
    ],
    "year": "2013",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "很过瘾",
    "cover": "files/covers/movies/movie-229.jpg",
    "doubanUrl": "https://movie.douban.com/subject/10590706/"
  },
  {
    "id": 230,
    "title": "钢之炼金术师FA",
    "director": "入江泰浩 / 博史池畠",
    "genres": [
      "剧情",
      "动作",
      "动画"
    ],
    "year": "2009",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "逻辑性强",
    "cover": "files/covers/movies/movie-230.jpg",
    "doubanUrl": "https://movie.douban.com/subject/3430169/"
  },
  {
    "id": 231,
    "title": "最后的朋友",
    "director": "加藤裕将 / 西坂瑞城",
    "genres": [
      "剧情",
      "爱情"
    ],
    "year": "2008",
    "rating": 5,
    "date": "2017-11-09",
    "comment": "",
    "cover": "files/covers/movies/movie-231.jpg",
    "doubanUrl": "https://movie.douban.com/subject/3011225/"
  },
  {
    "id": 232,
    "title": "神奇女侠",
    "director": "派蒂·杰金斯",
    "genres": [
      "动作",
      "奇幻",
      "冒险"
    ],
    "year": "2017",
    "rating": 1,
    "date": "2017-06-03",
    "comment": "垃圾片",
    "cover": "files/covers/movies/movie-232.jpg",
    "doubanUrl": "https://movie.douban.com/subject/1578714/"
  }
];
