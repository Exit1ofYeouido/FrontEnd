import LoginSignUp from "../routes/loginPage/LoginSignUp";

const authRouter = [
    {
        path: "/login",
        element: <LoginSignUp />,
    },
];

export { authRouter };
export default authRouter;
