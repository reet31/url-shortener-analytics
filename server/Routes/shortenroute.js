const Url = require('../Schemas/urlSchema');
const Click = require('../Schemas/clickSchemas');
const { nanoid } = require('nanoid');
const express = require('express');
const UAParser = require('ua-parser-js');

const router = express.Router();


function updateCountArray(arr, key, value) {
    const existing = arr.find(item => item[key] === value);

    if (existing) {
        existing.count += 1;
    } else {
        arr.push({
            [key]: value,
            count: 1
        });
    }
}

router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

router.get('/urls',async(req,res)=>{
    try{
        const urls =await Url.find().sort({ createdAt: -1 });
        res.json(urls);
    }
    catch(err){
        res.status(500).json({ error: 'Failed to fetch URLs' });
    }
})

router.post('/shorten', async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({
                error: 'Original URL is required'
            });
        }

        const existingUrl = await Url.findOne({ originalUrl });

        if (existingUrl) {
            return res.json({
                shortUrl: `http://localhost:5000/${existingUrl.shortCode}`,
                message: 'Short URL already exists'
            });
        }

        //  unique shortcode
        let shortCode;
        let exists = true;

        while (exists) {
            shortCode = nanoid(8);

            const found = await Url.findOne({ shortCode });

            if (!found) {
                exists = false;
            }
        }

        const newUrl = new Url({
            shortCode,
            originalUrl
        });

        await newUrl.save();

        return res.json({
            shortUrl: `http://localhost:5000/${shortCode}`
        });

    } catch (err) {
        console.error('Error shortening URL:', err);

        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});
// route to get aggregated data for analytics page 
router.get('/analytics',async(req,res)=>{
    try{
        const allClick=await Click.find().populate('url');

        let tottalClicks=0;
        let countryMap={};
        let linkStats=[];
        let dailyClick=[0,0,0,0,0,0,0];

        allClick.forEach(click=>{
            const now = Date.now();
            if(!click.lastClickedAt) return;
            const lastClicked= new Date(click.lastClickedAt);
            const diffDays=Math.floor((now-lastClicked)/(1000*60*60*24));   
                    if(diffDays>=0 && diffDays<7){
                    dailyClick[6-diffDays]+=click.totalClicks || 0;
            }
            console.log("Click date :", lastClicked);
            if(diffDays>=0 && diffDays<7){
                dailyClick[6-diffDays]+=(click.totalClicks || 0);
            }
 


            tottalClicks+=click.totalClicks || 0;
            
            const topcountry=click.countries.sort((a,b)=>b.count-a.count)[0]?.name || 'Unknown';
            const topbrowser=click.browsers.sort((a,b)=>b.count-a.count)[0]?.name || 'Unknown';
            const clicks = click.totalClicks || 0;

            const created = new Date(click.url?.createdAt).getTime();
            
            const days = Math.max(
                      1,
                      Math.ceil((now - created) / (1000 * 60 * 60 * 24))
                    );

            const avgperday = (clicks / days).toFixed(1);
               //country stats
            (click.countries|| []).forEach(country=>{
                countryMap[country.name]=(countryMap[country.name] || 0)+country.count;
            });
            console.log(click.totalClicks, click.url?.createdAt);
            //link stats
            if(click.url){
                    linkStats.push({

                        createdAt:click.url.createdAt,
                        topcountry
                        ,topbrowser,
                        avgperday,
                        shortCode:click.url.shortCode,
                        clicks:click.totalClicks
                    });
                }
            });
            res.json({
                tottalClicks,
                countries:countryMap,
                links:linkStats,
                clicks:dailyClick,
            });
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            error:"server error"});
    }
})

router.get('/:shortCode', async (req, res) => {
    try {
        console.log('IP:', req.headers['x-forwarded-for']);
        console.log('Socket IP:', req.socket.remoteAddress);
        console.log('All headers:', req.headers);
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({
                error: 'URL not found'
            });
        }

        const parser = new UAParser(req.headers['user-agent']);

        const device = parser.getDevice().type || 'Desktop';
        const browser = parser.getBrowser().name || 'Unknown';

        const referrer = req.get('Referrer') || 'Direct';
        let ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress ;
        if(ip==='::1' || ip==='127.0.0.1'){
            ip=null;
        }
        let country='Unknown';
    if(ip){
        try{
            const geo=await fetch(`http://ip-api.com/json/${ip}`);
            const geoData=await geo.json();
            console.log("Geo data:", geoData);
            country=geoData.country || 'Unknown';
        }catch{
            console.error(error);
            country='Unknown';
        }
    }
    

        let analytics = await Click.findOne({ url: url._id });

        if (!analytics) {
            analytics = new Click({
                url: url._id,
                totalClicks: 0,
                browsers: [],
                devices: [],
                countries: [],
                referrers: []
            });
        }

        analytics.totalClicks += 1;
        analytics.lastClickedAt = new Date();
        console.log('country',country);
        updateCountArray(analytics.browsers, 'name', browser);
        updateCountArray(analytics.devices, 'deviceType', device);
        updateCountArray(analytics.countries, 'name', country);
        updateCountArray(analytics.referrers, 'source', referrer);

        await analytics.save();

        return res.redirect(url.originalUrl);

    } catch (err) {
        console.error('Error redirecting URL:', err);

        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});



module.exports = router;