import React, { useState, useRef, useEffect } from "react";
import "../assets/css/business-profitable.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WhatsappHeaderApp from "../components/whatsappHeaderBtn";
import { Helmet } from "react-helmet";

const BusniessProfitable = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [iscontact, setIsContact] = useState(false);
    const videoRef = useRef(null);
    const lastAllowedTime = useRef(0);
    const whatsappRef = useRef(null);

    const handlePlayClick = () => {
        const video = videoRef.current;
        if (video) {
            video.play();
            setIsPlaying(true);
        }
    };

    const handleEnd = () => {
        setIsContact(true);
    };

    const handleClick = () => {
        const link = whatsappRef.current?.querySelector("a");
        if (link) {
            link.click();
        }
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const preventForwardSeek = () => {
            if (video.currentTime > lastAllowedTime.current + 0.3) {
                video.currentTime = lastAllowedTime.current;
            }
        };

        const updateLastTime = () => {
            if (!video.seeking && !video.paused) {
                lastAllowedTime.current = video.currentTime;
            }
        };

        video.addEventListener("timeupdate", updateLastTime);
        video.addEventListener("seeking", preventForwardSeek);

        return () => {
            video.removeEventListener("timeupdate", updateLastTime);
            video.removeEventListener("seeking", preventForwardSeek);
        };
    }, []);

    return (
        <>
            {/* Helmet for Meta Title and Description */}
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
                                    controls={isPlaying}
                                    onEnded={handleEnd}
                                    preload="auto"
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
                            </div>
                        </section>

                        {iscontact && (
                            <div className="contact-button-container">
                                <button className="contact-now-btn" onClick={handleClick}>
                                    <h4>Contact Now</h4>
                                </button>
                            </div>
                        )}
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
