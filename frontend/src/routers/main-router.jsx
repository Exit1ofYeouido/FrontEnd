// 랜딩 페이지
import LandingPage from "../routes/landingPage/LandingPage";

// 메인 페이지
import HomePage from "../routes/homePage/HomePage";
import UseWayPage from "../routes/homePage/userinfo/UseWay";

//리워드 페이지
import RewardPage from "../routes/rewardPage/rewardLanding/RewardPage";
import VideoPage from "../routes/rewardPage/video/Video";
import ReceiptPage from "../routes/rewardPage/receipt/Receipt";
import ReceiptTutorialPage from "../routes/rewardPage/tutorial/receipt/ReceiptTutorial";
import VideoTutorialPage from "../routes/rewardPage/tutorial/video/VideoTutorial";
import AttendancePage from "../routes/rewardPage/attendance/Attendance";
import CompanyInfoPage from "../routes/rewardPage/companyInfo/CompanyInfo";

// 주식 검색
import StockPage from "../routes/stockPage/StockPage";
import ChartPage from "../routes/stockPage/ChartPage";

// 마이 페이지
import MyPage from "../routes/myPage/MyPage";
import HoldPointPage from "../routes/myPage/HoldPoint";
import HoldStockPage from "../routes/myPage/HoldStock";
import NoticePage from "../routes/myPage/Notice";
import FaqPage from "../routes/myPage/Faq";

// 레이아웃
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
                    {
                        path: "useway",
                        element: <UseWayPage />,
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
                    {
                        path: "info",
                        element: <CompanyInfoPage />,
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
                    {
                        path: "notice",
                        element: <NoticePage />,
                        index: true,
                    },
                    {
                        path: "faq",
                        element: <FaqPage />,
                        index: true,
                    },
                ],
            },
        ],
    },
];

export { mainRouter };
export default mainRouter;
