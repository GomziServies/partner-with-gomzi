import React from "react";

function sendToWhatsApp(text, number, option) {
  if (!text) {
    text = `Hi, I have come across ${window.location.href}. Can you provide more information about this ?`;
  }

  if (option) {
    if (option.pageRef) {
      text += `\n\nI found your contact details from ${window.location.origin + window.location.pathname
        }`;
    }
  }

  let url = `https://api.whatsapp.com/send?phone=+91${number ? number : '8866842520'}&text=${encodeURIComponent(
    text
  )}`;
  window.open(url, "_blank");
}

function WhatsappHeaderApp({ message, number, options }) {
  const handleClick = () => {
    sendToWhatsApp(message, number, options);
  };

  return (
    <a onClick={handleClick} className="inquiry" aria-label="Fg Group">
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}

export default WhatsappHeaderApp;
