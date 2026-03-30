import { useEffect, useState } from "react";
import LinkItem from "./LinkItem";

export default function UrlList() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/urls")
      .then(res => res.json())
      .then(data => setLinks(data));
  }, []);

  return (
    <div>
      {links.map((link) => (
        <LinkItem key={link._id} link={link} />
      ))}
    </div>
  );
}