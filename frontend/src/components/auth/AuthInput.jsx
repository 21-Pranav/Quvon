function AuthInput({
  type,
  placeholder,
  name,
  onChange
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      className="
        w-full
        bg-[#081018]
        border
        border-[#00ff9f15]
        rounded-xl
        px-5
        py-4
        text-white
        outline-none
        focus:border-[#00ff9f60]
        transition-all
        duration-300
      "
    />
  );
}

export default AuthInput;