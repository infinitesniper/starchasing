/* Selected name facts adapted from D3-Celestial, BSD-3-Clause; see vendor/d3-celestial-LICENSE.txt. */
(function(root){
const stars={
  "c0": {
    "hip": 91262,
    "international": "Vega",
    "designation": "α Lyr",
    "chinese": "织女一",
    "asterism": "织女"
  },
  "c1": {
    "hip": 102098,
    "international": "Deneb",
    "designation": "α Cyg",
    "chinese": "天津四",
    "asterism": "天津"
  },
  "c2": {
    "hip": 97649,
    "international": "Altair",
    "designation": "α Aql",
    "chinese": "河鼓二",
    "asterism": "河鼓"
  },
  "c3": {
    "hip": 113368,
    "international": "Fomalhaut",
    "designation": "α PsA",
    "chinese": "北落师门",
    "asterism": "北落师门"
  },
  "c4": {
    "hip": 677,
    "international": "Alpheratz",
    "designation": "α And",
    "chinese": "壁宿二",
    "asterism": "壁宿"
  },
  "c5": {
    "hip": 113963,
    "international": "Markab",
    "designation": "α Peg",
    "chinese": "室宿一",
    "asterism": "室宿"
  },
  "c6": {
    "hip": 24608,
    "international": "Capella",
    "designation": "α Aur",
    "chinese": "五车二",
    "asterism": "五车"
  },
  "c7": {
    "hip": 27989,
    "international": "Betelgeuse",
    "designation": "α Ori",
    "chinese": "参宿四",
    "asterism": "参宿"
  },
  "c8": {
    "hip": 32349,
    "international": "Sirius",
    "designation": "α CMa",
    "chinese": "天狼",
    "asterism": "天狼"
  },
  "c9": {
    "hip": 69673,
    "international": "Arcturus",
    "designation": "α Boo",
    "chinese": "大角",
    "asterism": "大角"
  },
  "c10": {
    "hip": 65474,
    "international": "Spica",
    "designation": "α Vir",
    "chinese": "角宿一",
    "asterism": "角宿"
  },
  "c11": {
    "hip": 71683,
    "international": "Rigil Kentaurus",
    "designation": "α1 Cen",
    "chinese": "南门二",
    "asterism": "南门"
  }
};
const bright=typeof module==='object'?require('./bright-stars.js'):root.BrightStars;
for(const s of bright)if(!stars[s.id])stars[s.id]=s;
const modes={modern:'现代国际星座',chinese:'中国传统星官'};
function describe(obj,mode='modern'){
 const entry=stars[obj.id];
 if(!entry)return {...obj,cultureNote:obj.kind==='planet'||obj.kind==='moon'?'日月行星共用现代名称。':'保留现代目录名称；本资料库未收录该目标的传统对应。',alternate:'',designation:obj.id};
 if(mode==='chinese'&&!entry.asterism)return {...obj,name:entry.chinese||obj.name,group:'传统归属未核对',alternate:entry.international+' / '+entry.designation+' / '+obj.group,cultureNote:'已收录传统名称；星官分组尚未核对，不从星名自动推断。',designation:entry.designation};
 if(mode==='chinese')return {...obj,name:entry.chinese,group:entry.asterism+' · 星官',alternate:entry.international+' / '+entry.designation+' / '+obj.group,cultureNote:'传统星官与现代星座是不同的分组体系，不是一一翻译。',designation:entry.designation};
 return {...obj,name:obj.name,group:obj.group,alternate:entry.international+' / '+entry.designation,cultureNote:'现代星座归属；中文常用星名保留传统来源。',designation:entry.designation};
}
const api={stars,modes,describe};if(typeof module==='object')module.exports=api;else root.Cultures=api;
})(globalThis);
