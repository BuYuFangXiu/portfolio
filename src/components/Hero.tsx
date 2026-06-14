import { Crown, ArrowUpRight, Award } from 'lucide-react'
import { motion } from 'framer-motion'

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover scale-110"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 hero-overlay-right" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 h-full flex items-center"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <div className="max-w-3xl">
           <motion.div variants={fadeUpItem} className="flex items-center gap-2 mb-6 lg:mb-8">
             <Crown className="w-4 h-4 text-white/70" />
              <span className="text-shimmer text-xs sm:text-sm font-inter tracking-[0.3em] uppercase">
               游戏客户端开发者
              </span>
            </motion.div>

            <motion.h1 variants={fadeUpItem} className="font-podium text-white uppercase leading-[0.92] tracking-tight">
              <span className="block text-[clamp(2.8rem,8vw,7rem)]">构建世界</span>
              <span className="block text-[clamp(2.8rem,8vw,7rem)]">创造体验</span>
              <span className="block text-[clamp(2.8rem,8vw,7rem)]">突破边界</span>
            </motion.h1>

            <motion.p
              variants={fadeUpItem}
              className="text-white/60 text-sm sm:text-base font-inter leading-relaxed max-w-md mt-6 lg:mt-8"
            >
              专注 Unreal Engine 5 游戏客户端开发，<br />
              从 3C 到 AI 行为树，从动画系统到性能优化——<br />
              <span className="font-bold text-white">用代码打造令人沉浸的游戏体验。</span>
            </motion.p>

           <motion.div variants={fadeUpItem} className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 lg:mt-10">
              <a
                href="#projects"
                className="magnetic-btn inline-flex items-center gap-2 sm:gap-3 bg-black hover:bg-neutral-900 px-5 sm:px-7 py-3 sm:py-4 text-[11px] sm:text-xs tracking-widest uppercase font-inter text-white transition-all duration-300 group"
              >
               查看作品
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <div className="hidden sm:flex items-center gap-3 glow-pulse">
                <Award className="w-8 h-8 text-white/40" />
                <div>
                  <p className="text-white/50 text-[10px] tracking-wider uppercase leading-tight">独立游戏</p>
                  <p className="text-white/60 text-[10px] tracking-wider uppercase leading-tight">开发经验</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUpItem} className="flex flex-wrap gap-6 sm:gap-12 lg:gap-16 mt-8 sm:mt-10 lg:mt-14">
              {[
                { value: '2个', label: '完整项目' },
                { value: '1年+', label: 'UE5深耕' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-inter text-white text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-white/50 text-[9px] sm:text-xs tracking-widest uppercase mt-1 font-inter">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

     <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="levitate text-white/30 text-[10px] tracking-widest uppercase font-inter">SCROLL</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  )
}
