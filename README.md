# 🧃 CÁC BƯỚC THỰC HIỆN

## 🔧 Bước 1: Tạo Bot Discord

1. Truy cập trang quản lý Developer Portal của Discord tại:  
   👉 https://discord.com/developers/applications

2. Nhấn nút **"New Application"**, sau đó:
   - Đặt tên cho bot của cậu (tuỳ thích nhen 🍬)

3. Trong menu bên trái:
   - Chọn **"Bot"**
   - Nhấn nút **"Add Bot"** rồi xác nhận **OK**

4. Sau khi bot được tạo:
   - Ghi lại **Token** của bot (mình sẽ cần nó để kết nối sau này đó 🍭)

> 💡 *Hãy giữ bí mật Token của bot, đừng chia sẻ với ai nha~ nếu lộ Token thì bot dễ bị kiểm soát trái phép đó nè!*

## 🔗 Bước 2: Mời Bot vào Server

1. Trong menu bên trái, chọn **OAuth2 → URL Generator**

2. Tại phần **Scopes**, tick chọn:
   - `bot`

3. Tại phần **Bot Permissions**, tick chọn các quyền sau:
   - `Send Messages`
   - `Read Message History`
   - `View Channels`

4. Kéo xuống dưới, copy đường link được tạo ra

5. Mở đường link trong trình duyệt → chọn server mà cậu muốn mời bot vào 💌

> 🌟 Sau khi mời xong, cậu sẽ thấy bot xuất hiện trong server rồi đó! Nếu chưa thấy, kiểm tra lại quyền hoặc thử khởi động bot nhé~

## 📦 Bước 4: Cài đặt môi trường code (Node.js)

1. Cài đặt **Node.js** tại:  
   👉 https://nodejs.org

2. Mở **Terminal** (hoặc CMD) trong thư mục đó và chạy lần lượt các lệnh sau:

   ```bash
   npm install
3. Tạo file **.env** ở thư mục gốc với nội dung:
    ```bash
    TOKEN=your_discord_bot_token_here
    GUILD_ID=your_server_id_here
    CLIENT_ID=your_client_id_here
🛠️ Lấy BOT Token ở trong 👉 https://discord.com/developers/applications
🛠️ Cách bật hiển thị ID trên Discord
Mở Discord

Nhấn vào ⚙️ User Settings (góc dưới trái)

Chọn tab Advanced (Nâng cao)

Bật Developer Mode (Chế độ Nhà phát triển) ✅

🛠️ Cách lấy Guild ID (ID của server)
Sau khi bật Developer Mode xong:

Chuột phải vào tên server (góc trên trái Discord)

Chọn Copy Server ID (Sao chép ID máy chủ)

🎉 Vậy là cậu có được GUILD_ID rồi đó!
## 🧪 Bước 5: Chạy bot

1. Mở lại **Terminal** trong thư mục chứa file bot (ví dụ: `index.js`)

2. Gõ lệnh sau để khởi động bot:

   ```bash
   node index.js
  
3. Để cập nhập command:
    ```bash
    node deploy-commands.js