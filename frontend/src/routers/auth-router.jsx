import LoginSignUp from "../routes/loginPageF/LoginSignUp";

const authRouter = [
    {
        path: "/login",
        element: <LoginSignUp />,
    },
];

export { authRouter };
export default authRouter;
