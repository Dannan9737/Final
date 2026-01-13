import express from 'express';
import Datastore from 'nedb-promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 初始化 NeDB 資料庫 (會自動在目前目錄生成 database.db)
const db = Datastore.create({ filename: './database.db', autoload: true });

app.use(express.json());

// 重要:HTML 檔案直接放在 finalwebsite 資料夾下，將靜態路徑設為目前目錄
app.use(express.static('public')); 

// 接收表單資料的 API
app.post('/api/login', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newDoc = await db.insert({ 
            name, 
            email, 
            message, 
            createdAt: new Date() 
        });
        console.log('成功存入資料:', newDoc);
        res.status(200).json({ status: "success", id: newDoc._id });
    } catch (err) {
        console.error('存入失敗:', err);
        res.status(500).json({ status: "error", message: err.message });
    }
});
// 取得所有資料的 API
app.get("/api/logincheck",(req,res)=>{
    db.find({},{"_id":0}).then(results=>{
        res.json(results);
    }).catch(err=>{
        console.log(err);
    })
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`=================================`);
    console.log(`伺服器啟動成功！`);
    console.log(`請造訪：http://localhost:${PORT}`);
    console.log(`=================================`);
});
