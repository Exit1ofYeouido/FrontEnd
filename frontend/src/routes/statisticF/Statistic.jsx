import React, { useState, useEffect } from "react";
import styles from "./Statistic.module.css";
import {
    getStatisticMember,
    getStatisticMemberStock,
    getStatisticStock,
    getAdmin,
} from "~apis/statisticAPI/getStatisticApi";
import BarChartComponent from "./BarChartComponent";
import LineChartComponent from "./LineChartComponent";
import PieChartComponent from "./PieChartComponent";

export default function Statistic() {
    const [selectedOption, setSelectedOption] = useState("memberSearch");
    const [chartType, setChartType] = useState("bar");
    const [memberId, setMemberId] = useState("");
    const [enterpriseName, setEnterpriseName] = useState("");
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
    const [searchHistory, setSearchHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const price = await getAdmin();
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setMemberId("");
        setEnterpriseName("");
        setYear(new Date().getFullYear().toString());
        setMonth((new Date().getMonth() + 1).toString());
        setSearchHistory([]);
        setChartType("bar");
    }, [selectedOption]);

    const handleFetchSearchHistory = async () => {
        try {
            let data;
            if (selectedOption === "memberSearch") {
                data = await getStatisticMember(memberId, year, month);
                setSearchHistory(data);
            } else if (selectedOption === "memberAndEnterpriseSearch") {
                data = await getStatisticMemberStock(
                    memberId,
                    enterpriseName,
                    year,
                    month
                );
                setSearchHistory(data.countResult);
            } else if (selectedOption === "enterpriseSearch") {
                data = await getStatisticStock(enterpriseName, year, month);
                setSearchHistory(data.countResults);
            }
        } catch (error) {
            console.error("Error fetching search history:", error);
        }
    };

    const convertToCSV = (data) => {
        const header = Object.keys(data[0]).join(",") + "\n";
        const rows = data.map((row) => Object.values(row).join(",")).join("\n");
        return header + rows;
    };

    const downloadCSV = () => {
        const csvData = convertToCSV(searchHistory);
        const blob = new Blob([csvData], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `검색로그.${new Date().toISOString()}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const renderChart = () => {
        if (chartType === "bar") {
            return (
                <BarChartComponent
                    data={searchHistory}
                    selectedOption={selectedOption}
                    month={month}
                />
            );
        } else if (chartType === "line") {
            return (
                <LineChartComponent
                    data={searchHistory}
                    selectedOption={selectedOption}
                    month={month}
                />
            );
        } else if (chartType === "pie") {
            return (
                <PieChartComponent
                    data={searchHistory}
                    selectedOption={selectedOption}
                    month={month}
                />
            );
        }
        return null;
    };

    if (loading) {
        return (
            <div className={styles.loadingloading}>
                <img
                    src="https://stock-craft.s3.ap-northeast-2.amazonaws.com/brand_logo/shinhan.svg"
                    className={styles.loading}
                ></img>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.mainText}>검색 기록 통계</h1>

            <div className={styles.toggleGroup}>
                <label>
                    <input
                        type="radio"
                        name="searchType"
                        value="memberSearch"
                        checked={selectedOption === "memberSearch"}
                        onChange={() => setSelectedOption("memberSearch")}
                    />
                    회원 검색량 조회
                </label>
                <label>
                    <input
                        type="radio"
                        name="searchType"
                        value="memberAndEnterpriseSearch"
                        checked={selectedOption === "memberAndEnterpriseSearch"}
                        onChange={() =>
                            setSelectedOption("memberAndEnterpriseSearch")
                        }
                    />
                    회원&기업 검색량 조회
                </label>
                <label>
                    <input
                        type="radio"
                        name="searchType"
                        value="enterpriseSearch"
                        checked={selectedOption === "enterpriseSearch"}
                        onChange={() => setSelectedOption("enterpriseSearch")}
                    />
                    기업 검색량 조회
                </label>
            </div>

            <div className={styles.inputGroup}>
                <label>연도:</label>
                <select
                    className={styles.inputSelect}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                >
                    {Array.from(
                        { length: new Date().getFullYear() - 1999 },
                        (_, i) => {
                            const yearOption = new Date().getFullYear() - i;
                            return (
                                <option key={yearOption} value={yearOption}>
                                    {yearOption}
                                </option>
                            );
                        }
                    )}
                </select>
            </div>

            <div className={styles.inputGroup}>
                <label>월:</label>
                <select
                    className={styles.inputSelect}
                    value={month}
                    onChange={(e) =>
                        setMonth(e.target.value === "" ? "0" : e.target.value)
                    }
                >
                    <option value="">전체</option>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}월
                        </option>
                    ))}
                </select>
            </div>

            {selectedOption === "memberAndEnterpriseSearch" && (
                <>
                    <div className={styles.inputGroup}>
                        <label>회원 ID:</label>
                        <input
                            className={styles.inputField}
                            value={memberId}
                            onChange={(e) => setMemberId(e.target.value)}
                            placeholder="회원 ID를 입력하세요"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>기업 이름:</label>
                        <input
                            className={styles.inputField}
                            value={enterpriseName}
                            onChange={(e) => setEnterpriseName(e.target.value)}
                            placeholder="기업 이름을 입력하세요"
                        />
                    </div>
                </>
            )}

            {selectedOption === "enterpriseSearch" && (
                <div className={styles.inputGroup}>
                    <label>기업 이름:</label>
                    <input
                        className={styles.inputField}
                        value={enterpriseName}
                        onChange={(e) => setEnterpriseName(e.target.value)}
                        placeholder="기업 이름을 입력하세요"
                    />
                </div>
            )}

            {selectedOption === "memberSearch" && (
                <div className={styles.inputGroup}>
                    <label>회원 ID:</label>
                    <input
                        className={styles.inputField}
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        placeholder="회원 ID를 입력하세요"
                    />
                </div>
            )}

            <div className={styles.inputGroup}>
                <button
                    className={styles.fetchButton}
                    onClick={handleFetchSearchHistory}
                >
                    조회
                </button>
            </div>

            <div className={styles.chartButtonGroup}>
                <button
                    className={styles.chartButton}
                    onClick={() => setChartType("bar")}
                >
                    막대 차트
                </button>
                <button
                    className={styles.chartButton}
                    onClick={() => setChartType("line")}
                >
                    라인 차트
                </button>
                <button
                    className={styles.chartButton}
                    onClick={() => setChartType("pie")}
                >
                    파이 차트
                </button>
            </div>

            <div className={styles.chartWrapper}>
                <div className={styles.scrollContainer}>{renderChart()}</div>
            </div>

            <div className={styles.downloadButtonWrapper}>
                <button
                    className={styles.downloadCSVButton}
                    onClick={downloadCSV}
                >
                    CSV로 다운로드
                </button>
            </div>
        </div>
    );
}
