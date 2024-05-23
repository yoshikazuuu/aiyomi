export const Tabs = ({
  setActiveTab,
}: {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleTabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveTab(e.target.id);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex bg-secondary shadow-md p-2 rounded-xl">
        <input
          type="radio"
          id="ID_DESC"
          name="tabs"
          className="hidden"
          defaultChecked
          onChange={handleTabChange} // Add onChange event handler
        />
        <label
          htmlFor="ID_DESC"
          className="flex items-center justify-center z-20 h-12 w-36 text-base font-medium cursor-pointer transition-colors duration-150 ease-in"
        >
          Trending
        </label>
        <input
          type="radio"
          id="POPULARITY_DESC"
          name="tabs"
          className="hidden"
          onChange={handleTabChange} // Add onChange event handler
        />
        <label
          htmlFor="POPULARITY_DESC"
          className="flex items-center justify-center z-20 h-12 w-36 text-base font-medium cursor-pointer transition-colors duration-150 ease-in"
        >
          Popular
        </label>
        <input
          type="radio"
          id="SCORE_DESC"
          name="tabs"
          className="hidden"
          onChange={handleTabChange} // Add onChange event handler
        />
        <label
          htmlFor="SCORE_DESC"
          className="flex items-center justify-center z-20 h-12 w-36 text-base font-medium cursor-pointer transition-colors duration-150 ease-in"
        >
          Top Rated
        </label>
        <span className="glider"></span>
      </div>
    </div>
  );
};
