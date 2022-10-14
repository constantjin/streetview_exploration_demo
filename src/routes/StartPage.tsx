export default function StartPage() {
  return (
    <div className="flex flex-col">
      <div className="text-white mb-6">
        <p className="font-bold text-center text-3xl">
          🗺️ Street View Exploration
        </p>
        <p className="text-right text-xl text-gray-500">(Demo)</p>
      </div>

      <hr className="mb-6" />

      <div className="flex items-center mb-1">
        <div className="w-1/3">
          <label className="block text-white font-bold text-left mb-1 mb-0 pr-4">
            Google Map API key
          </label>
        </div>
        <div className="w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500"
            type="text"
            placeholder="Google Map API key"
          />
        </div>
      </div>
      <p className="text-red-400 text-right hover:underline mb-6">
        Delete stored API key
      </p>

      <div className="flex items-center mb-6">
        <div className="w-1/3">
          <label className="block text-white font-bold text-left mb-1 mb-0 pr-4">
            City
          </label>
        </div>
        <div className="w-2/3">
          <select className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500">
            <option value={'New York'}>New York</option>
            <option value={'Boston'}>Boston</option>
            <option value={'Los Angeles'}>Los Angeles</option>
            <option value={'London'}>London</option>
            <option value={'Paris'}>Paris</option>
          </select>
        </div>
      </div>

      <hr className="mb-6" />

      <p className="text-bold text-2xl text-white text-right hover:text-yellow-500">
        » ✈️ Explore
      </p>
    </div>
  );
}
