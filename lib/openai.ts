export async function evaluateDevotion(
  observation: string,
  application: string,
  prayer: string
) {
  // Calculate simple quality score

  let bonus = 0;

  const totalLength =
    observation.length +
    application.length +
    prayer.length;

  if (totalLength > 100) {
    bonus += 3;
  }

  if (totalLength > 200) {
    bonus += 3;
  }

  if (observation.length > 40) {
    bonus += 2;
  }

  if (application.length > 40) {
    bonus += 2;
  }

  // Maximum 10 points
  if (bonus > 10) {
    bonus = 10;
  }

  // Random encouragement messages
  const feedbackOptions = [
    "Thoughtful reflection with meaningful application.",
    "Strong spiritual insight shown in this devotion.",
    "Excellent practical application of scripture.",
    "Your prayer reflects sincerity and faith.",
    "Well-written devotion with clear understanding.",
    "Encouraging depth and consistency in reflection.",
  ];

  const feedback =
    feedbackOptions[
      Math.floor(Math.random() * feedbackOptions.length)
    ];

  return {
    feedback,
    bonus,
  };
}