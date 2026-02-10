from http.server import BaseHTTPRequestHandler
import requests

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        from urllib.parse import urlparse, parse_qs
        
        # 1. Lấy MSSV từ query string
        query = parse_qs(urlparse(self.path).query)
        mssv = query.get('mssv', [''])[0]

        if not mssv:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"Thieu MSSV")
            return

        # 2. Cấu hình request tới server trường
        url = f"https://ctsv.hust.edu.vn/ctsv-img/getimagebystudentid?mssv={mssv}"
        headers = {
            "User-Agent": "Mozilla/5.0",
            "Referer": "https://ctsv.hust.edu.vn/"
        }

        try:
            # Gọi API trường bằng thư viện requests
            r = requests.get(url, headers=headers, timeout=10)
            
            # 3. Trả kết quả về cho Frontend
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.send_header('Access-Control-Allow-Origin', '*') # Cho phép gọi từ web
            self.end_headers()
            
            # Trả về chuỗi Base64 nhận được
            self.wfile.write(r.text.encode('utf-8'))
            
        except Exception:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(b"Server error")
