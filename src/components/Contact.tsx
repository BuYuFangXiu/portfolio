import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Github, MapPin, ArrowUpRight, ExternalLink } from 'lucide-react'

const contactInfo = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: '电子邮箱',
    value: 'yveswbane@163.com',
    href: 'mailto:yveswbane@163.com',
  },
  {
    icon: <Github className="w-5 h-5" />,
    label: 'GitHub',
    value: 'github.com/BuYuFangXiu',
    href: 'https://github.com/BuYuFangXiu/Assassin-s-Creed-style-RPG',
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: '所在地',
    value: '中国 · 成都',
    href: null,
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-24 sm:py-32 lg:py-40" ref={ref}>
      {/* Glow line separator */}
      <div className="glow-line max-w-7xl mx-auto mb-24 sm:mb-32" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="section-subtitle">联系方式</p>
          <h2 className="section-title text-gradient mb-4">保持联系</h2>
          <p className="text-white/40 text-sm font-inter max-w-lg mb-12 sm:mb-16">
            如果你对我的作品感兴趣，或者有实习机会想要交流，欢迎随时联系我。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {contactInfo.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            >
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="glass-card rounded-xl p-6 sm:p-8 flex flex-col items-center text-center group transition-all duration-300 hover:bg-white/[0.06]"
                >
                  <span className="text-white/40 group-hover:text-white/70 transition-colors mb-4">
                    {item.icon}
                  </span>
                  <p className="text-white/50 text-[10px] tracking-widest uppercase font-inter mb-2">
                    {item.label}
                  </p>
                  <p className="text-white text-sm sm:text-base font-inter group-hover:text-white transition-colors">
                    {item.value}
                  </p>
                  <ExternalLink className="w-3.5 h-3.5 text-white/30 mt-3 group-hover:text-white/60 transition-colors" />
                </a>
              ) : (
                <div className="glass-card rounded-xl p-6 sm:p-8 flex flex-col items-center text-center">
                  <span className="text-white/40 mb-4">{item.icon}</span>
                  <p className="text-white/50 text-[10px] tracking-widest uppercase font-inter mb-2">
                    {item.label}
                  </p>
                  <p className="text-white text-sm sm:text-base font-inter">{item.value}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          className="mt-12 sm:mt-16 text-center"
        >
          <a
            href="mailto:yveswbane@163.com"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 px-8 py-4 text-xs tracking-widest uppercase font-inter text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 group"
          >
            发送邮件
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-24 sm:mt-32 text-center">
        <p className="text-white/20 text-[10px] tracking-widest uppercase font-inter">
          2026 &middot; 颜文博 &middot; 使用 React + Tailwind CSS + Framer Motion 构建
        </p>
      </div>
    </section>
  )
}
