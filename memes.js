// Curated Database of Comedy Memes (Enriched Massive Version)
const memesData = [
  {
    id: "hinglish_1",
    title: "Papa and the AC Remote control",
    category: "relatable",
    tags: ["desi-life", "relatable", "household"],
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
    caption: "Me: *Sets AC to 18°C* | Papa: 'AC chalu hote hi shimla banana hai? Band karo ise, bijli ka bill kya tumhare pitaji bharenge?' | Me: 'Lekin papa aap hi toh...'",
    likes: 4890,
    laughs: 5600,
    facepalms: 1200
  },
  {
    id: "hinglish_2",
    title: "Sharma Ji Ka Beta vs My Grades",
    category: "relatable",
    tags: ["exams", "parents", "sharma-ji"],
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
    caption: "Me: 'Mummy mere 95% aaye hain!' | Mummy: 'Sharma ji ke bete ke 98% aaye hain, usse kuch seekho!' | Me: 'Mummy, sharma ji ka beta single hai mummy, main seekh lu?' 🤷‍♂️",
    likes: 3890,
    laughs: 4900,
    facepalms: 950
  },
  {
    id: "hinglish_3",
    title: "Local Kirana Shop rules",
    category: "desi",
    tags: ["kirana", "udhaar", "daily-life"],
    imageUrl: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80",
    caption: "Shopkeeper Board: 'Aaj Nagad, Kal Udhaar!' | Me (Next Day): 'Uncle aaj toh kal ho gaya, ab toh udhaar de do!' | Shopkeeper: 'Beta, kal kabhi nahi aata!' 😭",
    likes: 2900,
    laughs: 4100,
    facepalms: 320
  },
  {
    id: "hinglish_4",
    title: "Choti si bug hai, solve karke jana",
    category: "tech",
    tags: ["developer-life", "office", "relatable"],
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    caption: "Manager at 5:50 PM: 'Ek choti si bug hai, bas print check karke jao.' | Code: *1500 errors generated in main branch*. | Me: 'Bhagwan mujhe utha le... ya fir is manager ko!' 🖥️💀",
    likes: 3420,
    laughs: 4980,
    facepalms: 890
  },
  {
    id: "hinglish_5",
    title: "BJP vs Congress election speech logic",
    category: "political",
    tags: ["elections", "promises", "sarcasm"],
    imageUrl: "https://images.unsplash.com/photo-1597030793671-8728d39e3b43?auto=format&fit=crop&w=600&q=80",
    caption: "Netaji: 'Hum har ghar me AC aur heater dono lagwayenge!' | Janta: 'Lekin humare gaon me toh bijli hi nahi hai!' | Netaji: 'Toh dono band hi rahenge, bill ki tension hi nahi!' 🗳️🤡",
    likes: 3120,
    laughs: 4500,
    facepalms: 920
  },
  {
    id: "hinglish_6",
    title: "Mummy cleaning the room",
    category: "relatable",
    tags: ["mummy", "desi-moments", "home"],
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
    caption: "Mummy: 'Yeh kamra hai ya kabadi ki dukaan? Saari cheezein bikhri padi hain!' | Me: 'Mummy, aesthetic minimal design bolte hain ise.' | Mummy: *picks up steel scale* 📏🏃‍♂️",
    likes: 3670,
    laughs: 5120,
    facepalms: 890
  },
  {
    id: "hinglish_7",
    title: "Auto-rickshaw attitude check",
    category: "desi",
    tags: ["auto", "travel", "mumbai-delhi"],
    imageUrl: "https://images.unsplash.com/photo-1566908829550-e6551b00979b?auto=format&fit=crop&w=600&q=80",
    caption: "Me: 'Bhaiya Saket chaloge?' | Rickshawala: *looks at me, looks at the sky, sighs, and drives away without saying a word* | Absolute rejection level 100! 🛺💔",
    likes: 2780,
    laughs: 3900,
    facepalms: 610
  },
  {
    id: "hinglish_8",
    title: "Goa Trip group plan reality",
    category: "relatable",
    tags: ["goa-trip", "friends", "planning"],
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    caption: "Group: 'Iss baar toh Goa pakka hai, tickets book karte hain!' | 10 minutes later: One friend goes silent, second says 'mummy ne mana kiya', third has 'budget problem' 🏖️❌",
    likes: 4120,
    laughs: 5300,
    facepalms: 1890
  },
  {
    id: "hinglish_9",
    title: "Mummy bargaining skills",
    category: "desi",
    tags: ["mummy", "shopping", "relatable"],
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    caption: "Shopkeeper: '1000 ka item hai fixed price.' | Mummy: '200 me dena hai toh do, nahi toh aage ja rahe hain.' | Shopkeeper: 'Chalo behanji aap na 250 de do!' | Me: 🤯",
    likes: 3890,
    laughs: 4780,
    facepalms: 120
  },
  {
    id: "hinglish_10",
    title: "Relative asking 'Aage kya socha hai?'",
    category: "relatable",
    tags: ["relatives", "career", "funny-reply"],
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
    caption: "Relative: 'Engineering ke baad aage kya socha hai beta?' | Me (In my mind): 'Yahi ki aap apne ghar kab ja rahe ho!' 🚶‍♂️✈️",
    likes: 3100,
    laughs: 4900,
    facepalms: 812
  },
  {
    id: "tech_3",
    title: "StackOverflow is down",
    category: "tech",
    tags: ["developer", "panic", "critical"],
    imageUrl: "https://images.unsplash.com/photo-1597839219216-a773cb2473e4?auto=format&fit=crop&w=600&q=80",
    caption: "Developers worldwide: *starts forgetting how to declare variables* | Managers: 'Just write it from memory!' | Developers: 👁️👄👁️",
    likes: 2430,
    laughs: 3100,
    facepalms: 450
  },
  {
    id: "tech_4",
    title: "CSS alignment frustration",
    category: "tech",
    tags: ["css", "frontend", "layout"],
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
    caption: "Me: *adds margin-left: 1px* | Website layout: *explodes into another dimension and flips upside down* 🌌",
    likes: 1890,
    laughs: 2900,
    facepalms: 812
  },
  {
    id: "tech_5",
    title: "Writing code vs Refactoring code",
    category: "tech",
    tags: ["refactor", "bug", "developer"],
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80",
    caption: "Me: 'Let me clean up this spaghetti code.' | 2 minutes later: *App crashes, database deleted, monitor starts emitting heat* 🍝🔥",
    likes: 2890,
    laughs: 3800,
    facepalms: 910
  },
  {
    id: "political_1",
    title: "BJP vs Congress exit poll claims",
    category: "political",
    tags: ["bjp", "congress", "elections", "exit-polls"],
    imageUrl: "https://api.imgflip.com/s/meme/Spider-Man-Pointing-At-Spider-Man.jpg",
    caption: "BJP: 'Hum 400+ seats jeet rahe hain!' | Congress: 'Nahi, hum 400+ seats jeet rahe hain!' | Total Seats in Parliament: 543 🤷‍♂️",
    likes: 3120,
    laughs: 4500,
    facepalms: 920
  },
  {
    id: "political_4",
    title: "BJP & Congress IT Cells arguing in Twitter comments",
    category: "political",
    tags: ["it-cell", "twitter", "debates"],
    imageUrl: "https://images.unsplash.com/photo-1603968709808-9961765041a2?auto=format&fit=crop&w=600&q=80",
    caption: "IT Cells: *typing 120 words per minute at 3:00 AM* | The Chaiwala nearby: *counting profits from extra tea they drank to stay awake* 🍵💰",
    likes: 2890,
    laughs: 4120,
    facepalms: 320
  },
  {
    id: "political_5",
    title: "BJP & Congress leaders meeting at a wedding",
    category: "political",
    tags: ["bollywood", "funny-debates", "reality"],
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80",
    caption: "TV Debate: 'Aapne desh ko tabah kar diya!' | Wedding Buffet: 'Bhaiyya, paneer ki sabzi bohot solid bani hai, thodi aur lo!' 🤝🍨",
    likes: 3400,
    laughs: 5120,
    facepalms: 194
  },
  {
    id: "political_6",
    title: "Indian news channels covering election day",
    category: "political",
    tags: ["news", "media", "dramatic"],
    imageUrl: "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=600&q=80",
    caption: "Politician: *coughs slightly* | News Channel: 'COUGH WAR! Did he cough towards BJP or Congress? Is this a secret signal for alliance?' 🚨📢",
    likes: 2780,
    laughs: 4890,
    facepalms: 812
  },
  {
    id: "wholesome_1",
    title: "The dog when you come back after 2 minutes",
    category: "wholesome",
    tags: ["dogs", "cute", "wholesome"],
    imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80",
    caption: "'OH MY GOD YOU WERE GONE FOR A HUNDRED YEARS I MISSED YOU SO MUCH!' 🐶❤️",
    likes: 4200,
    laughs: 850,
    facepalms: 5
  }
];

