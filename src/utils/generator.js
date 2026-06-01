/**
 * 随机生成姓名
 */
export const generateName = () => {
  const familyNames = [
    '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨',
    '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜',
    '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎',
    '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐',
    '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常',
    '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄'
  ];
  const givenNames = [
    '子', '凡', '熙', '哲', '睿', '浩', '轩', '辰', '逸', '宇', '泽', '欣', '怡', '悦', '梦', '语',
    '梓', '涵', '一', '诺', '嘉', '琪', '雨', '佳', '思', '雪', '依', '雅', '心', '若', '如', '清',
    '墨', '阳', '天', '博', '峻', '铭', '羽', '灵', '晓', '靖', '云', '晨', '曦', '瑶', '宁', '静'
  ];

  const familyName = familyNames[Math.floor(Math.random() * familyNames.length)];
  const nameLen = Math.random() > 0.3 ? 2 : 1;
  let givenName = '';
  for (let i = 0; i < nameLen; i++) {
    givenName += givenNames[Math.floor(Math.random() * givenNames.length)];
  }
  return familyName + givenName;
};

/**
 * 随机生成手机号
 */
export const generatePhone = () => {
  const prefixes = ['13', '14', '15', '17', '18', '19'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  let phone = prefix;
  for (let i = 0; i < 9; i++) {
    phone += Math.floor(Math.random() * 10);
  }
  return phone;
};

/**
 * 随机生成邮箱
 */
export const generateEmail = () => {
  const domains = ['gmail.com', 'qq.com', '163.com', 'outlook.com', 'sina.com', 'hotmail.com'];
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let prefix = '';
  const len = 6 + Math.floor(Math.random() * 6);
  for (let i = 0; i < len; i++) {
    prefix += chars[Math.floor(Math.random() * chars.length)];
  }
  return prefix + '@' + domains[Math.floor(Math.random() * domains.length)];
};

/**
 * 随机生成身份证号 (简易版，不包含校验码严格计算)
 */
export const generateIDCard = () => {
  const areaCode = ['110101', '310101', '440101', '320101', '330101', '510101'];
  const area = areaCode[Math.floor(Math.random() * areaCode.length)];
  const year = 1970 + Math.floor(Math.random() * 40);
  const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
  const day = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0');
  let suffix = '';
  for (let i = 0; i < 3; i++) {
    suffix += Math.floor(Math.random() * 10);
  }
  const lastChar = Math.random() > 0.1 ? Math.floor(Math.random() * 10) : 'X';
  return `${area}${year}${month}${day}${suffix}${lastChar}`;
};

/**
 * 随机生成银行卡号 (简易版)
 */
export const generateBankCard = () => {
  const prefixes = ['6222', '6228', '6217', '6214', '6212', '6201'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  let card = prefix;
  const len = Math.random() > 0.5 ? 12 : 15;
  for (let i = 0; i < len; i++) {
    card += Math.floor(Math.random() * 10);
  }
  return card;
};

/**
 * 随机生成昵称
 */
export const generateNickname = () => {
  const adjs = ['快乐的', '忧伤的', '奔跑的', '安静的', '聪明的', '勇敢的', '温柔的', '帅气的', '漂亮的'];
  const nouns = ['小猫', '小狗', '皮卡丘', '超级英雄', '旅行者', '程序员', '测试员', '梦想家', '大白'];
  const adj = adjs[Math.floor(Math.random() * adjs.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : '';
  return adj + noun + num;
};

/**
 * 随机生成地址
 */
export const generateAddress = () => {
  const provinces = ['北京市', '上海市', '广东省广州市', '浙江省杭州市', '江苏省南京市', '四川省成都市'];
  const roads = ['中山路', '解放路', '人民路', '建设路', '幸福大道', '科技园路'];
  const province = provinces[Math.floor(Math.random() * provinces.length)];
  const road = roads[Math.floor(Math.random() * roads.length)];
  const num = Math.floor(Math.random() * 1000) + '号';
  const room = Math.floor(Math.random() * 20) + 1 + '层' + (Math.floor(Math.random() * 20) + 101) + '室';
  return province + road + num + room;
};
