import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "./App.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import vi from "date-fns/locale/vi"; // Import locale tiếng Việt

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKGOMyHVPHaAwRmlod2np8YFwWqxO8T6M",
  authDomain: "vlh-tuyendung.firebaseapp.com",
  projectId: "vlh-tuyendung",
  storageBucket: "vlh-tuyendung.appspot.com",
  messagingSenderId: "736260500988",
  appId: "1:736260500988:web:7640b1ed76bcde97ee1679",
  measurementId: "G-92FTPRYJZC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  registerLocale("vi", vi); // Đăng ký ngôn ngữ tiếng Việt
  setDefaultLocale("vi"); // Đặt ngôn ngữ mặc định là tiếng Việt
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [date, setDate] = useState(null);
  const [gender, setGender] = useState("");
  const [cccd, setCccd] = useState("");
  const [tdhv, setTdhv] = useState("");
  const [tdcm, setTdcm] = useState("");
  const [showchuyennganh, setshowChuyenNganh] = useState(false);
  const [chuyennganh, setChuyenNganh] = useState("");
  const [vtut, setVtut] = useState("");
  const [taynghe, setTaynghe] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [targetDate, setTargetDate] = useState("");
  const [selectedTTTD, setSelectedTTTD] = useState("");
  const [showForm, SetShowForm] = useState(true);
  const [idVLH, setIdVLH] = useState("");

  const handleNameChange = (e) => {
    setFullname(e.target.value);
  };

  const handleIdVLhChange = (e) => {
    setIdVLH(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleNumberPhoneChange = (e) => {
    setNumberPhone(e.target.value);
  };
  const handleDateChange = (date) => {
    setDate(date);
  };
  const handleCccdChange = (e) => {
    setCccd(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleTdhvChange = (e) => {
    setTdhv(e.target.value);
  };
  const handleTayngheChange = (e) => {
    setTaynghe(e.target.value);
  };
  const handleTdcmChange = (e) => {
    setTdcm(e.target.value);
    setshowChuyenNganh(tdcm.trim() !== " ");
  };
  const handleChuyenNganhChange = (e) => {
    setChuyenNganh(e.target.value);
  };

  const handleImage1Change = (event) => {
    setImage1(event.target.files[0]);
  };

  const handleVtutChange = (e) => {
    setVtut(e.target.value);
  };

  const handleImage2Change = (event) => {
    setImage2(event.target.files[0]);
  };

  const handleShowForm = (e) => {
    SetShowForm(false);
  };
  const handleTTTDChange = (event) => {
    setSelectedTTTD(event.target.value);
  };

  useEffect(() => {
    const today = new Date().getDay();
    let nextTargetDay;

    if (today === 0 || today === 1 || today === 2 || today === 3) {
      nextTargetDay = 4; // Nếu là thứ 2, thứ 3 hoặc thứ 4, chọn thứ 5 làm mục tiêu
    } else {
      nextTargetDay = 1; // Ngược lại, chọn thứ 2 làm mục tiêu
    }

    const date = new Date();
    date.setDate(date.getDate() + ((nextTargetDay - date.getDay() + 7) % 7));
    setTargetDate(format(date, "dd/MM/yyyy"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("numberPhone", numberPhone);
      formData.append("date", format(date, "dd/MM/yyyy"));
      formData.append("cccd", cccd);
      formData.append("gender", gender);
      formData.append("tdhv", tdhv);
      formData.append("taynghe", taynghe);
      formData.append("chuyenmon", tdcm);
      formData.append("chuyennganh", chuyennganh);
      formData.append("vtut", vtut);
      formData.append("sothe", idVLH);
      formData.append("tttd", selectedTTTD);
      formData.append("images", image1);
      formData.append("images", image2);

      const response = await axios.post(
        // "http://tuyendung.vietlonghung.com.vn/api/register",
        // "http://localhost:7573/api/register",
        // "https://tuyendung-vlh.onrender.com/api/register",
        
          "http://171.244.39.87:30002/api/register"
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(
        `Chúc mừng ${fullname} đã đăng ký thành công. \n Mời bạn đến Cổng bảo vệ Công ty vào lúc 7 giờ 30 phút sáng ngày ${targetDate} để được hướng dẫn đến địa điểm hoàn thiện thủ tục nhận việc (vui lòng mặc áo sơ mi trắng, mang theo CCCD/CMND bản gốc và hồ sơ ứng tuyển, chuẩn bị bút xanh, cơm trưa và nước uống để nhận việc)`
      );
      // Reset các Input
      setFullname("");
      setCccd("");
      setDate(null);
      setEmail("");
      setGender("");
      setTdhv("");
      setTdcm("");
      setTaynghe("");
      setChuyenNganh("");
      setNumberPhone("");
      setVtut("");
      setshowChuyenNganh(false);
      setImage1(null);
      setImage2(null);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Đã có lỗi hãy kiểm tra lại");
    }
  };

  return (
    <div className="App">
      {showForm ? (
        <>
          <div className="registration-form-container">
            <img
              className="img img-m"
              alt="Ảnh Công ty Việt Long Hưng"
              src="https://i.imgur.com/OER6j6Z.jpeg"
            />
            <img
              className="img"
              alt="Values"
              src="https://i.imgur.com/73iHnB7.jpeg"
            />
            <img
              className="img"
              alt="Vision&Mission"
              src="https://i.imgur.com/easItyt.jpeg"
            />
          </div>

          <button className="animated-button" onClick={handleShowForm}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="arr-2"
              viewBox="0 0 24 24"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
            <span className="text">Tiếp Theo</span>
            <span className="circle"></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="arr-1"
              viewBox="0 0 24 24"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
          </button>
        </>
      ) : (
        <div className="registration-form-container">
          <h2>Đăng ký</h2>
          <form onSubmit={handleSubmit} className="registration-form">
            <label>Họ và Tên</label>
            <input
              type="text"
              name="fullname"
              required
              value={fullname}
              onChange={handleNameChange}
              placeholder="Họ và Tên"
              className="input-field"
            />
            <label>Số điện thoại</label>
            <input
              type="number"
              name="numberPhone"
              required
              value={numberPhone}
              onChange={handleNumberPhoneChange}
              placeholder="Số điện thoại"
              className="input-field"
            />
            <label>Ngày sinh</label>
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              className="input-field"
              placeholderText="Ngày sinh"
              locale="vi"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
            />
            <label>Giới tính</label>
            <select value={gender} onChange={handleGenderChange}>
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
            <label>Căn cước công dân/ Chứng minh nhân dân</label>
            <input
              type="text"
              name="cccd"
              required
              value={cccd}
              onChange={handleCccdChange}
              placeholder="Căn cước công dân/ Chứng minh nhân dân"
              className="input-field"
            />
            <label>Email (Nếu có)</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              className="input-field"
            />
            <label>Trình độ văn hóa VD: 12/12</label>
            <select value={tdhv} onChange={handleTdhvChange}>
              <option value="">Trình độ học vấn của Ứng Viên</option>
              <option value="1/12">1/12</option>
              <option value="2/12">2/12</option>
              <option value="3/12">3/12</option>
              <option value="4/12">4/12</option>
              <option value="5/12">5/12</option>
              <option value="6/12">6/12</option>
              <option value="7/12">7/12</option>
              <option value="8/12">8/12</option>
              <option value="9/12">9/12</option>
              <option value="10/12">10/12</option>
              <option value="11/12">11/12</option>
              <option value="12/12">12/12</option>
            </select>
            <label>Trình độ chuyên môn (nếu có)</label>
            <span>Ví dụ: Đại học - Ngành Quản trị kinh doanh</span>
            <select value={tdcm} onChange={handleTdcmChange}>
              <option value=" ">Chuyên Môn của Ứng Viên (nếu có)</option>
              <option value="Trung Cấp">Trung Cấp</option>
              <option value="Cao Đẳng">Cao Đẳng</option>
              <option value="Đại Học">Đại Học</option>
            </select>
            {showchuyennganh && (
              <input
                type="text"
                value={chuyennganh}
                onChange={handleChuyenNganhChange}
                className="input-field"
                placeholder="Chuyên ngành của Ứng viên"
              />
            )}
            <label>Tay nghề</label>
            <select value={taynghe} onChange={handleTayngheChange}>
              <option value="">Tay nghề của Ứng viên</option>
              <option value="Biết may">Biết May</option>
              <option value="Không biết may">Không biết may</option>
            </select>
            <label>
              Sau khi nghiên cứu nội dung thông báo tuyển lao động, tôi đăng ký
              dự tuyển vào vị trí:
            </label>
            <select value={vtut} onChange={handleVtutChange}>
              <option value="">Chọn vị trí ứng tuyển</option>
              <option value="Công nhân may">Công nhân may</option>
              <option value="Công nhân cắt">Công nhân cắt</option>
              <option value="Công nhân ủi">Công nhân ủi</option>
              <option value="Đóng gói">Đóng gói</option>
              <option value="Kiểm hóa">Kiểm hóa</option>
              <option value="Nhân viên kho">Nhân viên kho</option>
              <option value="Nhân viên cơ điện">Nhân viên cơ điện</option>
              <option value="Bảo vệ">Bảo vệ</option>
              <option value="Nhân viên Văn phòng">Nhân viên Văn phòng</option>
            </select>
            <label>Bạn biết thông tin tuyển dụng qua đâu?</label>
            <select value={selectedTTTD} onChange={handleTTTDChange}>
              <option value="">Bạn biết thông tin tuyển dụng qua đâu</option>
              <option value="Facebook">Facebook</option>
              <option value="Cổng bảo vệ Công ty">Cổng bảo vệ Công ty</option>
              <option value="Băng rôn">Băng rôn</option>
              <option value="Người thân giới thiệu">
                Người thân giới thiệu
              </option>
            </select>
            {selectedTTTD === "Người thân giới thiệu" && (
              <>
                <label>
                  Nếu người thân Anh/Chị làm tại Việt Long Hưng vui lòng điền số
                  thẻ công nhân viên của người thân.
                  <br />
                  Nếu không có vui lòng điền KHÔNG CÓ.
                </label>
                <input
                  type="text"
                  value={idVLH}
                  onChange={handleIdVLhChange}
                  className="input-field"
                  placeholder="Chuyên ngành của Ứng viên"
                />
              </>
            )}
            <h2>
              Sau khi đã điền đầy đủ thông tin ứng tuyển, bạn vui lòng gửi hình
              ảnh 2 mặt Căn cước công dân/Chứng minh nhân dân để Bộ phận Nhân sự
              của Công ty hoàn thiện thủ tục hồ sơ ứng tuyển.
            </h2>
            <label>
              Hình CCCD mặt trước:
              <input
                type="file"
                accept="image/*"
                onChange={handleImage1Change}
              />
            </label>
            <label>
              Hình CCCD mặt sau:
              <input
                type="file"
                accept="image/*"
                onChange={handleImage2Change}
              />
            </label>
            <button type="submit" className="submit-button">
              Đăng ký
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
