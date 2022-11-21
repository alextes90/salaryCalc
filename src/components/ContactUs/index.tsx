import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import './index.css';

export const ContactUs = () => {
  return (
    <div className="contact-us_wrapper">
      <a
        href="https://t.me/madashindeinai"
        target="_blank"
        rel="noreferrer"
        className="contact-us_link"
      >
        <StaticImage
          src={`../../assets/images/contact-us.png`}
          objectFit="contain"
          width={44}
          height={44}
          alt="contact_us"
          placeholder="tracedSVG"
          quality={40}
        />
      </a>
    </div>
  );
};
