const mongoose=require('mongoose');
const clickSchema=new mongoose.Schema({
    url: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'URL', 
        unique: true
    },
    totalClicks: { type: Number, default: 0 },
    browsers:  [{ name: String, count: Number }],
    devices:   [{ type: String, count: Number }],
    countries: [{ name: String, count: Number }],
    referrers: [{ source: String, count: Number }],
    lastClickedAt: Date
});
module.exports=mongoose.model('Click', clickSchema);
