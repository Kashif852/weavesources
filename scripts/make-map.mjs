import { geoNaturalEarth1, geoContains } from "d3-geo";
import { feature } from "topojson-client";
import fs from "fs";
const topo = JSON.parse(fs.readFileSync("node_modules/world-atlas/land-110m.json","utf8"));
const land = feature(topo, topo.objects.land);
const W=1000,H=500;
const proj = geoNaturalEarth1().fitExtent([[0,10],[W,H-10]], {type:"Sphere"});
const step=9; let dots=[];
for(let y=step/2;y<H;y+=step) for(let x=step/2;x<W;x+=step){
  const ll=proj.invert([x,y]); if(!ll) continue;
  if(ll[1]<-58) continue;
  if(geoContains(land,ll)) dots.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.1"/>`);
}
fs.writeFileSync("public/world-dots.svg",`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" fill="#A99E8B">${dots.join("")}</svg>`);
const pts={pakistan:[67.0,24.9],usa:[-122.33,47.61],europe:[10,50],middleeast:[46.5,25.5],apac:[110,5]};
const out={}; for(const [k,v] of Object.entries(pts)){const [x,y]=proj(v); out[k]={x:+(x/W*100).toFixed(2),y:+(y/H*100).toFixed(2)};}
fs.writeFileSync("src/content/map-points.json",JSON.stringify(out,null,2));
console.log(dots.length, out);
