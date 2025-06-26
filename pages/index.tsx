// pages/index.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import generateSlug from "@/utils/generateSlug";

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [links, setLinks] = useState([{ platform: "", url: "" }]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = generateSlug(name);

    const docRef = await addDoc(collection(db, "cards"), {
      name,
      bio,
      avatar,
      links,
      slug,
      createdAt: new Date()
    });

    router.push(`/u/${slug}`);
  };

  const updateLink = (index: number, field: string, value: string) => {
    const updated = [...links];
    updated[index][field] = value;
    setLinks(updated);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Tạo Card của bạn</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Tên bạn"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Giới thiệu bản thân"
          className="w-full p-2 border rounded"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          placeholder="Link ảnh avatar (URL)"
          className="w-full p-2 border rounded"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />

        <div className="space-y-2">
          <p className="font-semibold">Mạng xã hội:</p>
          {links.map((link, i) => (
            <div key={i} className="flex gap-2">
              <input
                placeholder="Tên nền tảng (eg. Facebook)"
                value={link.platform}
                onChange={(e) => updateLink(i, "platform", e.target.value)}
                className="w-1/2 p-2 border rounded"
              />
              <input
                placeholder="URL"
                value={link.url}
                onChange={(e) => updateLink(i, "url", e.target.value)}
                className="w-1/2 p-2 border rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setLinks([...links, { platform: "", url: "" }])}
            className="text-blue-500 hover:underline"
          >
            + Thêm link
          </button>
        </div>

        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Tạo Card
        </button>
      </form>
    </div>
  );
}
