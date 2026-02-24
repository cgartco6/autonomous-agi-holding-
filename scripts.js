const API_BASE = "http://localhost:5000/api"; // Change to Oracle Cloud backend URL when deployed

// ------------------ Marketplace & Cart ------------------
const products = [
  {id:1,name:"Meta-Agent Designer",price:1200},
  {id:2,name:"GPU Mutation Engine",price:2500},
  {id:3,name:"Distributed Evolution Cluster",price:5000},
  {id:4,name:"Autonomous AI Company Builder",price:8000}
];
let cart=[];

function renderMarketplace(){
  const container = document.getElementById("marketplace");
  container.innerHTML = "";
  products.forEach(p=>{
    container.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>Price: $${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>`;
  });
}

function addToCart(id){
  cart.push(products.find(p=>p.id===id));
  renderCart();
}

function renderCart(){
  const div = document.getElementById("cartItems");
  div.innerHTML = "";
  let total = 0;
  cart.forEach(i=>{
    total += i.price;
    div.innerHTML += `<p>${i.name} - $${i.price}</p>`;
  });
  document.getElementById("total").innerText = "Total: $" + total;
}

async function checkout(){
  try{
    const res = await fetch(`${API_BASE}/payments/checkout`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({cart})
    });
    const data = await res.json();
    alert(data.message || "Payment executed (placeholder)");
  }catch(err){
    console.error(err); alert("Payment failed!");
  }
}

// ------------------ Blockchain Tokens ------------------
async function mintToken(){
  try{
    const user = "user123"; // replace with logged-in user
    const res = await fetch(`${API_BASE}/blockchain/mint`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({user,amount:10})
    });
    const data = await res.json();
    document.getElementById("tokenDashboard").innerText = JSON.stringify(data.ledger,null,2);
  }catch(err){ console.error(err); }
}

async function fetchLedger(){
  const res = await fetch(`${API_BASE}/blockchain/ledger`);
  const ledger = await res.json();
  document.getElementById("tokenDashboard").innerText = JSON.stringify(ledger,null,2);
}

// ------------------ Live AI Dashboard ------------------
let ws;
function connectWebSocket(){
  ws = new WebSocket("ws://localhost:6000"); // replace with Oracle Cloud WebSocket
  ws.onopen = ()=>logWS("WebSocket connected.");
  ws.onmessage = (msg)=>logWS(msg.data);
  ws.onclose = ()=>setTimeout(connectWebSocket,5000);
}

function logWS(msg){
  const log = document.getElementById("wsLog");
  log.innerHTML += msg + "<br>";
  log.scrollTop = log.scrollHeight;
}

async function updateAIDashboard(){
  try{
    const res = await fetch(`${API_BASE}/ai/status`);
    const agents = await res.json();
    const container = document.getElementById("aiDashboard");
    container.innerHTML = "";
    agents.forEach(a=>{
      container.innerHTML += `<div class="card">${a.name}<br>Status: ${a.status}</div>`;
    });
  }catch(err){ console.error(err); }
}
setInterval(updateAIDashboard,5000);

// ------------------ Investment Fund Dashboard ------------------
let fundPortfolio = [
  {symbol:"BTC",roi:0,allocation:0},
  {symbol:"ETH",roi:0,allocation:0},
  {symbol:"AAPL",roi:0,allocation:0}
];

async function fetchMarketData(){
  try{
    const res = await fetch(`${API_BASE}/market/crypto`);
    const crypto = await res.json();
    const stockRes = await fetch(`${API_BASE}/market/stock?symbol=AAPL`);
    const stockData = await stockRes.json();

    fundPortfolio[0].roi = crypto.BTC/50000;
    fundPortfolio[1].roi = crypto.ETH/4000;
    fundPortfolio[2].roi = stockData.price/150;

    updateFundDashboard();
  }catch(err){ console.error(err); }
}

function updateFundDashboard(){
  const container = document.getElementById("fundDashboard");
  container.innerHTML = "";
  fundPortfolio.forEach(f=>{
    container.innerHTML += `<div class="card">${f.symbol}<br>ROI: ${(f.roi*100).toFixed(2)}%<br>Allocation: $${f.allocation.toFixed(2)}</div>`;
  });
}

// Autonomous allocation via backend AI loop
async function allocateCapital(){
  try{
    const res = await fetch(`${API_BASE}/ai/rebalance`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({funds:fundPortfolio,totalCapital:100000})
    });
    const data = await res.json();
    fundPortfolio.forEach(f=>{
      const alloc = data.allocation.find(a=>a.symbol===f.symbol);
      if(alloc) f.allocation = alloc.allocation;
    });
    updateFundDashboard();
  }catch(err){ console.error(err); }
}
setInterval(fetchMarketData,10000);

// ------------------ PDF Compliance ------------------
function generatePDF(){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Weekly Compliance & Investment Report",10,10);
  let y = 20;
  cart.forEach(p=>{ doc.text(`${p.name} - $${p.price}`,10,y); y+=10; });
  fundPortfolio.forEach(f=>{ doc.text(`${f.symbol} ROI: ${(f.roi*100).toFixed(2)}%, Allocation: $${f.allocation.toFixed(2)}`,10,y); y+=10; });
  doc.save("weekly_report.pdf");
  document.getElementById("pdfLog").innerText = "PDF generated successfully!";
}

// ------------------ Weekly Payout ------------------
function distributePayouts(){
  let totalRevenue = cart.reduce((sum,i)=>sum+i.price,0);
  const allocation = {
    "FNB 35%": totalRevenue*0.35,
    "African Bank 15%": totalRevenue*0.15,
    "AI FNB 20%": totalRevenue*0.20,
    "Reserve FNB 20%": totalRevenue*0.20,
    "Building Fund 10%": totalRevenue*0.10
  };
  let log="";
  for(let acc in allocation) log += `${acc}: $${allocation[acc].toFixed(2)}\n`;
  document.getElementById("payoutLog").innerText = log;
}

// ------------------ Marketing Engine ------------------
function generateMarketingContent(){
  const content=[];
  for(let i=0;i<3;i++){
    content.push({
      image:`AI-image-${Math.floor(Math.random()*10000)}.png`,
      video:`AI-video-${Math.floor(Math.random()*10000)}.mp4`,
      voice:`AI-voice-${Math.floor(Math.random()*10000)}.mp3`
    });
  }
  const container = document.getElementById("marketingContent");
  container.innerHTML = "";
  content.forEach(c=>{
    container.innerHTML += `<div class="card"><p>Image: ${c.image}</p><p>Video: ${c.video}</p><p>Voice: ${c.voice}</p></div>`;
  });
}

function generateLandingPage(){
  const product = products[Math.floor(Math.random()*products.length)];
  const html = `
  <div class="card" style="padding:15px;margin-top:10px;">
    <h3>${product.name} - Exclusive Offer</h3>
    <p>Limited-time AI-powered enterprise solution.</p>
    <button onclick="checkout()">Buy Now</button>
  </div>`;
  document.getElementById("landingPagePreview").innerHTML = html;
}

// ------------------ Initialization ------------------
renderMarketplace();
fetchLedger();
connectWebSocket();
updateAIDashboard();
updateFundDashboard();
