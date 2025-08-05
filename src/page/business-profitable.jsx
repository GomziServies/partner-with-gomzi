import React, { useState, useRef } from "react";
import "../assets/css/business-profitable.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WhatsappHeaderApp from "../components/whatsappHeaderBtn";
import { Helmet } from "react-helmet";

const BusniessProfitable = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [iscontact, setIsContact] = useState(false);
    const [hasExitedFullscreen, setHasExitedFullscreen] = useState(false);

    const [showEarlyContact, setShowEarlyContact] = useState(false);
    const [hasShownEarlyContact, setHasShownEarlyContact] = useState(false);

    const videoRef = useRef(null);
    const whatsappRef = useRef(null);

    const handlePlayClick = () => {
        const video = videoRef.current;
        if (video) {
            video.controls = true;
            video.play()
                .then(() => {
                    setIsPlaying(true);
                })
                .catch((err) => {
                    console.warn("Autoplay failed:", err);
                });
        }
    };

    const handleEnd = () => {
        setIsContact(true);
        if (document.fullscreenElement) {
            document.exitFullscreen().catch((err) => {
                console.warn("Error attempting to exit fullscreen:", err);
            });
        }
    };

    const handleClick = () => {
        const link = whatsappRef.current?.querySelector("a");
        if (link) {
            link.click();
        }
    };

    return (
        <>
            <Helmet>
                <title>How to make your fitness business profitable?</title>
                <meta
                    name="description"
                    content="Learn how to turn your fitness business into a profitable venture through smart planning, client focus, and expert strategies."
                />
            </Helmet>

            <div className="bg-dark bg-black-green-gradient text-light">
                <section className="position-relative min-vh-100 d-flex align-items-center justify-content-center text-center px-3">
                    {[...Array(2)].map((_, i) => (
                        <div
                            key={i}
                            className={`position-absolute rounded-circle bg-success opacity-25 bubble bubble-${i}`}
                        ></div>
                    ))}

                    <div className="container position-relative z-1 p-0">
                        <h1 className="display-4 fw-bold">
                            How to make your{" "}
                            <span className="highlight-text">
                                fitness business{" "}
                                <span className="underline-mobile">profitable?</span>
                            </span>
                        </h1>

                        <p className="lead mt-3">
                            Turn your fitness business into a profit-making machine with smart
                            planning, effective marketing, and client-focused services.
                        </p>

                        <section className="py-5 text-white text-center">
                            <div className="video-wrapper mx-auto position-relative">
                                <video
                                    ref={videoRef}
                                    poster="/assets/video/thumbnail.jpg"
                                    className="w-100 h-100 object-fit-cover"
                                    playsInline
                                    preload="auto"
                                    onEnded={handleEnd}
                                    onTimeUpdate={() => {
                                        const video = videoRef.current;

                                        if (video) {
                                            const isFullscreen = !!document.fullscreenElement;

                                            // 900 seconds: Show Early Contact
                                            if (video.currentTime >= 900 && !hasShownEarlyContact && !iscontact) {
                                                setShowEarlyContact(true);
                                                setHasShownEarlyContact(true);

                                                if (isFullscreen && !hasExitedFullscreen) {
                                                    document.exitFullscreen()
                                                        .then(() => setHasExitedFullscreen(true))
                                                        .catch((err) => console.warn("Error exiting fullscreen:", err));
                                                }
                                            }

                                            // 1090 seconds: Show Final Contact


                                            if (video.currentTime >= 1090 && !iscontact) {
                                                setIsContact(true);
                                                setShowEarlyContact(false);
                                                setHasShownEarlyContact(false);
                                                console.log(isFullscreen);
                                                if (isFullscreen) {
                                                    document.exitFullscreen()
                                                        .then(() => setHasExitedFullscreen(true))
                                                        .catch((err) => console.warn("Error exiting fullscreen:", err));
                                                }
                                            }
                                        }

                                    }}
                                >
                                    <source
                                        src="/assets/video/partner-with-gomzi-2.mp4"
                                        type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                </video>

                                {!isPlaying && (
                                    <div className="video-btn m-0 p-0" onClick={handlePlayClick}>
                                        <a className="custom" aria-label="Play Video">
                                            <span className="newthing-1 mr-0">
                                                <i className="fas fa-play fs-3 text-white"></i>
                                            </span>
                                        </a>
                                    </div>
                                )}

                                {showEarlyContact && (
                                    <div
                                        className="early-contact-btn"
                                        onClick={handleClick}
                                        role="button"
                                        aria-label="Contact Now"
                                    >
                                        <i className="fab fa-whatsapp me-2"></i> Contact Now
                                    </div>
                                )}
                            </div>
                        </section>

                        <div
                            className={`contact-button-container fade-in-contact ${iscontact ? "visible" : ""
                                }`}
                        >
                            <button className="contact-now-btn" onClick={handleClick}>
                                <i className="fab fa-whatsapp pe-2 fs-3"></i> <h4 className="m-0">Contact Now</h4>
                            </button>
                        </div>
                    </div>
                </section>

                <div className="d-none" ref={whatsappRef}>
                    <WhatsappHeaderApp
                        message="Hello, looking forward to partnering with you."
                        number="6354051487"
                        options={{ pageRef: true }}
                    />
                </div>
            </div>
        </>
    );
};

export default BusniessProfitable;
