'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Cat data with reliable Unsplash IDs ───
const CATS = [
  { name: 'もも', en: 'Momo', breed: 'Scottish Fold', age: '2y', status: 'Available',
    img: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&q=90&fit=crop&crop=faces,top' },
  { name: 'そら', en: 'Sora', breed: 'Amer. Shorthair', age: '3y', status: 'Reserved',
    img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=90&fit=crop&crop=faces,top' },
  { name: 'きなこ', en: 'Kinako', breed: 'Maine Coon', age: '1y', status: 'Available',
    img: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=800&q=90&fit=crop&crop=faces,top' },
  { name: 'ゆき', en: 'Yuki', breed: 'Ragdoll', age: '4y', status: 'Available',
    img: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=800&q=90&fit=crop&crop=faces,top' },
]

export default function Page() {
  const dotRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const heroBgRef = useRef<HTMLDivElement>(null)
  const heroCatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // ── Smooth cursor ──
    let cx = 0, cy = 0, dx = 0, dy = 0
    const onMouse = (e: MouseEvent) => { cx = e.clientX; cy = e.clientY }
    window.addEventListener('mousemove', onMouse)
    const tickCursor = () => {
      dx += (cx - dx) * .14
      dy += (cy - dy) * .14
      if (dotRef.current) { dotRef.current.style.left = cx+'px'; dotRef.current.style.top = cy+'px' }
      if (circleRef.current) { circleRef.current.style.left = dx+'px'; circleRef.current.style.top = dy+'px' }
      requestAnimationFrame(tickCursor)
    }
    tickCursor()

    // ── Hero text clip-path reveal ──
    const lines = document.querySelectorAll('.line')
    gsap.fromTo(lines, { y: '110%' }, {
      y: '0%', duration: 1.1,
      ease: 'power3.out',
      stagger: .13,
      delay: .2,
    })

    // ── Hero label + cta ──
    gsap.fromTo('.hero-meta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .8, stagger: .1, delay: .7, ease: 'power2.out' })

    // ── Hero parallax ──
    if (heroBgRef.current) {
      gsap.to(heroBgRef.current, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current!, start: 'top top', end: 'bottom top', scrub: true },
      })
    }

    // ── Hero cat parallax ──
    if (heroCatRef.current) {
      gsap.to(heroCatRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current!, start: 'top top', end: 'bottom top', scrub: true },
      })
    }

    // ── Section reveals ──
    document.querySelectorAll('.gsap-reveal').forEach((el) => {
      gsap.fromTo(el,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        }
      )
    })

    // ── Cat cards stagger ──
    gsap.fromTo('.cat-card',
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: .12, ease: 'power3.out',
        scrollTrigger: { trigger: '#cats', start: 'top 75%' }
      }
    )

    // ── Services rows ──
    document.querySelectorAll('.svc-row').forEach((el, i) => {
      gsap.fromTo(el, { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: .8, delay: i * .08,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      })
    })

    // ── Counter animation ──
    document.querySelectorAll('.counter').forEach(el => {
      const target = parseInt(el.getAttribute('data-target') || '0')
      const obj = { val: 0 }
      gsap.to(obj, { val: target, duration: 2, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
        onUpdate: () => { el.textContent = Math.round(obj.val).toString() + (el.getAttribute('data-suffix') || '') }
      })
    })

    // ── CTA section parallax ──
    gsap.to('.cta-bg', {
      yPercent: 20, ease: 'none',
      scrollTrigger: { trigger: '#cta', start: 'top bottom', end: 'bottom top', scrub: true }
    })

    return () => {
      window.removeEventListener('mousemove', onMouse)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (<>
    {/* ── Cursor ── */}
    <div className="cur-dot" ref={dotRef} />
    <div className="cur-circle" ref={circleRef} />

    {/* ── NAV ── */}
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, height:58,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'0 52px', borderBottom:'1px solid var(--border)',
      background:'rgba(0,0,0,.72)', backdropFilter:'blur(20px)',
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <span style={{ fontFamily:"'Noto Serif JP'", fontSize:17, fontWeight:200, letterSpacing:'.08em' }}>ねこ堂</span>
        <sup style={{ fontSize:9, color:'var(--neon)', fontWeight:700, letterSpacing:'.06em' }}>TM</sup>
      </div>
      <div style={{ display:'flex', gap:36 }}>
        {['Cats','Café','About','Visit'].map(t => (
          <a key={t} href="#" className="nav-link" style={{ fontSize:11, fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--white-50)', transition:'color .2s' }}>{t}</a>
        ))}
      </div>
      <a href="#" className="btn-primary" style={{ background:'var(--neon)', color:'#000', fontSize:11, fontWeight:800, letterSpacing:'.12em', textTransform:'uppercase', padding:'10px 24px' }}>
        Visit Us
      </a>
    </nav>

    {/* ── HERO ── */}
    <section ref={heroRef} style={{ position:'relative', height:'100vh', minHeight:640, display:'flex', flexDirection:'column', justifyContent:'flex-end', overflow:'hidden' }}>
      {/* BG photo + dark overlay */}
      <div ref={heroBgRef} style={{ position:'absolute', inset:'-20%', zIndex:0 }}>
        <img
          src="https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=1920&q=85&fit=crop"
          alt="" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 35%' }}
        />
        <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,.72)' }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 100% 70% at 50% 100%, rgba(0,0,0,.9) 0%, transparent 60%)' }} />
      </div>

      {/* Floating hero cat */}
      <div ref={heroCatRef} style={{ position:'absolute', top:'50%', left:'58%', transform:'translate(-50%,-55%)', zIndex:2, width:'clamp(240px,28vw,400px)' }}>
        <div className="img-wrap" style={{ borderRadius:2 }}>
          <img
            src="https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=800&q=90&fit=crop&crop=faces,top"
            alt="hero cat"
            style={{ width:'100%', aspectRatio:'3/4', objectFit:'cover', display:'block' }}
          />
        </div>
        <div style={{ marginTop:2, background:'var(--neon)', padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontSize:11, fontWeight:800, color:'#000', letterSpacing:'.08em', textTransform:'uppercase' }}>12 cats available now</span>
          <span style={{ fontSize:14, fontWeight:900, color:'#000' }}>→</span>
        </div>
      </div>

      {/* Location tag */}
      <div className="hero-meta" style={{ position:'absolute', top:78, right:52, zIndex:3, textAlign:'right', opacity:0 }}>
        <div style={{ fontSize:10, color:'var(--white-20)', letterSpacing:'.14em', textTransform:'uppercase', lineHeight:1.8 }}>Daikanyama · Tokyo</div>
        <div style={{ fontSize:10, color:'var(--white-20)', letterSpacing:'.14em', textTransform:'uppercase' }}>Est. 2018</div>
      </div>

      {/* Hero copy */}
      <div style={{ position:'relative', zIndex:3, padding:'0 52px 68px', maxWidth:900 }}>
        <div className="hero-meta" style={{ fontSize:11, fontWeight:600, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--neon)', marginBottom:24, opacity:0 }}>
          Cat Adoption Studio · Tokyo
        </div>
        <h1 style={{ fontFamily:"'Noto Serif JP'", fontSize:'clamp(80px,11vw,160px)', fontWeight:200, lineHeight:.9, letterSpacing:'-.03em', marginBottom:48 }}>
          <div className="line-wrap"><span className="line" style={{ display:'block' }}>猫と共に、</span></div>
          <div className="line-wrap" style={{ display:'flex', alignItems:'baseline', gap:20 }}>
            <span className="line" style={{ fontWeight:900, display:'block' }}>生きる。</span>
          </div>
        </h1>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', maxWidth:860 }}>
          <p className="hero-meta" style={{ fontSize:15, lineHeight:1.8, color:'var(--white-50)', maxWidth:400, fontWeight:300, opacity:0 }}>
            保護猫との出会いから、日々のケアまで。<br/>猫と人の暮らしをていねいにつなぐ場所。
          </p>
          <div className="hero-meta" style={{ display:'flex', gap:40, opacity:0 }}>
            {[['248+','Adopted','counter','248'],['12','Here now',null,null],['4.9★','Rating',null,null]].map(([n,l,cls,target])=>(
              <div key={l} style={{ textAlign:'right' }}>
                <div className={cls||''} data-target={target||undefined} data-suffix={cls ? '+' : undefined}
                  style={{ fontSize:30, fontWeight:800, letterSpacing:'-.04em', lineHeight:1, color:'var(--white)' }}>{n}</div>
                <div style={{ fontSize:10, color:'var(--white-20)', letterSpacing:'.1em', textTransform:'uppercase', marginTop:3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:6, zIndex:3 }}>
        <div style={{ width:1, height:44, background:'linear-gradient(to bottom, var(--neon), transparent)' }} />
        <span style={{ fontSize:9, color:'var(--white-20)', letterSpacing:'.18em', textTransform:'uppercase' }}>Scroll</span>
      </div>
    </section>

    {/* ── MARQUEE ── */}
    <div style={{ overflow:'hidden', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', background:'var(--surface)', padding:'14px 0' }}>
      <div className="mar" style={{ whiteSpace:'nowrap', display:'flex', gap:52, width:'max-content' }}>
        {Array(12).fill(['猫のいる暮らし','·','Cat Adoption','·','Daikanyama','·','Since 2018','·','Tokyo','·']).flat().map((t,i)=>(
          <span key={i} style={{ fontSize:11, fontWeight: t==='·' ? 400 : 500, letterSpacing:'.12em',
            color: t==='·' ? 'var(--neon)' : 'var(--white-20)', textTransform:'uppercase' }}>{t}</span>
        ))}
      </div>
    </div>

    {/* ── CATS ── */}
    <section id="cats" style={{ padding:'120px 52px', background:'#000' }}>
      <div style={{ maxWidth:1240, margin:'0 auto' }}>
        <div className="gsap-reveal" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:72 }}>
          <div>
            <p style={{ fontSize:11, fontWeight:600, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--neon)', marginBottom:14 }}>Our Cats</p>
            <h2 style={{ fontFamily:"'Noto Serif JP'", fontSize:'clamp(40px,5.5vw,80px)', fontWeight:200, letterSpacing:'-.02em', lineHeight:1 }}>今月のねこたち</h2>
          </div>
          <a href="#" style={{ fontSize:11, color:'var(--white-20)', letterSpacing:'.12em', textTransform:'uppercase', borderBottom:'1px solid var(--white-20)', paddingBottom:4, transition:'all .25s' }}
            onMouseEnter={e=>{ e.currentTarget.style.color='var(--neon)'; e.currentTarget.style.borderColor='var(--neon)' }}
            onMouseLeave={e=>{ e.currentTarget.style.color='var(--white-20)'; e.currentTarget.style.borderColor='var(--white-20)' }}>
            View all cats →
          </a>
        </div>

        {/* Offset grid — like affinity's product grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:4, alignItems:'start' }}>
          {CATS.map((cat, i) => (
            <div key={cat.en} className="cat-card" style={{
              position:'relative', overflow:'hidden', cursor:'none',
              aspectRatio: i%2===0 ? '3/4' : '2/3',
              marginTop: i%2===1 ? 56 : 0,
            }}>
              <img className="cat-img" src={cat.img} alt={cat.en}
                style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block' }} />
              <div className="cat-overlay" style={{ position:'absolute', inset:0 }} />
              {/* Status */}
              <div style={{ position:'absolute', top:14, left:14, display:'flex', alignItems:'center', gap:5 }}>
                <span style={{ display:'inline-block', width:6, height:6, borderRadius:'50%', background: cat.status==='Available' ? '#7EFF7E' : 'var(--neon)' }} />
                <span style={{ fontSize:9, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--white-50)' }}>{cat.status}</span>
              </div>
              {/* Info */}
              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'18px 16px' }}>
                <div style={{ fontFamily:"'Noto Serif JP'", fontSize:26, fontWeight:900, lineHeight:1, letterSpacing:'.02em' }}>{cat.name}</div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,.4)', letterSpacing:'.08em', textTransform:'uppercase', marginTop:5 }}>{cat.breed} · {cat.age}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── PHILOSOPHY ── */}
    <section style={{ padding:'160px 52px', background:'var(--surface)', borderTop:'1px solid var(--border)' }}>
      <div style={{ maxWidth:1240, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:120, alignItems:'center' }}>
        <div>
          <p className="gsap-reveal" style={{ fontSize:11, fontWeight:600, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--neon)', marginBottom:32 }}>Philosophy</p>
          <h2 className="gsap-reveal" style={{ fontFamily:"'Noto Serif JP'", fontSize:'clamp(40px,5vw,80px)', fontWeight:200, lineHeight:1.2, letterSpacing:'-.02em', marginBottom:44 }}>
            そこにいるだけで、<br/><strong style={{ fontWeight:900 }}>十分な存在。</strong>
          </h2>
          <p className="gsap-reveal" style={{ fontSize:14, lineHeight:2, color:'var(--white-50)', fontWeight:300, marginBottom:48, maxWidth:400 }}>
            猫は何かを「してくれる」から価値があるのではない。そこにいるだけで、空間の温度が変わる。ねこ堂は、その関係をていねいに育てるための場所です。
          </p>
          <a className="gsap-reveal" href="#" style={{ display:'inline-flex', alignItems:'center', gap:14, fontSize:12, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--white-50)', borderBottom:'1px solid var(--white-20)', paddingBottom:8, transition:'all .25s' }}
            onMouseEnter={e=>{ e.currentTarget.style.color='var(--neon)'; e.currentTarget.style.borderColor='var(--neon)' }}
            onMouseLeave={e=>{ e.currentTarget.style.color='var(--white-50)'; e.currentTarget.style.borderColor='var(--white-20)' }}>
            Our full story →
          </a>
        </div>
        <div className="gsap-reveal img-wrap" style={{ position:'relative' }}>
          <img src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=900&q=90&fit=crop&crop=faces,top"
            alt="philosophy" style={{ width:'100%', aspectRatio:'4/5', objectFit:'cover', display:'block', filter:'saturate(.85)' }} />
          {/* floating stat */}
          <div style={{ position:'absolute', bottom:-2, right:-2, background:'var(--neon)', padding:'22px 28px' }}>
            <div className="counter" data-target="248" data-suffix="+" style={{ fontSize:40, fontWeight:900, letterSpacing:'-.04em', lineHeight:1, color:'#000' }}>248+</div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(0,0,0,.6)', marginTop:4 }}>Cats adopted</div>
          </div>
        </div>
      </div>
    </section>

    {/* ── SERVICES ── */}
    <section style={{ padding:'120px 52px', background:'#000', borderTop:'1px solid var(--border)' }}>
      <div style={{ maxWidth:1240, margin:'0 auto' }}>
        <p className="gsap-reveal" style={{ fontSize:11, fontWeight:600, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--neon)', marginBottom:72 }}>What We Do</p>
        {[
          { n:'01', t:'Cat Adoption', jp:'お迎え', d:'全頭健康診断・ワクチン接種済み。お迎え後も専任スタッフが長期フォロー。' },
          { n:'02', t:'Café & Lounge', jp:'カフェ', d:'予約不要。猫と過ごす静かで豊かな時間を日常の中に。' },
          { n:'03', t:'Community', jp:'コミュニティ', d:'お迎えファミリーのネットワーク。育て方の相談や近況報告の場。' },
        ].map((s, i) => (
          <div key={s.n} className="svc-row" style={{ display:'grid', gridTemplateColumns:'64px 300px 1fr 160px', gap:48, alignItems:'center', padding:'36px 0', borderBottom:'1px solid var(--border)', cursor:'none' }}>
            <span style={{ fontSize:11, color:'var(--white-20)', fontWeight:700, letterSpacing:'.1em' }}>{s.n}</span>
            <div>
              <div style={{ fontSize:22, fontWeight:700, letterSpacing:'-.02em', marginBottom:5 }}>{s.t}</div>
              <div style={{ fontFamily:"'Noto Serif JP'", fontSize:12, color:'var(--neon)', fontWeight:300, letterSpacing:'.04em' }}>{s.jp}</div>
            </div>
            <p style={{ fontSize:13, color:'var(--white-50)', lineHeight:1.8, fontWeight:300 }}>{s.d}</p>
            <a href="#" className="btn-outline" style={{ fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--white-20)', border:'1px solid var(--border)', padding:'12px 20px', textAlign:'center' }}>
              Learn more
            </a>
          </div>
        ))}
      </div>
    </section>

    {/* ── CTA ── */}
    <section id="cta" style={{ position:'relative', minHeight:'70vh', display:'flex', alignItems:'center', overflow:'hidden' }}>
      <div className="cta-bg" style={{ position:'absolute', inset:'-20%', zIndex:0 }}>
        <img src="https://images.unsplash.com/photo-1593435221862-2d2ba9d3a6c3?w=1920&q=80&fit=crop"
          alt="" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,.75)' }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(204,255,87,.05), transparent)' }} />
      </div>
      <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:1240, margin:'0 auto', padding:'80px 52px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:60 }}>
        <div>
          <p className="gsap-reveal" style={{ fontSize:11, fontWeight:600, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--neon)', marginBottom:24 }}>Visit Us</p>
          <h2 className="gsap-reveal" style={{ fontFamily:"'Noto Serif JP'", fontSize:'clamp(44px,6vw,100px)', fontWeight:200, lineHeight:.95, letterSpacing:'-.02em', marginBottom:20 }}>
            代官山で、<br/><strong style={{ fontWeight:900 }}>会いに来て。</strong>
          </h2>
          <p className="gsap-reveal" style={{ fontSize:13, color:'var(--white-50)', letterSpacing:'.04em', lineHeight:1.8 }}>
            東京都渋谷区猿楽町 · 11:00–19:00 · 火曜定休
          </p>
        </div>
        <div className="gsap-reveal" style={{ display:'flex', flexDirection:'column', gap:10, flexShrink:0 }}>
          <a href="#" className="btn-primary" style={{ background:'var(--neon)', color:'#000', fontSize:12, fontWeight:800, letterSpacing:'.12em', textTransform:'uppercase', padding:'18px 52px', textAlign:'center', display:'block' }}>
            Reserve a visit
          </a>
          <a href="#" className="btn-outline" style={{ color:'var(--white-50)', fontSize:12, fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', padding:'16px 52px', textAlign:'center', border:'1px solid var(--border)', display:'block' }}>
            Get directions
          </a>
        </div>
      </div>
    </section>

    {/* ── FOOTER ── */}
    <footer style={{ background:'#000', borderTop:'1px solid var(--border)', padding:'36px 52px' }}>
      <div style={{ maxWidth:1240, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontFamily:"'Noto Serif JP'", fontSize:14, fontWeight:200, letterSpacing:'.08em', color:'var(--white-20)' }}>ねこ堂 © 2026</span>
        <div style={{ display:'flex', gap:36 }}>
          {['Privacy','Terms','Instagram','Contact'].map(l=>(
            <a key={l} href="#" style={{ fontSize:11, color:'var(--white-20)', letterSpacing:'.1em', textTransform:'uppercase', transition:'color .2s' }}
              onMouseEnter={e=>e.currentTarget.style.color='var(--neon)'}
              onMouseLeave={e=>e.currentTarget.style.color='var(--white-20)'}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  </>)
}
