import { performanceAtoms } from "@/atoms";
import {
  Button,
  Error,
  Notifications,
  Select,
  SpinnerLoader,
  WidgetHeader,
} from "@/components";
import { performanceManagementSchemas } from "@/schemas";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { usePerformance, useStudent } from "@/hooks";
import { performanceManagementConstants } from "@/constants";

const CreateOrEditPerformanceWidget = () => {
  /**
   * component states
   */
  const {
    globalPerformanceState,
    isEditingPerformanceState,
    showCreateOrEditPerformanceWidgetState,
  } = performanceAtoms;
  const [globalPerformance, setGlobalPerformance] = useRecoilState(
    globalPerformanceState
  );
  const [isEditingPerformance, setIsEditingPerformance] = useRecoilState(
    isEditingPerformanceState
  );
  const setShowCreateOrEditPerformanceWidget = useSetRecoilState(
    showCreateOrEditPerformanceWidgetState
  );

  const { performanceSchema } = performanceManagementSchemas;

  type PerformanceSchema = z.infer<typeof performanceSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PerformanceSchema>({
    resolver: zodResolver(performanceSchema),
  });

  const { students } = useStudent();
  const {
    generateStudentOptions,
    createPerformanceMutateAsync,
    isCreatingPerformance,
    isUpdatingPerformance,
    updatePerformanceMutateAsync,
  } = usePerformance();
  const { assessmentTypes, periods, subjects } = performanceManagementConstants;

  const [selectedStudent, setSelectedStudent] = useState({
    name: "",
    value: "",
  });
  const [selectedAssessmentType, setSelectedAssessmentType] = useState({
    name: "",
    value: "",
  });
  const [selectedAssessmentPeriod, setSelectedAssessmentPeriod] = useState({
    name: "",
    value: "",
  });
  const [selectedAssessmentSubject, setSelectedAssessmentSubject] = useState({
    name: "",
    value: "",
  });

  /**
   * component function
   */
  const onSubmit: SubmitHandler<PerformanceSchema> = ({
    comment,
    marks,
    year,
  }) => {
    // validation
    if (selectedStudent.value == "") {
      Notifications.errorNotification(
        "Select the student you want to create the performance for."
      );

      return;
    }

    if (selectedAssessmentType.value == "") {
      Notifications.errorNotification("Select the assessment type.");

      return;
    }

    if (selectedAssessmentPeriod.value == "") {
      Notifications.errorNotification("Select the assessment period.");

      return;
    }

    if (selectedAssessmentSubject.value == "") {
      Notifications.errorNotification("Select the assessment subject.");

      return;
    }

    isEditingPerformance
      ? updatePerformanceMutateAsync({
          performanceUuid: globalPerformance?.attributes?.uuid,
          studentUuid: selectedStudent?.value,
          performanceUpdateData: {
            comment,
            marks: parseInt(marks),
            period: selectedAssessmentPeriod.value,
            subject: selectedAssessmentSubject.value,
            type: selectedAssessmentType.value,
            year,
          },
        })
      : createPerformanceMutateAsync({
          studentUuid: selectedStudent?.value,
          performanceData: {
            comment,
            marks: parseInt(marks),
            period: selectedAssessmentPeriod.value,
            subject: selectedAssessmentSubject.value,
            type: selectedAssessmentType.value,
            year,
          },
        });
  };

  useEffect(() => {
    if (globalPerformance && isEditingPerformance) {
      reset({
        comment: globalPerformance?.attributes?.comment,
        marks: globalPerformance?.attributes?.marks?.toString(),
        year: globalPerformance?.attributes?.year?.toString(),
      });

      setSelectedStudent({
        name:
          globalPerformance?.relationships?.student?.attributes?.name +
          "[" +
          globalPerformance?.relationships?.student?.attributes?.regNumber +
          "]",
        value: globalPerformance?.relationships?.student?.attributes?.uuid,
      });

      setSelectedAssessmentType({
        name: globalPerformance?.attributes?.type,
        value: globalPerformance?.attributes?.type,
      });

      setSelectedAssessmentPeriod({
        name: globalPerformance?.attributes?.period,
        value: globalPerformance?.attributes?.period,
      });

      setSelectedAssessmentSubject({
        name: globalPerformance?.attributes?.subject,
        value: globalPerformance?.attributes?.subject,
      });
    }
  }, [globalPerformance, reset, isEditingPerformance]);

  return (
    <section>
      {/* header */}
      <WidgetHeader
        close={() => {
          setGlobalPerformance(null);
          setIsEditingPerformance(false);
          setShowCreateOrEditPerformanceWidget(false);
          // clearForm();
        }}
        title={
          !isEditingPerformance
            ? "Add Student Performance."
            : "Update Student Performance."
        }
      />

      {/* body */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 px-2"
      >
        <div className="flex w-full flex-col gap-4 overflow-y-scroll py-3 scrollbar-hide">
          {/* student select */}
          <div className="flex  flex-col gap-y-5  rounded-md border border-primary/10  py-4 px-2">
            <div className="flex items-center gap-2">
              <span className="text-primary">Student</span>
              <Select
                multiple={false}
                options={generateStudentOptions(students)}
                select_wrapper_styles="border border-c_gray/30 rounded-[0.9rem] py-1 w-full"
                select_panel_styles="max-h-[15rem] bg-white border border-dark shadow-md"
                selected={selectedStudent}
                setSelected={setSelectedStudent}
              />
            </div>
          </div>

          {/* assessment type and period */}
          <div className="flex gap-2 rounded-md border border-primary/10 py-4 px-2">
            <div className="flex items-center gap-2 ">
              <span className="text-primary">Type</span>
              <Select
                multiple={false}
                options={assessmentTypes}
                select_wrapper_styles="border border-c_gray/30 rounded-[0.9rem] py-1 w-[11rem]"
                select_panel_styles="max-h-[15rem] bg-white border border-dark shadow-md"
                selected={selectedAssessmentType}
                setSelected={setSelectedAssessmentType}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-primary">Period</span>
              <Select
                multiple={false}
                options={periods}
                select_wrapper_styles="border border-c_gray/30 rounded-[0.9rem] py-1 w-[11rem]"
                select_panel_styles="max-h-[15rem] bg-white border border-dark shadow-md"
                selected={selectedAssessmentPeriod}
                setSelected={setSelectedAssessmentPeriod}
              />
            </div>
          </div>

          {/* assessment year */}
          <div className="flex flex-col gap-y-5 rounded-md border border-primary/10 py-4 px-2">
            <div className="relative">
              <input
                type="number"
                className="input peer"
                placeholder="Year"
                {...register("year", { required: true })}
              />
              <label className="input_label">Year</label>

              {errors["year"] && (
                <Error errorMessage={errors["year"].message} />
              )}
            </div>
          </div>

          {/* subject and marks */}
          <div className="flex gap-2 rounded-md border border-primary/10 py-4 px-2">
            <div className="flex items-center gap-2 ">
              <span className="text-primary">Subject</span>
              <Select
                multiple={false}
                options={subjects}
                select_wrapper_styles="border border-c_gray/30 rounded-[0.9rem] py-1 w-[11rem]"
                select_panel_styles="max-h-[15rem] bg-white border border-dark shadow-md"
                selected={selectedAssessmentSubject}
                setSelected={setSelectedAssessmentSubject}
              />
            </div>

            <div className="relative flex-1">
              <input
                type="number"
                className="input peer"
                placeholder="Marks"
                {...register("marks", { required: true })}
              />
              <label className="input_label">Marks</label>

              {errors["marks"] && (
                <Error errorMessage={errors["marks"].message} />
              )}
            </div>
          </div>

          {/* comment */}
          <div className="flex flex-col gap-y-5 rounded-md border border-primary/10 py-4 px-2">
            <div className="relative">
              <input
                type="text"
                className="input peer"
                placeholder="Comment"
                {...register("comment", { required: true })}
              />
              <label className="input_label">Comment</label>

              {errors["comment"] && (
                <Error errorMessage={errors["comment"].message} />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            title={
              isEditingPerformance ? (
                isUpdatingPerformance ? (
                  <SpinnerLoader color="fill-white" />
                ) : (
                  "Edit"
                )
              ) : isCreatingPerformance ? (
                <SpinnerLoader color="fill-white" />
              ) : (
                "Create"
              )
            }
            intent="primary"
          />
        </div>
      </form>
    </section>
  );
};

export default CreateOrEditPerformanceWidget;
