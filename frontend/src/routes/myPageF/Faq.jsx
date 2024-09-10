import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import styles from './Faq.module.css';

const FaqItem = ({ question, answer ,additionalContent}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.faqItem}>
            <button
                className={styles.faqQuestion}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{question}</span>
                <span className={`${styles.icon} ${isOpen ? styles.rotate : ''}`}>
                    <ChevronDown size={20} />
                </span>
            </button>
            <div className={`${styles.faqAnswer} ${isOpen ? styles.open : ''}`}>
                <p>{answer}</p>
                {isOpen && additionalContent}
            </div>
        </div>
    );
};

export default function Faq() {
    const faqData = [
        {
            question: "소수점 주식이 뭔가요?",
            answer: "소수점 주식은 1주 미만의 주식 일부를 구매할 수 있게 해주는 시스템입니다. 예를 들어, 100만원짜리 주식의 0.1주(10만원어치)를 살 수 있습니다. 이를 통해 적은 금액으로도 다양한 고가 주식에 투자할 수 있어 투자 진입 장벽을 낮추고 포트폴리오 다각화를 용이하게 합니다."
        },
        {
            question: "소수점 주식은 어떻게 받을 수 있나요?",
            answer: "소수점 주식을 받으려면 먼저 우리 플랫폼에 가입하세요! 소수점 주식을 받으려면 광고를 시청하거나, 영수증을 인증해보세요!"
        },
        {
            question: "가격 변동은 어떻게 되나요?",
            answer: "전체 주식과 동일한 비율로 가격이 변동됩니다. 예를 들어 1주가 10% 상승하면, 여러분의 0.1주도 10% 상승하는 거죠!"
        },
        {
            question: "소수점 투자 실행 방법이 어떻게 되나요?",
            answer: "소수점 투자는 실시간 주문이 아니에요. 투자신청을 모았다가 정해진 시간(총2번에) 투자체결을 하고, 체결후 투자자한테 배분해요.",
            additionalContent: (
                <>
                    <table className={styles.faqTable}>
                        <thead>
                            <tr>
                                <th>차수</th>
                                <th>투자 신청</th>
                                <th>취합 </th>
                                <th>투자 실행</th>
                                <th>체결</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1차</td>
                                <td>금일 10:00~금일 14:30까지</td>
                                <td>금일 14:30</td>
                                <td>금일 14:50</td>
                                <td>금일 15:00</td>
                            </tr>
                            <tr>
                                <td>2차</td>
                                <td>금일 14:30~익일 09:30까지</td>
                                <td>익일 09:30</td>
                                <td>익일 09:50</td>
                                <td>익일 10:00</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={styles.names}>
                        <p>이 표는 투자 프로세스의 각 단계를 요약한 것입니다. 투자 신청 시간에 맞춰 신청을 완료하면, 정해진 시간에 투자 실행이 이루어집니다.</p>
                        <p>비영업일의 경우 다음 영업일 10시에 판매체결이 실행됩니다.</p>
                        <p>1차의 경우 2시 30분 부터는 판매취소가 불가능합니다.</p>
                        <p>2차의 경우 9시 30분 부터는 판매취소가 불가능합니다.</p>
                    </div>
                </>
            )
        }

    ];

    return (
        <div className={`${styles.faqContainer} ${styles.pageWithNavbar}`}>
            <div className={styles.faqContent}>
                <div className={styles.faqHeader}>
                    <HelpCircle size={40} />
                    <h1>자주 묻는 질문 (FAQ)</h1>
                    <p>궁금하신 점을 빠르게 확인하세요</p>
                </div>
                <div className={styles.faqList}>
                    {faqData.map((item, index) => (
                        <FaqItem key={index} question={item.question} answer={item.answer} additionalContent={item.additionalContent}/>
                    ))}
                </div>
                <div className={styles.faqFooter}>
                    <p>더 자세한 정보가 필요하신가요?</p>
                    <a href="https://github.com/Exit1ofYeouido">고객센터 문의하기</a>
                </div>
            </div>
        </div>
    );
}