import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X, ExternalLink, Play, ChevronLeft, ChevronRight } from 'lucide-react'

export interface Project {
  id: string
  title: string
  subtitle: string
  category: string
  description: string
  details: string[]
  techStack: string[]
  image?: string
  video?: string
  links: { label: string; url: string }[]
  highlights: string[]
  role: string
  timeline: string
  bilibiliId?: string
}

const projects: Project[] = [
  {
    id: 'assassins-creed-rpg',
    title: '刺客信条风格 RPG',
    subtitle: '开放世界动作角色扮演游戏 Demo',
    category: 'Unreal Engine 5',
    description: '使用 UE5 独立完成的开放世界动作 RPG Demo，实现了完整的 3C 系统、AI 行为树、跑酷翻越与攀爬系统、任务系统及数据持久化。从框架设计到核心功能开发、再到调试与性能优化，独立走完完整开发流程。',
    video: '',
    bilibiliId: 'BV1crJK6MEZP',
    details: [
      '设计角色移动组件、动画状态机、AI 行为树、任务 DataTable 配置，封装蓝图函数库配合 DrawDebugLine 可视化调试，黑板 Key 实时监控 AI 状态',
      '搭建敌人 AI 行为树：根 Selector 分支管理战斗/警戒/巡逻，视觉感知 + 听觉感知，攻击判定精度控制（仅在攻击动画特定 Notify 帧启用碰撞检测），状态智能切换',
      '实现冲刺（1000 cm/s）、蹲伏（胶囊体半高 90->50，相机距离 300->200）；动画蓝图中根据角速度实现角色倾斜（最大 25°）；球体追踪实现视角软锁定',
      '优化动画蓝图节点计算频率（每 0.1s 更新倾斜角度）；武器碰撞检测仅在攻击动画特定帧启用；通过 LOD 配置降低远处 AI 的行为树更新开销',
      '使用 Unreal Insights 定位热点，DrawDebug 实时调试移动/攻击范围',
      '调研资源热更新方案（Pak + 版本校验），学习 UE5 网络同步基础（Replicated + RPC），了解帧同步/状态同步差异',
      '提供策划配置检查机制：任务表数据完整性校验、行为树节点合法性警告（编辑器启动时自动扫描）',
    ],
    techStack: ['Unreal Engine 5', 'C++', '蓝图', '行为树', '动画蓝图', 'Motion Warping', 'GameplayTag', 'SaveGame'],
    links: [
      { label: 'GitHub 开源项目', url: 'https://github.com/BuYuFangXiu/Assassin-s-Creed-style-RPG' },
    ],
    highlights: [
      '独立完成完整 Demo 开发',
      '跑酷多点检测容错方案（动态增加检测射线角度）',
      'GitHub 持续更新开发文档',
    ],
    role: '独立开发者（全栈游戏开发）',
    timeline: '2025 - 至今',
  },
  {
    id: 'yun-yu',
    title: '云屿',
    subtitle: '云端探索与氛围叙事游戏',
    category: 'Unreal Engine 5',
    description: '一款以云端岛屿为背景的氛围探索游戏。专注于环境叙事、情绪传达和沉浸感营造。从场景搭建到交互设计，从光照氛围到音效编排，独立完成从概念到可玩原型的所有开发环节。',
    video: '',
    bilibiliId: 'BV1wrJK6MEw4',
    details: [
      '使用 Landscape 地形系统 + 程序化材质，结合体积云、雾效与动态光照营造云端氛围',
      '探索与交互系统：角色移动、攀爬、滑翔等动作系统，配合富有节奏的交互反馈（拾取、触发、环境反应）',
      '氛围叙事设计：不依赖对话文本，通过场景布局、光照变化、空间引导来讲故事——受《艾尔登法环》环境叙事手法启发',
      '性能优化：针对开放场景的 LOD 配置、光照烘焙优化、Shader 复杂度控制，确保在中端硬件上也能流畅运行',
      '迭代历程：从最初的 1.0 原型到 2.0 大幅重做，积累了从"做"到"做好"的经验',
    ],
    techStack: ['Unreal Engine 5', 'C++', '蓝图', 'Landscape', '体积云', '环境光照', '程序化材质'],
    links: [
      { label: '项目展示视频', url: '#projects' },
    ],
    highlights: [
      '独立完成全流程开发',
      '注重氛围感与环境叙事',
      '从 1.0 到 2.0 的持续迭代',
    ],
    role: '独立开发者（全栈游戏开发）',
    timeline: '2025 - 至今',
  },
]

