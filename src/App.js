import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./contexts/auth-context";

const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <div>
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/sign-up" element={<SignUpPage />}></Route>
            <Route path="/sign-in" element={<SignInPage />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
