// Diff linha a linha entre dois textos via LCS (maior subsequência comum).
// Retorna uma lista de { type: "equal" | "add" | "remove", value }.
export function diffLines(a, b) {
  const aLines = String(a).split("\n");
  const bLines = String(b).split("\n");
  const n = aLines.length;
  const m = bLines.length;

  // dp[i][j] = tamanho da LCS de aLines[i..] e bLines[j..]
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] =
        aLines[i] === bLines[j]
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const result = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (aLines[i] === bLines[j]) {
      result.push({ type: "equal", value: aLines[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      result.push({ type: "remove", value: aLines[i] });
      i++;
    } else {
      result.push({ type: "add", value: bLines[j] });
      j++;
    }
  }
  while (i < n) result.push({ type: "remove", value: aLines[i++] });
  while (j < m) result.push({ type: "add", value: bLines[j++] });
  return result;
}
