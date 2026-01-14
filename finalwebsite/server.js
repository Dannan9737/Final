const express = require("express");
const server = express();
const path = require("path");
const DB = require("nedb-promises");
const fileUpload = require("express-fileupload");

// 設定資料庫
const CourseDB = DB.create(path.join(__dirname, "Course.db"));
const AboutDB = DB.create(path.join(__dirname, "About.db"));
const FieldDB = DB.create(path.join(__dirname, "Field.db"));
const CareerDB = DB.create(path.join(__dirname, "Career.db"));
const WorkDB = DB.create(path.join(__dirname, "Work.db"));
const ContactDB = DB.create(path.join(__dirname, "Contact.db"));

// 設定 Middleware
server.use(express.static(path.join(__dirname, "public")));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "view"));

server.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    createParentPath: true // 自動建立上傳資料夾
}));

/* -----------------------------------------------------------------
   【資料初始化】 
   這段程式碼會在伺服器啟動時，檢查資料庫有沒有資料。
   如果沒有，就自動塞入你的「學習內容」資料。
----------------------------------------------------------------- */
// async function initData() {
//     const count = await CourseDB.count({});
//     if (count === 0) {
//         const initialCourses = [
//             {
//                 title: "設計思考與創意發想",
//                 text: "多媒體設計強調從問題出發，思考如何透過設計解決需求。透過創意發想與設計流程，將想法轉化為具體內容，使作品不只是好看，而是能清楚傳達想要表達的訊息。",
//                 imgSrc: "images/focus.png",
//                 reverse: false
//             },
//             {
//                 title: "視覺美感與構圖能力",
//                 text: "良好的視覺美感是多媒體設計的重要基礎，包含色彩運用、畫面配置與整體風格掌握。透過構圖與視覺層次的安排，讓畫面看起來更清楚、有重點，也更容易吸引使用者的注意。",
//                 imgSrc: "images/composition.png",
//                 reverse: true
//             },
//             {
//                 title: "數位媒體整合能力",
//                 text: "多媒體設計需要整合不同形式的數位內容，例如圖片、動畫、影像與聲音。透過適當的搭配與規劃，使各種媒體元素能互相配合，形成完整且一致的作品呈現。",
//                 imgSrc: "images/integrate.png",
//                 reverse: false
//             },
//             {
//                 title: "團隊合作與專案經驗",
//                 text: "在多媒體設計的學習過程中，常需要與不同角色合作完成專案。透過分工與溝通，培養團隊合作能力，並了解從規劃、執行到完成的整體專案流程，為未來實務應用打下基礎。",
//                 imgSrc: "images/teamwork.png",
//                 reverse: true
//             }
//         ];
//         await CourseDB.insert(initialCourses);
//         console.log("資料庫初始化完成！");
//     }
// }
// initData();

// async function initAboutData() {
//     const count = await AboutDB.count({});
//     if (count === 0) {
//         const initialAbout = [
//             {
//                 icon: "🎨",
//                 title: "結合哪些領域",
//                 text: "多媒體設計整合圖像、動畫、互動操作、聲音效果與影像內容，讓作品不再只是靜態畫面，而是完整的體驗。"
//             },
//             {
//                 icon: "⚙️",
//                 title: "與傳統設計的差異",
//                 text: "傳統設計以靜態視覺為主，多媒體設計則加入動態與互動，讓使用者能操作、參與並回饋。"
//             },
//             {
//                 icon: "🚀",
//                 title: "為什麼現在很重要",
//                 text: "在數位時代中，多媒體設計能讓資訊更快速被理解，提升互動體驗，成為數位內容的重要核心。"
//             }
//         ];
//         await AboutDB.insert(initialAbout);
//         console.log("首頁資料庫初始化完成！");
//     }
// }
// initAboutData();

// async function initAboutPageData() {
//     // 初始化領域資料
//     if (await FieldDB.count({}) === 0) {
//         await FieldDB.insert([
//             { 
//                 title: "動畫與影像", 
//                 img: "images/animation.jpg", 
//                 text: "動畫與影像能讓內容更生動有趣，常被用於影片、廣告與動態視覺中。透過畫面動態與節奏變化，使原本靜態的資訊更容易被理解與記住，也能加強情緒表達與故事性。" 
//             },
//             { 
//                 title: "視覺設計", 
//                 img: "images/visual.png", 
//                 text: "視覺設計是多媒體設計的重要基礎，主要負責畫面風格與整體美感的呈現。透過色彩、版面配置與圖像設計，讓資訊能夠清楚傳達，同時吸引使用者的目光。良好的視覺設計能提升作品的專業度與辨識度。" 
//             },
//             { 
//                 title: "互動設計", 
//                 img: "images/Interact.jpg", 
//                 text: "互動設計著重於使用者如何與作品進行操作與溝通，例如點擊、滑動或回饋。設計良好的互動流程，能讓使用者更直覺地使用系統，提升整體使用體驗，使設計不只是展示，而是能被實際參與。" 
//             },
//             { 
//                 title: "遊戲與娛樂應用", 
//                 img: "images/game.jpg", 
//                 text: "多媒體設計也廣泛應用於遊戲與娛樂領域，結合視覺、聲音與互動元素，創造沉浸式的體驗。透過設計規則、畫面表現與操作方式，讓使用者在娛樂中獲得樂趣與成就感。" 
//             }
//         ]);
//     }
//     // 初始化職業資料
//     if (await CareerDB.count({}) === 0) {
//         await CareerDB.insert([
//             { title: "遊戲設計師", img: "images/game-designer.png" },
//             { title: "動畫設計師", img: "images/animation-production.png" },
//             { title: "影視後製", img: "images/video-production.png" },
//             { title: "網頁互動設計師", img: "images/web-interactive-design.png" },
//             { title: "數位行銷企劃", img: "images/digital-marketing.png" },
//             { title: "新媒體藝術家", img: "images/new-media-art.png" }
//         ]);
//     }
// }
// initAboutPageData();

