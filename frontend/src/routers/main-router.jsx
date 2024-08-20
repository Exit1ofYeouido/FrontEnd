import HomeLayout from "../routes/home/HomeLayout";
import HomePage from "../routes/home/HomePage";
import LandingLayout from "../routes/landing/LandingLayout";
import LandingPage from "../routes/landing/LandingPage";
import MainLayPage from "../routes/Layout";
import MyLayout from "../routes/my/MyLayout";
import MyPage from "../routes/my/MyPage";
import RewardLayout from "../routes/reward/RewardLayout";
import RewardPage from "../routes/reward/RewardPage";
import StockLayout from "../routes/stock/StockLayout";
import StockPage from "../routes/stock/StockPage";

const mainRouter = [
    {
        path: "/",
        element: <MainLayPage />,
        children: [
            {
                path: "",
                element: <LandingLayout />,
                children: [
                    {
                        path: "",
                        element: <LandingPage />,
                        index: true,
                    },
                ],
            },
            {
                path: "home",
                element: <HomeLayout />,
                children: [
                    {
                        path: "",
                        element: <HomePage />,
                        index: true,
                    },
                ],
            },
            {
                path: "reward",
                element: <RewardLayout />,
                children: [
                    {
                        path: "",
                        element: <RewardPage />,
                        index: true,
                    },
                ],
            },
            {
                path: "stock",
                element: <StockLayout />,
                children: [
                    {
                        path: "",
                        element: <StockPage />,
                        index: true,
                    },
                ],
            },
            {
                path: "my",
                element: <MyLayout />,
                children: [
                    {
                        path: "",
                        element: <MyPage />,
                        index: true,
                    },
                ],
            },
        ],
    },
];

export { mainRouter };
export default mainRouter;
