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
      className={`inline-block px-6 py-3 text-black text-sm font-semibold tracking-wide rounded-md bg-[#ffffff] hover:bg-[#ffffffb6] transition-colors duration-300 ${className}`}
    >
      {title}
    </Link>
  );
};

export default SolidButton;
