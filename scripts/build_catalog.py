"""Build bright-star subset from D3-Celestial JSON inputs. Usage: python scripts/build_catalog.py DATA_DIR"""
import json,sys,pathlib,hashlib
src=pathlib.Path(sys.argv[1]);root=pathlib.Path(__file__).resolve().parents[1]
read=lambda f:json.loads((src/f).read_text())
geo=read('stars.6.json');names=read('starnames.json');cn=read('starnames.cn.json');cons={x['id']:x['properties'].get('zh',x['id']) for x in read('constellations.json')['features']}
oldhips=[91262,102098,97649,113368,677,113963,24608,27989,32349,69673,65474,71683]
oldids={h:'c'+str(i) for i,h in enumerate(oldhips)}
groups=dict(zip(oldhips,['织女','天津','河鼓','北落师门','壁宿','室宿','五车','参宿','天狼','大角','角宿','南门']))
records=[]
for f in geo['features']:
 mag=f['properties'].get('mag')
 if not isinstance(mag,(int,float)) or mag>4:continue
 hip=f['id'];n=names.get(str(hip),{});trad=cn.get(str(hip),{});lon,dec=f['geometry']['coordinates'];con=cons.get(n.get('c'),'星座未收录')
 designation=(n.get('desig','')+' '+n.get('c','')).strip() or 'HIP '+str(hip)
 zh=n.get('zh') or trad.get('name') or designation
 records.append(dict(id=oldids.get(hip,'hip'+str(hip)),hip=hip,name=zh,group=con,ra=(lon%360)/15,dec=dec,mag=mag,kind='star',tip='可作为肉眼认星目标；结合附近亮星辨认，实际可见性取决于天空条件。',international=n.get('name') or designation,designation=designation,chinese=trad.get('name') or n.get('zh') or '',asterism=groups.get(hip,'')))
records.sort(key=lambda x:(x['mag'],x['hip']))
js='/* D3-Celestial selected bright-star data; see THIRD_PARTY.md. Generated, do not edit by hand. */\n(function(root){const stars='+json.dumps(records,ensure_ascii=False,separators=(',',':'))+';if(typeof module==="object")module.exports=stars;else root.BrightStars=stars;})(globalThis);\n'
(root/'dist/bright-stars.js').write_text(js)
manifest={'count':len(records),'magnitude_limit':4,'source':'https://github.com/ofrohn/d3-celestial/tree/master/data','retrieved':'2026-10-05','input_sha256':{f:hashlib.sha256((src/f).read_bytes()).hexdigest() for f in ['stars.6.json','starnames.json','starnames.cn.json','constellations.json']},'named_chinese':sum(bool(x['chinese']) for x in records),'verified_asterism_groups':sum(bool(x['asterism']) for x in records)}
(root/'dist/catalog-provenance.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n');print(manifest)
