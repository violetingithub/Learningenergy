import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'

// 我要提问页面组件 - 聊天界面风格
export function QuestionPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    // 系统消息 - 欢迎语
    {
      id: 1,
      type: 'system',
      content: '心情如何？我能给你满满的情绪价值哦。',
      avatar: '❤️'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showGuideQuestions, setShowGuideQuestions] = useState(true);
  const chatContainerRef = useRef(null);

  // 引导问题数组
  const guideQuestions = [
    '今天学习遇到什么困难了吗？',
    '有什么想和我聊聊的吗？'
  ];

  // 自动滚动到底部
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // 处理发送消息
  const handleSendMessage = () => {
    if (!inputMessage.trim() || isSending) return;

    // 隐藏引导问题
    setShowGuideQuestions(false);
    
    // 添加用户消息
    const newUserMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage.trim()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsSending(true);

    // 模拟回复延迟
    setTimeout(() => {
      // 生成随机回复
      const replies = [
        '谢谢你的分享，我很理解你的感受！',
        '这个问题很有意思，让我想想...',
        '你说得对，学习确实需要耐心和坚持。',
        '我会认真考虑你的建议的。',
        '别着急，慢慢来，你已经做得很好了！'
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      const newSystemMessage = {
        id: Date.now() + 1,
        type: 'system',
        content: randomReply,
        avatar: '❤️'
      };

      setMessages(prev => [...prev, newSystemMessage]);
      setIsSending(false);
    }, 1000);
  };

  // 处理引导问题点击
  const handleGuideQuestionClick = (question) => {
    // 隐藏引导问题
    setShowGuideQuestions(false);
    
    const newUserMessage = {
      id: Date.now(),
      type: 'user',
      content: question
    };

    setMessages(prev => [...prev, newUserMessage]);

    // 模拟回复延迟
    setTimeout(() => {
      let reply = '';
      if (question === guideQuestions[0]) {
        reply = '学习中遇到困难是很正常的，你可以尝试分解问题，一步步解决，或者换个角度思考，也许会有新的灵感。';
      } else {
        reply = '不管什么话题，我都很乐意倾听，你可以畅所欲言。';
      }

      const newSystemMessage = {
        id: Date.now() + 1,
        type: 'system',
        content: reply,
        avatar: '❤️'
      };

      setMessages(prev => [...prev, newSystemMessage]);
    }, 1000);
  };

  // 处理回车发送
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 返回首页
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="subpage question-page">
      <button className="back-button" onClick={handleBackToHome}>← 返回首页</button>
      
      {/* 顶部标题 */}
      <div className="chat-header">
        <h1 className="chat-title">情绪价值</h1>
        <p className="chat-subtitle">内容由AI生成</p>
      </div>
      
      {/* 聊天内容区域 */}
      <div className="chat-container" ref={chatContainerRef}>
        {/* 消息列表 */}
        <div className="message-list">
          {/* 渲染消息列表 */}
          {messages.map((message, index) => {
            // 检查是否是第一条消息
            const isFirstMessage = index === 0;
            
            return (
              <React.Fragment key={message.id}>
                <div className={`message ${message.type}-message`}>
                  {message.type === 'system' && message.avatar && (
                    <div className="message-avatar">{message.avatar}</div>
                  )}
                  <div className="message-content">{message.content}</div>
                </div>
                
                {/* 第一条消息下面显示引导问题 */}
                {isFirstMessage && showGuideQuestions && (
                  <div className="guide-questions-wrapper">
                    {guideQuestions.map((question, qIndex) => (
                      <div 
                        key={qIndex} 
                        className="guide-question"
                        onClick={() => handleGuideQuestionClick(question)}
                      >
                        {question}
                      </div>
                    ))}
                  </div>
                )}
              </React.Fragment>
            );
          })}
          
          {/* 发送中状态 */}
          {isSending && (
            <div className="message system-message">
              <div className="message-avatar">❤️</div>
              <div className="message-content sending">
                <span className="loading-dot"></span>
                <span className="loading-dot"></span>
                <span className="loading-dot"></span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 底部输入区域 */}
      <div className="input-container">
        <div className="input-wrapper">
          <input
            type="text"
            className="message-input"
            placeholder="发消息或按住说话..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isSending}
          />
          <button 
            className="send-button"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isSending}
          >
            <span className="send-icon">↑</span>
          </button>
        </div>
      </div>
    </div>
  );
}