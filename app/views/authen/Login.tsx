import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ApiLogin } from "~/services/Authen.Service";
import { useAuth } from "~/contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await ApiLogin({
        Email: formData.email,
        Password: formData.password,
      });

      if (response) {
        setMessage("เข้าสู่ระบบสำเร็จ! กำลังนำคุณไปสู่หน้าแรก...");
        login(response.data);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error: any) {
      console.error("Login error: ", error);
      setMessage("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          เข้าสู่ระบบ
        </h2>
        {message && (
          <div
            className={`p-3 mb-4 text-center ${
              message.includes("สำเร็จ")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">อีเมล</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="กรอกชื่อผู้ใช้งาน"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">รหัสผ่าน</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="กรอกรหัสผ่าน"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-gray-600">
          ยังไม่มีบัญชีผู้ใช้งาน?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            ลงทะเบียนที่นี่
          </Link>
        </p>
      </div>
    </div>
  );
}
