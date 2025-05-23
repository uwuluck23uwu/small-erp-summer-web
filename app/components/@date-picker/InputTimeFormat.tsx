import { useState, useRef, useEffect } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function InputTimeFormat({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [selectedTime, setSelectedTime] = useState(value || "");

  const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = (i % 4) * 15;
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00`;
  });

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  function handleSelect(time: string) {
    setSelectedTime(time);
    onChange(time);
    setIsOpen(false);
  }

  return (
    <div ref={ref} className="relative w-full">
      <input
        type="text"
        value={selectedTime}
        onClick={() => setIsOpen(!isOpen)}
        readOnly
        className="border rounded px-3 py-2 w-full cursor-pointer"
        placeholder="เลือกเวลา"
      />
      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-[200px] overflow-y-scroll w-full bg-white border rounded shadow">
          {timeOptions.map((time) => (
            <div
              key={time}
              onClick={() => handleSelect(time)}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
            >
              {time}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
