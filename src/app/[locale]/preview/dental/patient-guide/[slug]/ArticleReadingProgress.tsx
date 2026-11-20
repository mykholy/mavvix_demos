'use client';

import React, { useState, useEffect } from 'react';

export default function ArticleReadingProgress() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setCompletion(
          Number((currentProgress / scrollHeight).toFixed(2)) * 100
        );
      }
    };

    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50">
      <div
        className="h-full bg-[#193A39] transition-all duration-150"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
}

