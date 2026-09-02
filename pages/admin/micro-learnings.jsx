import CourseListPage from "@/components/admin/CourseListPage";

export default function AdminMicroLearnings() {
  return (
    <CourseListPage
      pageTitle="Micro-learnings"
      heading="Micro-learnings"
      newHref="/admin/courses/new?type=micro-learning"
      newLabel="New lesson"
      emptyMessage="No micro-learning lessons yet."
      filterCourses={(course) => course.type === "micro-learning"}
    />
  );
}
