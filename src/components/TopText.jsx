import TechText from "./TechText";

const TopText = () => {
  return (
    <div className="w-full h-32 flex justify-center items-center px-4">
      <TechText
        text="Screen Art"
        fontSize={100}
        color="#111827"
        accentColor="#16a34a"
        sweep={true}
        labels={false}
        selection={false}
        draggable={false}
        clickKick={false}
        className="w-full h-full"
      />
    </div>
  );
};

export default TopText;
