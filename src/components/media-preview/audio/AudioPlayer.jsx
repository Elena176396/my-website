import { useState, useRef, useEffect, useCallback } from 'react';
import { R2_BASE, audios } from './audios';

const CATEGORIES = ['全部', '学习', '音乐', '播客'];

function formatTime(sec) {
  if (!sec || !isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function AudioPlayer() {
  const [active, setActive] = useState('全部');
  const [current, setCurrent] = useState(null); // index in filtered
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const filtered = active === '全部'
    ? audios
    : audios.filter(a => a.category === active);

  const currentTrack = current !== null ? filtered[current] : null;

  // 播放指定曲目
  const playTrack = useCallback((index) => {
    setCurrent(index);
    setIsPlaying(true);
  }, []);

  // 加载并播放
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    audio.src = `${R2_BASE}${currentTrack.src}`;
    audio.load();
    if (isPlaying) {
      audio.play().catch(() => {});
    }
  }, [current, currentTrack]);

  // 播放/暂停切换
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // 更新进度
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    };
    const onMeta = () => setDuration(audio.duration);
    const onEnd = () => {
      // 连续播放：自动下一首
      if (current !== null && current < filtered.length - 1) {
        setCurrent(prev => prev + 1);
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
        setProgress(0);
      }
    };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnd);
    };
  }, [current, filtered.length]);

  // 切分类时重置
  const switchCategory = (cat) => {
    setActive(cat);
    setCurrent(null);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
  };

  // 点击进度条跳转
  const seekTo = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const bar = progressRef.current;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
  };

  const prev = () => {
    if (current !== null && current > 0) {
      setCurrent(current - 1);
      setIsPlaying(true);
    }
  };

  const next = () => {
    if (current !== null && current < filtered.length - 1) {
      setCurrent(current + 1);
      setIsPlaying(true);
    }
  };

  return (
    <>
      <style>{`
        .ap-root {
          --slate: #6e7488;
          --indigo: #706888;
          --steel: #5e7080;
          --glass-bg: rgba(255, 255, 255, 0.55);
          --glass-border: rgba(255, 255, 255, 0.35);
          --glass-shadow: 0 4px 24px rgba(110, 116, 136, 0.1);
          --radius: 14px;
          font-family: -apple-system, 'SF Pro Display', 'PingFang SC',
            'Noto Sans SC', sans-serif;
          max-width: 640px;
          margin: 0 auto;
          padding: 0 20px 140px;
        }

        /* ── Tabs ── */
        .ap-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .ap-tab {
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
        .ap-tab:hover {
          background: rgba(255, 255, 255, 0.75);
          border-color: var(--indigo);
        }
        .ap-tab[data-active='true'] {
          background: var(--indigo);
          color: #fff;
          border-color: var(--indigo);
        }

        .ap-count {
          font-size: 13px;
          color: var(--slate);
          opacity: 0.5;
          margin-bottom: 16px;
        }

        /* ── 列表 ── */
        .ap-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ap-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          border-radius: var(--radius);
          cursor: pointer;
          transition: all 0.15s ease;
          border: 1px solid transparent;
        }
        .ap-item:hover {
          background: var(--glass-bg);
          border-color: var(--glass-border);
        }
        .ap-item[data-playing='true'] {
          background: rgba(112, 104, 136, 0.1);
          border-color: rgba(112, 104, 136, 0.2);
        }
        .ap-item-index {
          width: 24px;
          font-size: 13px;
          color: var(--slate);
          opacity: 0.4;
          text-align: center;
          flex-shrink: 0;
        }
        .ap-item[data-playing='true'] .ap-item-index {
          opacity: 0;
        }
        .ap-item-eq {
          display: none;
          width: 24px;
          justify-content: center;
          flex-shrink: 0;
        }
        .ap-item[data-playing='true'] .ap-item-eq {
          display: flex;
        }
        .ap-eq-bar {
          width: 3px;
          border-radius: 2px;
          background: var(--indigo);
          margin: 0 1px;
        }
        .ap-item[data-playing='true'][data-active-play='true'] .ap-eq-bar {
          animation: ap-eq 0.6s ease-in-out infinite alternate;
        }
        .ap-eq-bar:nth-child(1) { height: 8px; animation-delay: 0s; }
        .ap-eq-bar:nth-child(2) { height: 14px; animation-delay: 0.15s; }
        .ap-eq-bar:nth-child(3) { height: 6px; animation-delay: 0.3s; }
        @keyframes ap-eq {
          from { height: 4px; }
          to { height: 16px; }
        }
        .ap-item-info {
          flex: 1;
          min-width: 0;
        }
        .ap-item-title {
          font-size: 14px;
          font-weight: 500;
          color: #2c2c2e;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ap-item[data-playing='true'] .ap-item-title {
          color: var(--indigo);
        }
        .ap-item-cat {
          font-size: 11px;
          color: var(--steel);
          opacity: 0.6;
          margin-top: 2px;
        }

        /* ── 底部播放栏 ── */
        .ap-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 -4px 30px rgba(110, 116, 136, 0.12);
          padding: 0 20px 20px;
          padding-bottom: max(20px, env(safe-area-inset-bottom));
        }
        .ap-bar-progress {
          height: 3px;
          background: rgba(110, 116, 136, 0.1);
          cursor: pointer;
          margin: 0 -20px 12px;
          padding: 0 20px;
          position: relative;
        }
        .ap-bar-progress-inner {
          height: 100%;
          margin: 0 -20px;
          padding: 0 20px;
        }
        .ap-bar-progress-fill {
          height: 100%;
          background: var(--indigo);
          border-radius: 2px;
          transition: width 0.1s linear;
        }
        .ap-bar-progress-hit {
          position: absolute;
          inset: -8px 0;
          cursor: pointer;
        }

        .ap-bar-content {
          display: flex;
          align-items: center;
          gap: 16px;
          max-width: 640px;
          margin: 0 auto;
        }
        .ap-bar-info {
          flex: 1;
          min-width: 0;
        }
        .ap-bar-title {
          font-size: 14px;
          font-weight: 600;
          color: #2c2c2e;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ap-bar-time {
          font-size: 11px;
          color: var(--slate);
          opacity: 0.6;
          margin-top: 2px;
        }
        .ap-bar-controls {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .ap-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease;
          color: var(--slate);
        }
        .ap-btn:hover { background: rgba(110, 116, 136, 0.1); }
        .ap-btn:disabled { opacity: 0.25; cursor: default; }
        .ap-btn:disabled:hover { background: transparent; }
        .ap-btn svg { width: 18px; height: 18px; fill: currentColor; }

        .ap-btn-play {
          width: 44px;
          height: 44px;
          background: var(--indigo);
          color: #fff;
        }
        .ap-btn-play:hover { background: #5e5878; }
        .ap-btn-play svg { width: 20px; height: 20px; fill: #fff; }

        /* ── 空状态 ── */
        .ap-empty {
          text-align: center;
          padding: 60px 20px;
          color: var(--slate);
          font-size: 14px;
          opacity: 0.6;
        }

        /* ── 无播放时隐藏底栏 ── */
        .ap-bar-hidden { display: none; }

        @media (max-width: 520px) {
          .ap-root { padding-bottom: 130px; }
          .ap-bar-content { gap: 12px; }
          .ap-btn { width: 32px; height: 32px; }
          .ap-btn svg { width: 16px; height: 16px; }
          .ap-btn-play { width: 40px; height: 40px; }
        }
      `}</style>

      <div className="ap-root">
        <audio ref={audioRef} preload="metadata" />

        {/* Tabs */}
        <div className="ap-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className="ap-tab"
              data-active={active === cat}
              onClick={() => switchCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="ap-count">{filtered.length} 首</div>

        {/* 列表 */}
        {filtered.length === 0 ? (
          <div className="ap-empty">这个分类还没有音频</div>
        ) : (
          <div className="ap-list">
            {filtered.map((a, i) => (
              <div
                key={`${a.src}-${i}`}
                className="ap-item"
                data-playing={current === i}
                data-active-play={current === i && isPlaying}
                onClick={() => {
                  if (current === i) {
                    setIsPlaying(!isPlaying);
                  } else {
                    playTrack(i);
                  }
                }}
              >
                <span className="ap-item-index">{i + 1}</span>
                <div className="ap-item-eq">
                  <div className="ap-eq-bar" />
                  <div className="ap-eq-bar" />
                  <div className="ap-eq-bar" />
                </div>
                <div className="ap-item-info">
                  <div className="ap-item-title">{a.title}</div>
                  {active === '全部' && (
                    <div className="ap-item-cat">{a.category}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 底部播放栏 */}
        <div className={`ap-bar ${currentTrack ? '' : 'ap-bar-hidden'}`}>
          <div
            className="ap-bar-progress"
            ref={progressRef}
            onClick={seekTo}
          >
            <div className="ap-bar-progress-inner">
              <div
                className="ap-bar-progress-fill"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="ap-bar-progress-hit" onClick={seekTo} />
          </div>

          <div className="ap-bar-content">
            <div className="ap-bar-info">
              <div className="ap-bar-title">{currentTrack?.title || ''}</div>
              <div className="ap-bar-time">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            <div className="ap-bar-controls">
              <button className="ap-btn" onClick={prev} disabled={current === 0 || current === null}>
                <svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
              </button>
              <button className="ap-btn ap-btn-play" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? (
                  <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                ) : (
                  <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                )}
              </button>
              <button className="ap-btn" onClick={next} disabled={current === null || current >= filtered.length - 1}>
                <svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
