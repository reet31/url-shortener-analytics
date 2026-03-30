export default function LinkItem({ link }) {
  const shortUrl = `http://localhost:5000/${link.shortCode}`;

  return (
    <div style={{ borderBottom: "1px solid gray", padding: "10px" }}>
      <a href={shortUrl} target="_blank">
        {shortUrl}
      </a>

      <p>{link.originalUrl}</p>

      <button
        onClick={() => navigator.clipboard.writeText(shortUrl)}
      >
        Copy
      </button>
    </div>
  );
}