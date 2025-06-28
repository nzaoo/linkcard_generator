// pages/index.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import generateSlug from "@/utils/generateSlug";
import CardPreview from "@/components/CardPreview";
import FormInput from "@/components/FormInput";
import Head from "next/head";
export default function Home() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [facebook, setFacebook] = useState("");
  const [website, setWebsite] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!name.trim()) {
      newErrors.name = "Tên là bắt buộc";
    } else if (name.trim().length < 2) {
      newErrors.name = "Tên phải có ít nhất 2 ký tự";
    }

    if (!bio.trim()) {
      newErrors.bio = "Giới thiệu là bắt buộc";
    } else if (bio.trim().length < 10) {
      newErrors.bio = "Giới thiệu phải có ít nhất 10 ký tự";
    }

    if (facebook && !facebook.includes('facebook.com')) {
      newErrors.facebook = "Vui lòng nhập link Facebook hợp lệ";
    }

    if (website && !website.startsWith('http')) {
      newErrors.website = "Vui lòng nhập URL hợp lệ (bắt đầu bằng http:// hoặc https://)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const links = [];
      if (facebook) links.push({ platform: "Facebook", url: facebook });
      if (website) links.push({ platform: "Website", url: website });

      const cardData = {
        name: name.trim(),
        bio: bio.trim(),
        links,
        slug: generateSlug(name),
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, "cards"), cardData);
      
      // Redirect to the new card
      router.push(`/u/${cardData.slug}`);
    } catch (error) {
      console.error("Error creating card:", error);
      alert("Có lỗi xảy ra khi tạo thẻ. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  // Prepare links for preview
  const previewLinks = [];
  if (facebook) previewLinks.push({ platform: "Facebook", url: facebook });
  if (website) previewLinks.push({ platform: "Website", url: website });

  const clearError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return (
    <>
      <Head>
        <title>NZaoCard - Tạo thẻ giới thiệu cá nhân đẹp mắt</title>
        <meta name="description" content="Tạo thẻ giới thiệu cá nhân đẹp mắt để chia sẻ với mọi người. Kết nối, giới thiệu bản thân và tạo ấn tượng đầu tiên tốt đẹp." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white font-sans overflow-x-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-20 h-20 bg-white/10 rounded-full top-[20%] left-[10%] animate-float"></div>
          <div className="absolute w-32 h-32 bg-white/10 rounded-full top-[60%] right-[15%] animate-float delay-200"></div>
          <div className="absolute w-16 h-16 bg-white/10 rounded-full bottom-[20%] left-[20%] animate-float delay-400"></div>
          <div className="absolute w-24 h-24 bg-white/10 rounded-full top-[40%] right-[40%] animate-float delay-600"></div>
        </div>

        <main className="max-w-7xl mx-auto px-4 py-16">
          <header className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent drop-shadow-lg mb-4">
              NZaoCard
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              Tạo thẻ giới thiệu cá nhân đẹp mắt để chia sẻ với thế giới.
              Kết nối, giới thiệu bản thân và tạo ấn tượng đầu tiên tốt đẹp.
            </p>
          </header>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Form Section */}
            <section className="animate-slide-in-up">
              <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">
                <h2 className="text-gray-800 text-3xl font-bold mb-8 text-center">Tạo Thẻ Của Bạn</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <FormInput
                    label="Họ và Tên"
                    value={name}
                    onChange={setName}
                    placeholder="Nhập họ và tên của bạn"
                    required
                    error={errors.name}
                    onErrorClear={() => clearError('name')}
                  />

                  <FormInput
                    label="Giới thiệu"
                    value={bio}
                    onChange={setBio}
                    placeholder="Hãy kể về bản thân bạn..."
                    type="textarea"
                    required
                    error={errors.bio}
                    onErrorClear={() => clearError('bio')}
                  />

                  <FormInput
                    label="Link Facebook"
                    value={facebook}
                    onChange={setFacebook}
                    placeholder="https://facebook.com/yourprofile"
                    type="url"
                    error={errors.facebook}
                    onErrorClear={() => clearError('facebook')}
                  />

                  <FormInput
                    label="Website / Portfolio"
                    value={website}
                    onChange={setWebsite}
                    placeholder="https://yourwebsite.com"
                    type="url"
                    error={errors.website}
                    onErrorClear={() => clearError('website')}
                  />

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 focus-ring ${
                      isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 hover:shadow-xl'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Đang tạo thẻ...
                      </div>
                    ) : (
                      'Tạo Thẻ Của Tôi'
                    )}
                  </button>
                </form>
              </div>
            </section>

            {/* Preview Section */}
            <section className="animate-slide-in-up" style={{ animationDelay: '200ms' }}>
              <div className="sticky top-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Xem Trước</h3>
                <CardPreview
                  name={name}
                  bio={bio}
                  links={previewLinks}
                  isPreview={true}
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
