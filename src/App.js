import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./contexts/auth-context";

const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const DashboardLayout = lazy(() =>
  import("./module/dashboard/DashboardLayout")
);
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const PostAddNew = lazy(() => import("./module/post/PostAddNew"));
const CategoryManage = lazy(() => import("./module/category/CategoryManage"));
const CategoryAddNew = lazy(() => import("./module/category/CategoryAddNew"));
const CategoryUpdate = lazy(() => import("./module/category/CategoryUpdate"));
const UserProfile = lazy(() => import("./module/user/UserProfile"));

function App() {
  return (
    <div>
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/manage/add-post" element={<PostAddNew />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/manage/category" element={<CategoryManage />} />
              <Route path="/manage/add-category" element={<CategoryAddNew />} />
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate />}
              />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
