const http = require('http');

// Step 1: Login to get token
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

  console.log('2. Creating realistic product...');
  const product = {
    sku: "SDY-MAG-TILES-100",
    slug: "magna-tiles-100-piece-magnetic-building-set",
    name: "Magna-Tiles 100-Piece Clear Colors Magnetic Building Set",
    nameEn: "Magna-Tiles 100-Piece Clear Colors Magnetic Building Set",
    nameBn: "\u09AE\u09CD\u09AF\u09BE\u0997\u09A8\u09BE-\u099F\u09BE\u0987\u09B2\u09B8 \u09E7\u09E6\u09E6-\u09AA\u09BF\u09B8 \u0995\u09CD\u09B2\u09BF\u09AF\u09BC\u09BE\u09B0 \u0995\u09BE\u09B2\u09BE\u09B0 \u09AE\u09CD\u09AF\u09BE\u0997\u09A8\u09C7\u099F\u09BF\u0995 \u09AC\u09BF\u09B2\u09CD\u09A1\u09BF\u0982 \u09B8\u09C7\u099F",
    description: "The ultimate STEM educational building toy for kids aged 3+.",
    descriptionEn: "The ultimate STEM educational building toy for kids aged 3+. Build castles, towers, and 3D structures with 100 colorful magnetic tiles. BPA-free, non-toxic ABS plastic.",
    descriptionBn: "\u09E9+ \u09AC\u099B\u09B0 \u09AC\u09AF\u09BC\u09B8\u09C0 \u09B6\u09BF\u09B6\u09C1\u09A6\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09B8\u09C7\u09B0\u09BE STEM \u09B6\u09BF\u0995\u09CD\u09B7\u09BE\u09AE\u09C2\u09B2\u0995 \u09AC\u09BF\u09B2\u09CD\u09A1\u09BF\u0982 \u0996\u09C7\u09B2\u09A8\u09BE\u0964",
    brandEn: "Magna-Tiles",
    brandBn: "\u09AE\u09CD\u09AF\u09BE\u0997\u09A8\u09BE-\u099F\u09BE\u0987\u09B2\u09B8",
    price: 2600,
    originalPrice: 3500,
    discount: 25,
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600",
    images: [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600",
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=600",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600"
    ],
    status: "active",
    isFeatured: true,
    isPublished: true,
    bestseller: true,
    new: true,
    avgRating: 4.8,
    rating: 4.8,
    reviews: 1284,
    reviewCount: 1284,
    totalSold: 3450,
    viewCount: 12500,
    ageMonthsMin: 36,
    ageMonthsMax: 144,
    ageRange: "3-12 Years",
    safetyScore: 9,
    tags: ["STEM", "Educational", "Magnetic", "Building", "Creative"],
    features: ["\u09E7\u09E6\u09E6 \u09AA\u09BF\u09B8 \u09AE\u09CD\u09AF\u09BE\u0997\u09A8\u09C7\u099F\u09BF\u0995 \u099F\u09BE\u0987\u09B2\u09B8", "BPA-free ABS \u09AA\u09CD\u09B2\u09BE\u09B8\u09CD\u099F\u09BF\u0995", "\u0989\u099C\u09CD\u099C\u09CD\u09AC\u09B2 \u0995\u09CD\u09B2\u09BF\u09AF\u09BC\u09BE\u09B0 \u0995\u09BE\u09B2\u09BE\u09B0\u09B8"],
    specifications: { material: "ABS Plastic + Steel Rivets", dimensions: "35x30x10 cm", weight: "2.5 kg" },
    variants: [
      { sku: "SDY-MAG-100-CLR", nameEn: "100-Piece Clear Colors", nameBn: "\u09E7\u09E6\u09E6-\u09AA\u09BF\u09B8 \u0995\u09CD\u09B2\u09BF\u09AF\u09BC\u09BE\u09B0", price: 2600, originalPrice: 3500, stock: 45, options: { color: "Clear Multi" }, colorName: "Clear Multi", colorHex: "#7C3AED", isDefault: true },
      { sku: "SDY-MAG-100-FRZ", nameEn: "100-Piece Frozen Colors", nameBn: "\u09E7\u09E6\u09E6-\u09AA\u09BF\u09B8 \u09AB\u09CD\u09B0\u09CB\u099C\u09C7\u09A8", price: 2800, originalPrice: 3700, stock: 22, options: { color: "Ice Blue" }, colorName: "Ice Blue", colorHex: "#38BDF8", isDefault: false }
    ],
    playPersonality: {
      labelEn: "Master Builder", labelBn: "\u09AE\u09BE\u09B8\u09CD\u099F\u09BE\u09B0 \u09AC\u09BF\u09B2\u09CD\u09A1\u09BE\u09B0",
      descEn: "Perfect for children who love logic puzzles and creative 3D design.",
      descBn: "\u09B2\u099C\u09BF\u0995 \u09AA\u09BE\u099C\u09B2 \u098F\u09AC\u0982 \u0995\u09CD\u09B0\u09BF\u09AF\u09BC\u09C7\u099F\u09BF\u09AD \u09A1\u09BF\u099C\u09BE\u0987\u09A8\u09C7 \u0986\u0997\u09CD\u09B0\u09B9\u09C0 \u09B6\u09BF\u09B6\u09C1\u09A6\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09B8\u09C7\u09B0\u09BE\u0964"
    },
    benefits: [
      { icon: "brain", titleEn: "Cognitive Growth", titleBn: "\u09AC\u09C1\u09A6\u09CD\u09A7\u09BF\u09AC\u09C3\u09A4\u09CD\u09A4\u09BF\u0995 \u09AC\u09BF\u0995\u09BE\u09B6", descEn: "Develops spatial reasoning and problem-solving.", descBn: "\u09B8\u09CD\u09A5\u09BE\u09A8\u09BF\u0995 \u09AF\u09C1\u0995\u09CD\u09A4\u09BF \u0993 \u09B8\u09AE\u09B8\u09CD\u09AF\u09BE \u09B8\u09AE\u09BE\u09A7\u09BE\u09A8\u09C7\u09B0 \u09A6\u0995\u09CD\u09B7\u09A4\u09BE \u09AC\u09BF\u0995\u09B6\u09BF\u09A4 \u09B9\u09AF\u09BC\u0964" },
      { icon: "sparkles", titleEn: "Creativity Boost", titleBn: "\u09B8\u09C3\u099C\u09A8\u09B6\u09C0\u09B2\u09A4\u09BE \u09AC\u09C3\u09A6\u09CD\u09A7\u09BF", descEn: "Unlimited 3D model creation boosts imagination.", descBn: "\u0985\u0997\u09A3\u09BF\u09A4 \u09A5\u09CD\u09B0\u09BF\u09A1\u09BF \u09AE\u09A1\u09C7\u09B2 \u09A4\u09C8\u09B0\u09BF\u09B0 \u09AE\u09BE\u09A7\u09CD\u09AF\u09AE\u09C7 \u0995\u09B2\u09CD\u09AA\u09A8\u09BE\u09B6\u0995\u09CD\u09A4\u09BF \u09AC\u09C3\u09A6\u09CD\u09A7\u09BF \u09AA\u09BE\u09AF\u09BC\u0964" },
      { icon: "shield", titleEn: "Motor Skills", titleBn: "\u09AE\u09CB\u099F\u09B0 \u09B8\u09CD\u0995\u09BF\u09B2 \u0989\u09A8\u09CD\u09A8\u09AF\u09BC\u09A8", descEn: "Improves fine motor control and hand-eye coordination.", descBn: "\u09B8\u09C2\u0995\u09CD\u09B7\u09CD\u09AE \u09AE\u09CB\u099F\u09B0 \u09A8\u09BF\u09AF\u09BC\u09A8\u09CD\u09A4\u09CD\u09B0\u09A3 \u0989\u09A8\u09CD\u09A8\u09A4 \u0995\u09B0\u09C7\u0964" }
    ],
    packageItems: [
      { count: "\u09EB\u09E6x", textEn: "Small Square Tiles", textBn: "\u099B\u09CB\u099F \u09B8\u09CD\u0995\u09AF\u09BC\u09BE\u09B0 \u099F\u09BE\u0987\u09B2\u09B8", detailsEn: "Standard magnetic square tiles", detailsBn: "\u09B8\u09CD\u099F\u09CD\u09AF\u09BE\u09A8\u09CD\u09A1\u09BE\u09B0\u09CD\u09A1 \u09AE\u09CD\u09AF\u09BE\u0997\u09A8\u09C7\u099F\u09BF\u0995 \u09B8\u09CD\u0995\u09AF\u09BC\u09BE\u09B0 \u099F\u09BE\u0987\u09B2\u09B8" },
      { count: "\u09E8\u09E6x", textEn: "Equilateral Triangles", textBn: "\u09B8\u09AE\u09AC\u09BE\u09B9\u09C1 \u09A4\u09CD\u09B0\u09BF\u09AD\u09C1\u099C", detailsEn: "For pyramid and dome structures", detailsBn: "\u09AA\u09BF\u09B0\u09BE\u09AE\u09BF\u09A1 \u098F\u09AC\u0982 \u0997\u09AE\u09CD\u09AC\u09C1\u099C \u0995\u09BE\u09A0\u09BE\u09AE\u09CB\u09B0 \u099C\u09A8\u09CD\u09AF" },
      { count: "\u09E7\u09EB x", textEn: "Isosceles Triangles", textBn: "\u09B8\u09AE\u09A6\u09CD\u09AC\u09BF\u09AC\u09BE\u09B9\u09C1 \u09A4\u09CD\u09B0\u09BF\u09AD\u09C1\u099C", detailsEn: "Versatile triangle shapes for roofs", detailsBn: "\u099B\u09BE\u09A6 \u09A1\u09BF\u099C\u09BE\u0987\u09A8\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09AC\u09B9\u09C1\u09AE\u09C1\u0996\u09C0 \u09A4\u09CD\u09B0\u09BF\u09AD\u09C1\u099C" },
      { count: "\u09E7\u09EB x", textEn: "Large Square Tiles", textBn: "\u09AC\u09A1\u09BC \u09B8\u09CD\u0995\u09AF\u09BC\u09BE\u09B0 \u099F\u09BE\u0987\u09B2\u09B8", detailsEn: "Larger tiles for walls and floors", detailsBn: "\u09A6\u09C7\u09AF\u09BC\u09BE\u09B2 \u098F\u09AC\u0982 \u09AE\u09C7\u099D\u09C7 \u09A4\u09C8\u09B0\u09BF\u09B0 \u099C\u09A8\u09CD\u09AF \u09AC\u09A1\u09BC \u099F\u09BE\u0987\u09B2\u09B8" }
    ],
    directionsEn: "1. Sort tiles by shape.\n2. Start with a flat base.\n3. Add triangles for roofs.\n4. Experiment with 3D structures.",
    directionsBn: "\u09E7. \u0986\u0995\u09BE\u09B0 \u0985\u09A8\u09C1\u09AF\u09BE\u09AF\u09BC\u09C0 \u099F\u09BE\u0987\u09B2\u09B8 \u09B8\u09BE\u099C\u09BE\u09A8\u0964\n\u09E8. \u09B8\u09CD\u0995\u09AF\u09BC\u09BE\u09B0 \u099F\u09BE\u0987\u09B2\u09B8 \u09A6\u09BF\u09AF\u09BC\u09C7 \u09AD\u09BF\u09A4\u09CD\u09A4\u09BF \u09A4\u09C8\u09B0\u09BF \u0995\u09B0\u09C1\u09A8\u0964\n\u09E9. \u099B\u09BE\u09A6\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09A4\u09CD\u09B0\u09BF\u09AD\u09C1\u099C \u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8\u0964",
    videos: [
      { youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", titleBn: "\u09AC\u09BE\u099A\u09CD\u099A\u09BE\u09A6\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09B8\u09C7\u09B0\u09BE \u098F\u09A1\u09C1\u0995\u09C7\u09B6\u09A8\u09BE\u09B2 \u0996\u09C7\u09B2\u09A8\u09BE", channelName: "Sodayon Toys", duration: "\u09E7\u09E6:\u09E7\u09EB" },
      { youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", titleBn: "\u09AE\u09CD\u09AF\u09BE\u0997\u09A8\u09BE-\u099F\u09BE\u0987\u09B2\u09B8 \u0986\u09A8\u09AC\u0995\u09CD\u09B8\u09BF\u0982 \u098F\u09AC\u0982 \u09B0\u09BF\u09AD\u09BF\u0989", channelName: "Sodayon Toys", duration: "\u09EE:\u09EA\u09EB" },
      { youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", titleBn: "\u09AC\u09CD\u09B0\u09C7\u09A8 \u09A1\u09C7\u09AD\u09C7\u09B2\u09AA\u09AE\u09C7\u09A8\u09CD\u099F\u09C7 \u09AE\u09CD\u09AF\u09BE\u0997\u09A8\u09C7\u099F\u09BF\u0995 \u099F\u09BE\u0987\u09B2\u09B8 \u0995\u09C7\u09A8 \u099C\u09B0\u09C1\u09B0\u09BF?", channelName: "Sodayon Toys", duration: "\u09E7\u09E8:\u09E9\u09E6" }
    ]
  };

  const result = await postAuth('/products', product, token);
  if (result.data) {
    console.log('SUCCESS! Product created:');
    console.log('   ID:', result.data.id || result.data._id);
    console.log('   Name:', result.data.nameEn);
    console.log('   Slug:', result.data.slug);
    console.log('   Price:', result.data.price, 'BDT');
    console.log('');
    console.log('   View: http://localhost:3000/shop/products/' + (result.data.id || result.data._id));
    console.log('   API:  http://localhost:5000/api/products/' + (result.data.id || result.data._id));
  } else {
    console.error('FAILED:', JSON.stringify(result, null, 2));
  }
}

main().catch(console.error);
