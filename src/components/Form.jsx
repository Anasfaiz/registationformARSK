import React, { useState } from "react";
import "./Form.css";
import logo2 from "../assets/logo2.png";

/* ── Editable Date Boxes ── */
const DateBoxes = () => {
  const [vals, setVals] = useState({
    d1: "",
    d2: "",
    m1: "",
    m2: "",
    y1: "",
    y2: "",
    y3: "",
    y4: "",
  });
  const refs = React.useRef([]);
  const keys = ["d1", "d2", "m1", "m2", "y1", "y2", "y3", "y4"];
  const separators = { 2: "/", 4: "/" };
  const handleChange = (k, i) => (e) => {
    const v = e.target.value.replace(/\D/g, "").slice(-1);
    setVals((p) => ({ ...p, [k]: v }));
    if (v && refs.current[i + 1]) refs.current[i + 1].focus();
  };
  const handleKeyDown = (i) => (e) => {
    if (e.key === "Backspace" && !vals[keys[i]] && refs.current[i - 1])
      refs.current[i - 1].focus();
  };
  return (
    <span className="date-boxes">
      {keys.map((k, i) => (
        <React.Fragment key={k}>
          {separators[i] && (
            <span className="date-separator">{separators[i]}</span>
          )}
          <input
            ref={(el) => (refs.current[i] = el)}
            className="date-box-input"
            maxLength={1}
            value={vals[k]}
            onChange={handleChange(k, i)}
            onKeyDown={handleKeyDown(i)}
            placeholder={k[0].toUpperCase()}
            inputMode="numeric"
          />
        </React.Fragment>
      ))}
    </span>
  );
};

/* ── Editable Name Grid ── */
const NameGrid = ({ rows = 2, cells = 24 }) => {
  const total = rows * cells;
  const [vals, setVals] = useState(Array(total).fill(""));
  const refs = React.useRef([]);
  const handleChange = (i) => (e) => {
    const v = e.target.value.toUpperCase().slice(-1);
    setVals((p) => {
      const n = [...p];
      n[i] = v;
      return n;
    });
    if (v && refs.current[i + 1]) refs.current[i + 1].focus();
  };
  const handleKeyDown = (i) => (e) => {
    if (e.key === "Backspace" && !vals[i] && refs.current[i - 1])
      refs.current[i - 1].focus();
  };
  return (
    <div className="name-grid" style={{ "--cols": cells }}>
      {vals.map((v, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          className="name-cell-input"
          maxLength={1}
          value={v}
          onChange={handleChange(i)}
          onKeyDown={handleKeyDown(i)}
        />
      ))}
    </div>
  );
};

