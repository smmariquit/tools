export function calculateGwa(subjects: { grade: number; units: number }[]): { gwa: number | null; totalUnits: number } {
  if (subjects.length === 0) return { gwa: null, totalUnits: 0 };

  let totalGradePoints = 0;
  let totalUnits = 0;

  for (const sub of subjects) {
    if (sub.units > 0) {
      totalGradePoints += sub.grade * sub.units;
      totalUnits += sub.units;
    }
  }

  if (totalUnits === 0) return { gwa: null, totalUnits: 0 };

  return {
    gwa: totalGradePoints / totalUnits,
    totalUnits,
  };
}

export function calculateTargetAverage(currentUnits: number, currentGwa: number, targetUnits: number, targetGwa: number): number {
  if (targetUnits <= 0) return 0;
  
  // Total grade points desired = targetGwa * (currentUnits + targetUnits)
  const targetTotalPoints = targetGwa * (currentUnits + targetUnits);
  
  // Current grade points = currentGwa * currentUnits
  const currentTotalPoints = currentGwa * currentUnits;
  
  // Needed grade points = targetTotalPoints - currentTotalPoints
  const neededPoints = targetTotalPoints - currentTotalPoints;
  
  // Needed average = neededPoints / targetUnits
  return neededPoints / targetUnits;
}
