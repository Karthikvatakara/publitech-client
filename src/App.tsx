import React, { FC, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "./redux/actions/user/userActions";
import { AppState, RootState } from "./redux/store";

// Components and Pages
// import Layout from "./components/Layout"; // Import the new Layout component
import Layout from "./components/admin/Sidebar";
import LandPage from "./pages/landpage/LandPage";
import ApplyToTeach from "./pages/public/ApplyToTeach";
import ApplytoTeachForm from "./pages/public/ApplytoTeachForm";
import ApplySuccess from "./pages/public/ApplySuccess";
import InstructorRequests from "./pages/admin/InstructorRequests";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/user/ForgotPassword";
import ResetPassword from "./pages/user/ResetPassword";
import AdminInstructors from "./pages/admin/AdminInstructors";
import LoadingSpinner from "./components/common/loading/LoadingSpinner";
import First from "./pages/instructor/First";
import InstructorResetPassword from "./pages/instructor/InstructorResetPassword";
import InstructorProfile from "./pages/instructor/InstructorProfile";
import UnderConstruction from "./pages/public/Construction";
import Categories from "./pages/admin/Categories";
import Announcements from "./pages/instructor/Announcements";
import CreateCourse from "./pages/instructor/course/CreateCourse";
import UploadTrailer from "./pages/instructor/course/UploadTrailer";
import UploadLessons from "./pages/instructor/course/UploadLessons";
import CourseListing from "./pages/instructor/course/CourseListing";
import CourseDetailPage from "./pages/instructor/course/CourseDetailPage";
import EditCourse from "./pages/instructor/course/EditCourse";
import EditTrailer from "./pages/instructor/course/EditTrailer";
import EditLessons from "./pages/instructor/course/EditLessons";
import CourseApproval from "./pages/admin/CourseApproval";
import CourseDetailsAdmin from "./pages/admin/CourseDetailsAdmin";
import CourseListingUser from "./pages/user/CourseListingUser";
import UserCourseDetailPage from "./pages/user/UserCourseDetailPage";
import UserDashBoard from "./pages/user/profile/UserDashBoard";
import UserSuccessPage from "./pages/user/UserSuccesPage";
import FailurePage from "./pages/user/UserFailurePage";
import UserCourseList from "./pages/user/profile/UserCourseList";
import UserEnrollmentCourseDetail from "./pages/user/course/UserEnrollmentCourseDetail";
import CoursePreview from "./pages/user/course/CoursePreview";
import InstructorChat from "./pages/instructor/chat/InstructorChat";
import ChatSubscriptionPage from "./pages/instructor/chat/ChatSubscriptionPage";
import UserSubscriptionSuccessPage from "./pages/user/UserSubscriptionSuccessPage";
import UsersList from "./pages/admin/UsersList";
import AdminPayments from "./pages/admin/payments/AdminPayments";
import UserPayment from "./pages/user/UserPayment";
import InstructorExamHome from "./pages/user/exams/InstructorExamHome";
import ExamCreate from "./pages/user/exams/ExamCreate";
import QuestionCreate from "./pages/user/exams/QuestionCreate";
import ExamUserPage from "./pages/user/exams/ExamUserPage";
import ExamResultPage from "./pages/user/exams/ExamResultPage";
import ExamsUser from "./pages/user/exams/ExamsUser";

const App: FC = () => {
  const { user, loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppState>();

  useEffect(() => {
    console.log("🚀 ~ userstate:", user);
    if (!user) {
      dispatch(getUserData());
    }
  }, [dispatch, user]);

  const ProtectedRoute: FC<{
    element: React.ReactElement;
    allowedRoles: string[];
  }> = ({ element, allowedRoles }) => {
    if (!user) {
      return <Navigate to="/" />;
    }
    // console.log(user,"//////////????????????????<<<<<<<<<<")
    if (allowedRoles.includes(user.role)&& !user.isBlocked) {
      console.log(user.role, "userrole");
      return element;
    }

    return <Navigate to="/unauthorized" />;
  };

  

  return (
    <Router>
      {/* {loading && <LoadingSpinner />} */}
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin" />
              ) : user.role === "instructor" ? (
                <Navigate to="/instructor" />
              ) : (
                <LandPage />
              )
            ) : (
              <LandPage />
            )
          }
        />

        {/* AUTH PAGES */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/change-password" element={<ResetPassword />} />

        {/* GENERAL PAGES */}
        <Route path="/apply" element={!user ? <Login /> : <ApplyToTeach />} />
        <Route path="/apply-to-teach" element={<ApplytoTeachForm />} />
        <Route path="/apply-success" element={<ApplySuccess />} />
        <Route path="courses">
            <Route index element={<CourseListingUser/>}/>
            <Route path=":courseId" element={<UserCourseDetailPage/>}/>
            <Route path="paymentSuccess" element={<UserSuccessPage/>} />
            <Route path="paymentFailure" element={<FailurePage/>}/>
          </Route>
       <Route path="subscription" element={<UserSubscriptionSuccessPage/>}/>


        {/* ADMIN PAGES */}
        <Route
          path="admin"
          element={
            <ProtectedRoute
              element={<Layout role="admin" />}
              allowedRoles={["admin"]}
            />
          }
        >
          <Route path="instructors" element={<AdminInstructors />} />
          <Route path="requests" element={<InstructorRequests />} />
          <Route path="construction" element={<UnderConstruction />} />
          <Route path="categories" element={<Categories />} />
          <Route path="users" element={<UsersList/>}/>
          <Route path="payments" element={<AdminPayments/>}/>
          <Route path="courses" >
            <Route index element={<CourseApproval/>}/>
            <Route path="details/:courseId" element={<CourseDetailsAdmin/>}/>
          </Route>
        </Route>

        {/* INSTRUCTOR PAGES */}
        <Route
          path="instructor"
          element={
            <ProtectedRoute
              element={<Layout role="instructor" />}
              allowedRoles={["instructor"]}
            />
          }
        >
          <Route path="first" element={<First />} />
          <Route path="settings" element={<InstructorResetPassword />} />
          <Route path="profile" element={<InstructorProfile />} />
          <Route path="construction" element={<UnderConstruction />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="course">
            <Route index element={<CourseListing/>}/>
            <Route path=":courseId" element={<CourseDetailPage/>}/>
            <Route path="edit/:id" element={<EditCourse/>}/>
            <Route path="edittrailer/:id" element={<EditTrailer/>}/>
            <Route path="editlesson/:id" element={<EditLessons/>}/>
          </Route>
          <Route path="createcourse">
            <Route index element={<CreateCourse />} />
            <Route path="uploadtrailer/*" element={<UploadTrailer />} />
            <Route path="uploadlessons" element={<UploadLessons/>}/>
          </Route>
          <Route  path="messages" element={<InstructorChat/>}/>
          <Route path="exams" element={<InstructorExamHome/>}/>
          <Route path="exams/create" element={<ExamCreate/>}/>
          <Route path="exams/edit/:examId" element={<ExamCreate/>}/>
          <Route path="exams/create/question" element={<QuestionCreate/>}/>
          <Route path="exams/create/question/:examId" element={<QuestionCreate/>}/>
        </Route>

        {/* STUDENT PAGES */}
        <Route
          path="student"
          element={
            <ProtectedRoute
              element={<Layout role="student" />}
              allowedRoles={["student"]}
            />
          }
        >
          <Route index element={<UserDashBoard />} />
          <Route path="courses">
            <Route index element={<UserCourseList />}/>
            <Route path=":courseId" element={<UserEnrollmentCourseDetail/>}/>
            <Route path="preview/:courseId" element={<CoursePreview/>}/>
          </Route>
          <Route path="profile" element={<InstructorProfile/>}/>
          <Route path="messages" element={<InstructorChat/>}/>
          <Route path="subscription/:chatId" element={<ChatSubscriptionPage/>}/>
          <Route path="payments" element={<UserPayment/>}/>
          <Route path="exams" element={<ExamsUser/>}/>
          <Route path="exams/:examId" element={<ExamUserPage/>}/>
          <Route path="exam-result/:resultId" element={<ExamResultPage/>}/>
          {/* Add other student routes here */}
        </Route>

        {/* DEFAULT REDIRECT FOR UNKNOWN ROUTES */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;