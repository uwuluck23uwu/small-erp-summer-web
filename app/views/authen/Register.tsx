import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ApiRegister } from "~/services/Authen.Service";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
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
      const response = await ApiRegister({
        Username: formData.username,
        FullName: formData.fullName,
        Email: formData.email,
        Password: formData.password,
      });

      if (response) {
        setMessage("ลงทะเบียนสำเร็จ! กำลังเข้าสู่หน้าล็อกอิน...");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error: any) {
      console.error("Registration error: ", error);
      setMessage("เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          ลงทะเบียน
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
            <label className="block text-gray-700">ชื่อผู้ใช้งาน</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="กรอกชื่อผู้ใช้งาน"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">ชื่อ-นามสกุล</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="กรอกชื่อและนามสกุล"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">อีเมล</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="กรอกอีเมลของคุณ"
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
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          มีบัญชีผู้ใช้อยู่แล้ว?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            เข้าสู่ระบบที่นี่
          </Link>
        </p>
      </div>
    </div>
  );
}