// Meme Templates for Generator
const memeTemplates = [
  {
    id: "spiderman",
    name: "Spiderman Pointing (BJP vs Congress)",
    url: "https://api.imgflip.com/s/meme/Spider-Man-Pointing-At-Spider-Man.jpg",
    defaultText: ["BJP IT Cell", "Congress IT Cell"]
  },
  {
    id: "drake",
    name: "Drake Hotline Bling",
    url: "https://api.imgflip.com/s/meme/Drake-Hotline-Bling.jpg",
    defaultText: ["Solving national issues", "Debating over tea cup colors"]
  },
  {
    id: "distracted",
    name: "Distracted Boyfriend",
    url: "https://api.imgflip.com/s/meme/Distracted-Boyfriend.jpg",
    defaultText: ["Alliance changes", "Politician", "Original ideology"]
  },
  {
    id: "two_buttons",
    name: "Two Buttons",
    url: "https://api.imgflip.com/s/meme/Two-Buttons.jpg",
    defaultText: ["Say 'Mitron'", "Say 'Aloo Se Sona'", "Speech writer"]
  },
  {
    id: "exit_ramp",
    name: "Left Exit 12 Off Ramp",
    url: "https://api.imgflip.com/s/meme/Left-Exit-12-Off-Ramp.jpg",
    defaultText: ["Ideological consistency", "Switching parties before elections"]
  },
  {
    id: "change_mind",
    name: "Change My Mind",
    url: "https://api.imgflip.com/s/meme/Change-My-Mind.jpg",
    defaultText: ["Elections are just Indian IPL for politics", ""]
  },
  {
    id: "doge",
    name: "Doge voter",
    url: "https://api.imgflip.com/s/meme/Doge.jpg",
    defaultText: ["Much promises", "Very voting"]
  }
];

