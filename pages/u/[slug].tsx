// pages/u/[slug].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import SocialLinks from "@/components/SocialLinks";

export default function UserCardPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!slug) return;

      const q = query(collection(db, "cards"), where("slug", "==", slug));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      } else {
        setUser(undefined);
      }
    };

    fetchUser();
  }, [slug]);

  if (user === null) return <p>Đang tải...</p>;
  if (user === undefined) return <p>Không tìm thấy card nào cho slug này.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#0a0a0a] text-white">
      <img
        src={user.avatar || "/default-avatar.png"}
        alt="Avatar"
        className="w-32 h-32 rounded-full mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
      <p className="text-center max-w-md mb-6">{user.bio}</p>

      <SocialLinks links={user.links || []} />
    </div>
  );
}
