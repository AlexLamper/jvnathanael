import React from "react";
import Link from "next/link";

type ButtonProps = {
  title: string;
  url: string;
  className?: string;
};

const OutlineButton: React.FC<ButtonProps> = ({ title, url, className = "" }) => {
  return (
    <Link
      href={url}
      className={`inline-block px-6 py-3 text-[#3A3C71] text-sm font-medium rounded-md border border-[#3A3C71] hover:bg-[#3A3C71] hover:text-white transition-all duration-300 ${className}`}
    >
      {title}
    </Link>
  );
};

export default OutlineButton;
