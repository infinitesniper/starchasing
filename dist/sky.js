/* Application code: MIT. Astronomy calculations: vendored Astronomy Engine. */
(function(root){
'use strict';
const A=typeof module==='object'?require('./vendor/astronomy.js'):root.Astronomy;
// Approximate J2000 catalog coordinates (hours/degrees); for visual planning, not telescope pointing.
const legacyCatalog=[
['织女星','天琴座',18.6156,38.7837,0.03,'star','夏季大三角的一角，蓝白色亮星。'],
['天津四','天鹅座',20.6905,45.2803,1.25,'star','沿夏季大三角辨认天鹅座十字。'],
['牛郎星','天鹰座',19.8464,8.8683,0.77,'star','留意两侧的较暗伴星。'],
['北落师门','南鱼座',22.9608,-29.6222,1.16,'star','秋季南方天空的孤独亮星；低纬度更容易看到。'],
['壁宿二','仙女座',0.1398,29.0904,2.06,'star','秋季四边形的一角，也是仙女座的起点。'],
['室宿一','飞马座',23.0793,15.2053,2.49,'star','与室宿二、壁宿一、壁宿二组成秋季四边形。'],
['五车二','御夫座',5.2782,45.9980,0.08,'star','醒目的金黄色亮星。'],
['参宿四','猎户座',5.9195,7.4071,0.5,'star','红色超巨星，亮度会变化。'],
['天狼星','大犬座',6.7525,-16.7161,-1.46,'star','夜空最亮恒星，低空时闪烁明显。'],
['大角星','牧夫座',14.261,19.1824,-0.05,'star','橙色亮星，可沿北斗斗柄的弧线寻找。'],
['角宿一','室女座',13.4199,-11.1613,0.98,'star','春季天空的重要亮星。'],
['南门二','半人马座',14.6601,-60.8339,-0.27,'star','南天亮星；北方多数地区不可见。'],
['M31 仙女座星系','仙女座',0.7123,41.2692,3.44,'dso','双筒下寻找淡淡的椭圆光斑；暗空很重要。'],
['M45 昴星团','金牛座',3.79,24.1167,1.6,'cluster','肉眼可见，低倍双筒视野尤其适合。'],
['M42 猎户座大星云','猎户座',5.5881,-5.3911,4,'dso','位于猎户腰带下方，双筒可见雾状轮廓。'],
['M15 球状星团','飞马座',21.4995,12.1669,6.2,'dso','双筒下是小光斑，望远镜更适合。'],
['M13 球状星团','武仙座',16.6949,36.4613,5.8,'dso','暗空下双筒可找，望远镜能呈现更多细节。'],
['M44 蜂巢星团','巨蟹座',8.673,19.672,3.7,'cluster','宽视野双筒适合观察。'],
['双星团 NGC 869/884','英仙座',2.333,57.133,4.3,'cluster','双筒下两团星光并列，适合秋冬夜晚。']
].map((v,i)=>({id:'c'+i,name:v[0],group:v[1],ra:v[2],dec:v[3],mag:v[4],kind:v[5],tip:v[6]}));
const brightStars=typeof module==='object'?require('./bright-stars.js'):root.BrightStars;
const catalog=[...brightStars.map(s=>({...s,tip:legacyCatalog.find(o=>o.id===s.id)?.tip||s.tip})),...legacyCatalog.filter(s=>s.kind!=='star')];
const planets=[['Mercury','水星','接近太阳，须在太阳落下后或升起前观察，勿用望远镜扫向太阳。'],['Venus','金星','非常明亮；望远镜可观察盈亏。'],['Mars','火星','呈橙红色；细节取决于当时视直径。'],['Jupiter','木星','双筒可尝试寻找伽利略卫星；望远镜可看云带。'],['Saturn','土星','望远镜适合观察光环。']].map(v=>({id:v[0],name:v[1],tip:v[2],kind:'planet',group:'太阳系'}));
const moon={id:'Moon',name:'月亮',kind:'moon',group:'太阳系',tip:'沿明暗交界线看月面地形。满月附近阴影较少。'};
function position(obj,t,observer){let eq;if(obj.ra!==undefined){const vec=A.VectorFromSphere(new A.Spherical(obj.dec,obj.ra*15,1),t);eq=A.EquatorFromVector(A.RotateVector(A.Rotation_EQJ_EQD(t),vec));}else eq=A.Equator(obj.id, t, observer,true,true);return A.Horizon(t,observer,eq.ra,eq.dec,'normal');}
function inputStart(date,offset){return new Date(Date.parse(date+'T12:00:00Z')-offset*3600000);}
function validate(p){if(!/^\d{4}-\d{2}-\d{2}$/.test(p.date)||!Number.isFinite(Date.parse(p.date+'T00:00:00Z'))||Number(p.date.slice(0,4))<1900||Number(p.date.slice(0,4))>2100)throw Error('请选择 1900–2100 年间的有效日期。');for(const [k,min,max]of[['lat',-90,90],['lon',-180,180],['offset',-12,14]])if(!Number.isFinite(p[k])||p[k]<min||p[k]>max)throw Error('请检查经纬度和 UTC 时差。');}
function calculate(p){validate(p);const observer=new A.Observer(p.lat,p.lon,0),start=inputStart(p.date,p.offset);const times=Array.from({length:145},(_,i)=>new Date(+start+i*600000));const sun=times.map(t=>position({id:'Sun'},t,observer).altitude);const dark=sun.map((v,i)=>v<=-18?i:-1).filter(i=>i>=0);const dusk=A.SearchAltitude('Sun',observer,-1,start,1,-18),dawn=A.SearchAltitude('Sun',observer,1,start,1,-18);const ref=new Date(+start+9*3600000);const phase=A.Illumination('Moon',ref).phase_fraction;const rows=[moon,...planets,...catalog].map(obj=>{const samples=times.map((t,i)=>{const pos=position(obj,t,observer);return{t,alt:pos.altitude,az:pos.azimuth,sun:sun[i]};});let eligible=samples.filter(s=>s.sun<= (obj.kind==='planet'||obj.kind==='moon'?-6:-12)&&s.alt>=20);if(p.gear==='eye'&&obj.kind==='dso')eligible=[];const best=eligible.reduce((a,b)=>!a||b.alt>a.alt?b:a,null);const mag=obj.mag??A.Illumination(obj.id,ref).mag;let score=best?best.alt: -999;const lunarAlt=best?position(moon,best.t,observer).altitude:-90;const moonPenalty=(obj.kind==='dso'||obj.kind==='cluster')&&lunarAlt>0?phase*25:0;score+=obj.kind==='planet'?18:obj.kind==='moon'?8:obj.kind==='cluster'?8:0;score-=moonPenalty;if(obj.kind==='star')score+=(4-mag)*5;return{...obj,mag,samples,best,score,moonPenalty,window:eligible.length?[eligible[0].t,eligible.at(-1).t]:null};}).sort((a,b)=>b.score-a.score);return{start,times,sun,dark,dusk:dusk?.date,dawn:dawn?.date,phase,rows,observer};}
const api={catalog,planets,moon,position,inputStart,validate,calculate};if(typeof module==='object')module.exports=api;else root.Sky=api;
})(typeof globalThis==='object'?globalThis:this);
