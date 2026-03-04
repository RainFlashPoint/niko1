<template>
  <div class="page">
    <div class="marquee-wrapper">
      <div class="marquee">
        <span>🎉 恭喜发财！红包拿来！🎊 恭喜发财！红包拿来！🎊</span>
        <span>🎉 恭喜发财！红包拿来！🎊 恭喜发财！红包拿来！🎊</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb);
  background-size: 400% 400%;
  animation: gradientBG 5s ease infinite;
}

.marquee-wrapper {
  width: 90%;
  overflow: hidden;
  border: 4px solid #fff;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.marquee {
  display: inline-flex;
  gap: 4rem;
  animation: slide 12s linear infinite;
  padding: 2rem 0;
  font-size: 2.5rem;
  font-weight: 800;
  color: #d4380d;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.15rem;
}

.marquee span {
  white-space: nowrap;
}

@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
