interface ILabeledInputProps {
  label: string;
  type: string;
  placeholder: string;
  className?: string;
  value?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function LabeledInput(props: ILabeledInputProps) {
  return (
    <div className={`flex flex-row items-center ${props.className}`}>
      <div className="w-1/3">
        <label className="block text-white font-bold text-left mb-1 mb-0 pr-4">
          {props.label}
        </label>
      </div>
      <div className="w-2/3">
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500"
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}
