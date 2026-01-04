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
import Profile from "../components/Profile/Profile";
import Dashboard from "../Dashboard/Dashboard";
import UserDirectory from "../Dashboard/AdminUserDirectory";
import GlobalAnalytics from "../Dashboard/AdminGlobalAnalytics";
import SystemLogs from "../Dashboard/SystemLog";
import AllHabits from "../Dashboard/AdminAllHabits";
import TourHabituo from "../components/Tour Habituo/TourHabituo";
import ContactUs from "../components/Contact Us/ContactUs";







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
                path:'/tour-habituo',
                Component: TourHabituo
            },
             {
                path:'/contact',
                Component: ContactUs
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
                path: '/browsePublicHabits',
                Component: PublicHabit
            },
            {
            path: "/habit-details/:id",
            element: (
               
                <HabitDetails />
               
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
                path:'/dashboard',
                Component: ()=>(
                    <ProtectedRoute>
                        <Dashboard></Dashboard>
                    </ProtectedRoute>
                ),
                children: [
                    {
                path:'/dashboard/profile',
                Component: ()=>(
                    <ProtectedRoute>
                        <Profile></Profile>
                    </ProtectedRoute>
                )
            },
                    {
                        path:'/dashboard/user-directory',
                        Component: ()=>(
                            <ProtectedRoute>
                                <UserDirectory></UserDirectory>
                            </ProtectedRoute>
                        )
                    },
                    {
                         path:'/dashboard/global-analytics',
                        Component: ()=>(
                            <ProtectedRoute>
                                <GlobalAnalytics></GlobalAnalytics>
                            </ProtectedRoute>
                        )
                    },
                    {
                        path:'/dashboard/system-log',
                        Component: ()=> (
                            <ProtectedRoute>
                                <SystemLogs></SystemLogs>
                            </ProtectedRoute>
                        )
                    },
                    {
                        path:'/dashboard/all-habits',
                        Component: ()=> (
                            <ProtectedRoute>
                               <AllHabits></AllHabits>
                            </ProtectedRoute>
                        )
                    },
                    {
                path:'/dashboard/addHabit',
                 Component: () => (
                <ProtectedRoute>
                    <AddHabit />
                </ProtectedRoute>
                )
            },
            {
                path: '/dashboard/myHabits',
                 Component: () => (
                <ProtectedRoute>
                    <MyHabit />
                </ProtectedRoute>
                 )
            },
                ]
            },
           
    {
        path:'/*',
        Component: ErrorPage
    }
])


export default router;