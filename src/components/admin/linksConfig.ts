import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { 
  faTachometerAlt, 
  faChalkboardTeacher, 
  faBook, 
  faClipboard, 
  faUserGraduate, 
  faEnvelope, 
  faUser, 
  faCog,
  faGraduationCap,
  faCalendarAlt,
  faCertificate
} from '@fortawesome/free-solid-svg-icons';

interface LinkConfig {
  to: string;
  icon: IconDefinition;
  label: string;
}

export const linksConfig: Record<'admin' | 'instructor' | 'student', LinkConfig[]> = {
  admin: [
    { to: "/", icon: faTachometerAlt, label: "Dashboard" },
    { to: "/admin/instructors", icon: faChalkboardTeacher, label: "Instructors" },
    { to: "/admin/categories", icon: faBook, label: "Categories" },
    { to: "/admin/users", icon: faBook, label: "users" },
    { to: "/admin/courses", icon: faClipboard, label: "Courses" },
    { to: "/admin/payments", icon: faUserGraduate, label: "payments" },
    { to: "/admin/requests", icon: faEnvelope, label: "Requests" },
    // { to: "/profile", icon: faUser, label: "Profile" },
  ],
  instructor: [
    { to: "/", icon: faTachometerAlt, label: "Dashboard" },
    { to: "/instructor/course", icon: faBook, label: "My Courses" },
    // { to: "/instructor/announcements", icon: faClipboard, label: "Announcements" },
    { to: "/createcourse/uploadtrailer", icon: faClipboard, label: "Assessments" },
    { to: "/instructor/imageUpload", icon: faUserGraduate, label: "My Students" },
    { to: "/instructor/messages", icon: faEnvelope, label: "Messages" },
    { to: "/instructor/settings", icon: faCog, label: "Settings" },
    { to: "/instructor/profile", icon: faUser, label: "Profile" },
  ],
  student: [
    { to: "/student", icon: faTachometerAlt, label: "Dashboard" },
    { to: "/student/courses", icon: faBook, label: "My Courses" },
    { to: "/student/assignments", icon: faClipboard, label: "Exams" },
    // { to: "/student/grades", icon: faGraduationCap, label: "Grades" },
    // { to: "/student/schedule", icon: faCalendarAlt, label: "Schedule" },
    // { to: "/student/certificates", icon: faCertificate, label: "Certificates" },
    { to: "/student/messages", icon: faEnvelope, label: "Messages" },
    { to: "/student/profile", icon: faUser, label: "Profile" },
    // { to: "/student/settings", icon: faCog, label: "Settings" },
  ],
};