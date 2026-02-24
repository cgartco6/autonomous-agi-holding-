const express = require('express');
const router = express.Router();
let agents = [
    {id:1,name:"Meta-Agent",status:"active"},
    {id:2,name:"Market-Adapt",status:"active"},
];

router.get('/status', (req,res)=>{
    // Simulate self-healing: reactivate failed agents
    agents.forEach(a=>{ if(a.status==="failed") a.status="active"; });
    res.json(agents);
});

// Autonomous capital rebalancing example
router.post('/rebalance', (req,res)=>{
    const funds=req.body.funds || [];
    const totalCapital = req.body.totalCapital || 100000;
    funds.sort((a,b)=>b.roi-a.roi);
    const allocation=funds.map((f,i)=>({symbol:f.symbol,allocation:totalCapital*(1/(i+1))/funds.reduce((s,_,idx)=>s+1/(idx+1),0)}));
    res.json({allocation});
});

module.exports = router;
