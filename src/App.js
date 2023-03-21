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
const PostDetailsPage = lazy(() => import("./pages/PostDetailsPage"));
const PostManage = lazy(() => import("./module/post/PostManage"));
const PostAddNew = lazy(() => import("./module/post/PostAddNew"));
const PostUpdate = lazy(() => import("./module/post/PostUpdate"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const CategoryManage = lazy(() => import("./module/category/CategoryManage"));
const CategoryAddNew = lazy(() => import("./module/category/CategoryAddNew"));
const CategoryUpdate = lazy(() => import("./module/category/CategoryUpdate"));
const UserManage = lazy(() => import("./module/user/UserManage"));
const UserAddNew = lazy(() => import("./module/user/UserAddNew"));
const UserUpdate = lazy(() => import("./module/user/UserUpdate"));
const UserProfile = lazy(() => import("./module/user/UserProfile"));

function App() {
  return (
    <AuthProvider>
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/:slug" element={<PostDetailsPage />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/manage/posts" element={<PostManage />} />
            <Route path="/manage/add-post" element={<PostAddNew />} />
            <Route path="/manage/update-post" element={<PostUpdate />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/manage/category" element={<CategoryManage />} />
            <Route path="/manage/add-category" element={<CategoryAddNew />} />
            <Route
              path="/manage/update-category"
              element={<CategoryUpdate />}
            />
            <Route path="/manage/user" element={<UserManage />} />
            <Route path="/manage/add-user" element={<UserAddNew />} />
            <Route path="/manage/update-user" element={<UserUpdate />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
