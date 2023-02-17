import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useMemo } from "react";
import useAuth from "./useAuth";
import { PerformanceAPI } from "@/api";
import {
  AssessmentTypeFilter,
  AssessmentYearFilter,
  Button,
  Notifications,
} from "@/components";
import type { Performance, SelectionOption } from "src/types/typings.t";
import { performanceAtoms } from "@/atoms";
import { useSetRecoilState } from "recoil";

const usePerformance = () => {
  /**
   * hook states
   */
  const { user } = useAuth();
  const performanceTableColumns = useMemo(
    () => [
      {
        Header: "Student Name",
        accessor: "studentName",
      },
      {
        Header: "Student Reg NO",
        accessor: "studentRegNo",
      },
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
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );
  const queryClient = useQueryClient();
  const {
    globalPerformanceState,
    showCreateOrEditPerformanceWidgetState,
    isEditingPerformanceState,
  } = performanceAtoms;
  const setGlobalPerformance = useSetRecoilState(globalPerformanceState);
  const setShowCreateOrEditPerformanceWidget = useSetRecoilState(
    showCreateOrEditPerformanceWidgetState
  );
  const setIsEditingPerformance = useSetRecoilState(isEditingPerformanceState);

  /**
   * hook functions
   */
  const { data: performances, isLoading: isFetchingPerformances } = useQuery({
    queryKey: ["performances", user?.role],
    queryFn: async ({ queryKey }) => {
      const [_, role] = queryKey;

      if (role === "admin") {
        return await PerformanceAPI.getAllPerformances();
      }

      return [];
    },
  });

  const {
    mutateAsync: createPerformanceMutateAsync,
    isLoading: isCreatingPerformance,
  } = useMutation({
    mutationFn: (data: { studentUuid: string; performanceData: Performance }) =>
      PerformanceAPI.createPerformance(data),

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["performances"] });
      setShowCreateOrEditPerformanceWidget(false);
      Notifications.successNotification(data.message);
    },
  });

  const {
    mutateAsync: updatePerformanceMutateAsync,
    isLoading: isUpdatingPerformance,
  } = useMutation({
    mutationFn: (data: {
      studentUuid: string;
      performanceUuid: string;
      performanceUpdateData: Performance;
    }) => PerformanceAPI.updatePerformance(data),

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["performances"] });
      setGlobalPerformance(null);
      setIsEditingPerformance(false);
      setShowCreateOrEditPerformanceWidget(false);
      Notifications.successNotification(data.message);
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
          studentName: performance?.relationships?.student?.attributes?.name,
          studentRegNo:
            performance?.relationships?.student?.attributes?.regNumber,
          actions: (
            <div className="flex items-center gap-2">
              <Button
                title="edit"
                type="small"
                intent="primary"
                purpose={() => {
                  setIsEditingPerformance(true);
                  setGlobalPerformance(performance);
                  setShowCreateOrEditPerformanceWidget(true);
                }}
              />

              {/* <DeleteStudent studentUuid={student?.attributes?.uuid} /> */}
            </div>
          ),
        },
      ];
    });

    return allPerformances;
  };

  const generateStudentOptions = (students: any) => {
    const studentOptions = new Set<SelectionOption>();

    students?.map((student: any) =>
      studentOptions.add({
        name:
          student?.attributes?.name +
          "[" +
          student?.attributes?.regNumber +
          "]",
        value: student?.attributes?.uuid,
      })
    );

    return [...studentOptions?.values()];
  };

  return {
    performances,
    isFetchingPerformances,
    modifyPerformanceDataForPerformanceTable,
    performanceTableColumns,
    generateStudentOptions,
    createPerformanceMutateAsync,
    isCreatingPerformance,
    updatePerformanceMutateAsync,
    isUpdatingPerformance,
  };
};

export default usePerformance;
