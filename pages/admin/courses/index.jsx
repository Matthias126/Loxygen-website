import CourseListPage from "@/components/admin/CourseListPage";

export default function AdminCoursesList() {
  return (
    <CourseListPage
      pageTitle="Courses"
      heading="Courses"
      newHref="/admin/courses/new"
      newLabel="New course"
      emptyMessage="No courses yet."
      filterCourses={(course) => course.type !== "micro-learning"}
    />
  );
}
