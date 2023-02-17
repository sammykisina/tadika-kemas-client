import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useMemo } from "react";
import type { StudentData } from "src/types/typings.t";
import useAuth from "./useAuth";
import { StudentRegistrationAPI } from "@/api";
import { Button, DeleteStudent, Notifications } from "@/components";
import { studentAtoms } from "@/atoms";
import { useSetRecoilState } from "recoil";

const useStudent = () => {
  /**
   * hook states
   */
  const { user } = useAuth();
  const {
    globalStudentState,
    isEditingStudentState,
    showCreateOrEditStudentWidgetState,
    showStudentFullInfoWidgetState,
  } = studentAtoms;
  const setGlobalStudent = useSetRecoilState(globalStudentState);
  const setIsEditingStudent = useSetRecoilState(isEditingStudentState);
  const setShowCreateOrEditStudentWidget = useSetRecoilState(
    showCreateOrEditStudentWidgetState
  );
  const setShowStudentFullInfoWidget = useSetRecoilState(
    showStudentFullInfoWidgetState
  );
  const studentTableColumns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Extra Info",
        columns: [
          {
            Header: "Reg Number",
            accessor: "regNumber",
          },
          {
            Header: "Race",
            accessor: "race",
          },
          {
            Header: "Address",
            accessor: "address",
          },
          {
            Header: "Class",
            accessor: "class",
          },
          {
            Header: "Enroll Date",
            accessor: "enrollDate",
          },
        ],
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );
  const queryClient = useQueryClient();

  /**
   * hook functions
   */
  const { data: students, isLoading: isFetchingStudents } = useQuery({
    queryKey: ["students", user?.role],
    queryFn: async ({ queryKey }) => {
      const [_, role] = queryKey;

      if (role === "admin") {
        return await StudentRegistrationAPI.getAllStudents();
      }

      return [];
    },
  });

  const {
    mutateAsync: registerStudentMutateAsync,
    isLoading: isRegisteringStudent,
  } = useMutation({
    mutationFn: (studentData: StudentData) => {
      return StudentRegistrationAPI.registerStudent(studentData);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      setShowCreateOrEditStudentWidget(false);
      Notifications.successNotification(data.message);
    },
  });

  const {
    mutateAsync: updateStudentMutateAsync,
    isLoading: isUpdatingStudent,
  } = useMutation({
    mutationFn: (data: {
      studentUuid: string;
      studentUpdateData: StudentData;
    }) => {
      return StudentRegistrationAPI.updateStudent(data);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      setGlobalStudent(null);
      setShowCreateOrEditStudentWidget(false);
      setIsEditingStudent(false);
      Notifications.successNotification(data.message);
    },
  });

  const {
    mutateAsync: deleteStudentMutateAsync,
    isLoading: isDeletingStudent,
  } = useMutation({
    mutationFn: (studentUuid: string) => {
      return StudentRegistrationAPI.deleteStudent(studentUuid);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      Notifications.successNotification(data.message);
    },
  });

  const modifyStudentsDataForStudentsTable = (students: any) => {
    let allStudents = [] as any;

    students.map((student: any) => {
      allStudents = [
        ...allStudents,
        {
          name: student?.attributes?.name,
          email: student?.attributes?.email,
          // cob: student?.attributes?.cob,
          race: student?.attributes?.race,
          address: student?.attributes?.email,
          class: student?.attributes?.class,
          // age: student?.attributes?.age,
          regNumber: student?.attributes?.regNumber,
          enrollDate: student?.attributes?.enrollDate,
          actions: (
            <div className="flex items-center gap-2">
              <Button
                title="edit"
                type="small"
                intent="primary"
                purpose={() => {
                  setIsEditingStudent(true);
                  setGlobalStudent(student);
                  setShowCreateOrEditStudentWidget(true);
                }}
              />

              <DeleteStudent studentUuid={student?.attributes?.uuid} />

              <Button
                title="view"
                type="small"
                intent="secondary"
                purpose={() => {
                  setGlobalStudent(student);
                  setShowStudentFullInfoWidget(true);
                }}
              />
            </div>
          ),
        },
      ];
    });

    return allStudents;
  };

  return {
    students,
    isFetchingStudents,
    studentTableColumns,
    modifyStudentsDataForStudentsTable,
    registerStudentMutateAsync,
    isRegisteringStudent,
    deleteStudentMutateAsync,
    isDeletingStudent,
    updateStudentMutateAsync,
    isUpdatingStudent,
  };
};

export default useStudent;
