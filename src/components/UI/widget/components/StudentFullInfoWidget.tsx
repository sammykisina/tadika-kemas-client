import { studentAtoms } from "@/atoms";
import { Title, WidgetHeader } from "@/components";
import { appUtils } from "@/utils";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

const StudentFullInfoWidget = () => {
  /**
   * component states
   */
  const { globalStudentState, showStudentFullInfoWidgetState } = studentAtoms;
  const [globalStudent, setGlobalStudent] = useRecoilState(globalStudentState);
  const setShowStudentFullInfoWidget = useSetRecoilState(
    showStudentFullInfoWidgetState
  );

  const { generateAvatar } = appUtils;
  console.log("globalStudent", globalStudent);

  /**
   * component functions
   */
  return (
    <section>
      {/* header */}
      <WidgetHeader
        close={() => {
          setGlobalStudent(null);
          setShowStudentFullInfoWidget(false);
        }}
        title="Student Information."
      />

      {/* profile */}
      <div className="mt-2 px-4">
        <Title title="Personal Info" />

        <div className="themeBorder mt-2 border">
          {/* profile */}
          <div className="p-2">
            <div className="flex items-center gap-3">
              {/* image */}
              <img
                src={generateAvatar(globalStudent?.attributes?.email)}
                alt=""
                className="h-[6rem] w-[6rem] rounded-full object-cover"
              />

              <div className="flex flex-col ">
                <span className="first-letter:capitalize">
                  {globalStudent?.attributes?.email}
                </span>

                <div className="flex gap-3">
                  <span className="text-primary/50 first-letter:capitalize">
                    {globalStudent?.attributes?.name}
                  </span>

                  <span className="text-primary/50 first-letter:capitalize">
                    {globalStudent?.attributes?.regNumber}
                  </span>
                </div>

                <div className="flex justify-center">
                  <span className="mt-2 w-fit bg-orange px-4 first-letter:capitalize">
                    {globalStudent?.attributes?.race}
                  </span>

                  <span className="mt-2 w-fit bg-primary px-4 text-white first-letter:capitalize">
                    {globalStudent?.attributes?.age} years old
                  </span>
                </div>

                <span className="mt-2 w-fit  px-4 text-primary/50 first-letter:capitalize">
                  Born In {globalStudent?.attributes?.dateOfBirth}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* school info */}
      <div className="mt-4 px-4">
        <Title title="School Info" />

        <div className="themeBorder mt-2 border">
          <div className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-primary first-letter:capitalize">
                {globalStudent?.attributes?.class}
              </span>

              <span className="text-primary/50 first-letter:capitalize">
                COD: {globalStudent?.attributes?.cob}
              </span>
            </div>

            <span className="mt-2 w-fit  bg-primary px-4 text-white first-letter:capitalize">
              Enrolled In {globalStudent?.attributes?.enrollDate}
            </span>
          </div>
        </div>
      </div>

      {/* parental info */}
      <div className="mt-4 px-4">
        <Title title="Parental Info" />

        <div className="themeBorder mt-2 border">
          <div className="flex justify-between  p-4">
            <div>
              <Title title="Father" />

              <div className="flex items-center gap-2">
                <span className="mt-2 w-fit  pl-4   first-letter:capitalize">
                  {globalStudent?.attributes?.fatherName},
                </span>

                <span className="mt-2 w-fit text-primary/50">
                  {globalStudent?.attributes?.fatherPhone}
                </span>
              </div>
            </div>

            <div>
              <Title title="Mother" />

              <div className="flex items-center gap-2">
                <span className="mt-2 w-fit  pl-4   first-letter:capitalize">
                  {globalStudent?.attributes?.motherName},
                </span>

                <span className="mt-2 w-fit text-primary/50">
                  {globalStudent?.attributes?.motherPhone}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentFullInfoWidget;
