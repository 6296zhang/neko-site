'use client'
import { useEffect, useRef } from 'react'

const CATS = [
  { name: 'もも', en: 'Momo', breed: 'Scottish Fold', age: '2y', status: 'Available',
    img: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=800&q=90&h=1000' },
  { name: 'そら', en: 'Sora', breed: 'American Shorthair', age: '3y', status: 'Reserved',
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=90&h=1000' },
  { name: 'きなこ', en: 'Kinako', breed: 'Maine Coon', age: '1y', status: 'Available',
    img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=90&h=1000' },
  { name: 'ゆき', en: 'Yuki', breed: 'Ragdoll', age: '4y', status: 'Available',
    img: 'https://images.unsplash.com/photo-1518791841217-8f162f1912da?auto=format&fit=crop&w=800&q=90&h=1000' },
]

const S = {
  // Typography
  hero: { fontSize: 'clamp(72px, 10vw, 148px)', fontWeight: 900, lineHeight: .92, letterSpacing: '-0.04em' } as React.CSSProperties,
  h2: { fontSize: 'clamp(48px, 6vw, 96px)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' } as React.CSSProperties,
  label: { fontSize: '11px', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: 'var(--neon)' },
  body: { fontSize: '15px', lineHeight: '1.7', color: 'var(--white-60)', fontWeight: 300 } as React.CSSProperties,
  small: { fontSize: '11px', letterSpacing: '.08em', textTransform: 'uppercase' as const, color: 'var(--white-25)' },
}

export default function Page() {
  const cur = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  let rx = 0, ry = 0, mx = 0, my = 0

  useEffect(() => {
    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; cur.current && Object.assign(cur.current.style, { left: mx+'px', top: my+'px' }) }
    const tick = () => { rx += (mx-rx)*.1; ry += (my-ry)*.1; ring.current && Object.assign(ring.current.style, { left: rx+'px', top: ry+'px' }); requestAnimationFrame(tick) }
    window.addEventListener('mousemove', move)
    tick()
    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') }), { threshold: .08 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => { window.removeEventListener('mousemove', move); obs.disconnect() }
  }, [])

  return (<>
    <div className="cursor" ref={cur} />
    <div className="cursor-ring" ref={ring} />

    {/* ─ NAV ─ */}
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, height:60, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 48px', borderBottom:'1px solid var(--border)', backdropFilter:'blur(24px)', background:'rgba(0,0,0,.7)' }}>
      <span style={{ fontFamily:'var(--serif)', fontSize:18, fontWeight:200, letterSpacing:'.08em' }}>ねこ堂</span>
      <div style={{ display:'flex', gap:32 }}>
        {['Cats','Café','About','Visit'].map(t=>(
          <a key={t} href="#" style={{ ...S.small, transition:'color .2s' }}
            onMouseEnter={e=>e.currentTarget.style.color='#fff'}
            onMouseLeave={e=>e.currentTarget.style.color='var(--white-25)'}>{t}</a>
        ))}
      </div>
      <a href="#" style={{ background:'var(--neon)', color:'#000', fontSize:12, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', padding:'9px 22px' }}>
        Visit Us
      </a>
    </nav>

    {/* ─ HERO ─ */}
    <section style={{ position:'relative', minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'0 48px 72px', overflow:'hidden' }}>
      {/* BG photo */}
      <div style={{ position:'absolute', inset:0, zIndex:0 }}>
        <img src="https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=1920&q=85" alt="" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 20%', filter:'brightness(.18) saturate(.8)' }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(200,255,110,.06) 0%, transparent 60%)' }} />
      </div>

      {/* Center floating cat */}
      <div className="float" style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-60%)', zIndex:1, width:'clamp(280px,32vw,480px)', aspectRatio:'3/4', overflow:'hidden' }}>
        <img src="https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?auto=format&fit=crop&w=900&q=90" alt="hero cat" style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:'4px', filter:'brightness(1.05) saturate(1.1)' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,.7) 100%)' }} />
      </div>

      {/* Index right */}
      <div style={{ position:'absolute', top:80, right:48, zIndex:2, textAlign:'right' }}>
        <div style={{ ...S.small, marginBottom:4 }}>Tokyo · Daikanyama</div>
        <div style={{ ...S.small }}>Est. 2018</div>
      </div>

      {/* Main copy */}
      <div style={{ position:'relative', zIndex:2 }}>
        <div className="reveal" style={{ ...S.label, marginBottom:24 }}>Cat Adoption Studio</div>
        <h1 style={{ ...S.hero, marginBottom:40 }}>
          <div className="reveal d1">猫と</div>
          <div className="reveal d2" style={{ display:'flex', alignItems:'baseline', gap:24 }}>
            <span>共に</span>
            <span style={{ fontFamily:'var(--serif)', fontWeight:200, fontSize:'clamp(28px,3.5vw,52px)', color:'var(--white-60)', letterSpacing:'-.01em' }}>生きる</span>
          </div>
        </h1>
        <div className="reveal d3" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', maxWidth:1100 }}>
          <p style={{ ...S.body, maxWidth:400 }}>保護猫との出会いから、日々のケアまで。<br/>猫と人の暮らしをていねいにつなぐ場所。</p>
          <div style={{ display:'flex', gap:32, alignItems:'center' }}>
            {[['248+','Cats adopted'],['12','Here now'],['6+','Years']].map(([n,l])=>(
              <div key={l} style={{ textAlign:'right' }}>
                <div style={{ fontSize:28, fontWeight:800, letterSpacing:'-.03em' }}>{n}</div>
                <div style={{ ...S.small, marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll line */}
      <div style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:8, zIndex:2 }}>
        <div style={{ width:1, height:48, background:'linear-gradient(to bottom, var(--neon), transparent)' }} />
        <span style={{ ...S.small, fontSize:9 }}>Scroll</span>
      </div>
    </section>

    {/* ─ MARQUEE ─ */}
    <div style={{ borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', padding:'16px 0', overflow:'hidden', background:'var(--surface)' }}>
      <div className="marquee" style={{ display:'flex', gap:56, width:'max-content', whiteSpace:'nowrap' }}>
        {Array(10).fill(['猫のいる暮らし','✦','Cat Adoption','✦','Daikanyama','✦','Since 2018','✦','Tokyo','✦']).flat().map((t,i)=>(
          <span key={i} style={{ fontSize:11, fontWeight: t==='✦' ? 400 : 500, letterSpacing:'.12em', color: t==='✦' ? 'var(--neon)' : 'var(--white-25)', textTransform:'uppercase' }}>{t}</span>
        ))}
      </div>
    </div>

    {/* ─ CATS GRID ─ */}
    <section style={{ padding:'120px 48px', background:'#000' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div className="reveal" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:64 }}>
          <div>
            <div style={{ ...S.label, marginBottom:12 }}>Our Cats</div>
            <h2 style={{ ...S.h2, fontSize:'clamp(36px,5vw,72px)' }}>今月のねこたち</h2>
          </div>
          <a href="#" style={{ ...S.small, borderBottom:'1px solid var(--white-25)', paddingBottom:4, transition:'color .2s, border-color .2s' }}
            onMouseEnter={e=>{ e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='#fff' }}
            onMouseLeave={e=>{ e.currentTarget.style.color='var(--white-25)'; e.currentTarget.style.borderColor='var(--white-25)' }}>
            View all →
          </a>
        </div>

        {/* Staggered grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:3 }}>
          {CATS.map((cat, i) => (
            <div key={cat.en} className={`reveal d${i+1}`} style={{ position:'relative', overflow:'hidden', cursor:'none',
              aspectRatio: i % 2 === 0 ? '3/4' : '3/5',
              marginTop: i === 1 || i === 3 ? 48 : 0,
            }}>
              <img src={cat.img} alt={cat.en} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', transition:'transform .6s ease', display:'block' }}
                onMouseEnter={e=>(e.currentTarget.style.transform='scale(1.04)')}
                onMouseLeave={e=>(e.currentTarget.style.transform='scale(1)')}
              />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,.85) 0%, transparent 50%)' }} />
              <div style={{ position:'absolute', top:16, left:16 }}>
                <span style={{ fontSize:9, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase',
                  color: cat.status==='Available' ? '#7EFF7E' : 'var(--neon)',
                }}>● {cat.status}</span>
              </div>
              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'20px 18px' }}>
                <div style={{ fontFamily:'var(--serif)', fontSize:28, fontWeight:900, lineHeight:1, marginBottom:5 }}>{cat.name}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,.45)', letterSpacing:'.08em', textTransform:'uppercase' }}>{cat.breed} · {cat.age}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ─ FEATURE STATEMENT ─ */}
    <section style={{ padding:'160px 48px', background:'#000', borderTop:'1px solid var(--border)' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:120, alignItems:'center' }}>
        <div>
          <div className="reveal" style={{ ...S.label, marginBottom:32 }}>Our Philosophy</div>
          <h2 className="reveal d1" style={{ ...S.h2, marginBottom:40, fontSize:'clamp(40px,5.5vw,88px)' }}>
            そこにいる<br />だけで、<span style={{ color:'var(--neon)' }}>十分。</span>
          </h2>
          <p className="reveal d2" style={{ ...S.body, marginBottom:48 }}>猫は何かを「してくれる」から価値があるのではない。そこにいるだけで空間の温度が変わる。ねこ堂は、その関係をていねいに育てるための場所です。</p>
          <a className="reveal d3" href="#" style={{ display:'inline-flex', alignItems:'center', gap:12, fontSize:13, fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase',
            borderBottom:'1px solid var(--white-25)', paddingBottom:8, transition:'color .2s, border-color .2s' }}
            onMouseEnter={e=>{ e.currentTarget.style.color='var(--neon)'; e.currentTarget.style.borderColor='var(--neon)' }}
            onMouseLeave={e=>{ e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='var(--white-25)' }}>
            Our story →
          </a>
        </div>
        <div className="reveal d2" style={{ position:'relative' }}>
          <div style={{ aspectRatio:'4/5', overflow:'hidden' }}>
            <img src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=900&q=90" alt="philosophy cat"
              style={{ width:'100%', height:'100%', objectFit:'cover', filter:'saturate(0.7) brightness(0.9)' }} />
          </div>
          <div style={{ position:'absolute', bottom:-24, right:-24, background:'var(--neon)', color:'#000', padding:'20px 28px' }}>
            <div style={{ fontSize:32, fontWeight:900, letterSpacing:'-.03em', lineHeight:1 }}>248</div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', marginTop:4 }}>Cats adopted</div>
          </div>
        </div>
      </div>
    </section>

    {/* ─ SERVICES ─ */}
    <section style={{ padding:'120px 48px', background:'var(--surface)' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div className="reveal" style={{ ...S.label, marginBottom:72 }}>What We Do</div>
        {[
          { n:'01', t:'Cat Adoption', jp:'お迎え', d:'全頭健康診断・ワクチン接種済み。お迎え後も専任スタッフがフォロー。' },
          { n:'02', t:'Café & Lounge', jp:'カフェ', d:'予約不要。猫と過ごす静かで豊かな時間を日常に。' },
          { n:'03', t:'Community', jp:'コミュニティ', d:'お迎えファミリーのネットワーク。相談・交流の場。' },
        ].map((s, i) => (
          <div key={s.n} className={`reveal d${i+1}`} style={{ display:'grid', gridTemplateColumns:'60px 280px 1fr 140px', gap:48, alignItems:'center', padding:'36px 0', borderBottom:'1px solid var(--border)' }}>
            <span style={{ fontSize:11, color:'var(--white-25)', fontWeight:700, letterSpacing:'.1em' }}>{s.n}</span>
            <div>
              <div style={{ fontSize:24, fontWeight:700, letterSpacing:'-.02em', marginBottom:4 }}>{s.t}</div>
              <div style={{ fontFamily:'var(--serif)', fontSize:13, color:'var(--neon)', fontWeight:300 }}>{s.jp}</div>
            </div>
            <p style={{ ...S.body, fontSize:13 }}>{s.d}</p>
            <a href="#" style={{ fontSize:11, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--white-25)',
              border:'1px solid var(--border)', padding:'11px 20px', textAlign:'center', transition:'all .2s' }}
              onMouseEnter={e=>{ e.currentTarget.style.color='var(--neon)'; e.currentTarget.style.borderColor='var(--neon)' }}
              onMouseLeave={e=>{ e.currentTarget.style.color='var(--white-25)'; e.currentTarget.style.borderColor='var(--border)' }}>
              Learn more
            </a>
          </div>
        ))}
      </div>
    </section>

    {/* ─ CTA FULL BLEED ─ */}
    <section style={{ position:'relative', minHeight:'60vh', display:'flex', alignItems:'center', overflow:'hidden' }}>
      <img src="https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=1920&q=80" alt=""
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.2) saturate(.5)' }} />
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(200,255,110,.08), transparent)' }} />
      <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:1200, margin:'0 auto', padding:'80px 48px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <div className="reveal" style={{ ...S.label, marginBottom:24 }}>Visit Us</div>
          <h2 className="reveal d1" style={{ ...S.h2, fontSize:'clamp(40px,6vw,96px)', marginBottom:16 }}>
            代官山で、<br />会いに来て。
          </h2>
          <p className="reveal d2" style={{ ...S.body }}>東京都渋谷区猿楽町 · 11:00–19:00 · 火曜定休</p>
        </div>
        <div className="reveal d2" style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <a href="#" style={{ background:'var(--neon)', color:'#000', fontSize:12, fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', padding:'18px 48px', textAlign:'center' }}>
            Reserve a visit
          </a>
          <a href="#" style={{ border:'1px solid var(--border)', color:'var(--white-60)', fontSize:12, fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', padding:'16px 48px', textAlign:'center' }}>
            Get directions
          </a>
        </div>
      </div>
    </section>

    {/* ─ FOOTER ─ */}
    <footer style={{ background:'#000', borderTop:'1px solid var(--border)', padding:'40px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontFamily:'var(--serif)', fontSize:15, fontWeight:200, letterSpacing:'.08em', color:'var(--white-25)' }}>ねこ堂 © 2026</span>
        <div style={{ display:'flex', gap:36 }}>
          {['Privacy','Terms','Instagram','Contact'].map(l=>(
            <a key={l} href="#" style={{ fontSize:11, color:'var(--white-25)', letterSpacing:'.1em', textTransform:'uppercase', transition:'color .2s' }}
              onMouseEnter={e=>e.currentTarget.style.color='var(--neon)'}
              onMouseLeave={e=>e.currentTarget.style.color='var(--white-25)'}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  </>)
}
