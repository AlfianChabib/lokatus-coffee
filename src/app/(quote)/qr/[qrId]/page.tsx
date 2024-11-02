export default function page({ params }: { params: { qrId: string } }) {
  console.log(params);
  return <div>page</div>;
}
