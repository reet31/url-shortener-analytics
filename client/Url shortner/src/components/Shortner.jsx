import { useState } from "react";

const Shortner=()=>{
    const [url,setUrl]=useState("");
    const [shortUrl,setShortUrl]=useState("");

    const handleShorten=async()=>{
        try{
            const res=await fetch("http://localhost:5000/shorten",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({originalUrl:url})
            });
            const data=await res.json();
            setShortUrl(data.shortUrl);
        }catch(err){
            console.error("Error shortening URL:",err);
        }
            
        }
    return (
        <div style={{padding:"2 rem"}}>
            <h1>URL Shortener</h1>
            <input type="text" placeholder="Enter the URL"
            value={url}
            onChange={(e)=>setUrl(e.target.value)}
            style={{width:"300px",padding:"0.5rem",marginRight:"1rem"}}/>

            <button onClick={handleShorten} style={{padding:"0.5rem 1rem"}}>Shorten</button>

            {shortUrl && (
                <div style={{marginTop:"1rem"}}>
                    <p>Shortened URL:</p>
                    <a href={shortUrl} target="_blank" >{shortUrl}</a>
                </div>
            )}
        </div>
    )
}
export default Shortner;