import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import Home from "../components/Home/Home";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import ProtectedRoute from "./protectedRoutes";
import AddHabit from "../components/AddHabit/AddHabit";
import MyHabit from "../components/MyHabit/MyHabit";
import PublicHabit from "../components/PublicHabit/PublicHabit";
import HabitDetails from "../components/HabitDetails/HabitDetails";
import UpdateHabit from "../components/UpdateHabit/UpdateHbit";
import TermsAndConditions from "../components/TermsCondition/TermsAndCondition";
import PrivacyPolicy from "../components/PrivacyPolicy/PrivacyPolicy";






const router = createBrowserRouter([
    {
        path:'/',
        Component: HomeLayout,
        children:[
            {
                path:'/',
                Component: Home
            },
            {
                path:'/register',
                Component:Register
            },
            {
                path:'/login',
                Component: Login
            },
            
            {
                path:'/addHabit',
                 Component: () => (
                <ProtectedRoute>
                    <AddHabit />
                </ProtectedRoute>
                )
            },
            {
                path: '/myHabits',
                 Component: () => (
                <ProtectedRoute>
                    <MyHabit />
                </ProtectedRoute>
                 )
            },
            {
                path: '/browsePublicHabits',
                Component: PublicHabit
            },
            {
            path: "/habit-details/:id",
            element: (
                <ProtectedRoute>
                <HabitDetails />
                </ProtectedRoute>
            ),
            },
            {
                path: "/updatehabit/:id",
                 Component: () => (
                <ProtectedRoute>
                    <UpdateHabit></UpdateHabit>
                </ProtectedRoute>
                 )
            },
            {
                path: "/termsAndCondition",
                Component: TermsAndConditions
            },
            {
                path:"/privacyPolicy",
                Component: PrivacyPolicy
            }
        ]
    },

    {
        path:'/*',
        Component: ErrorPage
    }
])


export default router;