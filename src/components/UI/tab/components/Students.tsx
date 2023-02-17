import React from "react";
import {
  TabTitle,
  Button,
  Widget,
  CreateOrEditStudentWidget,
  SpinnerLoader,
  Table,
  StudentFullInfoWidget,
} from "@/components";
import { useRecoilState, useRecoilValue } from "recoil";
import { studentAtoms } from "@/atoms";
import { useStudent } from "@/hooks";

const Students = () => {
  /**
   * component states
   */
  const { showCreateOrEditStudentWidgetState, showStudentFullInfoWidgetState } =
    studentAtoms;
  const [showCreateOrEditStudentWidget, setShowCreateOrEditStudentWidget] =
    useRecoilState(showCreateOrEditStudentWidgetState);
  const showStudentFullInfoWidget = useRecoilValue(
    showStudentFullInfoWidgetState
  );
  const {
    students,
    isFetchingStudents,
    modifyStudentsDataForStudentsTable,
    studentTableColumns,
  } = useStudent();

  return (
    <section className="h-full xs:h-[36rem] lg:h-[39rem]">
      {/* title and creation button */}
      <div className="flex  justify-between">
        <TabTitle title="Students." />

        <Button
          title="Register A Student"
          type="medium"
          intent="primary"
          purpose={() => setShowCreateOrEditStudentWidget(true)}
        />
      </div>

      {/* the  body */}
      <section className="mt-5">
        {isFetchingStudents ? (
          <div className="flex items-center justify-center xs:h-[36rem] lg:h-[39rem]">
            <SpinnerLoader color="fill-primary" />
          </div>
        ) : students?.length > 0 ? (
          <Table
            data={modifyStudentsDataForStudentsTable(students)}
            columns={studentTableColumns}
            show_filters={true}
            table_height="h-[32rem] xs:h-[28rem] lg:h-[31.5rem]"
          />
        ) : (
          <div className="flex h-[32rem] flex-col items-center justify-center gap-3 rounded-[2rem] border xs:h-[26.5rem] lg:h-[31rem]">
            No Students Registered Yet.
          </div>
        )}
      </section>

      <Widget
        widgetState={showCreateOrEditStudentWidget}
        component={<CreateOrEditStudentWidget />}
        widgetStyles="w-[90vw] h-fit"
      />

      <Widget
        widgetState={showStudentFullInfoWidget}
        component={<StudentFullInfoWidget />}
        widgetStyles="w-[90vw] h-fit"
      />
    </section>
  );
};

export default Students;
