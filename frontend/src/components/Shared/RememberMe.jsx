function RememberMe({ remember, setRemember, className }) {
  return (
    <span className="w-full ml-2 flex items-center gap-3">
      <input
        className={`${className}`}
        type="checkbox"
        id="remember-me"
        value={remember}
        onChange={() => setRemember((prevState) => !prevState)}
      />
      <label className="text-gray-600" htmlFor="remember-me">
        Remember me
      </label>
    </span>
  );
}

export default RememberMe;
