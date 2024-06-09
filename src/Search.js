import React, { useState } from "react";
import axios from "axios";
import Form from "./Forms/Form";

const Search = () => {
  const [cccd, setCccd] = useState("");
  const [dataForm, setDataForm] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setCccd(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/api/search/${cccd}`
      );
      setDataForm(response.data);
      setError("");
    } catch (error) {
      setError("Không tìm thấy thông tin đăng ký cho Căn cước công nhân này.");
      setDataForm(null);
    }
  };

  return (
    <div>
      <h2>Tìm Kiếm Theo Căn cước công nhân </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cccd">Nhập Căn cước công nhân :</label>
        <br />
        <input
          type="text"
          id="cccd"
          value={cccd}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Tìm Kiếm</button>
      </form>
      {error && <p>{error}</p>}
      {dataForm && (
        // <div>
        //   <h3>Thông tin đăng ký:</h3>
        //   <p>Họ và tên: {dataForm.fullName}</p>
        //   <p>Email: {dataForm.email}</p>
        //   <p>Căn cước công nhân : {dataForm.cccd}</p>
        // </div>
        <Form />
      )}
    </div>
  );
};

export default Search;
