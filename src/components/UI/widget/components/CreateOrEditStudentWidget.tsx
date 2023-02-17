import { studentAtoms } from "@/atoms";
import {
  Button,
  Error,
  Notifications,
  Select,
  SpinnerLoader,
  WidgetHeader,
} from "@/components";
import { studentManagementSchemas } from "@/schemas";
import { appUtils } from "@/utils";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { studentManagementConstants } from "@/constants";
import { Calendar } from "react-date-range";
import { format } from "date-fns";
import { useStudent } from "@/hooks";

const CreateOrEditStudentWidget = () => {
  /**
   * component states
   */
  const {
    globalStudentState,
    isEditingStudentState,
    showCreateOrEditStudentWidgetState,
  } = studentAtoms;
  const [globalStudent, setGlobalStudent] = useRecoilState(globalStudentState);
  const [isEditingStudent, setIsEditingStudent] = useRecoilState(
    isEditingStudentState
  );
  const setShowCreateOrEditStudentWidget = useSetRecoilState(
    showCreateOrEditStudentWidgetState
  );

  const { studentSchema } = studentManagementSchemas;
  type StudentSchema = z.infer<typeof studentSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema),
  });

  const { races, classes } = studentManagementConstants;

  const { generateId } = appUtils;
  const [studentRegId, setStudentRegId] = useState("");
  const [studentCob, setStudentCob] = useState("");
  const [selectedRace, setSelectedRace] = useState({ name: "", value: "" });
  const [selectedClass, setSelectedClass] = useState({ name: "", value: "" });
  const [selectedDateOfBirth, setSelectedDateOfBirth] = useState(new Date());
  const [selectedDateOfEnrollment, setSelectedDateOfEnrollment] = useState(
    new Date()
  );

  const {
    isRegisteringStudent,
    registerStudentMutateAsync,
    isUpdatingStudent,
    updateStudentMutateAsync,
  } = useStudent();

  /**
   * component functions
   */
  const onSubmit: SubmitHandler<StudentSchema> = ({
    email,
    name,
    password,
    address,
    fartherName,
    fartherPhone,
    motherName,
    motherPhone,
  }) => {
    // validation
    if (studentRegId === "") {
      Notifications.errorNotification("Student Reg No is required.");
      return;
    }

    if (studentCob === "") {
      Notifications.errorNotification("Student CoB is required.");
      return;
    }

    if (selectedRace?.value === "") {
      Notifications.errorNotification("Student race is required.");
      return;
    }

    if (selectedClass?.value === "") {
      Notifications.errorNotification("Student class is required.");
      return;
    }

    isEditingStudent
      ? updateStudentMutateAsync({
          studentUuid: globalStudent?.attributes?.uuid,
          studentUpdateData: {
            studentRegId,
            name,
            email,
            password,
            studentCob,
            selectedRace: selectedRace?.value,
            address,
            selectedClass: selectedClass?.value,
            fartherName,
            fartherPhone,
            motherName,
            motherPhone,
            dateOfBirth: format(selectedDateOfBirth, "EE, MMMM d, yyy"),
            dateOfEnrollment: format(
              selectedDateOfEnrollment,
              "EE, MMMM d, yyy"
            ),
          },
        })
      : registerStudentMutateAsync({
          studentRegId,
          name,
          email,
          password,
          studentCob,
          selectedRace: selectedRace?.value,
          address,
          selectedClass: selectedClass?.value,
          fartherName,
          fartherPhone,
          motherName,
          motherPhone,
          dateOfBirth: format(selectedDateOfBirth, "EE, MMMM d, yyy"),
          dateOfEnrollment: format(selectedDateOfEnrollment, "EE, MMMM d, yyy"),
        });
  };

  useEffect(() => {
    if (globalStudent !== null) {
      reset({
        address: globalStudent?.attributes?.address,
        email: globalStudent?.attributes?.email,
        fartherName: globalStudent?.attributes?.fatherName,
        fartherPhone: globalStudent?.attributes?.fatherPhone,
        motherName: globalStudent?.attributes?.motherName,
        motherPhone: globalStudent?.attributes?.motherPhone,
        name: globalStudent?.attributes?.name,
        password: "password",
      });

      setStudentRegId(globalStudent?.attributes?.regNumber);
      setStudentCob(globalStudent?.attributes?.cob);
      setSelectedRace({
        name: globalStudent?.attributes?.race,
        value: globalStudent?.attributes?.race,
      });
      setSelectedClass({
        name: globalStudent?.attributes?.class,
        value: globalStudent?.attributes?.class,
      });

      setSelectedDateOfBirth(new Date(globalStudent?.attributes?.dateOfBirth));
      setSelectedDateOfEnrollment(
        new Date(globalStudent?.attributes?.enrollDate)
      );
    }
  }, [globalStudent, reset]);

  return (
    <section>
      {/* header */}
      <WidgetHeader
        close={() => {
          setGlobalStudent(null);
          setIsEditingStudent(false);
          setShowCreateOrEditStudentWidget(false);
          // clearForm();
        }}
        title={!isEditingStudent ? "Register Student." : "Update Student."}
      />

      {/* body */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-[39rem] flex-col gap-6 overflow-y-scroll px-2"
      >
        <div className="flex w-full flex-col gap-4 overflow-y-scroll py-3 scrollbar-hide">
          {/* student id generation */}
          <div className="flex flex-col gap-y-5 rounded-md border border-primary/10 py-4 px-2">
            <div className="relative">
              <div className="flex items-center">
                <input
                  type="text"
                  className="input peer"
                  placeholder="Student Reg Id"
                  value={studentRegId}
                  onChange={(event) => setStudentRegId(event.target.value)}
                />

                <button
                  className="themeBorder flex h-[38px] items-center justify-center gap-[6px]  whitespace-nowrap bg-primary px-4 py-2 text-[14px] text-white focus:outline-none"
                  type="button"
                  onClick={() => setStudentRegId(generateId())}
                >
                  Generate
                </button>

                <label className="input_label">Student Id</label>
              </div>
            </div>
          </div>

          {/* student name email and password */}
          <div className="flex flex-col gap-y-5 rounded-md border border-primary/10 py-4 px-2">
            <div className="relative">
              <input
                type="text"
                className="input peer"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              <label className="input_label">Name</label>

              {errors["name"] && (
                <Error errorMessage={errors["name"].message} />
              )}
            </div>

            <div className="relative">
              <input
                type="email"
                className="input peer"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              <label className="input_label">Email</label>

              {errors["email"] && (
                <Error errorMessage={errors["email"].message} />
              )}
            </div>

            <div className="relative">
              <input
                type="password"
                className="input peer"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <label className="input_label">Password</label>

              {errors["password"] && (
                <Error errorMessage={errors["password"].message} />
              )}
            </div>
          </div>

          {/* cob , race and address */}
          <div className="flex flex-col gap-y-5 rounded-md border border-primary/10 py-4 px-2">
            <div className="flex items-center justify-between gap-2">
              <div className="relative">
                <div className="flex items-center">
                  <input
                    type="text"
                    className="input peer"
                    placeholder="CoB"
                    value={studentCob}
                    onChange={(event) => setStudentCob(event.target.value)}
                  />

                  <button
                    className="themeBorder flex h-[30px] items-center justify-center gap-[6px] whitespace-nowrap   bg-primary px-4 py-2 text-[14px] text-white focus:outline-none"
                    type="button"
                    onClick={() => setStudentCob(generateId())}
                  >
                    CoB
                  </button>

                  <label className="input_label">CoB</label>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-primary">Race</span>
                <Select
                  multiple={false}
                  options={races}
                  select_wrapper_styles="border border-c_gray/30 rounded-[0.9rem] py-1 w-[10rem]"
                  select_panel_styles="max-h-[15rem] bg-white border border-dark shadow-md"
                  selected={selectedRace}
                  setSelected={setSelectedRace}
                />
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                className="input peer"
                placeholder="Address"
                {...register("address", { required: true })}
              />
              <label className="input_label">Address</label>

              {errors["address"] && (
                <Error errorMessage={errors["address"].message} />
              )}
            </div>
          </div>

          {/* class and date of birth */}
          <div className="flex  flex-col gap-y-5  rounded-md border border-primary/10  py-4 px-2">
            <div className=" flex justify-center  ">
              <span className="text-primary">Date Of Birth</span>
              <Calendar
                date={selectedDateOfBirth}
                maxDate={new Date()}
                onChange={(date) => setSelectedDateOfBirth(date)}
                color="#ff7d55"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-primary">Class</span>
              <Select
                multiple={false}
                options={classes}
                select_wrapper_styles="border border-c_gray/30 rounded-[0.9rem] py-1 w-full"
                select_panel_styles="max-h-[15rem] bg-white border border-dark shadow-md"
                selected={selectedClass}
                setSelected={setSelectedClass}
              />
            </div>
          </div>

          {/* father name and phone */}
          <div className="flex flex-col gap-y-5 rounded-md border border-primary/10 py-4 px-2">
            <div className="relative">
              <input
                type="text"
                className="input peer"
                placeholder="Father Name"
                {...register("fartherName", { required: true })}
              />
              <label className="input_label">Father Name</label>

              {errors["fartherName"] && (
                <Error errorMessage={errors["fartherName"].message} />
              )}
            </div>

            <div className="relative">
              <input
                type="number"
                className="input peer"
                placeholder="Father Phone"
                {...register("fartherPhone", { required: true })}
              />
              <label className="input_label">Father Phone</label>

              {errors["fartherPhone"] && (
                <Error errorMessage={errors["fartherPhone"].message} />
              )}
            </div>
          </div>

          {/* mother name and phone */}
          <div className="flex flex-col gap-y-5 rounded-md border border-primary/10 py-4 px-2">
            <div className="relative">
              <input
                type="text"
                className="input peer"
                placeholder="Mother Name"
                {...register("motherName", { required: true })}
              />
              <label className="input_label">Mother Name</label>

              {errors["motherName"] && (
                <Error errorMessage={errors["motherName"].message} />
              )}
            </div>

            <div className="relative">
              <input
                type="number"
                className="input peer"
                placeholder="Mother Phone"
                {...register("motherPhone", { required: true })}
              />
              <label className="input_label">Mother Phone</label>

              {errors["motherPhone"] && (
                <Error errorMessage={errors["motherPhone"].message} />
              )}
            </div>
          </div>

          {/* enroll date */}
          <div className="flex  flex-col gap-y-5  rounded-md border border-primary/10  py-4 px-2">
            <div className=" flex justify-center  ">
              <span className="text-primary">Date Of Enrollment</span>
              <Calendar
                date={selectedDateOfEnrollment}
                maxDate={new Date()}
                onChange={(date) => setSelectedDateOfEnrollment(date)}
                color="#ff7d55"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            title={
              isEditingStudent ? (
                isUpdatingStudent ? (
                  <SpinnerLoader color="fill-white" />
                ) : (
                  "Edit"
                )
              ) : isRegisteringStudent ? (
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

export default CreateOrEditStudentWidget;
