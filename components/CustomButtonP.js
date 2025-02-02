const CustomButtonP = ({ text, isButtonValid, onClick }) => {
  // <CustomButtonP text={"확인"} isButtonValid={} onClickEvent={()=>{}} />
  if (onClick) {
    return (
      <button
        className={`h-12 w-full rounded  ${
          !isButtonValid
            ? "bg-[#8728ff] text-white"
            : "bg-[#E9D8FF] text-[#8728ff]"
        }`}
        disabled={isButtonValid}
        onClick={onClick}
      >
        {text}
      </button>
    );
  }
  // <CustomButtonP text={"확인"} isButtonValid={} />
  else {
    return (
      <button
        className={`h-12 w-full rounded  ${
          !isButtonValid
            ? "bg-[#8728ff] text-white"
            : "bg-[#E9D8FF] text-[#8728ff]"
        }`}
        disabled={isButtonValid}
      >
        {text}
      </button>
    );
  }
};
export default CustomButtonP;
