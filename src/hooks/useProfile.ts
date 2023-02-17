import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { AuthAPI } from "@/api";
import { useMemo } from "react";
import { AssessmentTypeFilter, AssessmentYearFilter } from "@/components";

const useProfile = () => {
  /**
   * hook states
   */
  const { user } = useAuth();
  const performanceTableColumns = useMemo(
    () => [
      {
        Header: "Type",
        accessor: "type",
        Filter: AssessmentTypeFilter,
        filter: "include",
      },
      {
        Header: "Period",
        accessor: "period",
      },
      {
        Header: "Year",
        accessor: "year",
        Filter: AssessmentYearFilter,
        filter: "include",
      },
      {
        Header: "Subject",
        accessor: "subject",
      },
      {
        Header: "Marks",
        accessor: "marks",
      },
      {
        Header: "Comment",
        accessor: "comment",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  /**
   * hook functions
   */
  const { data: profile, isLoading: isFetchingProfile } = useQuery({
    queryKey: ["profile", user?.role],
    queryFn: async ({ queryKey }) => {
      const [_, role] = queryKey;

      if (role === "student") {
        return await AuthAPI.profile({ email: user?.email || "" });
      }

      return null;
    },
  });

  const modifyPerformanceDataForPerformanceTable = (performances: any) => {
    let allPerformances = [] as any;

    performances.map((performance: any) => {
      allPerformances = [
        ...allPerformances,
        {
          type: performance?.attributes?.type,
          period: performance?.attributes?.period,
          year: performance?.attributes?.year,
          subject: performance?.attributes?.subject,
          marks:
            performance?.attributes?.marks +
            "/" +
            performance?.attributes?.totalAwarding,
          status: performance?.attributes?.status,
          comment: performance?.attributes?.comment,
        },
      ];
    });

    return allPerformances;
  };

  return {
    profile,
    isFetchingProfile,
    performanceTableColumns,
    modifyPerformanceDataForPerformanceTable,
  };
};

export default useProfile;
