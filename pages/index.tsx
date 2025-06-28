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

      <div className="min-h-screen dark-gradient-bg text-white font-sans overflow-x-hidden relative">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-32 h-32 bg-white/5 rounded-full top-[10%] left-[10%] animate-float"></div>
          <div className="absolute w-24 h-24 bg-white/5 rounded-full top-[60%] right-[20%] animate-float delay-300"></div>
          <div className="absolute w-16 h-16 bg-white/5 rounded-full bottom-[20%] left-[30%] animate-float delay-600"></div>
          <div className="absolute w-20 h-20 bg-white/5 rounded-full top-[30%] right-[60%] animate-float delay-900"></div>
        </div>

        <main className="container mx-auto px-4 py-8">
          <header className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl font-bold gold-gradient-text drop-shadow-lg mb-4">
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
              <div className="glass-card rounded-3xl p-8 shadow-2xl">
                <h2 className="text-gray-100 text-3xl font-bold mb-8 text-center">Tạo Thẻ Của Bạn</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <FormInput
                    label="Tên của bạn"
                    value={name}
                    onChange={setName}
                    error={errors.name}
                    onErrorClear={() => clearError('name')}
                    placeholder="Nhập tên của bạn..."
                    required
                  />

                  <FormInput
                    label="Giới thiệu"
                    value={bio}
                    onChange={setBio}
                    error={errors.bio}
                    onErrorClear={() => clearError('bio')}
                    placeholder="Giới thiệu ngắn gọn về bản thân..."
                    type="textarea"
                    required
                  />

                  <FormInput
                    label="Facebook (tùy chọn)"
                    value={facebook}
                    onChange={setFacebook}
                    error={errors.facebook}
                    onErrorClear={() => clearError('facebook')}
                    placeholder="https://facebook.com/username"
                    type="url"
                  />

                  <FormInput
                    label="Website (tùy chọn)"
                    value={website}
                    onChange={setWebsite}
                    error={errors.website}
                    onErrorClear={() => clearError('website')}
                    placeholder="https://yourwebsite.com"
                    type="url"
                  />

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 focus-ring ${
                      isLoading
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 hover:shadow-xl text-gray-900'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mr-3"></div>
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
                <h3 className="text-2xl font-bold mb-6 text-center text-yellow-400">Xem Trước</h3>
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
