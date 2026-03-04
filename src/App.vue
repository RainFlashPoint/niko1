<template>
  <div class="page">
    <div class="year-2026">2026</div>
    <div class="marquee-wrapper">
      <div class="marquee">
        <span>🎉 恭喜发财！红包拿来！🎊 财源广进！福气满满！🎉</span>
        <span>🎉 恭喜发财！红包拿来！🎊 财源广进！福气满满！🎉</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
  background-size: 400% 400%;
  animation: gradientBG 8s ease infinite;
  gap: 2rem;
}

.year-2026 {
  font-size: 8rem;
  font-weight: 900;
  color: transparent;
  background: linear-gradient(45deg, #ffd700, #ff6b6b, #feca57, #48dbfb);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: gradientText 3s ease infinite;
  text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
}

.marquee-wrapper {
  width: 90%;
  overflow: hidden;
  border: 4px solid rgba(255, 215, 0, 0.6);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.marquee {
  display: inline-flex;
  gap: 4rem;
  animation: slide 12s linear infinite;
  padding: 2rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.marquee span {
  white-space: nowrap;
}

@keyframes slide {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes gradientText {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
