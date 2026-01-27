export default async function handler(req, res) {
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        return res.status(200).end();
    }

    const { mssv } = req.query;
    if (!mssv) return res.status(400).send("Thiếu MSSV");

    const url = `https://ctsv.hust.edu.vn/ctsv-img/getimagebystudentid?mssv=${mssv}`;

    try {
        const r = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Referer": "https://ctsv.hust.edu.vn/"
            }
        });

        const data = await r.text();
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(data);
    } catch {
        res.status(500).send("Server error");
    }
}
