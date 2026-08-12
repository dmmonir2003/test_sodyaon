const http = require('http');

function post(path, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const req = http.request({
      hostname: 'localhost', port: 5000,
      path: '/api' + path, method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch(e) { reject(d); } });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function postAuth(path, data, token) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const req = http.request({
      hostname: 'localhost', port: 5000,
      path: '/api' + path, method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'Authorization': 'Bearer ' + token
      }
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch(e) { reject(d); } });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('1. Logging in as admin...');
  const login = await post('/auth/login', { email: 'admin@sodayon.com', password: 'admin123' });
  if (!login.data?.token) { console.error('Login failed:', login); return; }
  const token = login.data.token;
  console.log('   Token obtained!');

  console.log('2. Creating LEGO Classic Medium Creative Brick Box...');
  
  const product = {
    sku: "SDY-LEGO-CLASSIC-10698",
    slug: "lego-classic-medium-creative-brick-box-10698",
    name: "LEGO Classic Medium Creative Brick Box 10698",
    nameEn: "LEGO Classic Medium Creative Brick Box 10698",
    nameBn: "লেগো ক্লাসিক মিডিয়াম ক্রিয়েটিভ ব্রিক বক্স ১০৬৯৮",
    description: "Inspire open-ended building play with 790 colorful LEGO bricks in 33 different colors.",
    descriptionEn: "Inspire open-ended building play with 790 colorful LEGO bricks in 33 different colors. Includes green baseplates, wheels, doors, windows, and eyes to spark creative imagination. Perfect storage container for organization.",
    descriptionBn: "৩৩টি ভিন্ন রঙের ৭৯০টি রঙিন লেগো ব্রিকস দিয়ে আপনার শিশুর কল্পনাপ্রসূত চিন্তাভাবনার বিকাশ ঘটান। এতে রয়েছে বেসপ্লেট, চাকা, দরজা এবং জানালার মতো বিশেষ পিস এবং সুন্দর স্টোরেজ বক্স।",
    brandEn: "LEGO",
    brandBn: "লেগো",
    price: 4500,
    originalPrice: 5000,
    discount: 10,
    image: "https://images.unsplash.com/photo-1585366119957-e57375201773?w=600",
    images: [
      "https://images.unsplash.com/photo-1585366119957-e57375201773?w=600",
      "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?w=600",
      "https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=600"
    ],
    status: "active",
    isFeatured: true,
    isPublished: true,
    bestseller: true,
    new: true,
    avgRating: 4.9,
    rating: 4.9,
    reviews: 580,
    reviewCount: 580,
    totalSold: 1200,
    viewCount: 4200,
    ageMonthsMin: 48,
    ageMonthsMax: 1188, // 4 to 99 years
    ageRange: "4-99 Years",
    safetyScore: 10,
    tags: ["STEM", "Lego", "Blocks", "Building", "Creative"],
    features: [
      "৭৯০টি অরিজিনাল লেগো ব্রিকস",
      "৩৩টি ভিন্ন আকর্ষণীয় কালারস",
      "সবুজ বেসপ্লেট, চাকা ও অন্যান্য বিশেষ পিস",
      "টেকসই ও চমৎকার স্টোরেজ কন্টেইনার"
    ],
    specifications: { 
      material: "ABS Plastic (Non-toxic & Safe)", 
      dimensions: "37x26x18 cm", 
      weight: "1.6 kg" 
    },
    variants: [
      { 
        sku: "SDY-LEGO-CLASSIC-STD", 
        nameEn: "Standard 790-Piece Box", 
        nameBn: "স্ট্যান্ডার্ড ৭৯০ পিস বক্স", 
        price: 4500, 
        originalPrice: 5000, 
        stock: 50, 
        options: { color: "Multicolor" }, 
        colorName: "Multicolor", 
        colorHex: "#EF4444", 
        isDefault: true 
      }
    ],
    playPersonality: {
      labelEn: "Master Builder", 
      labelBn: "মাস্টার বিল্ডার",
      descEn: "Perfect for children who love logic, spatial reasoning, and creative architectural layouts.",
      descBn: "লজিক পাজল, স্থানিক যুক্তি এবং সৃজনশীল আর্কিটেকচারাল ডিজাইন ভালোবাসে এমন শিশুদের জন্য সেরা উপহার।"
    },
    benefits: [
      { 
        icon: "brain", 
        titleEn: "Fine Motor Control", 
        titleBn: "সূক্ষ্ম মোটর স্কিল", 
        descEn: "Builds finger strength and hand-eye coordination.", 
        descBn: "আঙুলের শক্তি বৃদ্ধি করে এবং চোখের সাথে হাতের চমৎকার সমন্বয় ঘটায়।" 
      },
      { 
        icon: "sparkles", 
        titleEn: "Three Dimensional Logic", 
        titleBn: "ত্রিমাত্রিক যুক্তি", 
        descEn: "Improves understanding of structures, gravity, and shape matches.", 
        descBn: "কাঠামো, অভিকর্ষ এবং আকার ম্যাচিংয়ের ধারণাকে শিশুর কাছে সহজ করে তোলে।" 
      }
    ],
    packageItems: [
      { count: "৭৯০x", textEn: "Colorful Lego Bricks", textBn: "রঙিন লেগো ব্রিকস", detailsEn: "High-quality ABS plastic bricks", detailsBn: "উচ্চমানের এবিএস প্লাস্টিক ব্রিকস" },
      { count: "১x", textEn: "Green Baseplate (16x16)", textBn: "সবুজ বেসপ্লেট (১৬x১৬)", detailsEn: "Baseplate for building foundations", detailsBn: "বিল্ডিংয়ের ভিত্তি তৈরি করার জন্য বেসপ্লেট" },
      { count: "১x", textEn: "Organizer Box Container", textBn: "অর্গানাইজার বক্স কন্টেইনার", detailsEn: "Lego brick shaped plastic storage container", detailsBn: "লেগো ব্রিক আকারের স্টোরেজ কন্টেইনার" }
    ],
    directionsEn: "1. Open the storage container.\n2. Use the green baseplate as your layout base.\n3. Snap bricks together to create buildings, vehicles, or animals.",
    directionsBn: "১. স্টোরেজ কন্টেইনারটি খুলুন।\n২. লেগো বেসপ্লেটটি নিচে রাখুন।\n৩. ব্রিকসগুলো একটির ওপর আরেকটি সেট করে বাড়ি, গাড়ি বা যেকোনো নকশা তৈরি করুন।",
    videos: [
      { 
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
        titleBn: "লেগো ক্লাসিক ১০৬৯৮ দিয়ে কীভাবে খেলবেন এবং নতুন সব ডিজাইন বানাবেন", 
        channelName: "Sodayon Lego Guides", 
        duration: "১২:১৫" 
      }
    ]
  };

  const result = await postAuth('/products', product, token);
  if (result.data) {
    console.log('SUCCESS! Product created:');
    console.log('   ID:', result.data.id || result.data._id);
    console.log('   NameEn:', result.data.nameEn);
    console.log('   NameBn:', result.data.nameBn);
    console.log('   Slug:', result.data.slug);
    console.log('   Price:', result.data.price, 'BDT');
    console.log('');
    console.log('   Live details page link: http://localhost:3000/shop/products/' + (result.data.id || result.data._id));
  } else {
    console.error('FAILED:', JSON.stringify(result, null, 2));
  }
}

main().catch(console.error);
