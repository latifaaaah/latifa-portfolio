/** Original perspective-projected sphere. All signals are illustrative geometry. */
export function drawHologram(ctx:CanvasRenderingContext2D,w:number,h:number,time:number,rx:number,ry:number,active=0){
 ctx.clearRect(0,0,w,h);const radius=Math.min(w*.34,h*.34),cx=w*.5,cy=h*.5;
 const project=(x:number,y:number,z:number)=>{const a=time*.075+rx*.65,b=-.22+ry*.35;const xx=x*Math.cos(a)-z*Math.sin(a),zz=x*Math.sin(a)+z*Math.cos(a);const yy=y*Math.cos(b)-zz*Math.sin(b),z2=y*Math.sin(b)+zz*Math.cos(b);const p=3.8/(3.8-z2);return {x:cx+xx*radius*p,y:cy+yy*radius*p,z:z2};};
 const glow=ctx.createRadialGradient(cx,cy,0,cx,cy,radius*1.65);glow.addColorStop(0,'#00cfe012');glow.addColorStop(.65,'#00cfe00a');glow.addColorStop(1,'#00cfe000');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
 const line=(points:number[][],color:string,width=1)=>{ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();points.forEach((v,i)=>{const p=project(v[0],v[1],v[2]);if(i)ctx.lineTo(p.x,p.y);else ctx.moveTo(p.x,p.y);});ctx.stroke();};
 const segments=w<500?48:80;
 for(let lat=-75;lat<=75;lat+=15){const phi=lat*Math.PI/180;line(Array.from({length:segments+1},(_,j)=>{const t=j/segments*Math.PI*2;return [Math.cos(phi)*Math.cos(t),Math.sin(phi),Math.cos(phi)*Math.sin(t)];}),'#00f5ff35');}
 for(let lon=0;lon<180;lon+=15){const phi=lon*Math.PI/180;line(Array.from({length:segments+1},(_,j)=>{const t=j/segments*Math.PI*2;return [Math.cos(t)*Math.cos(phi),Math.sin(t),Math.cos(t)*Math.sin(phi)];}),'#00f5ff42');}
 for(let orbit=0;orbit<3;orbit++){const tilt=orbit*.7+.3;const ring=(t:number)=>[1.3*Math.cos(t),1.3*Math.sin(t)*Math.sin(tilt),1.3*Math.sin(t)*Math.cos(tilt)];line(Array.from({length:97},(_,j)=>ring(j/96*Math.PI*2)),orbit===active?'#ff713d80':'#00f5ff25',orbit===active?1.5:1);const start=time*.25+orbit*2;line(Array.from({length:15},(_,j)=>ring(start-j*.018)),orbit===active?'#ff713d':'#00e5c7',2);const p=project(...ring(start) as [number,number,number]);ctx.shadowColor=orbit===active?'#ff713d':'#00f5ff';ctx.shadowBlur=14;ctx.fillStyle=ctx.shadowColor;ctx.beginPath();ctx.arc(p.x,p.y,3,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;}
 const nodes=Array.from({length:32},(_,i)=>{const y=1-2*(i+.5)/32,theta=i*2.39996,r=Math.sqrt(1-y*y);return [Math.cos(theta)*r,y,Math.sin(theta)*r];});
 nodes.forEach((v,i)=>{const p=project(...v as [number,number,number]);if(i%4===active){const next=nodes[(i+7)%nodes.length];line([v,next],'#ff713d35');}ctx.globalAlpha=.35+(p.z+1)*.3;ctx.fillStyle=i%4===active?'#ff935f':'#8cfcff';ctx.beginPath();ctx.arc(p.x,p.y,i%4===active?3:1.6,0,Math.PI*2);ctx.fill();});ctx.globalAlpha=1;
 // Fine orbital calibration ticks give the scene a designed boundary.
 ctx.strokeStyle='#00f5ff30';for(let i=0;i<72;i++){const a=i*Math.PI/36;ctx.beginPath();ctx.moveTo(cx+Math.cos(a)*radius*1.5,cy+Math.sin(a)*radius*1.5);ctx.lineTo(cx+Math.cos(a)*radius*(i%6?1.515:1.55),cy+Math.sin(a)*radius*(i%6?1.515:1.55));ctx.stroke();}
}
