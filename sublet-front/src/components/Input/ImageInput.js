import React, { useState, useRef } from "react";

export const ImageUploadComponent = ({setImage}) => {
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef(null); // 파일 입력에 대한 참조 생성

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const handleClickImage = () => {
    fileInputRef.current.click(); // 이미지 클릭 시 파일 입력 클릭 이벤트 트리거
  };

  return (
    <div>
      {preview ? (
        <img
          src={preview}
          alt="Image preview"
          onClick={handleClickImage}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <button onClick={() => fileInputRef.current.click()}>
          Choose an image
        </button>
      )}
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        style={{ display: "none" }} // 입력 필드를 숨김
        ref={fileInputRef} // 참조 연결
      />
    </div>
  );
};
