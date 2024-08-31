import SignUp from "../routes/loginPageF/SignUp";
import Login from "../routes/loginPageF/SignIn";

const authRouter = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
];

export { authRouter };
export default authRouter;
