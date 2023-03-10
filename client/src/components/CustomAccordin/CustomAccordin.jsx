import { useState, useRef } from 'react';

const CustomAccordin = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    setHeight(isOpen ? 0 : contentRef.current.scrollHeight);
  };

  return (
    <div className="border-gray-200 border-[1px] rounded-md py-2 shadow mb-4">
      <div
        className="flex justify-between items-center py-2 px-4 cursor-pointer"
        onClick={toggleAccordion}
      >
        <h2 className="pl-10 text-lg font-medium">{title}</h2>
        <svg
          className={`w-5 h-5 ${isOpen ? 'transform rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414zM10 18a1 1 0 0 1-.707-.293l-7-7a1 1 0 0 1 1.414-1.414L10 15.586l6.293-6.293a1 1 0 0 1 1.414 1.414l-7 7A1 1 0 0 1 10 18z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div
        className="overflow-hidden"
        style={{ maxHeight: `${height}px`, transition: 'max-height 0.5s ease-in-out' }}
        ref={contentRef}
      >
        <div className="px-4 py-2">{children}</div>
      </div>
    </div>
  );
}

export default CustomAccordin;
