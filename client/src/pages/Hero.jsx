// src/components/Hero.jsx
import React, { useEffect, useState } from "react";
import "./Hero.css";

const Hero = () => {
  const [text, setText] = useState("");
  const fullText = "Welcome to Alumni Portal";

  useEffect(() => {
    let index = 0;
    const typing = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(typing);
    }, 100);
    return () => clearInterval(typing);
  }, []);

  return (
    <div className="hero-container">
      {/* Background Video */}
      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/alumnivideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="hero-content">
        <h1 className="typing-text">{text}</h1>
        <p className="fade-in-text">Connecting Alumni, Sharing Memories</p>
        <a href="/dashboard">
          <button className="hero-btn">Enter Site</button>
        </a>
      </div>
    </div>
  );
};

export default Hero;
