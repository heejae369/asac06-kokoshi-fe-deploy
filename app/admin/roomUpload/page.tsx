"use client";

import React, { useState } from "react";
import styles from "@/styles/AdminRoomUpload.module.css";

const AdminPage = () => {
  const [accommodationData, setAccommodationData] = useState({
    name: "",
    address: "",
    category: "",
    thumbnail: "",
    rating: 0,
    reviewCount: 0,
  });

  const [roomData, setRoomData] = useState({
    name: "",
    description: "",
    capacity: 0,
    maxCapacity: 0,
    dayUseTime: 0,
    dayUseStartTime: "",
    dayUseEndTime: "",
    checkInTime: "",
    checkOutTime: "",
    weekdayDayUsePrice: 0,
    weekdayPrice: 0,
    weekendDayUsePrice: 0,
    weekendPrice: 0,
    quantity: 0,
    image: "",
    roomType: "STAY",
  });

  const handleAccommodationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAccommodationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoomChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRoomData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 서버로 데이터 전송 (API 호출)
    console.log("Accommodation Data:", accommodationData);
    console.log("Room Data:", roomData);

    alert("숙소 및 객실 정보가 저장되었습니다.");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Admin: 숙소 및 객실 정보 입력</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* 숙소 정보 입력 */}
        <h2 className={styles.h2}>숙소 정보</h2>
        <div className={styles.inputGroup}>
          <label>숙소 이름</label>
          <input
            type="text"
            name="name"
            value={accommodationData.name}
            onChange={handleAccommodationChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>주소</label>
          <input
            type="text"
            name="address"
            value={accommodationData.address}
            onChange={handleAccommodationChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>카테고리</label>
          <select
            name="category"
            value={accommodationData.category}
            onChange={handleAccommodationChange}
            required
          >
            <option value="">선택하세요</option>
            <option value="호텔">호텔</option>
            <option value="모텔">모텔</option>
            <option value="펜션">펜션</option>
            <option value="리조트">리조트</option>
            <option value="게스트하우스">게스트하우스</option>
            <option value="풀빌라">풀빌라</option>
            <option value="캠핑">캠핑</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label>썸네일 이미지 URL</label>
          <input
            type="text"
            name="thumbnail"
            value={accommodationData.thumbnail}
            onChange={handleAccommodationChange}
          />
        </div>
        {/* <div className={styles.inputGroup}>
          <label>평점</label>
          <input
            type="number"
            name="rating"
            value={accommodationData.rating}
            onChange={handleAccommodationChange}
            step="0.1"
          />
        </div> */}
        {/* <div className={styles.inputGroup}>
          <label>리뷰 수</label>
          <input
            type="number"
            name="reviewCount"
            value={accommodationData.reviewCount}
            onChange={handleAccommodationChange}
          />
        </div> */}

        {/* 객실 정보 입력 */}
        <h2 className={styles.h2}>객실 정보</h2>
        <div className={styles.inputGroup}>
          <label>객실 이름</label>
          <input
            type="text"
            name="name"
            value={roomData.name}
            onChange={handleRoomChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>설명</label>
          <textarea
            className={styles.textarea}
            name="description"
            value={roomData.description}
            onChange={handleRoomChange}
          ></textarea>
        </div>
        <div className={styles.inputGroup}>
          <label>기준 인원</label>
          <input
            type="number"
            name="capacity"
            value={roomData.capacity}
            onChange={handleRoomChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>최대 인원</label>
          <input
            type="number"
            name="maxCapacity"
            value={roomData.maxCapacity}
            onChange={handleRoomChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>대실 시간</label>
          <input
            type="number"
            name="dayUseTime"
            value={roomData.dayUseTime}
            onChange={handleRoomChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>대실 시작 시간</label>
          <input
            type="time"
            name="dayUseStartTime"
            value={roomData.dayUseStartTime}
            onChange={handleRoomChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>대실 종료 시간</label>
          <input
            type="time"
            name="dayUseEndTime"
            value={roomData.dayUseEndTime}
            onChange={handleRoomChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>체크인 시간</label>
          <input
            type="time"
            name="checkInTime"
            value={roomData.checkInTime}
            onChange={handleRoomChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>체크아웃 시간</label>
          <input
            type="time"
            name="checkOutTime"
            value={roomData.checkOutTime}
            onChange={handleRoomChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>객실 이미지 URL</label>
          <input
            type="text"
            name="image"
            value={roomData.image}
            onChange={handleRoomChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>객실 수량</label>
          <input
            type="number"
            name="quantity"
            value={roomData.quantity}
            onChange={handleRoomChange}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          저장
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
