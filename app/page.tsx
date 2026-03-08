'use client'

import { useEffect, useRef } from 'react'

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY
      if (cursor) {
        cursor.style.left = mouseX + 'px'
        cursor.style.top = mouseY + 'px'
      }
    }

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ring) {
        ring.style.left = ringX + 'px'
        ring.style.top = ringY + 'px'
      }
      requestAnimationFrame(animateRing)
    }

    window.addEventListener('mousemove', onMove)
    animateRing()

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  const cats = [
    { name: 'もも', en: 'MOMO', breed: 'Scottish Fold', age: '02', status: 'AVAILABLE',
      img: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=600&q=85' },
    { name: 'そら', en: 'SORA', breed: 'Amer. Shorthair', age: '03', status: 'RESERVED',
      img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=85' },
    { name: 'きなこ', en: 'KINAKO', breed: 'Maine Coon', age: '01', status: 'AVAILABLE',
      img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=85' },
    { name: 'ゆき', en: 'YUKI', breed: 'Ragdoll', age: '04', status: 'AVAILABLE',
      img: 'https://images.unsplash.com/photo-1518791841217-8f162f1912da?auto=format&fit=crop&w=600&q=85' },
    { name: 'くろ', en: 'KURO', breed: 'Bombay', age: '05', status: 'AVAILABLE',
      img: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=600&q=85' },
  ]

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: '64px',
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'rgba(10,9,8,0.85)',
        backdropFilter: 'blur(20px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: "'Noto Serif JP'", fontSize: '18px', fontWeight: 200, letterSpacing: '0.1em', color: 'var(--white)' }}>
            ねこ堂
          </span>
          <span style={{ fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.1em', opacity: 0.8 }}>™</span>
        </div>

        <div style={{ display: 'flex', gap: '36px' }}>
          {['Cats', 'Café', 'About', 'Visit'].map(item => (
            <a key={item} href="#" className="link-underline" style={{
              fontSize: '12px', fontWeight: 400, letterSpacing: '0.08em',
              color: 'var(--white-dim)', textDecoration: 'none', textTransform: 'uppercase',
            }}>
              {item}
            </a>
          ))}
        </div>

        <a href="#" style={{
          fontSize: '11px', fontWeight: 500,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--black)',
          backgroundColor: 'var(--gold)',
          padding: '8px 20px',
          textDecoration: 'none',
        }}>
          Reserve
        </a>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0 40px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Hero full-bleed background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=1800&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          filter: 'brightness(0.25) saturate(0.6)',
        }} />

        {/* Giant background kanji overlay */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: "'Noto Serif JP'",
          fontSize: 'clamp(320px, 40vw, 560px)',
          fontWeight: 900,
          color: 'rgba(242,239,233,0.03)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '-0.05em',
        }}>猫</div>

        {/* Top-right label */}
        <div style={{
          position: 'absolute', top: '96px', right: '40px',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px',
        }}>
          <span style={{ fontSize: '10px', color: 'var(--white-faint)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Tokyo · Daikanyama</span>
          <span style={{ fontSize: '10px', color: 'var(--white-faint)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Est. 2018</span>
        </div>

        {/* Index number */}
        <div style={{ position: 'absolute', top: '50%', left: '40px', transform: 'translateY(-50%)' }}>
          <div style={{ writingMode: 'vertical-rl', fontSize: '10px', color: 'var(--white-faint)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            01 / Home
          </div>
        </div>

        {/* Hero copy */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px' }}>
          <p className="reveal" style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '28px' }}>
            Cat Adoption & Lifestyle Studio
          </p>

          <h1 style={{
            fontFamily: "'Noto Serif JP'",
            fontSize: 'clamp(60px, 9vw, 128px)',
            fontWeight: 200,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            marginBottom: '48px',
          }}>
            <div className="reveal reveal-delay-1" style={{ overflow: 'hidden' }}>
              <span>猫と共に、</span>
            </div>
            <div className="reveal reveal-delay-2" style={{ overflow: 'hidden', display: 'flex', alignItems: 'baseline', gap: '24px' }}>
              <span style={{ fontWeight: 900 }}>生きる。</span>
              <span style={{ fontFamily: 'Inter', fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 300, color: 'var(--white-dim)', letterSpacing: '0.02em' }}>
                Live with cats.
              </span>
            </div>
          </h1>

          <div className="reveal reveal-delay-3" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--white-dim)', maxWidth: '440px', fontWeight: 300 }}>
              保護猫との出会いから、日々のケアまで。<br />
              猫と人の暮らしをていねいにつなぐ場所。
            </p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <a href="#cats" style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em',
                color: 'var(--white)', textDecoration: 'none', textTransform: 'uppercase',
              }}>
                <span>Discover Cats</span>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '40px', height: '40px',
                  border: '1px solid var(--border)',
                  borderRadius: '50%',
                  fontSize: '16px',
                }}>↓</span>
              </a>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="reveal reveal-delay-4" style={{
          position: 'absolute', top: '50%', right: '40px',
          transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', gap: '32px',
        }}>
          {[['248', 'Adopted'], ['12', 'Now Here'], ['4.9', 'Rating']].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.03em', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: '10px', color: 'var(--white-faint)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        }}>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
          <span style={{ fontSize: '9px', color: 'var(--white-faint)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{
        borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
        padding: '18px 0', overflow: 'hidden', backgroundColor: 'var(--surface)',
      }}>
        <div className="marquee-track" style={{ display: 'flex', gap: '64px', width: 'max-content' }}>
          {Array(8).fill(['猫のいる暮らし', '·', 'Cat Adoption', '·', 'Daikanyama', '·', 'Slow Life', '·', 'Since 2018', '·']).flat().map((t, i) => (
            <span key={i} style={{
              fontSize: '11px', fontWeight: 400, letterSpacing: '0.12em',
              color: t === '·' ? 'var(--gold)' : 'var(--white-dim)',
              textTransform: 'uppercase', whiteSpace: 'nowrap',
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── CATS ── */}
      <section id="cats" style={{ padding: '120px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px' }}>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>02 / Our Cats</span>
              <h2 style={{ fontFamily: "'Noto Serif JP'", fontSize: '48px', fontWeight: 200, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                今月のねこたち
              </h2>
            </div>
            <a href="#" style={{ fontSize: '12px', color: 'var(--white-dim)', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }} className="link-underline">
              All Cats →
            </a>
          </div>

          {/* Horizontal scroll cards */}
          <div style={{ display: 'flex', gap: '2px', overflowX: 'auto', paddingBottom: '20px' }}>
            {cats.map((cat, i) => (
              <div key={cat.en} className="reveal" style={{
                minWidth: '220px', flex: '0 0 220px',
                aspectRatio: '3/4',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'none',
                transitionDelay: `${i * 0.07}s`,
              }}>
                {/* Real photo */}
                <img
                  src={cat.img}
                  alt={cat.name}
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    transition: 'transform 0.6s ease',
                  }}
                />

                {/* Status */}
                <div style={{
                  position: 'absolute', top: '16px', left: '16px',
                  fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em',
                  color: cat.status === 'AVAILABLE' ? '#7EC87E' : 'var(--gold)',
                  textTransform: 'uppercase',
                }}>
                  ● {cat.status}
                </div>

                {/* Index */}
                <div style={{
                  position: 'absolute', top: '16px', right: '16px',
                  fontSize: '10px', color: 'rgba(255,255,255,0.2)', fontWeight: 700,
                }}>{String(i+1).padStart(2,'0')}</div>

                {/* Info */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '20px 16px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                }}>
                  <div style={{ fontFamily: "'Noto Serif JP'", fontSize: '22px', fontWeight: 900, letterSpacing: '0.04em', lineHeight: 1, marginBottom: '4px' }}>
                    {cat.name}
                  </div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {cat.breed} · {cat.age}y
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section style={{
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '120px 40px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', alignItems: 'start' }}>
          <div className="reveal">
            <span style={{ fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '24px' }}>03 / Philosophy</span>
            <div style={{ width: '1px', height: '80px', backgroundColor: 'var(--border)' }} />
          </div>
          <div>
            <h2 className="reveal" style={{
              fontFamily: "'Noto Serif JP'",
              fontSize: 'clamp(32px, 4vw, 60px)',
              fontWeight: 200, lineHeight: 1.3,
              marginBottom: '48px', letterSpacing: '-0.01em',
            }}>
              ただそこにいるだけで、<br />
              <em style={{ fontStyle: 'normal', fontWeight: 900 }}>十分な存在。</em>
            </h2>
            <div className="reveal reveal-delay-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              <p style={{ fontSize: '14px', lineHeight: '2', color: 'var(--white-dim)', fontWeight: 300 }}>
                猫は何かを「してくれる」から価値があるのではない。そこにいるだけで、空間の温度が変わる。
              </p>
              <p style={{ fontSize: '14px', lineHeight: '2', color: 'var(--white-dim)', fontWeight: 300 }}>
                ねこ堂は、その関係をていねいに育てるための場所。保護という行為を、日常に自然に溶け込ませたい。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding: '120px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span className="reveal" style={{ fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '64px' }}>04 / Services</span>

          {[
            { num: '01', title: 'Cat Adoption', jp: 'お迎え', desc: '全頭健康診断・ワクチン接種済み。お迎え後も専任スタッフがフォローします。' },
            { num: '02', title: 'Café & Lounge', jp: 'カフェ', desc: '予約不要。静かな空間で、猫たちと過ごすゆっくりとした時間を。' },
            { num: '03', title: 'Community', jp: 'コミュニティ', desc: 'お迎えいただいたご家族のネットワーク。育て方の相談や近況報告の場。' },
          ].map((s, i) => (
            <div key={s.num} className="reveal" style={{
              display: 'grid', gridTemplateColumns: '80px 1fr 1fr auto',
              alignItems: 'center', gap: '40px',
              padding: '32px 0',
              borderBottom: '1px solid var(--border)',
              transitionDelay: `${i * 0.1}s`,
            }}>
              <span style={{ fontSize: '11px', color: 'var(--white-faint)', fontWeight: 700, letterSpacing: '0.1em' }}>{s.num}</span>
              <div>
                <div style={{ fontSize: '22px', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '4px' }}>{s.title}</div>
                <div style={{ fontFamily: "'Noto Serif JP'", fontSize: '13px', color: 'var(--gold)', fontWeight: 300 }}>{s.jp}</div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--white-dim)', lineHeight: '1.7', fontWeight: 300 }}>{s.desc}</p>
              <a href="#" style={{
                fontSize: '12px', color: 'var(--white-dim)', textDecoration: 'none',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                padding: '10px 24px',
                border: '1px solid var(--border)',
                whiteSpace: 'nowrap',
              }} className="link-underline">
                Learn more
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FULL ── */}
      <section style={{
        margin: '0 40px 80px',
        backgroundColor: 'var(--gold)',
        padding: '80px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <h2 className="reveal" style={{
            fontFamily: "'Noto Serif JP'",
            fontSize: 'clamp(32px, 4vw, 56px)',
            fontWeight: 200, lineHeight: 1.2,
            color: 'var(--black)',
            letterSpacing: '-0.02em', marginBottom: '16px',
          }}>
            代官山で、<br /><strong style={{ fontWeight: 900 }}>会いにきてください。</strong>
          </h2>
          <p style={{ fontSize: '13px', color: 'rgba(10,9,8,0.6)', letterSpacing: '0.04em' }}>
            東京都渋谷区猿楽町 · 11:00–19:00 · 火曜定休
          </p>
        </div>
        <div className="reveal reveal-delay-2" style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
          <a href="#" style={{
            padding: '16px 36px', backgroundColor: 'var(--black)', color: 'var(--white)',
            fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            Visit Us
          </a>
          <a href="#" style={{
            padding: '16px 32px',
            border: '1px solid rgba(10,9,8,0.3)',
            color: 'var(--black)',
            fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            Map →
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '40px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: "'Noto Serif JP'", fontSize: '14px', fontWeight: 200, color: 'var(--white-faint)', letterSpacing: '0.06em' }}>
            ねこ堂 © 2026
          </span>
          <div style={{ display: 'flex', gap: '32px' }}>
            {['Privacy', 'Terms', 'Instagram', 'Contact'].map(l => (
              <a key={l} href="#" className="link-underline" style={{ fontSize: '11px', color: 'var(--white-faint)', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
