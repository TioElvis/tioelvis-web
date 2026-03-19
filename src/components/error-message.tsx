interface Props {
  message: string;
}

export function ErrorMessage({ message }: Props) {
  return (
    <div className="w-full min-h-screen absolute top-0 left-0 grid place-items-center">
      <div className="text-center">
        <p className="text-4xl font-semibold">{message}</p>
      </div>
    </div>
  );
}
