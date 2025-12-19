'use strict';

// prettier-ignore
var SEKAI_CHARACTER_NAMES = {
  Miku: {
    'en': 'Hatsune Miku',
    'ja': '初音ミク',
    'zh-hant': '初音未來'
  },
  Rin: {
    'en': 'Kagamine Rin',
    'ja': '鏡音リン',
    'zh-hant': '鏡音鈴'
  },
  Len: {
    'en': 'Kagamine Len',
    'ja': '鏡音レン',
    'zh-hant': '鏡音連'
  },
  Luka: {
    'en': 'Megurine Luka',
    'ja': '巡音ルカ',
    'zh-hant': '巡音流歌'
  },
  Meiko: {
    'en': 'MEIKO',
    'ja': 'MEIKO',
    'zh-hant': 'MEIKO'
  },
  Kaito: {
    'en': 'KAITO',
    'ja': 'KAITO',
    'zh-hant': 'KAITO'
  },
  Ichika: {
    'en': 'Ichika Hoshino',
    'ja': '星乃 一歌',
    'zh-hant': '星乃一歌'
  },
  Saki: {
    'en': 'Saki Tenma',
    'ja': '天馬 咲希',
    'zh-hant': '天馬 咲希'
  },
  Honami: {
    'en': 'Honami Mochizuki',
    'ja': '望月 穂波',
    'zh-hant': '望月 穗波'
  },
  Shiho: {
    'en': 'Shiho Hinomori',
    'ja': '日野森 志歩',
    'zh-hant': '日野森 志步'
  },
  Minori: {
    'en': 'Minori Hanasato',
    'ja': '花里 みのり',
    'zh-hant': '花里 實乃梨'
  },
  Haruka: {
    'en': 'Haruka Kiritani',
    'ja': '桐谷 遥',
    'zh-hant': '桐谷 遙'
  },
  Airi: {
    'en': 'Airi Momoi',
    'ja': '桃井 愛莉',
    'zh-hant': '桃井 愛莉'
  },
  Shizuku: {
    'en': 'Shizuku Hinomori',
    'ja': '日野森 雫',
    'zh-hant': '日野森 雫'
  },
  Kohane: {
    'en': 'Kohane Azusawa',
    'ja': '小豆沢 こはね',
    'zh-hant': '小豆澤 小羽'
  },
  An: {
    'en': 'An Shiraishi',
    'ja': '白石 杏',
    'zh-hant': '白石 杏'
  },
  Akito: {
    'en': 'Akito Shinonome',
    'ja': '東雲 彰人',
    'zh-hant': '東雲 彰人'
  },
  Toya: {
    'en': 'Toya Aoyagi',
    'ja': '青柳 冬弥',
    'zh-hant': '青柳 冬彌'
  },
  Tsukasa: {
    'en': 'Tsukasa Tenma',
    'ja': '天馬 司',
    'zh-hant': '天馬 司'
  },
  Emu: {
    'en': 'Emu Otori',
    'ja': '鳳 えむ',
    'zh-hant': '鳳 笑夢'
  },
  Nene: {
    'en': 'Nene Kusanagi',
    'ja': '草薙 寧々',
    'zh-hant': '草薙 寧寧'
  },
  Rui: {
    'en': 'Rui Kamishiro',
    'ja': '神代 類',
    'zh-hant': '神代 類'
  },
  Kanade: {
    'en': 'Kanade Yoisaki',
    'ja': '宵崎 奏',
    'zh-hant': '宵崎 奏'
  },
  Mafuyu: {
    'en': 'Mafuyu Asahina',
    'ja': '朝比奈 まふゆ',
    'zh-hant': '朝比奈 真冬'
  },
  Ena: {
    'en': 'Ena Shinonome',
    'ja': '東雲 絵名',
    'zh-hant': '東雲 繪名'
  },
  Mizuki: {
    'en': 'Mizuki Akiyama',
    'ja': '暁山 瑞希',
    'zh-hant': '曉山 瑞希'
  },
  Virtualsinger: {
    'en': 'VIRTUAL SINGER',
    'ja': 'バーチャル・シンガー',
    'zh-hant': '虛擬歌手'
  },
  Leoneed: {
    'en': 'Leo/need',
    'ja': 'Leo/need',
    'zh-hant': 'Leo/need'
  },
  Moremorejump: {
    'en': 'MORE MORE JUMP!',
    'ja': 'MORE MORE JUMP!',
    'zh-hant': 'MORE MORE JUMP!'
  },
  Vividbadsquad: {
    'en': 'Vivid BAD SQUAD',
    'ja': 'Vivid BAD SQUAD',
    'zh-hant': 'Vivid BAD SQUAD'
  },
  Wonderlandsshowtime: {
    'en': 'Wonderlands×Showtime',
    'ja': 'ワンダーランズ×ショウタイム',
    'zh-hant': 'Wonderlands×Showtime'
  },
  Nightcode: {
    'en': 'Nightcord at 25:00',
    'ja': '25時、ナイトコードで。',
    'zh-hant': '25點, Nightcord見。'
  }
};
var UNTITLED_VALID_LOCAL = {
  'ja': 'ja',
  'ja-jp': 'ja',
  'en': 'en',
  'en-us': 'en',
  'zh-hant': 'zh-hant',
  'zh-tw': 'zh-hant'
};
var convertLocaleToLocaleKey = function convertLocaleToLocaleKey(locale) {
  var _UNTITLED_VALID_LOCAL;
  var lowerLocale = locale.toLowerCase();
  return (_UNTITLED_VALID_LOCAL = UNTITLED_VALID_LOCAL[lowerLocale]) !== null && _UNTITLED_VALID_LOCAL !== void 0 ? _UNTITLED_VALID_LOCAL : 'ja';
};
/**
 * @description Get localized character name by ColorsSekaiKey
 * @param {string} name - ColorsSekaiKey
 * @param {string} locale - Locale code (default: 'ja')
 * @returns {string} - Localized character name
 */
var getSekaiCharacterName = function getSekaiCharacterName(name) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ja';
  var localeKey = convertLocaleToLocaleKey(locale);
  return SEKAI_CHARACTER_NAMES[name][localeKey] || SEKAI_CHARACTER_NAMES[name]['ja'];
};

exports.getSekaiCharacterName = getSekaiCharacterName;