function ProjectCard({ project, onSelect }: { project: Project; onSelect: (p: Project) => void }) {
  const [hoverX, setHoverX] = useState(0)
  const [hoverY, setHoverY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setHoverX(x * 10)
    setHoverY(y * -10)
  }

  const handleMouseLeave = () => {
    setHoverX(0)
    setHoverY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={false}
      onClick={() => onSelect(project)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${hoverY}deg) rotateY(${hoverX}deg)`,
      }}
      className="project-card glass-card rounded-xl p-6 sm:p-8 lg:p-10 group cursor-pointer transition-all duration-200 w-[85vw] sm:w-[400px] lg:w-[480px] flex-shrink-0 snap-start select-none"
    >
      <div className="project-content flex flex-col h-full">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="px-3 py-1 text-[10px] tracking-widest uppercase bg-white/5 border border-white/10 rounded-full text-white/50 font-inter">
            {project.category}
          </span>
        </div>
        <h3 className="font-podium text-2xl sm:text-3xl text-white uppercase tracking-tight mb-2">
          {project.title}
        </h3>
        <p className="text-white/50 text-sm font-inter mb-4">{project.subtitle}</p>
        <p className="text-white/60 text-sm font-inter leading-relaxed mb-6 flex-1 line-clamp-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.slice(0, 5).map((tech) => (
            <span key={tech} className="px-2.5 py-1 text-[10px] bg-white/5 border border-white/10 rounded text-white/50 font-inter">
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="px-2.5 py-1 text-[10px] text-white/30 font-inter">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>
        {project.video && (
          <div className="flex items-center gap-1.5 mb-3 text-white/30 text-[10px] tracking-wider uppercase font-inter">
            <Play className="w-3 h-3" />
            <span>含项目视频</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-white/40 group-hover:text-white/70 transition-colors text-xs tracking-widest uppercase font-inter">
          点击查看详情
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  )
}

function ProjectModal({ project, projects, onClose, onNavigate }: { project: Project; projects: Project[]; onClose: () => void; onNavigate: (p: Project) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const currentIndex = projects.findIndex(p => p.id === project.id)
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < projects.length - 1

  useEffect(() => {
    if (project.video && videoRef.current) {
      videoRef.current.currentTime = 0
      const playPromise = videoRef.current.play()
      if (playPromise) playPromise.catch(() => { setIsPlaying(false) })
    }
  }, [project.video])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-4 sm:inset-6 md:inset-8 z-50 flex items-center justify-center pointer-events-none"
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative w-full h-full max-w-4xl pointer-events-auto overflow-y-auto bg-neutral-950 border border-white/10 rounded-2xl shadow-2xl shadow-black/60"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <button
            onClick={onClose}
            className="sticky top-4 float-right mr-4 mt-4 p-2.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all z-20"
            aria-label="关闭"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="px-6 sm:px-8 lg:px-10 pt-2 pb-8 sm:pb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 text-[10px] tracking-widest uppercase bg-white/5 border border-white/10 rounded-full text-white/50 font-inter">
                {project.category}
              </span>
              <span className="text-white/30 text-xs font-inter">{project.timeline}</span>
            </div>
            <h2 className="font-podium text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight mb-1 pr-10">
              {project.title}
            </h2>
            <p className="text-white/50 text-sm sm:text-base font-inter mb-2">{project.subtitle}</p>
            <p className="text-white/40 text-xs font-inter mb-8">{project.role}</p>
            {(project.video || project.bilibiliId) && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 bg-black/80 border border-white/5">
                {project.bilibiliId ? (
                  <iframe
                    src={"https://player.bilibili.com/player.html?bvid=" + project.bilibiliId + "&autoplay=0&danmaku=0&high_quality=1"}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                ) : (
                  <video
                    ref={videoRef}
                    src={project.video}
                    controls
                    playsInline
                    preload="none"
                    className="w-full aspect-video object-cover"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              </div>
            )}
            <p className="text-white/70 text-sm sm:text-base font-inter leading-relaxed mb-8">
              {project.description}
            </p>
            <h3 className="font-inter text-white text-sm tracking-widest uppercase mb-4">实现细节</h3>
            <ul className="space-y-3 mb-8">
              {project.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3 text-white/60 text-sm font-inter leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 flex-shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
            <h3 className="font-inter text-white text-sm tracking-widest uppercase mb-4">项目亮点</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.highlights.map((h) => (
                <span key={h} className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded text-white/60 font-inter">
                  {h}
                </span>
              ))}
            </div>
            <h3 className="font-inter text-white text-sm tracking-widest uppercase mb-4">技术栈</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.techStack.map((tech) => (
                <span key={tech} className="skill-tag text-xs">{tech}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 px-5 py-3 text-xs tracking-widest uppercase font-inter text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {link.label}
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ))}
            </div>
          </div>
          <div className="sticky bottom-0 h-8 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none" />
        </motion.div>
      </motion.div>
      <div className="fixed inset-x-0 top-1/2 -translate-y-1/2 z-[60] flex items-center justify-between pointer-events-none px-4 sm:px-6 md:px-8">
        {hasPrev && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onClick={() => onNavigate(projects[currentIndex - 1])}
            className="pointer-events-auto p-3 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all shadow-lg"
            aria-label="上一个项目"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
        )}
        <div className="flex-1" />
        {hasNext && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            onClick={() => onNavigate(projects[currentIndex + 1])}
            className="pointer-events-auto p-3 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all shadow-lg"
            aria-label="下一个项目"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        )}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full"
      >
        <span className="text-white/50 text-xs font-inter tracking-wider">
          {currentIndex + 1} / {projects.length}
        </span>
      </motion.div>
    </>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const scrollBy = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const card = scrollRef.current.querySelector('.project-card')
    const cardWidth = card?.clientWidth ?? 400
    const gap = 24
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap),
      behavior: 'smooth',
    })
  }

  return (
    <section className="relative py-24 sm:py-32 lg:py-40">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />
      <div className="section-container">
        <div>
          <p className="section-subtitle">作品集</p>
          <h2 className="section-title text-gradient mb-4">
            精选项目
          </h2>
          <p className="text-white/40 text-sm font-inter max-w-lg mb-12 sm:mb-16">
            点击卡片查看项目详情。每个项目都包含完整的设计思路和实机演示视频。
          </p>
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() => scrollBy('left')}
              disabled={!canScrollLeft}
              className={`p-2.5 rounded-full border transition-all ${
                canScrollLeft
                  ? 'border-white/20 text-white/70 hover:bg-white/10 hover:border-white/40'
                  : 'border-white/5 text-white/20 cursor-not-allowed'
              }`}
              aria-label="向左滚动"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollBy('right')}
              disabled={!canScrollRight}
              className={`p-2.5 rounded-full border transition-all ${
                canScrollRight
                  ? 'border-white/20 text-white/70 hover:bg-white/10 hover:border-white/40'
                  : 'border-white/5 text-white/20 cursor-not-allowed'
              }`}
              aria-label="向右滚动"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-6 sm:-mx-10 lg:-mx-16 px-6 sm:px-10 lg:px-16"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!scrollRef.current) return
                const cards = scrollRef.current.querySelectorAll('.project-card')
                if (cards[i]) cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === projects.length - 1 ? 'bg-white/60 w-6' : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={'跳转到项目 ' + (i + 1)}
            />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/30 text-sm font-inter">暂无项目</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            projects={projects}
            onClose={() => setSelectedProject(null)}
            onNavigate={setSelectedProject}
          />
        )}
      </AnimatePresence>
    </section>
  )
}



