export const getStatusBadge = (status: string) => {
  const statusStyles = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
    APPROVED: "bg-green-100 text-green-800 border-green-200",
    REJECTED: "bg-red-100 text-red-800 border-red-200",
  };
  return `px-3 py-1 rounded-full text-sm font-medium border ${statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800 border-gray-200"}`;
};

export const getRoleBadge = (role: string) => {
  const roleStyles = {
    INPUTTER: "bg-blue-100 text-blue-800",
    APPROVER: "bg-purple-100 text-purple-800",
    AUDITOR: "bg-orange-100 text-orange-800",
  };
  return `px-2 py-1 rounded text-xs font-medium ${roleStyles[role as keyof typeof roleStyles] || "bg-gray-100 text-gray-800"}`;
};
