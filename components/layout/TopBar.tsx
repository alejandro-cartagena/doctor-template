import { siteConfig } from "@/config/site";

const DAY_KEYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

type DayKey = (typeof DAY_KEYS)[number];

const DAY_LABELS: Record<number, string> = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

function getTodayInfo(): { label: string; hours: string } {
  const dayIndex = new Date().getDay();
  const dayKey = DAY_KEYS[dayIndex] as DayKey;
  return {
    label: DAY_LABELS[dayIndex],
    hours: siteConfig.hours[dayKey],
  };
}

export default function TopBar() {
  const { address, branding } = siteConfig;
  const { colors } = branding;
  const location = `${address.city}, ${address.state}`;
  const { label: dayLabel, hours: todayHours } = getTodayInfo();

  return (
    <div
      className="fixed inset-x-0 top-0 z-60 h-9"
      style={{ backgroundColor: colors.accent.primary }}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center gap-1.5"
          style={{ color: colors.text.inverse }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-3.5 w-3.5 shrink-0"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.556 6.324 3.5 8.327a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xs font-medium">{location}</span>
        </div>

        <div
          className="flex items-center gap-1.5"
          style={{ color: colors.text.inverse }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-3.5 w-3.5 shrink-0"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xs font-medium">
            {dayLabel}: {todayHours}
          </span>
        </div>
      </div>
    </div>
  );
}
