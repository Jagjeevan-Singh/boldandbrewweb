import React from 'react';
import './About.css';
import logo from '../assets/logo.png'; // Adjust the path as necessary

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About BOLD & BREW</h1>
      <p className="about-description">
        {/* Paste your premium brand story or mission here */}
        Welcome to Bold & Brew — your go-to destination for premium coffee experiences that fuel your day and satisfy your soul. We are more than just a coffee brand; we are a lifestyle movement for those who live passionately, work relentlessly, and crave that perfect cup to start or end their day.

        At Bold & Brew, every bean is handpicked, ethically sourced, and roasted to perfection. Whether you're a fan of strong espresso shots or smooth cappuccinos, our blends are designed to offer an unmatched richness, aroma, and depth. We combine tradition with innovation — maintaining the authenticity of coffee while delivering it with a modern twist.

        Our mission is to create not just coffee, but memorable moments. That’s why we offer a seamless online experience to browse, wishlist, and order your favorite brews from the comfort of your home. Our team is constantly experimenting with new flavors and brewing methods to keep your cup exciting.

        We also believe in sustainability, community, and transparency. From eco-friendly packaging to supporting small-scale farmers, we take conscious steps to ensure every sip you take contributes to something bigger.

        Thank you for choosing Bold & Brew — where bold flavor meets bold ambition.
      </p>
      <div className="about-image"></div>
    </div>
  );
};

export default About;
