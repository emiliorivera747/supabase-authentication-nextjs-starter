import React from "react";
import zxcvbn from "zxcvbn";

function PasswordStrengthChecker({ password }: { password: string }) {

  if (!password) {
    return null;
  }
  const result = zxcvbn(password);
  const strengthScore = result.score; // 0-4, 4 being the strongest
  const feedback = result.feedback.warning; // Get warning messages

  // Map score to a strength label
  const strengthLabel = ["Weak", "Fair", "Good", "Strong", "Very Strong"][
    strengthScore
  ];
  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];

  return (
    <div className="text-[0.8rem] mb-2 ">
      <div className="flex flex-col items-start">
        <p className="text-[#343a40]">Password strength: {strengthLabel}</p>
        {feedback && <p className="mb-1 text-xs text-[#495057] font-light">{feedback}</p>}
      </div>
      <div className="w-full bg-gray-300 h-2 rounded mt-1">
        <div
          className={`h-2 rounded ${strengthColors[strengthScore]}`}
          style={{ width: `${(strengthScore + 1) * 20}%` }}
        ></div>
      </div>
    </div>
  );
}

export default PasswordStrengthChecker;
