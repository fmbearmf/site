({196:function(){var e=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(o,r){function a(e){try{l(i.next(e))}catch(e){r(e)}}function c(e){try{l(i.throw(e))}catch(e){r(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,c)}l((i=i.apply(e,t||[])).next())}))};document.addEventListener("DOMContentLoaded",(function(){return e(this,void 0,void 0,(function*(){document.getElementById("blogIndex")&&document.getElementById("latestPost")&&(document.getElementById("blogIndex").innerHTML="",document.getElementById("latestPost").innerHTML="",fetch("/blogindex.txt").then((e=>e.text())).then((t=>{const n=t.split("\n").filter((e=>""!==e.trim())).map((e=>{const t=e.split(" ");return{timestamp:parseInt(t[0]),uri:t[1]||""}}));n.sort(((e,t)=>t.timestamp-e.timestamp));const i=document.createElement("ul");n.forEach((t=>e(this,void 0,void 0,(function*(){if(t.uri){const n=t.uri.split("/").pop().replace(".html",""),o=`${yield function(t){return e(this,void 0,void 0,(function*(){return new Promise((e=>{e(t.replace(/([a-z])([A-Z])/g,"$1 $2").replace(/(\d{4}-\d{2}-\d{2})/g," $1").replace(/\b\w/g,(e=>e.toUpperCase())))}))}))}(n)}`;if("index"!==n.toLowerCase()){const e=document.createElement("li"),n=document.createElement("a"),r=document.createElement("p");e.style.whiteSpace="nowrap",r.style.gap="10px",r.textContent=`${new Intl.DateTimeFormat(navigator.language).format(new Date(1e3*t.timestamp))}⠀`,n.href=t.uri.substring(t.uri.indexOf("/blog/")),n.textContent=o,n.style.display="inline-block",r.style.display="inline-block",e.appendChild(r),e.appendChild(n),i.appendChild(e)}}})))),document.getElementById("blogIndex").appendChild(i)})).catch((e=>{console.error("Error fetching and processing blog index:",e)})))}))}))}})[196]();