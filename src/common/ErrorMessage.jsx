export default function ErrorMessage({ message }) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="ml-3">
        <div className="text-ssignm font-medium text-red-700">{message}</div>
      </div>
    </div>
  );
}
