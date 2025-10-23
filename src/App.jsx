import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'

// 导入拆分出去的页面组件
import { FortuneTellingPage, FortuneResultPage } from './components/FortuneTellingPage'
import { QuestionPage } from './components/QuestionPage'
import { TimerPage } from './components/TimerPage'
import { PetPage } from './components/PetPage'

// 暗风格首页组件
function DarkHomePage() {
  const navigate = useNavigate();

  // 处理分类点击事件
  const handleCategoryClick = (category) => {
    switch(category) {
      case 'fortune':
        navigate('/fortune-telling');
        break;
      case 'question':
        navigate('/ask-question');
        break;
      case 'timer':
        navigate('/study-timer');
        break;
      case 'pet':
        navigate('/pet-training');
        break;
      default:
        break;
    }
  };

  // 处理关于我们点击事件
  const handleAboutUsClick = () => {
    navigate('/about-us');
  };

  return (
    <div className="dark-homepage">
      {/* 顶部导航栏 */}
      <header className="dark-header">
        <h1 className="app-title">学习能量站</h1>
        <nav className="main-nav">
          <button className="nav-button" onClick={handleAboutUsClick}>关于我们</button>
        </nav>
      </header>

      {/* 主要内容区域 */}
      <main className="dark-content">
        <h2 className="welcome-title">欢迎来到学习能量站</h2>
        <p className="welcome-subtitle">选择您想要的功能开始学习之旅</p>

        {/* 分类卡片网格 */}
        <div className="categories-grid">
          <CategoryCard
            title="我要求签"
            description="获取学习能量和鼓励"
            icon="🎐"
            onClick={() => handleCategoryClick('fortune')}
          />
          
          <CategoryCard
            title="我要提问"
            description="解决学习中的疑惑"
            icon="❓"
            onClick={() => handleCategoryClick('question')}
          />
          
          <CategoryCard
            title="学习计时"
            description="专注学习，提高效率"
            icon="⏱️"
            onClick={() => handleCategoryClick('timer')}
          />
          
          <CategoryCard
            title="宠物养成"
            description="陪伴学习，共同成长"
            icon="🐱"
            onClick={() => handleCategoryClick('pet')}
          />
        </div>
      </main>

      {/* 页脚 */}
      <footer className="dark-footer">
        <p className="footer-text">学习能量站 © 2024 | 让学习更有趣</p>
      </footer>
    </div>
  );
}

// 分类卡片组件
function CategoryCard({ title, description, icon, onClick }) {
  return (
    <div className="category-card" onClick={onClick}>
      <div className="category-icon">{icon}</div>
      <h3 className="category-title">{title}</h3>
      <p className="category-description">{description}</p>
    </div>
  );
}

function AboutUsPage() {
  const navigate = useNavigate();
  
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="subpage">
      <button className="back-button" onClick={handleBackToHome}>← 返回首页</button>
      <div className="subpage-content">
        <h1>关于我们</h1>
        <p>学习能量站致力于为学习者提供有趣、激励的学习体验，帮助大家更高效地学习和成长。</p>
        <p>我们的使命是让学习变得更有趣，更有动力！</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* 首页路由 */}
      <Route path="/" element={<DarkHomePage />} />
      
      {/* 关于我们路由 */}
      <Route path="/about-us" element={<AboutUsPage />} />
      
      {/* 四个分类的二级页面路由 */}
      <Route path="/fortune-telling" element={<FortuneTellingPage />} />
      <Route path="/fortune-result" element={<FortuneResultPage />} />
      <Route path="/ask-question" element={<QuestionPage />} />
      <Route path="/study-timer" element={<TimerPage />} />
      <Route path="/pet-training" element={<PetPage />} />
    </Routes>
  )
}

export default App
