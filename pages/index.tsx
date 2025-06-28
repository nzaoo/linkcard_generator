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
  const [facebook, setFacebook] = useState("");
  const [website, setWebsite] = useState("");

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-sans overflow-x-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-20 h-20 bg-white/10 rounded-full top-[20%] left-[10%] animate-float"></div>
        <div className="absolute w-32 h-32 bg-white/10 rounded-full top-[60%] right-[15%] animate-float delay-200"></div>
        <div className="absolute w-16 h-16 bg-white/10 rounded-full bottom-[20%] left-[20%] animate-float delay-400"></div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent drop-shadow-lg">
            IntroCard
          </h1>
          <p className="text-lg opacity-90 max-w-xl mx-auto mt-4">
            Create beautiful personal introduction cards to share with the world.
            Connect, introduce yourself, and make lasting first impressions.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12">
          <section className="bg-white/90 rounded-2xl p-8 backdrop-blur border border-white/30 shadow-xl">
            <h2 className="text-gray-800 text-2xl font-semibold mb-6">Create Your Card</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="space-y-6"
            >
              <div>
                <label className="block mb-2 text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Bio / Introduction</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Facebook Profile Link</label>
                <input
                  type="url"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="https://facebook.com/yourprofile"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Website / Portfolio (Optional)</label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="https://yourwebsite.com"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg transition relative overflow-hidden"
              >
                Generate My Card
              </button>
            </form>
          </section>

          <section className="space-y-8">
            <div className="bg-white/90 rounded-2xl p-8 backdrop-blur border border-white/30 shadow-xl transform transition hover:-translate-y-1 hover:rotate-x-2">
              <div className="w-24 h-24 mx-auto rounded-full border-4 border-white bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white mb-4">
                {name ? getInitials(name) : "?"}
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-2">
                  {name || "Your Name"}
                </div>
                <div className="text-gray-600 mb-4">
                  {bio || "Your introduction will appear here..."}
                </div>
                <div className="flex justify-center gap-4 flex-wrap">
                  {facebook && (
                    <a
                      href={facebook}
                      target="_blank"
                      className="bg-[#1877f2] text-white px-4 py-2 rounded-full shadow hover:bg-[#166fe5] transition"
                    >
                      📘 Facebook
                    </a>
                  )}
                  {website && (
                    <a
                      href={website}
                      target="_blank"
                      className="bg-indigo-500 text-white px-4 py-2 rounded-full shadow hover:bg-indigo-600 transition"
                    >
                      🌐 Website
                    </a>
                  )}
                  {!facebook && !website && (
                    <span className="text-gray-400">Add your links to see them here</span>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
