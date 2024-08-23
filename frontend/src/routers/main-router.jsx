import HomePage from "../routes/home/HomePage";
import LandingPage from "../routes/landing/LandingPage";
import MyPage from "../routes/mypage/MyPage";
import RewardPage from "../routes/reward/RewardPage";
import StockPage from "../routes/stock/StockPage";

import MainLayPage from "../routes/Layout";
import LandingLayout from "../routes/landing/LandingLayout";
import HomeLayout from "../routes/home/HomeLayout";
import RewardLayout from "../routes/reward/RewardLayout";
import StockLayout from "../routes/stock/StockLayout";
import MyLayout from "../routes/mypage/MyLayout";

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
