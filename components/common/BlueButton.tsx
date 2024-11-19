import React from "react";
import Link from "next/link";

type ButtonProps = {
  title: string;
  url: string;
  className?: string;
};

const SolidButton: React.FC<ButtonProps> = ({ title, url, className = "" }) => {
  return (
    <Link
      href={url}
      className={`inline-block px-6 py-3 text-white text-sm font-medium rounded-md bg-[#3A3C71] hover:bg-[#2D2F5E] transition-colors duration-300 ${className}`}
    >
      {title}
    </Link>
  );
};

export default SolidButton;