// Enriched pool of simulated auto-upload memes
const simulatedMemesPool = [
  {
    title: "Chai vs Pizza during elections",
    category: "political",
    tags: ["bjp", "congress", "desi"],
    imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    caption: "BJP: 'Chai pe charcha!' | Congress: 'Pizza pe parinam!' | Public: 'Humko dono chalega!' 🍕🍵",
    creator: "@ChaiPeCharcha"
  },
  {
    title: "Politicians searching for their promises after winning",
    category: "political",
    tags: ["elections", "sarcasm"],
    imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80",
    caption: "Politician: 'Kahan gaya woh file jisme 15 lakh likha tha?' 📁🔍",
    creator: "@VoterHelpless"
  },
  {
    title: "Engineer's wedding planning",
    category: "tech",
    tags: ["relatable", "engineer", "hinglish"],
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
    caption: "Relative: 'Shaadi ki taiyari kaisi chal rahi hai beta?' | Me: 'Requirements gather ho chuki hain, abhi test phase chal raha hai!' 💍⚙️",
    creator: "@CoderGroom"
  },
  {
    title: "WhatsApp message forwarding speed",
    category: "relatable",
    tags: ["whatsapp", "family", "hinglish"],
    imageUrl: "https://images.unsplash.com/photo-1614680376593-902f74fa0d41?auto=format&fit=crop&w=600&q=80",
    caption: "Dadi: *Sends 'Good Morning' rose GIF at 5:00 AM*. | The entire family: *forwards same GIF to 15 different groups by 5:05 AM* 🌹⚡",
    creator: "@ForwardKing"
  },
  {
    title: "Gym Resolutions in January",
    category: "relatable",
    tags: ["gym", "resolutions", "hinglish"],
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    caption: "Me on Jan 1: 'Aaj se body building chalu!' | Me on Jan 3: 'Mummy, aalu ke paranthe me thoda butter zyada lagana please!' 🧈🥔",
    creator: "@DietFails"
  },
  {
    title: "BJP-Congress IT Cell friendship",
    category: "political",
    tags: ["political", "it-cell", "hinglish"],
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
    caption: "IT Cell guys arguing online: 'Desh drohi ho tum!' | Met in person: 'Bhai, tere paas code block ka template hai kya, copy-paste karna hai!' 🤝💻",
    creator: "@ITCellBros"
  },
  {
    title: "Jio high-speed warning message",
    category: "relatable",
    tags: ["jio", "internet", "hinglish"],
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    caption: "'You have used 100% of your daily high speed data.' | Me at 11:30 PM: *watches the loading circle spin in complete darkness* ⏳💀",
    creator: "@DataSufferer"
  },
  {
    title: "Copy-pasting from StackOverflow",
    category: "tech",
    tags: ["stackoverflow", "coding", "hinglish"],
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80",
    caption: "Me: *copies 50 lines of code without reading*. | Code: *works perfectly*. | Me explaining how it works during Scrum call: 'It is a complex algorithmic design based on multi-threading...' 😅🗣️",
    creator: "@CopyPasteKing"
  },
  {
    title: "Netaji's free laptop scheme",
    category: "political",
    tags: ["politics", "laptops", "hinglish"],
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80",
    caption: "Netaji: 'Sabko free high-end laptop milega!' | The laptop: *Has Netaji's massive smiling wallpaper that cannot be changed and 1GB RAM* 💻🤡",
    creator: "@LaptopReceiver"
  },
  {
    title: "Politicians after elections are over",
    category: "political",
    tags: ["politics", "elections", "hinglish"],
    imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80",
    caption: "Voter: 'Netaji, road kab banegi?' | Netaji: 'Kaun ho tum? Kahan se aaye ho? Main kisiko nahi pehchanta!' 😎❌",
    creator: "@ForgottenVoter"
  },
  {
    title: "The local corporator visiting during monsoon",
    category: "political",
    tags: ["rain", "politics", "hinglish"],
    imageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80",
    caption: "Corporator standing in 2 inches of water for photo: 'Hum aapke dukh me saath hain!' | Janta: 'Sir humare ghar me paani ghus gaya hai, photo baad me khichwana!' 🌊📸",
    creator: "@MonsoonSufferer"
  },
  {
    title: "Git Commit messages evolution",
    category: "tech",
    tags: ["git", "developer", "hinglish"],
    imageUrl: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&q=80",
    caption: "Commit 1: 'Initial Commit' | Commit 2: 'Fixed bug' | Commit 3: 'Fixed bug final' | Commit 4: 'Please work bhai' | Commit 5: 'asdasdasd' 💻🤯",
    creator: "@CommitSpammer"
  }
];

window.memesData = memesData;
window.memeTemplates = memeTemplates;
window.simulatedMemesPool = simulatedMemesPool;
