import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StudyBuddyPage() {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [foundBuddies, setFoundBuddies] = useState([]);
  const [connectingId, setConnectingId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [likedBuddies, setLikedBuddies] = useState({});
  const [energyGiftingId, setEnergyGiftingId] = useState(null);
  const buddiesListRef = React.useRef(null);

  // 当搜索结果显示后,自动滚动到结果列表底部
  useEffect(() => {
    if (foundBuddies.length > 0 && buddiesListRef.current) {
      setTimeout(() => {
        buddiesListRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'end'
        });
      }, 100);
    }
  }, [foundBuddies]);

  const handleStartSearch = () => {
    setIsSearching(true);
    setFoundBuddies([]);

    // 搜索3秒后显示结果
    setTimeout(() => {
      // 模拟找到的学习搭子数据
      setFoundBuddies([
        { id: 1, name: '学习达人A', distance: '0.5km', subject: '数学' },
        { id: 2, name: '学习达人B', distance: '1.2km', subject: '英语' },
        { id: 3, name: '学习达人C', distance: '2.0km', subject: '物理' }
      ]);
      setIsSearching(false);
    }, 6000);
  };

  // 处理连接按钮点击
  const handleConnect = (buddyId) => {
    setConnectingId(buddyId);
    setTimeout(() => {
      setConnectingId(null);
      setToastMessage('连接成功！');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 3000);
  };

  const handleLike = (buddyId) => {
    setLikedBuddies(prev => ({
      ...prev,
      [buddyId]: !prev[buddyId]
    }));
    const isLiked = likedBuddies[buddyId];
    setToastMessage(isLiked ? '已取消点赞' : '点赞成功！');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleGiftEnergy = (buddyId) => {
    setEnergyGiftingId(buddyId);
    setTimeout(() => {
      setEnergyGiftingId(null);
      setToastMessage('学习能量值已赠送！');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }, 1500);
  };

  // 返回首页
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="study-buddy-page">
      <button className="back-button" onClick={handleBackToHome}>← 返回首页</button>

      <div className="study-buddy-container">
        <h1 className="buddy-title">寻找学习搭子</h1>
        <p className="buddy-subtitle">发现附近正在学习的伙伴</p>

        {/* 雷达波纹容器 */}
        <div className="radar-container">
          <div className={`radar-waves ${isSearching ? 'searching' : ''}`}>
            <div className="radar-wave wave-1"></div>
            <div className="radar-wave wave-2"></div>
            <div className="radar-wave wave-3"></div>
            <div className="radar-wave wave-4"></div>
            <div className="radar-center">
              <div className="radar-dot"></div>
            </div>
          </div>
        </div>

        {/* 搜索按钮 */}
        <button
          className="search-button"
          onClick={handleStartSearch}
          disabled={isSearching}
        >
          {isSearching ? '搜索中...' : '开始搜索'}
        </button>

        {/* 搜索结果列表 */}
        {foundBuddies.length > 0 && (
          <div className="buddies-list" ref={buddiesListRef}>
            <h3 className="list-title">找到附近 {foundBuddies.length} 位学习搭子</h3>
            <p className="buddy-tip">快给搭子点赞 送能量吧</p>
            {foundBuddies.map(buddy => (
              <div key={buddy.id} className="buddy-card">
                <div className="buddy-info">
                  <h4 className="buddy-name">{buddy.name}</h4>
                  <p className="buddy-details">
                    <span className="buddy-distance">📍 {buddy.distance}</span>
                    <span className="buddy-subject">📚 {buddy.subject}</span>
                  </p>
                </div>
                <div className="buddy-actions">
                  <button 
                    className={`like-button ${likedBuddies[buddy.id] ? 'liked' : ''}`}
                    onClick={() => handleLike(buddy.id)}
                    title="点赞"
                  >
                    {likedBuddies[buddy.id] ? '❤️' : '🤍'}
                  </button>
                  <button 
                    className="energy-button"
                    onClick={() => handleGiftEnergy(buddy.id)}
                    disabled={energyGiftingId === buddy.id}
                    title="赠送能量值"
                  >
                    {energyGiftingId === buddy.id ? '⚡' : '⭐'}
                  </button>
                  <button 
                    className="connect-button"
                    onClick={() => handleConnect(buddy.id)}
                    disabled={connectingId === buddy.id}
                  >
                    {connectingId === buddy.id ? '连接中...' : '连接'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toast提示 */}
      {showToast && (
        <div className="toast-message">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default StudyBuddyPage;