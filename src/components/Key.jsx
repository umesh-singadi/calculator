function Key({ keyData: { id, value }, setInput }) {
  return (
    <button id={id} onClick={() => setInput((pre) => pre + value)}>
      {value}
    </button>
  );
}

export default Key;
