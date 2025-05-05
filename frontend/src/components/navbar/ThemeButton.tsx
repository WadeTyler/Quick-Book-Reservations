"use client";
import React, {useEffect, useState} from 'react';
import {RiMoonFill, RiSunFill} from "@remixicon/react";

const ThemeButton = () => {

  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  function toggleTheme() {
    const isDark = !isDarkMode;
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    setIsDarkMode(isDark);
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const isDark = savedTheme === 'dark';
    setIsDarkMode(isDark);

    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <button
      className="w-8 h-8 rounded-full duration-200 flex items-center justify-center cursor-pointer hover:text-white hover:bg-accent"
      onClick={toggleTheme}
    >
      {isDarkMode ? (
        <RiSunFill />
      ) : (
        <RiMoonFill />
      )}
    </button>
  );
};

export default ThemeButton;