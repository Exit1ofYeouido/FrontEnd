import LoginSignUp from "../routes/login/LoginSignUp";

const authRouter = [
    {
        path: "/login",
        element: <LoginSignUp />,
    },
];

export { authRouter };
export default authRouter;
