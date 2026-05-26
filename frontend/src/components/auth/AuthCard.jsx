function AuthCard({ title, subtitle, children }) {
  return (
    <div className="
      w-full
      max-w-md
      bg-[#081018cc]
      border
      border-[#00ff9f15]
      rounded-3xl
      p-10
      backdrop-blur-md
      shadow-[0_0_40px_#00ff9f08]
    ">

      <h1 className="text-4xl font-bold text-center mb-4">
        {title}
      </h1>

      <p className="text-gray-400 text-center mb-10 leading-7">
        {subtitle}
      </p>

      {children}

    </div>
  );
}

export default AuthCard;