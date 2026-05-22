// components/Card.tsx
import React from "react";

type CardProps = {
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
};

export const Card = ({ title, description, children, className = "" }: CardProps) => {
  return (
    <div
      className={`bg-[#FFFFFF] shadow-md rounded-md p-[24.75px] !pb-[0.75px] w-[280px] h-[194px]
        border border-gray-[0.75px] hover:shadow-lg transition ${className}`}
    >
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      {description && (
        <p className="text-sm text-gray-500 mb-3">{description}</p>
      )}

      {children}
    </div>
  );
};
export const MediumCard = ({ title, description, children, className = "" }: CardProps) => {
  return (
    <div
      className={`bg-[#FFFFFF] shadow-md rounded-md p-[16px] w-[557px] h-[347px]
        border border-gray-[0.75px] hover:shadow-lg transition ${className}`}
    >
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      {description && (
        <p className="text-sm text-gray-500 mb-3">{description}</p>
      )}

      {children}
    </div>
  );
};
export const BigCard = ({ title, description, children, className = "" }: CardProps) => {
  return (
    <div
      className={`bg-[#FFFFFF] shadow-md rounded-md p-[16px] w-[1114px] h-[299px]
        border border-gray-[0.75px] hover:shadow-lg transition ${className}`}
    >
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      {description && (
        <p className="text-sm text-gray-500 mb-3">{description}</p>
      )}

      {children}
    </div>
  );
};
