import { useState } from "react";

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Get Telegram bot username from environment or use default
  const botUsername =
    import.meta.env.VITE_TELEGRAM_BOT_USERNAME || "Gymshark_ai_bot";
  const telegramBotUrl = `https://t.me/${botUsername}`;

  if (!isVisible) return null;

  return (
    <div className="bg-gray-100 text-xs text-center py-2 px-4 flex justify-between items-center border-b border-gray-200">
      <span className="flex-1 text-center font-medium flex items-center justify-center gap-2">
        <span className="material-symbols-outlined">robot_2</span>

        <a
          href={telegramBotUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-blue-600 font-semibold"
        >
          Try out our Telegram bot →
        </a>
      </span>
      <button
        onClick={() => setIsVisible(false)}
        className="text-gray-500 hover:text-gray-800"
      >
        <span className="material-icons-outlined text-sm">close</span>
      </button>
    </div>
  );
}
