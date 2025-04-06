function FormInput({ name, type, label }) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend text-white md:text-black">
        {label}
      </legend>
      <input
        type={type}
        className="input w-full"
        name={name}
        placeholder="Type here "
        required
      />
    </fieldset>
  );
}

export default FormInput;
