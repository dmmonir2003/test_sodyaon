import type { Metadata } from "next";
import BlogPostClient from "@/components/blog/BlogPostClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sodayon.com";

const getMockPost = (id: string) => ({
  id,
  title: "৭ বছর বয়সীদের জন্য সঠিক স্টেম খেলনা কীভাবে বেছে নেবেন",
  excerpt: "কোডিং রোবট এবং সার্কিট্রি কিটগুলির জগতটি বেশ বড়। আপনার পরবর্তী খেলনা কিনতে আমাদের বিশেষজ্ঞরা কীভাবে সাহায্য করতে পারে তা দেখুন।",
  category: "খেলনা গাইড",
  author: "মার্ক ডেভিস",
  authorRole: "চাইল্ড ডেভেলপমেন্ট স্পেশালিস্ট",
  date: "অক্টোবর ১২, ২০২৬",
  readTime: "৬ মিনিট",
  image: "bg-[url('https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')]", 
  content: `
    <p class="lead">৭ বছর বয়সী শিশুদের জন্য একটি পারফেক্ট শিক্ষামূলক খেলনা খুঁজে পাওয়া বেশ চ্যালেঞ্জিং একটি কাজ। এই বয়সে, শিশুরা দ্রুত মেধা বিকাশের মধ্য দিয়ে যায় এবং পৃথিবী কীভাবে কাজ করে তা নিয়ে প্রাকৃতিকভাবে কৌতূহলী হয়। তারা সাধারণ বিল্ডিং ব্লক থেকে বড় হয়ে উঠেছে, কিন্তু রোবোটিক্স বা আরও কঠিন টেকনোলজির জন্য এখনও পুরোপুরি প্রস্তুত নয়।</p>
    
    <h2 id="golden-age">আবিষ্কারের সুবর্ণ যুগ</h2>
    <p>সাত বছর বয়সকে প্রায়ই স্টেম (সায়েন্স, টেকনোলজি, ইঞ্জিনিয়ারিং এবং ম্যাথমেটিক্স) শেখার জন্য "সুবর্ণ যুগ" বা সেরা সময় বলে মনে করা হয়। তাদের ফাইন মোটর স্কিলস অত্যন্ত উন্নত হয়, তাদের মনোযোগের পরিধি বাড়তে থাকে এবং তারা জটিল ধারণা বুঝতে শুরু করে।</p>
    
    <div class="callout">
      <strong>বিশেষজ্ঞদের টিপস:</strong> সেরা স্টেম খেলনাগুলো দেখতে শেখার ডিভাইসের মতো হয় না; তারা বরং এক্সপেরিমেন্ট বা পরীক্ষা করার আমন্ত্রণ জানায়। এমন খেলনা এড়িয়ে চলুন যা দেখতে স্কুলের হোমওয়ার্কের মতো মনে হয়।
    </div>
    
    <h3 id="key-factors">যে বিষয়গুলো খেয়াল রাখতে হবে</h3>
    <p>যখন আপনি খেলনার একটি বিশাল সংগ্রহ দেখেন, নিজেকে এই তিনটি গুরুত্বপূর্ণ প্রশ্ন জিজ্ঞেস করুন:</p>
    <ul>
      <li><strong>ওপেন-এন্ডেড পটেনশিয়াল:</strong> খেলনাটি কি শুধু একটি নির্দিষ্ট কাজই করে, নাকি শিশু এটি ব্যবহারের নতুন উপায় আবিষ্কার করতে পারে?</li>
      <li><strong>কঠিন কিন্তু মজার:</strong> খেলনাটির ডিফিকাল্টি লেভেল বা কাঠিন্য এমন হতে হবে যে তারা যেন এটা সমাধান করার চ্যালেঞ্জে মজা পায়।</li>
      <li><strong>স্ক্রিন-ফ্রি কোর:</strong> যদিও কোডিং অ্যাপগুলো দুর্দান্ত, কিন্তু এই পর্যায়ে ফিজিক্যাল এবং ট্যাকটাইল ম্যানিপুলেশন (হাতে নেড়েচেড়ে দেখা) অত্যন্ত গুরুত্বপূর্ণ।</li>
    </ul>

    <h2 id="our-recommendations">আমাদের সেরা সুপারিশসমূহ</h2>
    <p>একটি স্টেম উপহার নির্বাচন করার সময়, আমরা প্রাথমিক পর্যায়ের সার্কিট্রি বা জ্যামিতিক বিল্ডিং সিস্টেমগুলোর উপর ফোকাস করার পরামর্শ দিই। এই ধারণাগুলো কল্পনাপ্রবণ খেলা এবং কাঠামোগত বৈজ্ঞানিক পদ্ধতির মধ্যে ব্যবধান কমিয়ে আনে।</p>
    <p>মনে রাখবেন, লক্ষ্য তাদের জোর করে ১০ বছর বয়সেই ইঞ্জিনিয়ার বানানো নয়। লক্ষ্য হলো তাদের শেখানো যে, কোনো জিনিস কীভাবে কাজ করে তা বের করার প্রক্রিয়াটি অবিশ্বাস্য রকমের আনন্দদায়ক বা মজার।</p>
  `
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getMockPost(id);
  const title = `${post.title} | সদায়ন ব্লগ`;
  const description = post.excerpt;
  const canonicalUrl = `${SITE_URL}/blog/${id}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "সদায়ন",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = getMockPost(id);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorRole,
    },
    "publisher": {
      "@type": "Organization",
      "name": "সদায়ন",
      "url": SITE_URL,
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${id}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <BlogPostClient post={post} />
    </>
  );
}
