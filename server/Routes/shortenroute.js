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


router.get('/:shortCode', async (req, res) => {
    try {
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
        const country = req.headers['cf-ipcountry'] || 'Unknown';

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