import React, { useState } from 'react';

const SurveyForm: React.FC = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);

    const handleOptionChange = (index: number, value: string) => {
        const copy = [...options];
        copy[index] = value;
        setOptions(copy);
    };

    const handleSubmit = () => {
        console.log({ question, options });
    };

    return (
        <div style={{ padding: '40px 0' }}>
            <div style={{ width: '600px', margin: '0 auto', padding: '40px',}}>
                {/* 제목 */}
                <h2 style={{ marginBottom: '30px' }}>영화 취향 설문 작성</h2>

                {/* 질문 */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
                    <span style={{ width: '60px' }}>질문</span>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="질문"
                        style={{ flex: 1, padding: '10px', border: '1px solid grey', borderRadius: '10px' }}/>
                </div>

                {/* 옵션 */}
                {options.map((option, index) => (
                    <div
                        key={index}
                        style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <input type="radio" disabled style={{ marginRight: '10px' }} />
                        <input type="text" value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`옵션 ${index + 1}`}
                            style={{ flex: 1, padding: '8px 4px', border: 'none', borderBottom: '1px solid grey', outline: 'none' }}/>
                    </div>
                ))}

                {/* 버튼 */}
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button
                        onClick={handleSubmit}
                        style={{ background: '#4a8df6', color: 'white', border: 'none', 
                            padding: '10px 30px', borderRadius: '6px', cursor: 'pointer' }}>
                        작성 완료
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SurveyForm;