const Url=require('../Schemas/urlSchema');
const {nanoid}=require('nanoid');
const express = require('express');
const Click=require('../Schemas/clickSchemas');
const UAParser=require('ua-parser-js');
const router=express.Router();

router.post('/shorten',async(req,res)=>{


    try{
        const {originalUrl}=req.body;
        if(!originalUrl){
            return res.status(400).json({error:'Original URL is required'});
        }
        //if already exists
        let existingUrl = await Url.findOne({ originalUrl });
        if (existingUrl) {
            return res.json({ 
                shortUrl: `http://localhost:5000/${existingUrl.shortCode}`,
                message: 'Short URL already exists'
            });
        }
        
        let shortCode;
        let isUnique = false;
        while (!isUnique) {
            shortCode = nanoid(8);
            const existingCode = await Url.findOne({ shortCode });
            if (!existingCode) {
                isUnique = true;
            }
        }

        const newUrl=new Url({
            shortCode,
            originalUrl
        })
        await newUrl.save();

        res.json({
            shortUrl:`http://localhost:5000/${shortCode}`, });
    }catch(err){
        console.error('Error shortening URL',err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.get("/:shortCode",async(req,res)=>{
    try{
        const {shortCode}=req.params;
        const url=await Url.findOne({shortCode});

        if(!url){
            return res.status(404).json({error:'URL not found'});
        }
        const parser=new UAParser(req.headers['user-agent']);
        const device=parser.getDevice().type ||"Desktop";
        const browser=parser.getBrowser().name;

        //ip addrress
        const ip=req.headers["x-forwarded-for"]|| req.socket.remoteAddress;

        // referrer
        const referrer=req.get('Referrer')||'Direct';
        // country
        const country=req.headers['cf-ipcountry']||'Unknown';
    
         const clickCount = await Click.countDocuments({ url: url._id });
         const newClick=new Click({
            timestamp:new Date(),
            clicks:clickCount + 1,
            referrer,   
            ip,
            country,
            browser,
            device,
            url:url._id 
         });
        await newClick.save();
        res.redirect(url.originalUrl);

    }catch(err){
        console.error('Error redirecting URL',err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

module.exports=router;
