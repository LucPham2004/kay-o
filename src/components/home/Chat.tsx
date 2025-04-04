import { useEffect, useRef, useState } from "react";
import Message from "./Message";

interface Message {
    id: number;
    text: string;
    sender: "user" | "ai";
}

export default function ChatUI() {
    const [messages, setMessages] = useState<Message[]>([]);

    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMessages([
            { id: 1, text: "Hello", sender: "user" },
            { id: 2, text: "Hi there!", sender: "ai" },
            { id: 4, text: "What is your name?", sender: "user" },
            { id: 5, text: "I am KayO, an AI assistant.", sender: "ai" },
            { id: 12, text: "How's the weather tomorrow in New York?", sender: "user" },
            { id: 13, text: "I need a bit more information to give you an accurate weather forecast for New York tomorrow!  To provide the most helpful answer, please specify:\n\n*   **Which part of New York?** New York City has different weather than upstate New York. If you mean New York City, please specify which borough if possible (e.g., \"Manhattan,\" \"Brooklyn\"). Otherwise, mention a specific city or region.\n*   **What time tomorrow are you interested in?** Weather can change throughout the day.", sender: "ai" },
            { id: 14, text: "Well, how about 8AM in Brooklyn?", sender: "user" },
            { id: 15, text: "Okay! Here's the weather forecast for Brooklyn, NY at 8:00 AM tomorrow, based on current predictions (as of October 26, 2023):\n\n*   **Temperature:** Expect the temperature to be around 55 degrees Fahrenheit.\n*   **Conditions:** Mostly cloudy skies are expected.\n*   **Precipitation:** There is a very low chance of rain.\n*   **Wind:** There should be a light breeze, coming from the West at around 5 mph.\n\n**Important Note:** Weather forecasts can change. I highly recommend checking a reliable weather source closer to tomorrow (like a weather app or website) for the most up-to-date information.\n", sender: "ai" },
            { id: 10, text: "Python làm backend thì sẽ như nào, cho tôi xem ví dụ", sender: "user" },
            { id: 11, text: "Python là một lựa chọn rất phổ biến và mạnh mẽ cho backend development.  Dưới đây là giải thích về lý do tại sao Python lại phù hợp, kèm theo một ví dụ đơn giản sử dụng Flask, một microframework nổi tiếng:\n\n**Tại sao Python lại tốt cho Backend?**\n\n*   **Dễ học và dễ đọc:** Python có cú pháp rõ ràng, dễ đọc, giúp giảm thời gian phát triển và bảo trì code.\n*   **Nhiều thư viện và framework:**  Python có hệ sinh thái thư viện phong phú hỗ trợ nhiều tác vụ backend như:\n    *   **Web frameworks:** Flask, Django, FastAPI (cho web APIs)\n    *   **Database connectors:** psycopg2 (PostgreSQL), pymongo (MongoDB), SQLAlchemy (ORM)\n    *   **Task queues:** Celery, RQ\n    *   **Authentication & Authorization:** Flask-Login, Django's built-in authentication\n    *   **Testing:** pytest, unittest\n*   **Khả năng mở rộng:** Python có thể mở rộng dễ dàng để xử lý khối lượng công việc lớn thông qua các kỹ thuật như caching, load balancing, và asynchronous programming.\n*   **Cộng đồng lớn:**  Cộng đồng Python lớn mạnh giúp bạn dễ dàng tìm thấy sự hỗ trợ, tài liệu và các giải pháp cho các vấn đề bạn gặp phải.\n\n**Ví dụ: API đơn giản với Flask**\n\nĐây là một ví dụ đơn giản về một API trả về một thông điệp chào mừng sử dụng Flask:\n\n```python\n# app.py\nfrom flask import Flask, jsonify\n\napp = Flask(__name__)\n\n@app.route('/')\ndef hello_world():\n    return 'Hello, World!'\n\n@app.route('/api/greet/<name>')\ndef greet(name):\n    message = f\"Hello, {name}!\"\n    return jsonify({\"message\": message})\n\nif __name__ == '__main__':\n    app.run(debug=True)\n```\n\n**Giải thích code:**\n\n*   **`from flask import Flask, jsonify`:** Import các lớp cần thiết từ thư viện Flask. `Flask` là class chính để tạo ứng dụng web.  `jsonify` dùng để chuyển đổi dữ liệu Python sang định dạng JSON (phổ biến cho APIs).\n*   **`app = Flask(__name__)`:** Khởi tạo một đối tượng Flask. `__name__` là tên của module hiện tại.\n*   **`@app.route('/')`:**  Đây là một *decorator* liên kết function `hello_world()` với đường dẫn `/`. Khi người dùng truy cập đường dẫn này, hàm `hello_world()` sẽ được thực thi.\n*   **`def hello_world():`:**  Định nghĩa một hàm trả về chuỗi \"Hello, World!\".  Đây là *route handler* cho đường dẫn `/`.\n*   **`@app.route('/api/greet/<name>')`:** Liên kết hàm `greet()` với đường dẫn `/api/greet/<name>`.  `<name>` là một *dynamic parameter*.  Giá trị của nó sẽ được truyền vào hàm `greet()` dưới dạng một đối số.\n*   **`def greet(name):`:**  Định nghĩa một hàm nhận tham số `name` và trả về một thông điệp chào mừng dưới dạng JSON.\n*   **`jsonify({\"message\": message})`:** Chuyển đổi dictionary Python `{\"message\": message}` thành một chuỗi JSON.\n*   **`if __name__ == '__main__':`:**  Kiểm tra xem script này có được chạy trực tiếp hay không (chứ không phải được import từ module khác).\n*   **`app.run(debug=True)`:** Khởi động server Flask ở chế độ debug (rất hữu ích cho quá trình phát triển).  `debug=True` cho phép Flask tự động reload server khi bạn thay đổi code và hiển thị thông tin gỡ lỗi chi tiết hơn.\n\n**Cách chạy ví dụ:**\n\n1.  **Cài đặt Flask:**  `pip install Flask`\n2.  **Lưu code:**  Lưu code trên vào một file, ví dụ `app.py`.\n3.  **Chạy ứng dụng:**  Mở terminal hoặc command prompt, điều hướng đến thư mục chứa file `app.py`, và chạy lệnh `python app.py`.\n\nSau khi chạy, bạn có thể truy cập:\n\n*   `http://127.0.0.1:5000/` (sẽ thấy \"Hello, World!\")\n*   `http://127.0.0.1:5000/api/greet/Alice` (sẽ thấy JSON: `{\"message\": \"Hello, Alice!\"}`)\n\n**Các framework khác:**\n\n*   **Django:**  Một framework full-stack, cung cấp nhiều tính năng có sẵn như ORM (Object-Relational Mapper), authentication, admin panel.  Phù hợp cho các ứng dụng lớn, phức tạp.\n*   **FastAPI:** Một framework hiện đại, hiệu năng cao, chủ yếu dành cho việc xây dựng APIs.  Nó được xây dựng dựa trên standard type hints của Python, giúp bạn viết code rõ ràng và ít lỗi hơn.\n\n**Các bước phát triển backend Python điển hình:**\n\n1.  **Chọn framework:**  Flask, Django, FastAPI,...\n2.  **Thiết kế cơ sở dữ liệu:**  Xác định các bảng, quan hệ, và kiểu dữ liệu.\n3.  **Kết nối cơ sở dữ liệu:**  Sử dụng các thư viện như `psycopg2`, `pymongo`, `SQLAlchemy`.\n4.  **Xây dựng API endpoints:**  Định nghĩa các đường dẫn API (routes) và xử lý logic.\n5.  **Triển khai authentication & authorization:**  Xác thực người dùng và phân quyền truy cập.\n6.  **Viết unit tests:**  Đảm bảo code hoạt động đúng.\n7.  **Triển khai:**  Deploy ứng dụng lên server.\n\nVí dụ trên chỉ là một khởi đầu rất nhỏ.  Trong thực tế, backend development có thể phức tạp hơn nhiều, nhưng đây là một điểm khởi đầu tốt để bạn làm quen với việc sử dụng Python cho backend.  Chúc bạn thành công!\n", sender: "ai" },
            
        ]);
    }, []);

    useEffect(() => {
        setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "instant" }), 100);
    }, []);

    return (
        <div className="flex flex-col h-full w-[67%] max-w-[2560px] p-4">
            <div className="flex-1 overflow-auto p-4 rounded-xl">
                {messages.map((message) => (
                    <div key={message.id}>
                        <Message message={message} />
                    </div>
                ))}
                <div ref={chatEndRef}/>
            </div>
        </div>
    );
}
