export default async function handler(req, res) {
    const { mssv } = req.query;
    if (!mssv) return res.status(400).send("Thiếu MSSV");

    const targetUrl = `https://ctsv.hust.edu.vn/ctsv-img/getimagebystudentid?mssv=${mssv}`;

    try {
        const response = await fetch(targetUrl);
        const data = await response.text();
        
        // Cấu hình để trình duyệt cho phép nhận dữ liệu
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send("Lỗi kết nối Server");
    }
}
