import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messagesList = [
  "What would you like to eat?",
  "Try our special today!",
  "Feeling hungry?",
  "Want something spicy?"
];

// Typing effect hook for mascot speech bubble
const useTypingEffect = (text, isVisible) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!isVisible) {
      setDisplayedText("");
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 35);

    return () => clearInterval(interval);
  }, [text, isVisible]);

  return displayedText;
};

const ChefMascot = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [cycles, setCycles] = useState(0);

  const [showMascot, setShowMascot] = useState(false);
  const [isShort, setIsShort] = useState(false);

  // Chatbot state
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "chef",
      text: "Greetings! I am Chef Anando's AI Assistant. 👨‍🍳 How may I elevate your dining experience today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    const checkHeight = () => setIsShort(window.innerHeight < 700);
    checkHeight();
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, []);

  const currentMessage = messagesList[messageIndex];
  const displayedText = useTypingEffect(currentMessage, isVisible);

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isTyping]);

  // SCROLL DETECTION (Show mascot after scrolling down)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowMascot(true);
      } else {
        setShowMascot(false);
        setIsOpen(false); // Auto close chatbot if they scroll to top
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mascot speech bubble cycles
  useEffect(() => {
    if (cycles >= 3 || !showMascot || isOpen) return;

    let t1, t2;
    const delay = messageIndex === 0 && cycles === 0 ? 2000 : 1000;

    t1 = setTimeout(() => {
      setIsVisible(true);

      t2 = setTimeout(() => {
        setIsVisible(false);

        setTimeout(() => {
          setMessageIndex((prev) => {
            const next = prev + 1;
            if (next >= messagesList.length) {
              setCycles((c) => c + 1);
              return 0;
            }
            return next;
          });
        }, 400);
      }, 5000);
    }, delay);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [messageIndex, cycles, showMascot, isOpen]);

  const handleScrollToTop = (e) => {
    e.stopPropagation();
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleChatbot = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    setIsVisible(false); // Hide the standard small bubble when chat is open
    
    if (nextState) {
      setChatMessages([
        {
          id: Date.now(),
          sender: "chef",
          text: "Greetings! I am Chef Anando's AI Assistant. 👨‍🍳 How may I elevate your dining experience today?",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setInputValue("");
      setIsTyping(false);
    }
  };

  // Generate simulated response
  const getAIResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes("special") || q.includes("today") || q.includes("eat") || q.includes("food")) {
      return "Today's premium specials include our hand-crafted Truffle Pasta 🍝, steaming traditional Pav Bhaji 🍛, and our luxurious Heritage Gujarati Thali! You can view them in the Menu section.";
    }
    if (q.includes("book") || q.includes("reservation") || q.includes("table") || q.includes("seat")) {
      return "Booking a table is easy! Just head over to our 'Reservation' page. You can customize the date, guest count, and seating area (AC, Non-AC, or Outdoor) directly in our real-time booking console.";
    }
    if (q.includes("hour") || q.includes("time") || q.includes("open") || q.includes("close")) {
      return "We are open daily to serve you: \n✦ Breakfast: 08:00 AM - 11:00 AM\n✦ Lunch: 12:00 PM - 04:00 PM\n✦ Dinner: 07:00 PM - 11:00 PM";
    }
    if (q.includes("where") || q.includes("location") || q.includes("address") || q.includes("find")) {
      return "Anando Foods is located in the heart of the culinary district. You can view our exact street location, contact number, and live Google Maps directions in our 'Contact' section at the bottom of the home page!";
    }
    if (q.includes("chef") || q.includes("recommend")) {
      return "Chef Anando highly recommends our special house-spiced Paneer Tikka, coastal South Indian Appams, and our fusion Garlic Spring Rolls! Every dish is curated with local organic ingredients.";
    }
    return "I would love to help you with that! At Anando Foods, we specialize in a blend of Gujarati, Punjabi, South Indian, and modern fusion cuisines. Let me know if you would like info on bookings, timings, or today's specials!";
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // User message
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulated streaming response delay
    setTimeout(() => {
      const responseText = getAIResponse(text);
      const chefMsg = {
        id: Date.now() + 1,
        sender: "chef",
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, chefMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const quickActions = [
    { label: "🍽️ Today's Specials", query: "Today's Specials" },
    { label: "📅 Book a Table", query: "Book a Table" },
    { label: "⏰ Opening Hours", query: "Opening Hours" },
    { label: "📍 Location Details", query: "Location Details" }
  ];

  return (
    <AnimatePresence>
      {showMascot && (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end origin-bottom-right">
          
          {/* 🤖 CHATBOT PANEL - BULLETPROOF INLINE CUSTOM STYLING */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: 30, scale: 0.85 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 30, scale: 0.85 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="fixed bottom-6 right-4 sm:right-[96px] overflow-hidden mb-[80px] sm:mb-0"
                style={{
                  width: "360px",
                  height: "480px",
                  backgroundColor: "#ffffff",
                  borderRadius: "24px",
                  border: "1px solid rgba(15, 92, 92, 0.12)",
                  boxShadow: "0 20px 50px rgba(15, 92, 92, 0.14)",
                  display: "flex",
                  flexDirection: "column",
                  zIndex: 99999,
                  fontFamily: "sans-serif"
                }}
              >
                {/* Header */}
                <div style={{
                  padding: "14px 18px",
                  background: "linear-gradient(135deg, #092e2e 0%, #114e4e 100%)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                      position: "relative",
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(255, 255, 255, 0.2)"
                    }}>
                      <span style={{ fontSize: "20px" }}>👨‍🍳</span>
                      <span style={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        width: "10px",
                        height: "10px",
                        backgroundColor: "#10b981",
                        borderRadius: "50%",
                        border: "2px solid #092e2e"
                      }} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontWeight: "600", fontSize: "14px", letterSpacing: "0.3px" }}>Chef Anando</h4>
                      <p style={{ margin: 0, fontSize: "10px", color: "rgba(255, 255, 255, 0.7)" }}>Online Assistant</p>
                    </div>
                  </div>
                  <button 
                    onClick={toggleChatbot}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      border: "none",
                      color: "rgba(255, 255, 255, 0.8)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "12px",
                      transition: "all 0.2s"
                    }}
                  >
                    ✕
                  </button>
                </div>

                {/* Messages Box */}
                <div style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "18px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  backgroundColor: "#f8faf9"
                }}>
                  {chatMessages.map((msg) => (
                    <div 
                      key={msg.id}
                      style={{
                        display: "flex",
                        justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                        width: "100%"
                      }}
                    >
                      <div style={msg.sender === "user" ? {
                        maxWidth: "80%",
                        borderRadius: "16px",
                        borderTopRightRadius: "0",
                        padding: "10px 14px",
                        background: "linear-gradient(135deg, #d4af37 0%, #b89320 100%)",
                        color: "#ffffff",
                        boxShadow: "0 2px 8px rgba(212, 175, 55, 0.15)",
                        lineHeight: "1.45"
                      } : {
                        maxWidth: "80%",
                        borderRadius: "16px",
                        borderTopLeftRadius: "0",
                        padding: "10px 14px",
                        backgroundColor: "#ffffff",
                        color: "#1e293b",
                        border: "1px solid rgba(15, 92, 92, 0.06)",
                        boxShadow: "0 2px 6px rgba(15, 92, 92, 0.03)",
                        lineHeight: "1.45"
                      }}>
                        <p style={{ margin: 0, fontSize: "13px", wordBreak: "break-word" }}>{msg.text}</p>
                        <span style={{
                          display: "block",
                          fontSize: "8px",
                          textAlign: "right",
                          marginTop: "4px",
                          opacity: 0.7
                        }}>{msg.time}</span>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
                      <div style={{
                        borderRadius: "16px",
                        borderTopLeftRadius: "0",
                        padding: "10px 14px",
                        backgroundColor: "#ffffff",
                        border: "1px solid rgba(15, 92, 92, 0.06)",
                        display: "flex",
                        gap: "4px",
                        alignItems: "center"
                      }}>
                        <span className="w-2 h-2 bg-[#0F5C5C] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-[#0F5C5C] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-[#0F5C5C] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Quick Actions Suggestions */}
                <div style={{
                  padding: "4px 16px 8px 16px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "6px",
                  backgroundColor: "transparent"
                }}>
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(action.query)}
                      style={{
                        padding: "6px 8px",
                        borderRadius: "10px",
                        backgroundColor: "#ffffff",
                        border: "1px solid rgba(15, 92, 92, 0.08)",
                        color: "#0F5C5C",
                        fontSize: "11px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4px",
                        textAlign: "center",
                        boxShadow: "0 2px 4px rgba(15, 92, 92, 0.03)"
                      }}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>

                {/* Input Area */}
                <div style={{
                  padding: "10px 16px 14px 16px",
                  backgroundColor: "#ffffff",
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  borderTop: "1px solid #f1f5f3"
                }}>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                    placeholder="Ask about foods, reservations..."
                    style={{
                      flex: 1,
                      padding: "8px 16px",
                      borderRadius: "100px",
                      border: "1px solid rgba(15, 92, 92, 0.12)",
                      backgroundColor: "#f8faf9",
                      fontSize: "13px",
                      color: "#1e293b",
                      outline: "none"
                    }}
                  />
                  <button
                    onClick={() => handleSendMessage(inputValue)}
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      backgroundColor: "#114e4e",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      boxShadow: "0 3px 8px rgba(15, 92, 92, 0.15)"
                    }}
                  >
                    🚀
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* MASCOT BUTTONS CONTAINER - ORIGINAL CLOSE LAYOUT */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: isShort ? 0.7 : 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 origin-bottom-right"
          >
            {/* 💬 MESSAGE BUBBLE */}
            <AnimatePresence>
              {isVisible && !isOpen && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                  className="hidden md:block bg-white px-6 py-3 rounded-[24px] shadow-lg max-w-[55vw] sm:max-w-xs border border-[#0F5C5C]/5 mr-2"
                >
                  <p className="text-[13px] text-[#0F5C5C] leading-snug break-words px-2 py-0.5">
                    {displayedText}
                    <span className="animate-pulse ml-[2px]">|</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 👨‍🍳 MASCOT & CLOSE ARROW */}
            <div className="relative">
              
              {/* 🔼 SVG ARROW (SCROLL TO TOP TRIGGER - ORIGINAL CLOSE LAYOUT) */}
              <motion.div
                onClick={handleScrollToTop}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-16 left-1 flex flex-col items-center cursor-pointer z-[100]"
              >
                <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center border border-[#0F5C5C]/10 hover:bg-[#f8faf9] transition-all">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0F5C5C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                </div>
                <div className="w-1.5 h-1.5 bg-[#0F5C5C] rounded-full mt-1 opacity-50" />
              </motion.div>

              {/* mascot face toggle */}
              <motion.div
                onClick={toggleChatbot}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center cursor-pointer hover:scale-105 transition z-50 border border-[#0F5C5C]/5"
              >
                {/* Glow */}
                <div className="absolute inset-0 rounded-full bg-[#EAD7B7] blur-xl opacity-30 -z-10" />

                {/* CHEF SVG */}
                <svg viewBox="0 0 200 200" className="w-[80%] h-[80%]">
                  <g transform="rotate(3, 100, 100)">
                    <path d="M60 200 C 60 110, 140 110, 140 200 Z" fill="#FFF9F2" stroke="#0F5C5C" strokeWidth="5" />
                    <path d="M75 130 C 100 150, 125 130, 125 130 L 115 155 Z" fill="#E76F51" stroke="#0F5C5C" strokeWidth="4" />
                    <circle cx="100" cy="100" r="34" fill="#FFDCA8" stroke="#0F5C5C" strokeWidth="5" />
                    <circle cx="86" cy="95" r="4" fill="#0F5C5C" />
                    <circle cx="114" cy="95" r="4" fill="#0F5C5C" />
                    <path d="M92 110 Q 100 120 108 110" stroke="#0F5C5C" strokeWidth="4" fill="none" />
                    <path d="M68 72 C 45 60, 60 25, 85 35 C 95 5, 130 15, 125 45 C 155 40, 150 75, 132 75 Z" fill="#FFF9F2" stroke="#0F5C5C" strokeWidth="5" />
                  </g>
                </svg>
              </motion.div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ChefMascot;