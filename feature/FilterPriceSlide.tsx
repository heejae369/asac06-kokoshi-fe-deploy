import Slider, { range } from "rc-slider";
import "@/styles/CustomSlide.css";

export default function FilterPriceSlide({ slideRange, setSlideRange }) {
  const handleRangeChange = (value) => {
    setSlideRange(value);
  };
  return (
    <>
      <Slider
        range
        min={10000}
        max={300000}
        step={10000}
        defaultValue={[10000, 300000]}
        onChange={handleRangeChange}
        value={slideRange}
        style={{ width: "260px" }}
      />
    </>
  );
}
