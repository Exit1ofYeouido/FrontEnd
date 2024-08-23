import HomePage from "../routes/homePage/HomePage";
import LandingPage from "../routes/landingPage/LandingPage";
import MyPage from "../routes/myPage/MyPage";
import RewardPage from "../routes/rewardPage/RewardPage";
import StockPage from "../routes/stockPage/StockPage";
import ChartPage from "../routes/stockPage/ChartPage";
import HoldPointPage from "../routes/myPage/HoldPoint";
import HoldStockPage from "../routes/myPage/HoldStock";
import VideoPage from "../routes/rewardPage/Video";
import ReceiptPage from "../routes/rewardPage/Receipt";
import ReceiptTutorialPage from "../routes/rewardPage/ReceiptTutorial";
import VideoTutorialPage from "../routes/rewardPage/VideoTutorial";
import AttendancePage from "../routes/rewardPage/Attendance";

import MainLayPage from "../routes/Layout";
import LandingLayout from "../routes/landingPage/LandingLayout";
import HomeLayout from "../routes/homePage/HomeLayout";
import RewardLayout from "../routes/rewardPage/RewardLayout";
import StockLayout from "../routes/stockPage/StockLayout";
import MyLayout from "../routes/myPage/MyLayout";

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
                    {
                        path: "video",
                        element: <VideoPage />,
                        index: true,
                    },
                    {
                        path: "receipt",
                        element: <ReceiptPage />,
                        index: true,
                    },
                    {
                        path: "videotutorial",
                        element: <VideoTutorialPage />,
                        index: true,
                    },
                    {
                        path: "receipttutorial",
                        element: <ReceiptTutorialPage />,
                        index: true,
                    },
                    {
                        path: "attendance",
                        element: <AttendancePage />,
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
                    {
                        path: "chart",
                        element: <ChartPage />,
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
                    {
                        path: "stock",
                        element: <HoldStockPage />,
                        index: true,
                    },
                    {
                        path: "point",
                        element: <HoldPointPage />,
                        index: true,
                    },
                ],
            },
        ],
    },
];

export { mainRouter };
export default mainRouter;
