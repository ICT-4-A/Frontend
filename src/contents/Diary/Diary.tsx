import React from 'react'
import HTMLFlipBook from 'react-pageflip';

interface MyBookProps {

    width?: number;
    height?: number;
    style?: React.CSSProperties;
    className?: string;
    showCover?: boolean;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    mobileScrollSupport?: boolean;
}
const myData = [
    {
        image: "images/bg1.png",
        text: "오늘은 강가를 걸었다. 물소리가 너무 좋았다.\n 정말 재미 있었다.아! 행복하다."
    },
    {
        image: "images/bg2.png",
        text: "밤에 거리를 걸어 보았다. 하루가 정말 보람되었다."
    },
    {
        image: "images/bg3.png",
        text: "도서관에서 책을 읽었다. 마음이 차분해졌다."
    },
    {
        image: "images/bg4.png",
        text: "오늘은 비가 내렸다. 그래도 복습은 열심히 했다."
    },
    {
        image: "images/bg5.png",
        text: "오늘은 비가 내렸다. 내일도 복습은 열심히 하겠다."
    }
]

const Diary: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <h2>Diary</h2>
            <div style={{
                width: '620px', margin: '20px auto',
                overflow: 'hidden', borderRadius: '10px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
            }}>
                <HTMLFlipBook width={300} height={400}
                    showCover={true}
                    {...({ style: {}, usePortrait: true } as any)}
                    autoSize={true} mobileScrollSupport={true}
                    maxShadowOpacity={0.2} usePortrait={true}
                    style={{ borderRadius: '10px' }}
                >
                    {
                        (() => myData.flatMap((entry, idx) => [
                            <div key={`img-${idx}`} style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: '#fff',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                overflow: 'hidden',
                            }}>
                                <img src={entry.image} alt={`Diary Image ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>,
                            
                            <div key={`txt-${idx}`} style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '20px',
                                fontSize: '18px',

                            }}>
                                <p style={{ margin: 0 }}>{entry.text}</p>
                            </div>

                        ]))()

                    }
                </HTMLFlipBook>
            </div>
        </div>
    )
}

export default Diary