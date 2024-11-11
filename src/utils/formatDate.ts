import { useIsMobile } from "@/hooks/use-mobile";

export const formatDate = (date: Date) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isMobile = useIsMobile();

  const options: Intl.DateTimeFormatOptions = {
    year: isMobile ? "2-digit" : "numeric",
    month: isMobile ? "2-digit" : "short",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("id-ID", options).format(date);
};
