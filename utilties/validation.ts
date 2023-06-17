export const billValidation = (
  type: "create" | "update",
  balance: number,
  dayDue: number,
  rate: number,
  limit: number,
  amount: number,
  title: string
) => {
  if (type === "create") {
    if (balance !== 0 && !Boolean(balance)) {
      return "Balance is required.";
    }
    if (!Boolean(dayDue)) {
      return "Day due is required.";
    }
    if (rate !== 0 && !Boolean(rate)) {
      return "Interest Rate (rate) is required.";
    }
    if (!Boolean(limit)) {
      return "Credit Limit (limit) is required.";
    }
    if (amount !== 0 && !Boolean(amount)) {
      return "Payment Amount (amount) is required.";
    }
    if (!Boolean(title)) {
      return "Title is required.";
    }
  }
  if (balance < 0) {
    return "Balance must be greater than or equal to 0.";
  }
  if (dayDue < 1 || dayDue > 31) {
    return "Day due must be between 1 and 31.";
  }
  if (balance > limit) {
    return "Balance cannot be greater than credit limit.";
  }
  if (amount < 0) {
    return "Payment amount must be greater than or equal to 0.";
  }
  return "valid";
};
