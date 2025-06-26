// components/SocialLinks.tsx
type Link = {
  platform: string;
  url: string;
};

export default function SocialLinks({ links }: { links: Link[] }) {
  return (
    <div className="space-y-2">
      {links.map((link, i) => (
        <a
          key={i}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
        >
          {link.platform}
        </a>
      ))}
    </div>
  );
}
