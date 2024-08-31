function sortTypeCaseIgnore(rowA, rowB, columnId) {
  const a = (rowA.values[columnId] || "").toLowerCase();
  const b = (rowB.values[columnId] || "").toLowerCase();

  let result = 0;

  if (a < b) {
    result = -1;
  } else if (a > b) {
    result = 1;
  }

  return result;
}

export { sortTypeCaseIgnore };
