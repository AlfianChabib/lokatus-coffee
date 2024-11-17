import { redirect } from "next/navigation";

export default function page({ params }: { params: { qrId: string } }) {
  if (params.qrId === process.env.QR_CODE_SECRET) {
    redirect("/passkey");
  } else {
    redirect("/");
  }
}
