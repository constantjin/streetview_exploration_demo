interface ICityPickerProps {
  cityList: ICityLatLngPair[];
  className?: string;
}

export default function CityPicker(props: ICityPickerProps) {
  return (
    <div className={`flex flex-row items-center ${props.className}`}>
      <div className="w-1/3">
        <label className="block text-white font-bold text-left mb-1 mb-0 pr-4">
          City
        </label>
      </div>
      <div className="w-2/3">
        <select className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500">
          {props.cityList.map((pair) => (
            <option key={pair.city} value={pair.city}>
              {pair.city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
