import { useEffect, useRef } from "react";

export default function LogoTransparent() {
  const divRef = useRef<HTMLDivElement | null>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) return;
    firstRender.current = false;
    const getBuffer = async () => {
      const res = await fetch("/images/logo-transparent.png");
      const blob = await res.blob();
      const image = new Image(230, 230);
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        image.src = reader.result as string;
        divRef.current?.appendChild(image);
      };
    };
    getBuffer();
  }, []);

  return (
    <div
      ref={divRef}
      className="absolute left-0 top-0 flex w-full items-center justify-center pt-8 opacity-60"
    ></div>
  );
}
