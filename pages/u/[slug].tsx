// pages/u/[slug].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import CardPreview from "@/components/CardPreview";
import Head from "next/head";

export default function UserCardPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!slug) return;

      try {
        const q = query(collection(db, "cards"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setUser(querySnapshot.docs[0].data());
        } else {
          setUser(undefined);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(undefined);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Đang tải thẻ giới thiệu...</p>
        </div>
      </div>
    );
  }

  if (user === undefined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center p-4">
        <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-2xl font-bold text-white mb-2">Không tìm thấy</h1>
          <p className="text-white/80 mb-6">Thẻ giới thiệu này không tồn tại hoặc đã bị xóa.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Tạo thẻ mới
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{user.name} - NZaoCard</title>
        <meta name="description" content={user.bio || `Thẻ giới thiệu của ${user.name}`} />
        <meta property="og:title" content={`${user.name} - NZaoCard`} />
        <meta property="og:description" content={user.bio || `Thẻ giới thiệu của ${user.name}`} />
        <meta property="og:image" content={user.avatar || "/default-avatar.png"} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-32 h-32 bg-white/10 rounded-full top-[10%] left-[10%] animate-float"></div>
          <div className="absolute w-24 h-24 bg-white/10 rounded-full top-[60%] right-[20%] animate-float delay-300"></div>
          <div className="absolute w-16 h-16 bg-white/10 rounded-full bottom-[20%] left-[30%] animate-float delay-600"></div>
          <div className="absolute w-20 h-20 bg-white/10 rounded-full top-[30%] right-[60%] animate-float delay-900"></div>
        </div>

        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            {/* Main Card */}
            <CardPreview
              name={user.name}
              bio={user.bio}
              links={user.links || []}
              avatar={user.avatar}
              isPreview={false}
              className="animate-scale-in"
            />

            {/* Call to Action */}
            <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <button
                onClick={() => router.push('/')}
                className="bg-white/20 backdrop-blur-lg text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-200 border border-white/30"
              >
                Tạo thẻ của riêng bạn
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
