import { useState, useEffect, useCallback } from 'react';

const ScrollToBottomButton = ({ containerRef, messages }) => {
  const [showScrollDownBtn, setShowScrollDownBtn] = useState(false);

  const checkIfScrolledUp = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= 100;
    setShowScrollDownBtn(!isAtBottom);
  }, [containerRef, setShowScrollDownBtn]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkIfScrolledUp);

    if (messages.length > 0) {
      if (!showScrollDownBtn) {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      }
    }

    return () => {
      el.removeEventListener('scroll', checkIfScrolledUp);
    };
  }, [messages, showScrollDownBtn, containerRef, checkIfScrolledUp]);

  const scrollToBottom = () => {
    const el = containerRef.current;
    if (!el) return;

    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    setShowScrollDownBtn(false);
  };

  return showScrollDownBtn ? (
    <button
      onClick={scrollToBottom}
      className="items-right justify-center fixed cursor-pointer bottom-3 right-0 z-10 rounded-full bg-blue-500 p-5 text-white shadow-lg hover:bg-blue-600 transition"
      aria-label="Scroll to bottom"
      title="Перейти до останнього повідомлення"
    >
      ↓
    </button>
  ) : null;
};

export default ScrollToBottomButton;