/* ── Aadhaar Grid ── */
const AadhaarGrid = () => {
  const [vals, setVals] = useState(Array(12).fill(""));
  const refs = React.useRef([]);
  const handleChange = (i) => (e) => {
    const v = e.target.value.replace(/\D/g, "").slice(-1);
    setVals((p) => {
      const n = [...p];
      n[i] = v;
      return n;
    });
    if (v && refs.current[i + 1]) refs.current[i + 1].focus();
  };
  const handleKeyDown = (i) => (e) => {
    if (e.key === "Backspace" && !vals[i] && refs.current[i - 1])
      refs.current[i - 1].focus();
  };
  return (
    <div className="aadhaar-grid">
      {[0, 4, 8].map((start) => (
        <React.Fragment key={start}>
          <span className="aadhaar-group">
            {[0, 1, 2, 3].map((j) => {
              const i = start + j;
              return (
                <input
                  key={i}
                  ref={(el) => (refs.current[i] = el)}
                  className="aadhaar-box"
                  maxLength={1}
                  inputMode="numeric"
                  value={vals[i]}
                  onChange={handleChange(i)}
                  onKeyDown={handleKeyDown(i)}
                />
              );
            })}
          </span>
          {start < 8 && <span className="aadhaar-sep">–</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

const LineField = ({ label }) => (
  <div className="line-field">
    <span className="line-label">{label}</span>
    <input type="text" className="line-input" />
  </div>
);

const Radio = ({ label, name, value, checked, onChange }) => (
  <label className="radio-item">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
    />
    <span>{label}</span>
  </label>
);

/* ── Photo Upload (compact) ── */
const PhotoUpload = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState(null);
  const handleFile = (file) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };
  return (
    <div
      className={`photo-upload-box ${isDragOver ? "drag-over" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        handleFile(e.dataTransfer.files[0]);
      }}
    >
      <input
        type="file"
        accept="image/*"
        className="photo-input"
        onChange={(e) => handleFile(e.target.files[0])}
      />
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 6,
          }}
        />
      ) : (
        <>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="upload-svg"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <p className="upload-placeholder">Upload Photo</p>
          <span className="upload-hint">Passport size</span>
        </>
      )}
    </div>
  );
};

const SectionTitle = ({ text }) => (
  <div className="section-title-wrap">
    <div className="relative flex items-center h-[36px]">
      {/* 1. The Golden Base - Increased width and vertical offset */}
      <div
        className="absolute inset-0 bg-yellow-500 z-0 translate-y-[6px]"
        style={{
          width: "calc(100% + 30px)",
          clipPath: "polygon(0% 0%, 100% 0%, 88% 100%, 0% 100%)",
        }}
      ></div>

      {/* 2. The Green Box - Increased font and padding */}
      <div
        className="relative bg-[#747c27] text-white px-9 py-1 z-10 flex items-center"
        style={{
          width: "calc(100% + 15px)",
          clipPath: "polygon(0% 0%, 100% 0%, 88% 100%, 0% 100%)",
        }}
      >
        <span className="font-black text-[16px] tracking-[2px] whitespace-nowrap uppercase section-strip-text">
          {text}
        </span>
      </div>
    </div>

    {/* 3. The Gold Horizontal Line - Thickened to 3px to match the "bold" look */}
    <div className="flex-1 h-[3px] bg-yellow-500 -ml-1 mt-[3px]"></div>
  </div>
);

/* ── Main Form ── */
const Form = () => {
  const [gender, setGender] = useState("");
  const [sport, setSport] = useState("");
  const [location, setLocation] = useState("");
  const [payment, setPayment] = useState("");
  const [source, setSource] = useState("");
  const [occupation, setOccupation] = useState("");
  const [pkg, setPkg] = useState("");

  return (
    <div className="registration-page">
      <div className="paper-sheet">
        {/* ── Header ── */}
        <header className="brand-block">
          <div className="brand-top-line" />
          <div className="brand-row-split">
            {/* LOGO: Left Side */}
            <div className="brand-logo-left">
              {/* Updated src to your new asset */}
              {/* Updated src to use the imported variable */}
              <img
                src={logo2}
                alt="ARS Kreedashala Logo"
                className="brand-logo"
              />
            </div>

            {/* ORG DETAILS: Right Side */}
            <div className="brand-details-right">
              <h1>ARS KREEDASHALA PRIVATE LIMITED</h1>

              {/* Address Row: Icon FIRST */}
              <div className="contact-item-row">
                <svg
                  className="brand-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#747c27"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p>
                  Daladali Chowk, Near Sarna Hotel,{" "}
                  <strong>Ranchi, Jharkhand</strong>
                </p>
              </div>

              {/* Contact Pill Row: Icon FIRST */}
              <div className="contact-pill-right">
                <svg className="brand-icon" viewBox="0 0 24 24" fill="#747c27">
                  <path d="M6.62 10.79a15.1 15.1 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <div className="phone-numbers">
                  <span>+91 6514073327</span>
                  <span className="divider">|</span>
                  <span>+91 9205200015</span>
                  <span className="divider">|</span>
                  <span>+91 9386693444</span>
                </div>
              </div>

              {/* Website Row: Icon FIRST */}
              <div className="contact-item-row">
                <div className="icon-box">
                  <svg
                    className="brand-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#747c27"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div className="site-line-right">www.arskreedashala.com</div>
              </div>
            </div>
          </div>
        </header>
        <div className="flex justify-center items-center my-6 w-full h-[48px] main-title-outer">
          <div className="relative flex items-center h-full">
            {/* The Golden Base (Wider & Bold) */}
            <div
              className="absolute inset-0 bg-yellow-500 z-0 translate-y-[3px]"
              style={{
                width: "calc(100% + 60px)",
                left: "-30px",
                clipPath: "polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)",
              }}
            ></div>

            {/* The Green Box */}
            <div
              className="relative bg-[#747c27] text-white px-12 py-2 z-10 flex items-center justify-center shadow-lg"
              style={{
                clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)",
              }}
            >
              <span className="font-black text-[20px] tracking-[4px] whitespace-nowrap uppercase main-title-text">
                PLAYER REGISTRATION FORM
              </span>
            </div>
          </div>
        </div>

        {/* ── Intro ── */}
        <div className="intro-row">
          <p>Dear Sir/Madam,</p>
          <div className="date-inline">
            <span>Date of Joining:</span>
            <DateBoxes />
          </div>
        </div>

        <p className="intro-copy">
          I am applying to register with <strong>ARS Kreedashala</strong>. My
          detailed information is provided below.
        </p>

        <div className="name-photo-responsive-row">
          {/* Left Side: Name and Source Info */}
          <div className="left-stack">
            <div className="name-block">
              <div className="field-title">Student Name</div>
              <div className="name-grid-wrap">
                <NameGrid rows={2} cells={20} />
              </div>
            </div>

            <div className="hear-block">
              <div className="field-title">
                How did you hear about ARS Kreedashala?
              </div>
              <div className="checks-row" style={{ marginTop: 6 }}>
                <Radio
                  label="Social Media"
                  name="source"
                  value="social"
                  checked={source === "social"}
                  onChange={(e) => setSource(e.target.value)}
                />
                <Radio
                  label="Website"
                  name="source"
                  value="website"
                  checked={source === "website"}
                  onChange={(e) => setSource(e.target.value)}
                />
                <Radio
                  label="Direct"
                  name="source"
                  value="direct"
                  checked={source === "direct"}
                  onChange={(e) => setSource(e.target.value)}
                />
                <Radio
                  label="Referral"
                  name="source"
                  value="referral"
                  checked={source === "referral"}
                  onChange={(e) => setSource(e.target.value)}
                />
              </div>
              <div className="line-field" style={{ marginTop: 10 }}>
                <span className="line-label">Referral by:</span>
                <input
                  type="text"
                  className="line-input"
                  aria-label="Referral name"
                />
              </div>
            </div>
          </div>

          {/* Right Side: PhotoUpload (Now moved up) */}
          <div className="photo-column">
            <PhotoUpload />
          </div>
        </div>

        {/* ── Personal Information ── */}
        <SectionTitle text="PERSONAL INFORMATION" />

        <div className="row-stack">
          <div className="checks-row">
            <span className="checks-title">Date of Birth :</span>
            <DateBoxes />
            <span className="checks-title shift">Gender:</span>
            <Radio
              label="Male"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />
            <Radio
              label="Female"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            />
            <Radio
              label="Other"
              name="gender"
              value="other"
              checked={gender === "other"}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <LineField label="Name of School / Club :" />
          <LineField label="School / Club Address :" />
          <div className="split-row">
            <LineField label="Contact Number (Personal) :" />
            <LineField label="WhatsApp :" />
          </div>
          <div className="checks-row">
            <span className="checks-title">Aadhaar Card Number :</span>
            <AadhaarGrid />
          </div>
        </div>

        {/* ── Sports Information ── */}
        <SectionTitle text="SPORTS INFORMATION" />

        <div className="row-stack">
          <div className="checks-row">
            <span className="checks-title">Sport:</span>
            <Radio
              label="Cricket"
              name="sport"
              value="cricket"
              checked={sport === "cricket"}
              onChange={(e) => setSport(e.target.value)}
            />
            <Radio
              label="Football"
              name="sport"
              value="football"
              checked={sport === "football"}
              onChange={(e) => setSport(e.target.value)}
            />
          </div>
          <div className="checks-row">
            <span className="checks-title">
              Select Academic Location (Branch):
            </span>
            <Radio
              label="Ranchi"
              name="location"
              value="ranchi"
              checked={location === "ranchi"}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Radio
              label="Hazaribagh"
              name="location"
              value="hazaribagh"
              checked={location === "hazaribagh"}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Radio
              label="Gaya"
              name="location"
              value="gaya"
              checked={location === "gaya"}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <LineField label="Contact Number (Personal) :" />
          <LineField label="Email ID :" />
        </div>

        {/* ── Package Selected ── */}
        <SectionTitle text="PACKAGE SELECTED" />

        <div className="row-stack compact-gap">
          <div className="checks-row">
            <Radio
              label="Skill Assessment Through Video — Rs 249"
              name="pkg"
              value="assessment"
              checked={pkg === "assessment"}
              onChange={(e) => setPkg(e.target.value)}
            />
          </div>
          <div className="checks-row">
            <Radio
              label="Player Development Program — Rs 599"
              name="pkg"
              value="development"
              checked={pkg === "development"}
              onChange={(e) => setPkg(e.target.value)}
            />
          </div>
        </div>

        {/* ── Parents / Guardian Details ── */}
        <SectionTitle text="PARENTS / GUARDIAN DETAILS" />

        <div className="row-stack">
          <LineField label="Father's / Guardian's Name:" />
          <div className="checks-row">
            <span className="checks-title">Occupation :</span>
            <Radio
              label="Public Sector"
              name="occupation"
              value="public"
              checked={occupation === "public"}
              onChange={(e) => setOccupation(e.target.value)}
            />
            <Radio
              label="Private Sector"
              name="occupation"
              value="private"
              checked={occupation === "private"}
              onChange={(e) => setOccupation(e.target.value)}
            />
            <Radio
              label="Self/Business"
              name="occupation"
              value="self"
              checked={occupation === "self"}
              onChange={(e) => setOccupation(e.target.value)}
            />
            <Radio
              label="Other:"
              name="occupation"
              value="other"
              checked={occupation === "other"}
              onChange={(e) => setOccupation(e.target.value)}
            />
            {occupation === "other" && (
              <input
                className="inline-line short"
                type="text"
                aria-label="Other occupation"
              />
            )}
          </div>
          <LineField label="Contact Number (Father) :" />
          <LineField label="Email ID :" />
          <LineField label="Full Address :" />
          <div className="split-row">
            <LineField label="Landmark:" />
            <LineField label="PIN Code:" />
          </div>
        </div>

        {/* ── Payment ── */}
        {/* ── Payment Row: Strip + 2x2 Grid + Button ── */}
        <div className="payment-inline-container">
          {/* 1. The Slanted Strip */}
          <div className="payment-strip-side">
            <div className="relative flex items-center h-[36px]">
              <div
                className="absolute inset-0 bg-yellow-500 z-0 translate-y-[6px]"
                style={{
                  width: "calc(100% + 25px)",
                  clipPath: "polygon(0% 0%, 100% 0%, 88% 100%, 0% 100%)",
                }}
              ></div>
              <div
                className="relative bg-[#747c27] text-white px-6 py-1 z-10 flex items-center"
                style={{
                  width: "calc(100% + 12px)",
                  clipPath: "polygon(0% 0%, 100% 0%, 88% 100%, 0% 100%)",
                }}
              >
                <span className="font-black text-[16px] tracking-[1.5px] whitespace-nowrap uppercase payment-strip-text">
                  PAYMENT OPTIONS
                </span>
              </div>
            </div>
          </div>

          {/* 2. The 2x2 Options Grid */}
          <div className="payment-options-compact-grid">
            <Radio
              label="💳 UPI"
              name="payment"
              value="upi"
              checked={payment === "upi"}
              onChange={(e) => setPayment(e.target.value)}
            />
            <Radio
              label="💰 Card"
              name="payment"
              value="card"
              checked={payment === "card"}
              onChange={(e) => setPayment(e.target.value)}
            />
            <Radio
              label="🏦 Net Banking"
              name="payment"
              value="netbanking"
              checked={payment === "netbanking"}
              onChange={(e) => setPayment(e.target.value)}
            />
            <Radio
              label="💵 Cash"
              name="payment"
              value="cash"
              checked={payment === "cash"}
              onChange={(e) => setPayment(e.target.value)}
            />
          </div>

          {/* 3. The Button */}
          <button className="payment-btn-final">Proceed to Payment</button>
        </div>
      </div>
    </div>
  );
};

export default Form;
