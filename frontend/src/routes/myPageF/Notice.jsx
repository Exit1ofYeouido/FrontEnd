import React, { useState } from "react";
import styles from "./Notice.module.css";
import { Bell,  ChevronRight, X } from 'lucide-react';

export default function Notice() {
    const [notices] = useState([
        { id: 1, title: "프로 디지털 아카데미 종료 안내", date: "2024-09-11", content: "3월 20일부터 시작된 신한투자증권 프로디지털 아카데미가 오늘 발표를 끝으로 종료됩니다.", type: "tip", details: "힘들었던 6개월동안의 과정을 수료한 모든 교육생분들 및 강사님들, 매니저님들 고생 많으셨습니다! 내일 수료식 늦지 말고 와서 유종의 미를 거뒀으면 좋겠습니다." },
        {
            id: 2,
            title: "알파코 퇴실 안내",
            date: "2024-09-05",
            content: "교육 과정 종료에 따른 알파코 캠퍼스 퇴실 안내입니다.",
            type: "feature",
            details: "사물함은 다 비우고, 본인의 짐들 모두 가져가주세요! 추가로 6개월 간 관리해주신 매니저님께 감사인사 드리는 것도 잊지 마세요🥹🥹"
        },
        {
            id: 3,
            title: "개인정보 보호정책 강화 안내",
            date: "2024-08-28",
            content: "사용자 데이터 보호를 위한 정책이 개선되었습니다.",
            type: "policy",
            details: "암호화 강화, 제3자 정보 제공 범위 축소 등 보안 강화 조치가 적용되었습니다. 자세한 내용은 개인정보 처리방침을 확인해 주세요."
        },
        {
            id: 4,
            title: "앱 사용 팁: 최대 리워드 획득 방법",
            date: "2024-08-20",
            content: "일상 속 금융 활동으로 리워드를 최대로 얻는 방법을 소개합니다.",
            type: "tip",
            details: "광고 시청, 영수증 인증 등을 통해 소수점 주식을 더 많이 얻을 수 있습니다. 상세한 팁과 예시를 확인해보세요!"
        }    ]);

    const [selectedNotice, setSelectedNotice] = useState(null);

    const openModal = (notice) => {
        setSelectedNotice(notice);
    };

    const closeModal = () => {
        setSelectedNotice(null);
    };

    return (
        <div className={styles.noticeContainer}>
            <h1 className={styles.noticeTitle}>
                <Bell className={styles.titleIcon} />
                공지사항
            </h1>
            <ul className={styles.noticeList}>
                {notices.map((notice) => (
                    <li key={notice.id} className={`${styles.noticeItem} ${styles[notice.type]}`}>
                        <div className={styles.noticeHeader}>
                            <h2 className={styles.noticeItemTitle}>{notice.title}</h2>
                            <span className={styles.noticeItemDate}>
                                {notice.date}
                            </span>
                        </div>
                        <p className={styles.noticeItemContent}>{notice.content}</p>
                        <button className={styles.readMoreBtn} onClick={() => openModal(notice)}>
                            자세히 보기
                            <ChevronRight className={styles.readMoreIcon} />
                        </button>
                    </li>
                ))}
            </ul>

            {selectedNotice && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.modalCloseBtn} onClick={closeModal}>
                            <X />
                        </button>
                        <h2 className={styles.modalTitle}>{selectedNotice.title}</h2>
                        <p className={styles.modalDate}>{selectedNotice.date}</p>
                        <p className={styles.modalDetails}>{selectedNotice.details}</p>
                    </div>
                </div>
            )}
        </div>
    );
}