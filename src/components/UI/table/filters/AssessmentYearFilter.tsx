import React from "react";
import { Filter } from "@/components";

const AssessmentYear = ({ column }: { column: any }) => {
  return <Filter column={column} label="Year" />;
};

export default AssessmentYear;
