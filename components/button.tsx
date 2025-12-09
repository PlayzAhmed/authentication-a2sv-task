interface Props {
  text: string;
}

export default function Button(props: Props) {
  return (
    <input
      type="submit"
      value={props.text}
      className="border rounded-full w-sm p-2 text-lg bg-indigo-900 border-white text-white hover:cursor-pointer hover:bg-white hover:border-indigo-900 hover:text-indigo-900 transition ease-in-out"
    />
  );
}
