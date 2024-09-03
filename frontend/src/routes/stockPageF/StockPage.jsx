import React, { useState, useEffect, useRef } from "react";
import styles from "./StockPage.module.css";
import { motion } from "framer-motion";
import stockData from "./stocks.json";
import { IoMdSearch } from "react-icons/io";

export default function StockPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const suggestionRefs = useRef([]);
    const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(true);

    const stocks = [
        { name: "이엠텍", code: "00800", change: "▲5,000", price: "80000원" },
        { name: "이엠텍", code: "00800", change: "▲5,000", price: "80000원" },
        { name: "이엠텍", code: "00800", change: "▲5,000", price: "80000원" },
        { name: "이엠텍", code: "00800", change: "▲5,000", price: "80000원" },
        { name: "이엠텍", code: "00800", change: "▲5,000", price: "80000원" },
    ];

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value) {
            const filteredSuggestions = stockData.filter(
                (stock) =>
                    stock.stock_name
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    stock.stock_id.includes(value)
            );
            setSuggestions(filteredSuggestions);
            setSelectedIndex(-1);
            setIsSuggestionsVisible(true);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.stock_name);
        setSuggestions([]);
        setSelectedIndex(-1);
        setIsSuggestionsVisible(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            setSelectedIndex((prevIndex) =>
                Math.min(prevIndex + 1, suggestions.length - 1)
            );
        } else if (e.key === "ArrowUp") {
            setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (e.key === "Enter") {
            if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                handleSuggestionClick(suggestions[selectedIndex]);
            }
        }
    };

    const handleBlur = () => {
        setIsSuggestionsVisible(false);
    };

    const handleFocus = () => {
        if (searchTerm && suggestions.length > 0) {
            setIsSuggestionsVisible(true);
            setTimeout(() => {
                if (
                    selectedIndex >= 0 &&
                    suggestionRefs.current[selectedIndex]
                ) {
                    suggestionRefs.current[selectedIndex].scrollIntoView({
                        block: "start",
                        inline: "nearest",
                    });
                }
            }, 0);
        }
    };

    useEffect(() => {
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
            setSearchTerm(suggestions[selectedIndex].stock_name);
            suggestionRefs.current[selectedIndex]?.scrollIntoView({
                block: "nearest",
            });
        }
    }, [selectedIndex, suggestions]);

    return (
        <motion.div
            key="stock-page"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <div className={styles.container}>
                <div className={styles.topBar}>
                    <div>종목 검색</div>
                </div>
                <div className={styles.searchsearch}>
                    {/* <IoMdSearch className={styles.searchIcon}/> */}
                    <div className={styles.searchContainer}>
                        <div className={styles.search} onBlur={handleBlur}>
                            <input
                                type="text"
                                placeholder="종목 검색"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                                onFocus={handleFocus}
                                className={styles.searchInput}
                            />
                            {suggestions.length > 0 && isSuggestionsVisible && (
                                <div className={styles.suggestions}>
                                    {suggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            ref={(el) =>
                                                (suggestionRefs.current[index] =
                                                    el)
                                            }
                                            className={`${
                                                styles.suggestionItem
                                            } ${
                                                index === selectedIndex
                                                    ? styles.selected
                                                    : ""
                                            }`}
                                            onMouseDown={() =>
                                                handleSuggestionClick(
                                                    suggestion
                                                )
                                            }
                                        >
                                            {suggestion.stock_name} (
                                            {suggestion.stock_id})
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.list}>
                    <div className={styles.header}>수익률 상위 종목</div>
                    <div className={styles.totalCard}>
                        {stocks.map((stock, index) => (
                            <div key={index} className={styles.stockCard}>
                                <div className={styles.stockInfo}>
                                    <div className={styles.stockName}>
                                        {stock.name}
                                    </div>
                                    <div className={styles.stockCode}>
                                        {stock.code}
                                    </div>
                                </div>
                                <div className={styles.stockDetails}>
                                    <div className={styles.stockChange}>
                                        {stock.change}
                                    </div>
                                    <div className={styles.stockPrice}>
                                        {stock.price}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
