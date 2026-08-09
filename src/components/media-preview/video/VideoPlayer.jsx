import { useState, useRef, useEffect } from 'react';
import { R2_BASE, videos } from './videos';

const CATEGORIES = ['全部', '学习', '影视', '收藏'];

export default function VideoPlayer() {
  const [active, setActive] = useState('全部');
  const [playing, setPlaying] = useState(null);
  const videoRef = useRef(null);
  const modalRef = useRef(null);

  const filtered = active === '全部'
    ? videos
    : videos.filter(v => v.category === active);

  // ESC 关闭
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setPlaying(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // 打开时暂停滚动
  useEffect(() => {
    document.body.style.overflow = playing ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [playing]);

  return (
    <>
      <style>{`
        /* ── 基础变量 ── */
        .vp-root {
          --slate: #6e7488;
          --indigo: #706888;
          --steel: #5e7080;
          --glass-bg: rgba(255, 255, 255, 0.55);
          --glass-border: rgba(255, 255, 255, 0.35);
          --glass-shadow: 0 4px 24px rgba(110, 116, 136, 0.1);
          --radius: 14px;
          --radius-sm: 10px;
          font-family: -apple-system, 'SF Pro Display', 'PingFang SC',
            'Noto Sans SC', sans-serif;
          max-width: 960px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* ── 分类 Tabs ── */
        .vp-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .vp-tab {
          padding: 8px 20px;
          border-radius: 20px;
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: var(--slate);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
        }
        .vp-tab:hover {
          background: rgba(255, 255, 255, 0.75);
          border-color: var(--indigo);
        }
        .vp-tab[data-active='true'] {
          background: var(--indigo);
          color: #fff;
          border-color: var(--indigo);
        }

        /* ── 视频网格 ── */
        .vp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }
        .vp-card {
          position: relative;
          aspect-ratio: 16 / 9;
          border-radius: var(--radius);
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          box-shadow: var(--glass-shadow);
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .vp-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(110, 116, 136, 0.18);
        }
        .vp-card-play {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(112, 104, 136, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
          transition: background 0.2s ease;
        }
        .vp-card:hover .vp-card-play {
          background: rgba(112, 104, 136, 0.28);
        }
        .vp-card-play svg {
          width: 20px;
          height: 20px;
          fill: var(--indigo);
          margin-left: 2px;
        }
        .vp-card-title {
          font-size: 13px;
          font-weight: 500;
          color: var(--slate);
          text-align: center;
          padding: 0 12px;
          line-height: 1.4;
        }
        .vp-card-tag {
          position: absolute;
          top: 8px;
          right: 8px;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 6px;
          background: rgba(94, 112, 128, 0.12);
          color: var(--steel);
          font-weight: 500;
        }

        /* ── 空状态 ── */
        .vp-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          color: var(--slate);
          font-size: 14px;
          opacity: 0.6;
        }

        /* ── 播放弹窗 ── */
        .vp-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: vp-fade-in 0.2s ease;
        }
        @keyframes vp-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .vp-modal {
          position: relative;
          width: 90vw;
          max-width: 900px;
          background: #000;
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }
        .vp-modal video {
          width: 100%;
          display: block;
          max-height: 80vh;
          object-fit: contain;
          background: #000;
        }
        .vp-modal-header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          background: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent);
          z-index: 2;
          pointer-events: none;
        }
        .vp-modal-title {
          color: #fff;
          font-size: 15px;
          font-weight: 500;
          opacity: 0.9;
        }
        .vp-close {
          pointer-events: auto;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .vp-close:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* ── 计数 ── */
        .vp-count {
          font-size: 13px;
          color: var(--slate);
          opacity: 0.5;
          margin-bottom: 20px;
        }

        /* ── 响应式 ── */
        @media (max-width: 520px) {
          .vp-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .vp-modal {
            width: 96vw;
            border-radius: 10px;
          }
          .vp-card-play { width: 40px; height: 40px; }
          .vp-card-play svg { width: 16px; height: 16px; }
          .vp-card-title { font-size: 12px; }
        }
      `}</style>

      <div className="vp-root">
        {/* 分类 Tabs */}
        <div className="vp-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className="vp-tab"
              data-active={active === cat}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 计数 */}
        <div className="vp-count">{filtered.length} 个视频</div>

        {/* 视频网格 */}
        <div className="vp-grid">
          {filtered.length === 0 ? (
            <div className="vp-empty">这个分类还没有视频</div>
          ) : (
            filtered.map((v, i) => (
              <div
                key={`${v.src}-${i}`}
                className="vp-card"
                onClick={() => setPlaying(v)}
              >
                <div className="vp-card-tag">{v.category}</div>
                <div className="vp-card-play">
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="vp-card-title">{v.title}</div>
              </div>
            ))
          )}
        </div>

        {/* 播放弹窗 */}
        {playing && (
          <div
            className="vp-modal-overlay"
            ref={modalRef}
            onClick={(e) => { if (e.target === modalRef.current) setPlaying(null); }}
          >
            <div className="vp-modal">
              <div className="vp-modal-header">
                <span className="vp-modal-title">{playing.title}</span>
                <button className="vp-close" onClick={() => setPlaying(null)}>✕</button>
              </div>
              <video
                ref={videoRef}
                src={`${R2_BASE}${playing.src}`}
                controls
                autoPlay
                playsInline
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
