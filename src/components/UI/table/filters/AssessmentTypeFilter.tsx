import React from "react";
import { Filter } from "@/components";

const AssessmentTypeFilter = ({ column }: { column: any }) => {
  return <Filter column={column} label="Type" />;
};

export default AssessmentTypeFilter;
