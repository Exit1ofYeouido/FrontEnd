// 랜딩 페이지
import LandingPage from "../routes/landingPageF/LandingPage";

// 메인 페이지
import HomePage from "../routes/homePageF/HomePage";
import UseWayPage from "../routes/homePageF/userinfoF/UseWay";

//리워드 페이지
import RewardPage from "../routes/rewardPageF/rewardLandingF/RewardPage";
import VideoPage from "../routes/rewardPageF/videoF/Video";
import VideoDetailPage from "../routes/rewardPageF/videoF/VideoDetail";
import ReceiptPage from "../routes/rewardPageF/receiptF/Receipt";
import ReceiptTutorialPage from "../routes/rewardPageF/tutorialF/receiptTutoF/ReceiptTutorial";
import VideoTutorialPage from "../routes/rewardPageF/tutorialF/videoTutoF/VideoTutorial";
import AttendancePage from "../routes/rewardPageF/attendanceF/Attendance";
import CompanyInfoPage from "../routes/rewardPageF/companyInfoF/CompanyInfo";


// 주식 검색
import StockPage from "../routes/stockPageF/StockPage";
import ChartPage from "../routes/stockPageF/ChartPage";

// 마이 페이지
import MyPage from "../routes/myPageF/MyPage";
import HoldPointPage from "../routes/myPageF/HoldPoint";
import HoldStockPage from "../routes/myPageF/HoldStock";
import NoticePage from "../routes/myPageF/Notice";
import FaqPage from "../routes/myPageF/Faq";

// 레이아웃
import MainLayPage from "../routes/Layout";
import LandingLayout from "../routes/landingPageF/LandingLayout";
import HomeLayout from "../routes/homePageF/HomeLayout";
import RewardLayout from "../routes/rewardPageF/RewardLayout";
import StockLayout from "../routes/stockPageF/StockLayout";
import MyLayout from "../routes/myPageF/MyLayout";

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
                        path: "videodetail",
                        element: <VideoDetailPage />,
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
