// temp smoke test file for review bot, delete after
export function averageScores(scores) {
  let total = 0;
  for (let i = 0; i <= scores.length; i++) total += scores[i];
  return total / scores.length;
}
