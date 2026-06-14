import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Gamepad2, Sparkles, Compass, HeartHandshake } from 'lucide-react'

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40">
      <div className="section-container">
        <AnimatedSection>
          <p className="section-subtitle">关于我</p>
          <h2 className="section-title text-gradient mb-12 sm:mb-16 lg:mb-20">
            你好，我是颜文博
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <p className="text-white/70 text-base sm:text-lg leading-relaxed font-inter">
                游戏对我来说，从来不只是娱乐。小时候第一次在老家那台老电脑上打开《刺客信条》，当主角跃下鸟瞰点的那一刻，我看到的不是像素，而是另一个世界。从那时起，我就知道我想做的不只是玩游戏——我想建造这样的世界。
              </p>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed font-inter">
                后来接触到 Unreal Engine 5，终于找到了将想法变成现实的方式。从零开始学习了 3C 系统、动画蓝图、行为树、Motion Warping……每一次 debug 成功的瞬间，都让我觉得这条路没有选错。特别是当我第一次成功让角色在房顶之间流畅跑酷时，那种感觉——就像亲手给一个世界注入了生命。
              </p>
              <p className="text-white/50 text-sm leading-relaxed font-inter">
                真正让我坚定做游戏的，是《黑神话：悟空》。它让我看到中国开发者能做出什么样的作品。而《艾尔登法环》让我明白了什么叫"世界感"——不是靠对话和过场动画，而是靠场景的每一块石头、每一个敌人布置的位置来讲故事。这种设计哲学，一直是我做项目时反复思考的方向。
              </p>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed font-inter">
                现在，我正在独立开发一款名为<strong className="text-white">《云屿》</strong>的游戏。这是一个关于云端岛屿、探索与孤独感的故事。我不想做多宏大、多复杂的系统，而是想做一个能让人安静下来、沉浸其中的小世界。这个过程让我学到了很多——不仅仅是技术上的，更是关于如何用游戏去表达一种情绪、一种氛围。
              </p>
              <p className="text-white/50 text-sm leading-relaxed font-inter">
                我知道自己还有很多要学，但我也知道，做游戏这件事我会一直做下去。不是为了赶风口，也不是为了别的什么——只是因为，建造世界本身就是一件足够迷人的事。
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="grid gap-4 sm:gap-5">
              {[
                {
                  icon: <Gamepad2 className="w-5 h-5" />,
                  title: '我的游戏之旅',
                  desc: '从《刺客信条》系列、《黑神话：悟空》到《艾尔登法环》\n每一款作品都让我对"好的游戏体验"有更深的理解\n在游玩中学习设计，在开发中实现想法',
                },
                {
                  icon: <Compass className="w-5 h-5" />,
                  title: '正在探索',
                  desc: '独立开发《云屿》——一个关于云端与孤独的探索游戏\n专注于氛围营造、情绪传达与简约但不简单的交互设计\n项目正在持续迭代中',
                },
                {
                  icon: <Sparkles className="w-5 h-5" />,
                  title: '我的设计理念',
                  desc: '好的游戏不需要复杂的说明书\n玩法应该像呼吸一样自然\n场景会说话——环境叙事远比文字更有力量',
                },
                {
                  icon: <HeartHandshake className="w-5 h-5" />,
                  title: '寻找同路人',
                  desc: '无论是技术交流、项目合作还是单纯聊聊游戏\n都欢迎找我聊聊\n毕竟做游戏最棒的事，就是和有趣的人一起创造',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="glass-card rounded-lg p-5 sm:p-6 group cursor-default transition-all duration-500 hover:scale-[1.02] hover:bg-white/[0.08]"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-white/40 group-hover:text-white/70 transition-all duration-300 group-hover:scale-110">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-white text-sm font-inter font-semibold tracking-wider uppercase mb-1">
                        {item.title}
                      </h3>
                      <p className="text-white/50 text-xs sm:text-sm font-inter leading-relaxed whitespace-pre-line">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