// async function initWorkData() {
//     if (await WorkDB.count({}) === 0) {
//         await WorkDB.insert([
//             {
//                 title: "Van Gogh: The Immersive Experience",
//                 type: "沉浸式動畫投影展",
//                 feature: "將梵谷的畫作透過巨型投影、動畫和音樂呈現，讓觀眾感受畫作的色彩與情感。",
//                 highlight: "結合視覺藝術與音效，帶來身歷其境的感受。",
//                 desc: "是一場以梵谷作品為主題的沉浸式多媒體展覽，透過大型投影與動畫，將經典畫作鋪滿整個展覽空間。搭配音樂與光影效果，讓觀眾彷彿走進畫作之中，從不同角度感受藝術家的情感與創作氛圍。",
//                 img: "images/Van-Gogh.jpg"
//             },
//             {
//                 title: "Rain Room",
//                 type: "互動裝置藝術",
//                 feature: "模擬下雨環境，觀眾走入時，雨會自動避開人體。",
//                 highlight: "結合聲音、光影與感應技術，體驗「操控自然」的感覺。",
//                 desc: "Rain Room 是一件互動式多媒體裝置藝術作品，模擬下雨的環境，並透過感應技術讓雨水在觀眾行走時自動避開。作品結合聲音、燈光與感應系統，讓觀眾在不被淋濕的情況下體驗置身雨中的感覺。",
//                 img: "images/rain-room.png"
//             },
//             {
//                 title: "Meow Wolf",
//                 type: "沉浸式互動藝術空間",
//                 feature: "結合雕塑、影像、聲音、燈光與互動裝置，形成奇幻、探索式的多媒體世界。",
//                 highlight: "每個觀眾的探索路線不同，體驗充滿驚喜。",
//                 desc: "Meow Wolf 是一種大型沉浸式互動藝術展覽，透過場景設計、影像、聲音與互動裝置，打造充滿想像力的探索空間。觀眾可以自由穿梭於不同場景，每一次探索都可能產生不同的體驗，增加參與感與趣味性。",
//                 img: "images/meow-wolf.jpg"
//             },
//             {
//                 title: "ARTECHOUSE",
//                 type: "互動數位藝術展",
//                 feature: "透過感應器、投影創造可以與觀眾互動的場景。",
//                 highlight: "透過感應器、投影與聲光效果，創造可以與觀眾互動的沉浸式場景。",
//                 desc: "ARTECHOUSE 是以數位科技為核心的多媒體藝術展覽空間，展出作品多結合投影、感應裝置與聲光效果。觀眾的動作會影響畫面變化，使展覽成為一種即時互動的體驗，強調科技與藝術之間的結合。",
//                 img: "images/ARTECHOUSE.jpeg"
//             }
//         ]);
//     }
// }
// initWorkData();

// --- 路由 (Routes) ---

// 1. 取得課程資料 API
server.get("/courses", async (req, res) => {
    const courses = await CourseDB.find({});
    res.json(courses);
});

server.get("/about", async (req, res) => {
    const aboutData = await AboutDB.find({});
    res.json(aboutData);
});

server.get("/fields", async (req, res) => {
    const fieldData = await FieldDB.find({});
    res.json(fieldData);
});

server.get("/careers", async (req, res) => {
    const careerData = await CareerDB.find({});
    res.json(careerData);
});

server.get("/works", async (req, res) => {
    const workData = await WorkDB.find({});
    res.json(workData);
});

server.post("/contact", async (req, res) => {
    try {
        // 1. 先處理檔案上傳
        let filePath = null;
        if (req.files && req.files.myFile) {
            const upFile = req.files.myFile;
            const safeName = Date.now() + "_" + upFile.name;
            const destPath = path.join(__dirname, "public/upload", safeName);

            await upFile.mv(destPath);
            filePath = "/upload/" + safeName;
        }

        // 2. 整合資料並存入資料庫
        const contactData = {
            ...req.body,
            filePath: filePath,
            createdAt: new Date()
        };
        await ContactDB.insert(contactData);

        // 3. 重要：回傳 JSON 而不是 render 頁面
        res.json({ success: true, message: "訊息已提交成功！" });

    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ success: false, message: "伺服器發生錯誤" });
    }
});

// 2. 啟動伺服器
const PORT = process.env.PORT || 8080; // Render 會優先使用系統分配的 PORT
server.listen(PORT, () => {
    console.log(`伺服器運行中：${PORT}`);
});
